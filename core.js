export const KEY='live-battle-v1';
export const defaults=()=>({version:1,lang:'en',title:'',brand:'BATTLE ARENA',instructions:'',logo:'',animations:true,running:false,finished:false,teams:[{id:'a',name:'',en:'',he:'',photo:'',color:'#087dff',color2:'#073bb5',x:50,y:50,zoom:1,start:0,score:0,gifts:[{id:'5655',points:1}]},{id:'b',name:'',en:'',he:'',photo:'',color:'#ad46ff',color2:'#4a16a6',x:50,y:50,zoom:1,start:0,score:0,gifts:[{id:'5269',points:1}]}],custom:[],events:[],seen:[],combos:{}});
export function load(){try{let raw=localStorage.getItem(KEY);if(!raw)return defaults();if(raw.length>MAX_IMPORT_BYTES)throw Error('Settings too large');return validateState(JSON.parse(raw))}catch{return defaults()}}
export function save(s){let data=JSON.stringify(validateState(s));if(data.length>MAX_IMPORT_BYTES)throw Error('Settings exceed 4 MB');localStorage.setItem(KEY,data);window.dispatchEvent(new Event('battle-update'))}
export const words={en:{title:'Vote LIVE',a:'Team A',b:'Team B',points:'Points',send:'Send a gift to vote',leading:'Leading',winner:'Winner',paused:'PAUSED',live:'LIVE',ready:'READY',coins:'Coins'},he:{title:'הצבעה בלייב',a:'קבוצה א׳',b:'קבוצה ב׳',points:'נקודות',send:'שלחו מתנה כדי להצביע',leading:'מוביל',winner:'מנצח',paused:'מושהה',live:'בשידור חי',ready:'מוכן',coins:'מטבעות'}};
export const name=(t,s)=>t[s.lang]||t.name||words[s.lang][t.id];
export const percent=s=>{let total=s.teams.reduce((a,t)=>a+t.score,0);return total?s.teams[0].score/total*100:50};
export function ingest(s,e){
 if(!s.running)return {ok:false,reason:'Battle paused'};
 if(!e||typeof e!=='object'||!/^\d{1,20}$/.test(String(e.giftId))||typeof e.eventId!=='string'||!e.eventId||e.eventId.length>200||typeof e.sessionId!=='string'||!e.sessionId||e.sessionId.length>200||e.sender!=null&&(typeof e.sender!=='string'||e.sender.length>200)||e.comboId!=null&&(typeof e.comboId!=='string'||!e.comboId||e.comboId.length>200))return {ok:false,reason:'Invalid event fields'};
 let key=JSON.stringify([e.sessionId,e.eventId]);
 // Recognize legacy keys too; never discard replay history silently.
 if(s.seen.includes(key)||s.seen.includes(e.sessionId+':'+e.eventId))return {ok:false,reason:'Duplicate event'};
 let n=Number(e.count??1);if(!Number.isSafeInteger(n)||n<1||n>100000)return {ok:false,reason:'Invalid count'};
 let k=e.comboId?JSON.stringify([e.sessionId,e.sender||'',String(e.giftId),e.comboId]):null;
 if(s.seen.length>=20000||(k&&!Object.hasOwn(s.combos,k)&&Object.keys(s.combos).length>=10000))return {ok:false,reason:'Replay protection capacity reached. Export a backup before starting a new configuration.'};
 let delta=k?Math.max(0,n-(Object.hasOwn(s.combos,k)?s.combos[k]:0)):n;
 if(k)s.combos[k]=Math.max(n,Object.hasOwn(s.combos,k)?s.combos[k]:0);s.seen.push(key);
 let t=s.teams.find(t=>t.gifts.some(g=>g.id===String(e.giftId))),mapping=t?.gifts.find(g=>g.id===String(e.giftId));
 if(t&&delta)t.score=Math.min(Number.MAX_SAFE_INTEGER,t.score+mapping.points*delta);
 s.events.unshift({giftId:String(e.giftId),sender:e.sender||'',delta,points:mapping?mapping.points*delta:0,team:t?.id,time:Date.now(),simulated:e.simulated===true});s.events=s.events.slice(0,40);return {ok:true,delta,team:t?.id};
}
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Treat imported files and persisted browser data as untrusted input.
export const MAX_IMPORT_BYTES=4_000_000;
const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
function textValue(v,max=200){if(typeof v!=='string'||v.length>max)throw Error('Invalid or oversized text');return v}
function numberValue(v,min=0,max=Number.MAX_SAFE_INTEGER,integer=false){if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max||(integer&&!Number.isSafeInteger(v)))throw Error('Invalid numeric value');return v}
function list(v,max){if(!Array.isArray(v)||v.length>max)throw Error('Invalid or oversized list');return v}
export function safeImage(v){
 if(typeof v!=='string'||v.length>1_500_000)return false;
 if(/^assets\/gifts\/\d{1,20}\.webp$/.test(v))return true;
 if(/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(v))return true;
 try{let u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password&&!/[\u0000-\u0020]/.test(v)&&v.length<=2048}catch{return false}
}
export function validateGift(g){
 if(!record(g)||!/^\d{1,20}$/.test(String(g.id))||!textValue(g.name,120)||!safeImage(g.image))throw Error('Invalid gift: numeric ID, name and safe image required');
 return {id:String(g.id),name:g.name,image:g.image,coins:g.coins==null?null:numberValue(g.coins,0,1e9,true),source:g.source==null?'':textValue(g.source,2048)};
}
export function validateTeams(teams){
 let ids=new Set(),giftIds=new Set();
 return list(teams,2).map(t=>{
  if(!record(t)||!['a','b'].includes(t.id)||ids.has(t.id)||!/^#[0-9a-f]{6}$/i.test(t.color)||!/^#[0-9a-f]{6}$/i.test(t.color2))throw Error('Invalid competitor');
  ids.add(t.id);if(t.photo&&!safeImage(t.photo))throw Error('Invalid portrait');
  let gifts=list(t.gifts,100).map(g=>{if(!record(g)||!/^\d{1,20}$/.test(g.id)||giftIds.has(g.id))throw Error('Invalid or duplicate gift mapping');giftIds.add(g.id);return{id:g.id,points:numberValue(g.points,1,1e9,true)}});
  return{id:t.id,name:textValue(t.name),en:textValue(t.en),he:textValue(t.he),photo:textValue(t.photo,1_500_000),color:t.color,color2:t.color2,x:numberValue(t.x,0,100),y:numberValue(t.y,0,100),zoom:numberValue(t.zoom,1,3),start:numberValue(t.start,0,1e12,true),score:numberValue(t.score,0,Number.MAX_SAFE_INTEGER,true),gifts};
 });
}
export function validateState(v){
 if(!record(v)||v.version!==1||!['en','he'].includes(v.lang)||v.teams?.length!==2||!record(v.combos))throw Error('Invalid settings file');
 for(let k of ['animations','running','finished'])if(typeof v[k]!=='boolean')throw Error('Invalid battle flags');
 let s={version:1,lang:v.lang,title:textValue(v.title,300),brand:textValue(v.brand,200),instructions:textValue(v.instructions,500),logo:textValue(v.logo,1_500_000),animations:v.animations,running:v.running,finished:v.finished,teams:validateTeams(v.teams),custom:list(v.custom,1000).map(validateGift),events:[],seen:list(v.seen,20000).map(k=>textValue(k,1100)),combos:Object.create(null)};
 if(s.logo&&!safeImage(s.logo))throw Error('Invalid logo');
 if(new Set(s.custom.map(g=>g.id)).size!==s.custom.length)throw Error('Duplicate catalog ID');
 s.events=list(v.events,40).map(e=>{if(!record(e)||!/^\d{1,20}$/.test(e.giftId))throw Error('Invalid gift event');return{giftId:e.giftId,sender:textValue(e.sender??'',200),delta:numberValue(e.delta,0,100000,true),points:numberValue(e.points,0,1e14,true),team:e.team==null?undefined:(['a','b'].includes(e.team)?e.team:undefined),time:numberValue(e.time,0,Number.MAX_SAFE_INTEGER,true),simulated:e.simulated===true}});
 let entries=Object.entries(v.combos);if(entries.length>10000)throw Error('Too many streaks');
 for(let[k,n]of entries){textValue(k,1100);s.combos[k]=numberValue(n,0,100000,true)}
 return s;
}
export function loadPresets(){try{let raw=localStorage.getItem('battle-presets');if(!raw)return Object.create(null);if(raw.length>MAX_IMPORT_BYTES)throw Error('Presets too large');let v=JSON.parse(raw);if(!record(v)||Object.keys(v).length>50)throw Error('Invalid presets');let out=Object.create(null);for(let[k,t]of Object.entries(v)){textValue(k,80);if(t.length!==2)throw Error('Invalid preset');out[k]=validateTeams(t)}return out}catch{return Object.create(null)}}
