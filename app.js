const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

const screens=$$(".screen");
const navItems=$$("[data-nav]");
const roomOverlay=$("#roomOverlay");
const roomTitle=$("#roomTitle");
const createSheet=$("#createSheet");
const giftSheet=$("#giftSheet");
const toolsSheet=$("#toolsSheet");
const featureSheet=$("#featureSheet");
const featureContent=$("#featureContent");

const featureViews={
  events:()=>`
    <div class="feature-head"><div><h2>🎉 Galaxy Carnival</h2><p>Monthly event • 6 days left</p></div><span class="balance-pill">🎟 1,240 tokens</span></div>
    <div class="progress-card"><h3>Your event progress</h3><p>Send gifts and complete event missions to unlock the Galaxy entry effect.</p><i><em style="width:64%"></em></i></div>
    <div class="rank-tabs"><button class="active">Top Gifts</button><button>Hosts</button><button>Rooms</button><button>Families</button></div>
    <div class="rank-list">
      <div class="rank-row"><strong>1</strong><span class="a1">M</span><div><b>Maya</b><small>Gift value</small></div><em>2.8M</em></div>
      <div class="rank-row"><strong>2</strong><span class="a3">A</span><div><b>Arjun</b><small>Gift value</small></div><em>2.3M</em></div>
      <div class="rank-row"><strong>3</strong><span class="a4">S</span><div><b>Sana</b><small>Gift value</small></div><em>1.9M</em></div>
      <div class="rank-row"><strong>4</strong><span class="a5">K</span><div><b>Kiran</b><small>Gift value</small></div><em>1.4M</em></div>
      <div class="rank-row"><strong>5</strong><span class="a2">R</span><div><b>Riya</b><small>Gift value</small></div><em>1.1M</em></div>
    </div>`,
  ranking:()=>`
    <div class="feature-head"><div><h2>🏆 Leaderboards</h2><p>Daily, weekly and monthly rankings</p></div><span class="balance-pill">You #12</span></div>
    <div class="rank-tabs"><button class="active">Charm</button><button>Wealth</button><button>Gift</button><button>Room</button><button>Family</button></div>
    <div class="rank-list">
      <div class="rank-row"><strong>1</strong><span class="a4">S</span><div><b>Sana</b><small>Charm queen</small></div><em>9.8M</em></div>
      <div class="rank-row"><strong>2</strong><span class="a1">M</span><div><b>Maya</b><small>Music host</small></div><em>8.7M</em></div>
      <div class="rank-row"><strong>3</strong><span class="a3">A</span><div><b>Arjun</b><small>Game king</small></div><em>7.4M</em></div>
      <div class="rank-row"><strong>12</strong><span class="a2">Y</span><div><b>You</b><small>Keep going!</small></div><em>1.2M</em></div>
    </div>`,
  games:()=>`
    <div class="feature-head"><div><h2>🎮 Game Center</h2><p>Party games that stay inside the room</p></div><span class="balance-pill">🎟 8 free plays</span></div>
    <div class="feature-grid">
      <button class="feature-card" data-game="Diamond Hunt"><span>💎</span><b>Diamond Hunt</b><small>Find reward diamonds and event tokens.</small></button>
      <button class="feature-card" data-game="Spin & Win"><span>🎡</span><b>Spin & Win</b><small>Free spins, cosmetics and reward points.</small></button>
      <button class="feature-card" data-game="Greedy"><span>🤑</span><b>Greedy</b><small>Party rounds with score-based rewards.</small></button>
      <button class="feature-card" data-game="Eat Ball"><span>🔵</span><b>Eat Ball</b><small>Fast casual room game with Game PK.</small></button>
      <button class="feature-card" data-game="Dice"><span>🎲</span><b>Lucky Dice</b><small>Quick random-room activity.</small></button>
      <button class="feature-card" data-game="Truth Dare"><span>🎭</span><b>Truth / Dare</b><small>Social prompts for room members.</small></button>
    </div>`,
  family:()=>`
    <div class="feature-head"><div><h2>🫶 Families</h2><p>Build a community and level up together</p></div><button class="primary-btn">Create</button></div>
    <div class="vip-hero"><small>YOUR FAMILY · LV.7</small><h3>Neon Tribe ⚡</h3><p>128 members · Rank #18 · 4.2M weekly activity</p></div>
    <div class="action-list">
      <button><span>✅</span><div><b>Family missions</b><small>Complete weekly tasks together</small></div><i>›</i></button>
      <button><span>🏆</span><div><b>Family leaderboard</b><small>Compete with other families</small></div><i>›</i></button>
      <button><span>🎁</span><div><b>Family rewards</b><small>Claim level and event rewards</small></div><i>›</i></button>
      <button><span>📢</span><div><b>Family announcements</b><small>Messages from leaders and admins</small></div><i>›</i></button>
    </div>`,
  moments:()=>`
    <div class="feature-head"><div><h2>✨ Moments</h2><p>Posts from friends and people you follow</p></div><button class="icon-btn">＋</button></div>
    <div class="action-list">
      <article><span class="a1">M</span><div><b>Maya · 12m</b><small>Late night room was a vibe 💜 · ❤️ 2.4K · 💬 189</small></div></article>
      <article><span class="a3">A</span><div><b>Arjun · 1h</b><small>Game PK tonight. Who is joining? 🎮 · ❤️ 980 · 💬 76</small></div></article>
      <article><span class="a4">S</span><div><b>Sana · 3h</b><small>Unlocked my new Galaxy frame ✨ · ❤️ 4.1K · 💬 312</small></div></article>
    </div>`,
  vip:()=>`
    <div class="feature-head"><div><h2>👑 VIP Center</h2><p>Premium identity, effects and room privileges</p></div><span class="balance-pill">VIP 2</span></div>
    <div class="vip-hero"><small>CURRENT VIP</small><h3>VIP 2 · 18 days left</h3><p>Level up through activity and supported VIP rules. Rewards can include exclusive frames, badges and entry effects.</p></div>
    <div class="vip-benefits">
      <article><span>✨</span><b>Entry effect</b><small>Premium room entrance</small></article>
      <article><span>🖼</span><b>Avatar frame</b><small>Exclusive VIP borders</small></article>
      <article><span>💬</span><b>Chat bubble</b><small>VIP message styling</small></article>
      <article><span>🎨</span><b>Name color</b><small>Special profile identity</small></article>
      <article><span>🚗</span><b>Vehicle</b><small>Animated entrance vehicle</small></article>
      <article><span>🎁</span><b>Gift badge</b><small>Extra gift presentation</small></article>
    </div>`,
  missions:()=>`
    <div class="feature-head"><div><h2>✅ Missions</h2><p>Daily, weekly and event tasks</p></div><span class="balance-pill">🔥 7 day streak</span></div>
    <div class="action-list">
      <button><span>🎙</span><div><b>Stay in rooms for 30 minutes</b><small>18 / 30 min · +50 points</small></div><i>60%</i></button>
      <button><span>🎁</span><div><b>Send 5 gifts</b><small>2 / 5 · +80 points</small></div><i>40%</i></button>
      <button><span>🎮</span><div><b>Play 2 games</b><small>1 / 2 · +1 free spin</small></div><i>50%</i></button>
      <button><span>👥</span><div><b>Invite a friend</b><small>0 / 1 · +100 points</small></div><i>0%</i></button>
    </div>`,
  wallet:()=>`
    <div class="feature-head"><div><h2>💎 Wallet</h2><p>Coins, diamonds and reward balances</p></div><span class="balance-pill">Secure wallet</span></div>
    <div class="feature-grid">
      <article class="feature-card"><span>💎</span><b>3,480 Diamonds</b><small>Gift and cosmetic balance</small></article>
      <article class="feature-card"><span>🪙</span><b>12,600 Coins</b><small>Activity and game balance</small></article>
      <article class="feature-card"><span>🎟</span><b>1,240 Tokens</b><small>Current event tokens</small></article>
      <article class="feature-card"><span>🎡</span><b>8 Spins</b><small>Free spin inventory</small></article>
    </div>
    <button class="primary-btn full" style="margin-top:12px">Recharge</button>`,
  inventory:()=>`
    <div class="feature-head"><div><h2>🎒 My Bag</h2><p>Your cosmetic collection</p></div><span class="balance-pill">24 items</span></div>
    <div class="feature-grid">
      <article class="feature-card"><span>🖼</span><b>Avatar Frames</b><small>6 owned</small></article>
      <article class="feature-card"><span>🚗</span><b>Vehicles</b><small>3 owned</small></article>
      <article class="feature-card"><span>💬</span><b>Chat Bubbles</b><small>5 owned</small></article>
      <article class="feature-card"><span>✨</span><b>Entry Effects</b><small>4 owned</small></article>
      <article class="feature-card"><span>🏅</span><b>Badges</b><small>4 owned</small></article>
      <article class="feature-card"><span>🎨</span><b>Room Themes</b><small>2 owned</small></article>
    </div>`,
  level:()=>`
    <div class="feature-head"><div><h2>⚡ Level 12</h2><p>Activity level and room unlocks</p></div><span class="balance-pill">12,480 XP</span></div>
    <div class="progress-card"><h3>Level 13</h3><p>2,520 XP remaining</p><i><em style="width:78%"></em></i></div>
    <div class="action-list">
      <article><span>💺</span><div><b>Room seat capacity</b><small>Level 1 starts with 8 seats; higher levels can unlock more.</small></div></article>
      <article><span>👑</span><div><b>Host & admin roles</b><small>Available from Level 1 for room management.</small></div></article>
      <article><span>✨</span><div><b>Level effects</b><small>Badges, room styles and profile unlocks.</small></div></article>
    </div>`,
  gifts:()=>`
    <div class="feature-head"><div><h2>🎁 Gift Collection</h2><p>Received, sent and couple gifts</p></div><span class="balance-pill">💖 1.2M charm</span></div>
    <div class="feature-grid">
      <article class="feature-card"><span>🌹</span><b>Rose ×1,240</b><small>Top sender: Maya</small></article>
      <article class="feature-card"><span>💞</span><b>Couple Heart ×328</b><small>Relationship collection</small></article>
      <article class="feature-card"><span>🚗</span><b>Supercar ×16</b><small>Luxury gift</small></article>
      <article class="feature-card"><span>🏰</span><b>Castle ×4</b><small>Premium gift</small></article>
    </div>`,
  visitors:()=>`
    <div class="feature-head"><div><h2>👀 Profile Visitors</h2><p>Recent people who visited your profile</p></div><span class="balance-pill">2.4K total</span></div>
    <div class="action-list">
      <article><span class="a1">M</span><div><b>Maya</b><small>Visited 3 minutes ago</small></div><i>Follow</i></article>
      <article><span class="a4">S</span><div><b>Sana</b><small>Visited 22 minutes ago</small></div><i>Following</i></article>
      <article><span class="a3">A</span><div><b>Arjun</b><small>Visited 1 hour ago</small></div><i>Follow</i></article>
    </div>`,
  store:()=>`
    <div class="feature-head"><div><h2>🛍 YouGo Store</h2><p>Customize how you appear across the app</p></div><span class="balance-pill">💎 3,480</span></div>
    <div class="feature-grid">
      <button class="feature-card"><span>🔥</span><b>Flame Frame</b><small>299 diamonds · 7 days</small></button>
      <button class="feature-card"><span>🚘</span><b>Neon Racer</b><small>699 diamonds · 7 days</small></button>
      <button class="feature-card"><span>🌌</span><b>Galaxy Entry</b><small>Event exclusive</small></button>
      <button class="feature-card"><span>💜</span><b>Love Bubble</b><small>199 diamonds · 7 days</small></button>
    </div>`,
  safety:()=>`
    <div class="feature-head"><div><h2>🛡 Safety & Privacy</h2><p>Control your experience and report problems</p></div></div>
    <div class="action-list">
      <button><span>🚫</span><div><b>Blocked users</b><small>Manage blocked accounts</small></div><i>›</i></button>
      <button><span>🔒</span><div><b>Privacy controls</b><small>Who can message, follow and invite you</small></div><i>›</i></button>
      <button><span>⚠️</span><div><b>Reports</b><small>Review reports you submitted</small></div><i>›</i></button>
      <button><span>👶</span><div><b>Age & safety settings</b><small>Safety protections and content controls</small></div><i>›</i></button>
    </div>`,
  music:()=>`
    <div class="feature-head"><div><h2>🎵 Room Music</h2><p>Host music queue</p></div><button class="icon-btn">＋</button></div>
    <div class="action-list">
      <article><span>▶️</span><div><b>Midnight Vibes</b><small>03:18 · Playing now</small></div><i>Ⅱ</i></article>
      <article><span>🎧</span><div><b>Dream Lights</b><small>02:54 · Up next</small></div><i>⋮</i></article>
      <article><span>🎧</span><div><b>Weekend Energy</b><small>03:42</small></div><i>⋮</i></article>
    </div>`,
  spin:()=>`
    <div class="mini-game"><span>🎡</span><h3>Spin & Win</h3><p>Win reward diamonds, event tokens, cosmetics or free spins. Rewards are in-app only.</p><button class="primary-btn" data-action="demo-spin">Spin now · FREE</button></div>`,
  diamond:()=>`
    <div class="mini-game"><span>💎</span><h3>Diamond Hunt</h3><p>Find hidden reward diamonds and event tokens. Daily attempts and rewards are configurable.</p><button class="primary-btn" data-action="demo-hunt">Start hunt</button></div>`,
  pocket:()=>`
    <div class="mini-game"><span>🧧</span><h3>Lucky Pocket</h3><p>Room members can open limited reward pockets dropped during live rooms.</p><button class="primary-btn" data-action="demo-pocket">Open pocket</button></div>`,
  dice:()=>`
    <div class="mini-game"><span>🎲</span><h3>Lucky Dice</h3><p>A quick social randomizer for room games and challenges.</p><button class="primary-btn" data-action="demo-dice">Roll dice</button></div>`,
  effects:()=>`
    <div class="feature-head"><div><h2>✨ Entry Effects</h2><p>Choose your room entrance animation</p></div></div>
    <div class="feature-grid"><button class="feature-card"><span>🚗</span><b>Neon Racer</b><small>Equipped</small></button><button class="feature-card"><span>🌌</span><b>Galaxy Gate</b><small>Event item</small></button><button class="feature-card"><span>🐉</span><b>Dragon</b><small>VIP exclusive</small></button><button class="feature-card"><span>💫</span><b>Star Trail</b><small>299 diamonds</small></button></div>`
};

