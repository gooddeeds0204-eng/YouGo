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
const onboardingSheet=$("#onboardingSheet");

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
    <div class="feature-grid"><button class="feature-card"><span>🚗</span><b>Neon Racer</b><small>Equipped</small></button><button class="feature-card"><span>🌌</span><b>Galaxy Gate</b><small>Event item</small></button><button class="feature-card"><span>🐉</span><b>Dragon</b><small>VIP exclusive</small></button><button class="feature-card"><span>💫</span><b>Star Trail</b><small>299 diamonds</small></button></div>`,
  couple:()=>`
    <div class="feature-head"><div><h2>💞 Couple Space</h2><p>Your relationship level, gifts and shared memories</p></div><span class="balance-pill">Bond Lv.8</span></div>
    <div class="couple-hero">
      <span class="couple-avatar a2">Y</span><div class="couple-heart">♥</div><span class="couple-avatar a1">M</span>
      <h3>You & Maya</h3><p>Bond score 82,450 · Anniversary in 18 days</p>
      <i><em style="width:82%"></em></i>
    </div>
    <div class="feature-grid">
      <button class="feature-card" data-demo-action="couple-gift"><span>💝</span><b>Couple Gifts</b><small>Exclusive relationship gifts</small></button>
      <button class="feature-card" data-demo-action="couple-mission"><span>✅</span><b>Couple Missions</b><small>Daily shared activities</small></button>
      <button class="feature-card"><span>📸</span><b>Memories</b><small>Shared photos and milestones</small></button>
      <button class="feature-card"><span>💍</span><b>Bond Badge</b><small>Display your couple identity</small></button>
    </div>`,
  hostCenter:()=>`
    <div class="feature-head"><div><h2>🎙 Host Center</h2><p>Room growth, moderation and host progress</p></div><span class="balance-pill">Host Lv.6</span></div>
    <div class="stats-grid">
      <article><b>18.4K</b><small>Weekly visitors</small></article><article><b>4.8K</b><small>New followers</small></article>
      <article><b>2.1M</b><small>Gift charm</small></article><article><b>92%</b><small>Room health</small></article>
    </div>
    <div class="action-list">
      <button data-panel="roomSettings"><span>⚙️</span><div><b>Room management</b><small>Name, cover, privacy and welcome message</small></div><i>›</i></button>
      <button data-panel="adminRoles"><span>👑</span><div><b>Admins & moderators</b><small>Assign room management roles</small></div><i>›</i></button>
      <button data-panel="members"><span>👥</span><div><b>Member insights</b><small>Audience, speakers and regular visitors</small></div><i>›</i></button>
      <button data-panel="missions"><span>🏅</span><div><b>Host missions</b><small>Grow activity and unlock host cosmetics</small></div><i>›</i></button>
    </div>`,
  dailyCheckin:()=>`
    <div class="feature-head"><div><h2>📅 Daily Check-in</h2><p>Keep your streak and collect in-app rewards</p></div><span class="balance-pill">🔥 7 days</span></div>
    <div class="checkin-grid">
      <button class="claimed"><span>1</span><b>🪙 50</b><small>Claimed</small></button>
      <button class="claimed"><span>2</span><b>🎟 20</b><small>Claimed</small></button>
      <button class="claimed"><span>3</span><b>💎 5</b><small>Claimed</small></button>
      <button class="claimed"><span>4</span><b>🎡 1</b><small>Claimed</small></button>
      <button class="claimed"><span>5</span><b>🪙 100</b><small>Claimed</small></button>
      <button class="claimed"><span>6</span><b>🎟 40</b><small>Claimed</small></button>
      <button class="today" data-demo-action="checkin"><span>7</span><b>🎁</b><small>Claim today</small></button>
    </div>`,
  achievements:()=>`
    <div class="feature-head"><div><h2>🏅 Achievements</h2><p>Badges, milestones and profile titles</p></div><span class="balance-pill">18 / 64</span></div>
    <div class="achievement-grid">
      <article class="unlocked"><span>🎙</span><b>Room Starter</b><small>Create your first room</small></article>
      <article class="unlocked"><span>💬</span><b>Social Spark</b><small>Send 1,000 room messages</small></article>
      <article class="unlocked"><span>🎁</span><b>Gift Giver</b><small>Send 100 gifts</small></article>
      <article><span>👑</span><b>VIP Legend</b><small>Reach VIP 5</small></article>
      <article><span>🏆</span><b>Top 10</b><small>Enter a monthly leaderboard top 10</small></article>
      <article><span>🫶</span><b>Family Star</b><small>Reach Family Lv.10</small></article>
    </div>`,
  settings:()=>`
    <div class="feature-head"><div><h2>⚙️ Settings</h2><p>Account, app and notification preferences</p></div></div>
    <div class="control-list">
      <label><div><b>Push notifications</b><small>Messages, gifts, events and room invites</small></div><input type="checkbox" checked /></label>
      <label><div><b>Room invitation alerts</b><small>Friends and family invitations</small></div><input type="checkbox" checked /></label>
      <label><div><b>Gift animations</b><small>Show full-screen premium gift effects</small></div><input type="checkbox" checked /></label>
      <label><div><b>Auto-play entry effects</b><small>Show VIP vehicles and entrance effects</small></div><input type="checkbox" checked /></label>
    </div>
    <div class="action-list" style="margin-top:10px">
      <button data-demo-action="language"><span>🌐</span><div><b>Language</b><small>English · Telugu · Hindi</small></div><i>›</i></button>
      <button data-demo-action="account"><span>👤</span><div><b>Account & security</b><small>Phone, password and connected account</small></div><i>›</i></button>
      <button data-panel="safety"><span>🛡</span><div><b>Privacy & safety</b><small>Messaging, blocking and report settings</small></div><i>›</i></button>
      <button data-demo-action="support"><span>❓</span><div><b>Help & support</b><small>FAQs, feedback and contact support</small></div><i>›</i></button>
    </div>`,
  members:()=>`
    <div class="feature-head"><div><h2>👥 Room Members</h2><p>Speakers, audience and regular visitors</p></div><span class="balance-pill">1.8K online</span></div>
    <div class="member-tabs"><button class="active">Speakers 6</button><button>Audience 1.8K</button><button>Following 84</button></div>
    <div class="member-list">
      <article><span class="a1">M</span><div><b>Maya 👑</b><small>Owner · VIP 6 · Lv.58</small></div><button>Owner</button></article>
      <article><span class="a3">A</span><div><b>Arjun</b><small>Admin · Lv.46</small></div><button data-demo-action="member-menu">Manage</button></article>
      <article><span class="a4">S</span><div><b>Sana</b><small>Speaker · VIP 3</small></div><button data-demo-action="member-menu">Manage</button></article>
      <article><span class="a5">K</span><div><b>Kiran</b><small>Speaker · Lv.39</small></div><button data-demo-action="member-menu">Manage</button></article>
    </div>`,
  roomSettings:()=>`
    <div class="feature-head"><div><h2>⚙️ Room Settings</h2><p>Configure the persistent room container</p></div></div>
    <div class="form-stack">
      <label><span>Room name</span><input value="Late Night Talks ✨" /></label>
      <label><span>Announcement</span><textarea>Welcome! Be kind • No spam • Follow the host for updates</textarea></label>
      <label><span>Room category</span><select><option>Friends & Chat</option><option>Music</option><option>Games</option><option>Dating</option></select></label>
      <label><span>Privacy</span><select><option>Public</option><option>Friends only</option><option>Password</option></select></label>
    </div>
    <div class="control-list" style="margin-top:10px">
      <label><div><b>Allow seat requests</b><small>Audience members can request a mic seat</small></div><input type="checkbox" checked /></label>
      <label><div><b>Allow gifts</b><small>Enable room gift interactions</small></div><input type="checkbox" checked /></label>
      <label><div><b>Show room on Discover</b><small>Eligible public rooms can be recommended</small></div><input type="checkbox" checked /></label>
    </div>
    <button class="primary-btn full" data-demo-action="save-room" style="margin-top:12px">Save settings</button>`,
  seatSettings:()=>`
    <div class="feature-head"><div><h2>💺 Seat Settings</h2><p>Level 1 starts with 8 seats; higher room levels can unlock more.</p></div><span class="balance-pill">8 seats</span></div>
    <div class="seat-control-grid">
      <button class="active" data-seat-control="1"><span>1</span><b>Host</b><small>Locked owner</small></button>
      <button class="active" data-seat-control="2"><span>2</span><b>Admin</b><small>Open</small></button>
      <button class="active" data-seat-control="3"><span>3</span><b>Speaker</b><small>Open</small></button>
      <button class="active" data-seat-control="4"><span>4</span><b>Speaker</b><small>Open</small></button>
      <button data-seat-control="5"><span>5</span><b>Empty</b><small>Tap to lock</small></button>
      <button data-seat-control="6"><span>6</span><b>Empty</b><small>Tap to lock</small></button>
      <button class="locked" data-seat-control="7"><span>7</span><b>Locked</b><small>Tap to open</small></button>
      <button data-seat-control="8"><span>8</span><b>Empty</b><small>Tap to lock</small></button>
    </div>`,
  broadcast:()=>`
    <div class="feature-head"><div><h2>📢 Room Broadcast</h2><p>Pin a message for everyone in the room</p></div></div>
    <div class="form-stack">
      <label><span>Broadcast message</span><textarea id="broadcastText" maxlength="120">PK starts in 5 minutes! 🔥</textarea></label>
    </div>
    <div class="feature-grid" style="margin-top:10px">
      <button class="feature-card" data-demo-action="broadcast-normal"><span>📢</span><b>Normal</b><small>Standard room announcement</small></button>
      <button class="feature-card" data-demo-action="broadcast-highlight"><span>✨</span><b>Highlight</b><small>Premium animated banner</small></button>
    </div>`,
  memberMgmt:()=>`
    <div class="feature-head"><div><h2>🛡 Member Management</h2><p>Moderation actions for room safety</p></div></div>
    <div class="action-list">
      <button data-demo-action="mute-member"><span>🔇</span><div><b>Mute member</b><small>Temporarily stop a member from speaking</small></div><i>›</i></button>
      <button data-demo-action="remove-seat"><span>💺</span><div><b>Remove from seat</b><small>Move speaker back to audience</small></div><i>›</i></button>
      <button data-demo-action="kick-member"><span>🚪</span><div><b>Remove from room</b><small>Kick a member from the current room</small></div><i>›</i></button>
      <button data-demo-action="block-room"><span>🚫</span><div><b>Room block</b><small>Prevent a member from rejoining</small></div><i>›</i></button>
      <button data-demo-action="report-member"><span>⚠️</span><div><b>Report</b><small>Submit a safety report</small></div><i>›</i></button>
    </div>`,
  adminRoles:()=>`
    <div class="feature-head"><div><h2>👑 Admin Roles</h2><p>Owner can assign admins and moderators from Level 1</p></div><span class="balance-pill">2 / 5 admins</span></div>
    <div class="member-list">
      <article><span class="a1">M</span><div><b>Maya</b><small>Room owner</small></div><button>Owner</button></article>
      <article><span class="a3">A</span><div><b>Arjun</b><small>Admin · Members + seats + broadcast</small></div><button data-demo-action="remove-admin">Remove</button></article>
      <article><span class="a4">S</span><div><b>Sana</b><small>Moderator · Chat + mute controls</small></div><button data-demo-action="promote-admin">Promote</button></article>
    </div>
    <button class="primary-btn full" data-demo-action="add-admin" style="margin-top:12px">＋ Add admin</button>`,
  muteAll:()=>`
    <div class="feature-head"><div><h2>🔇 Mute Controls</h2><p>Quick room-wide audio moderation</p></div></div>
    <div class="control-list">
      <label><div><b>Mute all speakers</b><small>Host and admins remain unaffected</small></div><input id="muteAllToggle" type="checkbox" /></label>
      <label><div><b>New seats start muted</b><small>Members unmute after host permission</small></div><input type="checkbox" /></label>
      <label><div><b>Audience sound effects</b><small>Allow reactions and room SFX</small></div><input type="checkbox" checked /></label>
    </div>`,
  audioControls:()=>`
    <div class="feature-head"><div><h2>🎚 Audio Controls</h2><p>Room audio and music mix</p></div></div>
    <div class="slider-list">
      <label><span>Speaker volume <b>80%</b></span><input type="range" min="0" max="100" value="80" /></label>
      <label><span>Music volume <b>55%</b></span><input type="range" min="0" max="100" value="55" /></label>
      <label><span>Gift sound <b>70%</b></span><input type="range" min="0" max="100" value="70" /></label>
      <label><span>Entry effect sound <b>60%</b></span><input type="range" min="0" max="100" value="60" /></label>
    </div>
    <div class="control-list" style="margin-top:10px">
      <label><div><b>Noise suppression</b><small>Reduce background noise on microphone seats</small></div><input type="checkbox" checked /></label>
      <label><div><b>Echo cancellation</b><small>Improve voice clarity in live rooms</small></div><input type="checkbox" checked /></label>
    </div>`,
  search:()=>`
    <div class="feature-head"><div><h2>⌕ Search YouGo</h2><p>Find rooms, people, IDs and families</p></div></div>
    <label class="searchbox"><span>⌕</span><input id="globalSearch" placeholder="Search room ID, user, family..." autofocus /></label>
    <div class="search-results">
      <h4>Trending searches</h4>
      <div class="chips"><button class="chip active">Telugu rooms</button><button class="chip">Music</button><button class="chip">Game PK</button><button class="chip">New friends</button></div>
      <h4>Suggested</h4>
      <div class="member-list">
        <article><span class="a1">M</span><div><b>Maya</b><small>ID 824520 · VIP 6</small></div><button>View</button></article>
        <article><span>🎙</span><div><b>Late Night Talks</b><small>Room #284520 · 1.8K online</small></div><button data-demo-action="search-room">Join</button></article>
      </div>
    </div>`,
  notifications:()=>`
    <div class="feature-head"><div><h2>🔔 Notifications</h2><p>Messages, gifts, events and room activity</p></div><span class="balance-pill">6 new</span></div>
    <div class="notification-list">
      <article class="new"><span>🎁</span><div><b>Sana sent you Couple Heart ×10</b><small>2 minutes ago</small></div></article>
      <article class="new"><span>🎙</span><div><b>Maya invited you to Late Night Talks</b><small>8 minutes ago</small></div></article>
      <article class="new"><span>🏆</span><div><b>You moved to #12 in Galaxy Carnival</b><small>24 minutes ago</small></div></article>
      <article><span>🫶</span><div><b>Neon Tribe completed a family mission</b><small>1 hour ago</small></div></article>
      <article><span>👀</span><div><b>3 people viewed your profile</b><small>2 hours ago</small></div></article>
    </div>`

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
$("[data-panel]").forEach(btn=>btn.addEventListener("click",e=>{e.stopPropagation();if(btn.closest("#toolsSheet"))closeSheet(toolsSheet);openFeature(btn.dataset.panel)}));
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
  if(action==="close-onboarding")closeSheet(onboardingSheet);
  if(action==="demo-skip"){localStorage.setItem("yougo-onboarded","1");closeSheet(onboardingSheet);toast("Demo mode ready ✨");}
  if(action==="demo-login"){
    const phone=$("#demoPhone")?.value?.trim();
    if(!phone){toast("Enter a mobile number for the OTP demo");}
    else{const btn=e.target.closest("button");btn.textContent="OTP verified ✓";localStorage.setItem("yougo-onboarded","1");setTimeout(()=>{closeSheet(onboardingSheet);toast("Profile ready — welcome to YouGo");btn.textContent="Continue with OTP";},700);}
  }
  if(action==="toggle-mic"){const b=e.target.closest("button");b.classList.toggle("muted");b.firstChild.textContent=b.classList.contains("muted")?"🔇":"🎤";toast(b.classList.contains("muted")?"Microphone muted":"Microphone on");}
  if(action==="pk"){closeSheet(toolsSheet);toast("Room PK started — team scores are now live");}
  if(action==="game-pk"){closeSheet(toolsSheet);$$("[data-room-mode]").find(b=>b.dataset.roomMode==="game")?.click();toast("Game PK mode ready");}
  if(action==="start-pk")toast("PK challenge opened");
  if(action==="search")openFeature("search");
  if(action==="notifications")openFeature("notifications");
  if(action==="demo-spin"){e.target.textContent="🎁 +50 reward points";setTimeout(()=>e.target.textContent="Spin again",1200);}
  if(action==="demo-hunt"){e.target.textContent="💎 Found 12 reward diamonds";setTimeout(()=>e.target.textContent="Try again",1200);}
  if(action==="demo-pocket"){e.target.textContent="🎟 +25 event tokens";setTimeout(()=>e.target.textContent="Pocket opened",1200);}
  if(action==="demo-dice"){e.target.textContent="🎲 "+(Math.floor(Math.random()*6)+1);setTimeout(()=>e.target.textContent="Roll again",1200);}
});

featureSheet.addEventListener("click",e=>{
  const game=e.target.closest("[data-game]")?.dataset.game;
  if(game){toast(game+" selected");closeSheet(featureSheet);$$("[data-room-mode]").find(b=>b.dataset.roomMode==="game")?.click();if(!roomOverlay.classList.contains("open"))openRoom("Game Arena ⚡");}
  const tab=e.target.closest(".rank-tabs button,.member-tabs button");
  if(tab){$("button",tab.parentElement).forEach(b=>b.classList.remove("active"));tab.classList.add("active");}
  const nested=e.target.closest("[data-panel]");
  if(nested){e.stopPropagation();openFeature(nested.dataset.panel);}
  const seat=e.target.closest("[data-seat-control]");
  if(seat){
    if(seat.classList.contains("locked")){seat.classList.remove("locked");seat.querySelector("b").textContent="Empty";seat.querySelector("small").textContent="Tap to lock";toast("Seat opened");}
    else if(!seat.classList.contains("active")){seat.classList.add("locked");seat.querySelector("b").textContent="Locked";seat.querySelector("small").textContent="Tap to open";toast("Seat locked");}
  }
  const demo=e.target.closest("[data-demo-action]")?.dataset.demoAction;
  if(demo){
    const messages={
      "couple-gift":"Couple gift shop opened 💞","couple-mission":"Couple mission progress updated",
      "checkin":"Day 7 reward claimed 🎁","language":"Language selector ready","account":"Account security screen ready",
      "support":"Support center ready","member-menu":"Member moderation menu opened","save-room":"Room settings saved",
      "broadcast-normal":"Broadcast sent to the room 📢","broadcast-highlight":"Highlighted announcement sent ✨",
      "mute-member":"Member muted","remove-seat":"Member moved to audience","kick-member":"Member removed from room",
      "block-room":"Member blocked from this room","report-member":"Report flow opened","remove-admin":"Admin role removed",
      "promote-admin":"Moderator promoted","add-admin":"Admin selector opened","search-room":"Joining Late Night Talks…"
    };
    toast(messages[demo]||"Action completed");
    if(demo==="checkin"){const b=e.target.closest("button");b.classList.add("claimed");b.classList.remove("today");b.querySelector("small").textContent="Claimed";}
    if(demo==="search-room"){closeSheet(featureSheet);openRoom("Late Night Talks ✨");}
  }
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


document.addEventListener("input",e=>{
  if(e.target.matches(".slider-list input[type=range]")){
    const label=e.target.closest("label")?.querySelector("span b");
    if(label)label.textContent=e.target.value+"%";
  }
});

// Show onboarding once for a fresh preview; demo mode can skip it.
window.addEventListener("load",()=>{
  if(!localStorage.getItem("yougo-onboarded")){
    setTimeout(()=>openSheet(onboardingSheet),350);
  }
});
