/* ============ SHARED ============ */
const PEOPLE={priya:['PN','#F04D56','Priya Nair'],sam:['SV','#2F6FED','Sam Verma'],ravi:['RK','#7C53E6','Ravi Kapoor'],mei:['ML','#15A06A','Mei Lin']};
function av(id){if(!id)return '<div class="av empty">?</div>';const p=PEOPLE[id];return `<div class="av" style="background:${p[1]}" title="${p[2]}">${p[0]}</div>`;}
function svg(p,s){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${p}</svg>`;}
const ICONS={star:'<path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="currentColor" stroke="none"/>',
  Table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 4v16"/>',
  Board:'<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="11" rx="1"/><rect x="17" y="4" width="4" height="16" rx="1"/>',
  List:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  Gallery:'<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
  Calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  Timeline:'<path d="M3 7h10M3 12h16M3 17h7"/><circle cx="16" cy="7" r="2"/><circle cx="11" cy="17" r="2"/>',
  Chart:'<path d="M3 3v18h18M7 14l3-3 3 2 4-5"/>',Feed:'<rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="12" width="18" height="8" rx="1"/>',
  Map:'<path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2zM9 3v16M15 5v16"/>',user:'<circle cx="12" cy="8" r="3.2"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  Overview:'<rect x="3" y="3" width="8" height="5" rx="1"/><rect x="3" y="11" width="8" height="10" rx="1"/><rect x="13" y="3" width="8" height="10" rx="1"/><rect x="13" y="16" width="8" height="5" rx="1"/>',
  notes:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  Details:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  activity:'<path d="M3 12h4l3 8 4-16 3 8h4"/>'};
const fmt=n=>'₹'+new Intl.NumberFormat('en-IN').format(n);
let tT;function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>t.classList.remove('show'),2100);}
function closePops(){document.querySelectorAll('.pop').forEach(p=>p.classList.remove('show'));}
/* ---- theme (light | dark) — persisted; every component flips via role tokens ---- */
function curTheme(){return document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';}
function setTheme(t){const r=document.documentElement;if(t==='dark')r.setAttribute('data-theme','dark');else r.removeAttribute('data-theme');try{localStorage.setItem('ojo-theme',t);}catch(e){}document.querySelectorAll('.themeseg button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));}
function openPop(id){const m=document.getElementById(id);if(!m)return;const o=m.classList.contains('show');closePops();if(!o)m.classList.add('show');}
document.addEventListener('click',e=>{if(e.target.closest('.pop')||e.target.closest('#setBtn')||e.target.closest('#vaddBtn')||e.target.closest('#tbWs')||e.target.closest('#tbAdd'))return;closePops();});
/* ---- search lightbox (opens centered in the main window) ---- */
function searchResults(q){const R=[['Life Designer','Lead · Proposal'],['Apollo — Website Revamp','Project'],['Anjali Rao','Contact · Meridian Cafe'],['Wireframes','Task · Design'],['Sunrise Pharma','Lead · Won'],['Patel Logistics','Lead · Contacted']];
  const list=q?R.filter(r=>(r[0]+' '+r[1]).toLowerCase().includes(q.toLowerCase())):R;
  if(!list.length)return `<div class="lb-empty">No matches for “${q}”.</div>`;
  return list.map(r=>`<div class="lb-row" onclick="closeSearchBox();toast('Open: ${r[0].replace(/'/g,"")}')"><span class="lb-ic">${svg(ICONS.List,16)}</span><span class="lb-rc"><span class="lb-t">${r[0]}</span><span class="lb-k">${r[1]}</span></span><span class="lb-go">${svg('<path d="M7 17 17 7M9 7h8v8"/>',14)}</span></div>`).join('');}
function openSearchBox(){const lb=document.getElementById('searchBox'),sc=document.getElementById('lbScrim');if(!lb)return;closePops();
  lb.innerHTML=`<div class="lb-input">${svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',20)}<input id="lbInput" placeholder="Search leads, projects, tasks, people…" oninput="document.getElementById('lbResults').innerHTML=searchResults(this.value)"><kbd>esc</kbd></div>
    <div class="lb-label">Recent</div><div class="lb-results" id="lbResults">${searchResults('')}</div>`;
  sc.classList.add('show');lb.classList.add('show');setTimeout(()=>{const i=document.getElementById('lbInput');if(i)i.focus();},40);}
function closeSearchBox(){document.getElementById('lbScrim')?.classList.remove('show');document.getElementById('searchBox')?.classList.remove('show');}
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&(e.key==='k'||e.key==='K')){e.preventDefault();openSearchBox();}else if(e.key==='Escape'&&document.getElementById('searchBox')?.classList.contains('show')){closeSearchBox();}});
/* ---- shell layout switcher: Connected | Carded | Merged (relocates the OJO tabs) ---- */
let shellMode='connected';
function setShell(mode){shellMode=mode;const app=document.querySelector('.app');if(app)app.className='app shell-'+mode;document.body.dataset.shell=mode;
  const tabs=document.getElementById('panelTabs');const home=mode==='merged'?document.getElementById('flyTabHome'):document.getElementById('tbOjo');
  if(tabs&&home&&tabs.parentElement!==home)home.appendChild(tabs);
  try{localStorage.setItem('ojo-shell',mode);}catch(e){}
  renderPanelTabs();
  document.querySelectorAll('.shellseg button').forEach(b=>b.classList.toggle('on',b.dataset.s===mode));}
/* top-bar: Notion-style workspace switcher (OJO style) anchored to the profile */
function toggleWsSwitcher(e){e.stopPropagation();const m=document.getElementById('wsSwitcher');if(m.classList.contains('show')){closePops();return;}m.innerHTML=accountBody();const r=e.currentTarget.getBoundingClientRect();m.style.top=(r.bottom+8)+'px';m.style.left=r.left+'px';openPop('wsSwitcher');}
/* top-bar: quick-add menu (tasks now, more later) */
function toggleAddMenu(e){e.stopPropagation();const m=document.getElementById('addMenu');if(m.classList.contains('show')){closePops();return;}
  const items=[['New task','M9 11l3 3 8-8M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],['New lead','M3 17 9 11l4 3 7-8M21 6v5M16 6h5'],['New project','M3 4h18v16H3z M3 9h18 M9 4v16'],['New contact','M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0'],['New event','M3 4h18v18H3z M3 10h18 M8 2v4 M16 2v4']];
  m.innerHTML=`<div class="h">Quick add</div>`+items.map(i=>`<button class="addmenu-item" onclick="closePops();toast('${i[0]} — demo')">${svg('<path d="'+i[1]+'"/>',17)}<span>${i[0]}</span></button>`).join('');
  const r=e.currentTarget.getBoundingClientRect();m.style.top=(r.bottom+8)+'px';m.style.left=Math.max(12,r.right-228)+'px';openPop('addMenu');}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePeek();});

/* ============ DATA ============ */
const LSTAGES=[{k:'New',cc:'var(--s-new)'},{k:'Contacted',cc:'var(--s-contacted)'},{k:'Qualified',cc:'var(--s-qualified)'},{k:'Proposal',cc:'var(--s-proposal)'},{k:'Won',cc:'var(--s-won)'},{k:'Lost',cc:'var(--s-lost)'}];
const lcc=k=>(LSTAGES.find(s=>s.k===k)||{}).cc||'var(--faint)';
let LID=5100;
let leads=[lk('Meridian Cafe','Anjali Rao',85000,'Referral','New',null,'0/2'),lk('Bluefin Studios','Karthik R',120000,'Website','New',null,'0/3'),
  lk('Acme Interiors','Ravi Sharma',200000,'Website','Contacted','priya','1/3'),lk('Patel Logistics','Neha Patel',340000,'LinkedIn','Contacted','sam','2/4'),
  lk('Nova Dental','Dr. Iyer',175000,'Referral','Qualified','priya','3/4'),lk('GreenLeaf Organics','Sunita M',260000,'Event','Qualified','ravi','2/3'),
  lk('Life Designer','Jyotinath',46000,'Referral','Proposal','priya','1/4'),lk('Horizon Realty','Faisal K',510000,'Website','Proposal','mei','3/5'),
  lk('Sunrise Pharma','Deepak N',420000,'Referral','Won','sam','4/4'),lk('TechBridge','Arjun S',95000,'Cold email','Lost','priya','1/3'),lk('Orbit Media','Lakshmi V',150000,'Website','New',null,'0/2')];
function lk(co,nm,val,src,st,asg,chk){return {id:'lead-'+(++LID),co,nm,val,src,st,asg,chk};}

const STATUSES=[{k:'Todo',cc:'var(--st-todo)'},{k:'Doing',cc:'var(--st-doing)'},{k:'Done',cc:'var(--st-done)'}];
const scc=k=>(STATUSES.find(s=>s.k===k)||{}).cc||'var(--faint)';
const PR={High:'var(--pr-high)',Medium:'var(--pr-med)',Low:'var(--pr-low)'};
const MILESTONES=['Discovery','Design','Build','Launch'];const PROJECT='Apollo';
let TID=900;
let tasks=[tk('Stakeholder interviews','Discovery','Done','priya','5 May','High','8h'),tk('Competitive audit','Discovery','Done','ravi','7 May','Medium','6h'),
  tk('Wireframes','Design','Doing','mei','10 Jun','High','16h'),tk('Design system','Design','Todo','mei','18 Jun','Medium','20h'),tk('Prototype review','Design','Todo','priya','20 Jun','Low','4h'),
  tk('Frontend setup','Build','Todo','sam','25 Jun','High','12h'),tk('API integration','Build','Todo','sam','2 Jul','High','24h'),tk('CMS migration','Build','Todo','ravi','8 Jul','Medium','16h'),
  tk('QA & testing','Launch','Todo','mei','15 Jul','High','12h'),tk('Go-live','Launch','Todo','priya','20 Jul','High','4h')];
function tk(t,ms,st,asg,due,pri,est){return {id:'task-'+(++TID),t,ms,st,asg,due,pri,est};}

const PROJECTS=[{id:'apollo',name:'Apollo — Website Revamp',client:'Internal',ic:'A',color:'#F04D56',pct:20,done:2,total:10,due:'20 Jul',team:[['ML','#15A06A'],['SV','#2F6FED'],['PN','#F04D56'],['RK','#7C53E6']],status:'On track',sc:'#15A06A',open:true},
  {id:'meta',name:'Life Designer — Meta Ads',client:'Life Designer',ic:'L',color:'#7C53E6',pct:55,done:6,total:11,due:'30 Jun',team:[['PN','#F04D56'],['SV','#2F6FED']],status:'On track',sc:'#15A06A'},
  {id:'pharma',name:'Sunrise Pharma — Brand Site',client:'Sunrise Pharma',ic:'S',color:'#2F6FED',pct:85,done:17,total:20,due:'12 Jun',team:[['SV','#2F6FED'],['ML','#15A06A'],['RK','#7C53E6']],status:'Launching',sc:'#E08A1E'},
  {id:'realty',name:'Horizon Realty — Portal',client:'Horizon Realty',ic:'H',color:'#E08A1E',pct:10,done:1,total:14,due:'15 Aug',team:[['ML','#15A06A'],['PN','#F04D56']],status:'Just started',sc:'#64748B'}];

/* ============ MODULE CONFIG ============ */
const M={
  leads:{title:'Leads',sub:'Q2 Enterprise pipeline · 11 leads',crumb:false,peek:'lead',icon:'<path d="M3 17 9 11l4 3 7-8"/><path d="M21 6v5M16 6h5"/>',
    views:[{name:'All Leads',icon:'star',type:'Table'},{name:'By Stage',icon:'Board',type:'Board'},{name:'My Leads',icon:'user',type:'List'}],
    active:'By Stage',color:true,size:'medium',types:['Board','Table','List','Gallery','Calendar','Timeline'],group:()=>'Stage',render:renderLeadsWork},
  project:{title:'Apollo — Website Revamp',sub:'Project · 4 milestones · 10 tasks',crumb:true,crumbName:'Apollo — Website Revamp',peek:'task',
    views:[{name:'Overview',icon:'star',type:'Overview'},{name:'All Tasks',icon:'List',type:'List'},{name:'By Status',icon:'Board',type:'Board'},{name:'Table',icon:'Table',type:'Table'},{name:'Details',icon:'Details',type:'Details'}],
    active:'Overview',color:true,size:'medium',types:['Overview','List','Board','Table','Gallery','Calendar'],group:t=>t==='Board'?'Status':'Milestone',render:renderProjWork},
  projdash:{title:'Projects',sub:'4 active · workspace dashboard',crumb:false,peek:null,icon:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 4v16"/>',
    views:[{name:'All Projects',icon:'Gallery',type:'Gallery'},{name:'By Status',icon:'Board',type:'Board'},{name:'Table',icon:'Table',type:'Table'}],
    active:'All Projects',color:true,size:'medium',types:['Gallery','Table','Board','List','Calendar','Timeline','Chart','Feed','Map'],group:()=>'Status',render:renderDashWork}
};
let curMod='leads';function cm(){return M[curMod];}
let curRoute='home';
/* lead-record layout for A/B testing: 'A' = Inspector (right panel), 'B' = AI Briefing (top) */
let modCollapsed=true, modFace='info';
function curType(){return cm().views.find(v=>v.name===cm().active).type;}

/* ============ ROUTER ============ */
function setRail(id){['navHome','navLeads','navProjects','navHR','navAccounts','navVendors','navOrgAdmin'].forEach(n=>{const e=document.getElementById(n);if(e)e.classList.remove('active');});document.getElementById('r-profile')?.classList.toggle('on',id==='r-profile');if(id&&id!=='r-profile'){const e=document.getElementById(id);if(e)e.classList.add('active');}}
let subCollapsed=false;
function subItems(mod){const S=['settings','Settings',"toast('Settings — demo')"],tk=m=>['tasks','Tasks',"openTasks('"+m+"')"];
  return {leads:{title:'Leads',list:[['leads','Leads',"go('leads')"],tk('leads'),S]},project:{title:'Projects',list:[['projectsDash','Projects',"go('projectsDash')"],tk('project'),S]},account:{title:'Accounts',list:[['account','Accounts',"go('account')"],tk('account'),S]},vendor:{title:'Vendors',list:[['vendor','Vendors',"go('vendor')"],tk('vendor'),S]}}[mod];}
function subToggle(){subCollapsed=!subCollapsed;const s=document.getElementById('shell');if(s)s.classList.toggle('navcollapsed',subCollapsed);}
function renderShell(mod,active){const it=subItems(mod);
  document.getElementById('screen').innerHTML=`<div class="box hrbox ${subCollapsed?'navcollapsed':''}" id="shell"><aside class="hrnav"><div class="hrnav-top" style="justify-content:flex-end"><button class="hrcollapse" onclick="subToggle()" title="Collapse">${svg('<path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>',16)}</button></div>${it.list.map(i=>`<a class="${i[0]===active?'on':''}" onclick="${i[2]}">${i[1]}</a>`).join('')}</aside><div class="modbody" id="modcontent"></div><button class="hrreopen" onclick="subToggle()" title="Show menu">${svg('<path d="M3 6h18M3 12h18M3 18h18"/>',17)}</button></div>`;}
function go(route){curRoute=route;closePeek();closePops();xpClose();hideCommDock();
  /* right panel stays hidden by default; once opened it persists across pages (desktop). Mobile closes its sheet on navigation. */
  if(!window.matchMedia('(min-width:701px)').matches)closeDrawer();
  if(route==='home'){setRail('navHome');mountHome();return;}
  if(route==='hr'){setRail('navHR');mountHR();return;}
  if(route==='leads'){curMod='leads';setRail('navLeads');renderShell('leads','leads');mountModule();}
  else if(route==='project'){curMod='project';setRail('navProjects');renderShell('project','projectsDash');mountModule();}
  else if(route==='projectsDash'){curMod='projdash';setRail('navProjects');renderShell('project','projectsDash');mountModule();}
  else if(route==='account'){setRail('navAccounts');mountAccounts();}
  else if(route==='profile'){setRail('r-profile');mountProfile();}
  else if(route==='admin'){setRail('navOrgAdmin');mountOrgAdmin();}
  else if(route==='vendor'){setRail('navVendors');renderShell('vendor','vendor');mountColl('vendor');}
  syncGenie();}

function modTools(){return `<button class="mtool"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h18M6 12h12M10 19h4"/></svg></button>
      <button class="mtool"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h12M3 12h8M3 18h5M17 4v16m0 0 4-4m-4 4-4-4"/></svg></button>
      <button class="mtool"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></button>
      <button class="mtool" id="setBtn" onclick="toggleSettings(event)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg></button>`;}
function modNew(){return `<div class="newbtn"><button class="a" onclick="toast('New ${curMod==='leads'?'lead':curMod==='projdash'?'project':'task'}')">New</button><span class="b"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg></span></div>`;}
function modViewbar(){return `<div class="viewbar"><div id="vtabs" style="display:flex;gap:5px"></div>
      <button class="vadd" id="vaddBtn" onclick="toggleVMenu(event)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button>
      <div class="pop vmenu" id="vmenu"><div class="h">Add a new view</div><div class="vgrid" id="vgrid"></div>
        <button class="src"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/></svg>New data source</button></div></div>
    <div class="pop settings" id="settings"><div class="h">Layout</div><div class="vtypes" id="vtypes"></div><div class="setdiv"></div>
      <div class="setrow">Group by <span class="val" id="groupVal">Stage <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></span></div>
      <div class="setrow">Color columns <span class="toggle on" id="tgColor" onclick="toggleColor()"></span></div>
      <div class="setrow">Open pages in <span class="val">Side peek <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></span></div>
      <div class="setdiv"></div><div class="setrow">Card size <span class="seg"><button id="szC" onclick="setSize('compact')">Compact</button><button id="szM" class="on" onclick="setSize('medium')">Medium</button></span></div></div>`;}

function mountModule(){const c=cm();
  if(curMod==='project'){
    document.getElementById('modcontent').innerHTML=`<div class="box dbox ${modCollapsed?'collapsed':''}" id="modbox">
      <div class="dmain">
        <div class="crumbbar"><a onclick="go('projectsDash')">Projects</a> <span class="sep">/</span> <span id="crumbTab">${c.active}</span></div>
        <div class="mc-top"><div class="title-wrap"><div class="picon">${svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 4v16"/>',20)}</div><div><h1>${c.title}</h1><div class="sub">${c.sub}</div></div></div>
          <div class="sp"></div>
          <span id="viewTools" style="display:flex;align-items:center;gap:3px">${modTools()}</span>
          <div class="commpill">${[['call','Call'],['email','Email'],['video','Meet']].map(([f,l])=>`<button title="${l} client" onclick="openComm('${f}')">${faceIcon(f)}</button>`).join('')}</div>
          <button class="ptog-ic ${modCollapsed?'':'on'}" id="modPtogBtn" onclick="modToggle()" title="${modCollapsed?'Show activity':'Hide activity'}">${svg('<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/>',17)}</button>
          <button class="mtool hdr-x" onclick="go('projectsDash')" title="Close">${svg(SVS.x,18)}</button></div>
        ${modViewbar()}
        <div id="metricsBar" class="metrics" style="padding-left:22px;padding-right:22px"></div>
        <div class="work" id="work"></div>
      </div>
      <aside class="dpanel" id="modpanel">
        <div class="dpanel-head"><span class="nm">Recent activity</span></div>
        <div class="dpanel-body" id="modpanelbody"></div>
      </aside></div>`;
    document.getElementById('shell')?.classList.add('dockgut');
    const sc=document.getElementById('screen');sc.querySelector('.modclose')?.remove();
    renderVTabs();buildVMenu();buildVTypes();updateGroup();syncSizeToggle();renderWork();renderModInfo();
    commSetHost({getFace:()=>modFace,setFace:setModFace,content:commProjectContent,visible:()=>curMod==='project'});
    return;
  }
  document.getElementById('modcontent').innerHTML=`<div class="box">
    <div class="mc-top"><div class="title-wrap"><div class="picon">${svg(c.icon||'<path d="M3 17 9 11l4 3 7-8"/><path d="M21 6v5M16 6h5"/>',20)}</div>
        <div><h1>${c.title}</h1><div class="sub">${c.sub}</div></div></div>
      <div class="sp"></div><span id="viewTools" style="display:flex;align-items:center;gap:3px">${modTools()}</span>${modNew()}</div>
    ${modViewbar()}
    <div id="metricsBar" class="metrics" style="padding-left:22px;padding-right:22px"></div>
    <div class="work" id="work"></div></div>`;
  renderVTabs();buildVMenu();buildVTypes();updateGroup();syncSizeToggle();renderWork();
}
/* project right info/comm panel (same expandable pattern as the detail page) */
function modToggle(){modCollapsed=!modCollapsed;document.getElementById('modbox').classList.toggle('collapsed',modCollapsed);const b=document.getElementById('modPtogBtn');if(b){b.classList.toggle('on',!modCollapsed);b.title=modCollapsed?'Show activity':'Hide activity';}}
function setModFace(f){modFace=f;document.querySelectorAll('#modpanel .xcface').forEach(b=>b.classList.toggle('on',b.dataset.face===f));renderModInfo();}
/* OJO read of the project — derived from task completion, work-in-progress and budget */
function projInsights(){const a=projScore();const done=tasks.filter(t=>t.st==='Done').length;const doing=tasks.filter(t=>t.st==='Doing').length;const total=tasks.length||1;
  return [
   ['target',a[0]<40?`<b>Early stage.</b> ${done}/${total} tasks done — rally the team on Discovery to build momentum.`:a[0]<70?`<b>On the way.</b> ${done}/${total} tasks done; keep the current milestone moving.`:`<b>On track.</b> ${done}/${total} tasks done — strong pace toward launch.`],
   ['clock',doing?`<b>${doing} task${doing>1?'s':''} in progress.</b> Keep them unblocked to protect the 20 Jul timeline.`:`<b>Nothing in progress.</b> Assign the next milestone so the project doesn't stall.`],
   ['cash',`<b>₹3,80,000 of ₹4,80,000 budget left.</b> Billing on track — ₹0 invoiced so far.`]
  ];}
function projPanelCells(){const a=projScore();const done=tasks.filter(t=>t.st==='Done').length;const total=tasks.length||1;
  return [
   {render:'score',props:{pct:a[0],label:a[1],reason:`${done}/${total} tasks done · 4 milestones`,tag:'OJO read'}},
   {render:'facts',props:{rows:[['Timeline',`${a[0]}% complete`],['Due','20 Jul 2026'],['Budget','₹3,80,000 left'],['Tasks',`${done}/${total} done`],['Owner',`<span class="ip-owner"><span class="av" style="background:#F04D56">PN</span>Priya Nair</span>`]]}},
   {render:'insights',props:{items:projInsights(),askNoun:'project'}},
   {render:'contacts',props:{title:'Client contact',add:null,list:[['Rajeeshlal','Primary · POC','vinoth+lal@palpx.com','#2F6FED',true]]}},
   {render:'more',props:{rows:[['Website','ojo.io'],['Location','—'],['Vendor','Ojo Dojo (outsourced)'],['Vendor POC','ojodeveloper1'],['Vendor email','ojodeveloper1@gmail.com']]}}
  ];}
function projInfoBody(){return `<div class="ip"><div class="ip-actonly">${bActivity()}</div></div>`;}
function renderModInfo(){const el=document.getElementById('modpanelbody');if(!el)return;el.innerHTML=projInfoBody();}

/* ---- floating info/comm bar: replaces the stacked info/comm panel on mobile (overview + detail pages) ----
   Each page registers a "comm host" describing its faces, current face, content renderer and (optionally) when it's visible. */
const COMMFACE_LABEL={info:'Info',chat:'Chat',call:'Calls',video:'Meetings',email:'Email'};
const COMMFACES=['info','chat','call','video','email'];
let commHost=null;
function commEmpty(f){return `<div class="xchat">${f==='chat'?'No messages yet.':f==='call'?'No calls logged.':f==='email'?'No emails yet.':'No meetings yet.'}</div>`;}
function commSetHost(h){commHost=h;updateCommDock();if(section&&section.indexOf('comm-')===0&&document.getElementById('flyout')?.classList.contains('show')){document.getElementById('flyBody').innerHTML=commBody(section.slice(5));}}
function buildCommDock(){const el=document.getElementById('commdock');if(!el)return;const h=commHost;
  if(!h){el.innerHTML='';return;}const cur=h.getFace?h.getFace():'info';
  el.innerHTML=(h.faces||COMMFACES).map(f=>`<button class="cdf ${f===cur?'on':''}" data-face="${f}" onclick="commTap('${f}')" title="${COMMFACE_LABEL[f]}">${faceIcon(f)}</button>`).join('');}
function updateCommDock(){const el=document.getElementById('commdock');if(!el)return;
  const h=commHost,on=!!h&&(h.visible?h.visible():true);
  if(on)buildCommDock();
  el.classList.toggle('show',on);document.body.classList.toggle('comm-host',on);
  if(!on)closeCommSheet();
  buildDockComm();
  if(section==='comm'){if(on&&h){const f=h.getFace?h.getFace():'info';document.getElementById('flyTitle').textContent=COMMFACE_LABEL[f]||'Info';document.getElementById('flyBody').innerHTML=h.content(f);}else{closeSection();}}}
/* desktop floating dock: comm faces (info/chat/call/video/email) for the active record — opens the flyout side panel */
const DOCK_COMMFACES=['chat','call','video','email'];
function buildDockComm(){const el=document.getElementById('dockComm'),dv=document.getElementById('dockCommDiv');if(!el)return;
  const h=commHost,on=!!h&&(h.visible?h.visible():true),cur=on&&h.getFace?h.getFace():'chat';
  el.style.display=on?'flex':'none';if(dv)dv.style.display=on?'block':'none';
  el.innerHTML=on?DOCK_COMMFACES.map(f=>`<button class="di dcf ${(section==='comm'&&f===cur)?'on':''}" data-face="${f}" onclick="openCommFace('${f}')" title="${COMMFACE_LABEL[f]}">${faceIcon(f)}</button>`).join(''):'';}
function openCommFace(f){const h=commHost;if(!h)return;
  if(section==='comm'&&(h.getFace?h.getFace():'info')===f){closeSection();return;}
  section='comm';if(h.setFace)h.setFace(f);
  document.querySelectorAll('.dock .di').forEach(b=>b.classList.remove('on'));
  document.querySelectorAll('#dockComm .dcf').forEach(b=>b.classList.toggle('on',b.dataset.face===f));
  const fly=document.getElementById('flyout');fly.classList.remove('genie');
  document.getElementById('flyTitle').textContent=COMMFACE_LABEL[f]||'Info';
  document.getElementById('flyExtra').innerHTML='';
  const body=document.getElementById('flyBody');body.className='fly-body';body.innerHTML=h.content(f);
  flySize(flyW);fly.classList.add('show');closeApps();mScrim(true);}
function hideCommDock(){commHost=null;const el=document.getElementById('commdock');if(el){el.classList.remove('show');el.innerHTML='';}document.body.classList.remove('comm-host');closeCommSheet();if(section&&section.indexOf('comm-')===0&&document.getElementById('flyout')?.classList.contains('show')){document.getElementById('flyBody').innerHTML=commBody(section.slice(5));}buildDockComm();}
function commTap(f){const h=commHost;if(!h)return;
  if(h.setFace)h.setFace(f);
  document.querySelectorAll('#commdock .cdf').forEach(b=>b.classList.toggle('on',b.dataset.face===f));
  const t=document.getElementById('commSheetTitle');if(t)t.textContent=COMMFACE_LABEL[f]||'Info';
  const b=document.getElementById('commSheetBody');if(b)b.innerHTML=h.content(f);
  document.getElementById('commSheet')?.classList.add('show');mScrim(true);}
function closeCommSheet(){document.getElementById('commSheet')?.classList.remove('show');mScrim(false);}
/* per-page content renderers: info reuses the side-panel body; the comm channels show that record's own history */
function commProjectContent(f){return f==='info'?projInfoBody():commChannel(f,'Rajeeshlal');}
function commDetailContent(f){return f==='info'?(rec&&rec.type==='lead'?leadInfo():taskInfo()):commChannel(f,rec&&rec.ent?(rec.type==='lead'?rec.ent.nm:(PEOPLE[rec.ent.asg]?PEOPLE[rec.ent.asg][2]:rec.ent.t)):'this contact');}
function commEmpContent(f){return f==='info'?empInfoBody():commChannel(f,hrEmp?hrEmp.name:'this contact');}
function commTaskContent(f){return f==='info'?tInfoBody():commChannel(f,tRec?tRec.title:'this task');}
let collFace='info';function collSetFace(f){collFace=f;}
function commCollContent(f){return f==='info'?collPanel(curColl(),curRec()):commChannel(f,curRec()?curRec().name:'this contact');}
/* ---- contextual communication: per-record history as cells, with a back link to all communications ---- */
const SVGPHONE='<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>';
const SVGMAIL='<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>';
const SVGVID='<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4z"/>';

/* ===== Right OJO dock as UI cells (cell-model: render + bind + click + target) =====
   Declarative & extensible — add a structure by pushing a cell, no markup edits.
   Three groups give the dock a cohesive read: assist (Genie, the anchor) ·
   communication (contextual to the open record + global inbox) · tools.       */
const DOCK_ICONS={
  chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  call:SVGPHONE, video:SVGVID, email:SVGMAIL,
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'
};
/* Genie's comm faces — selected via the topbar cluster; null = the Genie chat itself */
let genieFace=null;
const GFACES=['chat','call','video','email'];
const GFACE_LBL={chat:'Messages',call:'Calls',video:'Meetings',email:'Email'};
/* Single-sheet tabs: comm channels + Genie. (Search lives on Home, Notifications in the rail.) */
const DOCK_CELLS=[
  {id:'ui-dock-genie',  type:'UICell', owner:'ui-dock', group:'assist', values:{name:'Ojo Genie', render:'anchor', bind:'capability:genie',    click:'open', icon:'genie'}, links:{target:'genie'}},
  {id:'ui-dock-chat',   type:'UICell', owner:'ui-dock', group:'comm',   values:{name:'Messages',  render:'icon',   bind:'collection:Message', click:'open', icon:'chat'},  links:{target:'chat'}},
  {id:'ui-dock-call',   type:'UICell', owner:'ui-dock', group:'comm',   values:{name:'Calls',     render:'icon',   bind:'relation:calls',     click:'comm', icon:'call'},  links:{target:'call'}},
  {id:'ui-dock-video',  type:'UICell', owner:'ui-dock', group:'comm',   values:{name:'Meetings',  render:'icon',   bind:'relation:meetings',  click:'comm', icon:'video'}, links:{target:'video'}},
  {id:'ui-dock-email',  type:'UICell', owner:'ui-dock', group:'comm',   values:{name:'Email',     render:'icon',   bind:'relation:emails',    click:'comm', icon:'email'}, links:{target:'email'}}
];
function dockBtn(c){
  const v=c.values, id=c.links.target;
  const handler=v.click==='comm'?`openComm('${id}')`:id==='genie'?'genieToggle()':`openSection('${id}')`;
  if(v.render==='anchor')
    return `<button class="di genie" id="d-${id}" onclick="${handler}" title="${v.name}"><img class="ojo-logo" src="assets/ojo-logo.png" alt="OJO Genie"></button>`;
  return `<button class="di" id="d-${id}" onclick="${handler}" title="${v.name}">${svg(DOCK_ICONS[v.icon],19)}</button>`;
}
/* Claude-style tab: icon only, with the label revealed for the selected tab. */
function panelTabBtn(c){
  const v=c.values, id=c.links.target;
  const handler=v.click==='comm'?`openComm('${id}')`:id==='genie'?'genieToggle()':`openSection('${id}')`;
  if(v.render==='anchor')
    return `<button class="di genie ptab" id="d-${id}" onclick="${handler}" title="${v.name}"><img class="ojo-logo" src="assets/ojo-logo.png" alt="OJO"><span class="ptlbl">${v.name}</span></button>`;
  return `<button class="di ptab" id="d-${id}" onclick="${handler}" title="${v.name}">${svg(DOCK_ICONS[v.icon],19)}<span class="ptlbl">${v.name}</span></button>`;
}
/* Comm channels live INSIDE the Genie panel's notch now (one connected surface) —
   the dock & topbar carry only the Genie anchor. */
function renderDock(){
  const el=document.getElementById('dock'); if(!el)return;
  const g=k=>DOCK_CELLS.filter(c=>c.group===k);
  el.innerHTML =
    g('assist').map(dockBtn).join('') +
    `<div class="dock-spacer"></div>` +
    g('util').map(dockBtn).join('');
}
/* Topbar slot (adjacent to the bell) holds ONLY the opener pill — it hides while the
   panel is open, because the live cluster sits in the panel's notch at the same height. */
function renderPanelTabs(){
  const el=document.getElementById('panelTabs'); if(!el)return;
  el.innerHTML=`<button class="gtab on genie" onclick="genieToggle()" title="Ojo Genie"><img class="ojo-logo" src="assets/ojo-logo.png" alt="OJO"><span>Ojo Genie</span></button>`;
}
/* In-panel notch cluster with SWAP: the slot pill (on the hero, top-left) is always the
   active item with its name; the others wait as circles in the top-right cut. Selecting
   a face moves it into the slot and sends Ojo Genie out to the circle row. */
function ghActs(){
  const pill=genieFace
    ?`<span class="gh-pill"><button class="gpill" onclick="genieToggle()" title="${GFACE_LBL[genieFace]}">${svg(DOCK_ICONS[genieFace],16)}<span>${GFACE_LBL[genieFace]}</span></button></span>`
    :`<span class="gh-pill"><button class="gpill" onclick="genieToggle()" title="Ojo Genie"><img class="ojo-logo" src="assets/ojo-logo.png" alt="OJO"><span>Ojo Genie</span></button></span>`;
  const circles=(genieFace?['genie',...GFACES.filter(f=>f!==genieFace)]:GFACES).map(k=>
    k==='genie'?`<button class="gha glogo" onclick="genieHome()" title="Ojo Genie"><img class="ojo-logo" src="assets/ojo-logo.png" alt="OJO"></button>`
      :`<button class="gha" onclick="genieSel('${k}')" title="${GFACE_LBL[k]}">${svg(DOCK_ICONS[k],16)}</button>`).join('');
  return pill+`<span class="gh-acts">${circles}</span>`;
}
/* Contextual awareness: Genie + the comms group read whatever record/module is open. */
function ctxName(){
  if(typeof rec!=='undefined'&&rec&&rec.ent)return rec.type==='lead'?rec.ent.nm:rec.ent.title;
  if(typeof hrEmp!=='undefined'&&hrEmp)return hrEmp.name;
  if(typeof tRec!=='undefined'&&tRec)return tRec.title;
  if(typeof curMod!=='undefined'){if(curMod==='leads')return 'your pipeline';if(curMod==='project'||curMod==='projdash')return 'your projects';}
  return '';
}
function commContextName(){
  if(typeof rec!=='undefined'&&rec&&rec.ent)return rec.type==='lead'?rec.ent.nm:rec.ent.title;
  if(typeof hrEmp!=='undefined'&&hrEmp)return hrEmp.name;
  if(typeof tRec!=='undefined'&&tRec)return tRec.title;
  if(typeof curMod!=='undefined'&&curMod==='project')return 'Apollo — Website Revamp';
  return '';
}
function genieContext(){
  if(curRoute==='home'||curRoute==='profile'||curRoute==='admin')return {who:'', suggestions:["What needs my attention today?",'Show My Leads',"Today's calls"]};
  if(typeof rec!=='undefined'&&rec&&rec.ent){
    const n=rec.type==='lead'?rec.ent.nm:rec.ent.title;
    return {who:ctxName(), suggestions: rec.type==='lead'
      ? [`Draft a follow-up to ${n}`,'Summarise this lead',"What's the next best action?"]
      : ['Summarise this task','Draft a status update',"What's blocking this?"]};
  }
  if(typeof hrEmp!=='undefined'&&hrEmp)return {who:hrEmp.name, suggestions:[`Summarise ${hrEmp.name}'s profile`,'Pending approvals','Leave balance']};
  if(typeof curMod!=='undefined'&&curMod==='leads')return {who:'your pipeline', suggestions:['Show My Leads',"Today's calls",'Which leads are going cold?']};
  if(typeof curMod!=='undefined'&&(curMod==='project'||curMod==='projdash'))return {who:'your projects', suggestions:['Prioritize tasks for first half',"What's overdue?",'Project health']};
  return {who:'', suggestions:['Prioritize tasks for first half','Show My Leads',"Today's calls"]};
}
/* keep the Genie panel's contextual content in sync as the user navigates */
function syncGenie(){if(section==='genie'){const b=document.getElementById('flyBody');if(b)b.innerHTML=genieBody();}}

const CDATA={
  chat:[['in','Hi, following up on the proposal — any update?','Mon · 10:32 AM'],['out','Hi! Finalising the numbers, sending today.','Mon · 10:41 AM'],['in','Great, looking forward to it.','Mon · 10:43 AM'],['out','Shared the deck — let me know your thoughts.','Tue · 9:15 AM'],['in','Looks solid. Can we tweak the timeline?','Tue · 9:30 AM']],
  call:[['out','Outgoing call','12m 48s','Today · 2:30 PM'],['in','Incoming call','4m 12s','03 Jun · 11:10 AM'],['missed','Missed call','—','31 May · 6:05 PM'],['out','Outgoing call','1m 02s','24 May · 4:00 PM']],
  video:[['Proposal walkthrough','Google Meet · 30 min','Upcoming','10 Jun · 3:00 PM'],['Kickoff call','Zoom · 45 min','Completed','02 Jun · 11:00 AM'],['Discovery session','Microsoft Teams · 60 min','Completed','24 May · 2:00 PM']],
  email:[['Meeting Invitation — Apparel Brand','You are invited to a Teams meeting to review the campaign and next steps.','03 Jun 2026'],['Proposal — Meta Ad Campaigns','Please find attached the proposal covering goals, budget and timeline.','31 May 2026'],['Invoice PROF/0006 from Reliance','Invoice PROF/0006 attached for your records. Payable within 14 days.','07 May 2026'],['Service Level Agreement','Please find attached the SLA for your review and sign-off.','07 May 2026']]
};
function commChannel(f,name){return `<div class="cpanel">
   <button class="cpback" onclick="openSection('chat')">${svg('<path d="M15 18l-6-6 6-6"/>',15)} All communications</button>
   <div class="cpwith">with <b>${name||'this contact'}</b></div>
   ${cpBody(f,name)}</div>`;}
function cpInitials(n){return (n||'?').replace(/[^A-Za-z ]/g,'').split(' ').filter(Boolean).map(w=>w[0]).slice(0,2).join('').toUpperCase()||'?';}
function cpBody(f,name){
  if(f==='chat')return `<div class="cthread">${CDATA.chat.map(m=>`<div class="cmsg ${m[0]}">${m[0]==='in'?`<span class="cav">${cpInitials(name)}</span>`:''}<div class="cmw"><div class="cb">${m[1]}</div><div class="ct">${m[2]}</div></div></div>`).join('')}</div>
     <div class="cbar"><input class="cbin" placeholder="Message ${name||''}…"><button class="cbsend" onclick="toast('Message sent')">${svg('<path d="M12 19V5M5 12l7-7 7 7"/>',16)}</button></div>`;
  if(f==='call')return `<div class="clist">${CDATA.call.map(c=>`<div class="ccell"><span class="cic ${c[0]}">${svg(SVGPHONE,15)}</span><div class="cmn"><div class="cnt">${c[1]}</div><div class="csb">${c[3]}</div></div><div class="cmr">${c[2]}</div></div>`).join('')}</div>
     <button class="cact" onclick="toast('Calling ${name||''}…')">${svg(SVGPHONE,15)} Call ${name||''}</button>`;
  if(f==='video')return `<div class="clist">${CDATA.video.map(v=>`<div class="ccell"><span class="cic vid">${svg(SVGVID,15)}</span><div class="cmn"><div class="cnt">${v[0]}</div><div class="csb">${v[1]} · ${v[3]}</div></div><span class="cstat ${v[2]==='Upcoming'?'up':'done'}">${v[2]}</span></div>`).join('')}</div>
     <button class="cact" onclick="toast('New meeting')">${svg('<path d="M12 5v14M5 12h14"/>',15)} New meeting</button>`;
  return `<div class="cmaillab">Recent emails</div><div class="clist">${CDATA.email.map(e=>`<div class="ccell mail" onclick="toast('Open email')"><div class="cmh">${svg(SVGMAIL,14)} <span class="cmt">${e[0]}</span></div><div class="cms">${e[1]}</div><div class="cmd">${e[2]}</div></div>`).join('')}</div>
     <button class="cact dark" onclick="toast('New mail')">${svg(SVGMAIL,15)} New Mail</button>`;}
function mountDash(){
  document.getElementById('modcontent').innerHTML=`<div class="box">
    <div class="mc-top"><div class="title-wrap"><div class="picon">${svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 4v16"/>',20)}</div><div><h1>Projects</h1><div class="sub">4 active · workspace dashboard</div></div></div>
      <div class="sp"></div>${modTools()}<div class="newbtn"><button class="a" onclick="toast('New project')">＋ New project</button></div></div>
    <div style="padding:0 26px">${metricsBar('projdash')}</div>
    <div class="pgrid">${PROJECTS.map(p=>`<div class="pcard" onclick="${p.open?"go('project')":"toast('Demo: only Apollo is wired')"}">
      <div class="ph"><div class="ic" style="background:${p.color}">${p.ic}</div><div><div class="nm">${p.name}</div><div class="cl">${p.client}</div></div><span class="pbadge" style="color:${p.sc};background:${p.sc}1f">${p.status}</span></div>
      <div class="bar"><div class="fill" style="width:${p.pct}%;background:${p.sc}"></div></div>
      <div class="meta"><span>${p.done}/${p.total} tasks</span><span>Due ${p.due}</span><span class="pc">${p.pct}%</span></div>
      <div class="avs">${p.team.map(t=>`<div class="av" style="background:${t[1]}">${t[0]}</div>`).join('')}</div></div>`).join('')}
      <div class="addcard" onclick="toast('New project')">${svg('<path d="M12 5v14M5 12h14"/>',18)} New project</div></div></div>`;
}

/* ============ GENERIC VIEW CONTROLS ============ */
function renderVTabs(){const c=cm();document.getElementById('vtabs').innerHTML=c.views.map(v=>`<button class="vtab ${v.name===c.active?'on':''}" onclick="setView('${v.name.replace(/'/g,"\\'")}')"><span class="${v.icon==='star'?'star':''}">${svg(ICONS[v.icon]||ICONS.List,15)}</span>${v.name}</button>`).join('');}
function setView(n){cm().active=n;renderVTabs();renderWork();buildVTypes();updateGroup();const ct=document.getElementById('crumbTab');if(ct)ct.textContent=n;}
function buildVMenu(){document.getElementById('vgrid').innerHTML=['Table','Board','List','Gallery','Calendar','Timeline','Chart','Feed','Map'].map(t=>`<button class="vitem" onclick="addView('${t}')"><span class="ic">${svg(ICONS[t],22)}</span><span class="n">${t}</span></button>`).join('');}
function toggleVMenu(e){e.stopPropagation();openPop('vmenu');}
function addView(t){cm().views.push({name:t,icon:t,type:t});closePops();setView(t);toast(t+' view added');}
function buildVTypes(){const c=cm(),t=curType();document.getElementById('vtypes').innerHTML=c.types.map(x=>`<button class="vtype ${x===t?'on':''}" onclick="setType('${x}')"><span>${svg(ICONS[x]||ICONS.List,18)}</span>${x}</button>`).join('');}
function setType(t){cm().views.find(v=>v.name===cm().active).type=t;renderVTabs();renderWork();buildVTypes();updateGroup();}
function toggleSettings(e){e.stopPropagation();openPop('settings');}
function toggleColor(){cm().color=!cm().color;document.getElementById('tgColor').classList.toggle('on',cm().color);renderWork();}
function setSize(s){cm().size=s;syncSizeToggle();renderWork();}
function syncSizeToggle(){const s=cm().size;const c=document.getElementById('szC'),m=document.getElementById('szM');if(c&&m){c.classList.toggle('on',s==='compact');m.classList.toggle('on',s==='medium');}}
function updateGroup(){const g=document.getElementById('groupVal');if(g)g.firstChild.textContent=cm().group(curType())+' ';}
function renderWork(){cm().render(curType());updateToolbar();updateMetrics();updateCommDock();}
function updateToolbar(){const vt=document.getElementById('viewTools');if(!vt)return;vt.style.display=(curMod==='project'&&(curType()==='Overview'||curType()==='Details'))?'none':'flex';}
function placeholder(t){return `<div class="placeholder"><div class="pic">${svg(ICONS[t]||ICONS.List,28)}</div><h2>${t} view</h2><p>Same cells, arranged as a <b>${t}</b>. Group, filter, and sort — one database, many lenses.</p></div>`;}

/* ============ LEADS RENDER ============ */
function renderLeadsWork(type){const el=document.getElementById('work');
  if(type==='Board')el.innerHTML=lBoard();else if(type==='Table')el.innerHTML=lTable();else if(type==='List')el.innerHTML=lList();else el.innerHTML=placeholder(type);}
function lBoard(){const c=cm();return `<div class="board ${c.color?'color':''} ${c.size}">`+LSTAGES.map(s=>{const items=leads.filter(l=>l.st===s.k);const sum=items.reduce((a,l)=>a+l.val,0);
  return `<div class="col"><div class="col-head" style="--cc:${s.cc}"><span class="pill"><span class="dot"></span>${s.k}</span><span class="ct">${items.length}</span><span class="more">${sum?fmt(sum):''}</span></div>
    <div class="col-body" ondragover="cardOver(event)" ondragleave="cardLeave(event)" ondrop="cardDrop(event,'${s.k}')">${items.map(l=>`<div class="card" draggable="true" ondragstart="cardDragStart(event,'${l.id}')" ondragend="cardDragEnd(event)" onclick="openPeek('${l.id}')"><div class="nm">${l.co}</div><div class="by">${l.nm} · By Priya on Mar 6</div><div class="mid"><span class="val">${fmt(l.val)}</span></div><div class="foot"><span class="src">${l.src}</span><span class="chk">${svg('<path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',13)}${l.chk}</span>${av(l.asg)}</div></div>`).join('')||'<div class="col-empty">Drop a lead here</div>'}
      <button class="col-add" onclick="toast('New lead')">${svg('<path d="M12 5v14M5 12h14"/>',14)} New lead</button></div></div>`;}).join('')+`</div>`;}
function lTable(){let h='<div class="tablewrap"><table><thead><tr><th>Lead</th><th>Company</th><th class="num">Value</th><th>Source</th><th>Owner</th><th>Stage</th></tr></thead><tbody>';
  leads.forEach(l=>{h+=`<tr onclick="openPeek('${l.id}')"><td><span class="nm">${l.nm}</span></td><td class="co">${l.co}</td><td class="num">${fmt(l.val)}</td><td><span class="src">${l.src}</span></td><td><span class="owncell">${av(l.asg)}${l.asg?PEOPLE[l.asg][2]:'Unassigned'}</span></td><td><span class="badge"><span class="dot" style="background:${lcc(l.st)}"></span>${l.st}</span></td></tr>`;});return h+'</tbody></table></div>';}
function lList(){let h='';LSTAGES.forEach(s=>{const items=leads.filter(l=>l.st===s.k);if(!items.length)return;h+=`<div class="lg"><div class="lg-head"><span class="pill"><span class="dot" style="background:${s.cc}"></span>${s.k}</span><span class="ct">${items.length}</span></div>`;items.forEach(l=>{h+=`<div class="lrow" onclick="openPeek('${l.id}')">${av(l.asg)}<span class="nm">${l.co}</span><span class="co">${l.nm} · ${l.src}</span><span class="val">${fmt(l.val)}</span></div>`;});h+='</div>';});return h;}

/* ============ PROJECT RENDER ============ */
function renderProjWork(type){const el=document.getElementById('work');
  if(type==='Overview')el.innerHTML=projOverview();else if(type==='Details')el.innerHTML=projDetails();else if(type==='List')el.innerHTML=pList();else if(type==='Board')el.innerHTML=pBoard();else if(type==='Table')el.innerHTML=pTable();else el.innerHTML=placeholder(type);}
/* static project data (separated from the live/dynamic panel) — clean aligned grid, few section starters */
function projDetails(){
  const about=[['Status','Active'],['Due date','20 Jul 2026'],['Milestones','4'],['Tasks','10 total'],['Budget','₹4,80,000'],['Budget left','₹3,80,000'],['Owner','Priya Nair'],['Created','7 May 2026']];
  const client=[['Primary contact','Rajeeshlal'+pcommMini('Rajeeshlal')],['Role','POC'],['Email','vinoth+lal@palpx.com'],['Portal','Shared with client']];
  const vendor=[['Vendor','Ojo Dojo (outsourced)'],['Vendor POC','ojodeveloper1'],['Vendor email','ojodeveloper1@gmail.com'],['Website','ojo.io']];
  const block=(h,rows)=>`<div class="pd-block"><div class="pd-h">${h}</div><div class="pd-grid">${rows.map(([k,v])=>`<div class="pd-cell"><div class="pd-k">${k}</div><div class="pd-v">${v}</div></div>`).join('')}</div></div>`;
  return `<div class="pdetails">${block('About this project',about)}${block('Client',client)}${block('Delivery',vendor)}</div>`;}
function chev(){return svg('<path d="m9 18 6-6-6-6"/>',15);}
function miniCal(){const y=2026,m=5;const first=new Date(y,m,1).getDay();const days=new Date(y,m+1,0).getDate();let c='';for(let i=0;i<first;i++)c+='<span class="cd"></span>';for(let d=1;d<=days;d++)c+=`<span class="cd ${d===5?'hl':''}">${d}</span>`;return `<div class="cal-h">June 2026</div><div class="cal-grid">${['S','M','T','W','T','F','S'].map(x=>`<span class="dow">${x}</span>`).join('')}${c}</div>`;}
/* project home data + customisable modular boxes (each is a cell) */
const PMSGS=[['VC','#2F6FED','Victor Cooper','Project Kickoff',"We'll use OJO to coordinate the whole website revamp."],['AB','#E08A1E','Annie Bryan','Scope sign-off','Client approved scope and budget. Design can start.'],['CW','#7C53E6','Cheryl W.','Launch checklist','Everything we need before go-live.']];
const PDOCS=[['PDF','#C92F3A','Brand Guidelines.pdf','Mei · Jun 2'],['XLS','#15A06A','Sitemap.xlsx','Sam · Jun 4'],['FIG','#7C53E6','Homepage-hero.fig','Mei · Jun 5']];
const PCHATS=[['ML','#15A06A','Mei Lin','Wireframes ready for review 🎨'],['SV','#2F6FED','Sam Verma','API endpoints documented'],['PN','#F04D56','Priya Nair','Client call moved to Thu 4pm']];
const WICON={score:ICONS.Chart,status:'<path d="M12 2v20M7 6h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h8"/>',timeline:ICONS.Timeline,messages:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',todos:'<path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',cardtable:ICONS.Board,client:'<circle cx="12" cy="8" r="3.2"/><path d="M5 20a7 7 0 0 1 14 0"/>',professional:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',docs:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',schedule:ICONS.Calendar,notes:ICONS.notes,checkins:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'};
const WIDGETS={
 score:{title:'Project Score',body:wScore},status:{title:'Budget & Status',body:wStatus},timeline:{title:'Timeline',body:wTimeline},
 messages:{title:'Message Board',body:wMessages,count:()=>PMSGS.length},todos:{title:'To-dos',body:wTodos,note:'by milestone',head:"setView('All Tasks')"},
 cardtable:{title:'Card Table',body:wCardTable,count:()=>tasks.length,head:"setView('By Status')"},client:{title:'Client',body:wClient},professional:{title:'Professional',body:wProfessional},
 docs:{title:'Docs & Files',body:wDocs,count:()=>PDOCS.length},chat:{title:'Chat',body:wChat,count:()=>PCHATS.length},schedule:{title:'Schedule',body:wSchedule},notes:{title:'Notes',body:wNotes},checkins:{title:'Automatic Check-ins',body:wCheckins}};
let WUID=0;
let pjWidgets=['timeline','messages','todos','cardtable','docs','chat','schedule'].map(t=>({id:'w'+(++WUID),type:t}));

function actGlyph(t){return t==='done'?svg('<path d="M20 6 9 17l-5-5"/>',11):svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',11);}
/* shared activity feed — rows are [color, glyph, date, who, action, target]; used by project, task & module-task panels */
function actRowsHTML(items,more){return `<div class="bact">${items.map(i=>`<div class="arow"><span class="ic" style="background:${i[0]}">${actGlyph(i[1])}</span><span><span class="dt">${i[2]}</span><span class="mut">${i[3]} ${i[4]} </span><a onclick="toast('Open: ${i[5]}')">${i[5]}</a></span></div>`).join('')}${more||''}</div>`;}
function bActivity(){const items=[['#E0A21E','msg','Jun 5','Priya Nair','commented on','Wireframes'],['#15A06A','done','Jun 4','Mei Lin','completed a to-do:','Competitive audit'],['#2F6FED','msg','Jun 3','Victor Cooper','commented on','Project Kickoff']];
  return actRowsHTML(items,`<div class="more"><span class="av">VK</span>1 person active in the last 7 days · <a onclick="setView('All Tasks')">View all activity…</a></div>`);}
function projTopInsights(){const a=projScore();const done=tasks.filter(t=>t.st==='Done').length;const total=tasks.length||1;
  return `<div class="proj-ai">
    <div class="pa-score"><div class="pa-ring">${ring(a[0],a[0]>=70?'var(--ok)':a[0]>=40?'var(--warn)':'var(--coral)',72)}<span class="pa-pct">${a[0]}%</span></div><div class="pa-meta"><div class="pa-lbl">${a[1]}</div><div class="pa-sub">${done}/${total} tasks done · 4 milestones</div></div></div>
    <div class="pa-ins">${ojoInsightsCard(projInsights(),'project')}</div></div>`;}
function projOverview(){return `<div class="bhome">
  ${projTopInsights()}
  <div class="bgrid">${pjWidgets.map(widgetCard).join('')}
    <div class="bsec add"><div class="bsec-h">&nbsp;</div><div class="baddtile" onclick="pjAddOpen(event)" title="Add a box">${svg('<path d="M12 5v14M5 12h14"/>',20)}<span>Add a box</span></div></div>
  </div>
</div>`;}
function widgetCard(w){const d=WIDGETS[w.type];if(!d)return '';
  return `<div class="bsec" draggable="true" data-id="${w.id}" ondragstart="pjDragStart(event,'${w.id}')" ondragover="pjDragOver(event)" ondrop="pjDrop(event,'${w.id}')" ondragend="pjDragEnd(event)">
    <div class="bsec-h"><span class="${d.head?'nav':''}" ${d.head?`onclick="${d.head}"`:''}>${d.title}</span><span class="bx" onclick="pjRemove('${w.id}')">${svg('<path d="M18 6 6 18M6 6l12 12"/>',12)}</span></div>
    <div class="bcard ${d.head?'clk':''}" ${d.head?`onclick="${d.head}"`:''}>${d.body()}</div></div>`;}
let pjDrag=null;
function pjDragStart(e,id){pjDrag=id;e.currentTarget.classList.add('dragging');}
function pjDragOver(e){e.preventDefault();}
function pjDrop(e,id){e.preventDefault();if(!pjDrag||pjDrag===id)return;const from=pjWidgets.findIndex(w=>w.id===pjDrag);const m=pjWidgets.splice(from,1)[0];let to=pjWidgets.findIndex(w=>w.id===id);pjWidgets.splice(to,0,m);renderWork();}
function pjDragEnd(){pjDrag=null;document.querySelectorAll('.d-sec').forEach(s=>s.classList.remove('dragging'));}
function pjRemove(id){pjWidgets=pjWidgets.filter(w=>w.id!==id);renderWork();toast('Box removed');}
function pjAddOpen(e){e.stopPropagation();const m=document.getElementById('wpal');m.innerHTML='<div class="h">Add a box</div><div class="wpalgrid">'+Object.keys(WIDGETS).map(t=>`<button class="pli" onclick="pjAdd('${t}')"><span class="ic">${svg(WICON[t]||ICONS.List,16)}</span><span class="nm">${WIDGETS[t].title}</span></button>`).join('')+'</div>';const r=e.currentTarget.getBoundingClientRect();m.style.top=Math.min(r.top,window.innerHeight-380)+'px';m.style.left=Math.max(12,Math.min(r.left,window.innerWidth-352))+'px';openPop('wpal');}
function pjAdd(t){pjWidgets.push({id:'w'+(++WUID),type:t});closePops();renderWork();toast(WIDGETS[t].title+' added');}

/* widget bodies */
function projScore(){const p=tasks.length?Math.round(tasks.filter(t=>t.st==='Done').length/tasks.length*100):0;return [p,p>=70?'On track':p>=40?'Average':'Early stage'];}
function wScore(){const a=projScore();return `<div class="wsc"><div class="wgauge">${ring(a[0],'var(--warn)',116)}<div class="pct">${a[0]}%</div></div><div class="wscr"><span class="l">Project Score <span class="xderive">derive</span></span><span class="vv">${a[1]}</span></div></div>`;}
function wStatus(){return `<div class="wkv"><span class="k">Budget</span><span class="v">₹4,80,000</span></div><div class="wkv"><span class="k">Status</span><span class="v" style="color:var(--ok)">● Active</span></div><div class="wkv"><span class="k">Start date</span><span class="v">04 Jun 2026</span></div><div class="wkv"><span class="k">End date</span><span class="v">20 Jul 2026</span></div>`;}
function wClient(){return `<div class="wkv"><span class="k">Name</span><span class="v">Acme Co. (internal)</span></div><div class="wkv"><span class="k">Owner</span><span class="v">Priya Nair</span></div><div class="wkv"><span class="k">Email</span><span class="v" style="font-weight:500">team@acme.co</span></div>`;}
function wProfessional(){return `<div class="wkv"><span class="k">Organisation</span><span class="v">Acme Co.</span></div><div class="wkv"><span class="k">Role</span><span class="v" style="color:var(--ghost)">—</span></div><div class="wkv"><span class="k">Department</span><span class="v" style="color:var(--ghost)">—</span></div><div class="wkv"><span class="k">Address</span><span class="v" style="color:var(--ghost)">—</span></div>`;}
function wTimeline(){const overall=projScore()[0];const due={Discovery:'7 May',Design:'20 Jun',Build:'8 Jul',Launch:'20 Jul'};return `<div class="wtl"><div class="wtl-track"><div class="wtl-fill" style="width:${overall}%"></div></div><div class="wtl-nodes">${MILESTONES.map(ms=>{const its=tasks.filter(t=>t.ms===ms);const done=its.length&&its.every(t=>t.st==='Done');return `<div class="wtl-node ${done?'done':''}"><div class="nd"></div><div class="nm">${ms}</div><div class="due">${due[ms]||''}</div></div>`;}).join('')}</div></div>`;}
function pcommMini(name){return `<span class="pcomm">${[['call','Call'],['email','Email'],['video','Meet']].map(([f,l])=>`<button title="${l} ${name||''}" onclick="event.stopPropagation();openComm('${f}')">${faceIcon(f)}</button>`).join('')}</span>`;}
function wMessages(){return PMSGS.map(m=>`<div class="d-msg" onclick="toast('Open: ${m[3]}')"><div class="av2" style="background:${m[1]}">${m[0]}</div><div style="min-width:0"><div class="mt">${m[3]}</div><div class="mb">${m[4]}</div><div class="who">${m[2]}${pcommMini(m[2])}</div></div></div>`).join('');}
function wTodos(){return ['Design','Build'].map(ms=>{const its=tasks.filter(t=>t.ms===ms);const done=its.filter(t=>t.st==='Done').length;return `<div class="d-todo-h"><span class="pie"></span>${ms} <span style="color:var(--faint);font-weight:600">${done}/${its.length}</span></div>`+its.map(t=>`<div class="d-titem ${t.st==='Done'?'done':''}"><button class="ck" onclick="event.stopPropagation();toggleDone('${t.id}')"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></button><span class="tx" onclick="openPeek('${t.id}')">${t.t}</span></div>`).join('');}).join('');}
function wCardTable(){return `<div class="d-mini">${STATUSES.map(s=>`<div class="d-mcol" style="--cc:${s.cc}" onclick="setView('By Status')"><div class="l">${s.k}</div><div class="n">${tasks.filter(t=>t.st===s.k).length}</div></div>`).join('')}</div>`;}
function wDocs(){return PDOCS.map(d=>`<div class="d-doc" onclick="toast('Open ${d[2]}')"><div class="fi" style="background:${d[1]}">${d[0]}</div><div><div class="dt">${d[2]}</div><div class="dd">${d[3]}</div></div></div>`).join('');}
function wChat(){return PCHATS.map(c=>`<div class="d-chat"><div class="av2" style="background:${c[1]}">${c[0]}</div><div><div class="cw">${c[2]}</div><div class="cm">${c[3]}</div></div></div>`).join('');}
function wSchedule(){return miniCal();}
function wNotes(){return `<div class="wnotes" contenteditable="true" data-ph="Write project notes…"></div>`;}
function wCheckins(){return `<div class="xchat" style="padding:18px 0">No check-ins yet.<br>Ask the team a recurring question.</div>`;}
function pList(){let h='';MILESTONES.forEach(ms=>{const items=tasks.filter(t=>t.ms===ms);if(!items.length)return;const done=items.filter(t=>t.st==='Done').length;const pct=Math.round(done/items.length*100);
  h+=`<div class="ms"><div class="ms-head"><span class="nm">${ms}</span><span class="ct">${done}/${items.length} done</span><span class="prog"><span class="derive">percent_done</span><span class="bar"><span class="fill" style="width:${pct}%"></span></span><span class="pc">${pct}%</span></span></div>`;
  items.forEach(t=>{h+=`<div class="trow ${t.st==='Done'?'done':''}" onclick="openPeek('${t.id}')"><button class="check" onclick="event.stopPropagation();toggleDone('${t.id}')"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></button><span class="tt">${t.t}</span><span class="badge"><span class="dot" style="background:${scc(t.st)}"></span>${t.st}</span><span class="owncell">${av(t.asg)}${PEOPLE[t.asg][2]}</span><span class="pri" style="background:${PR[t.pri]}">${t.pri}</span><span class="est">${t.est}</span></div>`;});
  h+=`<button class="ms-add" onclick="toast('New task in ${ms}')">${svg('<path d="M12 5v14M5 12h14"/>',14)} New task</button></div>`;});return h;}
function pBoard(){const c=cm();return `<div class="board ${c.color?'color':''} ${c.size}">`+STATUSES.map(s=>{const items=tasks.filter(t=>t.st===s.k);
  return `<div class="col"><div class="col-head" style="--cc:${s.cc}"><span class="pill"><span class="dot"></span>${s.k}</span><span class="ct">${items.length}</span></div>
    <div class="col-body" ondragover="cardOver(event)" ondragleave="cardLeave(event)" ondrop="cardDrop(event,'${s.k}')">${items.map(t=>`<div class="card" draggable="true" ondragstart="cardDragStart(event,'${t.id}')" ondragend="cardDragEnd(event)" onclick="openPeek('${t.id}')"><div class="tt">${t.t}</div><div class="ms-tag">${t.ms}</div><div class="foot"><span class="pri" style="background:${PR[t.pri]}">${t.pri}</span><span class="due">${t.due}</span>${av(t.asg)}</div></div>`).join('')||'<div class="col-empty">Drop a task here</div>'}
      <button class="col-add" onclick="toast('New task')">${svg('<path d="M12 5v14M5 12h14"/>',14)} New task</button></div></div>`;}).join('')+`</div>`;}
function pTable(){let h='<div class="tablewrap"><table><thead><tr><th>Task</th><th>Status</th><th>Assignee</th><th>Milestone</th><th>Due</th><th>Priority</th><th class="num">Est</th></tr></thead><tbody>';
  tasks.forEach(t=>{h+=`<tr onclick="openPeek('${t.id}')"><td><span class="tt">${t.t}</span></td><td><span class="badge"><span class="dot" style="background:${scc(t.st)}"></span>${t.st}</span></td><td><span class="owncell">${av(t.asg)}${PEOPLE[t.asg][2]}</span></td><td>${t.ms}</td><td class="due">${t.due}</td><td><span class="pri" style="background:${PR[t.pri]}">${t.pri}</span></td><td class="num">${t.est}</td></tr>`;});return h+'</tbody></table></div>';}
function toggleDone(id){const t=tasks.find(x=>x.id===id);if(!t)return;t.st=t.st==='Done'?'Todo':'Done';renderWork();}

/* ============ RECORD (shared by side-peek + full detail) ============ */
let rec=null, recMode='peek', detailFace='info', detailTab='Overview', detailCollapsed=true;
const SCORE={New:[20,'Cold'],Contacted:[35,'Warming'],Qualified:[60,'Average'],Proposal:[72,'Warm'],Won:[95,'Hot'],Lost:[12,'Cold']};
const TABICON={Overview:'star',Details:'Table',Notes:'notes',Activity:'activity'};
function newRec(type,id){const ent=type==='lead'?leads.find(x=>x.id===id):tasks.find(x=>x.id===id);if(!ent)return null;
  const subs=type==='lead'?[{t:'Confirm budget with client',done:true},{t:'Add target audience',done:false},{t:'Send proposal',done:false}]:[{t:'Define scope',done:true},{t:'Draft',done:false},{t:'Review with PM',done:false}];
  return {type,ent,subs,comments:[]};}

/* ---- card click → full detail page (with breadcrumb). Right peek removed. ---- */
function openPeek(id){openDetail(cm().peek,id);}
function closePeek(){const p=document.getElementById('peek');if(p)p.classList.remove('show');const s=document.getElementById('scrim');if(s)s.classList.remove('show');}
/* board drag-and-drop (move card between columns) */
let cardDrag=null;
function cardDragStart(e,id){cardDrag=id;e.currentTarget.classList.add('cdrag');e.dataTransfer.effectAllowed='move';}
function cardDragEnd(e){e.currentTarget.classList.remove('cdrag');document.querySelectorAll('.col-body.dragover').forEach(c=>c.classList.remove('dragover'));}
function cardOver(e){e.preventDefault();e.currentTarget.classList.add('dragover');}
function cardLeave(e){e.currentTarget.classList.remove('dragover');}
function cardDrop(e,stage){e.preventDefault();e.currentTarget.classList.remove('dragover');if(!cardDrag)return;const arr=curMod==='leads'?leads:tasks;const it=arr.find(x=>x.id===cardDrag);if(it&&it.st!==stage){it.st=stage;renderWork();renderModInfo&&document.getElementById('modpanelbody')&&renderModInfo();toast('Moved to '+stage);}cardDrag=null;}
function expandRecord(){if(!rec)return;const type=rec.type,id=rec.ent.id;closePeek();openDetail(type,id);}

/* ---- full detail page (with collapsible info/comm panel) ---- */
let detailFrom=null; /* set when a task record is cross-launched (Tasks module / Home) so close returns there */
function openDetail(type,id,from){const r=newRec(type,id);if(!r)return;rec=r;recMode='detail';detailFace='info';detailTab='Overview';detailCollapsed=true;detailFrom=from||null;trkReset();mountDetail();syncGenie();}
function faceIcon(f){const m={info:'<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',call:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',video:'<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4z"/>',email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'};return svg(m[f],17);}
function mountDetail(){const r=rec,isLead=r.type==='lead',e=r.ent;
  const crumb=isLead?`<a onclick="go('leads')">Leads</a> <span class="sep">‹</span> ${detailTab}`
    :`<a onclick="go('projectsDash')">Projects</a> <span class="sep">‹</span> <a onclick="go('project')">Apollo</a> <span class="sep">‹</span> ${e.ms} <span class="sep">‹</span> ${detailTab}`;
  const dside=`<div class="dside">
      <div class="dnav"><button class="dctl" onclick="detailNav(-1)" title="Previous (↑)">${svg('<path d="M18 15l-6-6-6 6"/>',21)}</button><button class="dctl" onclick="detailNav(1)" title="Next (↓)">${svg('<path d="M6 9l6 6 6-6"/>',21)}</button></div>
    </div>`;
  /* activity lives in the hideable panel (project pattern), so no Activity tab */
  const viewbar=`<div class="viewbar">${['Overview','Details','Notes'].map(x=>`<button class="vtab ${x===detailTab?'on':''}" onclick="detailSetTab('${x}')"><span class="${x==='Overview'?'star':''}">${svg(ICONS[TABICON[x]],14)}</span>${x}</button>`).join('')}</div>`;
  /* one header cluster for every record: comm pill · history toggle · close — comm faces fit the record */
  const who=isLead?(e.nm||'contact'):(e.asg&&PEOPLE[e.asg]?PEOPLE[e.asg][2]:'assignee');
  const faces=isLead?[['call','Call'],['email','Email'],['chat','Message']]:[['call','Call'],['email','Email'],['video','Meet']];
  const cluster=`<div class="commpill">${faces.map(([f,l])=>`<button title="${l} ${who}" onclick="openComm('${f}')">${faceIcon(f)}</button>`).join('')}</div>
      <button class="ptog-ic ${detailCollapsed?'':'on'}" id="dPtogBtn" onclick="detailToggle()" title="${detailCollapsed?'Show activity':'Hide activity'}">${svg('<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/>',17)}</button>
      <button class="mtool hdr-x" onclick="detailClose()" title="Close (Esc)">${svg(SVS.x,18)}</button>`;
  document.getElementById('screen').innerHTML=`<div class="dwrap">${dside}
    <div class="dbox ${detailCollapsed?'collapsed':''}" id="dbox">
      <div class="dmain">
        <div class="dtop"><div class="crumbs">${crumb}</div><div class="sp"></div>${cluster}</div>
        ${viewbar}
        <div class="dcenter"><div class="inner" id="dinner"></div></div>
      </div>
      <aside class="dpanel" id="dpanel">
        <div class="dpanel-head"><span class="nm">Recent activity</span></div>
        <div class="dpanel-body" id="dpanelbody"></div>
      </aside></div></div>`;
  renderRec();renderDetailInfo();
  commSetHost({getFace:()=>detailFace,setFace:detailSetFace,content:commDetailContent});syncCommActive();}
function detailToggle(){detailCollapsed=!detailCollapsed;document.getElementById('dbox').classList.toggle('collapsed',detailCollapsed);
  const b=document.getElementById('dPtogBtn');if(b){b.classList.toggle('on',!detailCollapsed);b.title=detailCollapsed?'Show activity':'Hide activity';}}
function detailClose(){const isLead=rec&&rec.type==='lead';trkReset();rec=null;recMode='';
  if(!isLead&&detailFrom){const f=detailFrom;detailFrom=null;if(f==='home'){go('home');}else{openTasks('project');}return;}
  go(isLead?'leads':'project');}
function detailNav(dir){if(!rec)return;const arr=rec.type==='lead'?leads:tasks;const i=arr.findIndex(x=>x.id===rec.ent.id);if(i<0)return;const n=(i+dir+arr.length)%arr.length;const nr=newRec(rec.type,arr[n].id);if(!nr)return;rec=nr;detailFace='info';trkReset();xpClose();mountDetail();}
document.addEventListener('keydown',e=>{if(recMode!=='detail'||!document.getElementById('dbox'))return;const t=e.target;if(t&&(t.tagName==='TEXTAREA'||t.tagName==='INPUT'||t.isContentEditable))return;if(e.key==='Escape'){if(xpShown()){xpClose();}else{detailClose();}}else if(e.key==='ArrowDown'){e.preventDefault();detailNav(1);}else if(e.key==='ArrowUp'){e.preventDefault();detailNav(-1);}});
function detailSetTab(t){detailTab=t;mountDetail();}
function detailSetFace(f){detailFace=f;document.querySelectorAll('.xcface').forEach(b=>b.classList.toggle('on',b.dataset.face===f));renderDetailInfo();}
function ring(pct,color,size){const r=(size-10)/2,c=2*Math.PI*r,off=c*(1-pct/100);return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)"><circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="var(--line-2)" stroke-width="9" fill="none"/><circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="${color}" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg>`;}
function chev2(){return `<span class="chev">${svg('<path d="m6 9 6 6 6-6"/>',14)}</span>`;}
function renderDetailInfo(){const el=document.getElementById('dpanelbody');if(!el)return;el.innerHTML=rec.type==='lead'?leadInfo():taskInfo();}
function ipanel(rows){return `<div class="xipanel">${rows.map(r=>`<div class="xirow"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`).join('')}</div>`;}
function igroup(title,inner,edit){return `<div class="xigroup"><div class="gh" onclick="xgToggle(this)">${title}${edit?`<button class="ed2" onclick="event.stopPropagation();toast('Edit ${title}')">${svg(SVS.pencil,13)}</button>`:''}${chev2()}</div><div class="xgbody">${inner}</div></div>`;}
function xgToggle(el){el.closest('.xigroup').classList.toggle('collapsed');}
/* inline communication package — sits next to contact details; opens that channel in the right panel (same order as the dock) */
function commQuick(){return `<div class="commquick"><span class="cql">Reach out</span>
  <button class="cq" onclick="openComm('chat')" title="Message">${faceIcon('chat')}</button>
  <button class="cq" onclick="openComm('call')" title="Call">${faceIcon('call')}</button>
  <button class="cq" onclick="openComm('video')" title="Meeting">${faceIcon('video')}</button>
  <button class="cq" onclick="openComm('email')" title="Email">${faceIcon('email')}</button></div>`;}
/* AI read of a lead, derived honestly from its current stage (the lead cell's state). */
function leadAI(l){const m={
   New:{reason:'New lead — no activity logged yet.',label:'Assign an owner so this lead gets worked.',cta:'Assign owner'},
   Contacted:{reason:'Contacted — awaiting qualification.',label:'Confirm the budget and timeline to qualify.',cta:'Qualify lead'},
   Qualified:{reason:'Qualified — strong fit, ready to pitch.',label:'Send the proposal to move toward Won.',cta:'Send proposal'},
   Proposal:{reason:'Proposal sent — decision pending.',label:'Follow up to close the deal.',cta:'Log a follow-up'},
   Won:{reason:'Won — a customer & deal were created.',label:'Kick off the project for this customer.',cta:'Create project'},
   Lost:{reason:'Lost — archived for reference.',label:'Log the reason to sharpen future scoring.',cta:'Add lost reason'}};
  return m[l.st]||m.New;}
const SPARK='<path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4z" fill="currentColor" stroke="none"/>';
function ipRows(rows){return `<div class="ip-facts">${rows.map(r=>`<div class="ip-row"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`).join('')}</div>`;}
function ipMoreToggle(b){b.closest('.ip-more').classList.toggle('open');}
/* The lead inspector as a declarative cell spec (render + bind + props) — top-to-bottom by
   importance; low-value fields collapse. Add a section by pushing a cell, no markup edits. */
/* OJO's recommendations — derived honestly from the lead's own cell values (stage, value, source) */
const OI_ICONS={flame:'<path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3 .5 2 2 2 2 0 0-2-1-3 1-5z"/>',target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',next:'<path d="M5 12h14M13 6l6 6-6 6"/>'};
function leadInsights(l){const sc=(SCORE[l.st]||[40])[0];const out=[];
  out.push(['flame',sc<45?`<b>Going cold.</b> No activity logged in 14 days — a quick call could re-warm it.`:`<b>Engaged.</b> Activity is recent — keep momentum with a timely follow-up.`]);
  out.push(['target',`<b>${l.src} leads close ~2× more often</b> than average. Worth prioritising this one.`]);
  out.push(['cash',l.val<120000?`<b>Budget ${fmt(l.val)} is on the low side</b> for ${l.src} deals — room to upsell the Ad Creative add-on.`:`<b>Budget ${fmt(l.val)} is healthy</b> for a ${l.src} deal at this stage.`]);
  return out;}
/* shared building blocks — reused by the right panel (A/B) and the full board (C) */
function ojoInsightsCard(items,noun){return `<div class="ojo-card"><div class="ojo-card-h"><img class="ojo-mini" src="assets/ojo-logo.png" alt="OJO"> OJO Insights <span class="ojo-live">live</span></div>
  <div class="ojo-insights">${items.map(i=>`<div class="oi"><span class="oi-ic">${svg(OI_ICONS[i[0]]||OI_ICONS.target,15)}</span><span class="oi-t">${i[1]}</span></div>`).join('')}</div>
  <button class="ojo-ask" onclick="openSection('genie')">${svg(SPARK,13)} Ask OJO about this ${noun||'lead'}</button></div>`;}
function leadContacts(l){const first=(l.nm||'contact').split(' ')[0].toLowerCase();const org=l.co.toLowerCase().replace(/[^a-z]/g,'')||'co';
  return [[l.nm,'Primary contact',`${first}@${org}.com`,'#7C53E6',true],['Rohit Mehra','Finance · Decision maker',`rohit@${org}.com`,'#2F6FED',false]];}
function contactsListHTML(list,addLabel){const add=addLabel===null?'':`<button class="contact-add" onclick="toast('${addLabel||'Add a contact'}')">${svg('<path d="M12 5v14M5 12h14"/>',13)} ${addLabel||'Add a contact'}</button>`;
  return `<div class="contacts-list">${list.map(c2=>`<div class="contact-row"><span class="av" style="background:${c2[3]}">${(c2[0]||'?').split(' ').map(w=>w[0]).slice(0,2).join('')}</span>
  <div class="cr-id"><div class="nm">${c2[0]}${c2[4]?' <span class="primary-chip">Primary</span>':''}</div><div class="sub">${c2[1]}</div></div>
  <div class="cr-actions"><button onclick="openComm('call')" title="Call">${faceIcon('call')}</button><button onclick="openComm('email')" title="Email">${faceIcon('email')}</button><button onclick="openComm('chat')" title="Message">${faceIcon('chat')}</button></div></div>`).join('')}${add}</div>`;}
/* lead header card — score + OJO Insights promoted into the main body (same .proj-ai pattern as project & task).
   The next-best-action lives INSIDE the insights; acting on it happens in the Genie panel (Ask OJO). */
function leadTopInsights(l){const sc=SCORE[l.st]||[40,'Average'];const t=scoreColors(sc[0]);const ai=leadAI(l);
  const items=[['next',`<b>Next best action.</b> ${ai.label}`],...leadInsights(l)];
  return `<div class="proj-ai">
    <div class="pa-score"><div class="pa-ring">${ring(sc[0],t[0],72)}<span class="pa-pct" style="color:${t[1]}">${sc[0]}%</span></div><div class="pa-meta"><div class="pa-lbl" style="color:${t[1]}">${sc[1]}</div><div class="pa-sub">${ai.reason}</div></div></div>
    <div class="pa-ins">${ojoInsightsCard(items,'lead')}</div></div>`;}
/* the lead's recent history — lives in the hideable panel, derived from the lead cell */
function leadActivity(l){const items=[];
  if(leadClosed(l.st))items.push([l.st==='Won'?'#15A06A':'#8B93A1','done','Jun 8','Priya Nair','closed this lead as',l.st]);
  else if(l.st!=='New')items.push(['#E0A21E','msg','Jun 8','Priya Nair','moved this lead to',l.st]);
  rec.comments.slice(-2).forEach(()=>items.push(['#2F6FED','msg','today','Vinoth K','commented on',l.co]));
  items.push(['#7C53E6','msg','12 May','Priya Nair','logged a call with',l.nm||'the contact']);
  items.push(['#F04D56','msg','7 May','Priya Nair','created this lead from',l.src]);
  return actRowsHTML(items,`<div class="more"><span class="av">PN</span>Priya Nair active on this lead</div>`);}
function renderPanelCell(c){const p=c.props;
  if(c.render==='score'){const t=p.pct>=70?['var(--ok)','#0C6B47']:p.pct>=45?['var(--warn)','#8A5A14']:['var(--coral)','var(--coral-ink)'];
    return `<div class="ip-score"><div class="ip-gauge">${ring(p.pct,t[0],84)}<div class="pct" style="color:${t[1]}">${p.pct}%</div></div>
      <div class="ip-sc-meta"><div class="ip-sc-top"><span class="grade" style="color:${t[1]}">${p.label}</span><span class="ip-tag">${svg(SPARK,12)} ${p.tag||'OJO score'}</span></div><div class="ip-reason">${p.reason}</div></div></div>`;}
  if(c.render==='facts')return ipRows(p.rows);
  if(c.render==='insights')return ojoInsightsCard(p.items,p.askNoun);
  if(c.render==='contacts')return `<div class="ip-sec-h">${p.title||'Contacts'}</div>${contactsListHTML(p.list,p.add)}`;
  if(c.render==='more')return `<div class="ip-more"><button class="ip-more-h" onclick="ipMoreToggle(this)">More details ${svg('<path d="m6 9 6 6 6-6"/>',15)}</button><div class="ip-more-b">${ipRows(p.rows)}</div></div>`;
  return '';
}
function leadInfo(){return `<div class="ip"><div class="ip-actonly">${leadActivity(rec.ent)}</div></div>`;}
/* OJO read of a task — derived from status, priority, due, milestone */
function taskInsights(t){const out=[];
  out.push(['clock',t.st==='Done'?`<b>Completed.</b> This task is done — nice work.`:`<b>${t.pri} priority${t.due?` · due ${t.due}`:''}.</b> ${t.pri==='High'?'Tackle this next to avoid slipping the milestone.':'On track if picked up this week.'}`]);
  out.push(['target',`<b>Part of ${t.ms}.</b> Closing it moves the milestone forward.`]);
  out.push(['flame',`<b>Estimated ${t.est}.</b> ${t.pri==='High'?'Downstream tasks depend on this one.':'No blockers logged.'}`]);
  return out;}
/* task header card — score + OJO Insights promoted into the main body (same .proj-ai pattern as the project Overview) */
function taskTopInsights(t){const its=tasks.filter(x=>x.ms===t.ms);const done=its.filter(x=>x.st==='Done').length;const pct=its.length?Math.round(done/its.length*100):0;
  return `<div class="proj-ai">
    <div class="pa-score"><div class="pa-ring">${ring(pct,pct>=70?'var(--ok)':pct>=40?'var(--warn)':'var(--coral)',72)}<span class="pa-pct">${pct}%</span></div><div class="pa-meta"><div class="pa-lbl">${t.st}</div><div class="pa-sub">${t.ms} milestone · ${done}/${its.length} tasks done</div></div></div>
    <div class="pa-ins">${ojoInsightsCard(taskInsights(t),'task')}</div></div>`;}
/* the task's recent history — lives in the hideable panel (project pattern), derived from the task cell */
function taskActivity(t){const p=PEOPLE[t.asg];const items=[];
  if(t.st==='Done')items.push(['#15A06A','done',t.due||'',p?p[2]:'Someone','completed',t.t]);
  else if(t.st!=='Todo')items.push(['#E0A21E','msg','Jun 9',p?p[2]:'Someone','moved to '+t.st+':',t.t]);
  rec.comments.slice(-2).forEach(()=>items.push(['#2F6FED','msg','today','Vinoth K','commented on',t.t]));
  items.push(['#F04D56','msg','7 May','Priya Nair','created this task in',t.ms]);
  return actRowsHTML(items,`<div class="more"><span class="av">${p?p[0]:'PN'}</span>${p?p[2]:'Priya Nair'} active on this task</div>`);}
function taskInfo(){return `<div class="ip"><div class="ip-actonly">${taskActivity(rec.ent)}</div></div>`;}
/* static task data — Details tab, same .pd-grid pattern as the project Details */
function taskDetailsTab(){const t=rec.ent;const p=PEOPLE[t.asg];
  const about=[['Status',t.st],['Priority',t.pri],['Due',t.due||'—'],['Estimate',t.est],['Milestone',t.ms],['Created','7 May 2026']];
  const people=[['Assignee',(p?p[2]:'Unassigned')+pcommMini(p?p[2]:'')],['Created by','Priya Nair'+pcommMini('Priya Nair')]];
  const ctx=[['Project',PROJECT],['Blocked by','None'],['Attachments',String((t.attach||[]).length)]];
  const block=(h,rows)=>`<div class="pd-block"><div class="pd-h">${h}</div><div class="pd-grid">${rows.map(([k,v])=>`<div class="pd-cell"><div class="pd-k">${k}</div><div class="pd-v">${v}</div></div>`).join('')}</div></div>`;
  return `<div class="pdetails" style="padding:6px 0 30px">${block('About this task',about)}${block('People',people)}${block('Context',ctx)}</div>`;}

/* ---- shared record body (rows + subtasks + comments) ---- */
function renderRec(){const inner=document.getElementById('dinner');if(!inner)return;
  if(detailTab==='Overview')inner.innerHTML=(rec.type==='lead'?leadRecHTML():taskRecHTML());
  else if(detailTab==='Details')inner.innerHTML=rec.type==='lead'?renderDocs(rec.ent):taskDetailsTab();
  else if(detailTab==='Notes')inner.innerHTML=`<div class="rec-block" style="margin-top:6px"><div class="rec-block-h">Notes</div><div class="free notes-free" contenteditable="true" data-ph="Write a note about this ${rec.type}…"></div></div>`;
  else inner.innerHTML=`<div class="placeholder" style="margin-top:30px"><div class="pic">${svg(ICONS.List,28)}</div><h2>${detailTab}</h2><p>This view renders the same cell's data, arranged as ${detailTab}.</p></div>`;
  const ta=document.getElementById('cmt');if(ta){ta.addEventListener('input',()=>{ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';});ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();recComment();}});}}
function subsHTML(){return `<div class="subs">${rec.subs.map((s,i)=>`<div class="sub ${s.done?'done':''}"><button class="scheck" onclick="recSub(${i})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></button><span class="txt">${s.t}</span></div>`).join('')}<div class="subadd"><span class="scheck"></span><input placeholder="Add a new subtask" onkeydown="if(event.key==='Enter')recAddSub(this)"></div></div>`;}
function commentsHTML(noun){return `<div class="commentbar"><div id="comments">${rec.comments.map(c=>`<div class="comment"><span class="av">VK</span><div><div><b>Vinoth K</b><span class="tm">just now</span></div><div style="margin-top:3px">${c}</div></div></div>`).join('')}</div>
  <div class="cinput"><span class="av">VK</span><textarea id="cmt" placeholder="Add your comment…" rows="1"></textarea></div>
  <div class="notify"><div class="t">${rec.comments.length+1} people will be notified when someone comments on this ${noun}.</div>
    <div class="pills"><span class="pp">SV</span><button class="pill">${svg('<path d="M12 5v14M5 12h14"/>',14)}Add/remove people…</button><button class="pill">${svg('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',14)}Notify me</button></div></div></div>`;}
/* lead stages as a state machine; Won/Lost carry the "Closed" property */
function leadClosed(k){return k==='Won'||k==='Lost';}
function leadStepper(l){const order=LSTAGES.filter(s=>s.k!=='Lost');const idx=order.findIndex(s=>s.k===l.st);const pct=idx<=0?0:(idx/(order.length-1))*100;
  return `<div class="lstep-wrap"><button class="lstep-nav">${svg('<path d="M15 18l-6-6 6-6"/>',14)}</button>
   <div class="lstep"><div class="track"></div><div class="fill" style="width:${pct}%"></div>
   ${order.map((s,i)=>`<div class="lstp ${i<idx?'done':(i===idx?'cur':'')}" onclick="recMove('${s.k}')"><div class="nd"></div><div class="nm">${s.k}</div><div class="due">${leadClosed(s.k)?'Closed':'No due date'}</div></div>`).join('')}</div>
   <button class="lstep-nav">${svg('<path d="M9 6l6 6-6 6"/>',14)}</button></div>`;}
function leadGate(l){if(!leadClosed(l.st))return '';
  return `<div class="lgate win">${svg('<path d="M20 6 9 17l-5-5"/>',18)}<div><div class="t">This lead is ${l.st}.</div><div class="s">A Closed-property stage unlocked the outcome — a Customer + Deal were created.</div></div></div>`;}
function leadSugg(l){const sc=(SCORE[l.st]||[43,'High'])[0];return `<div class="lsugg"><div class="h">OJO Suggestion</div><h3>${l.st}</h3><ul>
   <li>${l.asg?PEOPLE[l.asg][2]+' is assigned as the owner — good to go.':'Assign a sales POC to this lead from the Client panel to get started.'}</li>
   <li>Service “Meta Ad Campaigns” is 10/14 fields complete — add Goal, Effort Hours and Target Audience to strengthen the proposal.</li>
   <li>Lead score is ${sc} — improve it by logging client activities, adding notes, and filling service details to show stronger engagement.</li></ul>
   <div class="lpri">${svg('<path d="M3 3v18h18M7 14l3-3 3 2 4-5"/>',14)} High priority</div></div>`;}
function scoreColors(pct){return pct>=70?['var(--ok)','#0C6B47']:pct>=45?['var(--warn)','#8A5A14']:['var(--coral)','var(--coral-ink)'];}
/* keep the body's Call/Email/Message buttons in sync with the open comm channel */
function syncCommActive(){const ch=(section&&section.indexOf('comm-')===0)?section.slice(5):null;document.querySelectorAll('.commbtn').forEach(b=>b.classList.toggle('on',b.dataset.f===ch));}
function stageAiCard(ai){return `<div class="stage-ai"><div class="sa-h">${svg(SPARK,13)} OJO · how to move this lead</div><div class="sa-b">${ai.label}</div><button class="sa-cta" onclick="toast('${ai.cta.replace(/'/g,"\\'")}')">${ai.cta} ${svg('<path d="M5 12h14M13 6l6 6-6 6"/>',14)}</button></div>`;}
function leadRecHTML(){const l=rec.ent;const own=l.asg?PEOPLE[l.asg]:null;
  const owner=own?`<span class="ip-owner"><span class="av" style="background:${own[1]}">${own[0]}</span>${own[2]}</span>`
    :`<button class="ip-assign" onclick="toast('Assign owner')">${svg('<path d="M12 5v14M5 12h14"/>',12)} Assign</button>`;
  return `
  <div class="lead-head">
    <div class="lh-id"><h1>${l.co}</h1>
      <div class="byline"><span class="av" style="background:${own?own[1]:'#F04D56'}">${own?own[0]:'PN'}</span> <b>${l.nm}</b> <span class="dotsep">·</span> contact <span class="dotsep">·</span> added by Priya Nair</div></div>
  </div>
  ${leadTopInsights(l)}
  <div class="sec"><div class="sec-h">Pipeline</div>
    ${leadStepper(l)}${leadGate(l)}
  </div>
  <div class="rec-desc">${l.co} is undertaking the ${l.nm} engagement to address a clear business need. The solution leverages OJO's delivery workflow to take this from brief to launch, with the deliverables, timeline and budget tracked as cells. Source: ${l.src}.</div>
  <div class="board-grid">
    <div class="sec"><div class="sec-h">About this deal</div>
      <div class="rec-meta">
        <div class="mrow"><span class="mk">Budget</span><span class="money">${fmt(l.val)}</span></div>
        <div class="mrow"><span class="mk">Source</span>${l.src}</div>
        <div class="mrow"><span class="mk">Owner</span>${owner}</div>
        <div class="mrow"><span class="mk">Service Type</span><span class="svc-chip2">Meta Ad Campaigns</span><span class="svc-chip2">Ad Creative</span></div>
        <div class="mrow"><span class="mk">Tags</span><button class="tag-add2" onclick="toast('Add tag')">${svg('<path d="M12 5v14M5 12h14"/>',12)} Add tag</button></div>
      </div>
    </div>
    <div class="sec">${contactsListHTML(leadContacts(l),null)}</div>
  </div>
  <div class="ip-more"><button class="ip-more-h" onclick="ipMoreToggle(this)">More information ${svg('<path d="m6 9 6 6 6-6"/>',15)}</button><div class="ip-more-b">${ipRows([['Organisation',l.co],['Role','—'],['Department','—'],['Address','Bengaluru'],['Added by','Vinoth V V'],['Created','07 May 2026']])}</div></div>
  ${commentsHTML('lead')}`;}
function taskRecHTML(){const t=rec.ent;if(!t.accept)t.accept=[];if(!t.proof)t.proof=[];
  const done=t.st==='Done',pct=trkPct();
  const I={plus:'<path d="M12 5v14M5 12h14"/>',clip:'<path d="m21 8-9.5 9.5a4 4 0 0 1-5.7-5.7L14 4a2.6 2.6 0 0 1 3.7 3.7L9.2 16.2"/>',up:'<path d="M12 15V3M7 8l5-5 5 5M5 21h14"/>',link:'<path d="M10 13a4 4 0 0 0 6 0l3-3a4 4 0 1 0-6-6l-1 1M14 11a4 4 0 0 0-6 0l-3 3a4 4 0 1 0 6 6l1-1"/>',file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',star:'<path d="M12 3l2 5.5L20 9l-4.5 3.7L17 19l-5-3.2L7 19l1.5-6.3L4 9l6-.5z"/>',reload:'<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',play:'<path d="M6 4l14 8-14 8z"/>',check:'<path d="M20 6 9 17l-5-5"/>',chev:'<path d="m6 9 6 6 6-6"/>'};
  const PCH={person:'<path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M4 21a8 8 0 0 1 16 0"/>',playc:'<circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3z"/>',bars:'<path d="M3 21h18M7 21V11M12 21V5M17 21v-8"/>',clk:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'};
  return `<h1>${t.t}</h1><div class="byline"><span class="av" style="background:${PEOPLE[t.asg][1]}">${PEOPLE[t.asg][0]}</span> in <b>${PROJECT}</b> · ${t.ms}</div>
  <div class="propchips">
    <span class="pchip">${svg(PCH.person,14)} ${PEOPLE[t.asg][2]}</span>
    <label class="pchip sel" title="Move along to…">${svg(PCH.playc,14)}<select onchange="recMove(this.value)">${STATUSES.map(s=>`<option ${s.k===t.st?'selected':''}>${s.k}</option>`).join('')}</select>${svg(SVS.caret,11)}</label>
    <span class="pchip">${svg(PCH.bars,14)} ${t.pri}</span>
    <span class="pchip">${svg(PCH.clk,14)} ${t.due?'Due '+t.due:'No due date'}</span>
    <span class="pchip">${svg(PCH.clk,14)} ${t.est} planned</span>
  </div>
  ${taskTopInsights(t)}
  <div class="trk ${trkRunning?'on':''}" id="trkCard">
    <div><div class="spent" id="trkSpent">${fmtHMS(trkSec)}</div><div class="lbl">Time spent</div></div>
    <div class="mid"><div class="plan">${t.est} <span class="lbl" style="display:inline;font-weight:600">planned</span></div><div class="track"><div id="trkBar" style="width:${pct}%"></div></div><div class="lbl" id="trkPct">${pct}% planned time elapsed</div></div>
    <button class="go" id="trkBtn" onclick="trkToggle()">${trkBtnHTML()}</button>
  </div>
  <div class="tsec"><div class="tsec-h">Description</div>
    <div class="free" contenteditable="true" data-ph="Add a description…" oninput="rec.ent.desc=this.innerHTML">${t.desc||''}</div>
    <div class="attach-row">${(t.attach||[]).map(a=>`<span class="attach-chip"><span class="ic">${svg(I.file,15)}</span>${a}</span>`).join('')}<button class="attach-chip add" onclick="addAttach()">${svg(I.clip,15)} Attach file</button></div>
  </div>
  <div class="tsec"><div class="tsec-h">Checklist <span class="add" onclick="focusSubAdd()">${svg(I.plus,13)} Add</span></div>${subsHTML()}</div>
  <div class="tsec acc" id="accSec"><div class="tsec-h acc-head" onclick="toggleAcc()">Acceptance &amp; Review <span class="chev">${svg(I.chev,16)}</span></div>
    <div class="acc-body">
      <div class="tsec-h acc-sub">Acceptance Criteria <span class="add" onclick="addCriterion()">${svg(I.plus,13)} Add</span></div>
      ${t.accept.length?t.accept.map((c,i)=>`<div class="acrit"><span class="n">${i+1}</span><span class="txt">${c}</span></div>`).join(''):'<div class="empty">No acceptance criteria defined.</div>'}
      <div class="tsec-h acc-sub" style="margin-top:16px">Proof of work <span class="powbtns"><button class="powbtn" onclick="addProof('file')">${svg(I.up,14)} Upload</button><button class="powbtn" onclick="addProof('link')">${svg(I.link,14)} Add Link</button></span></div>
      ${t.proof.length?`<div>${t.proof.map(p=>`<span class="proof-chip">${svg(p.type==='link'?I.link:I.file,14)} ${p.name}</span>`).join('')}</div>`:`<div class="dropz">No files or links added yet. Upload a file or add a link to get started.<br><span style="font-size:11px">Any file type — max 50MB per file</span></div>`}
      <div class="ojorev" style="margin-top:16px"><div class="ic">${svg(I.star,16)}</div><div><div class="oh">OJO Review</div><div class="ot">QC's your output against the acceptance criteria.</div></div><button class="reload" style="margin-left:auto" onclick="ojoReview()" title="Run OJO Review">${svg(I.reload,16)}</button></div>
    </div>
  </div>
  <div class="tsec-h" style="margin:18px 0 0">Comments &amp; Notes</div>${commentsHTML('task')}
  <div class="taskbar"><button class="tmr" onclick="trkToggle()">${svg(I.play,15)}<span id="tbTime">${fmtHMS(trkSec)}</span></button><button class="done ${done?'is-done':''}" onclick="markComplete()">${svg(I.check,15)} ${done?'Completed':'Mark Complete'}</button></div>`;}
function recMove(v){rec.ent.st=v;renderRec();if(recMode==='detail')renderDetailInfo();if(document.getElementById('work'))renderWork();toast('Moved to '+v);}
function recSub(i){rec.subs[i].done=!rec.subs[i].done;renderRec();}
function recAddSub(inp){if(!inp.value.trim())return;rec.subs.push({t:inp.value.trim(),done:false});renderRec();setTimeout(()=>{const a=document.querySelectorAll('.subadd input');a[a.length-1]?.focus();},0);}
function recComment(){const ta=document.getElementById('cmt');const v=ta.value.trim();if(!v)return;rec.comments.push(v);renderRec();toast('Comment added');}
/* ---- task detail: time tracking + acceptance/review capabilities ---- */
let trkSec=0,trkRunning=false,trkInt=null;
function fmtHMS(s){return `${Math.floor(s/3600)}h ${Math.floor(s%3600/60)}m ${s%60}s`;}
function planSec(){const t=rec&&rec.ent;const m=t&&String(t.est||'').match(/(\d+)/);return m?parseInt(m[1])*3600:0;}
function trkPct(){const p=planSec();return p?Math.min(100,Math.round(trkSec/p*100)):0;}
function trkBtnHTML(){return trkRunning?svg('<rect x="6" y="5" width="3.5" height="14" rx="1"/><rect x="14.5" y="5" width="3.5" height="14" rx="1"/>',15)+' Pause':svg('<path d="M6 4l14 8-14 8z"/>',15)+' Start tracking';}
function trkToggle(){trkRunning=!trkRunning;if(trkRunning){trkInt=setInterval(trkTick,1000);}else if(trkInt){clearInterval(trkInt);trkInt=null;}const c=document.getElementById('trkCard');if(c)c.classList.toggle('on',trkRunning);const b=document.getElementById('trkBtn');if(b)b.innerHTML=trkBtnHTML();}
function trkTick(){trkSec++;const a=document.getElementById('trkSpent');if(a)a.textContent=fmtHMS(trkSec);const bar=document.getElementById('trkBar');if(bar)bar.style.width=trkPct()+'%';const p=document.getElementById('trkPct');if(p)p.textContent=trkPct()+'% planned time elapsed';const tb=document.getElementById('tbTime');if(tb)tb.textContent=fmtHMS(trkSec);}
function trkStop(){trkRunning=false;if(trkInt){clearInterval(trkInt);trkInt=null;}}
function trkReset(){trkStop();trkSec=0;}
function markComplete(){if(!rec)return;rec.ent.st='Done';trkStop();renderRec();if(recMode==='detail')renderDetailInfo();if(document.getElementById('work'))renderWork();toast('✅ Task marked complete');}
function toggleAcc(){const s=document.getElementById('accSec');if(s)s.classList.toggle('closed');}
function addCriterion(){const v=prompt('Add an acceptance criterion');if(v&&v.trim()){rec.ent.accept.push(v.trim());renderRec();toast('Criterion added');}}
function addProof(type){rec.ent.proof.push({type,name:type==='link'?'proof-link.com/'+(rec.ent.proof.length+1):'proof-'+(rec.ent.proof.length+1)+'.pdf'});renderRec();toast(type==='link'?'Link added':'File uploaded (demo)');}
function addAttach(){if(!rec.ent.attach)rec.ent.attach=[];rec.ent.attach.push('attachment-'+(rec.ent.attach.length+1)+'.pdf');renderRec();toast('File attached (demo)');}
function ojoReview(){if(!rec.ent.accept.length){toast('Add acceptance criteria first');return;}if(!rec.ent.proof.length){toast('Add proof of work to review');return;}toast('⚡ OJO is QC-ing your output against the criteria…');}
function focusSubAdd(){const a=document.querySelectorAll('.subadd input');a[a.length-1]?.focus();}

/* ============ LEAD DETAILS TAB — BRO → SLA → Invoice as Notion-style cell-documents ============ */
function makeDocs(l){const co=l.co;return {cur:'SLA',open:true,
  pipe:[{k:'BRO',label:'BRO',sub:'Complete',pct:100},{k:'SLA',label:'SLA',sub:'Generated',pct:100},{k:'Invoice',label:'Invoice',sub:'Paid',pct:100}],
  blocks:{
   BRO:[{t:'h1',x:'Business Requirement Overview — '+co},{t:'text',x:'Prepared on: 2026-05-01'},{t:'h2',x:'1. Objective'},{t:'text',x:co+' needs a marketing engagement to build awareness and drive conversions across the pre- and post-launch windows.'},{t:'h2',x:'2. Requirements'},{t:'list',items:['Branding & creative direction','Paid social campaign setup','Weekly performance reporting']},{t:'metric',label:'Estimated Budget',value:fmt(l.val)}],
   SLA:[{t:'h1',x:'Proposal for Movie Marketing Services'},{t:'text',x:'Prepared on: 2026-05-01'},{t:'h2',x:'1. Executive Summary'},{t:'text',x:'This proposal outlines a comprehensive marketing strategy for '+co+" over a duration of 1 month, with a total budget of "+fmt(l.val)+'. The project covers branding and digital marketing across the pre-release and post-release phases.'},{t:'h2',x:'2. Scope of Work'},{t:'h3',x:'2.1 Service 1: Branding'},{t:'list',items:['Budget: ₹3,00,000','Duration: 1 month','Objective: Build awareness and drive theatre attendance across release windows.']},{t:'h3',x:'2.2 Service 2: Digital Marketing'},{t:'list',items:['Budget: ₹80,000','Duration: 1 month','Objective: Drive ticket sales via paid social and search.']}],
   Invoice:[{t:'h1',x:'Invoice — '+co},{t:'text',x:'Invoice #INV-2041 · Paid on 2026-05-12'},{t:'h2',x:'Line items'},{t:'list',items:['Branding — ₹3,00,000','Digital Marketing — ₹80,000']},{t:'metric',label:'Total',value:fmt(l.val)}]
  }};}
const DOCNAME={BRO:'Business Requirement Overview',SLA:'Service Level Agreement',Invoice:'Invoice'};
const DOCICON={BRO:'<path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',SLA:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/>',Invoice:'<path d="M12 2v20M7 6h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h8"/>'};
function curDoc(){return rec.ent.docs;}
function renderDocs(l){if(!l.docs)l.docs=makeDocs(l);const d=l.docs;
  return `<div class="docpipe">${d.pipe.map(p=>`<div class="docchip ${p.k===d.cur?'on':''}" onclick="docSelect('${p.k}')"><div class="dci">${svg(DOCICON[p.k],18)}</div><div style="flex:1"><div class="dcn">${p.k}</div><div class="dcs">${p.sub}</div></div><div class="dcr" style="color:${p.pct===100?'var(--ok)':'var(--warn)'}">${p.pct}%</div></div>`).join('')}</div>
   <div class="doc"><div class="doc-head" onclick="docToggle()"><span class="dhi">${svg(DOCICON[d.cur],18)}</span><span class="dhn">${DOCNAME[d.cur]}</span><span class="dcs" style="margin-left:6px">${d.pipe.find(p=>p.k===d.cur).sub}</span><span class="dhm">${svg('<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',16)}</span></div>
     ${d.open?`<div class="doc-body" id="docBody">${docBlocksHTML(d)}</div>`:''}</div>
   ${docBar(d)}`;}
function docBlocksHTML(d){const arr=d.blocks[d.cur];return arr.map((b,i)=>docBlockHTML(b,i)).join('')+`<div class="dadd" onclick="docAddOpen(event,${arr.length})">${svg('<path d="M12 5v14M5 12h14"/>',15)} Add a block, or press <b style="font-weight:700;margin:0 2px">/</b> for blocks</div>`;}
function docGut(i){return `<span class="dgut"><button title="Add" onclick="event.stopPropagation();docAddOpen(event,${i+1})">${svg('<path d="M12 5v14M5 12h14"/>',13)}</button><button title="Remove" onclick="event.stopPropagation();docRemove(${i})">${svg('<path d="M18 6 6 18M6 6l12 12"/>',12)}</button></span>`;}
function docBlockHTML(b,i){const g=docGut(i);
  if(b.t==='h1')return `<div class="dblock">${g}<div class="dh1" contenteditable="true" onblur="docSave(${i},this.textContent)">${b.x}</div></div>`;
  if(b.t==='h2')return `<div class="dblock">${g}<div class="dh2" contenteditable="true" onblur="docSave(${i},this.textContent)">${b.x}</div></div>`;
  if(b.t==='h3')return `<div class="dblock">${g}<div class="dh3" contenteditable="true" onblur="docSave(${i},this.textContent)">${b.x}</div></div>`;
  if(b.t==='text')return `<div class="dblock">${g}<div class="dtext" contenteditable="true" onblur="docSave(${i},this.textContent)">${b.x}</div></div>`;
  if(b.t==='divider')return `<div class="dblock">${g}<div class="ddiv"></div></div>`;
  if(b.t==='metric')return `<div class="dblock">${g}<div class="dmoney"><div class="amt" contenteditable="true" onblur="docSaveK(${i},'value',this.textContent)">${b.value}</div><div class="lbl" contenteditable="true" onblur="docSaveK(${i},'label',this.textContent)">${b.label}</div></div></div>`;
  if(b.t==='list')return `<div class="dblock">${g}<div class="dlist">${b.items.map((it,j)=>`<div class="dli"><span class="b"></span><span class="t" contenteditable="true" onblur="docListSave(${i},${j},this.textContent)">${it}</span></div>`).join('')}<div class="dli-add" onclick="docListAdd(${i})">+ Add item</div></div></div>`;
  return '';}
function docBar(d){const prim=d.cur==='BRO'?['Convert to SLA',"docConvert('SLA')"]:d.cur==='SLA'?['View Invoice',"docSelect('Invoice')"]:['Download Invoice',"toast('Downloaded')"];
  return `<div class="docbar"><button class="ab" title="Edit">${svg('<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',16)}</button><button class="ab" title="Download" onclick="toast('Downloaded')">${svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',16)}</button><button class="ab" title="Share">${svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',16)}</button><button class="ab" title="Comment">${svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',16)}</button><span class="sep"></span><button class="abtn ghost" onclick="toast('Shared')">Share ${svg('<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',13)}</button><button class="abtn dark" onclick="${prim[1]}">${prim[0]} ${svg('<path d="M5 12h14M13 6l6 6-6 6"/>',13)}</button></div>`;}
function docSelect(k){curDoc().cur=k;renderRec();}
function docToggle(){curDoc().open=!curDoc().open;renderRec();}
function docSave(i,v){curDoc().blocks[curDoc().cur][i].x=v;}
function docSaveK(i,key,v){curDoc().blocks[curDoc().cur][i][key]=v;}
function docListSave(i,j,v){curDoc().blocks[curDoc().cur][i].items[j]=v;}
function docListAdd(i){curDoc().blocks[curDoc().cur][i].items.push('New item');renderRec();}
function docRemove(i){curDoc().blocks[curDoc().cur].splice(i,1);renderRec();}
function docConvert(k){const p=curDoc().pipe.find(x=>x.k===k);if(p){p.pct=100;p.sub='Generated';}curDoc().cur=k;renderRec();toast(k+' generated');}
let docAddPos=0;
function docAddOpen(e,pos){e.stopPropagation();docAddPos=pos;const m=document.getElementById('docpal');
  const types=[['h2','Heading','M4 7V5h16v2M9 19h6M12 5v14'],['text','Text','M4 6h16M4 12h16M4 18h10'],['list','Bulleted list','M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01'],['metric','Money','M12 2v20M7 6h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h8'],['divider','Divider','M3 12h18']];
  m.innerHTML='<div class="h">Basic blocks</div>'+types.map(t=>`<button class="pi" onclick="docPick('${t[0]}')"><span class="ic">${svg('<path d="'+t[2]+'"/>',15)}</span>${t[1]}</button>`).join('');
  const r=e.currentTarget.getBoundingClientRect();m.style.top=Math.min(r.bottom+6,window.innerHeight-300)+'px';m.style.left=Math.max(12,Math.min(r.left,window.innerWidth-256))+'px';openPop('docpal');}
function docPick(t){const nb=t==='list'?{t:'list',items:['New item']}:t==='metric'?{t:'metric',label:'Amount',value:'₹0'}:t==='divider'?{t:'divider'}:{t,x:t==='text'?'Type something…':'New heading'};curDoc().blocks[curDoc().cur].splice(docAddPos,0,nb);closePops();renderRec();}

/* ============ GLOBAL RIGHT UTILITY RAIL (Genie / Notifications / Messages / Search / Account) ============ */
let section=null, flyW=400;
const TAB_WIDE=540; /* panel width past which the comm tabs reveal their labels (Claude-desktop style) */
/* the top comm/Genie pill (#tbOjo) glides with the panel so they stay one aligned family,
   and the tabs open their names once the panel is dragged wide enough */
function flySize(px){const f=document.getElementById('flyout');if(!f)return;f.style.flexBasis=px+'px';f.style.width=px+'px';
  document.documentElement.style.setProperty('--flyw',px+'px');
  const o=document.getElementById('tbOjo');
  if(o&&shellMode!=='merged'){if(px>0){o.style.width=px+'px';o.style.flexBasis=px+'px';}else{o.style.width='';o.style.flexBasis='';}}
  const t=document.getElementById('panelTabs');if(t)t.classList.toggle('wide',px>=TAB_WIDE);}
/* drag-to-resize the push panel */
(function(){let rz=false;
  const noTrans=on=>{['flyout','tbOjo'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.transition=on?'none':'';});};
  document.addEventListener('mousedown',e=>{if(e.target&&e.target.id==='flyResize'){rz=true;document.body.style.userSelect='none';noTrans(true);e.preventDefault();}});
  document.addEventListener('mousemove',e=>{if(!rz)return;flyW=Math.min(680,Math.max(300,(window.innerWidth-74)-e.clientX));flySize(flyW);});
  document.addEventListener('mouseup',()=>{if(rz){rz=false;document.body.style.userSelect='';noTrans(false);}});
})();
/* ---- floating dock → section flyout (Ojo Genie / Notifications / Chat / Search / Profile) ---- */
const SECT={
  genie:{title:'Ask Ojo Genie',body:genieBody},
  notif:{title:'Notifications',extra:`<span class="lnk" onclick="markAllRead()">${svg('<path d="m1 13 4 4 7-8"/><path d="m9 13 3 3 9-10"/>',15)} Mark all read</span>`,body:notifBody},
  chat:{title:'Messages',extra:`<button class="ib" onclick="toast('New message')"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button>`,body:msgBody},
  search:{title:'Search',body:searchBody},
  profile:{title:'Profile',body:accountBody}
};
function panelTabsClear(){document.querySelectorAll('.paneltabs .di, .dock .di').forEach(b=>b.classList.remove('on'));}
function openSection(s){section=s; /* persistent context window — re-clicking a tab never collapses it */
  panelTabsClear();
  document.querySelectorAll('#dockComm .dcf').forEach(b=>b.classList.remove('on'));
  document.getElementById('d-'+s)?.classList.add('on');
  const fly=document.getElementById('flyout');fly.classList.toggle('genie',s==='genie');
  const c=SECT[s];document.getElementById('flyTitle').textContent=c.title;
  document.getElementById('flyExtra').innerHTML=c.extra||'';
  const body=document.getElementById('flyBody');body.className='fly-body'+(s==='genie'?' genie':'');
  body.innerHTML=c.body();
  document.body.classList.remove('panel-collapsed');
  flySize(flyW);document.getElementById('rdock')?.classList.add('open');fly.classList.add('show');closeApps();mScrim(true);mbarActive(s);renderPanelTabs();}
/* contextual communication (call / video / email) — a tab in the single panel; shows the active record's content or a generic empty state */
function commBody(f){return commHost?commHost.content(f):commChannel(f,'');}
function openComm(f){const sid='comm-'+f;section=sid; /* persistent — re-clicking a comm tab never collapses */
  panelTabsClear();
  document.getElementById('d-'+f)?.classList.add('on');
  const fly=document.getElementById('flyout');fly.classList.remove('genie');
  const cn=commContextName();
  document.getElementById('flyTitle').textContent=(COMMFACE_LABEL[f]||'')+(cn?' · '+cn:'');
  document.getElementById('flyExtra').innerHTML='';
  const body=document.getElementById('flyBody');body.className='fly-body';body.innerHTML=commBody(f);
  document.body.classList.remove('panel-collapsed');
  flySize(flyW);document.getElementById('rdock')?.classList.add('open');fly.classList.add('show');closeApps();mScrim(true);mbarActive(null);syncCommActive();}
function closeSection(){section=null;const fly=document.getElementById('flyout');fly.classList.remove('show');document.getElementById('rdock')?.classList.remove('open');flySize(0);panelTabsClear();document.body.classList.add('panel-collapsed');mScrim(false);mbarActive(null);syncCommActive();}
function closeDrawer(){closeSection();}
/* collapse the whole single sheet to reclaim the workspace; reopen via the floating Genie button */
function collapsePanel(){closeSection();}
function reopenPanel(){openSection('genie');}
/* the active topbar pill is the open/close anchor: tap to open, tap again to put it away */
function genieToggle(){const f=document.getElementById('flyout');
  if(section==='genie'&&f&&f.classList.contains('show'))collapsePanel();else openSection('genie');
  renderPanelTabs();}

/* ===== MOBILE shell: bottom tab bar + bottom sheets (Apps launcher, Ask Ojo, comms) ===== */
function mScrim(on){const s=document.getElementById('mscrim');if(!s)return;
  const mobile=window.matchMedia('(max-width:700px)').matches;
  s.classList.toggle('show',!!on&&mobile&&(document.querySelector('.flyout.show')||document.querySelector('.msheet.show')));}
function mbarActive(key){document.querySelectorAll('#mbar .mb').forEach(b=>b.classList.toggle('on',b.dataset.k===key));}
function mTab(kind){if(kind==='home'){mCloseAll();go('home');mbarActive('home');return;}openSection(kind);}
function openApps(){closeSection();document.getElementById('appsSheet')?.classList.add('show');mScrim(true);mbarActive('apps');}
function closeApps(){document.getElementById('appsSheet')?.classList.remove('show');mScrim(false);}
function mApp(route){closeApps();mbarActive('apps');go(route);}
function mCloseAll(){closeApps();closeSection();closeCommSheet();if(typeof closePeek==='function')closePeek();const s=document.getElementById('mscrim');if(s)s.classList.remove('show');}

/* OJO's dynamic hint — a single contextual suggestion + CTA, shown at the BOTTOM of the Genie panel */
function homeGeniePlan(){if(typeof homeStats!=='function')return '';const st=homeStats();
  const todayN=TASKS.filter(t=>t.status!=='Done'&&homeDay(t)===11).length;
  const qw=TASKS.filter(t=>t.status!=='Done'&&['15m','20m','30m'].includes(t.est)).length;
  return `<div class="g-plan"><div class="g-plan-h">${svg(SPARK,12)} OJO suggests<span class="ojs-live">live</span></div>
    <div class="g-plan-x"><b>${st.over} overdue, ${todayN} today.</b> Clear the ${qw} quick wins first, then a focus block.</div>
    <button class="g-plan-cta" onclick="tFocusMode()">${svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',14)} Start focus block</button></div>`;}
/* Comm faces inside the Genie surface: the topbar cluster is the switcher. genieFace=null → chat. */
function genieSel(f){
  genieFace=f;
  const fly=document.getElementById('flyout');
  if(section==='genie'&&fly&&fly.classList.contains('show')){const b=document.getElementById('flyBody');if(b)b.innerHTML=genieBody();}
  else openSection('genie');
  renderPanelTabs();
}
function genieHome(){genieFace=null;openSection('genie');}
function genieBody(){const ctx=genieContext();const ask=s=>s.replace(/'/g,"\\'");
  if(genieFace){const cn=commContextName();
    return `<div class="gwrap"><div class="gmsgs" id="gmsgs">${ghActs()}<div class="gswap"><div class="genie-hi mini">${cn||'Workspace'}<div class="gctx">${GFACE_LBL[genieFace]}${cn?' with this record':' across OJO'}</div></div><div class="gcomm">${genieFace==='chat'&&!commHost?msgBody():commBody(genieFace)}</div></div></div></div>`;}
  return `<div class="gwrap"><div class="gmsgs" id="gmsgs">${ghActs()}<div class="gswap"><div class="genie-hi">Hello, Vinoth<div class="gctx">${ctx.who?`Ask me anything about <b>${ctx.who}</b>`:'How can I help you today?'}</div></div></div></div>
  <div class="gfoot">${curRoute==='home'?homeGeniePlan():''}<div class="gsugg">
    ${ctx.suggestions.map(s=>`<button onclick="genieAsk('${ask(s)}')">${s}</button>`).join('')}</div>
   <div class="gask"><input id="gIn" placeholder="Ask Ojo anything..." onkeydown="if(event.key==='Enter')genieAsk(this.value)">
     <span class="gic">${svg('<path d="M21.4 11.05 12.05 20.4a5 5 0 0 1-7.07-7.07l9.19-9.19a3 3 0 0 1 4.24 4.24l-9.2 9.19a1 1 0 0 1-1.41-1.41l8.49-8.49"/>',17)}</span>
     <span class="gic">${svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',17)}</span>
     <button class="ggo" onclick="genieAsk(document.getElementById('gIn').value)">${svg('<path d="M12 19V5M5 12l7-7 7 7"/>',16)}</button></div>
   <div class="gnote">Ojo Genie can make mistakes. Verify important information before acting on it.</div></div></div>`;}
function genieAsk(q){if(!q||!q.trim())return;const m=document.getElementById('gmsgs');if(!m)return;m.querySelector('.genie-hi')?.remove();
  const ans={'Show My Leads':'You have 11 leads — 2 in Proposal, 2 Qualified, 1 Won. Want me to open the board?','Today\'s calls':'No calls scheduled today. Nova Dental is overdue for a follow-up.','Prioritize tasks for first half':'Top 3 by due date: Wireframes (10 Jun), API integration (2 Jul), QA & testing (15 Jul).'}[q.trim()]||('Here\'s what I found for “'+q.trim()+'”.');
  m.insertAdjacentHTML('beforeend',`<div class="gq">${q.trim()}</div><div class="ga">${ans}</div>`);document.getElementById('gIn').value='';m.scrollTop=m.scrollHeight;}

function nIcon(t){const m={bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',people:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6"/>',check:'<circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',person:'<circle cx="12" cy="8" r="3.2"/><path d="M5 20a7 7 0 0 1 14 0"/>'};return svg(m[t]||m.bell,17);}
function notifBody(){const N=[['bell','New Message','You have a new message','8 hours ago',1],['people','Employee Updated','Employee information has been updated','14 hours ago',1],['check','Comment Resolved','Vinotham resolved a comment on BRO: “i will…”','1 day ago',1],['clock','Checked In','You checked in at 10:42 AM','4 days ago',0],['brief','Project Created Successfully','Your project is ready for review.','5 days ago',0],['brief','Project Generation In Progress','Generating project: 35% complete','5 days ago',0],['doc','Requirements Generated','Requirements have been generated for a lead','5 days ago',0],['person','Lead Updated','Lead has been updated','5 days ago',0]];
  return `<div class="notif-ai">${svg(SPARK,12)} OJO can turn any update into a task — just hit <b>+ Task</b>.</div>`+N.map(n=>`<div class="nrow ${n[4]?'unread':''}"><div class="nic">${nIcon(n[0])}</div><div style="flex:1;min-width:0"><div class="nt">${n[1]}</div><div class="ns">${n[2]}</div><div class="nm">${n[3]}</div></div><button class="nrow-task" onclick="notifTask(event,'${n[1].replace(/'/g,"")}')" title="Add as task">${svg('<path d="M12 5v14M5 12h14"/>',13)} Task</button>${n[4]?'<span class="ndot"></span>':''}</div>`).join('')+`<div class="nfoot">Showing ${N.length} of ${N.length}</div>`;}
function markAllRead(){document.querySelectorAll('#flyBody .nrow').forEach(r=>{r.classList.remove('unread');r.querySelector('.ndot')?.remove();});document.querySelector('#u-notif .ubadge')?.remove();toast('All marked read');}

function msgBody(){const F=['All','Unread','DMs','Groups','Leads','Projects','Vendors','Clients'];
  const C=[['AB','#7C53E6','Apparel Brand Launch','lead','10:59 AM','hi'],['AM','#E08A1E','Amanuay','dm','Tue','ojo-meet://join/81715855-b0bb-498…'],['MM','#7C53E6','move marketing — Brand','vendor','12 May','what about marketing.'],['RE','#2F6FED','Real estate Performance','vendor','04 May','jhfhj'],['PA','#15A06A','Palpxvinoth','dm','03 May','cool'],['RF','#7C53E6','requirement for fuel app','lead','01 May','whatsup? are we doing this today?'],['LG','#7C53E6','legal req to trade mark','lead','28 Apr','whatsup']];
  return `<div class="msrch">${svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',15)} Search conversations…</div>
   <div class="mfilters">${F.map((f,i)=>`<span class="mchip ${i===0?'on':''}">${f}</span>`).join('')}</div>
   ${C.map(c=>`<div class="mrow" onclick="toast('Open chat: ${c[2]}')"><div class="mav" style="background:${c[1]}">${c[0]}</div><div class="mcell"><div class="mname"><span class="nm2">${c[2]}</span><span class="mtag ${c[3]}">${c[3]==='dm'?'DM':c[3]==='vendor'?'Vendor':'Lead'}</span><span class="mtime">${c[4]}</span></div><div class="msnip">${c[5]}</div></div></div>`).join('')}`;}

function searchBody(){const R=[['Life Designer','Lead · Proposal'],['Apollo — Website Revamp','Project'],['Wireframes','Task · Design'],['Sunrise Pharma','Lead · Won']];
  return `<div class="ssrch">${svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',16)}<input placeholder="Search leads, projects, tasks…"></div><div class="slabel">Recent</div>${R.map(r=>`<div class="srow" onclick="toast('Open: ${r[0]}')"><div class="si">${svg(ICONS.List,15)}</div><div><div class="st">${r[0]}</div><div class="sk">${r[1]}</div></div></div>`).join('')}`;}

function accountBody(){const W=[['R','#C92F3A','Reliance','13 members · Org Admin',1],['OD','#E08A1E','Ojo Dojo','24 members · Product Team',0],['LD','#2F6FED','Life Designer Pvt Ltd','22 members · Sales Admin',0],['AM','#7C53E6','Amul','8 members · Development',0]];
  return `<div class="acctwrap"><div class="idcard idcard-link" onclick="closePops();go('profile')" title="Open profile"><div class="lab">Your identity</div><div class="idrow"><div class="iav">VV</div><div style="flex:1"><div class="inm">Vinoth V V <span class="rolechip">Org Admin</span></div><div class="iem">vinotham@gmail.com</div></div><span class="idcard-go">${svg('<path d="m9 18 6-6-6-6"/>',16)}</span></div></div>
   <div class="wslabel">Connected workspaces</div>${W.map(w=>`<div class="wsrow ${w[4]?'on':''}" onclick="toast('Switch to ${w[2]}')"><div class="wsi" style="background:${w[1]}">${w[0]}</div><div style="flex:1"><div class="wsn">${w[2]}</div><div class="wsm">${w[3]}</div></div>${w[4]?`<span class="wschk">${svg('<path d="M20 6 9 17l-5-5"/>',16)}</span>`:''}</div>`).join('')}
   <div class="wslabel" style="cursor:pointer" onclick="toast('Add profile')">＋ Add profile</div>
   <div class="themerow"><span class="tlab">Appearance</span><span class="seg themeseg"><button data-t="light" class="${curTheme()==='light'?'on':''}" onclick="setTheme('light')">Light</button><button data-t="dark" class="${curTheme()==='dark'?'on':''}" onclick="setTheme('dark')">Dark</button></span></div>
   <div class="themerow"><span class="tlab">Layout</span><span class="seg shellseg"><button data-s="connected" class="${shellMode==='connected'?'on':''}" onclick="setShell('connected')">Connected</button><button data-s="carded" class="${shellMode==='carded'?'on':''}" onclick="setShell('carded')">Carded</button><button data-s="hybrid" class="${shellMode==='hybrid'?'on':''}" onclick="setShell('hybrid')">Hybrid</button></span></div>
   <div class="acctfoot"><button onclick="toast('Settings')">${svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',15)} Settings</button><button onclick="toast('Signed out')">Sign out</button></div></div>`;}

/* ============ HR MODULE (cell-style database + pages) ============ */
const EMP=[
 {code:'REL0006',name:'Test new',role:'Employee',dept:'design',mgr:'—',created:'15 May 2026',status:'Onboarding',av:'TN',color:'#64748B',phone:'8825562185',email:'vinoth+testnew@palpx.com',join:'15 May 2026'},
 {code:'REL0005',name:'Chetan',role:'Employee',dept:'—',mgr:'—',created:'05 May 2026',status:'Invitation Sent',av:'C',color:'#E08A1E',phone:'—',email:'chetan@reliance.co',join:'05 May 2026'},
 {code:'REL0003',name:'Nidhuna',role:'Finance Admin',dept:'design',mgr:'—',created:'08 Mar 2026',status:'Active',av:'N',color:'#7C53E6',phone:'—',email:'nidhuna@reliance.co',join:'08 Mar 2026'},
 {code:'REL0004',name:'Palpxvinoth',role:'Org Admin',dept:'—',mgr:'—',created:'01 Apr 2026',status:'Active',av:'P',color:'#2F6FED',phone:'—',email:'palpx@reliance.co',join:'01 Apr 2026'},
 {code:'REL0001',name:'Vinoth V V',role:'Org Admin',dept:'—',mgr:'—',created:'25 Feb 2026',status:'Active',av:'VV',color:'#C92F3A',phone:'9769011309',email:'vinotham@gmail.com',join:'25 Feb 2026'},
 {code:'REL0002',name:'Rajesh Kumar',role:'Project Admin',dept:'—',mgr:'—',created:'27 Feb 2026',status:'Inactive',av:'RK',color:'#15A06A',phone:'—',email:'rajesh@reliance.co',join:'27 Feb 2026'}];
const EST={Active:'var(--ok)','Onboarding':'var(--info)','Invitation Sent':'#9A6B12',Inactive:'var(--coral-ink)'};
function eav(e,s){s=s||26;return `<span class="eav" style="background:${e.color};width:${s}px;height:${s}px;font-size:${Math.round(s/2.5)}px">${e.av}</span>`;}
let hrPage='directory',hrEmp=null,hrEmpTab='Overview',hrAttTab='Attendance',hrAttView='List',hrNavCollapsed=false;
let hrDirViews=[['All Employees','star','Table'],['By Status','Board','Board'],['By Dept','List','List']],hrDirActive='All Employees';
let empPanelCollapsed=true,empFace='info';
let hrPerf=[{l:'On-Time Delivery',v:'75%',d:'+6'},{l:'Team Collaboration',v:'60%',d:'+3'},{l:'Tasks Completed',v:'12',d:'+4'},{l:'Avg Quality',v:'4.5/5',d:'+0.2'}];
const HRPAGES=[['tasks','Tasks'],['directory','Employee Directory'],['attendance','Attendance & Leaves'],['communication','Communication'],['payroll','Payroll'],['settings','Settings']];
const SVS={search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',filter:'<path d="M3 5h18M6 12h12M10 19h4"/>',sort:'<path d="M3 6h12M3 12h8M3 18h5M17 4v16m0 0 4-4m-4 4-4-4"/>',pencil:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',plus:'<path d="M12 5v14M5 12h14"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',caret:'<path d="m6 9 6 6 6-6"/>',arrow:'<path d="M19 12H5M12 19l-7-7 7-7"/>',more:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',up:'<path d="M12 19V5M5 12l7-7 7 7"/>',trend:'<path d="M3 17 9 11l4 3 7-8"/><path d="M21 6v5M16 6h5"/>'};
function mountHR(){hrEmp=null;document.getElementById('screen').innerHTML=`<div class="box hrbox ${hrNavCollapsed?'navcollapsed':''}" id="hrbox"><aside class="hrnav"><div class="hrnav-top" style="justify-content:flex-end"><button class="hrcollapse" onclick="hrNavToggle()" title="Collapse">${svg('<path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>',16)}</button></div>${HRPAGES.map(p=>`<a class="${hrPage===p[0]?'on':''}" onclick="hrSet('${p[0]}')">${p[1]}</a>`).join('')}</aside><div class="hrmain" id="hrmain"></div><button class="hrreopen" onclick="hrNavToggle()" title="Show menu">${svg('<path d="M3 6h18M3 12h18M3 18h18"/>',17)}</button></div>`;renderHRPage();}
function hrNavToggle(){hrNavCollapsed=!hrNavCollapsed;document.getElementById('hrbox').classList.toggle('navcollapsed',hrNavCollapsed);}
function hrSet(p){hrPage=p;hrEmp=null;document.querySelectorAll('.hrnav a').forEach((a,i)=>a.classList.toggle('on',HRPAGES[i]&&HRPAGES[i][0]===p));renderHRPage();}
function renderHRPage(){const el=document.getElementById('hrmain');if(!el)return;
  if(hrPage==='directory')el.innerHTML=hrDirectory();
  else if(hrPage==='attendance')el.innerHTML=hrAttendance();
  else if(hrPage==='communication')el.innerHTML=hrComm();
  else if(hrPage==='payroll')el.innerHTML=hrPayroll();
  else if(hrPage==='tasks'){taskModule='hr';taskScope='hr';taskContainer='hrmain';el.innerHTML=tasksListHTML('hr');}
  else el.innerHTML=`${pageHeader('Settings','Roles, policies & configuration','<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>')}<div class="emp-sec"><h3>HR settings</h3><div class="muted2">Roles & access, leave policies, holiday calendar, payroll configuration. Each is a cell you can edit. (Demo)</div></div>`;}
function hrTools(){return `<button class="mtool">${svg(SVS.filter,17)}</button><button class="mtool">${svg(SVS.sort,17)}</button>`;}
function hrDirType(){return (hrDirViews.find(v=>v[0]===hrDirActive)||['','','Table'])[2];}
function hrDirSetView(n){hrDirActive=n;renderHRPage();}
function hrDirVMenu(e){e.stopPropagation();openPop('vmenu');}
function hrDirAddView(t){hrDirViews.push([t,t,t]);hrDirActive=t;closePops();renderHRPage();toast(t+' view added');}
function hrDirectory(){const t=hrDirType();
  return `${pageHeader('Employee Directory','Everyone in your workspace','<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M21 20a5 5 0 0 0-4-4.9"/>')}
   ${metricsBar('hrdir')}
   <div class="viewbar" style="padding:8px 0 12px;margin-bottom:4px">
     <div style="display:flex;gap:5px">${hrDirViews.map(v=>`<button class="vtab ${v[0]===hrDirActive?'on':''}" onclick="hrDirSetView('${v[0]}')"><span class="${v[1]==='star'?'star':''}">${svg(ICONS[v[1]]||ICONS.Table,15)}</span>${v[0]}</button>`).join('')}</div>
     <button class="vadd" id="vaddBtn" onclick="hrDirVMenu(event)">${svg(SVS.plus,15)}</button>
     <div class="pop vmenu" id="vmenu" style="left:0"><div class="h">Add a new view</div><div class="vgrid">${['Table','Board','List','Gallery','Calendar','Timeline','Chart','Feed','Map'].map(x=>`<button class="vitem" onclick="hrDirAddView('${x}')"><span class="ic">${svg(ICONS[x],22)}</span><span class="n">${x}</span></button>`).join('')}</div><button class="src"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/></svg>New data source</button></div>
     <div style="margin-left:auto;display:flex;align-items:center;gap:8px"><div class="hsearch" style="max-width:240px">${svg(SVS.search,15)} Search employees</div>${hrTools()}<div class="newbtn"><button class="a" onclick="toast('New employee')">New Employee</button><span class="b">${svg(SVS.caret,11)}</span></div></div>
   </div>
   ${t==='Board'?empBoard():t==='List'?empList():t==='Table'?empTable():placeholder(t)}`;}
function empTable(){return `<div class="tablewrap"><table><thead><tr><th>Employee Code</th><th>Employee Name</th><th>Role</th><th>Department</th><th>Manager</th><th>Created on</th><th>Status</th></tr></thead><tbody>
   ${EMP.map(e=>`<tr onclick="hrOpenEmp('${e.code}')"><td>${e.code}</td><td><span class="owncell">${eav(e)}<b style="color:var(--navy)">${e.name}</b></span></td><td>${e.role}</td><td>${e.dept}</td><td>${e.mgr}</td><td class="co">${e.created}</td><td><span style="color:${EST[e.status]||'var(--muted)'};font-weight:600">${e.status}</span></td></tr>`).join('')}</tbody></table></div>`;}
function empBoard(){const sts=['Active','Onboarding','Invitation Sent','Inactive'];return `<div class="board color">`+sts.map(s=>{const items=EMP.filter(e=>e.status===s);return `<div class="col"><div class="col-head" style="--cc:${EST[s]||'var(--faint)'}"><span class="pill"><span class="dot"></span>${s}</span><span class="ct">${items.length}</span></div><div class="col-body">${items.map(e=>`<div class="card" onclick="hrOpenEmp('${e.code}')"><div class="nm">${e.name}</div><div class="by">${e.role} · ${e.code}</div><div class="foot"><span class="src">${e.dept==='—'?'No dept':e.dept}</span>${eav(e,23)}</div></div>`).join('')||'<div class="col-empty">None</div>'}</div></div>`;}).join('')+`</div>`;}
function empList(){const depts=[...new Set(EMP.map(e=>e.dept))];return depts.map(d=>{const items=EMP.filter(e=>e.dept===d);return `<div class="lg"><div class="lg-head"><span class="pill">${d==='—'?'No department':d}</span><span class="ct">${items.length}</span></div>${items.map(e=>`<div class="lrow" onclick="hrOpenEmp('${e.code}')">${eav(e)}<span class="nm">${e.name}</span><span class="co">${e.role} · ${e.code}</span><span style="color:${EST[e.status]};font-weight:600;font-size:12.5px">${e.status}</span></div>`).join('')}</div>`;}).join('');}
function hrOpenEmp(code){hrEmp=EMP.find(e=>e.code===code);hrEmpTab='Overview';mountEmpRecord();}
function mountEmpRecord(){const e=hrEmp;const tabs=['Overview','Personal','Contact','Work','Salary','Documents','Activity'];empPanelCollapsed=isMobile();
  document.getElementById('screen').innerHTML=`<div class="dwrap"><div class="dside"><button class="dctl x" onclick="empClose()" title="Close">${svg(SVS.x,19)}</button><div class="dnav"><button class="dctl" onclick="empNav(-1)" title="Previous (↑)">${svg('<path d="M18 15l-6-6-6 6"/>',21)}</button><button class="dctl" onclick="empNav(1)" title="Next (↓)">${svg('<path d="M6 9l6 6 6-6"/>',21)}</button></div></div><div class="dbox ${empPanelCollapsed?'collapsed':''}" id="empbox"><div class="dmain">
     <div class="crumbbar"><a onclick="go('hr')">Employee Directory</a> <span class="sep">‹</span> <b>${e.name}</b></div>
     <div class="mc-top"><div class="title-wrap"><span class="eav" style="background:${e.color};width:40px;height:40px;font-size:15px">${e.av}</span><div><h1>${e.name}</h1><div class="sub">${e.role} · ${e.status}</div></div></div><div class="sp"></div><button class="paneltoggle" onclick="empToggle()"><span id="empPtog">${empPanelCollapsed?'Show info':'Hide info'}</span>${svg('<path d="M15 18l-6-6 6-6"/>',14)}</button></div>
     <div class="rec-actions" style="padding:0 22px 4px">
       <button class="commbtn" data-f="call" onclick="openComm('call')">${faceIcon('call')} Call</button>
       <button class="commbtn" data-f="email" onclick="openComm('email')">${faceIcon('email')} Email</button>
       <button class="commbtn" data-f="chat" onclick="openComm('chat')">${faceIcon('chat')} Message</button></div>
     <div class="emp-tabs" style="padding:0 22px 10px">${tabs.map(t=>`<button class="vtab ${t===hrEmpTab?'on':''}" onclick="hrEmpSetTab('${t}')">${t}</button>`).join('')}</div>
     <div class="dcenter"><div class="inner" id="empBody">${hrEmpBody(e)}</div></div></div>
   <aside class="dpanel" id="emppanel"><div class="dpanel-head"><span class="nm">${e.name}</span><button class="ed" onclick="xpOpenFrom(this)" title="Expand">${svg('<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',15)}</button><button class="ed" style="margin-left:6px">${svg(SVS.pencil,15)}</button></div>
     <div class="dpanel-body" id="emppanelbody"></div></aside></div></div>`;
  renderEmpInfo();
  commSetHost({getFace:()=>empFace,setFace:empSetFace,content:commEmpContent});syncCommActive();}
function empClose(){go('hr');}
function empNav(dir){const i=EMP.findIndex(x=>x.code===hrEmp.code);if(i<0)return;const n=(i+dir+EMP.length)%EMP.length;hrEmp=EMP[n];empFace='info';xpClose();mountEmpRecord();}
function hrEmpSetTab(t){hrEmpTab=t;document.getElementById('empBody').innerHTML=hrEmpBody(hrEmp);document.querySelectorAll('.emp-tabs .vtab').forEach(b=>b.classList.toggle('on',b.textContent===t));}
function empToggle(){empPanelCollapsed=!empPanelCollapsed;document.getElementById('empbox').classList.toggle('collapsed',empPanelCollapsed);document.getElementById('empPtog').textContent=empPanelCollapsed?'Show info':'Hide info';}
function empSetFace(f){empFace=f;document.querySelectorAll('#emppanel .xcface').forEach(b=>b.classList.toggle('on',b.dataset.face===f));renderEmpInfo();}
/* OJO read of an employee — derived from status, manager, department */
function empInsights(e){const onboarding=e.status!=='Active';const out=[];
  out.push(['flame',onboarding?`<b>${e.status}.</b> Finish onboarding — complete the profile and assign a manager.`:`<b>Active.</b> Profile is in good standing.`]);
  out.push(['target',e.mgr==='—'?`<b>No manager assigned.</b> Assign one so approvals and reviews route correctly.`:`<b>Reports to ${e.mgr}.</b> Reviews route through them.`]);
  out.push(['clock',e.dept==='—'?`<b>Department not set.</b> Add it to include them in team views and payroll.`:`<b>${e.dept} team.</b> Counted in that team's headcount.`]);
  return out;}
function empScore(e){return ({REL0006:62,REL0005:40,REL0003:78,REL0004:85,REL0001:90,REL0002:30}[e.code])||60;}
function empPanelCells(e){const sc=empScore(e),lbl=sc>=80?'Strong':sc>=50?'Average':'Needs focus';
  return [
    {render:'score',props:{pct:sc,label:lbl,reason:`Performance this quarter · ${e.role}`,tag:'OJO read'}},
    {render:'facts',props:{rows:[['Role',e.role],['Department',e.dept],['Status',`<span style="color:${EST[e.status]||'var(--ink)'}">${e.status}</span>`],['Manager',e.mgr],['Joined',e.join]]}},
    {render:'insights',props:{items:empInsights(e),askNoun:'profile'}},
    {render:'contacts',props:{title:'Contact',add:null,list:[[e.name,e.role,e.email,e.color,true]]}},
    {render:'more',props:{rows:[['Employee code',e.code],['Email',e.email],['Phone',e.phone],['Added on',e.created]]}}
  ];}
function empInfoBody(){return `<div class="ip">${empPanelCells(hrEmp).map(renderPanelCell).join('')}</div>`;}
function renderEmpInfo(){const el=document.getElementById('emppanelbody');if(!el)return;el.innerHTML=empInfoBody();}
function hrEmpBody(e,tab){tab=tab||hrEmpTab;
  if(tab==='Overview')return hrPerfBlock()+hrFieldSec('Personal Details',[['Full Name',e.name],['Joining Date',e.join]])+hrFieldSec('Contact Details',[['Contact number',e.phone],['Work Email',e.email],['Address','—'],['City','—']]);
  if(tab==='Personal')return hrFieldSec('Personal Details',[['Full Name',e.name],['Joining Date',e.join],['Date of Birth','—'],['Gender','—']]);
  if(tab==='Contact')return hrFieldSec('Contact Details',[['Contact number',e.phone],['Emergency number','—'],['Work Email',e.email],['Personal Email','—'],['Address','—'],['City','—']]);
  if(tab==='Work')return hrFieldSec('Work Profile',[['Role',e.role],['Department',e.dept],['Manager',e.mgr],['Employee Code',e.code]]);
  if(tab==='Salary')return hrFieldSec('Salary Details',[['CTC','₹—'],['Monthly Gross','₹—'],['Bank','—'],['PAN','—']]);
  if(tab==='Documents')return `<div class="emp-sec"><div class="emp-sec-h"><h3>Documents</h3></div><div class="muted2">No documents yet. Drag files here or click upload.</div></div>`;
  return `<div class="emp-sec"><div class="emp-sec-h"><h3>Activity</h3></div><div class="muted2">Joined on ${e.join}. No recent activity.</div></div>`;}
function hrFieldSec(title,fields){return `<div class="emp-sec"><div class="emp-sec-h"><h3>${title}</h3><button class="iconedit" onclick="toast('Edit ${title}')">${svg(SVS.pencil,15)}</button></div><div class="fgrid">${fields.map(f=>`<div class="fld"><div class="flk">${f[0]}</div><input class="flv" value="${f[1]}"></div>`).join('')}</div></div>`;}
function hrSpark(){const pts=[10,16,13,24,20,32,28,40,36,30,44];const w=560,h=70,mx=Math.max(...pts),step=w/(pts.length-1);const line=pts.map((p,i)=>`${(i*step).toFixed(1)},${(h-(p/mx)*h).toFixed(1)}`).join(' ');return `<svg viewBox="0 0 ${w} ${h}" class="spark" preserveAspectRatio="none"><polyline points="0,${h} ${line} ${w},${h}" fill="rgba(22,163,74,.10)" stroke="none"/><polyline points="${line}" fill="none" stroke="#16A34A" stroke-width="2.5" stroke-linejoin="round"/></svg>`;}
function hrPerfBlock(){return `<div class="emp-sec"><div class="emp-sec-h"><h3>Performance</h3><span class="muted2" style="margin-left:auto">Monthly · time vs quality</span></div>${hrSpark()}
   <div class="perf-grid">${hrPerf.map((m,i)=>`<div class="perf-card"><button class="perf-x" onclick="hrPerfRemove(${i})">${svg(SVS.x,11)}</button><div class="pv">${m.v}</div><div class="pl">${m.l}</div><div class="pd">${svg(SVS.up,11)} ${m.d}</div></div>`).join('')}<button class="perf-add" onclick="hrPerfAdd()">${svg(SVS.plus,16)} Add metric</button></div></div>`;}
function hrPerfRefresh(){const a=document.getElementById('empBody');if(a&&hrEmp)a.innerHTML=hrEmpBody(hrEmp);const b=document.getElementById('profEmpBody');if(b)b.innerHTML=hrEmpBody(profUser(),profTab);}
function hrPerfRemove(i){hrPerf.splice(i,1);hrPerfRefresh();}
function hrPerfAdd(){hrPerf.push({l:'New metric',v:'0',d:'+0'});hrPerfRefresh();}
function hrAttendance(){const sub=['Attendance','Leave Requests','Holidays'];
  return `<div class="emp-tabs" style="margin-bottom:16px">${sub.map(t=>`<button class="vtab ${t===hrAttTab?'on':''}" onclick="hrAttSet('${t}')">${t}</button>`).join('')}</div>`+(hrAttTab==='Attendance'?hrAttList():hrAttTab==='Leave Requests'?`<div class="emp-sec"><div class="emp-sec-h"><h3>Leave Requests</h3></div><div class="muted2">No pending leave requests.</div></div>`:`<div class="emp-sec"><div class="emp-sec-h"><h3>Holidays</h3></div><div class="muted2">2 upcoming holidays this quarter.</div></div>`);}
function hrAttSet(t){hrAttTab=t;renderHRPage();}
function hrAttV(v){hrAttView=v;renderHRPage();}
function hrAttList(){const act=EMP.filter(e=>e.status==='Active');
  return `<div class="hrtoolbar"><div class="switch2"><button class="${hrAttView==='List'?'on':''}" onclick="hrAttV('List')">List</button><button class="${hrAttView==='Calendar'?'on':''}" onclick="hrAttV('Calendar')">Calendar</button></div><div class="hsearch" style="max-width:300px">${svg(SVS.search,15)} Search employees</div><div class="datepill" style="margin-left:auto">${svg(ICONS.Calendar,15)} Jun 5, 2026</div></div>
   <div class="hstats"><div class="hstat"><div class="v">${act.length}</div><div class="l">Total Employees</div></div><div class="hstat"><div class="v">0</div><div class="l">Present</div></div><div class="hstat r"><div class="v">${act.length}</div><div class="l">Absent</div></div><div class="hstat"><div class="v">0</div><div class="l">On Leave</div></div></div>
   ${hrAttView==='Calendar'?`<div class="emp-sec">${miniCal()}</div>`:`<div class="tablewrap"><table><thead><tr><th>Code</th><th>Name</th><th>Date</th><th>Status</th><th>Check In</th><th>Check Out</th><th>Work Hours</th><th>Actions</th></tr></thead><tbody>${act.map(e=>`<tr><td>${e.code}</td><td><span class="owncell">${eav(e)}${e.name}</span></td><td class="co">05 Jun 2026</td><td><span style="color:var(--coral-ink);font-weight:600">Absent</span></td><td>-</td><td>-</td><td>-</td><td><button class="iconedit" onclick="event.stopPropagation();toast('Mark attendance')">${svg(SVS.pencil,14)}</button></td></tr>`).join('')}</tbody></table></div>`}`;}
function commRow(k,inner){return `<div class="commrow"><div class="crk">${k}</div><div>${inner}</div></div>`;}
function hrComm(){return `<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><button class="back" onclick="hrSet('directory')">${svg(SVS.arrow,18)}</button><div class="hr-h" style="margin:0">New Announcement</div></div>
   <div class="emp-sec">
    ${commRow('Title','<input class="flv" placeholder="Enter announcement title">')}
    ${commRow('Subject','<input class="flv" placeholder="Enter subject">')}
    ${commRow('Type','<select class="flv"><option>General</option><option>Policy</option><option>Event</option><option>Urgent</option></select>')}
    ${commRow('To','<input class="flv" placeholder="Select recipients">')}
    ${commRow('Bcc','<input class="flv" placeholder="Type email and press Enter">')}
    <div style="border-top:1px solid var(--line);margin:12px 0 0"></div>
    <button class="draftojo" onclick="toast('Drafting with OJO…')">✦ Draft with OJO</button>
    <textarea class="commbody" placeholder="Write your announcement message here..."></textarea>
    <div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="pill">${svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',14)} Upload</button></div>
   </div>
   <div style="display:flex;justify-content:center;gap:12px;margin-top:16px"><button class="pill" onclick="toast('Saved as draft')">Save as Draft</button><button class="abtn dark" style="padding:9px 18px;border-radius:999px;font-weight:700;font-size:13px" onclick="toast('Announcement sent')">Send Now</button></div>`;}
function hrPayroll(){const e=EMP[4];return `<div class="hr-h">Pay Run for March 2026 <span class="ebadge" style="color:var(--ok);background:var(--ok-soft)">✓ Paid</span></div>
   <div class="hstats"><div class="hstat"><div class="v">1</div><div class="l">Active Employees</div></div><div class="hstat"><div class="v">₹20,000</div><div class="l">Total Payroll Cost</div></div><div class="hstat"><div class="v">₹0</div><div class="l">Taxes &amp; deductions</div></div><div class="hstat r"><div class="v">₹20,000</div><div class="l">Net Payable</div></div></div>
   <div class="muted2" style="margin:-6px 0 16px">16 March 2026 · 30 Pay days</div>
   <div class="tablewrap"><table><thead><tr><th>Employee</th><th class="num">Paid Days</th><th class="num">Gross</th><th class="num">Deductions</th><th class="num">Net Pay</th><th>Advance</th></tr></thead><tbody><tr><td><span class="owncell">${eav(e)}${e.name}</span></td><td class="num">2</td><td class="num">₹20,000</td><td class="num">₹0</td><td class="num">₹20,000</td><td>—</td></tr></tbody></table></div>`;}

/* ============ PROFILE (account) — full page with left sub-nav, like HR / Accounts ============ */
let profPage='profile', profTab='Overview', profNavCollapsed=false;
const PROFPAGES=[['profile','Profile'],['attendance','Attendance'],['payslips','Payslips'],['integrations','Integrations']];
function profUser(){return EMP.find(e=>e.code==='REL0001')||EMP[0];}
function mountProfile(){profPage='profile';profTab='Overview';
  document.getElementById('screen').innerHTML=`<div class="box hrbox ${profNavCollapsed?'navcollapsed':''}" id="profbox"><aside class="hrnav"><div class="hrnav-top" style="justify-content:flex-end"><button class="hrcollapse" onclick="profNavToggle()" title="Collapse">${svg('<path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>',16)}</button></div>${PROFPAGES.map(p=>`<a class="${profPage===p[0]?'on':''}" onclick="profSet('${p[0]}')">${p[1]}</a>`).join('')}</aside><div class="hrmain" id="profmain"></div><button class="hrreopen" onclick="profNavToggle()" title="Show menu">${svg('<path d="M3 6h18M3 12h18M3 18h18"/>',17)}</button></div>`;
  renderProfPage();}
function profNavToggle(){profNavCollapsed=!profNavCollapsed;document.getElementById('profbox').classList.toggle('navcollapsed',profNavCollapsed);}
function profSet(p){profPage=p;document.querySelectorAll('#profbox .hrnav a').forEach((a,i)=>a.classList.toggle('on',PROFPAGES[i]&&PROFPAGES[i][0]===p));renderProfPage();}
function renderProfPage(){const el=document.getElementById('profmain');if(!el)return;
  if(profPage==='profile')el.innerHTML=profBody();
  else if(profPage==='attendance')el.innerHTML=profAttendance();
  else if(profPage==='payslips')el.innerHTML=profPayslips();
  else el.innerHTML=profIntegrations();}
function profBody(){const e=profUser();const tabs=['Overview','Personal','Contact','Work','Salary','Documents','Activity'];
  return `<div class="mc-top" style="padding:2px 0 14px;align-items:center"><div class="title-wrap"><span class="eav" style="background:${e.color};width:46px;height:46px;font-size:16px">${e.av}</span><div><h1 style="font-size:24px;font-weight:800;letter-spacing:-.02em;color:var(--navy);line-height:1.2">${e.name} <span class="rolechip">${e.role}</span></h1><div class="sub">${e.email} · ${e.status}</div></div></div><div class="sp" style="flex:1"></div><span class="appearance-ctl"><span class="tlab">Appearance</span><span class="seg themeseg"><button data-t="light" class="${curTheme()==='light'?'on':''}" onclick="setTheme('light')">Light</button><button data-t="dark" class="${curTheme()==='dark'?'on':''}" onclick="setTheme('dark')">Dark</button></span></div></div>
   <div class="emp-tabs" style="margin-bottom:16px">${tabs.map(t=>`<button class="vtab ${t===profTab?'on':''}" onclick="profSetTab('${t}')">${t}</button>`).join('')}</div>
   <div id="profEmpBody">${hrEmpBody(e,profTab)}</div>`;}
function profSetTab(t){profTab=t;const b=document.getElementById('profEmpBody');if(b)b.innerHTML=hrEmpBody(profUser(),profTab);document.querySelectorAll('#profmain .emp-tabs .vtab').forEach(x=>x.classList.toggle('on',x.textContent===t));}
function profAttendance(){const days=[['02 Jun 2026','Present','09:58 AM','06:31 PM','8h 33m'],['03 Jun 2026','Present','10:04 AM','06:45 PM','8h 41m'],['04 Jun 2026','Present','09:46 AM','06:20 PM','8h 34m'],['05 Jun 2026','Absent','-','-','-']];
  return `${pageHeader('Attendance','Your check-ins, hours & leave balance','<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>')}
   <div class="hstats"><div class="hstat"><div class="v">21</div><div class="l">Present (Jun)</div></div><div class="hstat r"><div class="v">1</div><div class="l">Absent</div></div><div class="hstat"><div class="v">2</div><div class="l">Leaves left</div></div><div class="hstat"><div class="v">8h 36m</div><div class="l">Avg hours</div></div></div>
   <div class="tablewrap"><table><thead><tr><th>Date</th><th>Status</th><th>Check In</th><th>Check Out</th><th>Work Hours</th></tr></thead><tbody>${days.map(d=>`<tr><td class="co">${d[0]}</td><td><span style="color:${d[1]==='Present'?'var(--ok)':'var(--coral-ink)'};font-weight:600">${d[1]}</span></td><td>${d[2]}</td><td>${d[3]}</td><td>${d[4]}</td></tr>`).join('')}</tbody></table></div>`;}
function profPayslips(){const rows=[['May 2026','₹20,000','₹0','₹20,000'],['April 2026','₹20,000','₹0','₹20,000'],['March 2026','₹20,000','₹0','₹20,000']];
  return `${pageHeader('Payslips','Monthly salary statements','<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/>')}
   <div class="tablewrap"><table><thead><tr><th>Period</th><th class="num">Gross</th><th class="num">Deductions</th><th class="num">Net Pay</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td class="num">${r[1]}</td><td class="num">${r[2]}</td><td class="num">${r[3]}</td><td><span class="ebadge" style="color:var(--ok);background:var(--ok-soft)">✓ Paid</span></td><td><button class="iconedit" onclick="toast('Download payslip · ${r[0]}')">${svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',14)}</button></td></tr>`).join('')}</tbody></table></div>`;}
function profIntegrations(){const apps=[['Google Drive','#15A06A','Sync files & documents',1],['Slack','#7C53E6','Notifications & chat',1],['Gmail','#E0533A','Email integration',0],['Zoom','#2F6FED','Meetings & calls',0],['GitHub','#24292F','Code & issues',0]];
  return `${pageHeader('Integrations','Connect your tools to OJO','<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>')}
   <div class="intlist">${apps.map(a=>`<div class="introw"><div class="inticon" style="background:${a[1]}">${a[0][0]}</div><div style="flex:1"><div class="intname">${a[0]}</div><div class="muted2">${a[2]}</div></div><button class="intbtn ${a[3]?'on':''}" onclick="toast('${a[3]?'Disconnect':'Connect'} ${a[0]}')">${a[3]?'Connected':'Connect'}</button></div>`).join('')}</div>`;}

/* ============ ORG ADMIN — full page, cell-style (like HR / Accounts / Profile) ============ */
let adminPage='users', adminRole=null, adminPermMod='Sales', adminNavCollapsed=false;
const ORGADMIN_PAGES=[['users','Users'],['roles','Roles and Permissions'],['orgsettings','Organization Settings'],['hrpay','HR & Payroll'],['finance','Finance & Compliance'],['payment','Payment Config'],['integrations','Integrations'],['billing','Billing & Plans']];
const ORGUSERS=[['VV','#C92F3A','Vinoth V V','Org Admin','—','—','25 Feb'],['PA','#2F6FED','Palpxvinoth','Org Admin','—','—','25 Feb'],['PR','#7C53E6','Preetam','Client','—','—','25 Feb'],['NI','#15A06A','Nidhuna','Finance Admin','Design','—','26 Feb'],['CY','#E08A1E','Client Yamuna','Client','—','—','10 Apr'],['RA','#C92F3A','Rajeeshal','Client','—','—','01 May'],['DE','#15A06A','Devika','Client','—','—','03 May'],['AB','#2F6FED','Aman Bhai','Client','—','—','07 May'],['TN','#7C53E6','Test New','Employee','Design','—','15 May']];
const ORGROLES=[{name:'Org Admin',color:'#C92F3A',desc:'Full access across all modules and settings.',base:'Manager',perm:'28/28',members:2},{name:'Sales Admin',color:'#E08A1E',desc:'Manages sales team and leads',base:'Sales Admin',perm:'24/28',members:1},{name:'Finance Admin',color:'#15A06A',desc:'Manages accounts, billing and compliance.',base:'Manager',perm:'20/28',members:1},{name:'Employee',color:'#2F6FED',desc:'Base role for most org members.',base:'Employee',perm:'12/28',members:5},{name:'Client',color:'#7C53E6',desc:'External client with limited visibility.',base:'Client',perm:'5/28',members:6}];
const PERM_MODS=[['Sales','24/28'],['Contacts','8/8'],['HRM',''],['Projects',''],['Finance',''],['Vendors','4/24'],['Chat','4/5'],['Common','24']];
const PERM_ROWS=['Leads','Proposals','Documents','Tasks','Reviews','Emails','Calls','Meetings','Audio'];
const PERM_COLS=['Read','Read All','Create','Update'];
let rolePerms={};
function initRolePerms(){rolePerms={};PERM_ROWS.forEach((r,ri)=>PERM_COLS.forEach((c,ci)=>{rolePerms[ri+'|'+ci]=true;}));
  ['2|1','3|1','4|1','5|1','6|1','7|1','8|1','2|3'].forEach(k=>rolePerms[k]=false);}
function roleColor(role){return {'Org Admin':'#C92F3A','Finance Admin':'#15A06A','Sales Admin':'#E08A1E','Employee':'#2F6FED','Client':'#7C53E6','Manager':'#0EA5A5'}[role]||'var(--muted)';}
function roleChip(role){const c=roleColor(role);return `<span class="ebadge" style="color:${c};background:${c}1a">${role}</span>`;}
function mountOrgAdmin(){adminRole=null;
  document.getElementById('screen').innerHTML=`<div class="box hrbox ${adminNavCollapsed?'navcollapsed':''}" id="adminbox"><aside class="hrnav"><div class="hrnav-top" style="justify-content:flex-end"><button class="hrcollapse" onclick="adminNavToggle()" title="Collapse">${svg('<path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>',16)}</button></div>${ORGADMIN_PAGES.map(p=>`<a class="${adminPage===p[0]?'on':''}" onclick="adminSet('${p[0]}')">${p[1]}</a>`).join('')}</aside><div class="hrmain" id="adminmain"></div><button class="hrreopen" onclick="adminNavToggle()" title="Show menu">${svg('<path d="M3 6h18M3 12h18M3 18h18"/>',17)}</button></div>`;
  renderAdminPage();}
function adminNavToggle(){adminNavCollapsed=!adminNavCollapsed;document.getElementById('adminbox').classList.toggle('navcollapsed',adminNavCollapsed);}
function adminSet(p){adminPage=p;adminRole=null;document.querySelectorAll('#adminbox .hrnav a').forEach((a,i)=>a.classList.toggle('on',ORGADMIN_PAGES[i]&&ORGADMIN_PAGES[i][0]===p));renderAdminPage();}
function renderAdminPage(){const el=document.getElementById('adminmain');if(!el)return;
  if(adminRole){el.innerHTML=adminRoleEdit(adminRole);return;}
  if(adminPage==='users')el.innerHTML=adminUsers();
  else if(adminPage==='roles')el.innerHTML=adminRoles();
  else if(adminPage==='integrations')el.innerHTML=profIntegrations();
  else el.innerHTML=adminPlaceholder();}
function adminPlaceholder(){const p=ORGADMIN_PAGES.find(x=>x[0]===adminPage);return `${pageHeader(p[1],'Manage '+p[1].toLowerCase()+' for your organization.','<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 4v16"/>')}<div class="emp-sec"><div class="emp-sec-h"><h3>${p[1]}</h3></div><div class="muted2">${p[1]} configuration lives here. Each setting is a cell you can edit. (Demo)</div></div>`;}
function adminUsers(){return `<div class="hrtoolbar"><div class="hsearch">${svg(SVS.search,15)} Search users</div><button class="mtool" style="margin-left:auto">${svg(SVS.filter,17)}</button><button class="mtool">${svg(SVS.sort,17)}</button></div>
   <div class="tablewrap"><table><thead><tr><th style="width:40px"><input type="checkbox" onclick="event.stopPropagation()"></th><th>Name</th><th>Role</th><th>Department</th><th>Manager</th><th>Joining Date</th><th style="width:44px"></th></tr></thead><tbody>${ORGUSERS.map(u=>`<tr onclick="toast('Open user: ${u[2]}')"><td><input type="checkbox" onclick="event.stopPropagation()"></td><td><span class="owncell"><span class="eav" style="background:${u[1]};width:30px;height:30px;font-size:11px">${u[0]}</span><span style="color:var(--navy);font-weight:700;font-size:13.5px">${u[2]}</span></span></td><td>${roleChip(u[3])}</td><td class="co">${u[4]}</td><td class="co">${u[5]}</td><td class="co">${u[6]}</td><td><button class="iconedit" onclick="event.stopPropagation();toast('User actions')">${svg(SVS.more,16)}</button></td></tr>`).join('')}</tbody></table></div>
   <div class="tblfoot"><button class="pill" onclick="toast('Rows per page')">Show 50 rows ${svg('<path d="m6 9 6 6 6-6"/>',13)}</button><div class="pager"><button class="pill" onclick="toast('Previous')">Previous</button><button class="pill on">1</button><button class="pill" onclick="toast('Next')">Next</button></div></div>`;}
function adminRoles(){return `<div class="hrtoolbar"><div class="hr-h" style="margin:0">Roles &amp; Permissions</div><button class="abtn dark" style="margin-left:auto;padding:9px 16px;border-radius:999px;font-weight:700;font-size:13px" onclick="toast('New role')">＋ New Role</button></div>
   <div class="tablewrap"><table><thead><tr><th>Role</th><th>Base Role</th><th>Members</th><th>Permissions</th><th style="width:44px"></th></tr></thead><tbody>${ORGROLES.map((r,i)=>`<tr onclick="adminOpenRole(${i})"><td><span class="owncell"><span class="rdot" style="background:${r.color}"></span><span style="color:var(--navy);font-weight:700;font-size:13.5px">${r.name}</span></span></td><td class="co">${r.base}</td><td class="co">${r.members} members</td><td><span class="ebadge" style="color:var(--navy);background:var(--surface-2)">${r.perm}</span></td><td><button class="iconedit" onclick="event.stopPropagation();adminOpenRole(${i})">${svg(SVS.pencil,15)}</button></td></tr>`).join('')}</tbody></table></div>`;}
function adminOpenRole(i){adminRole=Object.assign({},ORGROLES[i]);adminPermMod='Sales';initRolePerms();renderAdminPage();}
function adminBackRoles(){adminRole=null;adminPage='roles';renderAdminPage();}
function adminPickColor(btn,c){document.querySelectorAll('.swatchrow .swatch').forEach(s=>s.classList.remove('on'));btn.classList.add('on');if(adminRole)adminRole.color=c;}
function adminSetPermMod(m){adminPermMod=m;document.querySelectorAll('.permmods .permmod').forEach(b=>b.classList.toggle('on',b.dataset.mod===m));const lbl=document.querySelectorAll('.permaccess .pat');if(lbl[0])lbl[0].textContent=m+' access';}
function permToggle(ri,ci){const k=ri+'|'+ci;rolePerms[k]=!rolePerms[k];const btn=document.querySelector(`.permcell[data-k="${k}"]`);if(btn)btn.classList.toggle('on',rolePerms[k]);updatePermCount();}
function updatePermCount(){const n=Object.values(rolePerms).filter(Boolean).length,t=PERM_ROWS.length*PERM_COLS.length;const el=document.getElementById('permCount');if(el)el.textContent=`${n}/${t} selected`;}
function permSelectAll(){const n=Object.values(rolePerms).filter(Boolean).length,t=PERM_ROWS.length*PERM_COLS.length,all=n<t;PERM_ROWS.forEach((r,ri)=>PERM_COLS.forEach((c,ci)=>rolePerms[ri+'|'+ci]=all));document.querySelectorAll('.permcell').forEach(b=>{b.classList.toggle('on',all);});updatePermCount();}
function permMatrix(){return `<div class="permtbl"><div class="permhead"><div class="permrow-h"></div>${PERM_COLS.map(c=>`<div class="permcol-h">${c}</div>`).join('')}</div>
   ${PERM_ROWS.map((r,ri)=>`<div class="permrow"><div class="permrow-l">${r}</div>${PERM_COLS.map((c,ci)=>`<button class="permcell ${rolePerms[ri+'|'+ci]?'on':''}" data-k="${ri+'|'+ci}" onclick="permToggle(${ri},${ci})" title="${r} · ${c}">${svg('<path d="M20 6 9 17l-5-5"/>',15)}</button>`).join('')}</div>`).join('')}</div>`;}
function adminSaveRole(){toast('Role permissions updated');adminBackRoles();}
function adminRoleEdit(r){const colors=['#C92F3A','#2F6FED','#7C53E6','#15A06A','#E08A1E','#E0533A','#0EA5A5','#6366F1'];
  const n=Object.values(rolePerms).filter(Boolean).length,t=PERM_ROWS.length*PERM_COLS.length;
  return `<div class="roleedit-head"><button class="back" onclick="adminBackRoles()">${svg(SVS.arrow,18)}</button><div><div class="hr-h" style="margin:0">Edit Role</div><div class="muted2">Configure who can view, create, update or delete records across modules.</div></div></div>
   <div class="emp-sec">
     <div class="flk">Role Name <span style="color:var(--coral)">*</span></div><input class="flv" value="${r.name}" style="margin-bottom:18px">
     <div class="flk">Color</div><div class="swatchrow" style="margin-bottom:18px">${colors.map(c=>`<button class="swatch ${c===r.color?'on':''}" style="background:${c}" onclick="adminPickColor(this,'${c}')"></button>`).join('')}</div>
     <div class="flk">Description</div><textarea class="flv" rows="2" style="resize:vertical">${r.desc}</textarea>
   </div>
   <div class="emp-sec">
     <div class="emp-sec-h"><h3>Base Role</h3></div>
     <div class="lgate"><span>${svg('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',18)}</span><div><div class="t">For most org members, use <b>Employee</b> as the base and add extra permissions on top.</div><div class="s">Use manager roles only for team leads who need full module access.</div></div></div>
     <select class="flv">${['Sales Admin','Employee','Manager','Finance Admin','Client'].map(x=>`<option ${x===r.base?'selected':''}>${x}</option>`).join('')}</select>
   </div>
   <div class="emp-sec">
     <div class="emp-sec-h"><h3>Permissions</h3></div>
     <div class="permmods">${PERM_MODS.map(m=>`<button class="permmod ${m[0]===adminPermMod?'on':''}" data-mod="${m[0]}" onclick="adminSetPermMod('${m[0]}')">${m[0]}${m[1]?`<span class="pmct">${m[1]}</span>`:''}</button>`).join('')}</div>
     <div class="permaccess"><div><div class="pat">${adminPermMod} access</div><div class="pas">Module enabled — turn off to revoke all access in one click.</div></div><span class="toggle on" onclick="this.classList.toggle('on')"></span></div>
     <div class="permbar"><span id="permCount">${n}/${t} selected</span><button class="lnk2" onclick="permSelectAll()">Select all</button></div>
     ${permMatrix()}
   </div>
   <div class="roleedit-foot"><button class="pill" onclick="adminBackRoles()">Cancel</button><button class="abtn dark" style="padding:9px 22px;border-radius:999px;font-weight:700;font-size:13px" onclick="adminSaveRole()">Update</button></div>`;}

/* ============ CONSISTENT PAGE HEADER + ADDABLE METRICS (shared by all listings) ============ */
function pageHeader(t,s,icon){return `<div class="phead2">${icon?`<div class="picon">${svg(icon,20)}</div>`:''}<div><div class="pht">${t}</div>${s?`<div class="phs">${s}</div>`:''}</div></div>`;}
const METRIC_DEFS={
  leads:{open:['Open pipeline value',()=>fmt(leads.filter(l=>['New','Contacted','Qualified','Proposal'].includes(l.st)).reduce((a,l)=>a+l.val,0))],won:['Won',()=>fmt(leads.filter(l=>l.st==='Won').reduce((a,l)=>a+l.val,0))],count:['Active leads',()=>leads.filter(l=>!['Won','Lost'].includes(l.st)).length],winrate:['Win rate',()=>{const c=leads.filter(l=>['Won','Lost'].includes(l.st));return c.length?Math.round(leads.filter(l=>l.st==='Won').length/c.length*100)+'%':'0%';}],total:['Total leads',()=>leads.length],avg:['Avg deal',()=>fmt(Math.round(leads.reduce((a,l)=>a+l.val,0)/leads.length))]},
  tasks:{total:['Total tasks',()=>tasks.length],done:['Done',()=>tasks.filter(t=>t.st==='Done').length],doing:['In progress',()=>tasks.filter(t=>t.st==='Doing').length],todo:['To do',()=>tasks.filter(t=>t.st==='Todo').length],progress:['Progress',()=>Math.round(tasks.filter(t=>t.st==='Done').length/tasks.length*100)+'%']},
  hrdir:{active:['Active employees',()=>EMP.filter(e=>e.status==='Active').length],invited:['Sent invite',()=>EMP.filter(e=>e.status==='Invitation Sent').length],pending:['Pending verification',()=>1],onboarding:['Onboarding',()=>EMP.filter(e=>e.status==='Onboarding').length],total:['Total people',()=>EMP.length]},
  projdash:{total:['Active projects',()=>PROJECTS.length],ontrack:['On track',()=>PROJECTS.filter(p=>p.status==='On track').length],avg:['Avg progress',()=>Math.round(PROJECTS.reduce((a,p)=>a+p.pct,0)/PROJECTS.length)+'%'],due:['Due this month',()=>2]}
};
let METR={leads:['open','won','count','winrate'],tasks:['total','done','doing','progress'],hrdir:['active','invited','pending'],projdash:['total','ontrack','avg']};
function metricsInner(ctx){const ids=METR[ctx]||[],defs=METRIC_DEFS[ctx]||{};
  return ids.map(id=>{const d=defs[id];return d?`<div class="mcard"><button class="mx" onclick="metRemove('${ctx}','${id}')">${svg(SVS.x,10)}</button><div class="mv">${d[1]()}</div><div class="ml">${d[0]}</div></div>`:'';}).join('')+`<button class="madd" onclick="metAddOpen(event,'${ctx}')">${svg(SVS.plus,15)} Metric</button>`;}
function metricsBar(ctx){return `<div class="metrics" id="metricsBar">${metricsInner(ctx)}</div>`;}
function metRender(ctx){const el=document.getElementById('metricsBar');if(el)el.innerHTML=metricsInner(ctx);}
function metRemove(ctx,id){METR[ctx]=METR[ctx].filter(x=>x!==id);metRender(ctx);}
function metAdd(ctx,id){if(!METR[ctx].includes(id))METR[ctx].push(id);closePops();metRender(ctx);}
function metAddOpen(e,ctx){e.stopPropagation();const m=document.getElementById('metpal');const avail=Object.keys(METRIC_DEFS[ctx]||{}).filter(id=>!METR[ctx].includes(id));
  m.innerHTML='<div class="h">Add metric</div>'+(avail.length?avail.map(id=>`<button class="pi" onclick="metAdd('${ctx}','${id}')"><span class="ic">${svg(SVS.trend,15)}</span>${METRIC_DEFS[ctx][id][0]}</button>`).join(''):'<div style="padding:8px 10px;color:var(--ghost);font-size:13px">All metrics added</div>');
  const r=e.currentTarget.getBoundingClientRect();m.style.top=Math.min(r.bottom+6,window.innerHeight-300)+'px';m.style.left=Math.max(12,Math.min(r.left,window.innerWidth-240))+'px';openPop('metpal');}
function updateMetrics(){const el=document.getElementById('metricsBar');if(!el)return;if(curMod==='leads')el.innerHTML=metricsInner('leads');else if(curMod==='project'&&curType()!=='Overview'&&curType()!=='Details')el.innerHTML=metricsInner('tasks');else if(curMod==='projdash')el.innerHTML=metricsInner('projdash');else el.innerHTML='';}
/* projects landing — multi-view (Gallery default, +Table/Board/List) */
function renderDashWork(type){const el=document.getElementById('work');if(!el)return;
  if(type==='Gallery')el.innerHTML=dashGallery();else if(type==='Table')el.innerHTML=dashTable();else if(type==='Board')el.innerHTML=dashBoard();else if(type==='List')el.innerHTML=dashList();else el.innerHTML=placeholder(type);}
function dashGallery(){return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px;align-content:start;padding:6px 0">${PROJECTS.map(p=>`<div class="pcard" onclick="${p.open?"go('project')":"toast('Demo: only Apollo is wired')"}">
   <div class="ph"><div class="ic" style="background:${p.color}">${p.ic}</div><div><div class="nm">${p.name}</div><div class="cl">${p.client}</div></div><span class="pbadge" style="color:${p.sc};background:${p.sc}1f">${p.status}</span></div>
   <div class="bar"><div class="fill" style="width:${p.pct}%;background:${p.sc}"></div></div>
   <div class="meta"><span>${p.done}/${p.total} tasks</span><span>Due ${p.due}</span><span class="pc">${p.pct}%</span></div>
   <div class="avs">${p.team.map(t=>`<div class="av" style="background:${t[1]}">${t[0]}</div>`).join('')}</div></div>`).join('')}
   <div class="addcard" onclick="toast('New project')">${svg(SVS.plus,18)} New project</div></div>`;}
function dashTable(){return `<div class="tablewrap"><table><thead><tr><th>Project</th><th>Client</th><th>Status</th><th class="num">Tasks</th><th>Due</th><th class="num">Progress</th></tr></thead><tbody>${PROJECTS.map(p=>`<tr onclick="${p.open?"go('project')":"toast('Demo: only Apollo is wired')"}"><td><span class="owncell"><span class="eav" style="background:${p.color};width:26px;height:26px;font-size:10px">${p.ic}</span><b style="color:var(--navy)">${p.name}</b></span></td><td class="co">${p.client}</td><td><span style="color:${p.sc};font-weight:600">${p.status}</span></td><td class="num">${p.done}/${p.total}</td><td class="co">${p.due}</td><td class="num">${p.pct}%</td></tr>`).join('')}</tbody></table></div>`;}
function dashBoard(){const sts=[...new Set(PROJECTS.map(p=>p.status))];return `<div class="board color">`+sts.map(s=>{const items=PROJECTS.filter(p=>p.status===s);const cc=items[0]?items[0].sc:'var(--faint)';return `<div class="col"><div class="col-head" style="--cc:${cc}"><span class="pill"><span class="dot"></span>${s}</span><span class="ct">${items.length}</span></div><div class="col-body">${items.map(p=>`<div class="card" onclick="${p.open?"go('project')":"toast('Demo')"}"><div class="nm">${p.name}</div><div class="by">${p.client}</div><div class="mid"><span class="val">${p.pct}%</span></div><div class="foot"><span class="src">${p.done}/${p.total} tasks</span><span class="eav" style="background:${p.color};width:23px;height:23px;font-size:9px;margin-left:auto">${p.ic}</span></div></div>`).join('')||'<div class="col-empty">None</div>'}</div></div>`;}).join('')+`</div>`;}
function dashList(){const sts=[...new Set(PROJECTS.map(p=>p.status))];return sts.map(s=>{const items=PROJECTS.filter(p=>p.status===s);return `<div class="lg"><div class="lg-head"><span class="pill">${s}</span><span class="ct">${items.length}</span></div>${items.map(p=>`<div class="lrow" onclick="${p.open?"go('project')":"toast('Demo')"}"><span class="eav" style="background:${p.color};width:26px;height:26px;font-size:10px">${p.ic}</span><span class="nm">${p.name}</span><span class="co">${p.client} · ${p.done}/${p.total} tasks</span><span class="val">${p.pct}%</span></div>`).join('')}</div>`;}).join('');}

/* ============ SCHEMA-DRIVEN MODULE ENGINE (proves consolidation: a module = data + schema) ============ */
const ACCOUNTS=[
 {id:'AC01',name:'Reliance Retail',type:'Customer',owner:'Priya Nair',balance:480000,status:'Active',email:'ap@reliance.co',phone:'9769011309',terms:'Net 30',limit:1000000,av:'RR',color:'#C92F3A'},
 {id:'AC02',name:'Sunrise Pharma',type:'Customer',owner:'Sam Verma',balance:120000,status:'Overdue',email:'pay@sunrise.co',phone:'—',terms:'Net 15',limit:500000,av:'SP',color:'#2F6FED'},
 {id:'AC03',name:'GreenLeaf Organics',type:'Customer',owner:'Ravi Kapoor',balance:0,status:'Closed',email:'fin@greenleaf.co',phone:'—',terms:'Prepaid',limit:200000,av:'GO',color:'#15A06A'},
 {id:'AC04',name:'Horizon Realty',type:'Customer',owner:'Mei Lin',balance:260000,status:'Active',email:'accounts@horizon.co',phone:'—',terms:'Net 45',limit:800000,av:'HZ',color:'#E08A1E'}];
const VENDORS=[
 {id:'VN01',name:'PixelCraft Studio',type:'Design',owner:'Mei Lin',balance:60000,status:'Active',email:'hello@pixelcraft.co',phone:'+91 98220 14501',terms:'Net 30',limit:0,av:'PC',color:'#7C53E6',poc:'Aarav Shah',since:'04 Mar 2026',loc:'Bengaluru',gst:'29ABCDE1234F1Z5'},
 {id:'VN02',name:'CloudNine Hosting',type:'Infrastructure',owner:'Sam Verma',balance:24000,status:'Active',email:'billing@cloudnine.io',phone:'+91 99300 22817',terms:'Monthly',limit:0,av:'CN',color:'#2F6FED',poc:'Nikhil Rao',since:'18 Jan 2026',loc:'Mumbai',gst:'27FGHIJ5678K2Z3'},
 {id:'VN03',name:'AdReach Media',type:'Marketing',owner:'Priya Nair',balance:90000,status:'Overdue',email:'ar@adreach.co',phone:'+91 98110 90342',terms:'Net 15',limit:0,av:'AR',color:'#E08A1E',poc:'Divya Menon',since:'22 Apr 2026',loc:'Gurugram',gst:'06LMNOP9012Q3Z1'}];
const COLL={
 account:{name:'Accounts',sing:'Account',sub:'Customer & finance accounts',icon:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',data:()=>ACCOUNTS,metricCtx:'accounts',balLabel:'Balance',
   cols:[['Account','name','b'],['Type','type'],['Owner','owner'],['Balance','balance','money'],['Status','status','badge']],
   statuses:[['Active','#15A06A'],['Overdue','#E08A1E'],['Closed','#64748B']],
   tabs:['Overview','Transactions','Documents','Activity'],
   groups:[['Account Details',[['Account name','name'],['Type','type'],['Owner','owner'],['Terms','terms']]],['Finance',[['Balance','balance','money'],['Credit limit','limit','money'],['Status','status']]],['Contact',[['Email','email'],['Phone','phone']]]]},
 vendor:{name:'Vendors',sing:'Vendor',sub:'Suppliers & service providers',icon:'<path d="M3 9 5 4h14l2 5M4 9v11h16V9M4 9h16M9 13h6"/>',data:()=>VENDORS,metricCtx:'vendors',balLabel:'Payable',
   cols:[['Vendor','name','b'],['Category','type'],['Owner','owner'],['Payable','balance','money'],['Status','status','badge']],
   statuses:[['Active','#15A06A'],['Overdue','#E08A1E']],
   tabs:['Overview','Bills','Documents','Activity'],
   groups:[['Vendor Details',[['Vendor name','name'],['Category','type'],['Owner','owner'],['Terms','terms']]],['Finance',[['Payable','balance','money'],['Status','status']]],['Contact',[['Email','email'],['Phone','phone']]]]}};
METRIC_DEFS.accounts={total:['Accounts',()=>ACCOUNTS.length],active:['Active',()=>ACCOUNTS.filter(a=>a.status==='Active').length],bal:['Total balance',()=>fmt(ACCOUNTS.reduce((s,a)=>s+a.balance,0))],overdue:['Overdue',()=>ACCOUNTS.filter(a=>a.status==='Overdue').length]};
METRIC_DEFS.vendors={total:['Vendors',()=>VENDORS.length],active:['Active',()=>VENDORS.filter(v=>v.status==='Active').length],pay:['Total payable',()=>fmt(VENDORS.reduce((s,v)=>s+v.balance,0))],overdue:['Overdue',()=>VENDORS.filter(v=>v.status==='Overdue').length]};
METR.accounts=['total','active','bal'];METR.vendors=['total','active','pay'];
const STC={Active:'var(--ok)',Overdue:'#9A6B12',Closed:'var(--muted)'};function stColor(s){return STC[s]||'var(--muted)';}
let coll=null,collView='Table',collRec=null,collTab='Overview',collColl=true;
function curColl(){return COLL[coll];}function curRec(){return curColl().data().find(r=>r.id===collRec);}
function mountColl(key){coll=key;collRec=null;collView='Table';const c=COLL[key];
  document.getElementById('modcontent').innerHTML=`<div class="box"><div class="mc-top"><div class="title-wrap"><div class="picon">${svg(c.icon,20)}</div><div><h1>${c.name}</h1><div class="sub">${c.sub}</div></div></div><div class="sp"></div><span id="viewTools" style="display:flex;align-items:center;gap:3px">${modTools()}</span><div class="newbtn"><button class="a" onclick="toast('New ${c.sing}')">New</button><span class="b">${svg(SVS.caret,11)}</span></div></div>
   <div class="viewbar"><div class="switch2" style="margin-left:2px"><button class="${collView==='Table'?'on':''}" onclick="collV('Table')">Table</button><button class="${collView==='Board'?'on':''}" onclick="collV('Board')">Board</button><button class="${collView==='List'?'on':''}" onclick="collV('List')">List</button></div></div>
   <div style="padding:0 22px">${metricsBar(c.metricCtx)}</div>
   <div class="work" id="work" style="padding:14px 22px 40px"></div></div>`;
  renderColl();}
function collV(v){collView=v;renderColl();}
function renderColl(){const el=document.getElementById('work');if(!el)return;const c=curColl(),rows=c.data();el.innerHTML=collView==='Board'?collBoard(c,rows):collView==='List'?collList(c,rows):collTable(c,rows);}
function collCell(r,col){const v=r[col[1]];if(col[2]==='money')return fmt(v);if(col[2]==='badge')return `<span style="color:${stColor(v)};font-weight:600">${v}</span>`;if(col[2]==='b')return `<span class="owncell"><span class="eav" style="background:${r.color};width:26px;height:26px;font-size:10px">${r.av}</span><b style="color:var(--navy)">${v}</b></span>`;return v;}
function collTable(c,rows){return `<div class="tablewrap"><table><thead><tr>${c.cols.map(col=>`<th class="${col[2]==='money'?'num':''}">${col[0]}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr onclick="collOpen('${r.id}')">${c.cols.map(col=>`<td class="${col[2]==='money'?'num':''}">${collCell(r,col)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function collBoard(c,rows){return `<div class="board color">`+c.statuses.map(s=>{const items=rows.filter(r=>r.status===s[0]);return `<div class="col"><div class="col-head" style="--cc:${s[1]}"><span class="pill"><span class="dot"></span>${s[0]}</span><span class="ct">${items.length}</span></div><div class="col-body">${items.map(r=>`<div class="card" onclick="collOpen('${r.id}')"><div class="nm">${r.name}</div><div class="by">${r.type} · ${r.owner}</div><div class="foot"><span class="val">${fmt(r.balance)}</span><span class="eav" style="background:${r.color};width:23px;height:23px;font-size:9px;margin-left:auto">${r.av}</span></div></div>`).join('')||'<div class="col-empty">None</div>'}</div></div>`;}).join('')+`</div>`;}
function collList(c,rows){const gs=[...new Set(rows.map(r=>r.type))];return gs.map(g=>{const items=rows.filter(r=>r.type===g);return `<div class="lg"><div class="lg-head"><span class="pill">${g}</span><span class="ct">${items.length}</span></div>${items.map(r=>`<div class="lrow" onclick="collOpen('${r.id}')"><span class="eav" style="background:${r.color};width:26px;height:26px;font-size:10px">${r.av}</span><span class="nm">${r.name}</span><span class="co">${r.owner} · ${r.terms}</span><span class="val">${fmt(r.balance)}</span></div>`).join('')}</div>`;}).join('');}
function collOpen(id){if(coll==='vendor'){vnOpen(id);return;}collRec=id;collTab='Overview';collColl=true;mountCollRecord();}
function mountCollRecord(){const c=curColl(),r=curRec();collFace='info';
  document.getElementById('screen').innerHTML=`<div class="dwrap"><div class="dside"><button class="dctl x" onclick="collClose()" title="Close">${svg(SVS.x,19)}</button><div class="dnav"><button class="dctl" onclick="collNav(-1)" title="Previous (↑)">${svg('<path d="M18 15l-6-6-6 6"/>',21)}</button><button class="dctl" onclick="collNav(1)" title="Next (↓)">${svg('<path d="M6 9l6 6 6-6"/>',21)}</button></div></div><div class="dbox ${collColl?'collapsed':''}" id="cbox"><div class="dmain">
     <div class="crumbbar"><a onclick="go('${coll}')">${c.name}</a> <span class="sep">‹</span> <b>${r.name}</b></div>
     <div class="mc-top"><div class="title-wrap"><span class="eav" style="background:${r.color};width:38px;height:38px;font-size:14px">${r.av}</span><div><h1>${r.name}</h1><div class="sub">${r.type} · ${r.status}</div></div></div><div class="sp"></div><button class="paneltoggle" onclick="collTogglePanel()"><span id="cPtog">${collColl?'Show info':'Hide info'}</span>${svg('<path d="M15 18l-6-6 6-6"/>',14)}</button></div>
     <div class="emp-tabs">${c.tabs.map(t=>`<button class="vtab ${t===collTab?'on':''}" onclick="collSetTab('${t}')">${t}</button>`).join('')}</div>
     <div class="dcenter"><div class="inner" id="cinner">${collBody(c,r)}</div></div></div>
   <aside class="dpanel" id="cpanel"><div class="dpanel-head"><span class="nm">${r.name}</span><button class="ed" onclick="xpOpenFrom(this)" title="Expand">${svg('<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',15)}</button><button class="ed" style="margin-left:6px">${svg(SVS.pencil,15)}</button></div><div class="dpanel-body">${collPanel(c,r)}</div></aside></div></div>`;
  commSetHost({getFace:()=>collFace,setFace:collSetFace,content:commCollContent});}
function collClose(){go(coll);}
function collNav(dir){const rows=curColl().data();const i=rows.findIndex(x=>x.id===collRec);if(i<0)return;const n=(i+dir+rows.length)%rows.length;collRec=rows[n].id;xpClose();mountCollRecord();}
function collSetTab(t){collTab=t;document.getElementById('cinner').innerHTML=collBody(curColl(),curRec());document.querySelectorAll('.emp-tabs .vtab').forEach(b=>b.classList.toggle('on',b.textContent===t));}
function collTogglePanel(){collColl=!collColl;document.getElementById('cbox').classList.toggle('collapsed',collColl);document.getElementById('cPtog').textContent=collColl?'Show info':'Hide info';}
function collBody(c,r){if(collTab!=='Overview')return `<div class="emp-sec"><div class="emp-sec-h"><h3>${collTab}</h3></div><div class="muted2">No ${collTab.toLowerCase()} yet.</div></div>`;
  return c.groups.map(g=>`<div class="emp-sec"><div class="emp-sec-h"><h3>${g[0]}</h3><button class="iconedit" onclick="toast('Edit ${g[0]}')">${svg(SVS.pencil,15)}</button></div><div class="fgrid">${g[1].map(f=>{let v=r[f[1]];if(f[2]==='money')v=fmt(v);return `<div class="fld"><div class="flk">${f[0]}</div><input class="flv" value="${v}"></div>`;}).join('')}</div></div>`).join('');}
function collPanel(c,r){return `<div class="xipanel"><div class="xirow"><span class="k">Type</span><span class="v">${r.type}</span></div><div class="xirow"><span class="k">Status</span><span class="v" style="color:${stColor(r.status)}">${r.status}</span></div><div class="xirow"><span class="k">Owner</span><span class="v">${r.owner}</span></div></div>
   <div class="xipanel"><div class="xirow"><span class="k">${c.balLabel}</span><span class="v">${fmt(r.balance)}</span></div><div class="xirow"><span class="k">Terms</span><span class="v">${r.terms}</span></div></div>
   <div class="xigroup"><div class="gh">Contact ${chev2()}</div><div class="xipanel"><div class="xirow"><span class="k">Email</span><span class="v" style="font-size:13px">${r.email}</span></div><div class="xirow"><span class="k">Phone</span><span class="v">${r.phone}</span></div></div></div>`;}

/* ============ VENDOR RECORD — the locked record system (header cluster · activity panel · flexible chart grid) ============ */
let vnRec=null,vnTab='Overview',vnColl=true,vnFace='info';
function curVn(){return VENDORS.find(x=>x.id===vnRec);}
function vnSeed(v){return parseInt(v.id.replace(/\D/g,''))||1;}
/* OJO vendor score — derived from the vendor cell (status drives delivery/quality in the demo) */
function vnScore(v){const s=vnSeed(v);const onTime=Math.min(98,v.status==='Overdue'?56+s*2:84+s*3);const qual=Math.min(98,v.status==='Overdue'?64+s:86+s*2);
  const pct=Math.round((onTime+qual)/2);return {pct,onTime,qual,label:pct>=80?'Reliable':pct>=60?'Average':'Needs improvement'};}
function vnRfqList(v){const s=vnSeed(v);const t=[['Brand site revamp','Design retainer'],['Hosting renewal FY27','CDN migration'],['Always-on ad creatives','Festive campaign']][s-1]||['Service request','Retainer'];
  return [{id:`#RFQ_000${s}`,title:t[0],svc:v.type,bud:fmt(40000+s*10000),date:`0${s} Mar 2026`,status:'Accepted'},
          {id:`#RFQ_00${s+10}`,title:t[1],svc:v.type,bud:fmt(25000+s*5000),date:`1${s} May 2026`,status:s===3?'Sent':'Accepted'}];}
function vnBillList(v){const s=vnSeed(v);
  return [{id:`BILL-2026-0${s}1`,ref:`PO-10${s}`,amount:v.balance,due:v.status==='Overdue'?'05 Jun 2026':'28 Jun 2026',status:v.status==='Overdue'?'Overdue':'Pending'},
          {id:`BILL-2026-0${s}0`,ref:`PO-09${s}`,amount:18000+s*4000,due:`0${s} May 2026`,status:'Paid'}];}
function vnWinRate(v){const r=vnRfqList(v);const won=r.filter(x=>x.status==='Accepted').length;return [won,r.length,Math.round(won/r.length*100)];}
function vnInsights(v){const sc=vnScore(v);const wr=vnWinRate(v);const out=[];
  out.push(['next',v.status==='Overdue'?`<b>Next best action.</b> ${fmt(v.balance)} payable is past due — <a onclick="toast('Record payment (demo)')">record a payment</a> to protect the relationship.`:`<b>Next best action.</b> Engagement is healthy — send the next RFQ while pricing is competitive.`]);
  out.push(['cash',`<b>${fmt(v.balance)} outstanding</b> on ${v.terms} terms${v.status==='Overdue'?' — past due':''}.`]);
  out.push(['target',`<b>${wr[0]} of ${wr[1]} RFQs won (${wr[2]}%).</b> ${v.type} pricing has been competitive.`]);
  out.push(['clock',`<b>${sc.onTime}% on-time delivery.</b> ${sc.onTime>=80?'No client escalations in the last 12 months.':'1 client escalation in 12 months — monitor closely.'}`]);
  return out;}
function vnTopInsights(v){const sc=vnScore(v);const t=scoreColors(sc.pct);
  return `<div class="proj-ai">
    <div class="pa-score"><div class="pa-ring">${ring(sc.pct,t[0],72)}<span class="pa-pct" style="color:${t[1]}">${sc.pct}%</span></div><div class="pa-meta"><div class="pa-lbl" style="color:${t[1]}">${sc.label}</div><div class="pa-sub">${sc.onTime}% on-time · ${sc.qual}% quality · OJO vendor score</div></div></div>
    <div class="pa-ins">${ojoInsightsCard(vnInsights(v),'vendor')}</div></div>`;}
/* tiny bar chart for widget cells */
function vnBars(vals,color,w,h){const max=Math.max(...vals,1);const n=vals.length,bw=Math.floor(w/n)-6;
  return `<svg width="${w}" height="${h}" style="display:block">${vals.map((x,i)=>{const bh=Math.max(3,Math.round(x/max*(h-6)));return `<rect x="${i*(bw+6)}" y="${h-bh}" width="${bw}" height="${bh}" rx="3" fill="${color}" opacity="${(0.35+0.65*(x/max)).toFixed(2)}"/>`;}).join('')}</svg>`;}
/* chart/metric widgets — each a UI cell (render + bind:self); users add/remove per vendor */
const VNW={
 kpis:{title:'Engagement',body:v=>{const wr=vnWinRate(v);return `<div class="wkv"><span class="k">RFQs</span><span class="v">${wr[1]} · ${wr[0]} won</span></div><div class="wkv"><span class="k">Win rate</span><span class="v">${wr[2]}%</span></div><div class="wkv"><span class="k">Engagement value</span><span class="v">${fmt(v.balance+60000)}</span></div><div class="wkv"><span class="k">Escalations · 12m</span><span class="v">${v.status==='Overdue'?1:0}</span></div>`;}},
 spend:{title:'Spend · last 6 months',body:v=>{const s=vnSeed(v);const vals=[8,14,11,18,13,21].map(x=>x*(s+2));return `${vnBars(vals,'var(--info)',252,96)}<div class="wkv" style="margin-top:10px"><span class="k">Jan – Jun</span><span class="v">${fmt(vals.reduce((a,b)=>a+b,0)*1000)}</span></div>`;}},
 delivery:{title:'On-time delivery',body:v=>{const sc=vnScore(v);const vals=[sc.onTime-8,sc.onTime-3,sc.onTime-5,sc.onTime+1,sc.onTime-2,sc.onTime].map(x=>Math.max(20,x));return `${vnBars(vals,sc.onTime>=80?'var(--ok)':'var(--warn)',252,96)}<div class="wkv" style="margin-top:10px"><span class="k">6-month average</span><span class="v">${sc.onTime}%</span></div>`;}},
 outstanding:{title:'Outstanding',body:v=>`<div class="wkv"><span class="k">Payable</span><span class="v" style="color:${v.status==='Overdue'?'var(--coral-ink)':'var(--navy)'}">${fmt(v.balance)}</span></div><div class="wkv"><span class="k">Terms</span><span class="v">${v.terms}</span></div><div class="wkv"><span class="k">Status</span><span class="v" style="color:${stColor(v.status)}">● ${v.status}</span></div><div class="wkv"><span class="k">Next due</span><span class="v">${vnBillList(v)[0].due}</span></div>`},
 bills:{title:'Recent bills',body:v=>vnBillList(v).map(b=>`<div class="wkv"><span class="k">${b.id}</span><span class="v" style="color:${b.status==='Overdue'?'var(--coral-ink)':b.status==='Paid'?'var(--ok)':'var(--navy)'}">${fmt(b.amount)} · ${b.status}</span></div>`).join('')+`<div class="wkv"><span class="k"></span><span class="v"><a style="color:var(--info);font-weight:600;cursor:pointer" onclick="vnSetTab('Bills')">View all →</a></span></div>`},
 quality:{title:'Deliverable quality',body:v=>{const sc=vnScore(v);return `<div style="display:flex;justify-content:center;padding:6px 0;position:relative">${ring(sc.qual,sc.qual>=80?'var(--ok)':'var(--warn)',104)}<div style="position:absolute;inset:0;display:grid;place-items:center;font-weight:800;font-size:19px;color:var(--navy)">${sc.qual}%</div></div><div class="wkv"><span class="k">Rework requests</span><span class="v">${sc.qual>=80?'0':'2'} in 12m</span></div>`;}},
 team:{title:'Point of contact',body:v=>`<div class="wkv"><span class="k">POC</span><span class="v">${v.poc}${pcommMini(v.poc)}</span></div><div class="wkv"><span class="k">Email</span><span class="v" style="font-weight:500;font-size:13px">${v.email}</span></div><div class="wkv"><span class="k">Phone</span><span class="v">${v.phone}</span></div>`}};
let vnWsets={};
function vnWset(v){if(!vnWsets[v.id])vnWsets[v.id]=['kpis','spend','delivery','outstanding','bills'].map(t=>({id:'vw'+(++WUID),type:t}));return vnWsets[v.id];}
function vnGrid(v){return `<div class="bgrid">${vnWset(v).map(w=>{const d=VNW[w.type];if(!d)return '';
   return `<div class="bsec"><div class="bsec-h">${d.title}<span class="bx" onclick="vnWRemove('${w.id}')">${svg(SVS.x,12)}</span></div><div class="bcard">${d.body(v)}</div></div>`;}).join('')}
  <div class="bsec add"><div class="bsec-h">&nbsp;</div><div class="baddtile" onclick="vnAddOpen(event)" title="Add a chart">${svg(SVS.plus,20)}<span>Add a chart</span></div></div></div>`;}
function vnWRemove(id){const v=curVn();vnWsets[v.id]=vnWsets[v.id].filter(w=>w.id!==id);vnRender();toast('Chart removed');}
function vnAddOpen(e){e.stopPropagation();const m=document.getElementById('wpal');m.innerHTML='<div class="h">Add a chart</div><div class="wpalgrid">'+Object.keys(VNW).map(t=>`<button class="pli" onclick="vnWAdd('${t}')"><span class="ic">${svg(ICONS.Chart,16)}</span><span class="nm">${VNW[t].title}</span></button>`).join('')+'</div>';
  const r=e.currentTarget.getBoundingClientRect();m.style.top=Math.min(r.top,window.innerHeight-380)+'px';m.style.left=Math.max(12,Math.min(r.left,window.innerWidth-352))+'px';openPop('wpal');}
function vnWAdd(t){const v=curVn();vnWset(v).push({id:'vw'+(++WUID),type:t});closePops();vnRender();toast(VNW[t].title+' added');}
/* the vendor's recent history — hideable panel */
function vnActivity(v){const items=[];
  if(v.status==='Overdue')items.push(['#E08A1E','msg','Jun 8','OJO','flagged an overdue bill from',v.name]);
  else items.push(['#15A06A','done','Jun 8',v.owner,'approved a bill from',v.name]);
  items.push(['#2F6FED','msg','12 May',v.poc,'accepted',vnRfqList(v)[1].id]);
  items.push(['#7C53E6','msg',v.since.split(' ').slice(0,2).join(' '),v.owner,'onboarded',v.name]);
  return actRowsHTML(items,`<div class="more"><span class="av">${v.av}</span>${v.poc} active for this vendor</div>`);}
function vnInfo(){const v=curVn();return `<div class="ip"><div class="ip-actonly">${vnActivity(v)}</div></div>`;}
function commVendorContent(f){const v=curVn();return f==='info'?vnInfo():commChannel(f,v?v.poc:'this vendor');}
const VNTABICON={Overview:'star',RFQs:'List',Bills:'Table',Details:'Details',Notes:'notes'};
function vnStatusPill(s){const c={Accepted:'var(--ok)',Paid:'var(--ok)',Sent:'var(--info)',Pending:'#9A6B12',Overdue:'var(--coral-ink)'}[s]||'var(--muted)';return `<span style="color:${c};font-weight:600">${s}</span>`;}
function vnBody(){const v=curVn();
  const head=`<div class="lead-head"><div class="lh-id"><h1>${v.name}</h1>
    <div class="byline"><span class="av" style="background:${v.color}">${v.av}</span> <b>${v.type}</b> <span class="dotsep">·</span> <span style="color:${stColor(v.status)};font-weight:700">${v.status}</span> <span class="dotsep">·</span> owner ${v.owner}</div></div></div>`;
  if(vnTab==='RFQs')return head+`<div class="tablewrap" style="margin-top:6px"><table><thead><tr><th>RFQ ID</th><th>Title</th><th>Service</th><th class="num">Est. budget</th><th>Date</th><th>Status</th></tr></thead><tbody>${vnRfqList(v).map(r=>`<tr onclick="toast('Open ${r.id} (demo)')"><td><b style="color:var(--navy)">${r.id}</b></td><td>${r.title}</td><td class="co">${r.svc}</td><td class="num">${r.bud}</td><td class="co">${r.date}</td><td>${vnStatusPill(r.status)}</td></tr>`).join('')}</tbody></table></div>`;
  if(vnTab==='Bills')return head+`<div class="tablewrap" style="margin-top:6px"><table><thead><tr><th>Bill ID</th><th>Reference</th><th class="num">Amount</th><th>Due</th><th>Status</th></tr></thead><tbody>${vnBillList(v).map(b=>`<tr onclick="toast('Open ${b.id} (demo)')"><td><b style="color:var(--navy)">${b.id}</b></td><td class="co">${b.ref}</td><td class="num">${fmt(b.amount)}</td><td class="co">${b.due}</td><td>${vnStatusPill(b.status)}</td></tr>`).join('')}</tbody></table></div>`;
  if(vnTab==='Details'){const about=[['Category',v.type],['Status',v.status],['Owner',v.owner],['Terms',v.terms],['Onboarded',v.since],['Location',v.loc]];
    const contact=[['POC',v.poc+pcommMini(v.poc)],['Email',v.email],['Phone',v.phone]];
    const fin=[['Payable',fmt(v.balance)],['GST',v.gst],['PAN','—'],['Bank A/C','—']];
    const block=(h,rows)=>`<div class="pd-block"><div class="pd-h">${h}</div><div class="pd-grid">${rows.map(([k,x])=>`<div class="pd-cell"><div class="pd-k">${k}</div><div class="pd-v">${x}</div></div>`).join('')}</div></div>`;
    return head+`<div class="pdetails" style="padding:6px 0 30px">${block('About this vendor',about)}${block('Contact',contact)}${block('Finance & tax',fin)}</div>`;}
  if(vnTab==='Notes')return head+`<div class="rec-block" style="margin-top:6px"><div class="rec-block-h">Notes</div><div class="free notes-free" contenteditable="true" data-ph="Write a note about this vendor…"></div></div>`;
  return head+vnTopInsights(v)+vnGrid(v);}
function vnRender(){const el=document.getElementById('vninner');if(el)el.innerHTML=vnBody();}
function vnSetTab(t){vnTab=t;vnRender();document.querySelectorAll('#vnbox .viewbar .vtab').forEach(b=>b.classList.toggle('on',b.textContent.trim()===t));}
function vnToggle(){vnColl=!vnColl;document.getElementById('vnbox').classList.toggle('collapsed',vnColl);
  const b=document.getElementById('vnPtogBtn');if(b){b.classList.toggle('on',!vnColl);b.title=vnColl?'Show activity':'Hide activity';}}
function vnNav(dir){const i=VENDORS.findIndex(x=>x.id===vnRec);if(i<0)return;vnRec=VENDORS[(i+dir+VENDORS.length)%VENDORS.length].id;xpClose();mountVendor();}
function vnOpen(id){vnRec=id;vnTab='Overview';vnColl=true;vnFace='info';mountVendor();}
function mountVendor(){const v=curVn();
  document.getElementById('screen').innerHTML=`<div class="dwrap"><div class="dside"><div class="dnav"><button class="dctl" onclick="vnNav(-1)" title="Previous (↑)">${svg('<path d="M18 15l-6-6-6 6"/>',21)}</button><button class="dctl" onclick="vnNav(1)" title="Next (↓)">${svg('<path d="M6 9l6 6 6-6"/>',21)}</button></div></div>
   <div class="dbox ${vnColl?'collapsed':''}" id="vnbox"><div class="dmain">
    <div class="dtop"><div class="crumbs"><a onclick="go('vendor')">Vendors</a> <span class="sep">‹</span> ${vnTab}</div><div class="sp"></div>
      <div class="commpill">${[['call','Call'],['email','Email'],['chat','Message']].map(([f,l])=>`<button title="${l} ${v.poc}" onclick="openComm('${f}')">${faceIcon(f)}</button>`).join('')}</div>
      <button class="ptog-ic ${vnColl?'':'on'}" id="vnPtogBtn" onclick="vnToggle()" title="${vnColl?'Show activity':'Hide activity'}">${svg('<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/>',17)}</button>
      <button class="mtool hdr-x" onclick="go('vendor')" title="Close">${svg(SVS.x,18)}</button></div>
    <div class="viewbar">${['Overview','RFQs','Bills','Details','Notes'].map(x=>`<button class="vtab ${x===vnTab?'on':''}" onclick="vnSetTab('${x}')"><span class="${x==='Overview'?'star':''}">${svg(ICONS[VNTABICON[x]],14)}</span>${x}</button>`).join('')}</div>
    <div class="dcenter"><div class="inner" id="vninner">${vnBody()}</div></div></div>
   <aside class="dpanel"><div class="dpanel-head"><span class="nm">Recent activity</span></div><div class="dpanel-body" id="vnpanelbody">${vnInfo()}</div></aside></div></div>`;
  commSetHost({getFace:()=>vnFace,setFace:f=>{vnFace=f;},content:commVendorContent});}

/* ============ START ============ */
/* ============ ACCOUNTS MODULE (cell-style, sub-nav like HR) ============ */
const ACCNAV=[['tasks','Tasks'],['overview','Overview'],['accounting','Accounting'],['invoice','Invoice/Sales'],['bills','Bills/Purchase'],['payroll','Payroll'],['settings','Settings']];
let acctPage='overview',acctTab='pl',acctDoc=null,acctNavCollapsed=false;
const SELLER={name:'Reliance',email:'vinotham@gmail.com',phone:'9769033059',addr:'123, 7th cross, 8th street, 9th ring, Bengaluru, Karnataka, India',gstin:'29AJPPV9765B',bank:'sbi',acc:'23452435',ifsc:'ICIC0000359'};
const inr=n=>'₹'+new Intl.NumberFormat('en-IN',{maximumFractionDigits:2}).format(n);
const nf=n=>new Intl.NumberFormat('en-IN',{maximumFractionDigits:2}).format(n);
const JOURNALS=[
 {id:'JE-2026-09436580',dt:'31 May 2026 · 12:07 PM',type:'Payment',narr:'Purchase of a book as an expense',dr:100,cr:100,status:'Posted',voucher:'Payment Voucher',entries:[['Office Supplies','Book purchase expense',100,0],['Cash in Hand','Payment for book purchase',0,100]]},
 {id:'JE-2026-48419964',dt:'09 May 2026 · 11:10 PM',type:'Sales',narr:'Revenue recognition - Invoice INV/26-27/0003',dr:348100,cr:348100,status:'Posted',voucher:'Sales Voucher',entries:[['Accounts Receivable','Invoice raised',348100,0],['Sales Revenue','Revenue recognised',0,348100]]},
 {id:'JE-2026-41055911',dt:'01 May 2026 · 6:40 PM',type:'Sales',narr:'Revenue recognition - Invoice INV/26-27/0002',dr:106200,cr:106200,status:'Posted',voucher:'Sales Voucher',entries:[['Accounts Receivable','Invoice raised',106200,0],['Sales Revenue','Revenue recognised',0,106200]]},
 {id:'JE-2026-00004',dt:'01 May 2026 · 6:40 PM',type:'Receipt',narr:'Payment received - Payment 2d93488b',dr:106200,cr:106200,status:'Posted',voucher:'Receipt Voucher',entries:[['Bank','Payment received',106200,0],['Accounts Receivable','Settle invoice',0,106200]]},
 {id:'JE-2026-27985877',dt:'16 Mar 2026 · 7:56 AM',type:'Payment',narr:'Payroll - Pay Run for March 2026 (1 employee)',dr:20000,cr:20000,status:'Posted',voucher:'Payment Voucher',entries:[['Salaries & Wages','Payroll for March',20000,0],['Bank','Salary disbursed',0,20000]]},
 {id:'JE-2026-00002',dt:'28 Feb 2026 · 2:14 PM',type:'Receipt',narr:'Payment received - Payment 54db8c',dr:59000,cr:59000,status:'Posted',voucher:'Receipt Voucher',entries:[['Bank','Payment received',59000,0],['Accounts Receivable','Settle invoice',0,59000]]},
 {id:'JE-2026-67190521',dt:'28 Feb 2026 · 1:56 PM',type:'Sales',narr:'Revenue recognition - Invoice INV-2F22E2-2026-0002',dr:59000,cr:59000,status:'Posted',voucher:'Sales Voucher',entries:[['Accounts Receivable','Invoice raised',59000,0],['Sales Revenue','Revenue recognised',0,59000]]}];
const INVOICES=[
 {id:'INV/26-27/0003',client:'Hexathalon Apparel Brand',av:'HB',color:'#E08A1E',project:'-',amount:348100,due:'06 Jun',status:'Due in 1 days',date:'07 May 2026',dueFull:'06 Jun 2026',email:'amanuay@gmail.com',phone:'+918892384323',item:'Branding — Full payment (Milestone 1)',rate:295000},
 {id:'INV/26-27/0002',client:'Movie',av:'MO',color:'#2F6FED',project:'-',amount:106200,due:'31 May',status:'Paid',date:'01 May 2026',item:'Production retainer',rate:106200},
 {id:'PROF/0004',client:'Yamuna',av:'YA',color:'#E11D74',project:'ppc for d2c - Digital Marketing',amount:2950,due:'20 May',status:'Draft',date:'05 May 2026',item:'PPC management fee',rate:2950},
 {id:'PROF/0003',client:'Audio Upload 8474a97b',av:'A8',color:'#E08A1E',project:'Punjabi project0-asdfasdf',amount:117856.04,due:'20 May',status:'Draft',date:'05 May 2026',item:'Audio production',rate:117856.04},
 {id:'INV/26-27/0001',client:'www.lollypop.com',av:'WW',color:'#C92F3A',project:'-',amount:1608930,due:'08 May',status:'Paid',date:'08 Apr 2026',item:'Brand & web revamp',rate:1608930},
 {id:'PROF/0001',client:'layman brothers',av:'LB',color:'#E11D74',project:'-',amount:23600,due:'02 May',status:'Over due',date:'02 Apr 2026',item:'Consulting',rate:23600},
 {id:'INV-2F22E2-2026-0002',client:'d2c brnad',av:'DB',color:'#2F6FED',project:'-',amount:59000,due:'30 Mar',status:'Paid',date:'28 Feb 2026',item:'Campaign retainer',rate:59000},
 {id:'INV-2F22E2-2026-0001',client:'Acme Technologies Pvt Ltd',av:'AL',color:'#E08A1E',project:'-',amount:590000,due:'30 Mar',status:'Draft',date:'28 Feb 2026',item:'Platform build',rate:590000}];
const BILLS=[
 {id:'BILL-2026-00002',date:'29 Apr 2026',vendor:'Autobots',ref:'23413',billNo:'23413',amount:152998.47,balance:138443.27,due:'15 Apr 2026',status:'Draft',tds:13333.20,paid:1222,notes:'test the bill',items:[['test buy','Utilities',1,33333,5],['computere','Salaries & Wages',3,33333,18]]},
 {id:'BILL-2026-00001',date:'13 Apr 2026',vendor:'www.lollypop.com',ref:'PROF/0001',amount:29500,balance:29500,due:'13 May 2026',status:'Overdue',items:[['Design retainer','Design Expense',1,29500,0]]},
 {id:'BILL-2026-00003',date:'10 Apr 2026',vendor:'Autobots',ref:'-',amount:442.89,balance:442.89,due:'17 Apr 2026',status:'Pending Approval',items:[['Misc supplies','Office Supplies',1,442.89,0]]}];
const PAYRUNS=[{id:'PR03',title:'Pay Run for March 2026',status:'Paid',net:20000,cost:20000,tax:0,payDate:'28 Feb 2026',payDays:30,emps:1,created:'16 Mar 2026'}];
const FISCAL=[['FY 2026-27','01 Apr 2026','30 Mar 2027','Active',1],['FY 2025-26','31 Mar 2025','30 Mar 2026','Inactive',0]];
const COA=[['1000','Cash in Hand','Asset'],['1100','Bank','Asset'],['1200','Accounts Receivable','Asset'],['2100','Accounts Payable','Liability'],['3000','Owner Equity','Equity'],['4000','Sales Revenue','Income'],['5000','Salaries & Wages','Expense'],['5100','Office Supplies','Expense'],['5200','Utilities','Expense']];
const ACCSC={Posted:['#15A06A','#E4F4EC'],Paid:['#15A06A','#E4F4EC'],Draft:['#2F6FED','#E7EEFD'],'Over due':['#C92F3A','#FDECED'],Overdue:['#C92F3A','#FDECED'],'Due in 1 days':['#9A6B12','#FBEFD8'],'Pending Approval':['#2F6FED','#E7EEFD'],'Partially Paid':['#9A6B12','#FBEFD8'],Active:['#15A06A','#E4F4EC'],Inactive:['#5C6573','#EFEAE6'],Current:['#15A06A','#E4F4EC']};
function apill(s){const c=ACCSC[s]||['#5C6573','#EFEAE6'];return `<span class="ebadge" style="color:${c[0]};background:${c[1]}">${s}</span>`;}
METRIC_DEFS.invoices={total:['Total Invoices',()=>INVOICES.length],pending:['Approval Pending',()=>INVOICES.filter(i=>i.status==='Draft').length],overdue:['Over Due',()=>inr(INVOICES.filter(i=>i.status==='Over due').reduce((s,i)=>s+i.amount,0))],recv:['Total Receivable',()=>inr(INVOICES.reduce((s,i)=>s+i.amount,0))],paid:['Paid',()=>INVOICES.filter(i=>i.status==='Paid').length]};
METRIC_DEFS.bills={total:['Total Bills',()=>BILLS.length],due:['Balance Due',()=>inr(BILLS.reduce((s,b)=>s+b.balance,0))],overdue:['Overdue',()=>BILLS.filter(b=>b.status==='Overdue').length],pending:['Pending Approval',()=>BILLS.filter(b=>b.status==='Pending Approval').length]};
METR.invoices=['total','pending','overdue','recv'];METR.bills=['total','due','overdue'];
function acctTools(){return `<button class="back" onclick="toast('Filter')">${svg(SVS.filter,17)}</button><button class="back" onclick="toast('Sort')">${svg(SVS.sort,17)}</button>`;}
function mountAccounts(){acctDoc=null;document.getElementById('screen').innerHTML=`<div class="box hrbox ${acctNavCollapsed?'navcollapsed':''}" id="acctbox"><aside class="hrnav"><div class="hrnav-top" style="justify-content:flex-end"><button class="hrcollapse" onclick="acctNavToggle()" title="Collapse">${svg('<path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>',16)}</button></div>${ACCNAV.map(p=>`<a class="${acctPage===p[0]?'on':''}" onclick="acctSet('${p[0]}')">${p[1]}</a>`).join('')}</aside><div class="hrmain" id="acctmain"></div><button class="hrreopen" onclick="acctNavToggle()" title="Show menu">${svg('<path d="M3 6h18M3 12h18M3 18h18"/>',17)}</button></div>`;renderAcct();}
function acctNavToggle(){acctNavCollapsed=!acctNavCollapsed;document.getElementById('acctbox').classList.toggle('navcollapsed',acctNavCollapsed);}
function acctSet(p){acctPage=p;acctDoc=null;acctTab={overview:'pl',accounting:'journals',bills:'bills',settings:'fy'}[p]||null;document.querySelectorAll('#acctbox .hrnav a').forEach((a,i)=>a.classList.toggle('on',ACCNAV[i]&&ACCNAV[i][0]===p));renderAcct();}
function acctTabSet(t){acctTab=t;renderAcct();}
function acctOpen(kind,id){acctDoc={kind,id};renderAcct();}
function acctBack(){acctDoc=null;renderAcct();}
function renderAcct(){const el=document.getElementById('acctmain');if(!el)return;
  if(acctDoc){el.innerHTML=acctDetail();return;}
  const p=acctPage;
  el.innerHTML=p==='overview'?acctOverview():p==='accounting'?acctAccounting():p==='invoice'?acctInvoice():p==='bills'?acctBills():p==='payroll'?acctPayroll():p==='settings'?acctSettings():acctTasks();}
function acctTasks(){taskModule='account';taskScope='account';taskContainer='acctmain';return tasksListHTML('account');}
/* ---- Overview: P&L / Balance Sheet ---- */
function acctOverview(){const tab=acctTab||'pl';
  const tabs=`<div class="atabs"><button class="atab ${tab==='pl'?'on':''}" onclick="acctTabSet('pl')">Profit &amp; Loss Statement</button><button class="atab ${tab==='bs'?'on':''}" onclick="acctTabSet('bs')">Balance Sheet</button></div>`;
  if(tab==='bs')return tabs+pageHeader('Balance Sheet','As on 30 Jun 2026')+`<div class="tablewrap"><table><thead><tr><th>Account</th><th class="num">Total (INR)</th></tr></thead><tbody><tr><td><b>Assets</b></td><td class="num">₹0</td></tr><tr><td>Current Assets</td><td class="num">₹0</td></tr><tr><td>Fixed Assets</td><td class="num">₹0</td></tr><tr><td><b>Liabilities</b></td><td class="num">₹0</td></tr><tr><td>Current Liabilities</td><td class="num">₹0</td></tr><tr><td><b>Equity</b></td><td class="num">₹0</td></tr></tbody></table></div>`;
  return tabs
   +`<div class="phead2" style="align-items:flex-start"><div><div class="pht">Profit &amp; Loss</div><div class="phs">From 01/06/2026 To 30/06/2026</div></div><div style="margin-left:auto;display:flex;gap:8px;align-items:center"><button class="back" onclick="toast('Share')">${svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',16)}</button><button class="manual" onclick="toast('Export')">Export ${svg(SVS.caret,11)}</button></div></div>`
   +`<div class="hstats"><div class="hstat"><div class="v" style="color:#2F6FED">₹0</div><div class="l">Total Income this month</div></div><div class="hstat"><div class="v" style="color:var(--coral-ink)">₹0</div><div class="l">Total Expense this month</div></div><div class="hstat"><div class="v" style="color:var(--ok)">₹0</div><div class="l">Total Profit this month</div></div></div>`
   +`<div class="ojorev"><div class="ic">✦</div><div style="flex:1"><div class="oh">OJO review</div><div style="font-weight:700;color:var(--navy);margin-top:6px">Click refresh to get AI-powered insights.</div><div class="ot">OJO will analyze your financial data and provide actionable recommendations.</div><div class="note">${svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',12)} Only aggregated totals are analyzed. No transaction details or names are shared.</div></div><button class="reload" onclick="toast('Analyzing…')">${svg('<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',16)}</button><div class="sc"><div class="v">-/100</div><div class="l">Health Score</div></div></div>`
   +`<div class="selrow"><div class="selfield"><div class="k">Fiscal Year</div><button class="manual" style="width:100%;justify-content:space-between" onclick="toast('FY')">FY 2026-27 ${svg(SVS.caret,12)}</button></div><div class="selfield"><div class="k">Date range</div><button class="manual" style="width:100%;justify-content:space-between" onclick="toast('Range')">This Month ${svg(SVS.caret,12)}</button></div><div class="selfield"><div class="k">Profit View</div><button class="manual" style="width:100%;justify-content:space-between" onclick="toast('View')">Absolute (₹) ${svg(SVS.caret,12)}</button></div></div>`
   +`<div class="tablewrap"><table><thead><tr><th style="width:46px"></th><th>Account</th><th class="num">Total (INR)</th></tr></thead><tbody>
     <tr><td class="co">1</td><td>${svg(SVS.caret,12)} <b>Income</b></td><td class="num">₹0</td></tr>
     <tr><td class="co">2</td><td><b>Total Income (Cr)</b></td><td class="num">₹0</td></tr>
     <tr><td class="co">3</td><td></td><td class="num" style="color:var(--ghost)">₹00.00</td></tr>
     <tr><td class="co">4</td><td>${svg(SVS.caret,12)} <b>Expenses</b></td><td class="num">₹0</td></tr>
     <tr><td class="co">5</td><td><b>Total Expense (Dr)</b></td><td class="num">₹0</td></tr>
     <tr><td class="co">6</td><td></td><td class="num" style="color:var(--ghost)">₹00.00</td></tr>
     <tr><td class="co">7</td><td><b>Net Profit</b></td><td class="num">₹0</td></tr></tbody></table></div>`;}
/* ---- Accounting: Journals / Trial Balance ---- */
function acctAccounting(){const tab=acctTab||'journals';
  const tabs=`<div class="atabs"><button class="atab ${tab==='journals'?'on':''}" onclick="acctTabSet('journals')">Journals</button><button class="atab ${tab==='tb'?'on':''}" onclick="acctTabSet('tb')">Trial Balance</button></div>`;
  if(tab==='tb')return tabs+pageHeader('Trial Balance','As on 30 Jun 2026')+`<div class="tablewrap"><table><thead><tr><th>Account</th><th class="num">Debit (INR)</th><th class="num">Credit (INR)</th></tr></thead><tbody>${COA.map(a=>`<tr><td><b style="color:var(--navy)">${a[0]}</b> · ${a[1]}</td><td class="num">₹0</td><td class="num">₹0</td></tr>`).join('')}<tr style="background:var(--surface-2)"><td><b>Total</b></td><td class="num"><b>₹0</b></td><td class="num"><b>₹0</b></td></tr></tbody></table></div>`;
  return tabs+pageHeader('Accounting','Journal entries · double-entry ledger')
   +`<div style="font-weight:700;color:var(--navy);margin:6px 0 10px">New Entry</div>`
   +`<div class="newentry"><div class="inp"><span>Describe the transaction... e.g., Paid ₹12,500 to Sharma Travels for client visit to Mumbai</span><button class="send">${svg(SVS.up,15)}</button></div><button class="manual">${svg(SVS.plus,15)} Manual Entry</button></div>`
   +`<div class="muted2" style="margin:-12px 0 18px">OJO will identify the accounts, taxes, and journal structure for you.</div>`
   +`<div style="display:flex;justify-content:flex-end;gap:6px;margin-bottom:10px">${acctTools()}</div>`
   +`<div class="tablewrap"><table><thead><tr><th>Entry ID</th><th>Date &amp; Time</th><th>Type</th><th>Narration</th><th class="num">Debit (INR)</th><th class="num">Credit (INR)</th><th>Status</th></tr></thead><tbody>
     ${JOURNALS.map(j=>`<tr onclick="acctOpen('journal','${j.id}')"><td><b style="color:var(--navy)">${j.id}</b></td><td class="co">${j.dt}</td><td>${j.type}</td><td>${j.narr.length>34?j.narr.slice(0,34)+'…':j.narr}</td><td class="num">${fmt(j.dr)}</td><td class="num">${fmt(j.cr)}</td><td>${apill(j.status)}</td></tr>`).join('')}</tbody></table></div>`;}
/* ---- Invoice / Sales ---- */
function acctInvoice(){return pageHeader('Invoices','Sales invoices & receivables')
   +metricsBar('invoices')
   +`<div class="viewbar" style="padding:6px 0 12px"><div class="hsearch" style="max-width:260px">${svg(SVS.search,15)} Search invoices</div><div style="margin-left:auto;display:flex;gap:8px;align-items:center">${acctTools()}<div class="newbtn"><button class="a" onclick="toast('New invoice')">New</button><span class="b">${svg(SVS.caret,11)}</span></div></div></div>`
   +`<div class="tablewrap"><table><thead><tr><th>Invoice</th><th>Client</th><th>Project</th><th class="num">Amount</th><th>Due Date</th><th>Status</th></tr></thead><tbody>
     ${INVOICES.map(i=>`<tr onclick="acctOpen('invoice','${i.id}')"><td><b style="color:var(--navy)">${i.id}</b></td><td><span class="owncell"><span class="eav" style="background:${i.color};width:26px;height:26px;font-size:10px">${i.av}</span>${i.client}</span></td><td class="co">${i.project}</td><td class="num">INR ${nf(i.amount)}</td><td class="co">${i.due}</td><td>${apill(i.status)}</td></tr>`).join('')}</tbody></table></div>`;}
/* ---- Bills / Purchases ---- */
function acctBills(){const tab=acctTab||'bills';
  const tabs=`<div class="atabs"><button class="atab ${tab==='bills'?'on':''}" onclick="acctTabSet('bills')">Bills</button><button class="atab ${tab==='items'?'on':''}" onclick="acctTabSet('items')">Items</button></div>`;
  if(tab==='items')return tabs+pageHeader('Items','Purchasable items &amp; services')+`<div class="emp-sec"><div class="muted2">No items configured yet. (Demo)</div></div>`;
  return tabs+pageHeader('Bills &amp; Purchases','Vendor bills &amp; payables')
   +metricsBar('bills')
   +`<div class="viewbar" style="padding:6px 0 12px"><div style="margin-left:auto;display:flex;gap:8px;align-items:center">${acctTools()}<button class="manual">All Types ${svg(SVS.caret,11)}</button><div class="newbtn"><button class="a" onclick="toast('New bill')">＋ New Bill</button></div></div></div>`
   +`<div class="tablewrap"><table><thead><tr><th>Bill ID</th><th>Date</th><th>Vendor</th><th>Ref No.</th><th class="num">Amount</th><th class="num">Balance</th><th>Due Date</th><th>Status</th></tr></thead><tbody>
     ${BILLS.map(b=>`<tr onclick="acctOpen('bill','${b.id}')"><td><b style="color:var(--navy)">${b.id}</b></td><td class="co">${b.date}</td><td>${b.vendor}</td><td class="co">${b.ref}</td><td class="num">${inr(b.amount)}</td><td class="num">${inr(b.balance)}</td><td class="co">${b.due}</td><td>${apill(b.status)}</td></tr>`).join('')}</tbody></table></div>`;}
/* ---- Payroll ---- */
function acctPayroll(){return pageHeader('Payroll','Pay runs &amp; salary disbursements')
   +`<div class="viewbar" style="padding:6px 0 14px"><button class="manual">All Types ${svg(SVS.caret,11)}</button><div style="margin-left:auto;display:flex;gap:8px;align-items:center">${acctTools()}<div class="hsearch" style="max-width:240px">${svg(SVS.search,15)} Search</div></div></div>`
   +PAYRUNS.map(p=>`<div class="payrun-card" onclick="acctOpen('payrun','${p.id}')"><div class="pc-h">${p.title} ${apill(p.status)}</div><div class="pc-i"><div class="l">Employees' Net Pay</div><div class="v">${fmt(p.net)}</div></div><div class="pc-i"><div class="l">Payment Date</div><div class="v">${p.payDate}</div></div><div class="pc-i"><div class="l">Pay days</div><div class="v">${p.payDays}</div></div><div class="pc-i"><div class="l">No. of Employees</div><div class="v">${p.emps}</div></div><div class="pc-i"><div class="l">Created Date</div><div class="v">${p.created}</div></div></div>`).join('');}
/* ---- Settings: Fiscal Years / Chart of Accounts ---- */
function acctSettings(){const tab=acctTab||'fy';
  const tabs=`<div class="atabs"><button class="atab ${tab==='fy'?'on':''}" onclick="acctTabSet('fy')">Fiscal Years</button><button class="atab ${tab==='coa'?'on':''}" onclick="acctTabSet('coa')">Chart of Accounts</button></div>`;
  if(tab==='coa')return tabs+pageHeader('Chart of Accounts','Your ledger account structure')+`<div class="tablewrap"><table><thead><tr><th>Code</th><th>Account</th><th>Type</th></tr></thead><tbody>${COA.map(a=>`<tr><td><b style="color:var(--navy)">${a[0]}</b></td><td>${a[1]}</td><td class="co">${a[2]}</td></tr>`).join('')}</tbody></table></div>`;
  return tabs+pageHeader('Settings','Fiscal years &amp; organization configuration')
   +`<div style="display:flex;align-items:flex-start;margin:6px 0 12px"><div><div style="font-weight:700;color:var(--navy);font-size:16px">Fiscal Years ${svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',13)}</div><div class="muted2">Manage your organization's financial years</div></div><div style="margin-left:auto"><button class="abtn dark" style="padding:9px 16px;border-radius:10px;font-weight:700;font-size:13px;display:inline-flex;align-items:center;gap:7px;background:var(--navy);color:#fff" onclick="toast('New Fiscal Year')">${svg(SVS.plus,14)} New Fiscal Year</button></div></div>`
   +`<div class="tablewrap"><table><thead><tr><th>Name</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${FISCAL.map(f=>`<tr><td><b style="color:var(--navy)">${f[0]}</b> ${f[4]?apill('Current'):''}</td><td class="co">${f[1]}</td><td class="co">${f[2]}</td><td>${apill(f[3])}</td><td>${f[4]?`<button class="iconedit">${svg(SVS.more,15)}</button>`:''}</td></tr>`).join('')}</tbody></table></div>`
   +`<div class="aboutcard"><div class="t">About Fiscal Years</div><ul><li>Only one fiscal year can be <b>Active</b> at a time</li><li><b>Active</b>: Allows recording transactions</li><li><b>Closed</b>: Year-end closing completed, no new transactions</li><li><b>Locked</b>: Permanently sealed, no modifications allowed</li></ul></div>`
   +`<div style="font-weight:700;color:var(--navy);font-size:16px;margin:18px 0 4px">GST Settings ${svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',13)}</div><div class="muted2" style="margin-bottom:10px">Configure your organization's GST number</div><div style="border:1px solid var(--line);border-radius:14px;padding:16px 18px;display:flex;align-items:center"><div><div class="muted2">GSTIN</div><div style="font-weight:700;color:var(--navy)">${SELLER.gstin}</div></div><div style="margin-left:auto;display:flex;gap:10px"><button class="iconedit">${svg(SVS.pencil,15)}</button><button class="iconedit">${svg('<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',15)}</button></div></div>`;}
/* ---- Detail pages ---- */
function acctDetail(){const d=acctDoc;
  if(d.kind==='journal')return acctJournal(JOURNALS.find(j=>j.id===d.id));
  if(d.kind==='invoice')return acctInvoiceDoc(INVOICES.find(i=>i.id===d.id));
  if(d.kind==='bill')return acctBillDoc(BILLS.find(b=>b.id===d.id));
  if(d.kind==='payrun')return acctPayrunDoc(PAYRUNS.find(p=>p.id===d.id));
  return '';}
function acctJournal(j){const tot=j.entries.reduce((a,e)=>[a[0]+e[2],a[1]+e[3]],[0,0]);
  return `<div class="docpage"><div class="acctback"><button class="back" onclick="acctBack()">${svg(SVS.arrow,18)}</button></div>
   <h1 style="font-size:26px;font-weight:800;color:var(--navy)">${j.narr}</h1>
   <div class="muted2" style="margin:2px 0 18px">${j.id} • System Generated</div>
   <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div style="font-weight:700;font-size:16px;color:var(--navy)">${j.voucher}</div><span style="margin-left:auto">${apill(j.status)}</span></div>
   <div class="muted2" style="display:flex;align-items:center;gap:16px;margin-bottom:18px"><span style="display:inline-flex;align-items:center;gap:6px">${svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',14)} ${j.id}</span><span style="display:inline-flex;align-items:center;gap:6px">${svg(ICONS.Calendar,14)} ${j.dt}</span></div>
   <div style="font-weight:600;color:var(--muted);margin-bottom:6px">Narration:</div><div style="margin-bottom:18px">${j.narr}</div>
   <div style="font-weight:600;color:var(--muted);margin-bottom:8px">Entries</div>
   <div class="tablewrap"><table><thead><tr><th>Account</th><th>Description</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody>
     ${j.entries.map((e,i)=>`<tr><td><span class="owncell"><span style="color:var(--faint);margin-right:6px">${i+1}</span><b style="color:var(--navy)">${e[0]}</b> ${svg(SVS.caret,11)}</span></td><td class="co">${e[1]}</td><td class="num">${e[2]?fmt(e[2]):'-'}</td><td class="num">${e[3]?fmt(e[3]):'-'}</td></tr>`).join('')}
     <tr style="background:var(--surface-2)"><td></td><td style="text-align:right;color:var(--faint)">Debit / Credit</td><td class="num"><b>${fmt(tot[0])}</b></td><td class="num"><b>${fmt(tot[1])}</b></td></tr></tbody></table></div>
   <div class="ojorev"><div class="ic">✦</div><div style="flex:1"><div class="oh">OJO review</div><div class="ot" style="margin-top:4px">This entry is balanced and compliant.</div></div><button class="reload" onclick="toast('Re-checking…')">${svg('<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',16)}</button><div class="sc"><div class="v" style="color:var(--coral-ink)">5/5</div><div class="l">Balance Score</div></div></div>
   <div class="docbar"><button class="ab" onclick="toast('Edit')">${svg(SVS.pencil,16)}</button><button class="ab" onclick="toast('Download')">${svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',16)}</button><button class="ab" onclick="toast('Share')">${svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',16)}</button></div></div>`;}
function acctInvoiceDoc(i){const s=SELLER;const nfx=n=>new Intl.NumberFormat('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);const item=i.item||'Professional services',rate=i.rate||i.amount;
  return `<div class="docpage"><div class="acctback"><button class="back" onclick="acctBack()">${svg(SVS.arrow,18)}</button></div>
   <h1 style="font-size:24px;font-weight:800;color:var(--navy);display:flex;align-items:center;gap:12px">#${i.id} <span class="ebadge" style="color:var(--ok);background:var(--ok-soft)">Tax Invoice</span> ${apill(i.status)}</h1>
   <div style="border:1px solid var(--line);border-radius:18px;padding:26px 30px;margin-top:18px;background:var(--surface)">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px"><span class="eav" style="background:var(--navy);width:30px;height:30px;font-size:12px">R</span><div style="font-weight:800;font-size:18px;color:var(--navy)">${s.name}</div></div>
    <div class="kv2"><div><div class="k">Email ID:</div><div class="v">${s.email}</div></div><div><div class="k">Bank Name:</div><div class="v">${s.bank}</div></div><div><div class="k">Contact No:</div><div class="v">${s.phone}</div></div><div><div class="k">Account No:</div><div class="v">${s.acc}</div></div><div><div class="k">Address:</div><div class="v">${s.addr}</div></div><div><div class="k">IFSC Code:</div><div class="v">${s.ifsc}</div></div><div><div class="k">GSTIN:</div><div class="v">${s.gstin}</div></div></div>
    <div class="dsec"><h4>Customer Info</h4><div class="kv2"><div><div class="k">Billed To</div><div class="v">${i.client}</div></div><div><div class="k">Email</div><div class="v">${i.email||'-'}</div></div><div><div class="k">Phone</div><div class="v">${i.phone||'-'}</div></div><div><div class="k">Address</div><div class="v">-</div></div></div></div>
    <div class="dsec"><h4>Invoice Details</h4><div class="kv2"><div><div class="k">Invoice Date</div><div class="v">${i.date||'—'}</div></div><div><div class="k">Due Date</div><div class="v">${i.dueFull||(i.due+' 2026')}</div></div><div><div class="k">Project</div><div class="v">${i.project}</div></div><div><div class="k">Currency</div><div class="v">INR</div></div></div></div>
    <div class="dsec" style="border-bottom:none"><div class="tablewrap"><table><thead><tr><th>#</th><th>Items</th><th>HSN code</th><th class="num">Qty</th><th class="num">Rate</th><th class="num">Amount</th></tr></thead><tbody><tr><td>1</td><td>${item}</td><td class="co">-</td><td class="num">1.00</td><td class="num">INR ${nfx(rate)}</td><td class="num">INR ${nfx(rate)}</td></tr></tbody></table></div>
     <div style="margin-top:16px"><div class="totrow"><span class="tl">Sub Total (INR)</span><span class="tv">INR ${nfx(i.amount)}</span></div><div class="totrow"><span class="tl">Tax Total (INR)</span><span class="tv">INR 0.00</span></div><div class="totrow gt"><span class="tl">Grand Total (INR)</span><span class="tv">INR ${nfx(i.amount)}</span></div></div></div>
   </div>
   <div class="docbar"><button class="ab" onclick="toast('Edit')">${svg(SVS.pencil,16)}</button><button class="ab" onclick="toast('Download')">${svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',16)}</button><button class="ab" onclick="toast('Send')">${svg('<path d="m22 2-7 20-4-9-9-4z"/>',16)}</button><span class="sep"></span><button class="abtn dark" onclick="toast('Record payment')">₹ Record Payment</button></div></div>`;}
function acctBillDoc(b){const items=b.items||[['Item','Expense',1,b.amount||0,0]];const tds=b.tds||0,paid=b.paid||0,payable=(b.amount||0)-tds,bal=b.balance!=null?b.balance:payable-paid;
  return `<div class="docpage"><div class="acctback"><button class="back" onclick="acctBack()">${svg(SVS.arrow,18)}</button></div>
   <h1 style="font-size:24px;font-weight:800;color:var(--navy);display:flex;align-items:center;gap:10px">#${b.id} ${apill(b.status)} ${b.paid?apill('Partially Paid'):''}</h1>
   <div class="muted2" style="margin-top:2px">${b.vendor}</div>
   <div style="border:1px solid var(--line);border-radius:18px;padding:26px 30px;margin-top:16px;background:var(--surface)">
    <div class="dsec" style="border-top:none;padding-top:0"><h4>Supplier</h4><div class="kv2"><div><div class="k">Supplier</div><div class="v">${b.vendor}</div></div><div><div class="k">Supplier Bill No</div><div class="v">${b.billNo||b.ref||'-'}</div></div></div></div>
    <div class="dsec"><h4>Bill Details</h4><div class="kv2"><div><div class="k">Bill Date</div><div class="v">${b.date}</div></div><div><div class="k">Due Date</div><div class="v">${b.due}</div></div><div><div class="k">Accounts Payable (Liability)</div><div class="v">2100 - Accounts Payable</div></div><div><div class="k">Original Bill Amount (INR)</div><div class="v">${inr(b.amount)}</div></div>${tds?`<div><div class="k">Withholding</div><div class="v">TDS (10%) = ${inr(tds)}</div></div>`:''}<div><div class="k">Payment Status</div><div class="v">${b.paid?'Partially Paid':'—'}</div></div></div>${b.notes?`<div style="margin-top:12px"><div class="k">Notes</div><div class="v">${b.notes}</div></div>`:''}</div>
    <div class="dsec"><h4>Line Items</h4><div class="tablewrap"><table><thead><tr><th>Item</th><th>Item Account</th><th class="num">Qty</th><th class="num">Rate</th><th class="num">Tax %</th></tr></thead><tbody>${items.map(it=>`<tr><td><b style="color:var(--navy)">${it[0]}</b></td><td class="co">${it[1]}</td><td class="num">${it[2].toFixed(2)}</td><td class="num">${inr(it[3])}</td><td class="num">${it[4].toFixed(2)}</td></tr>`).join('')}</tbody></table></div></div>
    <div class="dsec" style="border-bottom:none"><div style="border:1px solid var(--line);border-radius:14px;padding:18px 20px"><h4>Summary</h4><div class="totrow"><span class="tl">Original Amount</span><span class="tv">${inr(b.amount)}</span></div>${tds?`<div class="totrow"><span class="tl">TDS (10%)</span><span class="tv">-${inr(tds)}</span></div>`:''}<div class="totrow gt"><span class="tl">Payable Amount</span><span class="tv">${inr(payable)}</span></div><div class="totrow"><span class="tl">Paid Amount</span><span class="tv">${inr(paid)}</span></div><div class="totrow"><span class="tl">Balance</span><span class="tv">${inr(bal)}</span></div></div></div>
   </div>
   <div class="docbar"><button class="ab" onclick="toast('Edit')">${svg(SVS.pencil,16)}</button><button class="ab" onclick="toast('Download')">${svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',16)}</button><button class="ab" onclick="toast('Upload')">${svg('<path d="M12 21V9m0 0-4 4m4-4 4 4M5 3h14"/>',16)}</button><button class="ab" onclick="toast('Share')">${svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',16)}</button><button class="ab" onclick="toast('Delete')">${svg('<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',16)}</button><span class="sep"></span><button class="abtn dark" onclick="toast('Bill confirmed')">Confirm Bill ✓</button></div></div>`;}
function acctPayrunDoc(p){return `<div class="docpage"><div class="acctback"><button class="back" onclick="acctBack()">${svg(SVS.arrow,18)}</button></div>
   <h1 style="font-size:24px;font-weight:800;color:var(--navy);display:flex;align-items:center;gap:10px">${p.title} ${apill(p.status)}</h1>
   <div style="background:var(--surface-2);border:1px solid var(--line);border-radius:16px;padding:22px 24px;margin-top:16px;display:flex;flex-wrap:wrap;gap:34px;align-items:center">
    <div><div style="font-size:22px;font-weight:800;color:var(--navy)">${p.emps}</div><div class="muted2">Employees</div></div>
    <div><div style="font-size:22px;font-weight:800;color:var(--navy)">${fmt(p.cost)}</div><div class="muted2">Total Payroll Cost</div></div>
    <div><div style="font-size:22px;font-weight:800;color:var(--navy)">${fmt(p.tax)}</div><div class="muted2">Taxes &amp; deductions</div></div>
    <div><div style="font-size:22px;font-weight:800;color:var(--navy)">${fmt(p.net)}</div><div class="muted2">Net Payable</div></div>
    <div style="margin-left:auto;text-align:right"><div class="muted2" style="display:inline-flex;align-items:center;gap:6px">${svg(ICONS.Calendar,13)} ${p.payDate} • ${p.payDays} Pay days</div><div><button class="manual" style="margin-top:8px" onclick="toast('Voucher')">View Voucher</button></div></div>
   </div>
   <div style="display:flex;justify-content:flex-end;align-items:center;gap:6px;margin:16px 0 8px">${acctTools()}<div class="hsearch" style="max-width:220px">${svg(SVS.search,15)} Search</div></div>
   <div class="tablewrap"><table><thead><tr><th>Employees</th><th class="num">Paid Days</th><th class="num">Net Pay</th><th>Pay Slip</th><th>TDS Sheet</th><th>Payment Mode</th></tr></thead><tbody>
     <tr><td><span class="owncell">${eav({color:'#2F6FED',av:'VV'})}<b style="color:var(--navy)">Vinoth V V</b></span></td><td class="num">2</td><td class="num">${fmt(p.net)}</td><td><a style="color:var(--info);font-weight:600">View</a> ${svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',13)}</td><td><a style="color:var(--info);font-weight:600">View</a> ${svg('<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',13)}</td><td>Bank Transfer</td></tr></tbody></table></div></div>`;}

/* ============ UNIFIED TASKS MODULE (cell-style, gamified, with focus) ============ */
const SRC={leads:['Leads','#E08A1E'],project:['Projects','#2F6FED'],hr:['HR','#7C53E6'],account:['Accounts','#15A06A'],vendor:['Vendors','#C92F3A']};
const TSTAGES=['Todo','Doing','Review','Done'];
const TSTC={Todo:'#64748B',Doing:'#2F6FED',Review:'#9A6B12',Done:'#15A06A'};
const TASKS=[
 {id:'TK01',title:'Send proposal to Hexathalon',src:'leads',link:'Hexathalon Apparel Brand',asg:'priya',status:'Doing',pri:'High',due:'11 Jun',time:'09:00',est:'2h',pts:30,focusMin:0},
 {id:'TK02',title:'Qualify inbound — Movie',src:'leads',link:'Movie',asg:'sam',status:'Todo',pri:'Medium',due:'11 Jun',time:'16:30',est:'1h',pts:20,focusMin:0},
 {id:'TK03',title:'Follow up: layman brothers (overdue)',src:'leads',link:'layman brothers',asg:'ravi',status:'Review',pri:'High',due:'05 Jun',time:'14:00',est:'30m',pts:25,focusMin:15},
 {id:'TK04',title:'Design home page hero',src:'project',link:'Apollo · Design',asg:'mei',status:'Doing',pri:'High',due:'12 Jun',time:'10:00',est:'6h',pts:40,focusMin:50},
 {id:'TK05',title:'Stakeholder sign-off',src:'project',link:'Apollo · Discovery',asg:'priya',status:'Review',pri:'Medium',due:'11 Jun',time:'10:30',est:'2h',pts:25,focusMin:0},
 {id:'TK06',title:'QA build checklist',src:'project',link:'Apollo · Build',asg:'sam',status:'Todo',pri:'Low',due:'14 Jun',time:'14:00',est:'3h',pts:15,focusMin:0},
 {id:'TK07',title:'Onboard Vinoth V V',src:'hr',link:'Vinoth V V',asg:'mei',status:'Doing',pri:'Medium',due:'11 Jun',time:'12:00',est:'1h',pts:20,focusMin:25},
 {id:'TK08',title:'Approve March leave requests',src:'hr',link:'HR · Leaves',asg:'priya',status:'Todo',pri:'Low',due:'13 Jun',time:'11:00',est:'20m',pts:10,focusMin:0},
 {id:'TK09',title:'Confirm BILL-2026-00002',src:'account',link:'BILL-2026-00002',asg:'sam',status:'Review',pri:'High',due:'11 Jun',time:'14:30',est:'30m',pts:25,focusMin:0},
 {id:'TK10',title:'Record payment INV/26-27/0003',src:'account',link:'INV/26-27/0003',asg:'priya',status:'Todo',pri:'High',due:'06 Jun',time:'09:15',est:'15m',pts:30,focusMin:0},
 {id:'TK11',title:'Renew CloudNine hosting',src:'vendor',link:'CloudNine Hosting',asg:'ravi',status:'Todo',pri:'Medium',due:'12 Jun',time:'15:00',est:'30m',pts:20,focusMin:0},
 {id:'TK12',title:'Stakeholder interviews',src:'project',link:'Apollo · Discovery',asg:'priya',status:'Done',pri:'High',due:'05 May',time:'09:00',est:'8h',pts:40,focusMin:75}];
function t2m(t){if(!t)return 0;const a=t.split(':');return (+a[0])*60+(+a[1]);}
const NOW_MIN=13*60+20; /* demo "now" for the timeline/now-line */
/* subtasks start EMPTY — they're the user's breakdown, not boilerplate (add via the record's input) */
TASKS.forEach(t=>{t.subs=[];t.comments=[];});
let bonusXP=0,streak=5,focusToday=45;
let taskModule='leads',taskScope='leads',taskContainer='modcontent';
let tView='Cards';const tViews=['Cards','Board','List'];
let tRec=null,tTab='Overview',tFace='info',tCollapsed=true;
const FOCUS_TOTAL=25*60;let focusLeft=FOCUS_TOTAL,focusRunning=false,focusInt=null;
function scoped(){return taskScope==='all'?TASKS:TASKS.filter(t=>t.src===taskScope);}
function totalXP(){return TASKS.filter(t=>t.status==='Done').reduce((a,t)=>a+t.pts,0)+bonusXP;}
function level(){return Math.floor(totalXP()/100)+1;}
function fmtMin(m){const h=Math.floor(m/60),mm=m%60;return h?`${h}h ${mm}m`:`${mm}m`;}
METRIC_DEFS.tasksall={open:['Open tasks',()=>scoped().filter(t=>t.status!=='Done').length],doing:['In progress',()=>scoped().filter(t=>t.status==='Doing').length],review:['In review',()=>scoped().filter(t=>t.status==='Review').length],done:['Completed',()=>scoped().filter(t=>t.status==='Done').length],xp:['XP earned',()=>totalXP()+' XP'],focus:['Focus today',()=>fmtMin(focusToday)]};
METR.tasksall=['open','doing','done','xp'];
function openTasks(scope){hideCommDock();taskModule=scope;taskScope=scope;tView='Cards';tRec=null;
  if(scope==='hr'){setRail('navHR');hrPage='tasks';mountHR();return;}
  if(scope==='account'){setRail('navAccounts');acctPage='tasks';mountAccounts();return;}
  const rail={leads:'navLeads',project:'navProjects',vendor:'navVendors'}[scope]||'navLeads';setRail(rail);
  renderShell(scope,'tasks');taskContainer='modcontent';document.getElementById('modcontent').innerHTML=tasksListHTML(scope);}
function setTaskScope(mode){taskScope=mode==='all'?'all':taskModule;document.getElementById(taskContainer).innerHTML=tasksListHTML(taskScope);}
function tV(v){tView=v;document.getElementById(taskContainer).innerHTML=tasksListHTML(taskScope);}
function tasksListHTML(scope){taskScope=scope;const rows=[...scoped()].sort((a,b)=>(a.status==='Done')-(b.status==='Done')); /* completed sink to the bottom */
  const modName=(SRC[taskModule]&&SRC[taskModule][0])||'your modules';
  const done=rows.filter(t=>t.status==='Done').length,over=rows.filter(t=>t.status!=='Done'&&(parseInt(t.due)||0)<11).length,active=rows.length-done;
  const quick=rows.filter(t=>t.status!=='Done'&&['15m','20m','30m'].includes(t.est)).length;
  const work=tView==='Board'?tBoard(rows):tView==='List'?`<div class="tlist">${rows.length?rows.map(taskRow).join(''):'<div class="tp-empty"><h3>No tasks</h3></div>'}</div>`:`<div class="tgrid">${rows.length?rows.map(tcard).join(''):'<div class="tp-empty"><h3>No tasks here</h3></div>'}</div>`;
  return `<div class="taskpage tpage2">
    <div class="tp2-head"><div class="tp2-hl"><h1>Tasks</h1><div class="tp2-sub"><b>${active}</b> open${over?` · <span class="over">${over} overdue</span>`:''} · ${modName} <span class="cell-tag" title="A UI cell — render:'cards' · bind:'collection:Task'">${svg(SPARK,10)} cell view</span></div></div>
      <button class="focusbtn" onclick="tFocusMode()">${svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',15)} Focus mode</button></div>
    ${ojoStrip(`<b>${over} overdue</b> across ${modName}. OJO auto-prioritised your day — start with the ${quick} quick wins, then the High-priority items. ${aiChip('auto-sorted')}`,'planned your day')}
    <div class="tp2-metrics">${[['',active,'Open'],['over',over,'Overdue'],['ok',done,'Done'],['',fmtMin(focusToday),'Focus today']].map(t=>`<div class="mtile sm ${t[0]}"><div class="mt-v">${t[1]}</div><div class="mt-l">${t[2]}</div></div>`).join('')}</div>
    <div class="tp2-controls"><span class="seg viewseg">${tViews.map(v=>`<button class="${v===tView?'on':''}" onclick="tV('${v}')">${v}</button>`).join('')}</span><span class="tp-sp"></span><button class="ctrl-chip" onclick="homeQuickOpenAt('${taskContainer}')">${svg('<path d="M12 5v14M5 12h14"/>',13)} Add task</button></div>
    <div id="twork">${work}</div></div>`;}
function homeQuickOpenAt(){toast('Quick add (demo) — use Home for the full composer');}
function tHero(lvl,xp,inLvl){return `<div class="ghero"><div class="g-level"><div class="g-ring">${ring(inLvl,'var(--coral)',96)}<div class="g-lv">L${lvl}</div></div><div><div class="g-xp">${xp} XP</div><div class="g-next">${100-inLvl} XP to Level ${lvl+1}</div><div class="g-bar"><div style="width:${inLvl}%"></div></div></div></div>
   <div class="g-tiles"><div class="g-tile"><div class="gt-v">🔥 ${streak}</div><div class="gt-l">Day streak</div></div><div class="g-tile"><div class="gt-v">${fmtMin(focusToday)}</div><div class="gt-l">Focus today</div></div><div class="g-tile"><div class="gt-v">${TASKS.filter(t=>t.status==='Done').length}</div><div class="gt-l">Closed this week</div></div></div></div>`;}
/* ---- listing views ---- */
function tCard(t){const sm=SRC[t.src];return `<div class="card" draggable="true" ondragstart="tCardStart(event,'${t.id}')" ondragend="tCardEnd(event)" onclick="openTaskRec('${t.id}')"><div class="nm">${t.title}</div><div class="by"><span class="tsrc" style="color:${sm[1]};background:${sm[1]}1f">${sm[0]}</span> ${t.link}</div><div class="foot"><span class="tpts">★ ${t.pts}</span><span class="chip pr" style="background:${PR[t.pri]};margin-left:6px">${t.pri}</span><span style="margin-left:auto">${av(t.asg)}</span></div></div>`;}
function tBoard(rows){return `<div class="board color">`+TSTAGES.map(s=>{const items=rows.filter(t=>t.status===s);return `<div class="col"><div class="col-head" style="--cc:${TSTC[s]}"><span class="pill"><span class="dot"></span>${s}</span><span class="ct">${items.length}</span></div><div class="col-body" ondragover="tCardOver(event)" ondragleave="tCardLeave(event)" ondrop="tCardDrop(event,'${s}')">${items.map(t=>tCard(t)).join('')||'<div class="col-empty">None</div>'}</div></div>`;}).join('')+`</div>`;}
function tTable(rows){return `<div class="tablewrap"><table><thead><tr><th>Task</th><th>Source</th><th>Linked to</th><th>Assignee</th><th>Priority</th><th>Due</th><th class="num">Reward</th><th>Status</th></tr></thead><tbody>${rows.map(t=>{const sm=SRC[t.src];return `<tr onclick="openTaskRec('${t.id}')"><td><b style="color:var(--navy)">${t.title}</b></td><td><span class="tsrc" style="color:${sm[1]};background:${sm[1]}1f">${sm[0]}</span></td><td class="co">${t.link}</td><td><span class="owncell">${av(t.asg)}${PEOPLE[t.asg][2]}</span></td><td><span class="chip pr" style="background:${PR[t.pri]}">${t.pri}</span></td><td class="co">${t.due||'—'}</td><td class="num"><span class="tpts">★ ${t.pts}</span></td><td><span style="color:${TSTC[t.status]};font-weight:600">${t.status}</span></td></tr>`;}).join('')}</tbody></table></div>`;}
function tList(rows){const gs=[...new Set(rows.map(t=>t.src))];return gs.map(g=>{const items=rows.filter(t=>t.src===g);const sm=SRC[g];return `<div class="lg"><div class="lg-head"><span class="pill">${sm[0]}</span><span class="ct">${items.length}</span></div>${items.map(t=>`<div class="lrow" onclick="openTaskRec('${t.id}')">${av(t.asg)}<span class="nm">${t.title}</span><span class="co">${t.link} · ${t.pri} · ${t.status}</span><span class="tpts" style="margin-left:auto">★ ${t.pts}</span></div>`).join('')}</div>`;}).join('');}
let tDragId=null;
function tCardStart(e,id){tDragId=id;e.currentTarget.classList.add('cdrag');e.dataTransfer.effectAllowed='move';}
function tCardEnd(e){e.currentTarget.classList.remove('cdrag');document.querySelectorAll('.col-body.dragover').forEach(c=>c.classList.remove('dragover'));}
function tCardOver(e){e.preventDefault();e.currentTarget.classList.add('dragover');}
function tCardLeave(e){e.currentTarget.classList.remove('dragover');}
function tCardDrop(e,s){e.preventDefault();e.currentTarget.classList.remove('dragover');const t=TASKS.find(x=>x.id===tDragId);if(t&&t.status!==s){const was=t.status;t.status=s;if(s==='Done'&&was!=='Done')toast('🎉 Task done · +'+t.pts+' XP');else toast('Moved to '+s);}tDragId=null;document.getElementById(taskContainer).innerHTML=tasksListHTML(taskScope);}
/* ---- detail (lead-overview style) ---- */
let taskFrom='module';
function openTaskRec(id,from){focusPause();focusLeft=FOCUS_TOTAL;tRec=TASKS.find(t=>t.id===id);if(!tRec)return;taskFrom=from||'module';
  /* project tasks are project cells — cross-launch the project's own task record instead of a copy */
  if(tRec.src==='project'){const m=tasks.find(x=>x.t===tRec.title);if(m){openDetail('task',m.id,taskFrom);return;}}
  tTab='Overview';tFace='info';tCollapsed=true;mountTaskDetail();}
function taskBack(){focusPause();if(taskFrom==='home'){go('home');}else{openTasks(taskModule);}}
function tFocusMode(){const list=scoped().filter(t=>t.status!=='Done');if(!list.length){toast('All caught up! 🎉');return;}const ord={High:0,Medium:1,Low:2};list.sort((a,b)=>ord[a.pri]-ord[b.pri]);openTaskRec(list[0].id);
  /* only start the timer when the module-task record (with the focus panel) actually mounted — project tasks cross-launch */
  setTimeout(()=>{if(!document.getElementById('tbox'))return;if(tCollapsed)tToggle();focusStart();},80);toast('Focus mode · '+list[0].title);}
function mountTaskDetail(){const t=tRec,p=PEOPLE[t.asg],sm=SRC[t.src];
  /* comm only when there's a real counterpart to reach — a self-created Inbox task has nobody to call */
  const selfTask=!t.link||/^(inbox|from notification)$/i.test(t.link);
  const comm=selfTask?'':`<div class="commpill">${[['call','Call'],['email','Email'],['video','Meet']].map(([f,l])=>`<button title="${l} ${p?p[2]:'assignee'}" onclick="openComm('${f}')">${faceIcon(f)}</button>`).join('')}</div>`;
  document.getElementById('screen').innerHTML=`<div class="dwrap"><div class="dside"><div class="dnav"><button class="dctl" onclick="tNav(-1)" title="Previous (↑)">${svg('<path d="M18 15l-6-6-6 6"/>',21)}</button><button class="dctl" onclick="tNav(1)" title="Next (↓)">${svg('<path d="M6 9l6 6 6-6"/>',21)}</button></div></div><div class="dbox ${tCollapsed?'collapsed':''}" id="tbox"><div class="dmain">
    <div class="dtop"><div class="crumbs"><a onclick="taskBack()">Tasks</a> <span class="sep">‹</span> ${sm[0]} <span class="sep">‹</span> ${t.link}</div><div class="sp"></div>
      ${comm}
      <button class="ptog-ic ${tCollapsed?'':'on'}" id="tPtogBtn" onclick="tToggle()" title="${tCollapsed?'Show focus & activity':'Hide focus & activity'}">${svg('<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/>',17)}</button>
      <button class="mtool hdr-x" onclick="taskBack()" title="Close">${svg(SVS.x,18)}</button></div>
    <div class="dcenter"><div class="inner" id="tinner">${tBody()}</div></div></div>
   <aside class="dpanel" id="tpanel"><div class="dpanel-head"><span class="nm">Focus &amp; activity</span></div>
    <div class="dpanel-body" id="tpanelbody"></div></aside></div></div>`;
  renderTaskInfo();bindTComment();
  commSetHost({getFace:()=>tFace,setFace:tSetFace,content:commTaskContent});}
function tNav(dir){const list=scoped();const i=list.findIndex(x=>x.id===tRec.id);if(i<0)return;const n=(i+dir+list.length)%list.length;xpClose();openTaskRec(list[n].id);}
function bindTComment(){const ta=document.getElementById('tcmt');if(ta){ta.addEventListener('input',()=>{ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';});ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();tComment();}});}}
function tToggle(){tCollapsed=!tCollapsed;document.getElementById('tbox').classList.toggle('collapsed',tCollapsed);
  const b=document.getElementById('tPtogBtn');if(b){b.classList.toggle('on',!tCollapsed);b.title=tCollapsed?'Show focus & activity':'Hide focus & activity';}}
function tSetFace(f){tFace=f;document.querySelectorAll('#tpanel .xcface').forEach(b=>b.classList.toggle('on',b.dataset.face===f));renderTaskInfo();}
function tStepper(t){const order=TSTAGES,idx=order.findIndex(s=>s===t.status),pct=idx<=0?0:(idx/(order.length-1))*100;
  return `<div class="lstep-wrap" style="display:flex;align-items:center;gap:10px;margin-bottom:18px"><button class="lstep-nav">${svg('<path d="M15 18l-6-6 6-6"/>',14)}</button><div class="lstep"><div class="track"></div><div class="fill" style="width:${pct}%"></div>${order.map((s,i)=>`<div class="lstp ${i<idx?'done':(i===idx?'cur':'')}" onclick="tMove('${s}')"><div class="nd"></div><div class="nm">${s}</div><div class="due">${s==='Done'?'+'+t.pts+' XP':'No due'}</div></div>`).join('')}</div><button class="lstep-nav">${svg('<path d="M9 6l6 6-6 6"/>',14)}</button></div>`;}
function tMove(v){if(!tRec)return;const was=tRec.status;tRec.status=v;if(v==='Done'&&was!=='Done'){if(tRec.subs)tRec.subs.forEach(s=>s.done=true);toast('🎉 Task done · +'+tRec.pts+' XP');}else toast('Moved to '+v);document.getElementById('tinner').innerHTML=tBody();renderTaskInfo();bindTComment();}
/* module-task header card — same .proj-ai pattern as project & project-task records.
   The close-for-XP nudge lives INSIDE the insights; a focus block is offered only when no duration is set. */
function tTopInsights(t){const idx=TSTAGES.indexOf(t.status);const done=t.status==='Done';const pct=done?100:Math.round(Math.max(0,idx)/(TSTAGES.length-1)*100);const sm=SRC[t.src];
  const items=[['clock',done?`<b>Done.</b> ${t.pts} XP earned — nice focus.`:`<b>${t.pri} priority${t.due?` · due ${t.due}`:''}.</b> ${t.pri==='High'?'Best tackled next.':'On track if started soon.'}`],
    ['target',`<b>Linked to ${t.link}.</b> Completing it updates that ${sm[0]} record.`]];
  if(!done)items.push(['next',`<b>Close it to earn ${t.pts} XP.</b> <a onclick="tMove('Done')">Mark it done</a>${t.est?'':` or <a onclick="tFocusJump()">create an OJO focus block</a> — 25 min, +5 XP bonus`}.`]);
  items.push(['flame',t.est?`<b>Estimated ${t.est}.</b> ${t.focusMin?`${t.focusMin}m focused so far.`:'No focus logged yet.'}`:`<b>No duration set.</b> An OJO focus block (25 min) is a good default.`]);
  return `<div class="proj-ai">
    <div class="pa-score"><div class="pa-ring">${ring(pct,done?'var(--ok)':pct>=40?'var(--warn)':'var(--coral)',72)}<span class="pa-pct">${pct}%</span></div><div class="pa-meta"><div class="pa-lbl">${t.status}</div><div class="pa-sub">★ ${t.pts} XP on completion · ${sm[0]}</div></div></div>
    <div class="pa-ins">${ojoInsightsCard(items,'task')}</div></div>`;}
function tBody(){const t=tRec,p=PEOPLE[t.asg];
  return `<h1>${t.title}</h1>
   <div class="byline"><span class="av" style="background:${p[1]}">${p[0]}</span> ${p[2]} · linked to <b>${t.link}</b></div>
   ${tTopInsights(t)}
   ${tStepper(t)}
   <div class="rows">
    <div class="row"><div class="k">Assigned to</div><div class="v"><span class="av-chip">${av(t.asg)}${p[2]}</span></div></div>
    <div class="row"><div class="k">Priority</div><div class="v"><span class="chip pr" style="background:${PR[t.pri]}">${t.pri}</span></div></div>
    <div class="row"><div class="k">Due on</div><div class="v">${t.due||'—'}</div></div>
    <div class="row"><div class="k">Estimate</div><div class="v"><span class="est">${t.est||'—'}</span></div></div>
    <div class="row"><div class="k">Subtasks</div><div class="v">${tSubs()}</div></div>
   </div>${tComments()}`;}
function tSubs(){return `<div class="subs">${tRec.subs.map((s,i)=>`<div class="sub ${s.done?'done':''}"><button class="scheck" onclick="tSub(${i})">${svg('<path d="M20 6 9 17l-5-5"/>',12)}</button><span class="txt">${s.t}</span></div>`).join('')}<div class="subadd"><span class="scheck"></span><input placeholder="Add a new subtask" onkeydown="if(event.key==='Enter')tAddSub(this)"></div></div>`;}
function tSub(i){tRec.subs[i].done=!tRec.subs[i].done;document.getElementById('tinner').innerHTML=tBody();renderTaskInfo();bindTComment();}
function tAddSub(inp){if(!inp.value.trim())return;tRec.subs.push({t:inp.value.trim(),done:false});document.getElementById('tinner').innerHTML=tBody();bindTComment();setTimeout(()=>{const a=document.querySelectorAll('#tinner .subadd input');a[a.length-1]&&a[a.length-1].focus();},0);}
function tComments(){return `<div class="commentbar"><div id="tcomments">${tRec.comments.map(c=>`<div class="comment"><span class="av">VK</span><div><div><b>Vinoth K</b><span class="tm">just now</span></div><div style="margin-top:3px">${c}</div></div></div>`).join('')}</div>
   <div class="cinput"><span class="av">VK</span><textarea id="tcmt" placeholder="Add your comment…" rows="1"></textarea></div></div>`;}
function tComment(){const ta=document.getElementById('tcmt');const v=ta.value.trim();if(!v)return;tRec.comments.push(v);document.getElementById('tinner').innerHTML=tBody();bindTComment();toast('Comment added');}
/* panel = focus timer + this task's recent history (insights & facts live in the main body now) */
function tActivity(t){const p=PEOPLE[t.asg];const items=[];
  if(t.status==='Done')items.push(['#15A06A','done',t.due||'today',p[2],'completed',t.title]);
  else if(t.status!=='Todo')items.push(['#E0A21E','msg','today',p[2],'moved to '+t.status+':',t.title]);
  if(t.focusMin)items.push(['#7C53E6','done','today',p[2],'logged '+t.focusMin+'m of focus on',t.title]);
  t.comments.slice(-2).forEach(()=>items.push(['#2F6FED','msg','today','Vinoth K','commented on',t.title]));
  items.push(['#F04D56','msg','this week','OJO','created this task from',t.link]);
  return actRowsHTML(items,`<div class="more"><span class="av">${p[0]}</span>${p[2]} active on this task</div>`);}
function tInfoBody(){const t=tRec;
  return `<div class="ip"><div class="focuscard" id="focuscard">${focusCardHTML()}</div>
   <div class="ip-act"><div class="ip-act-h">Recent activity</div>${tActivity(t)}</div></div>`;}
function renderTaskInfo(){const el=document.getElementById('tpanelbody');if(!el)return;el.innerHTML=tInfoBody();}
/* ---- focus timer ---- */
function focusCardHTML(){const t=tRec;const pct=focusLeft/FOCUS_TOTAL*100;const mm=String(Math.floor(focusLeft/60)).padStart(2,'0'),ss=String(focusLeft%60).padStart(2,'0');
  return `<div class="fc-h">${svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',14)} Focus session</div>
   <div class="fc-ring">${ring(pct,'var(--coral)',140)}<div class="fc-time">${mm}:${ss}</div></div>
   <div class="fc-btns"><button class="fc-go" onclick="${focusRunning?'focusPause()':'focusStart()'}">${focusRunning?'Pause':(focusLeft<FOCUS_TOTAL?'Resume':'Start focus')}</button><button class="fc-reset" onclick="focusReset()" title="Reset">${svg('<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',15)}</button></div>
   <div class="fc-meta">Logged on this task: <b>${t?t.focusMin:0}m</b> · Finish a block for <b>+5 XP</b></div>`;}
function updateFocusCard(){const el=document.getElementById('focuscard');if(el)el.innerHTML=focusCardHTML();}
function focusStart(){if(focusRunning||!tRec)return;focusRunning=true;focusInt=setInterval(focusTick,1000);updateFocusCard();}
function focusPause(){focusRunning=false;if(focusInt)clearInterval(focusInt);focusInt=null;updateFocusCard();}
function focusReset(){focusPause();focusLeft=FOCUS_TOTAL;updateFocusCard();}
function focusTick(){focusLeft--;if(focusLeft<=0){focusDone();return;}updateFocusCard();}
function focusDone(){focusRunning=false;if(focusInt)clearInterval(focusInt);focusInt=null;focusLeft=FOCUS_TOTAL;if(tRec)tRec.focusMin+=25;bonusXP+=5;focusToday+=25;toast('✅ Focus block complete · +5 bonus XP');renderTaskInfo();}
function tFocusJump(){if(tCollapsed&&document.getElementById('tbox'))tToggle();focusStart();toast('Focus started — stay on it!');}

/* ============ HOME (org overview + get-it-done) ============ */
const ACTS=[
 {who:'priya',txt:'moved <b>Send proposal to Hexathalon</b> to Doing',src:'Leads',c:'#E08A1E',tm:'2h ago'},
 {who:'sam',txt:'marked invoice <b>INV/26-27/0002</b> as Paid',src:'Accounts',c:'#15A06A',tm:'4h ago'},
 {who:'mei',txt:'completed an onboarding step for <b>Vinoth V V</b>',src:'HR',c:'#7C53E6',tm:'Yesterday'},
 {who:'sam',txt:'added bill <b>BILL-2026-00003</b> for approval',src:'Accounts',c:'#15A06A',tm:'Yesterday'},
 {who:'ravi',txt:'commented on <b>layman brothers</b>',src:'Leads',c:'#E08A1E',tm:'2 days ago'},
 {who:'priya',txt:'created a new lead <b>Orbit Media</b>',src:'Leads',c:'#E08A1E',tm:'2 days ago'}];
function homeFocus(){taskScope='all';taskModule='all';tFocusMode();}
/* ===== Home = a compact, day-driven task feed (List · Board · Activity) ===== */
let homeView='list', homeSelDay=11, homeWeekStart=8, homeQuick=false;
const WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function wdOf(d){return new Date(2026,5,d).getDay();}
const HICON={flame:'<path d="M12 2.5c2.5 2.6 3.5 4.7 3.5 7.2a3.5 3.5 0 0 1-7 0c0-1 .3-1.8.8-2.6.3 1.7 2 1.7 2 .2 0-1.3-.7-2.3.7-4.8z M8 13.5a4 4 0 1 0 8 0c0-.8-.2-1.5-.5-2.1.2 3.4-4 3.4-4 .6-1.9 1-3.5 2.1-3.5 1.5z"/>',cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',play:'<path d="M6 4l14 8-14 8z" fill="currentColor" stroke="none"/>',chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',link:'<path d="M10 13a4 4 0 0 0 6 0l3-3a4 4 0 1 0-6-6l-1 1"/><path d="M14 11a4 4 0 0 0-6 0l-3 3a4 4 0 1 0 6 6l1-1"/>',check:'<path d="M20 6 9 17l-5-5"/>',plus:'<path d="M12 5v14M5 12h14"/>'};
function homeDay(t){return parseInt(t.due)||0;}
function homeDayTasks(){const ord={High:0,Medium:1,Low:2};const active=homeActiveTasks();
  let list=homeSelDay===11?active.filter(t=>homeDay(t)<=11):active.filter(t=>homeDay(t)===homeSelDay);
  return list.sort((x,y)=>{const ox=homeDay(x)<11?0:1,oy=homeDay(y)<11?0:1;return ox-oy||ord[x.pri]-ord[y.pri]||y.pts-x.pts;});}
function homeDayStrip(){let days='';for(let i=0;i<7;i++){const d=homeWeekStart+i;const sel=d===homeSelDay,today=d===11;const n=TASKS.filter(t=>t.status!=='Done'&&homeDay(t)===d).length;
   days+=`<button class="ds-day ${sel?'on':''} ${today?'today':''}" onclick="homeSelectDay(${d})"><span class="ds-wd">${WD[wdOf(d)][0]}</span><span class="ds-n">${d}</span>${n?'<span class="ds-dot"></span>':''}</button>`;}
  return `<div class="daynav"><button class="dn-arrow" onclick="homeWeek(-7)">${svg('<path d="M15 18l-6-6 6-6"/>',16)}</button><div class="ds-strip">${days}</div><button class="dn-arrow" onclick="homeWeek(7)">${svg('<path d="M9 6l6 6-6 6"/>',16)}</button><button class="dn-today ${homeSelDay===11?'cur':''}" onclick="homeToday()">Today</button></div>`;}
function homeStats(){const done=TASKS.filter(t=>t.status==='Done').length;const over=TASKS.filter(t=>t.status!=='Done'&&homeDay(t)<11).length;return {done,total:TASKS.length,active:TASKS.length-done,over};}
function commentsThread(t){return `${t.comments.map(c=>`<div class="tc"><span class="tc-av">VV</span><div class="tc-b"><div class="tc-h"><b>Vinoth V V</b><span class="tc-tm">just now</span></div><div class="tc-x">${c}</div></div></div>`).join('')}
  <div class="tc-add"><span class="tc-av">VV</span><input placeholder="Add a comment or note…" onkeydown="if(event.key==='Enter')homeAddComment('${t.id}',this)"></div>`;}
const ARROW='<path d="M7 17 17 7M9 7h8v8"/>';
function taskRow(t){const sm=SRC[t.src];const over=homeDay(t)<11&&t.status!=='Done';const done=t.status==='Done';const ds=t.subs.filter(s=>s.done).length;
  return `<div class="titem ${done?'done':''} ${t._open?'open':''}" id="ti-${t.id}">
   <div class="trow">
    <button class="tr-ck" onclick="homeComplete('${t.id}')" title="${done?'Undo':'Complete'}">${svg(HICON.check,13)}</button>
    <div class="tr-mid" onclick="homeExpand('${t.id}')">
     <div class="tr-t">${t.title}</div>
     <div class="tr-m"><span class="tr-src" style="--c:${sm[1]}"><span class="d"></span>${sm[0]}</span><span class="tr-pri p-${t.pri[0]}">${t.pri}</span><span class="tr-due ${over?'over':''}">${over?'Overdue':t.due} · ${t.est}</span>${t.subs.length?`<span class="tr-mini">${svg(HICON.check,10)} ${ds}/${t.subs.length}</span>`:''}${t.comments.length?`<span class="tr-mini">${svg(HICON.chat,10)} ${t.comments.length}</span>`:''}</div>
    </div>
    <button class="tr-open" onclick="openTaskRec('${t.id}','${curRoute==="home"?"home":"module"}')" title="Open task">${svg(ARROW,15)}</button>
   </div>
   <div class="tr-exp" ${t._open?'':'hidden'}>
    <div class="tr-ctx2">${svg(HICON.link,12)} ${t.link} · ${PEOPLE[t.asg][2]}</div>
    ${t.subs.length?`<div class="tp-subs">${t.subs.map((s,i)=>`<button class="tp-sub ${s.done?'done':''}" onclick="homeSub('${t.id}',${i})"><span class="ck">${svg(HICON.check,10)}</span>${s.t}</button>`).join('')}</div>`:''}
    <div class="tr-actbar"><button class="tp-act" onclick="homeSchedule(event,'${t.id}')">${svg(HICON.cal,14)} Schedule</button><button class="tp-act" onclick="openTaskRec('${t.id}','${curRoute==="home"?"home":"module"}')">${svg(ARROW,14)} Open</button><button class="tp-act" onclick="homeCommentFocus('${t.id}')">${svg(HICON.chat,14)} Comment</button><span class="tp-sp"></span><span class="tp-pts">+${t.pts} XP</span></div>
    <div class="tp-thread">${commentsThread(t)}</div>
   </div>
  </div>`;}
function homeBoard(){return `<div class="tboard">${TSTAGES.map(c=>{const items=TASKS.filter(t=>t.status===c);return `<div class="tbcol"><div class="tbc-h"><span class="tbc-dot" style="background:${TSTC[c]}"></span>${c}<span class="tbc-n">${items.length}</span></div><div class="tbc-body">${items.map(t=>{const sm=SRC[t.src];const over=homeDay(t)<11&&t.status!=='Done';return `<div class="tbcard" onclick="openTaskRec('${t.id}','${curRoute==="home"?"home":"module"}')"><div class="tbc-src" style="--c:${sm[1]}"><span class="d"></span>${sm[0]}</div><div class="tbc-t">${t.title}</div><div class="tbc-m"><span class="tr-pri p-${t.pri[0]}">${t.pri}</span><span class="${over?'over':''}">${over?'Overdue':t.due}</span></div></div>`;}).join('')||'<div class="tbc-empty">No tasks</div>'}</div></div>`;}).join('')}</div>`;}
function homeSuggest(){const q=TASKS.filter(t=>t.status!=='Done'&&['15m','20m','30m'].includes(t.est));if(!q.length)return '';
  return `<div class="ojo-sugg"><span class="os-ic"><img class="ojo-mini" src="assets/ojo-logo.png" alt="OJO"></span><div class="os-b"><b>${q.length} quick wins under 30 min.</b> OJO suggests clearing them in one focus block to cut your overdue.</div><button class="os-cta" onclick="tFocusMode()">Start</button></div>`;}
function homeQuickHTML(){
  const chip=(ic,lbl)=>`<button class="qa-chip">${svg(ic,13)} ${lbl}</button>`;
  const MODIC='<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>';
  return `<div class="qadd"><div class="qa-top"><input id="qaddInput" class="qa-title" placeholder="What needs doing?" onkeydown="if(event.key==='Enter')homeAddTask(this.value);else if(event.key==='Escape')homeQuickClose()"></div>
   <div class="qa-chips">${chip(HICON.cal,'Today')}${chip(MODIC,'Module')}${chip('<path d="M5 21V4h11l-1 4h6v8h-9l-1-4H5"/>','Priority')}<span class="qa-sp"></span><button class="qa-cancel" onclick="homeQuickClose()">Cancel</button><button class="qa-add" onclick="homeAddTask(document.getElementById('qaddInput').value)">Add task</button></div>
  </div>`;}
function activityFeed(){return `<div class="act-feed">${ACTS.map(a=>{const p=PEOPLE[a.who];return `<div class="act2"><span class="act2-av" style="background:${p[1]}">${p[0]}</span><div class="act2-b"><div class="act2-x">${p[2]} ${a.txt}</div><div class="act2-tm"><span class="act2-src" style="--c:${a.c}">${a.src}</span> · ${a.tm}</div></div></div>`;}).join('')}</div>`;}
function tiRerender(id){const t=TASKS.find(x=>x.id===id);const el=document.getElementById('ti-'+id);if(t&&el)el.outerHTML=taskRow(t);}
function homeSub(id,i){const t=TASKS.find(x=>x.id===id);if(!t)return;t.subs[i].done=!t.subs[i].done;tiRerender(id);}
function homeExpand(id){const t=TASKS.find(x=>x.id===id);if(!t)return;t._open=!t._open;tiRerender(id);}
function homeCommentFocus(id){const t=TASKS.find(x=>x.id===id);if(!t)return;t._open=true;tiRerender(id);const i=document.querySelector('#ti-'+id+' .tc-add input');if(i)i.focus();}
function homeAddComment(id,el){const t=TASKS.find(x=>x.id===id);if(!t||!el.value.trim())return;t.comments.push(el.value.trim());t._open=true;tiRerender(id);}
function homeComplete(id){const t=TASKS.find(x=>x.id===id);if(!t)return;const was=t.status==='Done';t.status=was?'Todo':'Done';if(!was){t.subs.forEach(s=>s.done=true);streak++;bonusXP+=t.pts;toast('✓ '+t.title+'  ·  +'+t.pts+' XP');}else{streak=Math.max(0,streak-1);}mountHome();}
/* ---- AI-native helpers: chip + OJO insight strip (cell-aware) ---- */
function aiChip(t){return `<span class="ai-chip">${svg(SPARK,11)} ${t}</span>`;}
function ojoStrip(inner,noun){return `<div class="ojo-strip"><span class="ojs-mark"><img class="ojo-mini" src="assets/ojo-logo.png" alt="OJO"></span><div class="ojs-b"><span class="ojs-h">OJO ${noun||'is on it'}<span class="ojs-live">live</span></span><span class="ojs-x">${inner}</span></div></div>`;}
/* ---- Capability cell: Schedule (Sunsama-style, OJO-suggested) ---- */
const ICAL='<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',IBACK='<path d="M4 6h16M4 12h16M4 18h10"/>';
const SCHEDOPTS=[['Today','clears an overdue'],['Tomorrow',''],['This weekend',''],['Next week',''],['Backlog','']];
let schedTarget=null;
function homeSchedule(e,id){openSched(e,id);}
function openSched(e,id){if(e)e.stopPropagation();schedTarget=id;const m=document.getElementById('schedPop');if(!m)return;
  m.innerHTML=`<div class="sched-h">${svg(SPARK,12)} Reschedule — OJO suggests the best slot</div>
   ${SCHEDOPTS.map(o=>`<button class="sched-opt ${o[1]?'sug':''}" onclick="doSched('${o[0]}')">${svg(o[0]==='Backlog'?IBACK:ICAL,15)}<span class="so-l">${o[0]}</span>${o[1]?`<span class="so-ai">${svg(SPARK,10)} OJO · ${o[1]}</span>`:''}</button>`).join('')}
   <div class="sched-cal">${schedMiniCal()}</div>`;
  const r=e&&e.currentTarget?e.currentTarget.getBoundingClientRect():{bottom:120,left:400};
  m.style.top=Math.min(r.bottom+6,window.innerHeight-380)+'px';m.style.left=Math.max(12,Math.min(r.left,window.innerWidth-292))+'px';openPop('schedPop');}
function schedMiniCal(){const first=wdOf(1);let c='';for(let i=0;i<first;i++)c+='<span class="sc-d e"></span>';for(let d=1;d<=30;d++)c+=`<button class="sc-d ${d===11?'today':''}" onclick="doSchedDay(${d})">${d}</button>`;
  return `<div class="sc-cap">Or pick a day · June 2026</div><div class="sc-grid">${['S','M','T','W','T','F','S'].map(x=>`<span class="sc-wd">${x}</span>`).join('')}${c}</div>`;}
function schedRefresh(){if(curRoute==='home')mountHome();else if(document.getElementById('twork'))document.getElementById(taskContainer).innerHTML=tasksListHTML(taskScope);}
function doSched(label){closePops();toast('Scheduled · '+label);schedRefresh();}
function doSchedDay(d){closePops();const t=TASKS.find(x=>x.id===schedTarget);if(t)t.due=d+' Jun';toast('Scheduled · Jun '+d);schedRefresh();}
/* ---- Capability cell: Convert notification → task ---- */
function notifTask(e,title){if(e)e.stopPropagation();const id='TKN'+(TASKS.length+1);TASKS.unshift({id,title:title,src:'project',link:'From notification',asg:'priya',status:'Todo',pri:'Medium',due:'11 Jun',est:'30m',pts:15,focusMin:0,subs:[],comments:[]});toast('Added as task — OJO scheduling…');openSched(e,id);}
function homeSetView(v){homeView=v;mountHome();}
function homeSelectDay(d){homeSelDay=d;if(homeView==='activity')homeView='list';mountHome();}
function homeWeek(delta){homeWeekStart+=delta;mountHome();}
function homeToday(){homeWeekStart=8;homeSelDay=11;mountHome();}
function homeQuickOpen(e){if(e&&e.stopPropagation)e.stopPropagation();const m=document.getElementById('qaddPop');if(!m)return;m.innerHTML=homeQuickHTML();if(e&&e.currentTarget){const r=e.currentTarget.getBoundingClientRect();m.style.top=(r.bottom+8)+'px';m.style.left=Math.max(12,Math.min(r.left,window.innerWidth-352))+'px';}openPop('qaddPop');setTimeout(()=>{const i=document.getElementById('qaddInput');if(i)i.focus();},30);}
function homeQuickClose(){closePops();}
function homeAddTask(title){if(!title||!title.trim())return;const id='TKX'+(TASKS.length+1);TASKS.unshift({id,title:title.trim(),src:'project',link:'Inbox',asg:'priya',status:'Todo',pri:'Medium',due:homeSelDay+' Jun',time:'12:00',est:'',pts:15,focusMin:0,subs:[],comments:[]});homeQuickClose();mountHome();toast('Task added to '+(homeSelDay===11?'Today':homeSelDay+' Jun'));}
function homeMetrics(){const st=homeStats();const pct=st.total?Math.round(st.done/st.total*100):0;const fmin=TASKS.reduce((a,t)=>a+(t.focusMin||0),0);
  const tiles=[['over',st.over,'Overdue','need attention'],['',st.active,'To do','on your plate'],['ok',st.done,'Done today','+'+bonusXP+' XP'],['',fmin+'m','Focused','today']];
  return `<div class="hmetrics">${tiles.map(t=>`<div class="mtile ${t[0]}"><div class="mt-v">${t[1]}</div><div class="mt-l">${t[2]}</div><div class="mt-s">${t[3]}</div></div>`).join('')}
   <div class="mtile ring"><div class="mt-ring">${ring(pct,pct>=66?'var(--ok)':pct>=33?'var(--warn)':'var(--coral)',64)}<span class="mt-pct">${pct}%</span></div><div class="mt-l" style="margin-top:6px">Day progress</div></div></div>`;}
function tcard(t){const sm=SRC[t.src];const p=PEOPLE[t.asg];const over=homeDay(t)<11&&t.status!=='Done';const done=t.status==='Done';
  return `<article class="tcard ${done?'done':''}" id="tc-${t.id}">
   <div class="tcd-top"><button class="tcd-ck" onclick="homeComplete('${t.id}')" title="${done?'Undo':'Complete'}">${svg(HICON.check,14)}</button><span class="tr-src" style="--c:${sm[1]}"><span class="d"></span>${sm[0]}</span><span class="tr-pri p-${t.pri[0]}">${t.pri}</span><span class="tp-sp"></span><span class="tr-due ${over?'over':''}">${over?'Overdue':t.due}${t.est?' · '+t.est:''}</span></div>
   <h3 class="tcd-title" onclick="openTaskRec('${t.id}','${curRoute==="home"?"home":"module"}')">${t.title}</h3>
   <div class="tcd-ctx"><span class="tp-link">${svg(HICON.link,12)} ${t.link}</span><span class="tp-asg">${av(t.asg)}<span>${p[2]}</span></span></div>
   ${t.subs.length?`<div class="tp-subs">${t.subs.map((s,i)=>`<button class="tp-sub ${s.done?'done':''}" onclick="homeSub2('${t.id}',${i})"><span class="ck">${svg(HICON.check,10)}</span>${s.t}</button>`).join('')}</div>`:''}
   <div class="tcd-bar"><button class="tp-act" onclick="homeSchedule(event,'${t.id}')">${svg(HICON.cal,15)} Schedule</button><button class="tp-act" onclick="openTaskRec('${t.id}','${curRoute==="home"?"home":"module"}')">${svg(ARROW,15)} Open</button><span class="tp-sp"></span><span class="tp-pts">+${t.pts} XP</span></div>
  </article>`;}
function homeSub2(id,i){const t=TASKS.find(x=>x.id===id);if(!t)return;t.subs[i].done=!t.subs[i].done;const el=document.getElementById('tc-'+id);if(el)el.outerHTML=tcard(t);}
let homeActCollapsed=true;
function homeToggleAct(){homeActCollapsed=!homeActCollapsed;const b=document.getElementById('homebox');if(b)b.classList.toggle('collapsed',homeActCollapsed);const t=document.getElementById('homActTxt');if(t)t.textContent=homeActCollapsed?'Activity':'Hide activity';const btn=document.getElementById('homActBtn');if(btn)btn.classList.toggle('on',!homeActCollapsed);}
/* ===== Home outlooks — each is a UI cell: render(timeline|schedule|cards) + bind:collection:Task ===== */
let homeOutlook='timeline';try{homeOutlook=localStorage.getItem('ojo-home-view')||'timeline';}catch(e){}
let homeOrient='vertical';try{homeOrient=localStorage.getItem('ojo-home-orient')||'vertical';}catch(e){}
if(homeOutlook==='schedule'){homeOutlook='timeline';homeOrient='horizontal';} /* migrate old Schedule tab → Timeline (horizontal) */
const HVIEWS=[['timeline','Timeline','<path d="M5 3v18"/><circle cx="5" cy="7" r="2.3" fill="currentColor" stroke="none"/><circle cx="5" cy="16" r="2.3" fill="currentColor" stroke="none"/><path d="M10 7h9M10 16h6"/>'],
 ['list','List','<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.5" fill="currentColor" stroke="none"/>'],
 ['cards','Cards','<rect x="3.5" y="4" width="7" height="16" rx="1.6"/><rect x="13.5" y="4" width="7" height="16" rx="1.6"/>']];
const ORIENTS=[['vertical','<path d="M12 3v18"/><circle cx="12" cy="7" r="2.1" fill="currentColor" stroke="none"/><circle cx="12" cy="16" r="2.1" fill="currentColor" stroke="none"/>'],
 ['horizontal','<path d="M3 12h18"/><circle cx="7.5" cy="12" r="2.1" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="2.1" fill="currentColor" stroke="none"/>']];
function homeSetOrient(o){homeOrient=o;try{localStorage.setItem('ojo-home-orient',o);}catch(e){}mountHome();}
const WARN='<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h16.9a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>';
const FILTER_IC='<path d="M3 7h12M19 7h2"/><circle cx="17" cy="7" r="2.1"/><path d="M3 17h4M11 17h10"/><circle cx="9" cy="17" r="2.1"/>';
/* ===== Home filter (single control, applies across every outlook) ===== */
let homeFilterMod=null;   /* null = all modules */
let homeGroup='time';     /* list grouping: time | module | level */
function homeActiveTasks(){let a=TASKS.filter(t=>t.status!=='Done');if(homeFilterMod)a=a.filter(t=>t.src===homeFilterMod);return a;}
const HMODS=[['','All'],['leads','Leads'],['project','Projects'],['hr','HR'],['account','Accounts'],['vendor','Vendors']];
const HGRP=[['time','By time'],['module','By module'],['level','By level']];
function homeFilterHTML(){return `<div class="hf-sec">Module</div><div class="hf-chips">${HMODS.map(([k,l])=>`<button class="hf-chip ${(homeFilterMod||'')===k?'on':''}" onclick="homeSetFilter('${k}')">${k?`<span class="hf-dot" style="--c:${SRC[k][1]}"></span>`:''}${l}</button>`).join('')}</div>
  <div class="hf-sec">Group by</div><div class="hf-chips">${HGRP.map(([k,l])=>`<button class="hf-chip ${homeGroup===k?'on':''}" onclick="homeSetGroup('${k}')">${l}</button>`).join('')}</div>`;}
function openHomeFilter(e){e.stopPropagation();const m=document.getElementById('homeFilterPop');if(!m)return;m.innerHTML=homeFilterHTML();const r=e.currentTarget.getBoundingClientRect();m.style.top=(r.bottom+8)+'px';m.style.left=Math.max(12,Math.min(r.left,window.innerWidth-258))+'px';openPop('homeFilterPop');}
function homeSetFilter(k){homeFilterMod=k||null;mountHome();const m=document.getElementById('homeFilterPop');if(m)m.innerHTML=homeFilterHTML();}
function homeSetGroup(k){homeGroup=k;if(homeOutlook!=='list')homeSetOutlook('list');else mountHome();const m=document.getElementById('homeFilterPop');if(m)m.innerHTML=homeFilterHTML();}
/* ===== List outlook — calm, polished rows (grouped) ===== */
function listRow(t){const sm=SRC[t.src];const done=t.status==='Done';const over=homeDay(t)<11&&!done;
  return `<div class="hl-row ${done?'done':''}" onclick="openTaskRec('${t.id}','home')">
    <button class="hl-ck ${done?'on':''}" onclick="event.stopPropagation();homeComplete('${t.id}')" title="${done?'Undo':'Complete'}">${svg(HICON.check,12)}</button>
    <span class="hl-pri p-${t.pri[0]}" title="${t.pri} priority"></span>
    <div class="hl-main"><div class="hl-t">${t.title}</div><div class="hl-sub"><span class="hl-mod" style="--c:${sm[1]}">${sm[0]}</span><span class="hl-x">·</span>${t.link}</div></div>
    <span class="hl-asg">${av(t.asg)}</span>
    <span class="hl-time ${over?'over':''}">${over?'Overdue':((homeDay(t)===11?t.time:t.due))}</span>
  </div>`;}
function homeList(){const a=homeActiveTasks();let groups=[];
  if(homeGroup==='module'){groups=HMODS.slice(1).map(([k,l])=>[l,a.filter(t=>t.src===k).sort((x,y)=>t2m(x.time)-t2m(y.time)),'',SRC[k][1]]);}
  else if(homeGroup==='level'){const ord={High:0,Medium:1,Low:2};groups=[['High',a.filter(t=>t.pri==='High'),'over'],['Medium',a.filter(t=>t.pri==='Medium'),''],['Low',a.filter(t=>t.pri==='Low'),'']].map(g=>{g[1].sort((x,y)=>homeDay(x)-homeDay(y)||t2m(x.time)-t2m(y.time));return g;});}
  else{const by=d=>a.filter(t=>d(homeDay(t))).sort((x,y)=>homeDay(x)-homeDay(y)||t2m(x.time)-t2m(y.time));groups=[['Overdue',by(d=>d<11),'over'],['Today',by(d=>d===11),''],['Upcoming',by(d=>d>11),'']];}
  /* completed tasks always sit in one dimmed group at the very bottom */
  const doneAll=(homeFilterMod?TASKS.filter(t=>t.src===homeFilterMod):TASKS).filter(t=>t.status==='Done').sort((x,y)=>homeDay(x)-homeDay(y)||t2m(x.time)-t2m(y.time));
  groups.push(['Done',doneAll,'donegrp']);
  const html=groups.filter(g=>g[1].length).map(g=>`<div class="hl-group"><div class="hl-gh ${g[2]||''}">${g[3]?`<span class="hf-dot" style="--c:${g[3]}"></span>`:''}${g[0]}<span class="hl-gn">${g[1].length}</span></div>${g[1].map(listRow).join('')}</div>`).join('');
  return `<div class="hlist">${html||`<div class="tp-empty"><div class="tp-empty-ic">${svg(HICON.check,26)}</div><h3>Nothing here</h3><p>No tasks match this filter.</p></div>`}</div>`;}
function nowLineHTML(){const h=Math.floor(NOW_MIN/60),m=NOW_MIN%60;return `<div class="tl-now"><span class="nt">Now · ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}</span><span class="nl"></span></div>`;}
/* slim row → click to expand a small detail card */
function tlRow(t){const sm=SRC[t.src];const p=PEOPLE[t.asg];const done=t.status==='Done';const over=homeDay(t)<11&&!done;const op=t._tlopen;
  return `<div class="tl-item ${done?'done':''} ${op?'open':''}" id="tl-${t.id}">
    <div class="tl-row" onclick="tlToggle('${t.id}')">
      <span class="tl-time ${over?'over':''}">${over?'late':(t.time||'')}</span>
      <span class="tl-dot" style="--c:${sm[1]}"></span>
      <div class="tl-t">${t.title}</div>
      <span class="tl-pd p-${t.pri[0]}" title="${t.pri} priority"></span>
      <button class="tl-ck ${done?'on':''}" onclick="event.stopPropagation();homeComplete('${t.id}')" title="${done?'Undo':'Complete'}">${svg(HICON.check,12)}</button>
      <span class="tl-chev">${svg('<path d="m6 9 6 6 6-6"/>',14)}</span>
    </div>
    ${op?`<div class="tl-exp">
      <div class="tl-exp-meta"><span class="tr-src" style="--c:${sm[1]}"><span class="d"></span>${sm[0]}</span><span class="tl-sep">·</span>${t.link}<span class="tl-sep">·</span><span class="tl-who">${av(t.asg)} ${p[2]}</span><span class="tl-sep">·</span>${t.est}<span class="tl-sep">·</span><span class="tl-xp">+${t.pts} XP</span></div>
      <div class="tl-exp-act"><button class="tp-act" onclick="event.stopPropagation();openTaskRec('${t.id}','home')">${svg(ARROW,14)} Open</button><button class="tp-act" onclick="homeSchedule(event,'${t.id}')">${svg(HICON.cal,14)} Schedule</button></div>
    </div>`:''}
  </div>`;}
function tlToggle(id){const t=TASKS.find(x=>x.id===id);if(!t)return;t._tlopen=!t._tlopen;const fl=document.getElementById('feedList');if(fl)fl.innerHTML=homeTimeline();}
function tlGroup(numHTML,wd,cnt,rows,cls){return `<div class="tl-day ${cls||''}"><div class="tl-num ${cls||''}">${numHTML}${wd?`<div class="wd">${wd}</div>`:''}${cnt?`<div class="cnt">${cnt}</div>`:''}</div><div class="tl-rows">${rows}</div></div>`;}
function homeTimeline(){const all=homeFilterMod?TASKS.filter(t=>t.src===homeFilterMod):TASKS;
  const active=all.filter(t=>t.status!=='Done');
  const byTime=(a,b)=>t2m(a.time)-t2m(b.time);
  /* completed tasks stay visible but sink to the bottom of their day, dimmed */
  const doneOf=d=>all.filter(t=>t.status==='Done'&&homeDay(t)===d).sort(byTime);
  const over=active.filter(t=>homeDay(t)<11).sort((a,b)=>homeDay(a)-homeDay(b)||byTime(a,b));
  const today=active.filter(t=>homeDay(t)===11).sort(byTime);
  const fdays=[...new Set(all.filter(t=>homeDay(t)>11).map(homeDay))].sort((a,b)=>a-b);
  let html='';
  if(over.length)html+=tlGroup(`<div class="lbl">${svg(WARN,13)} Overdue</div>`,'',over.length+' slipped',over.map(tlRow).join(''),'over');
  let trows='',np=false;today.forEach(t=>{if(!np&&t2m(t.time)>NOW_MIN){trows+=nowLineHTML();np=true;}trows+=tlRow(t);});if(!np)trows+=nowLineHTML();
  trows+=doneOf(11).map(tlRow).join('');
  html+=tlGroup(`<div class="d">11</div>`,WD[wdOf(11)]+' · Today',today.length+' scheduled',trows,'today');
  fdays.forEach(d=>{const rows=[...active.filter(t=>homeDay(t)===d).sort(byTime),...doneOf(d)];
    html+=tlGroup(`<div class="d">${d}</div>`,WD[wdOf(d)],rows.length+(d===12?' planned':' '),rows.map(tlRow).join(''));});
  return `<div class="timeline">${html}</div>`;}
function estMin(e){if(!e)return 60;let v=0;const h=e.match(/(\d+)\s*h/),m=e.match(/(\d+)\s*m/);if(h)v+=(+h[1])*60;if(m)v+=(+m[1]);return v||60;}
const SCH_START=8,SCH_END=18,HOUR_W=128,LANE_H=76;
/* Schedule outlook — horizontal time-blocked calendar: hours run left→right, each task
   a block positioned by start time + sized by duration, lane-packed to avoid overlap */
function homeHourRail(){const day=homeSelDay;const px=m=>((m-SCH_START*60)/60)*HOUR_W;
  const items=homeActiveTasks().filter(t=>homeDay(t)===day).map(t=>({t,s:t2m(t.time),e:t2m(t.time)+estMin(t.est)})).sort((a,b)=>a.s-b.s);
  const laneEnds=[];items.forEach(it=>{let l=laneEnds.findIndex(end=>end<=it.s);if(l<0){l=laneEnds.length;laneEnds.push(it.e);}else laneEnds[l]=it.e;it.lane=l;});
  const lanes=Math.max(1,laneEnds.length);
  let ruler='';for(let h=SCH_START;h<=SCH_END;h++)ruler+=`<span class="sched-hr" style="left:${px(h*60)}px">${String(h).padStart(2,'0')}:00</span>`;
  const blocks=items.map(it=>{const sm=SRC[it.t.src];const p=PEOPLE[it.t.asg];const w=Math.max(px(it.e)-px(it.s)-6,116);const done=it.t.status==='Done';
    return `<div class="sblock ${done?'done':''}" style="--c:${sm[1]};left:${px(it.s)}px;top:${it.lane*LANE_H+4}px;width:${w}px;height:${LANE_H-12}px" onclick="openTaskRec('${it.t.id}','home')"><div class="sb-t">${it.t.title}</div><div class="sb-m">${it.t.time} · ${sm[0]} · ${p[2]} · ${it.t.est}</div></div>`;}).join('');
  const now=(day===11)?`<div class="snow" style="left:${px(NOW_MIN)}px"><span class="snow-t">Now</span></div>`:'';
  const bodyW=px(SCH_END*60)+24,bodyH=lanes*LANE_H+8;
  return `<div class="sched"><div class="sched-inner" style="width:${bodyW}px">
    <div class="sched-head">${ruler}</div>
    <div class="sched-body" style="height:${bodyH}px;background-size:${HOUR_W}px 100%">${now}${blocks||'<div class="sched-empty">Nothing scheduled — pick another day.</div>'}</div>
  </div></div>`;}
function homeSetOutlook(v){homeOutlook=v;try{localStorage.setItem('ojo-home-view',v);}catch(e){}mountHome();}
function mountHome(){setRail('navHome');
  const h=new Date().getHours(),greet=h<12?'Good morning':h<17?'Good afternoon':'Good evening';
  const dstr=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
  const st=homeStats();const fmin=TASKS.reduce((a,t)=>a+(t.focusMin||0),0);
  const todayN=TASKS.filter(t=>t.status!=='Done'&&homeDay(t)===11).length;
  const qw=TASKS.filter(t=>t.status!=='Done'&&['15m','20m','30m'].includes(t.est)).length;
  const cellHint={timeline:"render:'timeline' · bind:'collection:Task' · orient:'"+homeOrient+"'",list:"render:'list' · bind:'collection:Task' · group:'"+homeGroup+"'",cards:"render:'cards' · bind:'collection:Task'"}[homeOutlook];
  const dayLabel=homeSelDay===11?'today':WD[wdOf(homeSelDay)]+', Jun '+homeSelDay;
  const fLbl=homeFilterMod?SRC[homeFilterMod][0]:'All';
  let body='';
  if(homeOutlook==='timeline')body=homeOrient==='horizontal'?(`<div class="hcal">${homeDayStrip()}</div>`+homeHourRail()):homeTimeline();
  else if(homeOutlook==='list')body=homeList();
  else{const list=homeDayTasks();body=homeMetrics()+`<div class="hcal">${homeDayStrip()}</div>`+`<div class="feed-controls2"><h2 class="fc-h">${homeSelDay===11?"Today's tasks":WD[wdOf(homeSelDay)]+', Jun '+homeSelDay}</h2></div>`+(list.length?`<div class="tgrid">${list.map(tcard).join('')}</div>`:`<div class="tp-empty"><div class="tp-empty-ic">${svg(HICON.check,26)}</div><h3>Nothing on ${dayLabel}</h3><p>You're all clear here.</p></div>`);}
  document.getElementById('screen').innerHTML=`<div class="homebox ${homeActCollapsed?'collapsed':''}" id="homebox">
    <div class="dmain hfeed"><div class="hfeed-scroll">
      <header class="hero"><div class="hero-l"><h1>${greet}, Vinoth.</h1><p class="hero-sub">${st.over?`<b class="over">${st.over} overdue</b> · `:''}${st.active} on your plate · ${streak}-day streak · ${fmin}m focused · ${dstr}</p></div>
        <button class="paneltoggle hero-act" id="homActBtn" onclick="homeToggleAct()"><span id="homActTxt">${homeActCollapsed?'Activity':'Hide activity'}</span>${svg('<path d="M15 18l-6-6 6-6"/>',14)}</button></header>
      <div class="home-controls"><span class="seg viewseg big">${HVIEWS.map(([k,l,ic])=>`<button class="${homeOutlook===k?'on':''}" onclick="homeSetOutlook('${k}')">${svg(ic,15)} ${l}</button>`).join('')}</span><span class="tp-sp"></span>${homeOutlook==='timeline'?`<span class="seg orientseg" title="Orientation">${ORIENTS.map(([o,ic])=>`<button class="${homeOrient===o?'on':''}" onclick="homeSetOrient('${o}')">${svg(ic,16)}</button>`).join('')}</span>`:''}<button class="hctrl-add" onclick="homeQuickOpen(event)">${svg(HICON.plus,15)}<span>Add task</span></button><button class="hctrl-filter ${homeFilterMod?'on':''}" onclick="openHomeFilter(event)" title="Filter & group">${svg(FILTER_IC,16)}<span>${fLbl}</span></button></div>
      <div class="feed-list" id="feedList">${body}</div>
    </div></div>
    <aside class="dpanel hact-panel">
      <div class="dpanel-head"><span class="nm">Recent activity</span><button class="ed" onclick="toast('All activity')">${svg('<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',15)}</button></div>
      <div class="dpanel-body">${activityFeed()}</div>
    </aside>
  </div>`;
  syncGenie();}

/* ===== Email tab + expandable right drawer (shared across all module panels) ===== */
const EMAILS=[
 {s:'Meeting Invitation - Hexathalon Apparel Brand',d:'03 Jun 2026',t:'5:51 PM',p:"You're Invited to a Teams Meeting Hi Aman bhai, …",b:"You're Invited to a Teams Meeting<br>Hi Aman bhai,<br>Please join the meeting using the link below:<br><br><b>Meeting Link:</b> <a>Click here to join Microsoft Teams</a><br>Meeting ID: <b>46154104439180</b><br><br>Looking forward to speaking with you!<br>Best regards,<br>Vinotham"},
 {s:'Meeting Invitation - Hexathalon Apparel Brand',d:'31 May 2026',t:'11:54 AM',p:"You're Invited to a Meeting Hi Aman bhai, Pl…",b:"You're Invited to a Meeting<br>Hi Aman bhai,<br>Please join the meeting using the link below:<br><br><b>Meeting Link:</b> <a>Click here to join</a><br>Or enter code: <b>raz-kuzy-aeh</b><br><br>Looking forward to speaking with you!<br>Best regards,<br>Vinotham"},
 {s:'Invoice PROF/0006 from Reliance',d:'07 May 2026',t:'4:02 PM',p:'Invoice PROF/0006 …',b:"Hi,<br>Please find attached Invoice <b>PROF/0006</b>.<br>Amount due: ₹1,20,000 · Due 21 May 2026.<br><br>Regards,<br>Accounts"},
 {s:'Service Level Agreement - Apparel',d:'07 May 2026',t:'9:18 AM',p:'Hi, Please find attached the Service Level Agreement (SLA) for your…',b:"Hi,<br>Please find attached the Service Level Agreement (SLA) for your review and signature.<br><br>Regards,<br>Vinotham"}];
const EMI={mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',chev:'<path d="m9 18 6-6-6-6"/>',back:'<path d="M19 12H5M12 19l-7-7 7-7"/>'};
function emailListHTML(){return `<div class="em-h">Sent by you ${svg(EMI.chev,14)}</div>
 ${EMAILS.map((e,i)=>`<div class="em-card" onclick="emOpen(${i})"><div class="es">${svg(EMI.mail,15)}<span>${e.s}</span></div><div class="ep">${e.p}</div><div class="ed2">${e.d}</div></div>`).join('')}
 <button class="em-new" onclick="toast('New mail (demo)')">${svg(EMI.mail,15)} New Mail</button>`;}
function emailViewHTML(i){const e=EMAILS[i];return `<button class="em-back" onclick="emBack()">${svg(EMI.back,14)} All emails</button>
 <div class="em-sub">${e.s}</div>
 <div class="em-meta"><div><span class="k">From</span>vinoth@palpx.com</div><div><span class="k">To</span>amanuay@gmail.com</div><div style="margin-left:auto;color:var(--faint)">${e.d} at ${e.t}</div></div>
 <div class="em-body">${e.b}</div>`;}
/* in-card panel expansion: the panel widens over the card's main area (its layout slot stays
   fixed via a negative left margin), so the main content never reflows or moves */
function pxBase(dp){if(!dp.dataset.bw)dp.dataset.bw=dp.offsetWidth||360;return parseFloat(dp.dataset.bw);}
function pxX(dp){return Math.max(0,parseFloat(dp.dataset.x||0));}
function pxRoomR(dp){const r=dp.getBoundingClientRect();const cur=dp.dataset.dir==='r'?pxX(dp):0;return Math.max(0,window.innerWidth-(r.right-cur)-28);}
/* every detail card (project, task, lead, employee, collection) reflows: dragging the divider resizes the
   main content instead of overlapping it, and both sides keep a real minimum width */
function pxReflow(box){return !!(box&&box.querySelector(':scope>.dmain'));}
const DMAIN_MIN=440;
/* total resizable width: auto-sized .dwrap cards must be frozen to their natural width once first dragged,
   so the panel has room to grow into; container-filling cards (the project card) just use their live width */
function pxTotal(box){if(box.closest('.dwrap')){if(!box.dataset.tot)box.dataset.tot=box.offsetWidth;return parseFloat(box.dataset.tot);}return box.offsetWidth;}
function pxRoomL(dp){const box=dp.closest('.dbox');return Math.max(0,(box?pxTotal(box):1100)-pxBase(dp)-(pxReflow(box)?DMAIN_MIN:120));}
function pxSet(dp,x,dir){
 const box=dp.closest('.dbox');const reflow=pxReflow(box);
 if(reflow)dir='l';
 else if(pxX(dp)>0)dir=dp.dataset.dir||'r';
 else if(!dir)dir=pxRoomR(dp)>=220?'r':'l';
 x=Math.max(0,Math.min(dir==='r'?pxRoomR(dp):pxRoomL(dp),x));
 dp.dataset.x=x;dp.dataset.dir=dir;
 /* reflow: drive the MAIN content's width (a definite flex-basis on the panel is ignored once its
    content min-width kicks in) and let the panel grow to fill — so the main content genuinely shrinks,
    never below DMAIN_MIN, instead of the panel overlapping it */
 if(reflow){const dm=box&&box.querySelector(':scope>.dmain');const dwrap=!!box.closest('.dwrap');
  if(x>0){const total=pxTotal(box);
   if(dwrap){box.style.width=total+'px';box.style.flexBasis=total+'px';box.style.flexGrow='0';box.style.flexShrink='0';}
   const dmw=Math.max(DMAIN_MIN,total-(pxBase(dp)+x));
   if(dm)dm.style.flex='0 0 '+dmw+'px';
   dp.style.flexGrow='1';dp.style.flexBasis='auto';dp.style.width='';dp.style.marginLeft='';dp.style.marginRight='';dp.classList.add('xw');}
  else{if(dm)dm.style.flex='';if(dwrap){box.style.width='';box.style.flexBasis='';box.style.flexGrow='';box.style.flexShrink='';delete box.dataset.tot;}
   dp.style.flexGrow='';dp.style.flexBasis='';dp.style.width='';dp.classList.remove('xw');dp.classList.remove('xr');delete dp.dataset.dir;}
  return;}
 if(x>0){const w=pxBase(dp)+x;dp.style.width=w+'px';dp.style.flexBasis=w+'px';
  if(dir==='r'){dp.style.marginRight=(-x)+'px';dp.style.marginLeft='';}else{dp.style.marginLeft=(-x)+'px';dp.style.marginRight='';}
  dp.classList.add('xw');dp.classList.toggle('xr',dir==='r');if(box)box.classList.add('pexp');}
 else{dp.style.width='';dp.style.flexBasis='';dp.style.marginLeft='';dp.style.marginRight='';dp.classList.remove('xw');dp.classList.remove('xr');delete dp.dataset.dir;if(box)box.classList.remove('pexp');}}
function xpShown(){return !!document.querySelector('.dpanel.xw');}
function xpClose(){document.querySelectorAll('.dpanel.xw').forEach(dp=>pxSet(dp,0));}
function xpOpenFrom(btn){const dp=btn.closest('.dpanel');if(!dp)return;pxSet(dp,pxX(dp)>0?0:340);}
function emOpen(i){const dp=event&&event.target.closest('.dpanel');if(!dp)return;const b=dp.querySelector('.dpanel-body');if(b)b.innerHTML=emailViewHTML(i);if(pxX(dp)<300)pxSet(dp,380);}
function emBack(){const dp=event&&event.target.closest('.dpanel');if(!dp)return;const b=dp.querySelector('.dpanel-body');if(b)b.innerHTML=emailListHTML();}
function isMobile(){return window.matchMedia('(max-width:700px)').matches;}
document.addEventListener('mousedown',e=>{if(isMobile())return;const dp=e.target.closest&&e.target.closest('.dpanel');if(!dp||e.target!==dp)return;
 const box=dp.closest('.dbox');if(box&&box.classList.contains('collapsed'))return;
 const r=dp.getBoundingClientRect();const onL=e.clientX-r.left<=8,onR=r.right-e.clientX<=8;
 if(!onL&&!onR)return;e.preventDefault();
 const dir=pxReflow(box)?'l':(pxX(dp)>0?(dp.dataset.dir||'r'):(onR?'r':'l'));
 const sx=e.clientX,s0=pxX(dp);dp.style.transition='none';
 const mv=ev=>pxSet(dp,s0+(dir==='r'?ev.clientX-sx:sx-ev.clientX),dir);
 const up=()=>{dp.style.transition='';document.removeEventListener('mousemove',mv);document.removeEventListener('mouseup',up);};
 document.addEventListener('mousemove',mv);document.addEventListener('mouseup',up);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&xpShown())xpClose();});

try{if(localStorage.getItem('ojo-theme')==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}
let _shell='hybrid';try{_shell=localStorage.getItem('ojo-shell')||'hybrid';}catch(e){}
setShell(_shell);
go('home');
/* Ojo Genie is the prominent, persistent anchor of the dock — open by default on
   desktop, contextual to the current screen, and reachable in one click anywhere. */
if(window.matchMedia('(min-width:701px)').matches)openSection('genie');
