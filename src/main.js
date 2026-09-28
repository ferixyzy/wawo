import "./styles/global.css";
import "./styles/glass.css";
import "./styles/animations.css";
import "./styles/responsive.css";
import { demoChats, demoMessages } from "./data/demoData.js";

const ICONS = {
  search:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="11" cy="11" r="6.8"/><path d="m16.2 16.2 4.1 4.1"/></svg>`,
  plus:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`,
  back:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 5-7 7 7 7"/><path d="M8 12h12"/></svg>`,
  video:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6.5" width="12.5" height="11" rx="3"/><path d="m15.5 10 5-3v10l-5-3"/></svg>`,
  phone:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7.4 4.2 10 3l2 5-2.1 1.5c1 2.1 2.4 3.5 4.5 4.5l1.5-2.1 5 2-1.2 2.6c-.5 1.1-1.6 1.8-2.8 1.7-6.4-.7-10.9-5.2-11.6-11.6-.1-1.2.6-2.3 1.7-2.9Z"/></svg>`,
  more:`<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>`,
  chat:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 5.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 3v-3H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"/></svg>`,
  updates:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5"/><path d="M12 7v5l3.2 2"/></svg>`,
  community:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3.5 19c.6-3.1 2.5-4.7 5.5-4.7s4.9 1.6 5.5 4.7M15 14.7c2.8-.2 4.7 1.1 5.3 4.3"/></svg>`,
  calls:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7.4 4.2 10 3l2 5-2.1 1.5c1 2.1 2.4 3.5 4.5 4.5l1.5-2.1 5 2-1.2 2.6c-.5 1.1-1.6 1.8-2.8 1.7-6.4-.7-10.9-5.2-11.6-11.6-.1-1.2.6-2.3 1.7-2.9Z"/></svg>`,
  settings:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9.8 3h4.4l.6 2.1 1.8 1 2-.8 2.2 3.8-1.5 1.5v2.1l1.5 1.5-2.2 3.8-2-.8-1.8 1-.6 2.1H9.8l-.6-2.1-1.8-1-2 .8-2.2-3.8 1.5-1.5v-2.1L3.2 9.1l2.2-3.8 2 .8 1.8-1L9.8 3Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  send:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 4 16 8-16 8 3.1-8L4 4Z"/><path d="M7.2 12H20"/></svg>`,
  mic:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="3" width="8" height="12" rx="4"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M8.5 21h7"/></svg>`,
  attach:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 12.5 6.2-6.2a3.1 3.1 0 0 1 4.4 4.4l-8.3 8.3a5 5 0 0 1-7-7l7.7-7.7"/></svg>`,
  close:`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
  check:`<svg class="small-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>`
};

const store = {
  get(key, fallback){ try { const v=localStorage.getItem(key); return v===null?fallback:JSON.parse(v); } catch { return fallback; }},
  set(key,val){ try{localStorage.setItem(key,JSON.stringify(val));}catch{}}
};

const state = {
  tab:"chats", search:"", activeChat:null, theme:store.get("wamo-theme","system"),
  chats:store.get("wamo-chats",demoChats), messages:store.get("wamo-messages",demoMessages),
  settings:store.get("wamo-settings",{notifications:true,calls:true,sounds:true,glass:"high"})
};

function themeMode(){
  if(state.theme==="system") return matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";
  return state.theme;
}
function applyTheme(){document.documentElement.dataset.theme=themeMode();}

function avatar(chat){return `<div class="avatar ${chat.tone}">${chat.initials}${chat.online?'<i class="online-dot"></i>':''}</div>`}

function nav(){
  const items=[["chats","Chats","chat"],["updates","Updates","updates"],["communities","Communities","community"],["calls","Calls","calls"],["settings","Settings","settings"]];
  return `<nav class="bottom-nav glass" aria-label="Main navigation">${items.map(([id,label,icon])=>
    `<button class="nav-btn ${state.tab===id?"active":""}" data-tab="${id}" aria-label="${label}">${ICONS[icon]}<span>${label}</span></button>`).join("")}</nav>`;
}

