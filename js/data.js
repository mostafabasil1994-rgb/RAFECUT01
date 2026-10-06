/* RAFECUT — placeholder data.
   Each item has Arabic fields plus an `en` object for English.
   Replace image URLs with your own photos (e.g. "images/locations/alula.jpg"). */

const img = (seed, w = 800, h = 560) =>
  `https://picsum.photos/seed/rafecut-${seed}/${w}/${h}?grayscale`;

/* City keys are used for filtering; labels come from i18n.js */
const CITIES = ["riyadh", "jeddah", "alula", "abha", "dammam", "tabuk"];

const SERVICES = [
  { icon: "location", href: "#locations",
    title: "مواقع التصوير", text: "استوديوهات ومواقع خارجية وتراثية وطبيعية جاهزة للحجز بتصاريحها.",
    en: { title: "Filming Locations", text: "Studios, outdoor, heritage and nature sites, ready to book with permits." } },
  { icon: "camera", href: "#equipment",
    title: "المعدات والطاقم", text: "كاميرات سينمائية وإضاءة وصوت ودرون، مع محترفين ذوي خبرة.",
    en: { title: "Equipment & Crew", text: "Cinema cameras, lighting, sound and drones, with experienced professionals." } },
  { icon: "hotel", href: "#hospitality",
    title: "الفنادق والمطاعم", text: "إقامة وإعاشة لفريقك بالقرب من موقع التصوير وبحسب ميزانيتك.",
    en: { title: "Hotels & Dining", text: "Accommodation and catering for your team near set, on your budget." } },
  { icon: "film", href: "#post",
    title: "المونتاج والتلوين", text: "مونتاج وتصحيح ألوان ومؤثرات بصرية وتصميم صوتي باحترافية.",
    en: { title: "Editing & Color", text: "Professional editing, color grading, visual effects and sound design." } },
];

const LOCATIONS = [
  { name: "مدائن صالح — الحِجر", en: { name: "Hegra — Mada'in Salih" }, city: "alula", type: "heritage", price: 12000, img: img("hegra") },
  { name: "استوديو النخبة الكبير", en: { name: "Al Nokhba Grand Studio" }, city: "riyadh", type: "indoor", price: 4500, img: img("studio1") },
  { name: "كورنيش جدة الشمالي", en: { name: "North Jeddah Corniche" }, city: "jeddah", type: "outdoor", price: 3000, img: img("corniche") },
  { name: "جبال السودة", en: { name: "Al Soudah Mountains" }, city: "abha", type: "nature", price: 5500, img: img("soudah") },
  { name: "جدة التاريخية — البلد", en: { name: "Historic Jeddah — Al Balad" }, city: "jeddah", type: "heritage", price: 6000, img: img("albalad") },
  { name: "حي الطريف — الدرعية", en: { name: "At-Turaif — Diriyah" }, city: "riyadh", type: "heritage", price: 9000, img: img("turaif") },
  { name: "كثبان الثمامة", en: { name: "Thumamah Dunes" }, city: "riyadh", type: "nature", price: 2500, img: img("dunes") },
  { name: "لوفت صناعي — العليا", en: { name: "Industrial Loft — Olaya" }, city: "riyadh", type: "indoor", price: 3500, img: img("loft") },
  { name: "شاطئ نصف القمر", en: { name: "Half Moon Beach" }, city: "dammam", type: "outdoor", price: 2800, img: img("halfmoon") },
  { name: "استوديو الضوء الأبيض", en: { name: "White Light Studio" }, city: "dammam", type: "indoor", price: 2200, img: img("whitestudio") },
  { name: "وادي الديسة", en: { name: "Wadi Disah" }, city: "tabuk", type: "nature", price: 7000, img: img("disah") },
  { name: "سوق الزل القديم", en: { name: "Old Souq Al Zal" }, city: "riyadh", type: "heritage", price: 4000, img: img("souq") },
];

