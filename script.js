/* =====================================================================
   GOOGLE · SANUJA GAURAV RANDIVE  –  script.js
   A personalized Google search engine experience for Mummy's birthday.
   Gift from Anusha & Aarya (daughters).
   ===================================================================== */

/* ===================== 1. SETTINGS & CONTENT ===================== */
const CONFIG = {
  name: "Sanuja Gaurav Randive",
  shortName: "Sanuja",
  mummyName: "Mummy",
  dob: "14 Oct",
  from: "Anusha & Aarya (daughters)",
  // Queries that open the results view
  profileSearches: [
    "sanuja", "sanuja randive", "sanuja gaurav randive",
    "mummy", "mom", "maa", "aai"
  ],
  // Queries that trigger the birthday celebration
  birthdaySearches: [
    "sanuja birthday", "sanuja randive birthday", "mummy birthday",
    "mom birthday", "maa birthday", "aai birthday", "14 oct", "14 october"
  ]
};

const suggestionList = [
  "Sanuja Gaurav Randive",
  "Sanuja Randive",
  "Mummy Birthday",
  "Mummy Images",
  "Sanuja Birthday"
];

const resultCount = "About 1,840 results (0.42 seconds)";
const bdaySubtitle = "14th October · An official national holiday declared by Anusha & Aarya";
const wishText = "Wish granted! Keep shining & slaying, Mummy. Happy Birthday! 🎉";

// --- Photos: 28 memories from images/ (Google Images gallery, no captions) ---
const images = [
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.32 PM.jpeg", h: 260, group: "The Birthday Queen", filterKey: "queen" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.32 PM (1).jpeg", h: 260, group: "The Birthday Queen", filterKey: "queen" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.32 PM (2).jpeg", h: 260, group: "The Birthday Queen", filterKey: "queen" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.33 PM.jpeg", h: 260, group: "The Birthday Queen", filterKey: "queen" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.33 PM (1).jpeg", h: 260, group: "The Birthday Queen", filterKey: "queen" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.33 PM (2).jpeg", h: 260, group: "The Birthday Queen", filterKey: "queen" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.34 PM.jpeg", h: 260, group: "The Birthday Queen", filterKey: "queen" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.34 PM (1).jpeg", h: 260, group: "Our Favourite Moments", filterKey: "moments" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.34 PM (2).jpeg", h: 260, group: "Our Favourite Moments", filterKey: "moments" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.35 PM.jpeg", h: 260, group: "Our Favourite Moments", filterKey: "moments" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.35 PM (1).jpeg", h: 260, group: "Our Favourite Moments", filterKey: "moments" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.37 PM.jpeg", h: 260, group: "Our Favourite Moments", filterKey: "moments" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.37 PM (1).jpeg", h: 260, group: "Our Favourite Moments", filterKey: "moments" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.38 PM.jpeg", h: 260, group: "Together, Always", filterKey: "together" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.38 PM (1).jpeg", h: 260, group: "Together, Always", filterKey: "together" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.38 PM (2).jpeg", h: 260, group: "Together, Always", filterKey: "together" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.38 PM (3).jpeg", h: 260, group: "Together, Always", filterKey: "together" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.39 PM.jpeg", h: 260, group: "Together, Always", filterKey: "together" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.39 PM (1).jpeg", h: 260, group: "Together, Always", filterKey: "together" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.39 PM (2).jpeg", h: 260, group: "Together, Always", filterKey: "together" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.39 PM (3).jpeg", h: 260, group: "Little Things That Mean The World", filterKey: "special" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.40 PM.jpeg", h: 260, group: "Little Things That Mean The World", filterKey: "special" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.40 PM (1).jpeg", h: 260, group: "Little Things That Mean The World", filterKey: "special" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.40 PM (2).jpeg", h: 260, group: "Little Things That Mean The World", filterKey: "special" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.40 PM (3).jpeg", h: 260, group: "Little Things That Mean The World", filterKey: "special" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.41 PM.jpeg", h: 260, group: "Little Things That Mean The World", filterKey: "special" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.41 PM (1).jpeg", h: 260, group: "Little Things That Mean The World", filterKey: "special" },
  { src: "images/WhatsApp Image 2026-10-14 at 10.29.41 PM (2).jpeg", h: 260, group: "Little Things That Mean The World", filterKey: "special" }
];