function home(){
  const filtered=state.chats.filter(c=>`${c.name} ${c.message}`.toLowerCase().includes(state.search.toLowerCase()));
  return `<section class="screen" id="home-screen">
    <header class="topbar">
      <h1>${state.tab==="chats"?"Chats":state.tab[0].toUpperCase()+state.tab.slice(1)}</h1>
      <div class="top-actions">
        <button class="icon-btn glass" data-action="profile" aria-label="Profile">${avatar({initials:"W",tone:"blue",online:false}).replace('52px','')}</button>
        <button class="icon-btn glass" data-action="newchat" aria-label="New chat">${ICONS.plus}</button>
      </div>
    </header>
    ${state.tab==="chats"?`
      <div class="search-wrap"><label class="search glass" id="search-box">${ICONS.search}<input id="search-input" value="${escapeHtml(state.search)}" placeholder="Search" aria-label="Search conversations"></label></div>
      <main class="list" id="chat-list">${filtered.length?filtered.map((c,i)=>chatRow(c,i)).join(""):emptySearch()}</main>
    `:tabPlaceholder(state.tab)}
    ${nav()}
  </section>`;
}
function chatRow(c,i){return `<button class="chat-row pop" style="animation-delay:${Math.min(i*35,240)}ms" data-chat="${c.id}">${avatar(c)}<span class="chat-main"><span class="chat-top"><span class="chat-name">${escapeHtml(c.name)}</span><span class="chat-time">${c.time}</span></span><span class="chat-bottom"><span class="chat-preview">${c.muted?"Muted · ":""}${escapeHtml(c.message)}</span>${c.unread?`<b class="unread">${c.unread}</b>`:""}</span></span></button>`}
function emptySearch(){return `<div style="padding:70px 24px;text-align:center;color:var(--muted)"><div class="glass" style="width:70px;height:70px;border-radius:24px;margin:auto;display:grid;place-items:center">${ICONS.search}</div><h3 style="color:var(--text)">No conversations found</h3><p>Try another name or message.</p></div>`}
function tabPlaceholder(tab){
  const title={updates:"Stay connected",communities:"Your communities",calls:"Keep in touch",settings:"Preferences"}[tab];
  return `<main class="list" style="padding-top:35px"><div class="glass pop" style="border-radius:30px;padding:28px 22px;text-align:center"><div class="avatar blue" style="margin:auto;width:68px;height:68px;border-radius:23px">${tab==="settings"?ICONS.settings:ICONS.chat}</div><h2>${title}</h2><p style="color:var(--muted)">This area is ready for your local WAMO experience.</p>${tab==="settings"?settingsMarkup():""}</div></main>`;
}

function settingsMarkup(){
 return `<div style="margin-top:20px;text-align:left">
   ${settingRow("notifications","Message notifications",state.settings.notifications,"toggle")}
   ${settingRow("calls","Call notifications",state.settings.calls,"toggle")}
   ${settingRow("sounds","Sounds",state.settings.sounds,"toggle")}
   <div class="setting-row"><span>Theme</span><button class="select-btn" data-action="theme">${state.theme[0].toUpperCase()+state.theme.slice(1)}</button></div>
   <div class="setting-row"><span>Liquid Glass</span><button class="select-btn" data-action="glass">${state.settings.glass}</button></div>
   <div class="setting-row"><span>App version</span><span style="color:var(--muted)">1.0.0</span></div>
 </div>`;
}
function settingRow(key,label,value){return `<div class="setting-row"><span>${label}</span><button class="toggle ${value?"on":""}" data-toggle="${key}" aria-label="${label}"><i></i></button></div>`}

function chatScreen(chat){
 const msgs=state.messages[chat.id]||[];
 return `<section class="screen chat-open" id="chat-screen">
  <header class="chat-header glass">
    <button class="icon-btn" data-action="back" aria-label="Back">${ICONS.back}</button>
    ${avatar(chat)}
    <div class="contact"><strong>${escapeHtml(chat.name)}</strong><span>${chat.online?"online":"last seen recently"}</span></div>
    <div class="chat-actions"><button class="icon-btn" data-action="call" aria-label="Voice call">${ICONS.phone}</button><button class="icon-btn" data-action="video" aria-label="Video call">${ICONS.video}</button><button class="icon-btn" data-action="more" aria-label="More">${ICONS.more}</button></div>
  </header>
  <main class="messages" id="messages">${msgs.map(messageMarkup).join("")}<div id="typing" class="typing hidden"><span></span><span></span><span></span></div></main>
  <form class="composer glass" id="composer">
    <button type="button" class="composer-btn" data-action="attach" aria-label="Attachment">${ICONS.attach}</button>
    <textarea id="message-input" rows="1" maxlength="1000" placeholder="Message"></textarea>
    <button type="button" class="composer-btn mic-btn" data-action="mic" aria-label="Voice message">${ICONS.mic}</button>
    <button type="submit" class="send-btn" aria-label="Send message">${ICONS.send}</button>
  </form>
 </section>`;
}
function messageMarkup(m){
 return `<div class="message-line ${m.from==="me"?"out":"in"} msg-in"><div class="bubble">${escapeHtml(m.text)}<span class="meta">${m.time}${m.from==="me"?` ${m.read?'<span class="read">✓✓</span>':'✓'}`:""}</span></div></div>`;
}

