import fs from 'node:fs';import assert from 'node:assert/strict';
const load=async file=>import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync(new URL('../'+file,import.meta.url),'utf8')).toString('base64'));
const{normalizeTikFinity:normalize,TikFinityConnection}=await load('tikfinity.js'),{defaults,ingest}=await load('core.js');let checks=[];
let raw={event:'gift',data:{giftId:5655,giftType:1,repeatEnd:false,repeatCount:2,msgId:'1',groupId:'combo',uniqueId:'viewer'}};
assert.equal(normalize(raw,'session').ignored,true);checks.push('Ignore unfinished gift streaks');
let s=defaults();s.running=true;raw.data.repeatEnd=true;const e=normalize(raw,'session').event;assert.equal(ingest(s,e).ok,true);assert.equal(s.teams[0].score,2);ingest(s,e);assert.equal(s.teams[0].score,2);checks.push('Score completed streak once');
raw.data.msgId='2';ingest(s,normalize(raw,'session').event);assert.equal(s.teams[0].score,2);raw.data.repeatCount=4;raw.data.msgId='3';ingest(s,normalize(raw,'session').event);assert.equal(s.teams[0].score,4);checks.push('Deduplicate final streak updates with different message IDs');
s=JSON.parse(JSON.stringify(s));ingest(s,e);assert.equal(s.teams[0].score,4);checks.push('Preserve replay protection after reload');
const single={event:'gift',data:{giftId:5269,giftType:0,repeatCount:3,msgId:'single',nickname:'Display',uniqueId:'user'}};ingest(s,normalize(single,'session').event);assert.equal(s.teams[1].score,3);checks.push('Map actual gift ID to the other competitor');
assert.ok(normalize({event:'gift',data:{...single.data,msgId:undefined}},'session').error);assert.ok(normalize({event:'gift',data:{...single.data,msgId:Number.MAX_SAFE_INTEGER+1}},'session').error);checks.push('Reject missing or unsafe message IDs');
assert.ok(normalize({event:'gift',data:{...single.data,repeatCount:-1}},'session').error);assert.ok(normalize({event:'gift',data:{...single.data,giftType:undefined}},'session').error);checks.push('Reject invalid quantities and unknown streak types');
assert.equal(normalize({event:'chat',data:{}},'session').ignored,true);checks.push('Ignore chat and non-gift messages');
let sockets=[],timers=[],statuses=[],messages=[];class FakeSocket{constructor(url){this.url=url;this.readyState=0;sockets.push(this)}close(){this.readyState=3;this.onclose?.()}open(){this.readyState=1;this.onopen?.()}}
const client=new TikFinityConnection({WebSocketClass:FakeSocket,onStatus:(state)=>statuses.push(state),onMessage:m=>messages.push(m),setTimer:(fn,delay)=>{let t={fn,delay};timers.push(t);return t},clearTimer:t=>{if(t)t.cleared=true}});
client.connect();sockets[0].open();sockets[0].onmessage({data:JSON.stringify(single)});assert.equal(messages.length,1);sockets[0].onmessage({data:'{invalid'});assert.ok(statuses.includes('warning'));checks.push('Process socket envelope and reject malformed JSON');
sockets[0].close();let retry=timers.find(t=>!t.cleared&&t.delay===1000);assert.ok(retry);retry.fn();assert.equal(sockets.length,2);sockets[1].open();client.disconnect();assert.equal(client.active,false);assert.equal(client.socket,null);checks.push('Reconnect automatically and stop on disconnect');
console.log('PASS',checks.length,'TikFinity adapter checks');fs.writeFileSync(new URL('tikfinity-results.json',import.meta.url),JSON.stringify({date:new Date().toISOString(),checks,actualTikFinityEvents:false},null,2));
