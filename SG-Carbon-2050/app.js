import { CARDS } from "./engine/cards.js";
import { BASELINE } from "./engine/baseline.js";
import { calculateFootprint } from "./engine/calculateFootprint.js";

const VISUAL_BOARD = "./assets/carbon2050-visual-board.png";
const STAGES = ["brief", "r1", "reveal1", "r2", "reveal2", "r3", "final"];
const ratings = [
  [7, "Transition Stalled", "🔴"],
  [5.5, "Transition Underway", "🟠"],
  [4, "Strong Transition", "🟡"],
  [3, "Deep Transition", "🟢"],
  [2.3, "Exceptional Transition", "🌟"],
  [0, "Near 2-Tonne Singapore", "🏆"]
];

const state = {
  stage: "brief",
  selected: [],
  team: "Team Merlion"
};

const cardVisuals = {
  SG01:["cool","Efficient cooling"], SG02:["power","Smart energy"], SG03:["transit","Public transport"], SG04:["bike","Walk & cycle"],
  SG05:["food","Lower-carbon meals"], SG06:["food","Waste less food"], SG07:["circular","Use things longer"], SG08:["flight","Fly less"],
  SG09:["solar","Solar Singapore"], SG10:["grid","Clean electricity"], SG11:["building","Green buildings"], SG12:["transit","Active mobility"],
  SG13:["ev","Electric mobility"], SG14:["industry","Cleaner industry"], SG15:["circular","Circular economy"], SG16:["food","Food transition"],
  SG17:["waste","Zero waste"], SG18:["nature","Green & cool"], SG19:["grid","Regional clean grid"], SG20:["industry","Net-zero industry"],
  SG21:["flight","Clean aviation"], SG22:["food","Low-carbon food"], SG23:["circular","Circular Singapore"]
};

function escapeHtml(value="") {
  return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}