const GEAR = [
  { name: "ARRI Alexa Mini LF", cat: "camera", price: 3500, img: img("alexa", 600, 450),
    desc: "كاميرا سينمائية بحساس فل فريم وتسجيل ARRIRAW", en: { desc: "Large-format cinema camera with ARRIRAW recording" } },
  { name: "RED V-Raptor 8K VV", cat: "camera", price: 3000, img: img("redraptor", 600, 450),
    desc: "دقة 8K وتصوير حتى 120 إطارًا في الثانية", en: { desc: "8K resolution, up to 120 fps" } },
  { name: "Sony FX6", cat: "camera", price: 900, img: img("fx6", 600, 450),
    desc: "كاميرا خفيفة مثالية للوثائقي والإعلانات", en: { desc: "Lightweight body, ideal for documentary and commercials" } },
  { name: "Blackmagic URSA 12K", cat: "camera", price: 1100, img: img("ursa", 600, 450),
    desc: "حساس 12K بتسجيل Blackmagic RAW", en: { desc: "12K sensor with Blackmagic RAW recording" } },
  { name: "ARRI SkyPanel S60-C", cat: "lighting", price: 650, img: img("skypanel", 600, 450),
    desc: "لوحة LED ملوّنة بتحكم كامل في الحرارة", en: { desc: "Full-color LED panel with tunable temperature" } },
  { name: "Aputure LS 600d Pro", cat: "lighting", price: 300, img: img("aputure", 600, 450),
    desc: "إضاءة نهارية قوية بقدرة 600 واط", en: { desc: "Powerful 600W daylight fixture" } },
  { name: "Kino Flo Celeb 450", cat: "lighting", price: 280, img: img("kinoflo", 600, 450),
    desc: "إضاءة ناعمة للوجوه والمقابلات", en: { desc: "Soft light for faces and interviews" } },
  { name: "Sound Devices 833", cat: "sound", price: 450, img: img("sd833", 600, 450),
    desc: "مسجّل ميداني بثمانية مسارات", en: { desc: "Eight-track field recorder" } },
  { name: "Sennheiser MKH 416", cat: "sound", price: 120, img: img("mkh416", 600, 450),
    desc: "مايك شوتغن معتمد في المواقع", en: { desc: "Industry-standard on-set shotgun mic" } },
  { name: "طقم مايكات لاسلكية Lectrosonics", cat: "sound", price: 350, img: img("lectro", 600, 450),
    desc: "4 مايكات لافاليير لاسلكية", en: { name: "Lectrosonics Wireless Kit", desc: "4 wireless lavalier mics" } },
  { name: "DJI Inspire 3", cat: "drone", price: 2500, img: img("inspire", 600, 450),
    desc: "درون سينمائي بدقة 8K مع طيار مرخّص", en: { desc: "8K cinema drone with licensed pilot" } },
  { name: "DJI Mavic 3 Cine", cat: "drone", price: 900, img: img("mavic", 600, 450),
    desc: "درون مدمج بتسجيل Apple ProRes", en: { desc: "Compact drone with Apple ProRes recording" } },
];

const CREW = [
  { name: "فهد العتيبي", role: "مدير تصوير", years: 12, city: "riyadh", en: { name: "Fahad Al-Otaibi", role: "Director of Photography" } },
  { name: "سارة القحطاني", role: "مهندسة صوت", years: 8, city: "jeddah", en: { name: "Sara Al-Qahtani", role: "Sound Engineer" } },
  { name: "خالد الزهراني", role: "فني إضاءة رئيسي (Gaffer)", years: 10, city: "riyadh", en: { name: "Khaled Al-Zahrani", role: "Gaffer" } },
  { name: "نورة الشهري", role: "مساعدة مخرج أولى", years: 6, city: "riyadh", en: { name: "Noura Al-Shehri", role: "First Assistant Director" } },
  { name: "عبدالله المالكي", role: "طيار درون مرخّص", years: 5, city: "abha", en: { name: "Abdullah Al-Malki", role: "Licensed Drone Pilot" } },
  { name: "ريم الدوسري", role: "مصممة إنتاج", years: 9, city: "dammam", en: { name: "Reem Al-Dosari", role: "Production Designer" } },
  { name: "ماجد الحربي", role: "مشغّل كاميرا / فوكس بولر", years: 7, city: "jeddah", en: { name: "Majed Al-Harbi", role: "Camera Operator / Focus Puller" } },
  { name: "لينا الغامدي", role: "ملوّنة (Colorist)", years: 11, city: "riyadh", en: { name: "Lina Al-Ghamdi", role: "Colorist" } },
];

const HOTELS = [
  { name: "منتجع واحة الحِجر", en: { name: "Hegra Oasis Resort" }, city: "alula", level: 3, price: 2200, unit: "night", img: img("hotel1") },
  { name: "فندق برج النخيل", en: { name: "Palm Tower Hotel" }, city: "riyadh", level: 3, price: 1900, unit: "night", img: img("hotel2") },
  { name: "منتجع شاطئ المرجان", en: { name: "Coral Beach Resort" }, city: "jeddah", level: 3, price: 1500, unit: "night", img: img("hotel3") },
  { name: "نزل السودة الجبلي", en: { name: "Soudah Mountain Lodge" }, city: "abha", level: 2, price: 650, unit: "night", img: img("hotel4") },
  { name: "فندق ساحل الخليج", en: { name: "Gulf Coast Hotel" }, city: "dammam", level: 2, price: 520, unit: "night", img: img("hotel5") },
  { name: "شقق الضيافة الفندقية", en: { name: "Hospitality Serviced Apartments" }, city: "riyadh", level: 1, price: 280, unit: "night", img: img("hotel6") },
];

