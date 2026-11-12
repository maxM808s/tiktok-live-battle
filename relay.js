import{validateState}from'./core.js';
export function overlaySnapshot(state){
 const s=validateState(state),ids=new Set(s.teams.flatMap(t=>t.gifts.map(g=>g.id)));
 return {...s,connection:{session:'overlay'},seen:[],combos:{},custom:s.custom.filter(g=>ids.has(g.id)),events:(s.appearance.showEvents||s.appearance.showLastGift||s.appearance.giftReactions)?s.events.filter(e=>!e.simulated&&e.delta>0).slice(0,1).map(e=>({...e,sender:s.appearance.showEvents?e.sender:''})):[]};
}
export class OverlayPublisher{
 constructor({onStatus=()=>{}}={}){this.onStatus=onStatus;this.key='';this.url='';this.pending=null;this.sending=false;this.stopped=false;this.waiters=[];this.matchSupport='unknown'}
 async start(){
  if(location.hostname!=='127.0.0.1'||location.protocol!=='http:'){this.onStatus('unavailable','Start the Windows overlay launcher to get your private Link source.');return false}
  const params=new URLSearchParams(location.hash.slice(1));const key=params.get('writer')||sessionStorage.getItem('battle-overlay-writer')||'';
  if(!/^[a-f0-9]{64}$/.test(key)){this.onStatus('unavailable','Open the dashboard from the launcher to authorize overlay publishing.');return false}
  this.key=key;this.matchSupport='unknown';
  if(params.has('writer')){sessionStorage.setItem('battle-overlay-writer',key);history.replaceState(null,'',location.pathname+location.search)}
  try{const response=await fetch('/api/overlay-link',{headers:{Authorization:'Bearer '+key},cache:'no-store'});if(!response.ok)throw Error();const data=await response.json(),u=new URL(data.url);if(u.origin!==location.origin||u.pathname!=='/overlay.html'||!/^#view=[a-f0-9]{64}$/.test(u.hash))throw Error();this.url=u.href;this.onStatus('ready','Private local overlay ready. Paste its link into LIVE Studio.');return true}catch{this.key='';this.onStatus('error','Relay authorization failed. Restart the launcher and use its new dashboard.');return false}
 }
 publish(state){if(!this.key||this.stopped)return;try{this.pending=JSON.stringify(overlaySnapshot(state));this.flush()}catch{this.onStatus('error','Invalid overlay snapshot; latest saved view retained.')}}
 async flush(){if(this.sending||this.pending===null||!this.key||this.stopped)return;this.sending=true;const body=this.pending;this.pending=null;try{const response=await fetch('/api/state',{method:'PUT',headers:{Authorization:'Bearer '+this.key,'Content-Type':'application/json'},body,cache:'no-store',signal:AbortSignal.timeout(5000)});if(!response.ok)throw Error();const state=JSON.parse(body);if(state.match?.mode!=='unlimited'&&this.matchSupport==='unknown'){const view=new URLSearchParams(new URL(this.url).hash.slice(1)).get('view');if(!/^[a-f0-9]{64}$/.test(view||''))throw Error();const check=await fetch('/api/state',{headers:{Authorization:'Bearer '+view},cache:'no-store',signal:AbortSignal.timeout(5000)});if(!check.ok)throw Error();const received=await check.json();this.matchSupport=received.state?.match?.mode===state.match.mode?'supported':'outdated'}if(state.match?.mode!=='unlimited'&&this.matchSupport==='outdated')this.onStatus('outdated','Timer/rounds are missing from the running relay. Close the launcher, pull the latest files, run Start-Overlay.cmd again, and replace the LIVE Studio link.');else this.onStatus('ready','Overlay synchronized with your latest settings and scores.')}catch{this.onStatus('error','Overlay stopped updating. Check the launcher, then retry overlay sync.');this.pending=null;this.stopped=true}finally{this.sending=false;if(this.pending!==null)this.flush()}}
 retry(state){this.matchSupport='unknown';this.stopped=false;this.publish(state)}
}
