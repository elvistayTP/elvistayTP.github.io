import test from "node:test";
import assert from "node:assert/strict";
import { calculateFootprint, validateLegalStrategy } from "../src/engine/calculateFootprint.js";
import { BASELINE } from "../src/engine/baseline.js";
import { CARDS } from "../src/engine/cards.js";

test("empty selection returns baseline",()=>assert.equal(calculateFootprint([]).footprint,12000));
test("all budgets respect floors",()=>{
  const r=calculateFootprint(CARDS.map(c=>c.card_id));
  for(const [id,b] of Object.entries(r.budgets)) assert.ok(b.remaining>=BASELINE.budgets[id].floor2050,id);
  assert.ok(r.footprint>=2000);
});
test("R3 readiness increases with preparation",()=>{
  const low=calculateFootprint(["SG19"]).details.transformations[0];
  const high=calculateFootprint(["SG09","SG10","SG13","SG19"]).details.transformations[0];
  assert.equal(low.readiness,.6); assert.ok(Math.abs(high.readiness-1) < 1e-9);
  assert.ok(high.actual>low.actual);
});
test("R3 preparation is not erased by transformation",()=>{
  const prep=calculateFootprint(["SG10","SG19"]);
  const noPrep=calculateFootprint(["SG19"]);
  assert.ok(prep.footprint<noPrep.footprint);
});
test("legal strategy validation",()=>{
  const x=validateLegalStrategy(["SG03","SG05","SG08","SG10","SG11","SG14","SG19","SG20"]);
  assert.equal(x.valid,false); // R2 costs 11 TP
  const y=validateLegalStrategy(["SG03","SG05","SG08","SG10","SG11","SG12","SG19","SG20"]);
  assert.equal(y.valid,true); // 4+3+2 = 9 TP
});
test("duplicates do not double count",()=>assert.equal(calculateFootprint(["SG08","SG08"]).footprint,calculateFootprint(["SG08"]).footprint));
test("unknown card fails clearly",()=>assert.throws(()=>calculateFootprint(["NOPE"]),/Unknown card/));

test("a highly prepared legal pathway can finish below 4 tonnes",()=>{
  const ids=["SG03","SG07","SG08","SG10","SG13","SG15","SG17","SG19","SG23"];
  const r=calculateFootprint(ids);
  assert.equal(validateLegalStrategy(ids).valid,true);
  assert.ok(r.footprintTonnes < 4.0);
  assert.ok(r.footprintTonnes >= 2.0);
});

test("no Round-3 transformation exceeds its explicit cap",()=>{
  const ids=CARDS.map(c=>c.card_id);
  const r=calculateFootprint(ids);
  for(const tr of r.details.transformations){
    const card=CARDS.find(c=>c.card_id===tr.card_id);
    if(card.max_actual_reduction!=null) assert.ok(tr.actual<=card.max_actual_reduction+1e-9,tr.card_id);
  }
});

test("integrated transition bonus requires both transformations at >= 0.80 readiness",()=>{
  const low=calculateFootprint(["SG19","SG23"]);
  assert.equal(low.details.integratedTransitionBonus.eligible,false);

  const high=calculateFootprint(["SG07","SG10","SG13","SG15","SG17","SG19","SG23"]);
  assert.equal(high.details.integratedTransitionBonus.eligible,true);
  assert.ok(high.details.integratedTransitionBonus.actual>=400);
  assert.ok(high.details.integratedTransitionBonus.actual<=800+1e-9);
});

test("integrated bonus never pushes any sector below its floor",()=>{
  const r=calculateFootprint(CARDS.map(c=>c.card_id));
  for(const [id,b] of Object.entries(r.budgets)) {
    assert.ok(b.remaining>=BASELINE.budgets[id].floor2050,id);
  }
});