// --- Knowledge panel data (normalized, Gen-Z styled, not melodramatic) ---
const profile = {
  subtitle: "Undisputed GOAT Mom · Certified Main Character",
  about: "Sanuja Gaurav Randive is the undisputed GOAT, certified household CEO, and full-time icon. Operating at 100% main character energy, she is globally recognized for dropping elite life advice, serving looks, making the best food on the planet, and having infinite patience dealing with Anusha and Aarya's daily chaos. Currently trending worldwide on her birthday, October 14th.",
  facts: [
    ["Full Name", "Sanuja Gaurav Randive"],
    ["Born", "14 October"],
    ["Gift From", "Anusha & Aarya (daughters)"],
    ["Known As", "Mummy · Boss Lady · Queen"],
    ["Occupation", "Being an absolute legend"],
    ["Daughters' Rating", "10/10 (Undisputed, no notes)"]
  ],
  chips: [
    ["DOB", "14 Oct", "Today's Holiday 🎉"],
    ["Gift From", "Anusha & Aarya", "Daughters ❤️"],
    ["Title", "GOAT Mom", "Undisputed 👑"],
    ["Vibe", "10/10", "Main Character ✨"]
  ]
};

// --- Verified reviews from daughters (fun, Gen-Z, unpretentious) ---
const posts = [
  {
    title: "The official verdict",
    body: "Lowkey the coolest mom ever. Zero complaints, infinite love, 10/10 experience.",
    who: "Anusha",
    meta: "Verified Review · 5 Stars ★★★★★"
  },
  {
    title: "Always right (unfortunate for us)",
    body: "Still waiting for a single instance where she was wrong. Hasn't happened yet.",
    who: "Aarya",
    meta: "Verified Review · Today"
  },
  {
    title: "Chef & Stylist",
    body: "Food slaps, outfits always on point, unmatched aura. We love you so much!",
    who: "The Daughters",
    meta: "Family Chat · Just now"
  }
];

// --- Google Search Results ---
const results = [
  {
    url: "sanuja.randive.com › official › bio",
    title: "Sanuja Gaurav Randive — World's Greatest Mom (Official)",
    desc: "Born on October 14. Certified iconic mother of Anusha & Aarya. Known for elite cooking skills, immaculate fashion sense, and running the household like a true CEO.",
    meta: ""
  },
  {
    url: "google.com › search › trending › 14-october",
    title: "Why October 14th is Trending Worldwide: Sanuja Randive's Birthday",
    desc: "Sources confirm that October 14th is unofficially recognized as a celebration of Sanuja Gaurav Randive. High-level celebrations and cake consumption in progress.",
    meta: "Trending Worldwide"
  },
  {
    url: "mummy.photos › gallery › 28-moments",
    title: "Sanuja Gaurav Randive — 28 Iconic Photo Memories",
    desc: "Explore all 28 curated aesthetic photos of Mummy. Head over to the Images tab to explore the full high-res photo gallery in Google layout.",
    meta: "Photos · 28 Images"
  },
  {
    url: "daughters.gift › to › mummy",
    title: "A Birthday Surprise Engine — From Anusha & Aarya",
    desc: "Why give an ordinary card when you can code an entire Google search engine? Try searching 'mummy birthday' or '14 oct' to launch the birthday celebration.",
    meta: "Birthday Special"
  }
];

// --- Birthday Note (Gen-Z, genuine, not overly emotional) ---
const message = {
  title: "From Anusha & Aarya (Your Favorite Daughters)",
  paragraphs: [
    "Happy Birthday, Mummy! 🎉",
    "Since you are undeniably the main character today (and literally every other day tbh), we decided an ordinary birthday card simply would not cut it — so we built you an entire Google search engine just for you.",
    "Thank you for being our daily inspiration, our biggest cheerleader, the household CEO, and the coolest mom ever. Everything you do for us is legendary.",
    "10/10 mother, no notes, would definitely choose you as our mom again in every lifetime.",
    "Have the most iconic birthday, eat lots of cake, and know that you are loved beyond words!"
  ],
  sign: "With all our love,<br>Anusha & Aarya ✨"
};

/* ====================== 2. SEARCH TRIGGERS ====================== */
const searchTriggers = {};
CONFIG.profileSearches.forEach((k) => (searchTriggers[k] = (q) => showProfile(q)));
CONFIG.birthdaySearches.forEach((k) => (searchTriggers[k] = (q) => showBirthdaySurprise(q)));

// Instant search triggers for images
["images", "mummy images", "photos", "mummy photos", "gallery", "sanuja photos"].forEach((k) => {
  searchTriggers[k] = (q) => {
    showProfile(q);
    setTab("images");
  };
});

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

// Flower decoration in SVG
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
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='${h}'><rect width='100%' height='100%' fill='${c}'/><text x='50%' y='50%' font-family='Arial, sans-serif' font-size='16' fill='#8a6a76' text-anchor='middle'>${label}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function fixImgs(root) {
  $$("img[data-h]", root).forEach((im) =>
    im.addEventListener("error", () => { im.src = placeholder(im.dataset.l || "Photo", +im.dataset.h, +im.dataset.i); }, { once: true }));
}

// Clean imgTag: NO captions
const imgTag = (o, i) => `<img src="${o.src}" alt="Photo ${i + 1}" data-h="${o.h || 260}" data-i="${i}" data-l="Photo ${i + 1}" loading="lazy">`;

