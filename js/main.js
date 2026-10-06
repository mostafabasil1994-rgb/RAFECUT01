/* RAFECUT — front-end interactions (Arabic / English) */
(() => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const fmt = (n) => n.toLocaleString("en-US");
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Language state ---------- */
  const LANG_KEY = "rafecut-lang";
  let lang = "ar";
  try {
    const q = new URLSearchParams(location.search).get("lang");
    lang = q === "en" || q === "ar" ? q : localStorage.getItem(LANG_KEY) || "ar";
  } catch (_) { /* storage blocked: keep Arabic */ }
  if (lang !== "en") lang = "ar";

  const ui = () => UI[lang];
  const sar = (n) => ui().currency(fmt(n));
  /* pick a field from an item in the current language */
  const tr = (item, field) => (lang === "en" && item.en && item.en[field] != null ? item.en[field] : item[field]);

  /* Arabic static text is read once from the HTML */
  const AR = {}, AR_PH = {}, AR_ARIA = {};
  $$("[data-i18n]").forEach((el) => { AR[el.dataset.i18n] ??= el.innerHTML; });
  $$("[data-i18n-ph]").forEach((el) => { AR_PH[el.dataset.i18nPh] ??= el.placeholder; });
  $$("[data-i18n-aria]").forEach((el) => { AR_ARIA[el.dataset.i18nAria] ??= el.getAttribute("aria-label"); });
  const label = (key) => (lang === "en" ? STATIC_EN[key] : AR[key]) ?? key;
  const plain = (key) => { const d = document.createElement("div"); d.innerHTML = label(key); return d.textContent; };

  function applyStatic() {
    $$("[data-i18n]").forEach((el) => { el.innerHTML = label(el.dataset.i18n); });
    $$("[data-i18n-ph]").forEach((el) => { el.placeholder = lang === "en" ? STATIC_EN[el.dataset.i18nPh] : AR_PH[el.dataset.i18nPh]; });
    $$("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", lang === "en" ? STATIC_EN[el.dataset.i18nAria] : AR_ARIA[el.dataset.i18nAria]); });
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.title = ui().pageTitle;
    const btn = $("#langToggle");
    btn.textContent = ui().langBtn;
    btn.lang = ui().langBtnLang;
    btn.setAttribute("aria-label", ui().langBtnLabel);
  }

  /* ---------- Icons (inline SVG, stroke style) ---------- */
  const ICONS = {
    location: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    camera: '<rect x="2.5" y="6.5" width="13" height="11" rx="1.5"/><path d="M15.5 10.5l6-3.5v10l-6-3.5"/><circle cx="7" cy="4" r="1.5"/><circle cx="11.5" cy="4" r="1.5"/>',
    hotel: '<path d="M3 20V5h10v15M13 9h8v11M2 20h20M6.5 8.5h3M6.5 12h3M6.5 15.5h3M16.5 12.5h1.5M16.5 16h1.5"/>',
    film: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 7.5h4M3 12h4M3 16.5h4M17 7.5h4M17 12h4M17 16.5h4"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1L20 20M8.1 15.9L20 4M14 12l0 0"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.4-1.2-1.6-1.2-3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.4 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    wave: '<path d="M3 12h2M7 8v8M11 4v16M15 7v10M19 10v4M21 12h0"/>',
    lighting: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    sound: '<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
    drone: '<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M7 7l2.5 2.5M17 7l-2.5 2.5M7 17l2.5-2.5M17 17l-2.5-2.5"/>',
    arch: '<path d="M4 21V11a8 8 0 0 1 16 0v10M8 21v-9a4 4 0 0 1 8 0v9M2 21h20"/>',
    house: '<path d="M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-6h4v6"/>',
    alley: '<path d="M3 3l6 4v14M21 3l-6 4v14M9 21h6M9 11h6"/>',
    lens: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 7l3.5 8M7.5 9.5l8.5 1M8.5 15.5L14 8"/>',
    bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6l8.5 7 8.5-7"/>',
    phone: '<path d="M5 3h3.5l1.5 4.5-2 1.5a11 11 0 0 0 7 7l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-6M11.5 13a2.5 2.5 0 0 1 5 0v3.5"/>',
    vimeo: '<path d="M3 8.5l1 1.2c1-.8 2-1.3 2.4-.4.6 1.4 1.8 6.8 3.1 8.2 1.3 1.4 3 .3 5.3-2.6C17.2 11.9 20.6 7 21 5.6c.4-1.6-1.6-2.8-4-1.4-1.5.9-2.4 2.4-2.6 3.4 1.5-.8 2.6-.4 2 1.6-.6 2-2.4 4.4-3 4.2-.8-.3-1.4-5.7-2.4-7.4-.9-1.6-3.3-.8-8 2.5z"/>',
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  $$("[data-icon]").forEach((el) => (el.innerHTML = icon(el.dataset.icon)));

  /* Card media: original illustration underneath, real photo on top once it exists.
     Either layer removes itself if its file is missing, leaving the icon fallback. */
  const artFor = (img) => (img ? img.replace(/^images\//, "images/art/").replace(/\.jpe?g$/i, ".svg") : "");
  const media = (src, alt, fallbackIcon, art = artFor(src)) => `
    <div class="card-media">
      <span class="media-fallback">${icon(fallbackIcon)}</span>
      ${art ? `<img class="art" src="${art}" alt="" aria-hidden="true" loading="lazy" onerror="this.remove()">` : ""}
      ${src ? `<img class="photo" src="${src}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()">` : ""}
    </div>`;

  /* Add-to-pack buttons: items are identified by their image file name */
  const slugOf = (img) => (img ? img.split("/").pop().replace(/\.\w+$/, "") : "");
  const addBtn = (kind, id) => `<button class="btn btn-gold btn-sm add-btn" data-add="${kind}" data-id="${esc(id)}">${ui().pack.add}</button>`;

  /* Booking buttons carry their modal content in data attributes */
  const bookBtn = (cls, kind, name, extra, text) =>
    `<button class="btn ${cls} btn-sm" data-book="${kind}" data-name="${esc(name)}" data-extra="${esc(extra)}">${text}</button>`;

  /* ---------- Header: scroll state, mobile menu, active link ---------- */
  const header = $("#siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const nav = $("#mainNav");
  const toggle = $("#menuToggle");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("no-scroll", open);
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  const navLinks = $$(".nav-link");
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${e.target.id}`));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  ["home", "locations", "equipment", "hospitality", "post", "contact"].forEach((id) => spy.observe(document.getElementById(id)));

  /* ---------- Reveal on scroll ---------- */
  const revealer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); revealer.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  const observeReveals = (root = document) => $$(".reveal:not(.in)", root).forEach((el) => revealer.observe(el));

  /* ---------- Stats counter ---------- */
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / 1400, 1);
        el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counter.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counter.observe(el));

  /* ---------- Modal ---------- */
  const modal = $("#modal");
  let lastFocus = null;
  function showModal(title, text, items = []) {
    lastFocus = document.activeElement;
    $("#modalTitle").textContent = title;
    $("#modalText").textContent = text;
    const list = $("#modalList");
    list.innerHTML = items.map(([k, v]) => `<li><span>${esc(k)}</span><strong>${esc(v)}</strong></li>`).join("");
    list.hidden = !items.length;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("show"));
    document.body.classList.add("no-scroll");
    $(".modal-box .btn", modal).focus();
  }
  function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove("no-scroll");
    setTimeout(() => (modal.hidden = true), 250);
    if (lastFocus) lastFocus.focus();
  }
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!modal.hidden) closeModal();
    else if (!$("#pack").hidden) closePack();
  });

  const ref = () => "RC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const city = (key) => ui().cities[key] || key;
  const levelTag = (lvl) => label(`level.${lvl}`);

  /* ---------- City selects ---------- */
  function fillCitySelect(select, keepFirst) {
    const val = select.value;
    const first = select.options[0];
    select.innerHTML = "";
    if (keepFirst) select.add(first);
    AREAS.forEach((c) => select.add(new Option(city(c), c)));
    select.value = val;
  }

  /* ---------- Services ---------- */
  function renderServices() {
    $("#servicesGrid").innerHTML = SERVICES.map((s, i) => `
      <a class="service-card reveal in" href="${s.href}" style="--d:${i * 80}ms">
        <span class="service-num">0${i + 1}</span>
        <span class="service-icon">${icon(s.icon)}</span>
        <h3>${tr(s, "title")}</h3>
        <p>${tr(s, "text")}</p>
        <span class="service-more">${ui().more}</span>
      </a>`).join("");
  }

  /* ---------- Locations ---------- */
  const fCity = $("#fCity"), fType = $("#fType");
  const TYPE_ICON = { heritage: "arch", residential: "house", street: "alley" };
  const where = (area) => (area === "mosul" || area === "oldcity" ? city(area) : `${city(area)}${ui().listSep}${ui().mosul}`);

  function renderLocations() {
    const list = LOCATIONS.filter((l) =>
      (fCity.value === "all" || l.area === fCity.value) &&
      (fType.value === "all" || l.type === fType.value));
    const per = ui().perDay, price = sar(LOCATION_RATE);
    $("#locationsGrid").innerHTML = list.map((l) => {
      const name = tr(l, "name");
      return `
      <article class="card item-card reveal">
        ${media(l.img, name, TYPE_ICON[l.type])}
        <span class="tag">${label(`ltype.${l.type}`)}</span>
        <div class="card-body">
          <h3>${name}</h3>
          <p class="meta">${icon("pin")} ${where(l.area)}</p>
          <p class="desc">${tr(l, "desc")}</p>
          <div class="card-foot">
            <p class="price">${price} <small>/ ${per}</small></p>
            ${addBtn("location", slugOf(l.img))}
          </div>
        </div>
      </article>`;
    }).join("");
    $("#locationsEmpty").hidden = list.length > 0;
    observeReveals($("#locationsGrid"));
  }
  [fCity, fType].forEach((s) => s.addEventListener("change", renderLocations));
  $("#fReset").addEventListener("click", () => {
    fCity.value = fType.value = "all";
    renderLocations();
  });

  /* ---------- Equipment & crew ---------- */
  let gearCat = "all";
  const GEAR_ICON = { camera: "camera", cine: "film", lens: "lens", cinelens: "lens" };
  function renderGear() {
    const list = GEAR.filter((g) => gearCat === "all" || g.cat === gearCat);
    const per = ui().perDay;
    $("#gearGrid").innerHTML = list.map((g) => {
      const name = tr(g, "name");
      return `
      <article class="card item-card reveal">
        ${media(g.img, name, GEAR_ICON[g.cat])}
        <span class="tag">${ui().gearCats[g.cat]}</span>
        ${g.qty ? `<span class="stock">${ui().inStock(g.qty)}</span>` : ""}
        <div class="card-body">
          <h3 dir="auto">${name}</h3>
          <p class="meta">${tr(g, "desc")}</p>
          <div class="card-foot">
            <p class="price">${sar(g.price)} <small>/ ${per}</small></p>
            ${addBtn("gear", slugOf(g.img))}
          </div>
        </div>
      </article>`;
    }).join("");
    observeReveals($("#gearGrid"));
  }
  $("#gearFilter").addEventListener("click", (e) => {
    const b = e.target.closest(".chip-btn");
    if (!b) return;
    $$(".chip-btn", e.currentTarget).forEach((x) => x.classList.toggle("active", x === b));
    gearCat = b.dataset.cat;
    renderGear();
  });

  function renderCrew() {
    $("#crewGrid").innerHTML = CREW.map((c) => {
      const role = tr(c, "role");
      return `
      <article class="card crew-card reveal">
        <div class="avatar" aria-hidden="true">${icon(c.icon)}</div>
        <h3>${role}</h3>
        <p class="crew-desc">${tr(c, "desc")}</p>
        <ul class="crew-meta"><li>${icon("pin")} ${ui().mosul}</li></ul>
        ${bookBtn("btn-ghost btn-block", "crew", role, ui().mosul, ui().contact)}
      </article>`;
    }).join("");
    observeReveals($("#crewGrid"));
  }

  /* ---------- Hotels & restaurants ---------- */
  const fBudget = $("#fBudget"), fBank = $("#fBank");
  let hospTab = "hotels";
  const dots = (lvl) =>
    `<span class="level" aria-label="${ui().priceLevel}: ${levelTag(lvl)}">${"<b></b>".repeat(lvl)}${"<i></i>".repeat(3 - lvl)}</span>`;
  const HOTEL_ART = { 1: "hotel-budget", 2: "hotel-mid", 3: "hotel-upscale" };
  const hospArt = (h, kind) => (kind === "hotels"
    ? `images/art/hotels/${HOTEL_ART[h.level]}.svg`
    : `images/art/restaurants/rest-${h.kind || "traditional"}.svg`);
  const placeOf = (h) => {
    const area = ui().cities[h.area] ? city(h.area) : tr(h, "area");
    return !area || area === ui().mosul ? ui().mosul : `${area}${ui().listSep}${ui().mosul}`;
  };

  function hospCard(h, kind) {
    const name = tr(h, "name"), cuisine = tr(h, "cuisine"), unit = ui().per[h.unit];
    const price = h.price ? `${sar(h.price)} <small>/ ${unit}</small>` : `<small>${ui().priceOnRequest}</small>`;
    const priceText = h.price ? `${sar(h.price)} / ${unit}` : ui().priceOnRequest;
    const bank = h.bank && h.bank !== "unknown" ? ui().banks[h.bank] : "";
    return `
      <article class="card item-card reveal">
        ${media(h.img, name, kind === "hotels" ? "hotel" : "star", hospArt(h, kind))}
        <span class="tag">${levelTag(h.level)}</span>
        ${h.stars ? `<span class="stock" aria-label="${h.stars} ${ui().starsLabel}">${"★".repeat(h.stars)}</span>` : ""}
        <div class="card-body">
          <h3>${name}</h3>
          <p class="meta">${icon("pin")} ${placeOf(h)}${bank ? ` · ${bank}` : ""}</p>
          ${cuisine ? `<p class="desc">${cuisine}</p>` : ""}
          <div class="card-foot">
            <div>
              ${dots(h.level)}
              <p class="price">${price}</p>
            </div>
            ${kind === "hotels" ? addBtn("hotel", slugOf(h.img)) : bookBtn("btn-gold", kind, name, `${placeOf(h)} · ${priceText}`, ui().book)}
          </div>
        </div>
      </article>`;
  }
  function renderHosp() {
    const match = (h) => (fBudget.value === "all" || h.level === +fBudget.value) &&
      (fBank.value === "all" || h.bank === fBank.value);
    const hotels = HOTELS.filter(match), rest = RESTAURANTS.filter(match);
    $("#hotelsGrid").innerHTML = hotels.map((h) => hospCard(h, "hotels")).join("");
    $("#restaurantsGrid").innerHTML = rest.map((h) => hospCard(h, "restaurants")).join("");
    const shown = hospTab === "hotels" ? hotels : rest;
    $("#hospEmpty").hidden = shown.length > 0;
    $("#hospCount").textContent = ui().hospCount(shown.length, hospTab === "hotels" ? HOTELS.length : RESTAURANTS.length, hospTab);
    observeReveals($("#hospitality"));
  }
  [fBudget, fBank].forEach((s) => s.addEventListener("change", renderHosp));

  /* ---------- Tabs ---------- */
  $$("[data-tabs]").forEach((group) => {
    const section = group.closest("section");
    group.addEventListener("click", (e) => {
      const t = e.target.closest(".tab");
      if (!t) return;
      $$(".tab", group).forEach((x) => {
        x.classList.toggle("active", x === t);
        x.setAttribute("aria-selected", String(x === t));
      });
      $$(".tab-panel", section).forEach((p) => p.classList.toggle("active", p.dataset.panel === t.dataset.tab));
      if (group.dataset.tabs === "hosp") { hospTab = t.dataset.tab; renderHosp(); }
      observeReveals(section);
    });
  });

  /* ---------- Post-production ---------- */
  function renderPost() {
    $("#postServices").innerHTML = POST_SERVICES.map((s, i) => `
      <div class="post-card reveal in" style="--d:${i * 80}ms">
        <span class="service-icon">${icon(s.icon)}</span>
        <h3>${tr(s, "title")}</h3>
        <p>${tr(s, "text")}</p>
      </div>`).join("");

    $("#pricing").innerHTML = PACKAGES.map((p) => {
      const name = tr(p, "name");
      return `
      <div class="price-card reveal in ${p.featured ? "featured" : ""}">
        ${p.featured ? `<span class="badge">${ui().popular}</span>` : ""}
        <h3>${name}</h3>
        <p class="muted small">${tr(p, "note")}</p>
        <p class="price-big"><small>${ui().per[p.unit]}</small> <bdi>$${fmt(p.price)}</bdi></p>
        <ul>${tr(p, "features").map((f) => `<li>${f}</li>`).join("")}</ul>
        <button class="btn ${p.featured ? "btn-gold" : "btn-ghost"} btn-block" data-book="package" data-name="${esc(`${ui().pkg} ${name}`)}" data-extra="${esc(sar(p.price))}">${ui().choose}</button>
      </div>`;
    }).join("");
  }

  /* ---------- Booking buttons (delegated) ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-book]");
    const r = ui().rows;
    if (b) {
      const [title, text] = ui().booking[b.dataset.book];
      showModal(title, text, [[r.request, b.dataset.name], [r.details, b.dataset.extra], [r.ref, ref()]]);
      return;
    }
    if (e.target.closest('[data-action="request-post"]')) {
      const [title, text] = ui().booking.post;
      showModal(title, text, [[r.ref, ref()]]);
    }
  });

  /* ---------- Planner form ---------- */
  const planner = $("#plannerForm");
  const budget = $("#budget"), budgetOut = $("#budgetOut");
  const updateBudget = () => {
    const v = +budget.value;
    budgetOut.textContent = v >= +budget.max ? ui().budgetMax : sar(v);
    budget.style.setProperty("--p", ((v - budget.min) / (budget.max - budget.min)) * 100 + "%");
  };
  budget.addEventListener("input", updateBudget);
  $("#pDate").min = new Date().toISOString().slice(0, 10);

  let plannerTried = false;
  function validatePlanner() {
    const data = new FormData(planner);
    const m = ui().missing, missing = [];
    if (!data.get("type")) missing.push(m.type);
    if (!data.getAll("services").length) missing.push(m.services);
    if (!data.get("date")) missing.push(m.date);
    if (!data.get("city")) missing.push(m.city);
    if (!(+data.get("crew") > 0)) missing.push(m.crew);
    const err = $("#plannerError");
    err.textContent = ui().missingPrefix + missing.join(ui().listSep);
    err.hidden = !missing.length;
    return { data, ok: !missing.length };
  }
  planner.addEventListener("submit", (e) => {
    e.preventDefault();
    plannerTried = true;
    const { data, ok } = validatePlanner();
    if (!ok) return;
    const r = ui().rows;
    const [title, text] = ui().quote;
    showModal(title, text, [
      [r.type, plain(`ptype.${data.get("type")}`)],
      [r.budget, budgetOut.textContent],
      [r.services, data.getAll("services").map((s) => plain(`svc.${s}`)).join(ui().listSep)],
      [r.dateCity, `${data.get("date")} · ${city(data.get("city"))}`],
      [r.crew, `${data.get("crew")} ${ui().crewUnit}`],
      [r.ref, ref()],
    ]);
    planner.reset();
    plannerTried = false;
    updateBudget();
  });

  /* ---------- Contact form ---------- */
  const contact = $("#contactForm");
  let contactTried = false;
  function validateContact() {
    const err = $("#contactError");
    const bad = $$(":invalid", contact).map((el) => $(`label[for="${el.id}"]`).textContent);
    err.textContent = ui().contactInvalid + bad.join(ui().listSep);
    err.hidden = !bad.length;
    return !bad.length;
  }
  contact.addEventListener("submit", (e) => {
    e.preventDefault();
    contactTried = true;
    if (!validateContact()) return;
    showModal(ui().thanks($("#cName").value.trim()), ui().thanksText, [[ui().rows.ref, ref()]]);
    contact.reset();
    contactTried = false;
  });

  /* ---------- Build your package (اصنع حزمتك) ---------- */
  const PACK_KEY = "rafecut-pack";
  const CATALOG = {
    location: { list: () => LOCATIONS, price: () => LOCATION_RATE, unit: "days", qty: false },
    gear: { list: () => GEAR, price: (x) => x.price, unit: "days", qty: true, max: (x) => x.qty || 99 },
    hotel: { list: () => HOTELS, price: (x) => x.price || null, unit: "nights", qty: true, max: () => 50 },
  };
  const findItem = (kind, id) => (CATALOG[kind] ? CATALOG[kind].list().find((x) => slugOf(x.img) === id) : null);

  let pack = { from: "", to: "", items: [] };
  try {
    const saved = JSON.parse(localStorage.getItem(PACK_KEY) || "null");
    if (saved && Array.isArray(saved.items)) {
      pack = {
        from: typeof saved.from === "string" ? saved.from : "",
        to: typeof saved.to === "string" ? saved.to : "",
        items: saved.items.filter((it) => it && findItem(it.kind, it.id)).map((it) => ({
          kind: it.kind, id: it.id,
          days: Number.isInteger(it.days) && it.days > 0 ? it.days : null,
          qty: Number.isInteger(it.qty) && it.qty > 0 ? it.qty : 1,
        })),
      };
    }
  } catch (_) { /* storage unavailable: start empty */ }
  const savePack = () => { try { localStorage.setItem(PACK_KEY, JSON.stringify(pack)); } catch (_) { /* ignore */ } };

  const DAY_MS = 86400000;
  const isoDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v);
  function spanDays() {
    if (!isoDate(pack.from) || !isoDate(pack.to)) return null;
    const d = Math.round((Date.parse(pack.to) - Date.parse(pack.from)) / DAY_MS) + 1;
    return d >= 1 ? d : 0; // 0 = invalid range
  }
  const MAX_DAYS = 365;
  function daysOf(it) {
    const span = spanDays();
    const cap = span || MAX_DAYS;
    return Math.min(Math.max(it.days ?? (span || 1), 1), cap);
  }
  function lineOf(it) {
    const x = findItem(it.kind, it.id), c = CATALOG[it.kind];
    const unitPrice = x ? c.price(x) : null;
    const days = daysOf(it), qty = c.qty ? it.qty : 1;
    return { x, c, unitPrice, days, qty, total: unitPrice == null ? null : unitPrice * days * qty };
  }

  const packEl = $("#pack"), drawer = $("#packDrawer"), packFrom = $("#packFrom"), packTo = $("#packTo");
  let packLastFocus = null;
  function openPack() {
    if (!packEl.hidden) return;
    packLastFocus = document.activeElement;
    renderPack();
    packEl.hidden = false;
    requestAnimationFrame(() => packEl.classList.add("show"));
    document.body.classList.add("no-scroll");
    $("#packToggle").setAttribute("aria-expanded", "true");
    hideToast();
    drawer.focus();
  }
  function closePack() {
    packEl.classList.remove("show");
    document.body.classList.remove("no-scroll");
    $("#packToggle").setAttribute("aria-expanded", "false");
    setTimeout(() => (packEl.hidden = true), 300);
    if (packLastFocus && document.contains(packLastFocus)) packLastFocus.focus();
  }

  let toastTimer = 0;
  function hideToast() { $("#toast").classList.remove("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => ($("#toast").hidden = true), 250); }
  function showToast(text) {
    clearTimeout(toastTimer);
    $("#toastText").textContent = text;
    $("#toast").hidden = false;
    requestAnimationFrame(() => $("#toast").classList.add("show"));
    toastTimer = setTimeout(hideToast, 3500);
  }

  function updatePackBadges() {
    const n = pack.items.length;
    const badge = $("#packCount");
    badge.textContent = n;
    badge.hidden = n === 0;
    $("#packToggle").setAttribute("aria-label", `${plain("pack.name")}${n ? ` (${n})` : ""}`);
    $$("[data-add]").forEach((b) => {
      const inPack = pack.items.some((it) => it.kind === b.dataset.add && it.id === b.dataset.id);
      b.classList.toggle("added", inPack);
      b.textContent = inPack ? ui().pack.inPack : ui().pack.add;
    });
  }

  const stepper = (i, field, value, labelText, atMin, atMax) => `
    <div class="stepper" role="group" aria-label="${esc(labelText)}">
      <span class="stepper-label">${labelText}</span>
      <button type="button" data-act="${field}" data-i="${i}" data-d="-1" aria-label="${ui().pack.dec}: ${esc(labelText)}" ${atMin ? "disabled" : ""}>−</button>
      <output>${value}</output>
      <button type="button" data-act="${field}" data-i="${i}" data-d="1" aria-label="${ui().pack.inc}: ${esc(labelText)}" ${atMax ? "disabled" : ""}>+</button>
    </div>`;

  function renderPack() {
    const P = ui().pack, span = spanDays();
    packFrom.value = pack.from;
    packTo.value = pack.to;
    packFrom.min = new Date().toISOString().slice(0, 10);
    packTo.min = pack.from || packFrom.min;
    const spanEl = $("#packSpan");
    spanEl.textContent = span === null ? P.pickDates : span === 0 ? P.badRange : P.span(span);
    spanEl.classList.toggle("bad", span === 0);

    if (!pack.items.length) {
      $("#packItems").innerHTML = `
        <div class="pack-empty">
          <span class="pack-empty-icon">${icon("bag")}</span>
          <p>${P.empty}</p>
          <a href="#locations" class="btn btn-ghost btn-sm" data-pack-close>${P.browse}</a>
        </div>`;
      $("#packTotals").innerHTML = "";
      updatePackBadges();
      return;
    }

    let grand = 0, onRequest = 0;
    const groups = ["location", "gear", "hotel"].map((kind) => {
      const rows = pack.items.map((it, i) => ({ it, i })).filter((r) => r.it.kind === kind);
      if (!rows.length) return "";
      let sub = 0, subUnknown = false;
      const html = rows.map(({ it, i }) => {
        const L = lineOf(it);
        const name = tr(L.x, "name");
        if (L.total == null) { onRequest++; subUnknown = true; } else { sub += L.total; }
        const unitLabel = L.c.unit === "nights" ? P.nights : P.days;
        const unitPrice = L.unitPrice == null ? ui().priceOnRequest
          : `${sar(L.unitPrice)} / ${L.c.unit === "nights" ? ui().per.night : ui().perDay}`;
        const cap = span || MAX_DAYS;
        const qtyMax = L.c.qty ? L.c.max(L.x) : 1;
        return `
        <div class="pack-row">
          <div class="pack-info">
            <strong dir="auto">${name}</strong>
            <span>${unitPrice}${L.c.qty && L.qty >= qtyMax && it.kind === "gear" ? ` · ${P.maxStock(qtyMax)}` : ""}</span>
          </div>
          <div class="pack-ctrls">
            ${stepper(i, "days", L.days, unitLabel, L.days <= 1, L.days >= cap)}
            ${L.c.qty ? stepper(i, "qty", L.qty, it.kind === "hotel" ? P.rooms : P.qty, L.qty <= 1, L.qty >= qtyMax) : ""}
          </div>
          <div class="pack-line">${L.total == null ? `<small>${ui().priceOnRequest}</small>` : sar(L.total)}</div>
          <button type="button" class="pack-remove" data-act="remove" data-i="${i}" aria-label="${P.remove}: ${esc(name)}">×</button>
        </div>`;
      }).join("");
      grand += sub;
      return `
      <section class="pack-group">
        <h3>${P.groups[kind]} <span>${P.subtotal}: ${sar(sub)}${subUnknown ? " +" : ""}</span></h3>
        ${html}
      </section>`;
    }).join("");
    $("#packItems").innerHTML = groups;
    $("#packTotals").innerHTML = `
      <p class="pack-total"><span>${P.total}</span><strong>${sar(grand)}</strong></p>
      ${onRequest ? `<p class="pack-note">${P.onRequest(onRequest)}</p>` : ""}`;
    updatePackBadges();
  }

  function addToPack(kind, id) {
    const x = findItem(kind, id);
    if (!x) return;
    if (pack.items.some((it) => it.kind === kind && it.id === id)) { openPack(); return; }
    pack.items.push({ kind, id, days: null, qty: 1 });
    savePack();
    updatePackBadges();
    if (!packEl.hidden) renderPack();
    showToast(ui().pack.added(tr(x, "name")));
  }

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) { addToPack(add.dataset.add, add.dataset.id); return; }
    if (e.target.closest("[data-pack-open]")) { e.preventDefault(); openPack(); return; }
    if (e.target.closest("#packToggle")) { packEl.hidden ? openPack() : closePack(); return; }
    if (e.target.closest("[data-pack-close]")) closePack();
  });

  $("#packItems").addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const it = pack.items[+b.dataset.i];
    if (!it) return;
    if (b.dataset.act === "remove") {
      pack.items.splice(+b.dataset.i, 1);
    } else if (b.dataset.act === "days") {
      const cap = spanDays() || MAX_DAYS;
      it.days = Math.min(Math.max(daysOf(it) + +b.dataset.d, 1), cap);
    } else if (b.dataset.act === "qty") {
      const L = lineOf(it);
      it.qty = Math.min(Math.max(it.qty + +b.dataset.d, 1), L.c.max(L.x));
    }
    savePack();
    renderPack();
    const again = $(`[data-act="${b.dataset.act}"][data-i="${b.dataset.i}"][data-d="${b.dataset.d}"]`, $("#packItems"));
    if (again && !again.disabled) again.focus();
    else drawer.focus();
  });

  function onDates() {
    pack.from = packFrom.value;
    pack.to = packTo.value;
    savePack();
    $("#packError").hidden = true;
    renderPack();
  }
  packFrom.addEventListener("change", onDates);
  packTo.addEventListener("change", onDates);

  $("#packClear").addEventListener("click", () => {
    pack.items = [];
    savePack();
    renderPack();
    showToast(ui().pack.cleared);
  });

  $("#packSubmit").addEventListener("click", () => {
    const P = ui().pack, err = $("#packError"), span = spanDays();
    const problems = [];
    if (!span) problems.push(span === 0 ? P.badRange : P.needDates);
    if (!pack.items.length) problems.push(P.needItems);
    if (problems.length) { err.textContent = problems.join(" "); err.hidden = false; return; }
    err.hidden = true;
    let grand = 0, onRequest = 0;
    const rows = pack.items.map((it) => {
      const L = lineOf(it);
      if (L.total == null) onRequest++; else grand += L.total;
      const parts = [L.c.unit === "nights" ? P.unitNights(L.days) : P.unitDays(L.days)];
      if (L.c.qty && (L.qty > 1 || it.kind === "hotel")) parts.push(P.unitQty(L.qty, it.kind));
      parts.push(L.total == null ? ui().priceOnRequest : sar(L.total));
      return [tr(L.x, "name"), parts.join(" · ")];
    });
    const [title, text] = P.sent;
    closePack();
    showModal(title, text, [
      [P.period, `${pack.from} → ${pack.to} (${P.unitDays(span)})`],
      ...rows,
      [P.total, sar(grand) + (onRequest ? " +" : "")],
      [ui().rows.ref, ref()],
    ]);
    pack.items = [];
    savePack();
    updatePackBadges();
  });

  /* ---------- Language switch ---------- */
  function render() {
    applyStatic();
    fillCitySelect(fCity, true);
    fillCitySelect($("#pCity"), true);
    renderServices();
    renderLocations();
    renderGear();
    renderCrew();
    renderHosp();
    renderPost();
    updateBudget();
    renderPack();
    if (plannerTried) validatePlanner();
    if (contactTried) validateContact();
  }
  $("#langToggle").addEventListener("click", () => {
    lang = lang === "en" ? "ar" : "en";
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) { /* ignore */ }
    render();
  });

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  render();
  observeReveals();
})();
