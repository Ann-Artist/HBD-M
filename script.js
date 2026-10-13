/* =====================================================================
   MUMMY-GOOGLE  –  script.js
   1 Settings & content | 2 Search triggers | 3 Helpers | 4 Views
   5 Suggestions | 6 Lightbox/Video | 7 Birthday | 8 Init
   Almost everything you need to edit is in sections 1 and 2.
   ===================================================================== */

/* ===================== 1. SETTINGS & CONTENT ===================== */
const CONFIG = {
  name: "Mummy",              // Used in titles. Example: "Aai", "Maa", "Mom", or her real name
  from: "[Your Name]",        // Who the letter is from
  age: "",                    // Optional, e.g. 50 (leave "" to hide age everywhere)
  // Words that open the normal results page (lowercase!)
  profileSearches: ["mummy", "mom", "maa", "aai"],
  // Words that open the birthday surprise (lowercase!)
  birthdaySearches: ["mummy birthday", "mom birthday", "maa birthday", "aai birthday"]
};
const suggestionList = ["Mummy", "Mummy Birthday"];   // shown while typing
const resultCount = "About 1,840 results (0.46 seconds)";
const bdaySubtitle = "Looks like we found something more important than search results...";
const wishText = "Wish granted. Now go enjoy your birthday, Mummy.";

// --- Photos: put files in assets/images/. group = birthday-page section ---
// h = placeholder height only. The first 3 photos form the collage on the All tab.
const images = [
  { src: "assets/images/photo1.jpg", caption: "The best smile in the family", h: 280, group: "The Birthday Queen" },
  { src: "assets/images/photo2.jpg", caption: "Our favourite memory",         h: 200, group: "The Birthday Queen" },
  { src: "assets/images/photo3.jpg", caption: "Together, always",             h: 320, group: "Our Favourite Moments" },
  { src: "assets/images/photo4.jpg", caption: "A memory worth keeping",       h: 240, group: "Our Favourite Moments" },
  { src: "assets/images/photo5.jpg", caption: "Little moments, big love",     h: 260, group: "Together" },
  { src: "assets/images/photo6.jpg", caption: "Add your caption here",        h: 200, group: "Together" },
  { src: "assets/images/photo7.jpg", caption: "Add your caption here",        h: 300, group: "Little Things That Mean The World" },
  { src: "assets/images/photo8.jpg", caption: "Add your caption here",        h: 230, group: "Little Things That Mean The World" }
];

// --- Videos: MP4 in assets/videos/, thumbnail in assets/thumbnails/ ---
const videos = [
  { title: "Moments With Mummy", thumbnail: "assets/thumbnails/video1.jpg", source: "assets/videos/video1.mp4", duration: "1:32", date: "Add date", description: "A few of our favourite clips, all in one place." },
  { title: "Add Your Title",     thumbnail: "assets/thumbnails/video2.jpg", source: "assets/videos/video2.mp4", duration: "0:48", date: "Add date", description: "Placeholder: describe this video here." }
];

// --- Knowledge panel (info box on the All tab). Edit freely. ---
const profile = {
  subtitle: "The world's best mom",
  about: "Placeholder text: write a few warm lines about Mummy here. Keep it true, simple and personal.",
  facts: [["Known as", "Mummy"], ["Title", "World's Best Mom"], ["Favourite thing", "[Add here]"], ["Fan club", "The whole family"]],
  chips: [["Title", "Best Mom", "Undisputed"], ["Fans", "Everyone", "At home"]]
};

// --- "What people are saying" cards (placeholders: replace with real notes) ---
const posts = [
  { title: "The thing only Mummy says", body: "Placeholder: write a real line she always says.", who: "Family", meta: "Message · Today" },
  { title: "Her special touch", body: "Placeholder: write about something she does that makes home feel like home.", who: "Family", meta: "Memory · This week" },
  { title: "Thank you, Mummy", body: "Placeholder: write a short thank-you here.", who: CONFIG.from, meta: "Message · Today" }
];

