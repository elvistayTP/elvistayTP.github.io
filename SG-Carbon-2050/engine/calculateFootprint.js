import { BASELINE } from "./baseline.js";
import { CARDS } from "./cards.js";

const cardMap = new Map(CARDS.map(c => [c.card_id, c]));

function diminishingFactor(budget) {
  const share = (budget.baseline - budget.remaining) / budget.baseline;
  if (share < 0.25) return 1.0;
  if (share < 0.50) return 0.8;
  return 0.6;
}

function readinessFor(card, selectedIds) {
  const r = card.readiness || { base: 1, bonuses: {} };
  let value = r.base;
  for (const [id, bonus] of Object.entries(r.bonuses || {})) {
    if (selectedIds.has(id)) value += bonus;
  }
  return Math.min(1, value);
}

function applyNormal(card, budgets, details) {
  let actual = 0;
  for (const a of card.budgets) {
    const b = budgets[a.id];
    const requested = card.nominal_reduction * a.weight * diminishingFactor(b);
    const available = Math.max(0, b.remaining - b.floor);
    const applied = Math.min(requested, available);
    b.remaining -= applied;
    b.reductions.push({ card_id: card.card_id, amount: applied, kind: "normal" });
    actual += applied;
  }
  details.push({card_id: card.card_id, nominal: card.nominal_reduction, actual});
}

function applyTransformation(card, selectedIds, budgets, details) {
  const readiness = readinessFor(card, selectedIds);
  let actual = 0;
  const sectorResults = [];
  for (const [budgetId, fullTarget] of Object.entries(card.target_state || {})) {
    const b = budgets[budgetId];
    // Interpolate from original baseline toward the full-readiness target.
    const effectiveTarget = Math.max(
      b.floor,
      b.baseline - readiness * (b.baseline - fullTarget)
    );
    const potential = Math.max(0, b.remaining - effectiveTarget);
    sectorResults.push({budget_id:budgetId, full_target:fullTarget, effective_target:effectiveTarget, potential});
  }

  const totalPotential = sectorResults.reduce((s,x)=>s+x.potential,0);
  const cap = card.max_actual_reduction ?? Infinity;
  const scale = totalPotential > 0 ? Math.min(1, cap / totalPotential) : 0;

  for (const s of sectorResults) {
    const b = budgets[s.budget_id];
    const applied = s.potential * scale;
    b.remaining -= applied;
    if (applied > 0) b.reductions.push({card_id:card.card_id, amount:applied, kind:"transformation"});
    actual += applied;
    s.actual = applied;
    delete s.potential;
  }
  details.push({card_id:card.card_id, nominal:card.nominal_reduction, readiness, cap: Number.isFinite(cap)?cap:null, actual, sectors:sectorResults});
}


function applyIntegratedTransitionBonus(transformations, budgets) {
  // Reward coordinated, well-prepared system change without strengthening any individual card.
  // Exactly two R3 cards are expected in legal play. Bonus scales from 400 to 800 kg
  // when BOTH transformations have readiness >= 0.80.
  if (transformations.length !== 2) return { eligible:false, actual:0, nominal:0, reason:"requires_exactly_two_transformations" };

  const readiness = transformations.map(t => t.readiness);
  const minReadiness = Math.min(...readiness);
  if (minReadiness < 0.80) {
    return { eligible:false, actual:0, nominal:0, minReadiness, reason:"both_transformations_need_0.80_readiness" };
  }

  // 0.80 => 400 kg; 0.90 => 600 kg; 1.00 => 800 kg.
  const nominal = 400 + ((minReadiness - 0.80) / 0.20) * 400;

  // Allocate bonus across the largest remaining reducible budgets first.
  // This avoids hard-wiring the bonus to a specific transformation pair.
  let left = nominal;
  const allocations = [];
  const candidates = Object.entries(budgets)
    .map(([id,b]) => ({id, available:Math.max(0,b.remaining-b.floor)}))
    .filter(x => x.available > 0)
    .sort((a,b) => b.available-a.available);

  for (const c of candidates) {
    if (left <= 0) break;
    const b = budgets[c.id];
    const applied = Math.min(left, Math.max(0,b.remaining-b.floor));
    if (applied > 0) {
      b.remaining -= applied;
      b.reductions.push({card_id:"INTEGRATED_TRANSITION_BONUS", amount:applied, kind:"integrated_bonus"});
      allocations.push({budget_id:c.id, amount:applied});
      left -= applied;
    }
  }

  return {
    eligible:true,
    minReadiness,
    nominal,
    actual:nominal-left,
    allocations
  };
}