function showScreen(name){
  screens.forEach(s=>s.classList.toggle("active",s.dataset.screen===name));
  navItems.forEach(n=>n.classList.toggle("active",n.dataset.nav===name));
  window.scrollTo({top:0,behavior:"smooth"});
}
function openSheet(el){ if(!el)return; el.classList.add("open"); el.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; }
function closeSheet(el){ if(!el)return; el.classList.remove("open"); el.setAttribute("aria-hidden","true"); if(!roomOverlay.classList.contains("open")) document.body.style.overflow=""; }
function openRoom(name="Late Night Talks ✨"){
  roomTitle.textContent=name;
  roomOverlay.classList.add("open");
  roomOverlay.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeRoom(){ roomOverlay.classList.remove("open"); roomOverlay.setAttribute("aria-hidden","true"); document.body.style.overflow=""; }
function openFeature(name){
  const render=featureViews[name]||(()=>`<div class="feature-head"><div><h2>Coming soon</h2><p>This YouGo module is reserved in the product map.</p></div></div>`);
  featureContent.innerHTML=render();
  openSheet(featureSheet);
}
function toast(message){
  let el=$(".toast");
  if(!el){el=document.createElement("div");el.className="toast";document.body.appendChild(el);}
  el.textContent=message;el.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove("show"),1800);
}

