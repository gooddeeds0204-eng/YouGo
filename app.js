const screens=[...document.querySelectorAll(".screen")];
const navItems=[...document.querySelectorAll("[data-nav]")];
const roomOverlay=document.getElementById("roomOverlay");
const roomTitle=document.getElementById("roomTitle");
const createSheet=document.getElementById("createSheet");
const giftSheet=document.getElementById("giftSheet");

function showScreen(name){
  screens.forEach(s=>s.classList.toggle("active",s.dataset.screen===name));
  navItems.forEach(n=>n.classList.toggle("active",n.dataset.nav===name));
  window.scrollTo({top:0,behavior:"smooth"});
}
navItems.forEach(btn=>btn.addEventListener("click",()=>showScreen(btn.dataset.nav)));

function openRoom(name="Late Night Talks ✨"){
  roomTitle.textContent=name;
  roomOverlay.classList.add("open");
  roomOverlay.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeRoom(){
  roomOverlay.classList.remove("open");
  roomOverlay.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.querySelectorAll("[data-room]").forEach(card=>card.addEventListener("click",()=>openRoom(card.dataset.room)));
document.querySelector('[data-action="join-featured"]').addEventListener("click",()=>openRoom("Late Night Talks ✨"));

document.addEventListener("click",e=>{
  const action=e.target.closest("[data-action]")?.dataset.action;
  if(!action)return;
  if(action==="close-room")closeRoom();
  if(action==="create-room"){
    createSheet.classList.add("open");
    createSheet.setAttribute("aria-hidden","false");
  }
  if(action==="close-sheet"){
    createSheet.classList.remove("open");
    createSheet.setAttribute("aria-hidden","true");
  }
  if(action==="start-room"){
    createSheet.classList.remove("open");
    openRoom(document.querySelector(".field input").value||"My YouGo Room ✨");
  }
  if(action==="gift"){
    giftSheet.classList.add("open");
    giftSheet.setAttribute("aria-hidden","false");
  }
  if(action==="close-gift"){
    giftSheet.classList.remove("open");
    giftSheet.setAttribute("aria-hidden","true");
  }
});

document.querySelectorAll(".mode").forEach(mode=>mode.addEventListener("click",()=>{
  document.querySelectorAll(".mode").forEach(m=>m.classList.remove("active"));
  mode.classList.add("active");
}));
document.querySelectorAll(".chip").forEach(chip=>chip.addEventListener("click",()=>{
  document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
  chip.classList.add("active");
}));
document.querySelectorAll(".person-card button").forEach(btn=>btn.addEventListener("click",e=>{
  e.stopPropagation();
  btn.textContent=btn.textContent==="Follow"?"Following":"Follow";
}));
document.querySelectorAll(".gift-grid button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".gift-grid button").forEach(b=>b.style.outline="");
  btn.style.outline="2px solid #d34cff";
}));
if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}