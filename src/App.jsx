import React,{useMemo,useState}from"react";
import{Leaf,Home,Train,Plane,Utensils,ShoppingBag,Factory,Zap,LockKeyhole,RotateCcw,ChevronRight,Trophy,Link2,Info,Sun,Building2,Bike,Recycle,CarFront,Salad,TreePine,Wind,Users,ArrowRight}from"lucide-react";
import visualBoard from "./assets/carbon2050-visual-board.png";
import{CARDS}from"./engine/cards.js";
import{BASELINE}from"./engine/baseline.js";
import{calculateFootprint}from"./engine/calculateFootprint.js";

const stages=["brief","r1","reveal1","r2","reveal2","r3","final"];
const icons={POWER_HOME:Home,LAND_TRANSPORT:Train,AVIATION:Plane,FOOD:Utensils,GOODS:ShoppingBag,SHARED_SYSTEMS:Factory};
const ratings=[
 [7,"Transition Stalled","🔴"],[5.5,"Transition Underway","🟠"],[4,"Strong Transition","🟡"],[3,"Deep Transition","🟢"],[2.3,"Exceptional Transition","🌟"],[0,"Near 2-Tonne Singapore","🏆"]
];
function rating(v){return ratings.find(([min])=>v>min)||ratings.at(-1)}
function Card({card,selected,onClick,disabled,readiness}){
 return <button className={`card ${selected?"selected":""}`} onClick={onClick} disabled={disabled}>
  <div className="cardTop"><span className="tag">{card.category}</span><span className="id">{card.card_id}</span></div>
  <div className={`cardVisual ${cardVisuals[card.card_id]?.[0]||"nature"}`}><VisualIcon type={cardVisuals[card.card_id]?.[0]}/><span>{cardVisuals[card.card_id]?.[1]}</span></div>
  <h3>{card.title}</h3>
  <p>{card.action_type==="PERSONAL"?"Change everyday demand and choices.":card.action_type==="SYSTEM"?"Invest in Singapore's enabling systems.":"Transform Singapore's long-term carbon system."}</p>
  <div className="cardMeta"><span>Difficulty {"●".repeat(card.difficulty)}{"○".repeat(5-card.difficulty)}</span><span>Acceptance {"●".repeat(card.acceptance)}{"○".repeat(5-card.acceptance)}</span></div>
  {card.round===2&&<div className="tp"><Zap size={14}/> {card.transition_points} TP</div>}
  {card.round===3&&readiness!=null&&<div className="ready"><div><span>Readiness</span><b>{Math.round(readiness*100)}%</b></div><div className="meter"><i style={{width:`${readiness*100}%`}}/></div></div>}
  <div className="impact">Potential impact <b>{card.round===3?"VERY HIGH":"???"}</b></div>
 </button>
}
function Budgets({result=calculateFootprint([])}){
 return <div className="budgets">{Object.entries(result.budgets).map(([id,b])=>{const I=icons[id];const pct=b.remaining/b.baseline*100;return <div className="budget" key={id}><I size={20}/><div className="budgetBody"><div><span>{BASELINE.budgets[id].name}</span><b>{(b.remaining/1000).toFixed(2)} t</b></div><div className="bar"><i style={{width:`${pct}%`}}/></div></div></div>})}</div>
}

