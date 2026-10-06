/* RAFECUT — front-end interactions */
(() => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const fmt = (n) => n.toLocaleString("en-US");
  const sar = (n) => `${fmt(n)} ر.س`;
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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

  /* Card media with graceful fallback when the placeholder image can't load */
  const media = (src, alt, fallbackIcon, extra = "") => `
    <div class="card-media ${extra}">
      <span class="media-fallback">${icon(fallbackIcon)}</span>
      ${src ? `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()">` : ""}
    </div>`;

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
  const sectionIds = ["home", "locations", "equipment", "hospitality", "post", "contact"];
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${e.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sectionIds.forEach((id) => spy.observe(document.getElementById(id)));

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
        el.textContent = "+" + fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
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
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  const ref = () => "RC-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  /* ---------- Services ---------- */
  $("#servicesGrid").innerHTML = SERVICES.map((s, i) => `
    <a class="service-card reveal" href="${s.href}" style="--d:${i * 80}ms">
      <span class="service-num">0${i + 1}</span>
      <span class="service-icon">${icon(s.icon)}</span>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      <span class="service-more">اكتشف المزيد ←</span>
    </a>`).join("");

  /* ---------- Locations ---------- */
  const fCity = $("#fCity"), fType = $("#fType"), fPrice = $("#fPrice");
  [...new Set(LOCATIONS.map((l) => l.city))].forEach((c) => fCity.add(new Option(c, c)));

  function renderLocations() {
    const [min, max] = fPrice.value === "all" ? [0, Infinity] : fPrice.value.split("-").map(Number);
    const list = LOCATIONS.filter((l) =>
      (fCity.value === "all" || l.city === fCity.value) &&
      (fType.value === "all" || l.type === fType.value) &&
      l.price >= min && l.price < max);
    $("#locationsGrid").innerHTML = list.map((l) => `
      <article class="card item-card reveal">
        ${media(l.img, l.name, "location")}
        <span class="tag">${LOCATION_TYPES[l.type]}</span>
        <div class="card-body">
          <h3>${l.name}</h3>
          <p class="meta">${icon("pin")} ${l.city}</p>
          <div class="card-foot">
            <p class="price">${sar(l.price)} <small>/ يوم</small></p>
            <button class="btn btn-gold btn-sm" data-book="location" data-name="${l.name}" data-extra="${l.city} · ${sar(l.price)} / يوم">احجز</button>
          </div>
        </div>
      </article>`).join("");
    $("#locationsEmpty").hidden = list.length > 0;
    observeReveals($("#locationsGrid"));
  }
  [fCity, fType, fPrice].forEach((s) => s.addEventListener("change", renderLocations));
  $("#fReset").addEventListener("click", () => {
    fCity.value = fType.value = fPrice.value = "all";
    renderLocations();
  });
  renderLocations();

  /* ---------- Equipment & crew ---------- */
  let gearCat = "all";
  function renderGear() {
    const list = GEAR.filter((g) => gearCat === "all" || g.cat === gearCat);
    $("#gearGrid").innerHTML = list.map((g) => `
      <article class="card item-card reveal">
        ${media(g.img, g.name, g.cat === "camera" ? "camera" : g.cat, "short")}
        <span class="tag">${GEAR_CATS[g.cat]}</span>
        <div class="card-body">
          <h3 dir="auto">${g.name}</h3>
          <p class="meta">${g.desc}</p>
          <div class="card-foot">
            <p class="price">${sar(g.price)} <small>/ يوم</small></p>
            <button class="btn btn-gold btn-sm" data-book="gear" data-name="${g.name}" data-extra="${sar(g.price)} / يوم">استأجر</button>
          </div>
        </div>
      </article>`).join("");
    observeReveals($("#gearGrid"));
  }
  $("#gearFilter").addEventListener("click", (e) => {
    const b = e.target.closest(".chip-btn");
    if (!b) return;
    $$(".chip-btn", e.currentTarget).forEach((x) => x.classList.toggle("active", x === b));
    gearCat = b.dataset.cat;
    renderGear();
  });
  renderGear();

  const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join(" ");
  $("#crewGrid").innerHTML = CREW.map((c) => `
    <article class="card crew-card reveal">
      <div class="avatar" aria-hidden="true"><span>${initials(c.name)}</span></div>
      <h3>${c.name}</h3>
      <p class="role">${c.role}</p>
      <ul class="crew-meta">
        <li><strong>${c.years}</strong> سنة خبرة</li>
        <li>${icon("pin")} ${c.city}</li>
      </ul>
      <button class="btn btn-ghost btn-sm btn-block" data-book="crew" data-name="${c.name}" data-extra="${c.role}">تواصل</button>
    </article>`).join("");

  /* ---------- Hotels & restaurants ---------- */
  const fBudget = $("#fBudget");
  let hospTab = "hotels";
  const dollars = (lvl) =>
    `<span class="level" title="${LEVELS[lvl]}" aria-label="مستوى السعر: ${LEVELS[lvl]}">${"<b></b>".repeat(lvl)}${"<i></i>".repeat(3 - lvl)}</span>`;

  function hospCard(h, kind) {
    return `
      <article class="card item-card reveal">
        ${media(h.img, h.name, kind === "hotels" ? "hotel" : "star")}
        <span class="tag">${LEVELS[h.level]}</span>
        <div class="card-body">
          <h3>${h.name}</h3>
          <p class="meta">${icon("pin")} ${h.city}${h.cuisine ? ` · ${h.cuisine}` : ""}</p>
          <div class="card-foot">
            <div>
              ${dollars(h.level)}
              <p class="price">${sar(h.price)} <small>/ ${h.unit}</small></p>
            </div>
            <button class="btn btn-gold btn-sm" data-book="${kind}" data-name="${h.name}" data-extra="${h.city} · ${sar(h.price)} / ${h.unit}">احجز</button>
          </div>
        </div>
      </article>`;
  }
  function renderHosp() {
    const match = (h) => fBudget.value === "all" || h.level === +fBudget.value;
    const hotels = HOTELS.filter(match), rest = RESTAURANTS.filter(match);
    $("#hotelsGrid").innerHTML = hotels.map((h) => hospCard(h, "hotels")).join("");
    $("#restaurantsGrid").innerHTML = rest.map((h) => hospCard(h, "restaurants")).join("");
    $("#hospEmpty").hidden = (hospTab === "hotels" ? hotels : rest).length > 0;
    observeReveals($("#hospitality"));
  }
  fBudget.addEventListener("change", renderHosp);
  renderHosp();

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
  $("#postServices").innerHTML = POST_SERVICES.map((s, i) => `
    <div class="post-card reveal" style="--d:${i * 80}ms">
      <span class="service-icon">${icon(s.icon)}</span>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </div>`).join("");

  $("#pricing").innerHTML = PACKAGES.map((p) => `
    <div class="price-card reveal ${p.featured ? "featured" : ""}">
      ${p.featured ? '<span class="badge">الأكثر طلبًا</span>' : ""}
      <h3>${p.name}</h3>
      <p class="muted small">${p.note}</p>
      <p class="price-big"><small>${p.unit}</small> ${fmt(p.price)} <span>ر.س</span></p>
      <ul>${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
      <button class="btn ${p.featured ? "btn-gold" : "btn-ghost"} btn-block" data-book="package" data-name="باقة ${p.name}" data-extra="${sar(p.price)}">اختر الباقة</button>
    </div>`).join("");

  /* ---------- Booking buttons (delegated) ---------- */
  const BOOK_COPY = {
    location: ["تم استلام طلب الحجز", "سيتواصل معك فريقنا لتأكيد التوفر والتصاريح خلال 24 ساعة."],
    gear: ["تمت إضافة طلب الاستئجار", "سنؤكد توفر المعدة ونرسل لك تفاصيل الاستلام والتأمين."],
    crew: ["تم إرسال طلب التواصل", "سنشارك تفاصيل مشروعك مع المحترف ونرتّب لكما موعدًا."],
    hotels: ["تم استلام طلب الحجز", "سنؤكد الغرف المتاحة وأسعار المجموعات لفريقك."],
    restaurants: ["تم استلام طلب الحجز", "سنرسل لك قائمة الطعام وخيارات التموين المناسبة لعدد فريقك."],
    package: ["تم استلام طلب الخدمة", "سيتواصل معك مشرف ما بعد الإنتاج لمناقشة تفاصيل مشروعك."],
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-book]");
    if (b) {
      const [title, text] = BOOK_COPY[b.dataset.book];
      showModal(title, text, [["الطلب", b.dataset.name], ["التفاصيل", b.dataset.extra], ["رقم المرجع", ref()]]);
      return;
    }
    if (e.target.closest('[data-action="request-post"]')) {
      showModal("تم استلام طلب الخدمة", "سيتواصل معك مشرف ما بعد الإنتاج لتحديد الباقة الأنسب لمشروعك.", [["رقم المرجع", ref()]]);
    }
  });

  /* ---------- Planner form ---------- */
  const planner = $("#plannerForm");
  const budget = $("#budget"), budgetOut = $("#budgetOut");
  const updateBudget = () => {
    const v = +budget.value;
    budgetOut.textContent = v >= +budget.max ? "أكثر من مليون ر.س" : sar(v);
    budget.style.setProperty("--p", ((v - budget.min) / (budget.max - budget.min)) * 100 + "%");
  };
  budget.addEventListener("input", updateBudget);
  updateBudget();

  const pDate = $("#pDate");
  pDate.min = new Date().toISOString().slice(0, 10);

  planner.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#plannerError");
    const data = new FormData(planner);
    const services = data.getAll("services");
    const missing = [];
    if (!data.get("type")) missing.push("نوع المشروع");
    if (!services.length) missing.push("خدمة واحدة على الأقل");
    if (!data.get("date")) missing.push("التاريخ");
    if (!data.get("city")) missing.push("المدينة");
    if (!(+data.get("crew") > 0)) missing.push("حجم الطاقم");
    if (missing.length) {
      err.textContent = "يرجى تحديد: " + missing.join("، ");
      err.hidden = false;
      return;
    }
    err.hidden = true;
    showModal("تم استلام طلب عرض السعر", "سيتواصل معك منسّق الإنتاج خلال 24 ساعة بعرض سعر مفصّل.", [
      ["نوع المشروع", data.get("type")],
      ["الميزانية", budgetOut.textContent],
      ["الخدمات", services.join("، ")],
      ["التاريخ والمدينة", `${data.get("date")} · ${data.get("city")}`],
      ["حجم الطاقم", `${data.get("crew")} فرد`],
      ["رقم المرجع", ref()],
    ]);
    planner.reset();
    updateBudget();
  });

  /* ---------- Contact form ---------- */
  const contact = $("#contactForm");
  contact.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#contactError");
    if (!contact.checkValidity()) {
      const bad = $$(":invalid", contact).map((el) => $(`label[for="${el.id}"]`).textContent);
      err.textContent = "يرجى تعبئة الحقول التالية بشكل صحيح: " + bad.join("، ");
      err.hidden = false;
      return;
    }
    err.hidden = true;
    const name = $("#cName").value.trim();
    showModal(`شكرًا لك، ${name}`, "وصلتنا رسالتك وسنرد عليك عبر البريد الإلكتروني خلال يوم عمل واحد.", [["رقم المرجع", ref()]]);
    contact.reset();
  });

  /* ---------- Misc ---------- */
  $("#year").textContent = new Date().getFullYear();
  observeReveals();
})();