const RESTAURANTS = [
  { name: "مطبخ الموقع — تموين متنقل", cuisine: "تموين مواقع التصوير", en: { name: "Set Kitchen — Mobile Catering", cuisine: "On-set catering" },
    city: "all", level: 1, price: 65, unit: "person", img: img("food1") },
  { name: "مطعم ديرة نجد", cuisine: "سعودي تقليدي", en: { name: "Dirat Najd Restaurant", cuisine: "Traditional Saudi" },
    city: "riyadh", level: 2, price: 120, unit: "person", img: img("food2") },
  { name: "وجبات الطاقم السريعة", cuisine: "وجبات سريعة", en: { name: "Crew Quick Meals", cuisine: "Fast food" },
    city: "jeddah", level: 1, price: 35, unit: "person", img: img("food3") },
  { name: "مطعم صخرة العلا", cuisine: "مطبخ محلي معاصر", en: { name: "AlUla Rock Restaurant", cuisine: "Contemporary local" },
    city: "alula", level: 3, price: 320, unit: "person", img: img("food4") },
  { name: "كافيه الكادر", cuisine: "قهوة ومخبوزات للطاقم", en: { name: "The Frame Café", cuisine: "Coffee & pastries for crew" },
    city: "riyadh", level: 1, price: 40, unit: "person", img: img("food5") },
  { name: "مطعم المرسى", cuisine: "مأكولات بحرية", en: { name: "Al Marsa Restaurant", cuisine: "Seafood" },
    city: "jeddah", level: 3, price: 280, unit: "person", img: img("food6") },
];

const POST_SERVICES = [
  { icon: "scissors", title: "المونتاج", text: "بناء الإيقاع والسرد على Avid و Premiere مع مونتير متخصص في نوع مشروعك.",
    en: { title: "Editing", text: "Pacing and story built on Avid and Premiere by an editor who knows your genre." } },
  { icon: "palette", title: "تصحيح الألوان", text: "تلوين سينمائي على DaVinci Resolve بشاشات مرجعية معايَرة.",
    en: { title: "Color Grading", text: "Cinematic grading in DaVinci Resolve on calibrated reference monitors." } },
  { icon: "sparkle", title: "المؤثرات البصرية", text: "تركيب، تتبّع، تنظيف لقطات ورسوميات متحركة.",
    en: { title: "Visual Effects", text: "Compositing, tracking, cleanup and motion graphics." } },
  { icon: "wave", title: "التصميم الصوتي", text: "مكساج، مؤثرات صوتية، وتسجيل تعليق صوتي في استوديو معزول.",
    en: { title: "Sound Design", text: "Mixing, sound effects and voice-over recording in an isolated booth." } },
];

const PACKAGES = [
  { name: "الأساسية", price: 3500, unit: "project", note: "للمحتوى القصير والسوشال ميديا",
    features: ["مونتاج حتى 3 دقائق", "تصحيح ألوان أساسي", "موسيقى مرخّصة", "جولتا تعديل", "تسليم خلال 5 أيام"],
    en: { name: "Basic", note: "For short-form and social content",
      features: ["Edit up to 3 minutes", "Basic color correction", "Licensed music", "2 revision rounds", "Delivery in 5 days"] } },
  { name: "الاحترافية", price: 9500, unit: "project", note: "للإعلانات التجارية والكليبات", featured: true,
    features: ["مونتاج حتى 10 دقائق", "تلوين سينمائي كامل", "مكساج وتصميم صوتي", "مؤثرات بصرية بسيطة", "4 جولات تعديل", "نسخ لجميع المنصات"],
    en: { name: "Professional", note: "For commercials and music videos",
      features: ["Edit up to 10 minutes", "Full cinematic grade", "Mixing & sound design", "Light visual effects", "4 revision rounds", "Cuts for every platform"] } },
  { name: "المتكاملة", price: 18000, unit: "from", note: "للأفلام والوثائقيات الطويلة",
    features: ["مونتاج غير محدود المدة", "تلوين بإشراف ملوّن رئيسي", "مؤثرات بصرية متقدمة", "مكساج 5.1 للسينما", "ترجمة وتعليق صوتي", "تعديلات غير محدودة", "تسليم DCP للمهرجانات"],
    en: { name: "Complete", note: "For features and long-form documentaries",
      features: ["Unlimited runtime edit", "Grade supervised by a lead colorist", "Advanced visual effects", "5.1 theatrical mix", "Subtitles & voice-over", "Unlimited revisions", "DCP delivery for festivals"] } },
];