// Google Images gallery HTML (no captions)
function galleryHTML(list) {
  return `<div class="gallery google-gallery">${list.map((o) => {
    const i = images.indexOf(o);
    return `<figure class="g-img-card" data-i="${i}" data-group="${esc(o.filterKey || 'all')}">
      <div class="g-img-wrap">${imgTag(o, i)}</div>
      <div class="g-img-meta">
        <span class="g-site-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></span>
        <span class="g-source-name">mummy.google.com</span>
      </div>
    </figure>`;
  }).join("")}</div>`;
}

/* =========================== 4. VIEWS =========================== */
let currentQuery = "";

function showView(id) {
  $$(".view").forEach((v) => v.classList.remove("active", "show"));
  const el = $("#" + id);
  el.classList.add("active");
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("show")));
  document.body.classList.toggle("floral", id !== "home");
  window.scrollTo(0, 0);
}

function showHome() {
  stopBirthday();
  $$("input").forEach((i) => (i.value = ""));
  showView("home");
}

function showProfile(q) {
  stopBirthday();
  currentQuery = q || CONFIG.name;
  $("#results .searchbox input").value = currentQuery;
  showView("results");
  setTab("all");
}

function showNoResults(q) {
  stopBirthday();
  $("#results .searchbox input").value = q;
  $$("#tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === "all"));
  $$(".tab-pane", $("#tabContent")).forEach((p) => p.classList.remove("active"));
  const allPane = $("#tabAll");
  allPane.innerHTML = `<div class="empty"><p>Your search - <b>${esc(q)}</b> - did not match any documents.</p><p>Suggestions:</p><ul><li>Make sure all words are spelled correctly.</li><li>Try searching for <b>Sanuja</b>, <b>Mummy</b>, or <b>Mummy Birthday</b>.</li></ul></div>`;
  allPane.classList.add("active");
  showView("results");
}

// Knowledge panel layout for the All tab (Clean 2-column header: collage + 4 stat chips)
function entityHTML() {
  const p = profile, im = (i) => `<div data-i="${i}">${imgTag(images[i], i)}</div>`;
  return `<section class="entity"><h2>${esc(CONFIG.name)}</h2><p class="sub">${esc(p.subtitle)}</p>
    <div class="erow">
      <div class="collage"><div class="c1" data-i="0">${imgTag(images[0], 0)}</div><div class="c2">${im(1)}${im(2)}</div></div>
      <div class="side">${p.chips.map((c) => `<div class="chip"><b>${c[0]}</b><span class="big">${esc(c[1])}</span><span>${c[2]}</span></div>`).join("")}</div>
    </div></section>
    <div class="cols"><div class="main">
      <h3 class="sec">What people are saying</h3><p class="secsub">Verified reviews from Anusha & Aarya</p>
      <div class="posts">${posts.map((o) => `<div class="post"><h4>${esc(o.title)}</h4><p>${esc(o.body)}</p><div class="pf"><span class="av">${esc(o.who[0])}</span><div><b>${esc(o.who)}</b><br><small>${o.meta}</small></div></div></div>`).join("")}</div>
      <p class="count">${resultCount}</p>
      ${results.map((r) => `<div class="res"><div class="url">${r.url}</div><h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p>${r.meta ? `<div class="meta">${r.meta}</div>` : ""}</div>`).join("")}
    </div>
    <aside class="about"><h3>About</h3><p>${esc(p.about)}</p><div class="facts">${p.facts.map((f) => `<div><span>${f[0]}</span><span>${esc(f[1])}</span></div>`).join("")}</div></aside></div>`;
}

function setTab(tab) {
  $$("#tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === tab));
  
  const allPane = $("#tabAll");
  const imgPane = $("#imagesSection");

  $$(".tab-pane", $("#tabContent")).forEach((p) => p.classList.remove("active"));

  if (tab === "all") {
    if (!allPane.innerHTML.trim() || allPane.dataset.renderedQuery !== currentQuery) {
      allPane.innerHTML = entityHTML();
      allPane.dataset.renderedQuery = currentQuery;
      fixImgs(allPane);
    }
    allPane.classList.add("active");
  } else if (tab === "images") {
    imgPane.classList.add("active");
    fixImgs(imgPane);
  }
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

/* ===================== 6. LIGHTBOX ===================== */
let lbIndex = 0;
function openLightbox(i) {
  lbIndex = (i + images.length) % images.length;
  const o = images[lbIndex], im = $("#lightbox img");
  im.src = o.src;
  im.addEventListener("error", () => { im.src = placeholder("Photo " + (lbIndex + 1), 400, lbIndex); }, { once: true });
  const counter = $("#lightbox .lb-counter");
  if (counter) counter.textContent = (lbIndex + 1) + " / " + images.length;
  $("#lightbox").classList.add("open");
}

function closeModals() {
  $$(".modal").forEach((m) => m.classList.remove("open"));
}

/* ==================== 7. BIRTHDAY EXPERIENCE ==================== */
const cv = $("#confetti"), cx = cv.getContext("2d");
const COLORS = ["#f4a6b8", "#f7c6d2", "#ffd36e", "#cdb8f0", "#b8e0c4"];
let parts = [], raf = null, confettiTimer = null, timers = [];

function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
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

function makeFloaters() {
  $("#floaters").innerHTML = Array.from({ length: 9 }, (_, i) => {
    const s = 34 + (i % 4) * 14;
    return `<div class="floater" style="left:${4 + i * 11}%;width:${s}px;height:${s}px;background-image:var(--flower${(i % 2) + 1});animation-duration:${16 + (i % 4) * 3}s;animation-delay:${-i * 2.4}s"></div>`;
  }).join("");
}

function buildBirthdayContent() {
  const t = "HAPPY BIRTHDAY " + CONFIG.shortName.toUpperCase() + "!";
  $("#bTitle").textContent = t;
  $("#bSub").textContent = bdaySubtitle;
  $(".candles").innerHTML = '<div class="candle"></div>'.repeat(5);
  $("#cake").classList.remove("out");
  $("#wishMsg").textContent = "";
  $("#wishBtn").disabled = false;
  
  // Keep only some curated highlight photos in the birthday section (no multiple section headers)
  const highlightIndices = [0, 2, 6, 8, 11, 16, 20, 27];
  const highlights = highlightIndices.map((idx) => images[idx]);
  
  $("#bPhotos").innerHTML = `
    <div class="bday-highlights reveal">
      <h3>Moments & Highlights</h3>
      <div class="gallery google-gallery bday-gallery">
        ${highlights.map((o) => {
          const i = images.indexOf(o);
          return `<figure class="g-img-card" data-i="${i}">
            <div class="g-img-wrap">${imgTag(o, i)}</div>
          </figure>`;
        }).join("")}
      </div>
    </div>
  `;
  
  $("#letter").innerHTML = `<h3>${esc(message.title)}</h3>${message.paragraphs.map((p) => `<p>${p}</p>`).join("")}<p class="sign">${message.sign}</p>`;
  fixImgs($("#birthday"));
}

function showBirthdaySurprise(q) {
  showProfile(q);
  timers.push(setTimeout(() => {
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

$("#wishBtn").addEventListener("click", () => {
  $("#cake").classList.add("out"); $("#wishBtn").disabled = true;
  addConfetti(110, true); $("#wishMsg").textContent = wishText;
});

// Google Images Filter Chips
function bindFilterChips() {
  const bar = $("#gChipsBar");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const chip = e.target.closest(".g-chip");
    if (!chip) return;
    $$(".g-chip", bar).forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const filter = chip.dataset.filter;
    const cards = $$("#googleGallery .g-img-card");
    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.group === filter;
      card.classList.toggle("is-hidden", !match);
    });
  });
}

/* ============================ 8. INIT ============================ */
$$(".searchbox").forEach(bindSearch);
$(".go").addEventListener("click", () => {
  const val = $("#home input").value.trim();
  handleSearch(val || CONFIG.name);
});
$(".lucky").addEventListener("click", () => {
  const val = $("#home input").value.trim();
  handleSearch(val ? val : "mummy birthday");
});
$("#homeLink").addEventListener("click", showHome);
$("#bdayBack").addEventListener("click", () => showProfile(currentQuery || CONFIG.name));
$("#tabs").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) setTab(b.dataset.tab);
});

const homeImagesBtn = $("#homeImagesBtn");
if (homeImagesBtn) {
  homeImagesBtn.addEventListener("click", () => {
    showProfile("sanuja");
    setTab("images");
  });
}

document.addEventListener("click", (e) => {
  const f = e.target.closest(".gallery figure, .collage [data-i], [data-group] img");
  if (f) {
    const idx = f.dataset.i !== undefined ? f.dataset.i : f.closest("[data-i]")?.dataset.i;
    if (idx !== undefined) openLightbox(+idx);
  }
  if (e.target.matches("[data-close]") || e.target.classList.contains("modal")) closeModals();
});

$("#lightbox .prev").addEventListener("click", () => openLightbox(lbIndex - 1));
$("#lightbox .next").addEventListener("click", () => openLightbox(lbIndex + 1));
$$(".clear").forEach((b) => b.addEventListener("click", () => { const i = $("input", b.closest("form")); i.value = ""; i.focus(); }));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
  if ($("#lightbox").classList.contains("open")) {
    if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
    if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
  }
});

bindFilterChips();
addEventListener("resize", sizeCanvas);
sizeCanvas();
showView("home");
