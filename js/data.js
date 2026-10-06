/* RAFECUT — placeholder data.
   Replace image URLs with your own photos (e.g. "images/locations/alula.jpg"). */

const img = (seed, w = 800, h = 560) =>
  `https://picsum.photos/seed/rafecut-${seed}/${w}/${h}?grayscale`;

const SERVICES = [
  { icon: "location", title: "مواقع التصوير", href: "#locations",
    text: "استوديوهات ومواقع خارجية وتراثية وطبيعية جاهزة للحجز بتصاريحها." },
  { icon: "camera", title: "المعدات والطاقم", href: "#equipment",
    text: "كاميرات سينمائية وإضاءة وصوت ودرون، مع محترفين ذوي خبرة." },
  { icon: "hotel", title: "الفنادق والمطاعم", href: "#hospitality",
    text: "إقامة وإعاشة لفريقك بالقرب من موقع التصوير وبحسب ميزانيتك." },
  { icon: "film", title: "المونتاج والتلوين", href: "#post",
    text: "مونتاج وتصحيح ألوان ومؤثرات بصرية وتصميم صوتي باحترافية." },
];

const LOCATION_TYPES = { indoor: "داخلي", outdoor: "خارجي", nature: "طبيعة", heritage: "تراثي" };

const LOCATIONS = [
  { name: "مدائن صالح — الحِجر", city: "العلا", type: "heritage", price: 12000, img: img("hegra") },
  { name: "استوديو النخبة الكبير", city: "الرياض", type: "indoor", price: 4500, img: img("studio1") },
  { name: "كورنيش جدة الشمالي", city: "جدة", type: "outdoor", price: 3000, img: img("corniche") },
  { name: "جبال السودة", city: "أبها", type: "nature", price: 5500, img: img("soudah") },
  { name: "جدة التاريخية — البلد", city: "جدة", type: "heritage", price: 6000, img: img("albalad") },
  { name: "حي الطريف — الدرعية", city: "الرياض", type: "heritage", price: 9000, img: img("turaif") },
  { name: "كثبان الثمامة", city: "الرياض", type: "nature", price: 2500, img: img("dunes") },
  { name: "لوفت صناعي — العليا", city: "الرياض", type: "indoor", price: 3500, img: img("loft") },
  { name: "شاطئ نصف القمر", city: "الدمام", type: "outdoor", price: 2800, img: img("halfmoon") },
  { name: "استوديو الضوء الأبيض", city: "الدمام", type: "indoor", price: 2200, img: img("whitestudio") },
  { name: "وادي الديسة", city: "تبوك", type: "nature", price: 7000, img: img("disah") },
  { name: "سوق الزل القديم", city: "الرياض", type: "heritage", price: 4000, img: img("souq") },
];

const GEAR_CATS = { camera: "كاميرا", lighting: "إضاءة", sound: "صوت", drone: "درون" };

const GEAR = [
  { name: "ARRI Alexa Mini LF", cat: "camera", price: 3500, desc: "كاميرا سينمائية بحساس فل فريم وتسجيل ARRIRAW", img: img("alexa", 600, 450) },
  { name: "RED V-Raptor 8K VV", cat: "camera", price: 3000, desc: "دقة 8K وتصوير حتى 120 إطارًا في الثانية", img: img("redraptor", 600, 450) },
  { name: "Sony FX6", cat: "camera", price: 900, desc: "كاميرا خفيفة مثالية للوثائقي والإعلانات", img: img("fx6", 600, 450) },
  { name: "Blackmagic URSA 12K", cat: "camera", price: 1100, desc: "حساس 12K بتسجيل Blackmagic RAW", img: img("ursa", 600, 450) },
  { name: "ARRI SkyPanel S60-C", cat: "lighting", price: 650, desc: "لوحة LED ملوّنة بتحكم كامل في الحرارة", img: img("skypanel", 600, 450) },
  { name: "Aputure LS 600d Pro", cat: "lighting", price: 300, desc: "إضاءة نهارية قوية بقدرة 600 واط", img: img("aputure", 600, 450) },
  { name: "Kino Flo Celeb 450", cat: "lighting", price: 280, desc: "إضاءة ناعمة للوجوه والمقابلات", img: img("kinoflo", 600, 450) },
  { name: "Sound Devices 833", cat: "sound", price: 450, desc: "مسجّل ميداني بثمانية مسارات", img: img("sd833", 600, 450) },
  { name: "Sennheiser MKH 416", cat: "sound", price: 120, desc: "مايك شوتغن معتمد في المواقع", img: img("mkh416", 600, 450) },
  { name: "طقم مايكات لاسلكية Lectrosonics", cat: "sound", price: 350, desc: "4 مايكات لافاليير لاسلكية", img: img("lectro", 600, 450) },
  { name: "DJI Inspire 3", cat: "drone", price: 2500, desc: "درون سينمائي بدقة 8K مع طيار مرخّص", img: img("inspire", 600, 450) },
  { name: "DJI Mavic 3 Cine", cat: "drone", price: 900, desc: "درون مدمج بتسجيل Apple ProRes", img: img("mavic", 600, 450) },
];