function icon(name, cls="") {
  const paths = {
    leaf:'<path d="M20 4c-7 0-12 4-12 10 0 2 1 4 3 5 1-5 4-8 8-11-3 4-5 8-5 12"/><path d="M4 20c3-6 7-10 14-14"/>',
    home:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    train:'<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M8 7h8M8 12h8M8 21l2-4M16 17l2 4"/>',
    plane:'<path d="M22 2 9 15"/><path d="m22 2-7 20-4-9-9-4Z"/>',
    food:'<path d="M6 3v8M9 3v8M3 3v5c0 2 1 3 3 3v10"/><path d="M15 3v18M15 3c4 1 5 5 5 8h-5"/>',
    bag:'<path d="M6 7h12l1 14H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    factory:'<path d="M3 21V10l6 3V9l6 3V5l6 4v12Z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
    zap:'<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    restart:'<path d="M3 12a9 9 0 1 0 3-7"/><path d="M3 4v6h6"/>',
    trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M12 13v5M8 21h8M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/>',
    link:'<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/>',
    arrow:'<path d="M5 12h14M14 7l5 5-5 5"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    building:'<path d="M4 21V3h11v18M15 8h5v13M8 7h3M8 11h3M8 15h3M17 12h1M17 16h1"/>',
    bike:'<circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="m5 17 4-7 3 7 3-7 4 7M9 10h5M12 7h3"/>',
    recycle:'<path d="m8 5 2-3 2 3M10 2l3 5H8M18 10l3 1-1 3M21 11l-4 4-2-4M8 19l-1 3-3-1M7 22l-3-5 5 1"/>',
    car:'<path d="M5 17h14l-1-6-3-4H9l-3 4Z"/><path d="M3 17h18v3H3z"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>',
    tree:'<path d="M12 22v-6"/><path d="M7 16h10l-2-4h3l-4-8-4 8h3Z"/>',
    wind:'<path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>'
  };
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.leaf}</svg>`;
}

const budgetIcon = {POWER_HOME:"home", LAND_TRANSPORT:"train", AVIATION:"plane", FOOD:"food", GOODS:"bag", SHARED_SYSTEMS:"factory"};
const visualIcon = {cool:"wind", power:"zap", transit:"train", bike:"bike", food:"food", circular:"recycle", flight:"plane", solar:"sun", grid:"zap", building:"building", ev:"car", industry:"factory", waste:"recycle", nature:"tree"};

function getSets() {
  const selectedCards = CARDS.filter(c => state.selected.includes(c.card_id));
  const r1ids = selectedCards.filter(c=>c.round===1).map(c=>c.card_id);
  const r2ids = selectedCards.filter(c=>c.round===2).map(c=>c.card_id);
  const r3ids = selectedCards.filter(c=>c.round===3).map(c=>c.card_id);
  const tp = CARDS.filter(c=>c.round===2 && r2ids.includes(c.card_id)).reduce((s,c)=>s+c.transition_points,0);
  return {selectedCards,r1ids,r2ids,r3ids,tp};
}

function readiness(cardId) {
  const c = CARDS.find(x => x.card_id === cardId);
  let v = c.readiness?.base ?? 1;
  for (const [id,b] of Object.entries(c.readiness?.bonuses || {})) if (state.selected.includes(id)) v += b;
  return Math.min(1,v);
}

function rating(v) { return ratings.find(([min]) => v > min) || ratings.at(-1); }

function journey() {
  return `<div class="journey"><div class="journeyLine"></div>${[["2026","Start"],["2030","Choices"],["2040","Systems"],["2050","Transform"]].map(x=>`<div class="journeyStop"><i></i><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div>`;
}

function scene(kind, text="", showJourney=false) {
  return `<div class="scene ${kind}"><img src="${VISUAL_BOARD}" alt="" aria-hidden="true"><div class="sceneShade"></div>${showJourney?journey():""}${text?`<div class="sceneText">${escapeHtml(text)}</div>`:""}</div>`;
}

function budgets(result=calculateFootprint([])) {
  return `<div class="budgets">${Object.entries(result.budgets).map(([id,b])=>{
    const pct = b.remaining/b.baseline*100;
    return `<div class="budget">${icon(budgetIcon[id])}<div class="budgetBody"><div><span>${escapeHtml(BASELINE.budgets[id].name)}</span><b>${(b.remaining/1000).toFixed(2)} t</b></div><div class="bar"><i style="width:${pct}%"></i></div></div></div>`;
  }).join("")}</div>`;
}

function header() {
  return `<header><div class="brand"><div class="logo">${icon("leaf")}</div><div><b>SG CARBON 2050</b><small>Singapore Transition Simulator</small></div></div><div class="team">${escapeHtml(state.team)}</div><button class="reset" data-action="reset">${icon("restart","sm")} Restart</button></header>`;
}

function cardHtml(card, round, selected, disabled) {
  const vis = cardVisuals[card.card_id] || ["nature","Transition action"];
  const ready = round===3 ? readiness(card.card_id) : null;
  const desc = card.action_type === "PERSONAL" ? "Change everyday demand and choices." : card.action_type === "SYSTEM" ? "Invest in Singapore's enabling systems." : "Transform Singapore's long-term carbon system.";
  return `<button class="card ${selected?"selected":""}" data-card="${card.card_id}" ${disabled?"disabled":""}>
    <div class="cardTop"><span class="tag">${escapeHtml(card.category)}</span><span class="id">${card.card_id}</span></div>
    <div class="cardVisual ${vis[0]}">${icon(visualIcon[vis[0]],"lg")}<span>${escapeHtml(vis[1])}</span></div>
    <h3>${escapeHtml(card.title)}</h3><p>${desc}</p>
    <div class="cardMeta"><span>Difficulty ${"●".repeat(card.difficulty)}${"○".repeat(5-card.difficulty)}</span><span>Acceptance ${"●".repeat(card.acceptance)}${"○".repeat(5-card.acceptance)}</span></div>
    ${card.round===2?`<div class="tp">${icon("zap","sm")} ${card.transition_points} TP</div>`:""}
    ${card.round===3?`<div class="ready"><div><span>Readiness</span><b>${Math.round(ready*100)}%</b></div><div class="meter"><i style="width:${ready*100}%"></i></div></div>`:""}
    <div class="impact">Potential impact <b>${card.round===3?"VERY HIGH":"???"}</b></div>
  </button>`;
}

function renderBrief() {
  return `<main>${header()}<section class="heroVisual">
    <div class="heroPhoto"><img src="${VISUAL_BOARD}" alt="Illustrated vision of a greener Singapore 2050"><div class="heroOverlay"></div><div class="heroCopy">
      <span class="eyebrow light">PEOPLE • CHOICES • SYSTEMS</span><h1>SG CARBON<br><em>2050</em></h1>
      <p>Can we build a <b>2-tonne Singapore?</b><br>The future is in your hands.</p>
      <label>TEAM NAME<input id="teamInput" value="${escapeHtml(state.team)}" maxlength="40"></label>
      <button class="primary bright" data-action="next">Start game ${icon("arrow")}</button>
    </div></div>
    <div class="challenge"><div><span class="eyebrow">SINGAPORE'S 2026 BASELINE</span><h2>Our lifestyle has a global footprint.</h2><p>Start at <b>12.0 tCO₂e per person</b>. Make choices, invest in systems and build readiness for transformation.</p>${journey()}<p class="source-note">Educational consumption-footprint model; not Singapore's territorial emissions per person.</p></div>
    <div class="baselinePanel"><span>2026 FOOTPRINT</span><strong>12.0</strong><b>tCO₂e / person / year</b>${budgets()}<div class="target">${icon("trophy")}2050 aspiration <strong>2.0 t</strong></div></div></div>
  </section></main>`;
}

function renderRound(round) {
  const {r1ids,r2ids,r3ids,tp} = getSets();
  const list = CARDS.filter(c=>c.round===round);
  const count = round===1 ? r1ids.length : round===3 ? r3ids.length : null;
  const canLock = round===1 ? count===3 : round===2 ? tp<=10 && r2ids.length>0 : count===2;
  const title = round===1 ? "Change our choices" : round===2 ? "Change the system" : "Transform Singapore";
  const dates = round===1 ? "2026 → 2030" : round===2 ? "2030 → 2040" : "2040 → 2050";
  const explain = round===1 ? "Choose exactly 3 personal actions." : round===2 ? "Spend up to 10 Transition Points on enabling systems." : "Choose exactly 2 deep transformations. High readiness unlocks stronger results.";
  const cards = list.map(c=>{
    const selected=state.selected.includes(c.card_id);
    const disabled=!selected && ((round===1&&count>=3)||(round===3&&count>=2)||(round===2&&tp+c.transition_points>10));
    return cardHtml(c,round,selected,disabled);
  }).join("");
  const counter = round===2 ? `${icon("zap")}<strong>${10-tp}</strong><span>TP left</span>` : `<strong>${count}/ ${round===1?3:2}</strong><span>selected</span>`;
  const barText = round===2 ? `${tp}/10 Transition Points committed` : round===3 ? "Your final choices cannot be changed after reveal." : "Your choices shape later readiness.";
  return `<main>${header()}<section class="game">${scene(`round${round}`,"",true)}<div class="roundHead"><div><span class="eyebrow">ROUND ${round} • ${dates}</span><h1>${title}</h1><p>${explain}</p></div><div class="counter">${counter}</div></div><div class="cards">${cards}</div><div class="actionbar"><span>${barText}</span><button class="primary" data-action="next" ${canLock?"":"disabled"}>${icon("lock","sm")} Lock plan</button></div></section></main>`;
}

function resultForStage(stage) {
  const {r1ids,r2ids}=getSets();
  const ids = stage==="reveal1" ? r1ids : stage==="r2" ? r1ids : stage==="reveal2" ? [...r1ids,...r2ids] : state.selected;
  return calculateFootprint(ids);
}

function renderReveal(stage) {
  const yr=stage==="reveal1"?2030:2040;
  const nextTitle=stage==="reveal1"?"Enter Round 2":"Enter final round";
  const result=resultForStage(stage);
  const r3=CARDS.filter(c=>c.round===3);
  const mini=yr===2040?`<div class="miniReady">${r3.map(c=>`<div><span>${escapeHtml(c.title)}</span><b>${Math.round(readiness(c.card_id)*100)}%</b></div>`).join("")}</div>`:"";
  const insightTitle=yr===2030?"Personal action matters—but isn't enough.":"Your 2040 investments created transformation readiness.";
  const insightText=yr===2030?"The next decade is about infrastructure, technology and policy.":"Round 3 will show which deep transitions Singapore is actually prepared to make.";
  return `<main>${header()}<section class="reveal">${scene(yr===2030?"choices":"systems",yr===2030?"Small choices. Bigger possibilities.":"You've built the foundations for a cleaner, stronger Singapore.")}
    <span class="eyebrow">SINGAPORE • ${yr}</span><h1>Your transition so far</h1>
    <div class="scoreRow"><div><small>2026 BASELINE</small><strong>12.00 t</strong></div>${icon("arrow")}<div class="bigScore"><small>CURRENT FOOTPRINT</small><strong>${result.footprintTonnes.toFixed(2)} t</strong><span>−${result.reductionTonnes.toFixed(2)} t</span></div>${icon("arrow")}<div><small>2050 ASPIRATION</small><strong>2.00 t</strong></div></div>
    <div class="revealGrid">${budgets(result)}<div class="insight">${icon("info")}<h3>${insightTitle}</h3><p>${insightText}</p>${mini}</div></div>
    <button class="primary" data-action="next">${nextTitle} ${icon("arrow")}</button></section></main>`;
}

function renderFinal() {
  const {selectedCards}=getSets();
  const result=calculateFootprint(state.selected);
  const rr=rating(result.footprintTonnes);
  const bonus=result.details.integratedTransitionBonus;
  const bonusHtml=bonus?.eligible?`<div class="bonus">${icon("link")}<div><b>Integrated Transition unlocked</b><span>Both transformations were highly prepared.</span></div><strong>−${(bonus.actual/1000).toFixed(2)} t</strong></div>`:"";
  const path=[1,2,3].map(n=>`<div><span>ROUND ${n}</span><p>${selectedCards.filter(c=>c.round===n).map(c=>escapeHtml(c.title)).join(" • ")}</p></div>`).join("");
  return `<main>${header()}<section class="final">${scene("future","A cleaner, stronger, more liveable Singapore.")}<span class="eyebrow">SINGAPORE • 2050</span><h1>${rr[2]} ${rr[1]}</h1>
    <div class="finalScore"><small>YOUR 2050 FOOTPRINT</small><strong>${result.footprintTonnes.toFixed(2)}</strong><b>tCO₂e / person / year</b><div class="gap">Remaining gap to 2.0 t: <b>${(result.gapToTarget/1000).toFixed(2)} t</b></div></div>
    ${bonusHtml}<div class="finalGrid"><div><h2>What's left?</h2>${budgets(result)}</div><div class="path"><h2>Your pathway</h2>${path}<hr><h3>Debrief</h3><p>Which earlier investment unlocked something important later? Why could no single technology solve the problem? What would Singapore need to do next?</p></div></div>
    <button class="primary" data-action="reset">${icon("restart")} Play another pathway</button>
  </section></main>`;
}

function render() {
  const app=document.getElementById("app");
  if (state.stage==="brief") app.innerHTML=renderBrief();
  else if (state.stage==="r1") app.innerHTML=renderRound(1);
  else if (state.stage==="r2") app.innerHTML=renderRound(2);
  else if (state.stage==="r3") app.innerHTML=renderRound(3);
  else if (state.stage==="reveal1"||state.stage==="reveal2") app.innerHTML=renderReveal(state.stage);
  else app.innerHTML=renderFinal();
  bindEvents();
  window.scrollTo({top:0,behavior:"smooth"});
}

function next() {
  const i=STAGES.indexOf(state.stage);
  state.stage=STAGES[Math.min(i+1,STAGES.length-1)];
  render();
}

function reset() {
  state.stage="brief"; state.selected=[]; render();
}

function toggleCard(id) {
  const card=CARDS.find(c=>c.card_id===id);
  if(!card) return;
  const selected=state.selected.includes(id);
  if(selected) state.selected=state.selected.filter(x=>x!==id);
  else {
    const {r1ids,r2ids,r3ids,tp}=getSets();
    if(card.round===1 && r1ids.length>=3) return;
    if(card.round===3 && r3ids.length>=2) return;
    if(card.round===2 && tp+card.transition_points>10) return;
    state.selected=[...state.selected,id];
  }
  render();
}

function bindEvents() {
  document.querySelectorAll("[data-action='next']").forEach(b=>b.addEventListener("click",next));
  document.querySelectorAll("[data-action='reset']").forEach(b=>b.addEventListener("click",reset));
  document.querySelectorAll("[data-card]").forEach(b=>b.addEventListener("click",()=>toggleCard(b.dataset.card)));
  const input=document.getElementById("teamInput");
  if(input) input.addEventListener("input",e=>{state.team=e.target.value || "Team Merlion"; const team=document.querySelector(".team"); if(team) team.textContent=state.team;});
}

render();