navItems.forEach(btn=>btn.addEventListener("click",()=>showScreen(btn.dataset.nav)));
$$("[data-room]").forEach(card=>card.addEventListener("click",e=>{if(e.target.closest("button"))return;openRoom(card.dataset.room)}));
$$("[data-panel]").forEach(btn=>btn.addEventListener("click",e=>{e.stopPropagation();openFeature(btn.dataset.panel)}));
$$(".person-card button").forEach(btn=>btn.addEventListener("click",e=>{e.stopPropagation();btn.textContent=btn.textContent==="Follow"?"Following":"Follow"}));
$$(".chip").forEach(chip=>chip.addEventListener("click",()=>{$$(".chip").forEach(c=>c.classList.remove("active"));chip.classList.add("active")}));
$$(".mode").forEach(mode=>mode.addEventListener("click",()=>{$$(".mode").forEach(m=>m.classList.remove("active"));mode.classList.add("active")}));
$$(".gift-grid button").forEach(btn=>btn.addEventListener("click",()=>{$$(".gift-grid button").forEach(b=>b.style.outline="");btn.style.outline="2px solid #d34cff"}));

$$("[data-room-mode]").forEach(btn=>btn.addEventListener("click",()=>{
  $$("[data-room-mode]").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  const mode=btn.dataset.roomMode;
  $$("[data-stage]").forEach(stage=>stage.classList.toggle("active",stage.dataset.stage===mode));
  toast(mode[0].toUpperCase()+mode.slice(1)+" mode active — room identity preserved");
}));

