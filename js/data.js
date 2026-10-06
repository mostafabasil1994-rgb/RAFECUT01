/* RAFECUT — site data (Mosul).
   Each item has Arabic fields plus an `en` object for English.
   Images: put your photos in the paths below (see images/README.md).
   Until a photo exists, the card shows a styled placeholder. */

const photo = (path) => `images/${path}`;

/* Area keys are used for filtering; labels come from i18n.js */
const AREAS = ["oldcity", "tayaran", "bartella", "hamdaniya"];

const SERVICES = [
  { icon: "location", href: "#locations",
    title: "مواقع التصوير", text: "بيوت تراثية في الموصل القديمة، وبيوت سكنية في حي الطيران، وأزقة برطلة والحمدانية.",
    en: { title: "Filming Locations", text: "Heritage houses in Old Mosul, family homes in Al-Tayaran, and the old lanes of Bartella and Hamdaniya." } },
  { icon: "camera", href: "#equipment",
    title: "المعدات والفنيون", text: "كاميرات Sony وعدسات G Master وكاميرات وعدسات سينما، مع فنيين محترفين.",
    en: { title: "Equipment & Crew", text: "Sony cameras, G Master lenses, cinema cameras and cine lenses, with skilled technicians." } },
  { icon: "hotel", href: "#hospitality",
    title: "الفنادق والمطاعم", text: "إقامة وإعاشة لفريقك في الموصل بالقرب من موقع التصوير وبحسب ميزانيتك.",
    en: { title: "Hotels & Dining", text: "Accommodation and catering for your team in Mosul, near set and on your budget." } },
  { icon: "film", href: "#post",
    title: "المونتاج والتلوين", text: "مونتاج وتصحيح ألوان ومؤثرات بصرية وتصميم صوتي باحترافية.",
    en: { title: "Editing & Color", text: "Professional editing, color grading, visual effects and sound design." } },
];

/* Every location rents for $100 per day */
const LOCATION_RATE = 100;