function applySynergies(selected, selectedIds, budgets, details) {
  const pairs = new Set();
  for (const card of selected.filter(c => c.action_type !== "TRANSFORMATION")) {
    for (const s of card.synergies || []) {
      if (!selectedIds.has(s.card_id)) continue;
      const other = cardMap.get(s.card_id);
      if (!other || other.action_type === "TRANSFORMATION") continue;
      const key=[card.card_id,s.card_id].sort().join("+");
      if (pairs.has(key)) continue;
      pairs.add(key);
      const budgetIds=[...new Set([...card.budgets,...other.budgets].map(x=>x.id))];
      let left=s.bonus, actual=0;
      for (let i=0;i<budgetIds.length;i++) {
        const id=budgetIds[i], b=budgets[id];
        const share=left/(budgetIds.length-i);
        const applied=Math.min(share, Math.max(0,b.remaining-b.floor));
        b.remaining-=applied; left-=applied; actual+=applied;
        if(applied>0)b.reductions.push({card_id:`SYNERGY:${key}`,amount:applied,kind:"synergy"});
      }
      details.push({pair:key,nominal:s.bonus,actual});
    }
  }
}

export function calculateFootprint(selectedIdsInput) {
  const ids=[...new Set(selectedIdsInput)];
  const selectedIds=new Set(ids);
  const unknown=ids.filter(id=>!cardMap.has(id));
  if(unknown.length) throw new Error(`Unknown card id(s): ${unknown.join(", ")}`);
  const selected=ids.map(id=>cardMap.get(id));
  const budgets=Object.fromEntries(Object.entries(BASELINE.budgets).map(([id,b])=>[id,{
    baseline:b.baseline,remaining:b.baseline,floor:b.floor2050,reductions:[]
  }]));
  const cards=[], transformations=[], synergies=[];
  for(const c of selected.filter(c=>c.action_type!=="TRANSFORMATION")) applyNormal(c,budgets,cards);
  applySynergies(selected,selectedIds,budgets,synergies);
  for(const c of selected.filter(c=>c.action_type==="TRANSFORMATION")) applyTransformation(c,selectedIds,budgets,transformations);
  const integratedTransitionBonus = applyIntegratedTransitionBonus(transformations, budgets);

  const footprint=Object.values(budgets).reduce((s,b)=>s+b.remaining,0);
  return {
    baseline:BASELINE.total, footprint, footprintTonnes:+(footprint/1000).toFixed(3),
    reduction:BASELINE.total-footprint, reductionTonnes:+((BASELINE.total-footprint)/1000).toFixed(3),
    target2050:BASELINE.target2050, targetReached:footprint<=BASELINE.target2050,
    gapToTarget:Math.max(0,footprint-BASELINE.target2050),
    budgets, details:{cards,synergies,transformations,integratedTransitionBonus}
  };
}

export function validateLegalStrategy(ids) {
  const unique=[...new Set(ids)];
  const selected=unique.map(id=>cardMap.get(id)).filter(Boolean);
  const r1=selected.filter(c=>c.round===1);
  const r2=selected.filter(c=>c.round===2);
  const r3=selected.filter(c=>c.round===3);
  const r2tp=r2.reduce((s,c)=>s+c.transition_points,0);
  return {valid:r1.length===3 && r2tp<=10 && r3.length===2, round1Count:r1.length, round2TP:r2tp, round3Count:r3.length};
}