// --- Result links on the All tab ---
const results = [
  { url: "mummy.search › about", title: "Mummy — The World's Best Mom", desc: "Placeholder: a short, warm description of Mummy goes here.", meta: "" },
  { url: "mummy.search › memories", title: "Mummy | Memories & Moments", desc: "Photos and videos collected over the years. Check the Images and Videos tabs.", meta: "Photos · Videos" },
  { url: "mummy.search › recipes", title: "Mummy's Special Touch", desc: "Placeholder: something she is known for (cooking, advice, hugs, anything). Edit this.", meta: "Updated daily" },
  { url: "mummy.search › today", title: "Mummy — Birthday Special", desc: "Something about today feels different. Some searches lead to more than results. Try looking for the occasion.", meta: "Trending today" }
];

// --- Fun news cards ---
const news = [
  { src: "BREAKING NEWS", tag: true, title: "World's Best Mom Celebrates Birthday Today", desc: "Reports confirm that Mummy is celebrating her birthday. Family members are currently on their best behaviour.", time: "Just now" },
  { src: "THE DAILY FAMILY", title: "Sources Say Everyone Finally Agrees: Mummy Is Always Right", desc: "In a rare moment of unity, the entire household has agreed that Mummy was right all along.", time: "2 hours ago" },
  { src: "HOME TIMES", title: "Surprise Alert: Someone Planned Something Special", desc: "Insiders report a suspiciously well-kept secret at home. Details are expected to be revealed soon.", time: "5 hours ago" }
];

// --- The letter (edit freely; keep paragraphs as separate strings) ---
const message = {
  title: "From " + CONFIG.from,
  paragraphs: [
    "Happy Birthday, Mummy!",
    "We wanted to do something a little different this year, so instead of just a message, we made an entire search engine about you.",
    "Placeholder: write your real, personal words here. Thank her for something specific.",
    "Here's to many more memories, laughs and chai-time chats together."
  ],
  sign: "With all my love,<br>" + CONFIG.from
};

/* ====================== 2. SEARCH TRIGGERS ====================== */
// Key = lowercase query. Value = function to run. Add new ones any time.
const searchTriggers = {};
CONFIG.profileSearches.forEach((k) => (searchTriggers[k] = (q) => showProfile(q)));
CONFIG.birthdaySearches.forEach((k) => (searchTriggers[k] = (q) => showBirthdaySurprise(q)));
// searchTriggers["mummy recipes"] = (q) => showRecipes(q);   // <- future example

function handleSearch(raw) {
  const q = normalize(raw);
  if (!q) return;
  const fn = searchTriggers[q];
  fn ? fn(raw.trim()) : showNoResults(raw.trim());
}

/* ========================== 3. HELPERS ========================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const normalize = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ordinal = (n) => { const s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };

// Flower drawn in SVG, used as decoration (no image files needed)
function flowerURI(petal, centre) {
  let p = "";
  for (let i = 0; i < 8; i++) p += `<ellipse cx='50' cy='24' rx='11' ry='20' fill='${petal}' transform='rotate(${i * 45} 50 50)'/>`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>${p}<circle cx='50' cy='50' r='11' fill='${centre}'/></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}
document.documentElement.style.setProperty("--flower1", flowerURI("#f4b6c4", "#ffd77a"));
document.documentElement.style.setProperty("--flower2", flowerURI("#cdb8f0", "#ffe9a8"));

function placeholder(label, h = 260, i = 0) {
  const c = ["#fde4ea", "#f3eefc", "#e8f3ea", "#fff1de", "#fbe3f0"][i % 5];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='${h}'><rect width='100%' height='100%' fill='${c}'/><text x='50%' y='50%' font-family='Georgia' font-size='18' fill='#8a6a76' text-anchor='middle'>${label}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
// If a photo file is missing, show a pastel placeholder instead
function fixImgs(root) {
  $$("img[data-h]", root).forEach((im) =>
    im.addEventListener("error", () => { im.src = placeholder(im.dataset.l, +im.dataset.h, +im.dataset.i); }, { once: true }));
}
const imgTag = (o, i) => `<img src="${o.src}" alt="${esc(o.caption)}" data-h="${o.h || 220}" data-i="${i}" data-l="Photo ${i + 1}" loading="lazy">`;
const vidTag = (v, i) => `<img src="${v.thumbnail}" alt="" data-h="225" data-i="${i}" data-l="Video ${i + 1}">`;

function galleryHTML(list) {
  return `<div class="gallery">${list.map((o) => { const i = images.indexOf(o); return `<figure data-i="${i}">${imgTag(o, i)}<figcaption>${esc(o.caption)}</figcaption></figure>`; }).join("")}</div>`;
}
function videoItems() {
  return videos.map((v, i) => `<div class="vitem" data-v="${i}"><div class="vthumb">${vidTag(v, i)}<span class="dur">${v.duration}</span></div><div><h3>${esc(v.title)}</h3><p>${esc(v.description)}</p><p class="meta">${v.date}</p></div></div>`).join("");
}

/* =========================== 4. VIEWS =========================== */
let currentQuery = "";