const CREW = [
  { name: "فهد العتيبي", role: "مدير تصوير", years: 12, city: "الرياض" },
  { name: "سارة القحطاني", role: "مهندسة صوت", years: 8, city: "جدة" },
  { name: "خالد الزهراني", role: "فني إضاءة رئيسي (Gaffer)", years: 10, city: "الرياض" },
  { name: "نورة الشهري", role: "مساعدة مخرج أولى", years: 6, city: "الرياض" },
  { name: "عبدالله المالكي", role: "طيار درون مرخّص", years: 5, city: "أبها" },
  { name: "ريم الدوسري", role: "مصممة إنتاج", years: 9, city: "الدمام" },
  { name: "ماجد الحربي", role: "مشغّل كاميرا / فوكس بولر", years: 7, city: "جدة" },
  { name: "لينا الغامدي", role: "ملوّنة (Colorist)", years: 11, city: "الرياض" },
];

const LEVELS = { 1: "اقتصادي", 2: "متوسط", 3: "فاخر" };

const HOTELS = [
  { name: "منتجع واحة الحِجر", city: "العلا", level: 3, price: 2200, unit: "الليلة", img: img("hotel1") },
  { name: "فندق برج النخيل", city: "الرياض", level: 3, price: 1900, unit: "الليلة", img: img("hotel2") },
  { name: "منتجع شاطئ المرجان", city: "جدة", level: 3, price: 1500, unit: "الليلة", img: img("hotel3") },
  { name: "نزل السودة الجبلي", city: "أبها", level: 2, price: 650, unit: "الليلة", img: img("hotel4") },
  { name: "فندق ساحل الخليج", city: "الدمام", level: 2, price: 520, unit: "الليلة", img: img("hotel5") },
  { name: "شقق الضيافة الفندقية", city: "الرياض", level: 1, price: 280, unit: "الليلة", img: img("hotel6") },
];

const RESTAURANTS = [
  { name: "مطبخ الموقع — تموين متنقل", city: "كل المدن", cuisine: "تموين مواقع التصوير", level: 1, price: 65, unit: "للفرد", img: img("food1") },
  { name: "مطعم ديرة نجد", city: "الرياض", cuisine: "سعودي تقليدي", level: 2, price: 120, unit: "للفرد", img: img("food2") },
  { name: "وجبات الطاقم السريعة", city: "جدة", cuisine: "وجبات سريعة", level: 1, price: 35, unit: "للفرد", img: img("food3") },
  { name: "مطعم صخرة العلا", city: "العلا", cuisine: "مطبخ محلي معاصر", level: 3, price: 320, unit: "للفرد", img: img("food4") },
  { name: "كافيه الكادر", city: "الرياض", cuisine: "قهوة ومخبوزات للطاقم", level: 1, price: 40, unit: "للفرد", img: img("food5") },
  { name: "مطعم المرسى", city: "جدة", cuisine: "مأكولات بحرية", level: 3, price: 280, unit: "للفرد", img: img("food6") },
];

const POST_SERVICES = [
  { icon: "scissors", title: "المونتاج", text: "بناء الإيقاع والسرد على Avid و Premiere مع مونتير متخصص في نوع مشروعك." },
  { icon: "palette", title: "تصحيح الألوان", text: "تلوين سينمائي على DaVinci Resolve بشاشات مرجعية معايَرة." },
  { icon: "sparkle", title: "المؤثرات البصرية", text: "تركيب، تتبّع، تنظيف لقطات ورسوميات متحركة." },
  { icon: "wave", title: "التصميم الصوتي", text: "مكساج، مؤثرات صوتية، وتسجيل تعليق صوتي في استوديو معزول." },
];

const PACKAGES = [
  { name: "الأساسية", price: 3500, unit: "للمشروع", note: "للمحتوى القصير والسوشال ميديا",
    features: ["مونتاج حتى 3 دقائق", "تصحيح ألوان أساسي", "موسيقى مرخّصة", "جولتا تعديل", "تسليم خلال 5 أيام"] },
  { name: "الاحترافية", price: 9500, unit: "للمشروع", note: "للإعلانات التجارية والكليبات", featured: true,
    features: ["مونتاج حتى 10 دقائق", "تلوين سينمائي كامل", "مكساج وتصميم صوتي", "مؤثرات بصرية بسيطة", "4 جولات تعديل", "نسخ لجميع المنصات"] },
  { name: "المتكاملة", price: 18000, unit: "تبدأ من", note: "للأفلام والوثائقيات الطويلة",
    features: ["مونتاج غير محدود المدة", "تلوين بإشراف ملوّن رئيسي", "مؤثرات بصرية متقدمة", "مكساج 5.1 للسينما", "ترجمة وتعليق صوتي", "تعديلات غير محدودة", "تسليم DCP للمهرجانات"] },
];
