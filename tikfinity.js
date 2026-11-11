// Endpoint and envelope: https://tikfinity.zerody.one/tiktok/dapi
export const TIKFINITY_URL='ws://localhost:21213/';
const identifier=v=>(typeof v==='string'&&v.length>0&&v.length<=200)||(typeof v==='number'&&Number.isSafeInteger(v)&&v>=0);
export function normalizeTikFinity(message,session){
 if(!message||message.event!=='gift')return {ignored:true,reason:'Not a gift event'};
 const d=message.data;if(!d||typeof d!=='object'||Array.isArray(d))return {error:'Invalid gift payload'};
 if(!((typeof d.giftId==='string'&&/^\d{1,20}$/.test(d.giftId))||(typeof d.giftId==='number'&&Number.isSafeInteger(d.giftId)&&d.giftId>=0)))return {error:'Gift missing a valid giftId'};
 const type=d.giftType??d.gift?.type;
 if(!Number.isInteger(type)||type<0||type>100)return {error:'Gift type missing; cannot safely identify streak updates'};
 const end=d.repeatEnd===true||d.repeatEnd===1;
 // Count completed streaks only. Partial updates and reconnects cannot award early points.
 if(type===1&&!end)return {ignored:true,reason:'Waiting for gift streak to finish'};
 const msgId=d.msgId??d.common?.msgId;
 if(!identifier(msgId))return {error:'Gift has no stable msgId; not scored to avoid duplicate points'};
 if(typeof session!=='string'||!session.trim()||session.length>100)return {error:'Set a stream session label first'};
 const count=d.repeatCount??1;if(!Number.isSafeInteger(count)||count<1||count>100000)return {error:'Invalid gift repeat count'};
 const user=d.uniqueId??d.user?.uniqueId??d.user?.displayId??d.userId??d.user?.userId??'';
 if(typeof user!=='string'&&!(typeof user==='number'&&Number.isSafeInteger(user)))return {error:'Invalid sender identifier'};
 if(String(user).length>200)return {error:'Sender identifier too long'};
 if(type===1&&d.groupId!=null&&d.groupId!==''&&!identifier(d.groupId))return {error:'Invalid streak identifier'};
 const sender=String(user),event={giftId:String(d.giftId),eventId:String(msgId),sessionId:'tikfinity:'+session.trim(),sender,count};
 if(type===1&&identifier(d.groupId)&&String(d.groupId)!=='0'){
  if(!sender)return {error:'Streak has no sender identifier; not scored'};
  event.comboId=String(d.groupId);
 }
 return {event};
}
export class TikFinityConnection{
 constructor({onStatus=()=>{},onMessage=()=>{},WebSocketClass=globalThis.WebSocket,setTimer=(fn,ms)=>globalThis.setTimeout(fn,ms),clearTimer=id=>globalThis.clearTimeout(id)}={}){this.onStatus=onStatus;this.onMessage=onMessage;this.Socket=WebSocketClass;this.setTimer=setTimer;this.clearTimer=clearTimer;this.active=false;this.attempt=0;this.timer=null;this.openTimer=null;this.socket=null;this.generation=0}
 connect(){this.disconnect(false);this.active=true;this.attempt=0;this.open()}
 open(){if(!this.active)return;const generation=++this.generation;this.onStatus('connecting','Connecting to TikFinity Desktop…');let socket;
  try{socket=new this.Socket(TIKFINITY_URL);this.socket=socket}catch{this.retry(generation);return}
  const timeout=this.openTimer=this.setTimer(()=>{if(generation===this.generation&&socket.readyState!==1){socket.close();this.retry(generation)}},8000);
  socket.onopen=()=>{this.clearTimer(timeout);if(this.openTimer===timeout)this.openTimer=null;if(!this.active||generation!==this.generation){socket.close();return}this.attempt=0;this.onStatus('connected','Socket connected — waiting for TikFinity gift events')};
  socket.onmessage=e=>{if(!this.active||generation!==this.generation)return;if(typeof e.data!=='string'||e.data.length>256000){this.onStatus('warning','Oversized or unsupported event ignored');return}let message;try{message=JSON.parse(e.data)}catch{this.onStatus('warning','Malformed event ignored');return}try{this.onMessage(message)}catch{this.disconnect(false);this.onStatus('error','Gift processing failed. Check settings before reconnecting.')}};
  socket.onerror=()=>{if(generation===this.generation)this.onStatus('error','Cannot reach TikFinity. Open its Desktop app and check browser local-network permissions.')};
  socket.onclose=()=>{this.clearTimer(timeout);if(this.openTimer===timeout)this.openTimer=null;this.retry(generation)};
 }
 retry(generation){if(!this.active||generation!==this.generation||this.timer!==null)return;this.socket=null;let delay=Math.min(30000,1000*2**Math.min(this.attempt++,5));this.onStatus('reconnecting','Disconnected. Retrying in '+delay/1000+'s…');this.timer=this.setTimer(()=>{this.timer=null;this.open()},delay)}
 disconnect(announce=true){this.active=false;this.generation++;if(this.openTimer!==null){this.clearTimer(this.openTimer);this.openTimer=null}if(this.timer!==null){this.clearTimer(this.timer);this.timer=null}if(this.socket){this.socket.onclose=null;this.socket.onerror=null;this.socket.onmessage=null;this.socket.onopen=null;try{this.socket.close()}catch{}this.socket=null}if(announce)this.onStatus('disconnected','Disconnected')}
}