function showView(id) {
  $$(".view").forEach((v) => v.classList.remove("active", "show"));
  const el = $("#" + id);
  el.classList.add("active");
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("show")));
  document.body.classList.toggle("floral", id !== "home");   // floral theme after first search
  window.scrollTo(0, 0);
}
function showHome() { stopBirthday(); $$("input").forEach((i) => (i.value = "")); showView("home"); }
function showProfile(q) {
  stopBirthday(); currentQuery = q;
  $("#results .searchbox input").value = q;
  showView("results"); setTab("all");
}
function showNoResults(q) {
  stopBirthday();
  $("#results .searchbox input").value = q;
  $$("#tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === "all"));
  $("#tabContent").innerHTML = `<div class="empty"><p>Your search - <b>${esc(q)}</b> - did not match any documents.</p><p>Suggestions:</p><ul><li>Make sure all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></ul></div>`;
  showView("results");
}

// Knowledge-panel layout for the All tab
function entityHTML() {
  const p = profile, n = news[0], v = videos[0], im = (i) => `<div data-i="${i}">${imgTag(images[i], i)}</div>`;
  const chips = (CONFIG.age ? [["Age", CONFIG.age + " years", "Today"]] : []).concat(p.chips).slice(0, 2);
  return `<section class="entity"><h2>${esc(CONFIG.name)}</h2><p class="sub">${esc(p.subtitle)}</p>
    <div class="erow">
      <div class="collage"><div class="c1" data-i="0">${imgTag(images[0], 0)}</div><div class="c2">${im(1)}${im(2)}</div></div>
      <div class="ecard"><div class="srcl"><span class="tag">LIVE</span>${n.src}</div><h4>${esc(n.title)}</h4><small>${n.time}</small></div>
      <div class="side">${chips.map((c) => `<div class="chip"><b>${c[0]}</b><span class="big">${esc(c[1])}</span><span>${c[2]}</span></div>`).join("")}
        <div class="evid" data-v="0"><div class="vthumb">${vidTag(v, 0)}<span class="dur">${v.duration}</span></div><span class="vt">${esc(v.title)}</span></div></div>
    </div></section>
    <div class="cols"><div class="main">
      <h3 class="sec">What people are saying</h3><p class="secsub">Messages and memories from family</p>
      <div class="posts">${posts.map((o) => `<div class="post"><h4>${esc(o.title)}</h4><p>${esc(o.body)}</p><div class="pf"><span class="av">${esc(o.who[0])}</span><div><b>${esc(o.who)}</b><br><small>${o.meta}</small></div></div></div>`).join("")}</div>
      <p class="count">${resultCount}</p>
      ${results.map((r) => `<div class="res"><div class="url">${r.url}</div><h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p>${r.meta ? `<div class="meta">${r.meta}</div>` : ""}</div>`).join("")}
    </div>
    <aside class="about"><h3>About</h3><p>${esc(p.about)}</p><div class="facts">${p.facts.map((f) => `<div><span>${f[0]}</span><span>${esc(f[1])}</span></div>`).join("")}</div></aside></div>`;
}

function setTab(tab) {
  $$("#tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === tab));
  const box = $("#tabContent");
  if (tab === "all") box.innerHTML = entityHTML();
  else if (tab === "images") box.innerHTML = galleryHTML(images);
  else if (tab === "videos") box.innerHTML = `<div class="vgrid">${videoItems()}</div>`;
  else if (tab === "news") box.innerHTML = news.map((n) => `<div class="ncard"><div class="src">${n.tag ? '<span class="tag">LIVE</span>' : ""}${n.src}</div><h3>${esc(n.title)}</h3><p>${esc(n.desc)}</p><small>${n.time}</small></div>`).join("");
  fixImgs(box);
}

/* ======================== 5. SUGGESTIONS ======================== */
function bindSearch(form) {
  const input = $("input", form), list = $(".suggest", form);
  const submit = (v) => { list.classList.remove("open"); input.blur(); handleSearch(v ?? input.value); };
  input.addEventListener("input", () => {
    const q = normalize(input.value);
    const m = q ? suggestionList.filter((s) => normalize(s).startsWith(q) && normalize(s) !== q) : [];
    list.innerHTML = m.map((s) => `<li><svg class="ico" viewBox="0 0 24 24"><path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>${s}</li>`).join("");
    list.classList.toggle("open", m.length > 0);
  });
  list.addEventListener("mousedown", (e) => { const li = e.target.closest("li"); if (li) { input.value = li.textContent; submit(li.textContent); } });
  form.addEventListener("submit", (e) => { e.preventDefault(); submit(); });
  input.addEventListener("blur", () => setTimeout(() => list.classList.remove("open"), 150));
}

/* ===================== 6. LIGHTBOX & VIDEO ===================== */
let lbIndex = 0;
function openLightbox(i) {
  lbIndex = (i + images.length) % images.length;
  const o = images[lbIndex], im = $("#lightbox img");
  im.src = o.src;
  im.addEventListener("error", () => { im.src = placeholder("Photo " + (lbIndex + 1), 400, lbIndex); }, { once: true });
  $("#lightbox figcaption").textContent = o.caption;
  $("#lightbox").classList.add("open");
}
function openVideo(i) {
  const v = videos[i], el = $("#videoModal video"), miss = $("#videoModal .vmiss");
  miss.style.display = "none"; el.onerror = () => { miss.style.display = "block"; };
  el.src = v.source; el.load();
  $("#videoModal figcaption").textContent = v.title;
  $("#videoModal").classList.add("open");
}
function closeModals() {
  $$(".modal").forEach((m) => m.classList.remove("open"));
  const el = $("#videoModal video"); el.pause(); el.removeAttribute("src"); el.load();
}

/* ==================== 7. BIRTHDAY EXPERIENCE ==================== */
const cv = $("#confetti"), cx = cv.getContext("2d");
const COLORS = ["#f4a6b8", "#f7c6d2", "#ffd36e", "#cdb8f0", "#b8e0c4"];
let parts = [], raf = null, confettiTimer = null, timers = [];

function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
// Soft petals (ovals) instead of paper confetti
function addConfetti(n, burst) {
  for (let i = 0; i < n; i++) parts.push({
    x: burst ? innerWidth / 2 : Math.random() * innerWidth, y: burst ? innerHeight * 0.55 : -10,
    vx: burst ? (Math.random() - 0.5) * 14 : (Math.random() - 0.5) * 2, vy: burst ? -Math.random() * 12 - 4 : Math.random() * 2 + 1.2,
    s: Math.random() * 6 + 6, r: Math.random() * 6, vr: Math.random() * 0.12 - 0.06, c: COLORS[i % 5] });
  if (!raf) raf = requestAnimationFrame(tick);
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter((p) => p.y < cv.height + 20);
  parts.forEach((p) => {
    p.x += p.vx + Math.sin(p.y / 40) * 0.6; p.y += p.vy; p.vy = Math.min(p.vy + 0.12, 3); p.r += p.vr;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c;
    cx.beginPath(); cx.ellipse(0, 0, p.s, p.s / 2, 0, 0, 6.3); cx.fill(); cx.restore();
  });
  raf = parts.length ? requestAnimationFrame(tick) : null;
}

// Flowers that float up gently behind the content
function makeFloaters() {
  $("#floaters").innerHTML = Array.from({ length: 9 }, (_, i) => {
    const s = 34 + (i % 4) * 14;
    return `<div class="floater" style="left:${4 + i * 11}%;width:${s}px;height:${s}px;background-image:var(--flower${(i % 2) + 1});animation-duration:${16 + (i % 4) * 3}s;animation-delay:${-i * 2.4}s"></div>`;
  }).join("");
}

function buildBirthdayContent() {
  const t = "HAPPY " + (CONFIG.age ? ordinal(+CONFIG.age) + " " : "") + "BIRTHDAY " + CONFIG.name.toUpperCase() + "!";
  $("#bTitle").textContent = t; $("#bSub").textContent = bdaySubtitle;
  $(".candles").innerHTML = '<div class="candle"></div>'.repeat(5);
  $("#cake").classList.remove("out");
  $("#wishMsg").textContent = ""; $("#wishBtn").disabled = false;
  const groups = [...new Set(images.map((o) => o.group))];
  $("#bPhotos").innerHTML = groups.map((g) => `<div class="reveal"><h3>${g}</h3>${galleryHTML(images.filter((o) => o.group === g))}</div>`).join("");
  $("#bVideos").innerHTML = videoItems();
  $("#letter").innerHTML = `<h3>${esc(message.title)}</h3>${message.paragraphs.map((p) => `<p>${p}</p>`).join("")}<p class="sign">${message.sign}</p>`;
  fixImgs($("#birthday"));
}

function showBirthdaySurprise(q) {
  showProfile(q);                         // 1. normal results show briefly
  timers.push(setTimeout(() => {          // 2. then it transforms
    buildBirthdayContent(); makeFloaters(); sizeCanvas();
    $("#bTitle").classList.remove("in"); $("#bSub").classList.remove("in");
    showView("birthday");
    timers.push(setTimeout(() => $("#bTitle").classList.add("in"), 500));
    timers.push(setTimeout(() => $("#bSub").classList.add("in"), 1800));
    timers.push(setTimeout(() => { addConfetti(50); confettiTimer = setInterval(() => addConfetti(3), 400);
      timers.push(setTimeout(() => clearInterval(confettiTimer), 8000)); }, 700));
    observeReveals();
  }, 1100));
}
function stopBirthday() { timers.forEach(clearTimeout); timers = []; clearInterval(confettiTimer); parts = []; }
function observeReveals() {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$("#birthday .reveal").forEach((el) => io.observe(el));
}
$("#wishBtn").addEventListener("click", () => {      // Make a wish
  $("#cake").classList.add("out"); $("#wishBtn").disabled = true;
  addConfetti(110, true); $("#wishMsg").textContent = wishText;
});

/* ============================ 8. INIT ============================ */
$$(".searchbox").forEach(bindSearch);
$(".go").addEventListener("click", () => handleSearch($("#home input").value));
$(".lucky").addEventListener("click", () => { const v = $("#home input").value; v.trim() ? handleSearch(v) : $("#home input").focus(); });
$("#homeLink").addEventListener("click", showHome);
$("#bdayBack").addEventListener("click", () => showProfile(currentQuery || CONFIG.name));
$("#tabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) setTab(b.dataset.tab); });
document.addEventListener("click", (e) => {
  const f = e.target.closest(".gallery figure, .collage [data-i]"); if (f) openLightbox(+f.dataset.i);
  const v = e.target.closest(".vitem, .evid"); if (v) openVideo(+v.dataset.v);
  if (e.target.matches("[data-close]") || e.target.classList.contains("modal")) closeModals();
});
$("#lightbox .prev").addEventListener("click", () => openLightbox(lbIndex - 1));
$("#lightbox .next").addEventListener("click", () => openLightbox(lbIndex + 1));
$$(".clear").forEach((b) => b.addEventListener("click", () => { const i = $("input", b.closest("form")); i.value = ""; i.focus(); }));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
  if ($("#lightbox").classList.contains("open")) { if (e.key === "ArrowLeft") openLightbox(lbIndex - 1); if (e.key === "ArrowRight") openLightbox(lbIndex + 1); }
});
addEventListener("resize", sizeCanvas);
sizeCanvas();
showView("home");