document.addEventListener("click",e=>{
  const action=e.target.closest("[data-action]")?.dataset.action;
  if(!action)return;
  if(action==="home")showScreen("home");
  if(action==="join-featured")openRoom("Late Night Talks ✨");
  if(action==="close-room")closeRoom();
  if(action==="create-room")openSheet(createSheet);
  if(action==="close-sheet")closeSheet(createSheet);
  if(action==="start-room"){closeSheet(createSheet);openRoom($(".field input")?.value||"My YouGo Room ✨");}
  if(action==="gift")openSheet(giftSheet);
  if(action==="close-gift")closeSheet(giftSheet);
  if(action==="room-tools")openSheet(toolsSheet);
  if(action==="close-tools")closeSheet(toolsSheet);
  if(action==="close-feature")closeSheet(featureSheet);
  if(action==="toggle-mic"){const b=e.target.closest("button");b.classList.toggle("muted");b.firstChild.textContent=b.classList.contains("muted")?"🔇":"🎤";toast(b.classList.contains("muted")?"Microphone muted":"Microphone on");}
  if(action==="pk"){closeSheet(toolsSheet);toast("Room PK started — team scores are now live");}
  if(action==="game-pk"){closeSheet(toolsSheet);$$("[data-room-mode]").find(b=>b.dataset.roomMode==="game")?.click();toast("Game PK mode ready");}
  if(action==="start-pk")toast("PK challenge opened");
  if(action==="search")toast("Search by room ID, user ID, name or family");
  if(action==="notifications")toast("Notifications center");
  if(action==="demo-spin"){e.target.textContent="🎁 +50 reward points";setTimeout(()=>e.target.textContent="Spin again",1200);}
  if(action==="demo-hunt"){e.target.textContent="💎 Found 12 reward diamonds";setTimeout(()=>e.target.textContent="Try again",1200);}
  if(action==="demo-pocket"){e.target.textContent="🎟 +25 event tokens";setTimeout(()=>e.target.textContent="Pocket opened",1200);}
  if(action==="demo-dice"){e.target.textContent="🎲 "+(Math.floor(Math.random()*6)+1);setTimeout(()=>e.target.textContent="Roll again",1200);}
});