const cardVisuals={
 SG01:["cool","Efficient cooling"],SG02:["power","Smart energy"],SG03:["transit","Public transport"],SG04:["bike","Walk & cycle"],
 SG05:["food","Lower-carbon meals"],SG06:["food","Waste less food"],SG07:["circular","Use things longer"],SG08:["flight","Fly less"],
 SG09:["solar","Solar Singapore"],SG10:["grid","Clean electricity"],SG11:["building","Green buildings"],SG12:["transit","Active mobility"],
 SG13:["ev","Electric mobility"],SG14:["industry","Cleaner industry"],SG15:["circular","Circular economy"],SG16:["food","Food transition"],
 SG17:["waste","Zero waste"],SG18:["nature","Green & cool"],SG19:["grid","Regional clean grid"],SG20:["industry","Net-zero industry"],
 SG21:["flight","Clean aviation"],SG22:["food","Low-carbon food"],SG23:["circular","Circular Singapore"]
};
function VisualIcon({type}){
 const map={cool:Wind,power:Zap,transit:Train,bike:Bike,food:Salad,circular:Recycle,flight:Plane,solar:Sun,grid:Zap,building:Building2,ev:CarFront,industry:Factory,waste:Recycle,nature:TreePine};
 const I=map[type]||Leaf; return <I size={30}/>;
}
function Journey(){
 return <div className="journey"><div className="journeyLine"/>{[["2026","Start"],["2030","Choices"],["2040","Systems"],["2050","Transform"]].map((x,i)=><div className="journeyStop" key={x[0]}><i/><b>{x[0]}</b><span>{x[1]}</span></div>)}</div>
}
function Scene({kind="city",children}){
 return <div className={`scene ${kind}`}><img src={visualBoard} alt="" aria-hidden="true"/><div className="sceneShade"/>{children&&<div className="sceneText">{children}</div>}</div>
}
export default function App(){
 const[stage,setStage]=useState("brief");const[selected,setSelected]=useState([]);const[team,setTeam]=useState("Team Merlion");
 const r1=CARDS.filter(c=>c.round===1),r2=CARDS.filter(c=>c.round===2),r3=CARDS.filter(c=>c.round===3);
 const selectedCards=CARDS.filter(c=>selected.includes(c.card_id));
 const r1ids=selectedCards.filter(c=>c.round===1).map(c=>c.card_id),r2ids=selectedCards.filter(c=>c.round===2).map(c=>c.card_id),r3ids=selectedCards.filter(c=>c.round===3).map(c=>c.card_id);
 const tp=r2.filter(c=>r2ids.includes(c.card_id)).reduce((s,c)=>s+c.transition_points,0);
 const currentIds=stage==="reveal1"?r1ids:stage==="r2"?r1ids:stage==="reveal2"?[...r1ids,...r2ids]:selected;
 const result=useMemo(()=>calculateFootprint(currentIds),[currentIds.join(",")]);
 const readiness=id=>{const c=r3.find(x=>x.card_id===id),r=c.readiness;let v=r.base;for(const[k,b]of Object.entries(r.bonuses||{}))if(selected.includes(k))v+=b;return Math.min(1,v)}
 function toggle(card){setSelected(x=>x.includes(card.card_id)?x.filter(i=>i!==card.card_id):[...x,card.card_id])}
 function reset(){setSelected([]);setStage("brief")}
 const next=()=>setStage(stages[Math.min(stages.indexOf(stage)+1,stages.length-1)]);
 const header=<header><div className="brand"><div className="logo"><Leaf/></div><div><b>CARBON 2050 SG</b><small>Singapore Transition Simulator</small></div></div><div className="team">{team}</div><button className="reset" onClick={reset}><RotateCcw size={16}/> Restart</button></header>;
 if(stage==="brief")return <main>{header}<section className="heroVisual"><div className="heroPhoto"><img src={visualBoard} alt="Illustrated vision of a greener Singapore 2050"/><div className="heroOverlay"/><div className="heroCopy"><span className="eyebrow light">PEOPLE • CHOICES • SYSTEMS</span><h1>CARBON<br/><em>2050 SG</em></h1><p>Can we build a <b>2-tonne Singapore?</b><br/>The future is in your hands.</p><label>TEAM NAME<input value={team} onChange={e=>setTeam(e.target.value)}/></label><button className="primary bright" onClick={next}>Start game <ArrowRight/></button></div></div><div className="challenge"><div><span className="eyebrow">SINGAPORE'S 2026 BASELINE</span><h2>Our lifestyle has a global footprint.</h2><p>Start at <b>12.0 tCO₂e per person</b>. Make choices, invest in systems and build readiness for transformation.</p><Journey/></div><div className="baselinePanel"><span>2026 FOOTPRINT</span><strong>12.0</strong><b>tCO₂e / person / year</b><Budgets/><div className="target"><Trophy/>2050 aspiration <strong>2.0 t</strong></div></div></div></section></main>;
 const round=stage==="r1"?1:stage==="r2"?2:stage==="r3"?3:null;
 if(round){
  const list=round===1?r1:round===2?r2:r3;const count=round===1?r1ids.length:round===3?r3ids.length:null;
  const canLock=round===1?count===3:round===2?tp<=10&&r2ids.length>0:count===2;
  return <main>{header}<section className="game"><Scene kind={`round${round}`}><Journey/></Scene><div className="roundHead"><div><span className="eyebrow">ROUND {round} • {round===1?"2026 → 2030":round===2?"2030 → 2040":"2040 → 2050"}</span><h1>{round===1?"Change our choices":round===2?"Change the system":"Transform Singapore"}</h1><p>{round===1?"Choose exactly 3 personal actions.":round===2?"Spend up to 10 Transition Points on enabling systems.":"Choose exactly 2 deep transformations. High readiness unlocks stronger results."}</p></div><div className="counter">{round===2?<><Zap/> <strong>{10-tp}</strong><span>TP left</span></>:<><strong>{count}/ {round===1?3:2}</strong><span>selected</span></>}</div></div>
  <div className="cards">{list.map(c=><Card key={c.card_id} card={c} selected={selected.includes(c.card_id)} onClick={()=>toggle(c)} readiness={round===3?readiness(c.card_id):null} disabled={!selected.includes(c.card_id)&&(round===1&&count>=3||round===3&&count>=2||round===2&&tp+c.transition_points>10)}/>)}</div>
  <div className="actionbar"><span>{round===2?`${tp}/10 Transition Points committed`:round===3?"Your final choices cannot be changed after reveal.":"Your choices shape later readiness."}</span><button className="primary" disabled={!canLock} onClick={next}><LockKeyhole size={17}/> Lock plan</button></div></section></main>
 }
 if(stage==="reveal1"||stage==="reveal2"){
  const yr=stage==="reveal1"?2030:2040;const nextTitle=stage==="reveal1"?"Enter Round 2":"Enter final round";
  return <main>{header}<section className="reveal"><Scene kind={yr===2030?"choices":"systems"}><span>{yr===2030?"Small choices. Bigger possibilities.":"You've built the foundations for a cleaner, stronger Singapore."}</span></Scene><span className="eyebrow">SINGAPORE • {yr}</span><h1>Your transition so far</h1><div className="scoreRow"><div><small>2026 BASELINE</small><strong>12.00 t</strong></div><ChevronRight/><div className="bigScore"><small>CURRENT FOOTPRINT</small><strong>{result.footprintTonnes.toFixed(2)} t</strong><span>−{result.reductionTonnes.toFixed(2)} t</span></div><ChevronRight/><div><small>2050 ASPIRATION</small><strong>2.00 t</strong></div></div><div className="revealGrid"><Budgets result={result}/><div className="insight"><Info/><h3>{yr===2030?"Personal action matters—but isn't enough.":"Your 2040 investments created transformation readiness."}</h3><p>{yr===2030?"The next decade is about infrastructure, technology and policy.":"Round 3 will show which deep transitions Singapore is actually prepared to make."}</p>{yr===2040&&<div className="miniReady">{r3.map(c=><div key={c.card_id}><span>{c.title}</span><b>{Math.round(readiness(c.card_id)*100)}%</b></div>)}</div>}</div></div><button className="primary" onClick={next}>{nextTitle}<ChevronRight/></button></section></main>
 }
 const rr=rating(result.footprintTonnes);const bonus=result.details.integratedTransitionBonus;
 return <main>{header}<section className="final"><Scene kind="future"><span>A cleaner, stronger, more liveable Singapore.</span></Scene><span className="eyebrow">SINGAPORE • 2050</span><h1>{rr[2]} {rr[1]}</h1><div className="finalScore"><small>YOUR 2050 FOOTPRINT</small><strong>{result.footprintTonnes.toFixed(2)}</strong><b>tCO₂e / person / year</b><div className="gap">Remaining gap to 2.0 t: <b>{(result.gapToTarget/1000).toFixed(2)} t</b></div></div>
 {bonus?.eligible&&<div className="bonus"><Link2/><div><b>Integrated Transition unlocked</b><span>Both transformations were highly prepared.</span></div><strong>−{(bonus.actual/1000).toFixed(2)} t</strong></div>}
 <div className="finalGrid"><div><h2>What's left?</h2><Budgets result={result}/></div><div className="path"><h2>Your pathway</h2>{[1,2,3].map(n=><div key={n}><span>ROUND {n}</span><p>{selectedCards.filter(c=>c.round===n).map(c=>c.title).join(" • ")}</p></div>)}<hr/><h3>Debrief</h3><p>Which earlier investment unlocked something important later? Why could no single technology solve the problem? What would Singapore need to do next?</p></div></div><button className="primary" onClick={reset}><RotateCcw/> Play another pathway</button></section></main>
}