const LOCATIONS = [
  { area: "oldcity", type: "heritage", img: photo("locations/oldcity-courtyard-house.jpg"),
    name: "بيت موصلي بفناء داخلي — محلة جامع النوري",
    desc: "حوش مفتوح وأقواس وأعمدة من المرمر الموصلي (الحلان) على بُعد خطوات من جامع النوري الكبير.",
    en: { name: "Courtyard House — Al-Nuri Mosque Quarter",
      desc: "Open courtyard, arches and Mosul-marble columns, steps from the Great al-Nuri Mosque." } },
  { area: "oldcity", type: "heritage", img: photo("locations/oldcity-shanasheel-house.jpg"),
    name: "بيت الشناشيل والإيوان — قرب منارة الحدباء",
    desc: "واجهة بشناشيل خشبية وإيوان مطل على الفناء، مناسب للمشاهد الدرامية والتاريخية.",
    en: { name: "Shanasheel House with Iwan — near Al-Hadba Minaret",
      desc: "Carved wooden oriel windows and an iwan facing the courtyard, ideal for period drama." } },
  { area: "oldcity", type: "heritage", img: photo("locations/oldcity-sirdab.jpg"),
    name: "سرداب بيت موصلي قديم",
    desc: "قبو حجري بسقف معقود وإضاءة طبيعية خافتة من فتحات علوية.",
    en: { name: "Old Mosul House Cellar (Sirdab)",
      desc: "Vaulted stone cellar with soft natural light falling from high openings." } },
  { area: "oldcity", type: "street", img: photo("locations/oldcity-alley.jpg"),
    name: "أزقة المدينة القديمة — محلة جامع النوري",
    desc: "أزقة ضيقة بأبواب خشبية قديمة وجدران حجرية، للمطاردات واللقطات المتحركة.",
    en: { name: "Old City Lanes — Al-Nuri Quarter",
      desc: "Narrow lanes with old wooden doors and stone walls, for chases and tracking shots." } },
  { area: "tayaran", type: "residential", img: photo("locations/tayaran-garden-house.jpg"),
    name: "بيت عائلي بحديقة — حي الطيران",
    desc: "بيت حديث بحديقة أمامية وصالة واسعة، مناسب للدراما العائلية والإعلانات.",
    en: { name: "Family House with Garden — Al-Tayaran",
      desc: "Modern house with a front garden and a wide living room, suited to family drama and ads." } },
  { area: "tayaran", type: "residential", img: photo("locations/tayaran-two-storey.jpg"),
    name: "بيت سكني بطابقين — حي الطيران",
    desc: "مطبخ وغرف نوم وسطح مكشوف، يتيح تصوير عدة مشاهد في موقع واحد.",
    en: { name: "Two-Storey Home — Al-Tayaran",
      desc: "Kitchen, bedrooms and an open roof, so several scenes can be shot in one place." } },
  { area: "tayaran", type: "street", img: photo("locations/tayaran-street.jpg"),
    name: "شارع سكني هادئ — حي الطيران",
    desc: "شارع واسع تصطف عليه البيوت والأشجار، للقطات السيارات والمشي والحياة اليومية.",
    en: { name: "Quiet Residential Street — Al-Tayaran",
      desc: "A wide, tree-lined street of family homes, for driving, walking and everyday-life shots." } },
  { area: "bartella", type: "heritage", img: photo("locations/bartella-old-house.jpg"),
    name: "بيت برطلّي قديم من الجص والحجر",
    desc: "جدران من الحجر والجص وأبواب منقوشة وفناء صغير، بطابع سهل نينوى.",
    en: { name: "Old Stone & Gypsum House — Bartella",
      desc: "Stone and gypsum walls, carved doors and a small courtyard in the Nineveh Plains style." } },
  { area: "bartella", type: "street", img: photo("locations/bartella-lanes.jpg"),
    name: "أزقة برطلة القديمة",
    desc: "حارات ضيقة وبيوت متلاصقة وأبواب قديمة في قلب البلدة.",
    en: { name: "Bartella Old Lanes",
      desc: "Tight alleys, close-set houses and old doorways in the heart of town." } },
  { area: "hamdaniya", type: "heritage", img: photo("locations/hamdaniya-heritage-house.jpg"),
    name: "بيت تراثي في قره قوش (بغديدا)",
    desc: "بيت قديم بأقواس حجرية وفناء داخلي في مركز قضاء الحمدانية.",
    en: { name: "Heritage House — Qaraqosh (Bakhdida)",
      desc: "Old house with stone arches and an inner courtyard in the centre of Hamdaniya." } },
  { area: "hamdaniya", type: "residential", img: photo("locations/hamdaniya-family-house.jpg"),
    name: "بيت عائلي بحديقة — قره قوش",
    desc: "بيت سكني بحديقة وسطح، مناسب للمشاهد العائلية والإعلانات.",
    en: { name: "Family House with Garden — Qaraqosh",
      desc: "A family home with a garden and roof terrace, suited to domestic scenes and ads." } },
  { area: "hamdaniya", type: "street", img: photo("locations/hamdaniya-old-street.jpg"),
    name: "شارع قديم قرب كنيسة الطاهرة الكبرى",
    desc: "شارع تراثي بواجهات حجرية في محيط الكنيسة، للقطات الخارجية النهارية.",
    en: { name: "Old Street near the Grand Immaculate Church",
      desc: "A heritage street of stone façades around the church, for daytime exteriors." } },
];