featureSheet.addEventListener("click",e=>{
  const game=e.target.closest("[data-game]")?.dataset.game;
  if(game){toast(game+" selected");closeSheet(featureSheet);$$("[data-room-mode]").find(b=>b.dataset.roomMode==="game")?.click();if(!roomOverlay.classList.contains("open"))openRoom("Game Arena ⚡");}
  const tab=e.target.closest(".rank-tabs button");
  if(tab){$$(".rank-tabs button",tab.parentElement).forEach(b=>b.classList.remove("active"));tab.classList.add("active");}
});

giftSheet.addEventListener("click",e=>{
  const tab=e.target.closest(".gift-tabs button");
  if(tab){$$(".gift-tabs button").forEach(b=>b.classList.remove("active"));tab.classList.add("active");}
  if(e.target.matches(".primary-btn"))toast("Gift sent ✨");
});

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}


// Premium room interactions
function appendRoomMessage(text){
  const chat=$("#roomChat");
  if(!chat||!text.trim())return;
  const row=document.createElement("article");
  row.className="chat-line vip-chat";
  row.innerHTML=`
    <span class="chat-mini a2">Y</span>
    <div class="chat-body">
      <div class="chat-meta"><em class="badge vip">VIP2</em><em class="badge level">LV.12</em><b>You</b></div>
      <p></p>
    </div>`;
  row.querySelector("p").textContent=text.trim();
  chat.appendChild(row);
  chat.scrollTop=chat.scrollHeight;
}

