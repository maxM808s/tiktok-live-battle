// Design values use pixels on the 1080px-wide broadcast canvas.
export const fontChoices={system:{label:'System · clean',css:'-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, "Noto Sans Hebrew", sans-serif'},rounded:{label:'Friendly · Trebuchet',css:'"Trebuchet MS", Arial, sans-serif'},serif:{label:'Classic · Georgia',css:'Georgia, "Times New Roman", serif'},arial:{label:'Arial · neutral',css:'Arial, "Noto Sans Hebrew", sans-serif'},verdana:{label:'Verdana · wide',css:'Verdana, Arial, sans-serif'},tahoma:{label:'Tahoma · compact / Hebrew',css:'Tahoma, Arial, sans-serif'},impact:{label:'Impact · bold display',css:'Impact, "Arial Black", Arial, sans-serif'},mono:{label:'Monospace · technical',css:'"Courier New", Courier, monospace'},times:{label:'Times · editorial',css:'"Times New Roman", Times, serif'}};
Object.assign(fontChoices,{black:{label:'Arial Black · heavyweight',css:'"Arial Black", Arial, "Noto Sans Hebrew", sans-serif'},condensed:{label:'Condensed · narrow headlines',css:'"Bahnschrift Condensed", "Arial Narrow", Impact, Arial, sans-serif'},humanist:{label:'Humanist · soft modern',css:'Candara, Calibri, "Segoe UI", Arial, sans-serif'},book:{label:'Book · elegant serif',css:'Palatino, "Palatino Linotype", "Book Antiqua", Georgia, serif'},hebrewSerif:{label:'David · Hebrew serif',css:'David, "Noto Serif Hebrew", Georgia, serif'},hebrewSans:{label:'Miriam · Hebrew sans',css:'Miriam, "Noto Sans Hebrew", Tahoma, Arial, sans-serif'}});
export const designFields={
 vsSize:{label:'VS text',min:16,max:70,value:38},
 vsBadgeSize:{label:'VS badge',min:64,max:160,value:100},
 brandSize:{label:'Branding text',min:12,max:60,value:27},
 titleSize:{label:'Game title',min:36,max:130,value:86},
 nameSize:{label:'Competitor names',min:20,max:66,value:43},
 scoreSize:{label:'Score counters',min:48,max:120,value:86},
 instructionSize:{label:'Voting instructions',min:20,max:66,value:43},
 giftSize:{label:'Gift point values',min:18,max:46,value:29},
 labelSize:{label:'Points labels',min:16,max:40,value:28},
 logoSize:{label:'Logo height',min:24,max:140,value:54},
 portraitSize:{label:'Portrait diameter',min:260,max:400,value:367}
};
export const appearanceDefaults=()=>({...Object.fromEntries(Object.entries(designFields).map(([k,v])=>[k,v.value])),panelA:'#087dff',panelB:'#ad46ff',panelColors:false,layoutStyle:'studio',font:'system',weight:700,background:'#0b0d12',glow:'#202631',brandColor:'#ffffff',titleColor:'#ffffff',nameColor:'#ffffff',scoreColor:'#ffffff',instructionColor:'#ffffff',showChatWords:true,chatWordsEnabled:false,chatWordA:'',chatWordB:'',chatPointsA:1,chatPointsB:1,showLastGift:true,giftReactions:true,vsMotion:true,portraitMotion:true,giftMotion:true,ambientMotion:true,leaderMotion:true,giftRain:true,motionLevel:'balanced',vsStyle:'glass',vsText:'VS',vsColor:'#ffffff',vsBackgroundColor:'#454e75',showBrand:true,showTitle:true,showInstructions:true,showSubtitle:true,showEvents:true,showGifts:true,showPointLabels:true});
export const designThemes={original:{background:'#050e29',glow:'#153d87',brandColor:'#ffffff',titleColor:'#ffffff',nameColor:'#ffffff',scoreColor:'#ffffff',instructionColor:'#ffffff'},electric:{background:'#110923',glow:'#572382',brandColor:'#d4b6ff',titleColor:'#f2e5ff',nameColor:'#ffffff',scoreColor:'#ffffff',instructionColor:'#e1ccff'},midnight:{background:'#050e16',glow:'#114c55',brandColor:'#8fe9e5',titleColor:'#d9fffc',nameColor:'#ffffff',scoreColor:'#aefbf1',instructionColor:'#d9fffc'}};
export const themeLabels={studio:'Studio',original:'Original',electric:'Electric',midnight:'Midnight',blackYellow:'Black & Yellow',orangeBlack:'Orange & Black',crimson:'Crimson',emerald:'Emerald',ice:'Ice Blue',roseGold:'Rose Gold',monochrome:'Black & White',blueYellow:'Blue & Yellow'};
Object.assign(designThemes.original,{panelColors:true,panelA:'#087dff',panelB:'#ad46ff'});
Object.assign(designThemes.electric,{panelColors:true,panelA:'#9453e6',panelB:'#d550b2'});
Object.assign(designThemes.midnight,{panelColors:true,panelA:'#15a6a0',panelB:'#3b74c5'});
Object.assign(designThemes,{
 studio:{background:'#0b0d12',glow:'#202631',brandColor:'#f5f5f7',titleColor:'#f5f5f7',nameColor:'#f5f5f7',scoreColor:'#ffffff',instructionColor:'#f5f5f7',panelA:'#5b9df5',panelB:'#ad8ce7',panelColors:true},
 blueYellow:{background:'#070e24',glow:'#173c80',brandColor:'#ffe36b',titleColor:'#fff2b8',nameColor:'#ffffff',scoreColor:'#ffe04d',instructionColor:'#e2ecff',panelA:'#2877e4',panelB:'#e1ba26',panelColors:true},
 blackYellow:{background:'#080808',glow:'#493b0a',brandColor:'#ffdb4d',titleColor:'#fff1aa',nameColor:'#ffffff',scoreColor:'#ffdc33',instructionColor:'#fff0ad',panelA:'#e2b818',panelB:'#515151',panelColors:true},
 orangeBlack:{background:'#090909',glow:'#54200c',brandColor:'#ffb16a',titleColor:'#fff0df',nameColor:'#ffffff',scoreColor:'#ff9b39',instructionColor:'#ffd3ad',panelA:'#f17920',panelB:'#454545',panelColors:true},
 crimson:{background:'#12070a',glow:'#68152c',brandColor:'#ffa0b6',titleColor:'#fff0f3',nameColor:'#ffffff',scoreColor:'#ff8da8',instructionColor:'#ffd2dd',panelA:'#d63b58',panelB:'#6c314b',panelColors:true},
 emerald:{background:'#05110d',glow:'#11573c',brandColor:'#8ce8b8',titleColor:'#e8fff2',nameColor:'#ffffff',scoreColor:'#86efac',instructionColor:'#bdf5d5',panelA:'#20a46e',panelB:'#21645b',panelColors:true},
 ice:{background:'#06111c',glow:'#174d73',brandColor:'#b0eaff',titleColor:'#eefbff',nameColor:'#ffffff',scoreColor:'#a5e8ff',instructionColor:'#d1f2ff',panelA:'#479dcc',panelB:'#4c72ad',panelColors:true},
 roseGold:{background:'#170e0c',glow:'#633c31',brandColor:'#f6c4ac',titleColor:'#fff2e8',nameColor:'#ffffff',scoreColor:'#ffcfaa',instructionColor:'#f4d7c6',panelA:'#b56c58',panelB:'#997544',panelColors:true},
 monochrome:{background:'#060606',glow:'#353535',brandColor:'#e0e0e0',titleColor:'#ffffff',nameColor:'#ffffff',scoreColor:'#ffffff',instructionColor:'#dedede',panelA:'#858585',panelB:'#414141',panelColors:true}
});
export const battleStyles={
 studio:{label:'Studio Glass',description:'Refined glass panels and soft blue/lilac accents.',colors:['#5b9df5','#ad8ce7'],values:{...designThemes.studio,layoutStyle:'studio',font:'system',weight:700,titleSize:86,nameSize:43,scoreSize:86,portraitSize:367,vsSize:38,vsBadgeSize:100,vsStyle:'glass',vsColor:'#ffffff',vsBackgroundColor:'#454e75'}},
 liveBattle:{label:'LIVE Battle',description:'Inspired by your reference: vivid panels, white portrait rings, bold outlined scores and a wide bar.',colors:['#7945ff','#15baff'],values:{...designThemes.original,layoutStyle:'liveBattle',panelA:'#7945ff',panelB:'#15baff',background:'#020b32',glow:'#05388c',font:'arial',weight:900,titleSize:100,nameSize:61,scoreSize:118,portraitSize:400,vsSize:58,vsBadgeSize:136,vsStyle:'circle',vsColor:'#ffffff',vsBackgroundColor:'#078cff',scoreColor:'#fff3a6'}},
 neon:{label:'Neon Arcade',description:'Electric cyan and pink with glowing frames.',colors:['#16e5f4','#ff47c8'],values:{...designThemes.electric,layoutStyle:'neon',panelA:'#16e5f4',panelB:'#ff47c8',background:'#09031d',glow:'#42276b',font:'rounded',weight:900,titleSize:92,nameSize:48,scoreSize:105,portraitSize:367,vsSize:44,vsBadgeSize:116,vsStyle:'diamond',vsColor:'#ffffff',vsBackgroundColor:'#4d216c'}},
 gold:{label:'Golden Arena',description:'Black and gold with polished borders and large scores.',colors:['#e6b949','#8b7849'],values:{...designThemes.blackYellow,layoutStyle:'gold',panelA:'#e6b949',panelB:'#8b7849',font:'serif',weight:700,titleSize:92,nameSize:48,scoreSize:105,portraitSize:367,vsSize:42,vsBadgeSize:116,vsStyle:'circle',vsColor:'#ffe6a3',vsBackgroundColor:'#241d11'}},
 sports:{label:'Stadium',description:'Red versus blue with compact squared panels and a scoreboard feel.',colors:['#ef4444','#2687ff'],values:{...designThemes.original,layoutStyle:'sports',panelA:'#ef4444',panelB:'#2687ff',background:'#07121b',glow:'#173d48',font:'tahoma',weight:900,titleSize:94,nameSize:48,scoreSize:110,portraitSize:367,vsSize:46,vsBadgeSize:120,vsStyle:'minimal',vsColor:'#ffffff',vsBackgroundColor:'#142333'}},
 minimal:{label:'Mono Minimal',description:'Quiet black-and-white panels, thin borders and crisp numbers.',colors:['#c4c4c4','#686868'],values:{...designThemes.monochrome,layoutStyle:'minimal',font:'system',weight:600,titleSize:82,nameSize:42,scoreSize:90,portraitSize:350,vsSize:34,vsBadgeSize:86,vsStyle:'minimal',vsColor:'#ffffff',vsBackgroundColor:'#222222'}}
};
Object.assign(battleStyles,{
 poster:{label:'Bold Poster',description:'Hard-offset frames, oversized type and ticket-shaped gift labels.',colors:['#fb923c','#60a5fa'],values:{...battleStyles.sports.values,layoutStyle:'poster',font:'black',panelA:'#fb923c',panelB:'#60a5fa',background:'#15121b',glow:'#2b203a',vsStyle:'diamond',scoreSize:110}},
 blueprint:{label:'Blueprint',description:'Technical grid, dashed portrait rings and instrument-style score displays.',colors:['#2dd4bf','#60a5fa'],values:{...battleStyles.minimal.values,layoutStyle:'blueprint',font:'mono',panelA:'#2dd4bf',panelB:'#60a5fa',background:'#04121e',glow:'#0e3144',panelColors:true,vsStyle:'minimal',scoreSize:100}},
 editorial:{label:'Editorial',description:'Open columns, fine dividers, serif headlines and clean underlined scores.',colors:['#d4b895','#9daec9'],values:{...battleStyles.gold.values,layoutStyle:'editorial',font:'book',panelA:'#d4b895',panelB:'#9daec9',background:'#121318',glow:'#262731',titleSize:88,scoreSize:100,vsStyle:'minimal'}}
});
export function validateAppearance(v){
 let out=appearanceDefaults();if(v===undefined)return out;
 if(!record(v))throw Error('Invalid appearance settings');
 if(v.giftRain===undefined&&v.giftReactions===false)out.giftRain=false;
 for(let [k,f]of Object.entries(designFields))if(v[k]!==undefined)out[k]=numberValue(v[k],f.min,f.max,true);
 for(let k of ['background','glow','brandColor','titleColor','nameColor','scoreColor','instructionColor','panelA','panelB','vsColor','vsBackgroundColor'])if(v[k]!==undefined){if(typeof v[k]!=='string'||!/^#[0-9a-f]{6}$/i.test(v[k]))throw Error('Invalid design color');out[k]=v[k]}
 for(let k of ['showBrand','showTitle','showInstructions','showSubtitle','showEvents','showGifts','showPointLabels','panelColors','showLastGift','giftReactions','vsMotion','portraitMotion','giftMotion','ambientMotion','leaderMotion','giftRain','showChatWords','chatWordsEnabled'])if(v[k]!==undefined){if(typeof v[k]!=='boolean')throw Error('Invalid visibility setting');out[k]=v[k]}
 if(v.layoutStyle!==undefined){if(!Object.hasOwn(battleStyles,v.layoutStyle))throw Error('Invalid battle style');out.layoutStyle=v.layoutStyle}
 if(v.motionLevel!==undefined){if(!['calm','balanced','energetic'].includes(v.motionLevel))throw Error('Invalid motion level');out.motionLevel=v.motionLevel}
 for(const key of['chatPointsA','chatPointsB'])if(v[key]!==undefined)out[key]=numberValue(v[key],1,1000000,true);
 for(const key of['chatWordA','chatWordB'])if(v[key]!==undefined)out[key]=textValue(v[key],60);
 if(v.font!==undefined){if(!Object.hasOwn(fontChoices,v.font))throw Error('Invalid font');out.font=v.font}
 if(v.vsStyle!==undefined){if(!['glass','circle','diamond','minimal'].includes(v.vsStyle))throw Error('Invalid VS style');out.vsStyle=v.vsStyle}
 if(v.vsText!==undefined)out.vsText=textValue(v.vsText,12);
 if(v.weight!==undefined){if(![600,700,800,900].includes(v.weight))throw Error('Invalid font weight');out.weight=v.weight}
 return out;
}

export const matchDefaults=()=>({mode:'unlimited',duration:180,round:1,wins:{a:0,b:0},remainingMs:180000,deadline:0,phase:'ready',roundWinner:null,winner:null});
export const matchTarget=m=>m.mode==='best5'?3:m.mode==='best3'?2:1;
export const matchLimit=m=>m.mode==='best5'?5:m.mode==='best3'?3:1;
export function validateMatch(v){if(v===undefined)return matchDefaults();if(!record(v)||!['unlimited','timed','best3','best5'].includes(v.mode)||!['ready','running','paused','roundOver','finished'].includes(v.phase)||!record(v.wins))throw Error('Invalid match settings');const m={mode:v.mode,duration:numberValue(v.duration,10,7200,true),round:numberValue(v.round,1,5,true),wins:{a:numberValue(v.wins.a,0,3,true),b:numberValue(v.wins.b,0,3,true)},remainingMs:numberValue(v.remainingMs,0,7200000,true),deadline:numberValue(v.deadline,0,Number.MAX_SAFE_INTEGER,true),phase:v.phase,roundWinner:v.roundWinner,winner:v.winner};for(const key of['winner','roundWinner'])if(m[key]!==null&&!['a','b','tie'].includes(m[key]))throw Error('Invalid round winner');if(m.round>matchLimit(m)||m.remainingMs>m.duration*1000||m.wins.a>matchTarget(m)||m.wins.b>matchTarget(m)||m.wins.a+m.wins.b>matchLimit(m)||(m.phase==='running'&&m.deadline===0)||(m.phase!=='running'&&m.deadline!==0))throw Error('Inconsistent match settings');if(m.mode!=='unlimited'){const settled=['roundOver','finished'].includes(m.phase),total=m.wins.a+m.wins.b;if(settled&&!['a','b','tie'].includes(m.roundWinner)||!settled&&m.roundWinner!==null||m.phase==='finished'&&(!['a','b'].includes(m.winner)||m.wins[m.winner]!==matchTarget(m))||m.phase!=='finished'&&(m.winner!==null||m.wins.a>=matchTarget(m)||m.wins.b>=matchTarget(m))||total!==(settled&&m.roundWinner!=='tie'?m.round:m.round-1))throw Error('Inconsistent round result')}return m}
export const matchRemaining=(s,now=Date.now())=>s.match?.phase==='running'?Math.max(0,s.match.deadline-now):s.match?.remainingMs??0;
export function resetMatch(s){const mode=s.match.mode,duration=s.match.duration;s.match={...matchDefaults(),mode,duration,remainingMs:duration*1000};s.running=false;s.finished=false;s.teams.forEach(t=>t.score=t.start)}
export function configureMatch(s,mode,duration){if(!['unlimited','timed','best3','best5'].includes(mode)||!Number.isSafeInteger(duration)||duration<10||duration>7200)throw Error('Choose a mode and 10–7200 seconds');s.match={...matchDefaults(),mode,duration,remainingMs:duration*1000};resetMatch(s)}
export function finishRound(s,now=Date.now()){if(s.match.mode==='unlimited'){s.running=false;s.finished=true;return true}const m=s.match;if(['roundOver','finished'].includes(m.phase))return false;const [a,b]=s.teams,winner=a.score===b.score?'tie':a.score>b.score?a.id:b.id;m.remainingMs=Math.max(0,Math.round(matchRemaining(s,now)));m.deadline=0;m.roundWinner=winner;s.running=false;if(winner!=='tie')m.wins[winner]++;if(winner!=='tie'&&m.wins[winner]>=matchTarget(m)){m.winner=winner;m.phase='finished';s.finished=true}else{m.phase='roundOver';s.finished=false}return true}
export function advanceMatch(s,now=Date.now()){return !!(s.match&&s.match.mode!=='unlimited'&&s.running&&s.match.phase==='running'&&now>=s.match.deadline&&finishRound(s,now))}
export function startBattle(s,now=Date.now()){if(s.match.mode==='unlimited'){s.running=true;s.finished=false;return}advanceMatch(s,now);const m=s.match;if(m.phase==='roundOver')throw Error('Use Next round or Replay tied round first');if(m.phase==='finished')throw Error('Reset match before starting a new series');if(m.phase==='running')return;m.deadline=now+m.remainingMs;m.phase='running';s.running=true;s.finished=false}
export function pauseBattle(s,now=Date.now()){if(s.match.mode==='unlimited'){s.running=false;return}if(advanceMatch(s,now))return;if(s.match.phase==='running'){s.match.remainingMs=Math.max(0,Math.round(matchRemaining(s,now)));s.match.deadline=0;s.match.phase='paused'}s.running=false}
export function nextRound(s){const m=s.match;if(m.mode==='unlimited'||m.phase!=='roundOver')throw Error('Finish the current round first');if(m.roundWinner!=='tie')m.round++;m.phase='ready';m.remainingMs=m.duration*1000;m.deadline=0;m.roundWinner=null;s.running=false;s.finished=false;s.teams.forEach(t=>t.score=t.start)}

export const chatDefaults=()=>({enabled:false,words:{a:'',b:''},points:{a:1,b:1},cooldown:10,seen:[],lastVotes:Object.create(null),events:[]});
export const normalizeChatWord=text=>String(text).normalize('NFKC').trim().replace(/\s+/gu,' ').toLowerCase();
export function validateChat(v){if(v===undefined)return chatDefaults();if(!record(v)||typeof v.enabled!=='boolean'||!record(v.words)||!record(v.lastVotes))throw Error('Invalid chat voting settings');const out={enabled:v.enabled,points:{a:numberValue(v.points?.a??1,1,1000000,true),b:numberValue(v.points?.b??1,1,1000000,true)},words:{a:textValue(v.words.a,60).trim(),b:textValue(v.words.b,60).trim()},cooldown:numberValue(v.cooldown,1,300,true),seen:list(v.seen,20000).map(x=>textValue(x,700)),lastVotes:Object.create(null),events:list(v.events,20).map(e=>{if(!record(e)||!['a','b'].includes(e.team)||typeof e.simulated!=='boolean')throw Error('Invalid chat vote log');return{team:e.team,sender:textValue(e.sender,200),keyword:textValue(e.keyword,60),points:numberValue(e.points??1,1,1000000,true),time:numberValue(e.time,0,Number.MAX_SAFE_INTEGER,true),simulated:e.simulated}})};const a=normalizeChatWord(out.words.a),b=normalizeChatWord(out.words.b);if(a&&b&&a===b)throw Error('Choose a different chat word for each competitor');if(out.enabled&&!a&&!b)throw Error('Enter at least one chat word');const entries=Object.entries(v.lastVotes);if(entries.length>5000)throw Error('Chat cooldown capacity exceeded');for(const[key,time]of entries){textValue(key,700);out.lastVotes[key]=numberValue(time,0,Number.MAX_SAFE_INTEGER,true)}return out}
export function ingestChat(s,e,now=Date.now()){const c=s.chatVoting;if(!c.enabled)return{ok:false,ignored:true,reason:'Chat voting disabled'};if(!record(e)||typeof e.comment!=='string'||e.comment.length>1000||typeof e.sender!=='string'||!e.sender.trim()||e.sender.length>200||typeof e.eventId!=='string'||!e.eventId.trim()||e.eventId.length>200||typeof e.sessionId!=='string'||!e.sessionId.trim()||e.sessionId.length>200)return{ok:false,reason:'Invalid chat event'};const text=normalizeChatWord(e.comment),team=s.teams.find(t=>c.words[t.id]&&normalizeChatWord(c.words[t.id])===text);if(!team)return{ok:false,ignored:true,reason:'No matching chat word'};advanceMatch(s,now);const key=JSON.stringify([e.sessionId,e.eventId]);if(c.seen.includes(key))return{ok:false,reason:'Duplicate chat message'};if(c.seen.length>=20000)return{ok:false,reason:'Chat replay storage full. Export settings before starting a new configuration.'};c.seen.push(key);if(!s.running)return{ok:false,reason:'Battle paused'};const viewer=JSON.stringify([e.sessionId,e.sender]);if(e.simulated!==true&&Object.hasOwn(c.lastVotes,viewer)&&now-c.lastVotes[viewer]<c.cooldown*1000)return{ok:false,reason:'Viewer chat cooldown active'};if(e.simulated!==true){for(const[k,time]of Object.entries(c.lastVotes))if(now-time>=c.cooldown*1000)delete c.lastVotes[k];if(Object.keys(c.lastVotes).length>=5000&&!Object.hasOwn(c.lastVotes,viewer))return{ok:false,reason:'Chat cooldown storage full'};c.lastVotes[viewer]=now}team.score=Math.min(Number.MAX_SAFE_INTEGER,team.score+(c.points?.[team.id]??1));c.events.unshift({team:team.id,sender:e.sender,keyword:c.words[team.id],points:c.points?.[team.id]??1,time:now,simulated:e.simulated===true});c.events=c.events.slice(0,20);return{ok:true,team:team.id,points:c.points?.[team.id]??1}}

export const KEY='live-battle-v1';
export const defaults=()=>({version:1,chatVoting:chatDefaults(),match:matchDefaults(),connection:{session:'stream-1'},appearance:appearanceDefaults(),lang:'en',title:'',brand:'BATTLE ARENA',instructions:'',logo:'',animations:true,running:false,finished:false,teams:[{id:'a',name:'',en:'',he:'',photo:'',color:'#087dff',color2:'#073bb5',x:50,y:50,zoom:1,start:0,score:0,gifts:[{id:'5655',points:1}]},{id:'b',name:'',en:'',he:'',photo:'',color:'#ad46ff',color2:'#4a16a6',x:50,y:50,zoom:1,start:0,score:0,gifts:[{id:'5269',points:1}]}],custom:[],events:[],seen:[],combos:{}});
export function load(){try{let raw=localStorage.getItem(KEY);if(!raw)return defaults();if(raw.length>MAX_IMPORT_BYTES)throw Error('Settings too large');return validateState(JSON.parse(raw))}catch{return defaults()}}
export function save(s){let data=JSON.stringify(validateState(s));if(data.length>MAX_IMPORT_BYTES)throw Error('Settings exceed 4 MB');localStorage.setItem(KEY,data);window.dispatchEvent(new Event('battle-update'))}
export const words={en:{title:'Vote LIVE',a:'Team A',b:'Team B',points:'Points',send:'Send a gift to vote',leading:'Leading',winner:'Winner',paused:'PAUSED',live:'LIVE',ready:'READY',coins:'Coins'},he:{title:'הצבעה בלייב',a:'קבוצה א׳',b:'קבוצה ב׳',points:'נקודות',send:'שלחו מתנה כדי להצביע',leading:'מוביל',winner:'מנצח',paused:'מושהה',live:'בשידור חי',ready:'מוכן',coins:'מטבעות'}};
export const name=(t,s)=>t[s.lang]||t.name||words[s.lang][t.id];
export const percent=s=>{let total=s.teams.reduce((a,t)=>a+t.score,0);return total?s.teams[0].score/total*100:50};
export function ingest(s,e,now=Date.now()){
 advanceMatch(s,now);
 if(!e||typeof e!=='object'||!((typeof e.giftId==='string'&&/^\d{1,20}$/.test(e.giftId))||(typeof e.giftId==='number'&&Number.isSafeInteger(e.giftId)&&e.giftId>=0))||typeof e.eventId!=='string'||!e.eventId||e.eventId.length>200||typeof e.sessionId!=='string'||!e.sessionId||e.sessionId.length>200||e.sender!=null&&(typeof e.sender!=='string'||e.sender.length>200)||e.comboId!=null&&(typeof e.comboId!=='string'||!e.comboId||e.comboId.length>200))return {ok:false,reason:'Invalid event fields'};
 let key=JSON.stringify([e.sessionId,e.eventId]);
 // Recognize legacy keys too; never discard replay history silently.
 if(s.seen.includes(key)||s.seen.includes(e.sessionId+':'+e.eventId))return {ok:false,reason:'Duplicate event'};
 let n=Number(e.count??1);if(!Number.isSafeInteger(n)||n<1||n>100000)return {ok:false,reason:'Invalid count'};
 let k=e.comboId?JSON.stringify([e.sessionId,e.sender||'',String(e.giftId),e.comboId]):null;
 if(s.seen.length>=20000||(k&&!Object.hasOwn(s.combos,k)&&Object.keys(s.combos).length>=10000))return {ok:false,reason:'Replay protection capacity reached. Export a backup before starting a new configuration.'};
 let delta=k?Math.max(0,n-(Object.hasOwn(s.combos,k)?s.combos[k]:0)):n;
 if(k)s.combos[k]=Math.max(n,Object.hasOwn(s.combos,k)?s.combos[k]:0);s.seen.push(key);
 // Consume valid paused gifts so a later replay cannot award paused activity.
 if(!s.running)return {ok:false,reason:'Battle paused'};
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
 let s={version:1,chatVoting:validateChat(v.chatVoting??undefined),match:validateMatch(v.match??undefined),connection:{session:textValue(v.connection?.session??'stream-1',100)},appearance:validateAppearance(v.appearance),lang:v.lang,title:textValue(v.title,300),brand:textValue(v.brand,200),instructions:textValue(v.instructions,500),logo:textValue(v.logo,1_500_000),animations:v.animations,running:v.running,finished:v.finished,teams:validateTeams(v.teams),custom:list(v.custom,1000).map(validateGift),events:[],seen:list(v.seen,20000).map(k=>textValue(k,1100)),combos:Object.create(null)};
 if(s.match.mode!=='unlimited'&&(s.running!==(s.match.phase==='running')||s.finished!==(s.match.phase==='finished')))throw Error('Inconsistent battle timer state');
 if(s.logo&&!safeImage(s.logo))throw Error('Invalid logo');
 if(new Set(s.custom.map(g=>g.id)).size!==s.custom.length)throw Error('Duplicate catalog ID');
 s.events=list(v.events,40).map(e=>{if(!record(e)||!/^\d{1,20}$/.test(e.giftId))throw Error('Invalid gift event');return{giftId:e.giftId,sender:textValue(e.sender??'',200),delta:numberValue(e.delta,0,100000,true),points:numberValue(e.points,0,1e14,true),team:e.team==null?undefined:(['a','b'].includes(e.team)?e.team:undefined),time:numberValue(e.time,0,Number.MAX_SAFE_INTEGER,true),simulated:e.simulated===true}});
 let entries=Object.entries(v.combos);if(entries.length>10000)throw Error('Too many streaks');
 for(let[k,n]of entries){textValue(k,1100);s.combos[k]=numberValue(n,0,100000,true)}
 return s;
}
export function loadPresets(){try{let raw=localStorage.getItem('battle-presets');if(!raw)return Object.create(null);if(raw.length>MAX_IMPORT_BYTES)throw Error('Presets too large');let v=JSON.parse(raw);if(!record(v)||Object.keys(v).length>50)throw Error('Invalid presets');let out=Object.create(null);for(let[k,t]of Object.entries(v)){textValue(k,80);if(t.length!==2)throw Error('Invalid preset');out[k]=validateTeams(t)}return out}catch{return Object.create(null)}}

export const mergeCatalog=(base,custom)=>[...new Map([...base,...custom].map(g=>[String(g.id),g])).values()];