/* qty = units available. Items without qty are suggestions; set their count when known. */
const GEAR = [
  { name: "Sony FX3", cat: "camera", qty: 3, price: 75, img: photo("gear/sony-fx3.jpg"),
    desc: "كاميرا سينمائية مدمجة فل فريم بتصوير 4K حتى 120 إطارًا", en: { desc: "Compact full-frame cinema camera, 4K up to 120 fps" } },
  { name: "Sony A7 IV", cat: "camera", qty: 4, price: 50, img: photo("gear/sony-a7iv.jpg"),
    desc: "كاميرا فل فريم 33 ميغابكسل بتصوير 4K 60p", en: { desc: "33 MP full-frame camera with 4K 60p video" } },
  { name: "Sony FE 24‑70mm f/2.8 GM II", cat: "lens", qty: 3, price: 25, img: photo("gear/sony-24-70-gm2.jpg"),
    desc: "عدسة زوم G Master متعددة الاستخدامات بفتحة f/2.8", en: { desc: "Versatile G Master f/2.8 standard zoom" } },
  { name: "Sigma 14‑24mm f/2.8 DG DN Art", cat: "lens", qty: 2, price: 25, img: photo("gear/sigma-14-24.jpg"),
    desc: "عدسة واسعة جدًا بتركيبة Sony E للمساحات الضيقة والمعمار", en: { desc: "Ultra-wide zoom for Sony E, for tight rooms and architecture" } },
  { name: "Sony FX6", cat: "cine", price: 100, img: photo("gear/sony-fx6.jpg"),
    desc: "كاميرا سينمائية فل فريم بفلتر ND إلكتروني مدمج", en: { desc: "Full-frame cinema camera with built-in electronic ND" } },
  { name: "Canon EOS C70", cat: "cine", price: 100, img: photo("gear/canon-c70.jpg"),
    desc: "حساس Super 35 بمدى ديناميكي عالٍ وتسجيل Cinema RAW Light", en: { desc: "Super 35 sensor, high dynamic range, Cinema RAW Light" } },
  { name: "Blackmagic URSA Mini Pro 12K", cat: "cine", price: 100, img: photo("gear/bmd-ursa-12k.jpg"),
    desc: "تسجيل Blackmagic RAW بدقة تصل إلى 12K", en: { desc: "Blackmagic RAW recording up to 12K" } },
  { name: "DZOFilm Vespid 25mm T2.1", cat: "cinelens", price: 50, img: photo("gear/vespid-25.jpg"),
    desc: "عدسة سينما ثابتة فل فريم بحلقات فوكس مسننة", en: { desc: "Full-frame cine prime with geared focus rings" } },
  { name: "DZOFilm Vespid 35mm T2.1", cat: "cinelens", price: 50, img: photo("gear/vespid-35.jpg"),
    desc: "البعد البؤري الأكثر استخدامًا في الدراما", en: { desc: "The go-to focal length for drama" } },
  { name: "DZOFilm Vespid 50mm T2.1", cat: "cinelens", price: 50, img: photo("gear/vespid-50.jpg"),
    desc: "عدسة طبيعية للحوارات واللقطات المتوسطة", en: { desc: "Natural perspective for dialogue and mid shots" } },
  { name: "DZOFilm Vespid 85mm T2.1", cat: "cinelens", price: 50, img: photo("gear/vespid-85.jpg"),
    desc: "عدسة بورتريه للقطات القريبة بخلفية ناعمة", en: { desc: "Portrait lens for close-ups with soft backgrounds" } },
  { name: "Sigma 18‑35mm T2 Cine", cat: "cinelens", price: 50, img: photo("gear/sigma-18-35-cine.jpg"),
    desc: "عدسة زوم سينمائية لحساسات Super 35", en: { desc: "Cine zoom for Super 35 sensors" } },
];

const CREW = [
  { icon: "camera", role: "مساعد كاميرا", desc: "تجهيز الكاميرا والعدسات، سحب الفوكس، وإدارة البطاقات والبطاريات.",
    en: { role: "Camera Assistant", desc: "Camera and lens prep, focus pulling, cards and batteries." } },
  { icon: "sound", role: "مهندس صوت", desc: "تسجيل الصوت في الموقع بمايك بوم ومايكات لاسلكية ومراقبة المستويات.",
    en: { role: "Sound Engineer", desc: "On-set recording with boom and wireless mics, monitoring levels." } },
  { icon: "lighting", role: "كفر لايت (Gaffer)", desc: "تصميم الإضاءة وتنفيذها مع مدير التصوير وإدارة الكهرباء في الموقع.",
    en: { role: "Gaffer", desc: "Designs and runs the lighting with the DP and manages power on set." } },
];