function openSeatProfile(seat){
  const name=seat.querySelector("b")?.textContent?.trim()||"YouGo member";
  const frame=seat.querySelector(".seat-frame")?.className||"";
  const frameName=frame.includes("royal")?"Royal Crown":frame.includes("angel")?"Angel Wings":frame.includes("ice")?"Ice Crystal":frame.includes("gold")?"Golden Orbit":frame.includes("love")?"Love Aura":"Neon Pulse";
  featureContent.innerHTML=`
    <div class="feature-head">
      <div><h2>👤 ${name}</h2><p>Room profile preview</p></div>
      <span class="balance-pill">Online</span>
    </div>
    <div class="vip-hero">
      <small>EQUIPPED PROFILE FRAME</small>
      <h3>${frameName}</h3>
      <p>Frames appear on room seats, profile, entrance banner and selected chat styles.</p>
    </div>
    <div class="feature-grid">
      <button class="feature-card"><span>💬</span><b>Message</b><small>Start a private chat</small></button>
      <button class="feature-card"><span>➕</span><b>Follow</b><small>Follow this member</small></button>
      <button class="feature-card"><span>🎁</span><b>Send gift</b><small>Open gift shop</small></button>
      <button class="feature-card"><span>🏅</span><b>Badges</b><small>VIP, level and event badges</small></button>
    </div>`;
  openSheet(featureSheet);
}

document.addEventListener("click",e=>{
  const action=e.target.closest("[data-action]")?.dataset.action;
  if(action==="send-chat"){
    const input=$("#roomMessage");
    appendRoomMessage(input?.value||"");
    if(input)input.value="";
  }
  if(action==="emoji")toast("Emoji panel ready");
  if(action==="chat-more")toast("Chat tools: mentions, effects, quick replies");
  const seat=e.target.closest(".seat.deluxe");
  if(seat&&!e.target.closest("[data-action]"))openSeatProfile(seat);
});

document.addEventListener("keydown",e=>{
  if(e.key==="Enter"&&e.target?.id==="roomMessage"){
    e.preventDefault();
    appendRoomMessage(e.target.value);
    e.target.value="";
  }
});