function profileModal(){
 return `<div class="modal-backdrop" data-close="modal"><section class="sheet modal glass-strong" role="dialog" aria-modal="true">
 <div class="sheet-handle"></div><button class="modal-close" data-close="modal">${ICONS.close}</button>
 <div class="profile-big">${avatar({initials:"W",tone:"blue",online:true})}</div><h2 style="text-align:center;margin:12px 0 3px">WAMO User</h2><p style="text-align:center;color:var(--muted)">Available for messages</p>
 <div class="profile-card glass"><div><b>About</b><span>Building something great.</span></div><div><b>Phone</b><span>Local demo profile</span></div></div>
 </section></div>`;
}
function attachmentModal(){
 return `<div class="modal-backdrop" data-close="modal"><section class="sheet modal glass-strong"><div class="sheet-handle"></div><h3>Add to message</h3><div class="attach-grid">
 ${[["Photo","◌"],["Document","▤"],["Contact","◯"],["Location","⌖"]].map(x=>`<button class="attach-item" data-action="attach-item"><strong>${x[1]}</strong><span>${x[0]}</span></button>`).join("")}</div></section></div>`;
}
function moreModal(){
 return `<div class="modal-backdrop" data-close="modal"><section class="sheet modal glass-strong"><div class="sheet-handle"></div><h3>Conversation</h3>
 <button class="menu-item" data-action="mark-read">Mark as read</button><button class="menu-item" data-action="contact-info">Contact info</button><button class="menu-item" data-close="modal">Cancel</button></section></div>`;
}

function settingsFull(){
 return `<section class="screen" id="settings-screen"><header class="topbar"><h1>Settings</h1></header><main class="settings-list">
 <div class="settings-profile glass" data-action="profile">${avatar({initials:"W",tone:"blue",online:true})}<div><b>WAMO User</b><span>Available for messages</span></div>${ICONS.back}</div>
 <h4>Account</h4><div class="settings-card glass">${["Privacy","Security","Change number"].map(x=>`<button class="menu-item">${x}<span>›</span></button>`).join("")}</div>
 <h4>Chats</h4><div class="settings-card glass">${["Theme","Wallpapers","Chat settings"].map(x=>`<button class="menu-item" data-action="${x==="Theme"?"theme":""}">${x}<span>›</span></button>`).join("")}</div>
 <h4>Notifications</h4><div class="settings-card glass">${settingRow("notifications","Message notifications",state.settings.notifications)}${settingRow("calls","Call notifications",state.settings.calls)}${settingRow("sounds","Sounds",state.settings.sounds)}</div>
 <h4>Appearance</h4><div class="settings-card glass"><button class="menu-item" data-action="theme">Theme <span>${state.theme}</span></button><button class="menu-item" data-action="glass">Liquid Glass <span>${state.settings.glass}</span></button></div>
 <h4>About</h4><div class="settings-card glass">${["App version 1.0.0","Terms","Privacy"].map(x=>`<button class="menu-item">${x}<span>›</span></button>`).join("")}</div>
 </main>${nav()}</section>`;
}