const HOTELS = [
  { name: "فندق ضفاف دجلة", en: { name: "Tigris Banks Hotel" }, area: "mosul", level: 3, price: 90, unit: "night", img: photo("hotels/hotel-1.jpg") },
  { name: "منتجع غابات الموصل", en: { name: "Mosul Forests Resort" }, area: "mosul", level: 3, price: 120, unit: "night", img: photo("hotels/hotel-2.jpg") },
  { name: "فندق بوابة نركال", en: { name: "Nergal Gate Hotel" }, area: "mosul", level: 2, price: 60, unit: "night", img: photo("hotels/hotel-3.jpg") },
  { name: "فندق الغابات", en: { name: "Al-Ghabat Hotel" }, area: "mosul", level: 2, price: 55, unit: "night", img: photo("hotels/hotel-4.jpg") },
  { name: "نزل المدينة القديمة", en: { name: "Old City Guesthouse" }, area: "oldcity", level: 1, price: 30, unit: "night", img: photo("hotels/hotel-5.jpg") },
  { name: "شقق الجامعة الفندقية", en: { name: "University Serviced Apartments" }, area: "mosul", level: 1, price: 35, unit: "night", img: photo("hotels/hotel-6.jpg") },
];

const RESTAURANTS = [
  { name: "مطبخ الموقع — تموين متنقل", cuisine: "تموين مواقع التصوير", en: { name: "Set Kitchen — Mobile Catering", cuisine: "On-set catering" },
    area: "mosul", level: 1, price: 6, unit: "person", img: photo("restaurants/food-1.jpg") },
  { name: "مطعم كبة الموصل", cuisine: "أكلات موصلية تقليدية", en: { name: "Mosul Kubba House", cuisine: "Traditional Mosul dishes" },
    area: "oldcity", level: 2, price: 10, unit: "person", img: photo("restaurants/food-2.jpg") },
  { name: "مشويات ضفاف دجلة", cuisine: "مشويات عراقية", en: { name: "Tigris Grill", cuisine: "Iraqi grill" },
    area: "mosul", level: 2, price: 15, unit: "person", img: photo("restaurants/food-3.jpg") },
  { name: "وجبات الطاقم السريعة", cuisine: "وجبات سريعة", en: { name: "Crew Quick Meals", cuisine: "Fast food" },
    area: "mosul", level: 1, price: 5, unit: "person", img: photo("restaurants/food-4.jpg") },
  { name: "كافيه الكادر", cuisine: "قهوة ومعجنات للطاقم", en: { name: "The Frame Café", cuisine: "Coffee & pastries for crew" },
    area: "mosul", level: 1, price: 4, unit: "person", img: photo("restaurants/food-5.jpg") },
  { name: "مطعم الحوش الموصلي", cuisine: "عشاء في بيت تراثي", en: { name: "Al-Hosh Mosul Restaurant", cuisine: "Dinner in a heritage house" },
    area: "oldcity", level: 3, price: 25, unit: "person", img: photo("restaurants/food-6.jpg") },
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
  { name: "الأساسية", price: 300, unit: "project", note: "للمحتوى القصير والسوشال ميديا",
    features: ["مونتاج حتى 3 دقائق", "تصحيح ألوان أساسي", "موسيقى مرخّصة", "جولتا تعديل", "تسليم خلال 5 أيام"],
    en: { name: "Basic", note: "For short-form and social content",
      features: ["Edit up to 3 minutes", "Basic color correction", "Licensed music", "2 revision rounds", "Delivery in 5 days"] } },
  { name: "الاحترافية", price: 800, unit: "project", note: "للإعلانات التجارية والكليبات", featured: true,
    features: ["مونتاج حتى 10 دقائق", "تلوين سينمائي كامل", "مكساج وتصميم صوتي", "مؤثرات بصرية بسيطة", "4 جولات تعديل", "نسخ لجميع المنصات"],
    en: { name: "Professional", note: "For commercials and music videos",
      features: ["Edit up to 10 minutes", "Full cinematic grade", "Mixing & sound design", "Light visual effects", "4 revision rounds", "Cuts for every platform"] } },
  { name: "المتكاملة", price: 1500, unit: "from", note: "للأفلام والوثائقيات الطويلة",
    features: ["مونتاج غير محدود المدة", "تلوين بإشراف ملوّن رئيسي", "مؤثرات بصرية متقدمة", "مكساج 5.1 للسينما", "ترجمة وتعليق صوتي", "تعديلات غير محدودة", "تسليم DCP للمهرجانات"],
    en: { name: "Complete", note: "For features and long-form documentaries",
      features: ["Unlimited runtime edit", "Grade supervised by a lead colorist", "Advanced visual effects", "5.1 theatrical mix", "Subtitles & voice-over", "Unlimited revisions", "DCP delivery for festivals"] } },
];