function render(){
 applyTheme();
 const app=document.querySelector("#app");
 app.innerHTML=`<div class="app">${state.activeChat?home()+chatScreen(state.activeChat):state.tab==="settings"?settingsFull():home()}${window._modal||""}</div>`;
 bind();
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function persist(){store.set("wamo-chats",state.chats);store.set("wamo-messages",state.messages);store.set("wamo-theme",state.theme);store.set("wamo-settings",state.settings)}

function bind(){
 document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;state.activeChat=null;render()});
 document.querySelectorAll("[data-chat]").forEach(b=>b.onclick=()=>openChat(b.dataset.chat));
 const search=document.querySelector("#search-input");
 if(search){search.oninput=e=>{state.search=e.target.value;updateList()};}
 document.querySelector("#composer")?.addEventListener("submit",sendMessage);
 const input=document.querySelector("#message-input");
 if(input){
   input.addEventListener("input",()=>{input.style.height="auto";input.style.height=Math.min(input.scrollHeight,120)+"px";document.querySelector(".send-btn")?.classList.toggle("ready",input.value.trim().length>0)});
   setTimeout(()=>input.focus(),80);
 }
 document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>action(b.dataset.action));
 document.querySelectorAll("[data-toggle]").forEach(b=>b.onclick=()=>{state.settings[b.dataset.toggle]=!state.settings[b.dataset.toggle];persist();render()});
 document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>{window._modal="";render()});
 const list=document.querySelector("#messages");if(list)list.scrollTop=list.scrollHeight;
}
function updateList(){
 const list=document.querySelector("#chat-list");if(!list)return;
 const f=state.chats.filter(c=>`${c.name} ${c.message}`.toLowerCase().includes(state.search.toLowerCase()));
 list.innerHTML=f.length?f.map((c,i)=>chatRow(c,i)).join(""):emptySearch();
 list.querySelectorAll("[data-chat]").forEach(b=>b.onclick=()=>openChat(b.dataset.chat));
}
function openChat(id){
 const chat=state.chats.find(c=>c.id===id); if(!chat)return;
 chat.unread=0;state.activeChat=chat;persist();render();
}
function sendMessage(e){
 e.preventDefault();const input=document.querySelector("#message-input");const text=input?.value.trim();
 if(!text||!state.activeChat)return;
 const id=Date.now();const time=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
 (state.messages[state.activeChat.id] ||= []).push({id,from:"me",text,time,read:true});
 const chat=state.chats.find(c=>c.id===state.activeChat.id);if(chat){chat.message=text;chat.time=time;chat.unread=0}
 persist();render();
 setTimeout(()=>simulateReply(state.activeChat?.id),900+Math.random()*900);
}
function simulateReply(chatId){
 if(!chatId||!state.activeChat||state.activeChat.id!==chatId)return;
 const replies=["Sounds good.","Absolutely!","Got it — thanks.","Let me check and get back to you.","Nice, I like that."];
 const chat=state.chats.find(c=>c.id===chatId);if(!chat)return;
 const text=replies[Math.floor(Math.random()*replies.length)];
 (state.messages[chatId] ||= []).push({id:Date.now(),from:"them",text,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),read:true});
 chat.message=text;chat.time="now";persist();render();
}
function action(type){
 if(type==="back"){state.activeChat=null;render();return}
 if(type==="profile"){window._modal=profileModal();render();return}
 if(type==="attach"){window._modal=attachmentModal();render();return}
 if(type==="more"){window._modal=moreModal();render();return}
 if(type==="mark-read"){if(state.activeChat){const c=state.chats.find(x=>x.id===state.activeChat.id);if(c)c.unread=0}window._modal="";persist();render();return}
 if(type==="contact-info"){window._modal=profileModal();render();return}
 if(type==="attach-item"){window._modal="";render();return}
 if(type==="mic"){toast("Voice message demo");return}
 if(type==="call"||type==="video"){toast(type==="call"?"Voice call demo":"Video call demo");return}
 if(type==="newchat"){toast("New chat demo — search a conversation to open it");return}
 if(type==="theme"){cycleTheme();return}
 if(type==="glass"){state.settings.glass=state.settings.glass==="high"?"medium":state.settings.glass==="medium"?"low":"high";persist();render();return}
}
function cycleTheme(){state.theme=state.theme==="system"?"light":state.theme==="light"?"dark":"system";persist();render()}
let toastTimer;
function toast(message){
 clearTimeout(toastTimer);const old=document.querySelector(".toast");old?.remove();
 const el=document.createElement("div");el.className="toast glass";el.textContent=message;document.querySelector(".app").appendChild(el);
 toastTimer=setTimeout(()=>el.remove(),1800);
}

applyTheme();
render();
if("serviceWorker" in navigator && location.protocol!=="file:"){
 window.addEventListener("load",()=>navigator.serviceWorker.register("/service-worker.js").catch(()=>{}));
}
window.matchMedia("(prefers-color-scheme:dark)").addEventListener?.("change",()=>{if(state.theme==="system")applyTheme()});
