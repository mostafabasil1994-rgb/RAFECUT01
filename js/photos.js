/* RAFECUT — photo galleries from Wikimedia Commons (freely licensed).
   Keys match each card's image file name (e.g. "oldcity-alley").
   `file` is the exact Commons file name; the site loads it from
   commons.wikimedia.org/wiki/Special:FilePath and links to its page for
   author and licence. `illustrative: true` marks photos of the wider area
   rather than the exact place, and the caption says so.
   Your own photos in images/... always show first. */

const P = (file, ar, en, illustrative = false) => ({ file, ar, en, illustrative });

const PHOTOS = {
  /* ---- Old Mosul (al-Nuri Mosque quarter) ---- */
  "oldcity-courtyard-house": [
    P("Beit al-Tutunji, marble carving, Mosul, Iraq.jpg", "نقوش المرمر الموصلي في بيت التوتونجي بعد ترميمه", "Mosul-marble carving at Beit al-Tutunji, restored"),
    P("Zyada House Mosul.jpg", "بيت زيادة التراثي في محلة باب البيض", "Zyada House, Bab al-Baid quarter"),
    P("Great Mosque of al-Nuri Feb 2025 2.jpg", "جامع النوري الكبير بعد إعادة إعماره، شباط 2025", "Great al-Nuri Mosque after reconstruction, Feb 2025"),
    P("جامع النوري الكبير في الموصل.jpg", "جامع النوري الكبير في الموصل", "The Great al-Nuri Mosque, Mosul"),
  ],
  "oldcity-shanasheel-house": [
    P("Zyada House Mosul.jpg", "واجهة بيت زيادة التراثي", "Façade of Zyada House"),
    P("Hadba Minaret al-Nuri Mosque Mosul.jpg", "منارة الحدباء في جامع النوري", "Al-Hadba minaret, al-Nuri Mosque"),
    P("كنيسة الطاهرة في الموصل 4.jpg", "كنيسة الطاهرة في الموصل القديمة", "Al-Tahera Church in Old Mosul"),
    P("متحف حمام المنقوشة الموصل.jpg", "متحف حمام المنقوشة في الموصل القديمة", "Hammam al-Manqusha museum, Old Mosul"),
  ],
  "oldcity-sirdab": [
    P("متحف حمام المنقوشة الموصل.jpg", "حمام المنقوشة: عمارة حجرية قديمة في الموصل", "Hammam al-Manqusha: old stone architecture in Mosul", true),
    P("Beit al-Tutunji, marble carving, Mosul, Iraq.jpg", "تفاصيل المرمر الموصلي في بيت التوتونجي", "Mosul-marble detail at Beit al-Tutunji", true),
    P("جامع النبي جرجيس (باحة الجامع).jpg", "باحة جامع النبي جرجيس في الموصل القديمة", "Courtyard of the Prophet Jirjis Mosque, Old Mosul", true),
  ],
  "oldcity-alley": [
    P("Bab al-Shatt Mosul (64264).jpg", "باب الشط في الموصل القديمة", "Bab al-Shatt, Old Mosul"),
    P("Bab al-Shatt Mosul (37743).jpg", "محلة باب الشط على ضفة دجلة", "Bab al-Shatt quarter on the Tigris"),
    P("Hadba Minaret al-Nuri Mosque Mosul.jpg", "منارة الحدباء تطل على الأزقة", "Al-Hadba minaret above the lanes"),
    P("Views of the old city of Mosul along the river Tiger, in summer of 2019 after war with the Islamic State 10.jpg", "المدينة القديمة على ضفاف دجلة، صيف 2019", "The Old City along the Tigris, summer 2019"),
    P("Street scene in Mosul, 1915.jpg", "مشهد من شوارع الموصل عام 1915", "Street scene in Mosul, 1915"),
  ],

  /* ---- Al-Tayaran and residential Mosul (no exact photos yet) ---- */
  "tayaran-garden-house": [
    P("شارع غابات الموصل.jpg", "شارع الغابات في الموصل", "Al-Ghabat street, Mosul", true),
    P("شارع علي ابن ابي طالب الموصل (26220).jpg", "شارع علي بن أبي طالب في الموصل", "Ali ibn Abi Talib street, Mosul", true),
    P("مدينة الموصل.jpg", "منظر عام لمدينة الموصل", "View over Mosul", true),
  ],
  "tayaran-two-storey": [
    P("مدينة الموصل.jpg", "منظر عام لمدينة الموصل", "View over Mosul", true),
    P("Mosul - Iraq.jpg", "مدينة الموصل", "Mosul city", true),
    P("شارع علي ابن ابي طالب الموصل (26220).jpg", "شارع سكني في الموصل", "A Mosul street", true),
  ],
  "tayaran-street": [
    P("شارع علي ابن ابي طالب الموصل (26220).jpg", "شارع علي بن أبي طالب في الموصل", "Ali ibn Abi Talib street, Mosul", true),
    P("شارع غابات الموصل.jpg", "شارع الغابات في الموصل", "Al-Ghabat street, Mosul", true),
    P("The Old Bridge and The Tigris River-Mosul 01.jpg", "الجسر العتيق ونهر دجلة", "The Old Bridge and the Tigris", true),
  ],

  /* ---- Bartella (views over the Nineveh Plains; town photos still needed) ---- */
  "bartella-old-house": [
    P("Saint Matthew Monastery (Der Mar Matti), overlooking Bashiqa and Bartella, in between the Kurdistan Region and Iraq 04.jpg", "سهل نينوى من دير مار متى، وتبدو بعشيقة وبرطلة", "The Nineveh Plains from Mar Matti, with Bashiqa and Bartella", true),
    P("Saint Matthew Monastery (Der Mar Matti), overlooking Bashiqa and Bartella, in between the Kurdistan Region and Iraq 06.jpg", "إطلالة على برطلة وسهل نينوى", "Looking over Bartella and the plains", true),
  ],
  "bartella-lanes": [
    P("Saint Matthew Monastery (Der Mar Matti), overlooking Bashiqa and Bartella, between the Kurdistan Region and Iraq 14.jpg", "بلدات سهل نينوى من دير مار متى", "Nineveh Plains towns from Mar Matti", true),
    P("Saint Matthew Monastery (Der Mar Matti), overlooking Bashiqa and Bartella, in between the Kurdistan Region and Iraq 06.jpg", "إطلالة على برطلة وسهل نينوى", "Looking over Bartella and the plains", true),
  ],

  /* ---- Qaraqosh / Bakhdida (Hamdaniya) ---- */
  "hamdaniya-heritage-house": [
    P("Iraqvillagebaghdeda.JPG", "بلدة بغديدا (قره قوش)", "Bakhdida (Qaraqosh)"),
    P("Churches in Bakhdida.JPG", "كنائس بغديدا", "Churches of Bakhdida"),
  ],
  "hamdaniya-family-house": [
    P("Iraqvillagebaghdeda.JPG", "بيوت بغديدا (قره قوش)", "Homes in Bakhdida (Qaraqosh)", true),
    P("Churches in Bakhdida.JPG", "كنائس بغديدا", "Churches of Bakhdida", true),
  ],
  "hamdaniya-old-street": [
    P("Churches in Bakhdida.JPG", "كنائس بغديدا", "Churches of Bakhdida"),
    P("Picture inside the Immaculate Church in Bakhdida.jpg", "داخل كنيسة الطاهرة الكبرى في بغديدا", "Inside the Grand Immaculate Church, Bakhdida"),
    P("Iraqvillagebaghdeda.JPG", "بلدة بغديدا (قره قوش)", "Bakhdida (Qaraqosh)"),
  ],

  /* ---- Equipment ---- */
  "sony-fx3": [
    P("Sony FX3 with Sony FE 24mm F1.4 GM - by Henry Söderlund (51061907312, cropped).jpg", "Sony FX3 مع عدسة FE 24mm GM", "Sony FX3 with FE 24mm GM"),
    P("Tilta-hermit-helmet-sony-fx3.jpg", "Sony FX3 على حامل Tilta", "Sony FX3 on a Tilta rig"),
  ],
  "sony-a7iv": [
    P("Sony A7 IV (ILCE-7M4) - by Henry Söderlund (51739988735).jpg", "Sony A7 IV", "Sony A7 IV"),
  ],
  "sony-24-70-gm2": [
    P("Sony G Master Logo - Sony FE 24-70mm f 2.8 GM Camera Lens (31151934237).jpg", "عدسة Sony FE 24-70mm GM (الجيل الأول)", "Sony FE 24-70mm GM (first generation)", true),
  ],
  "sony-fx6": [
    P("Sony Cinema line FX6.jpg", "Sony FX6 مجهزة للتصوير", "Sony FX6, rigged"),
  ],
  "canon-c70": [
    P("Canon CINEMA EOS C70.jpg", "Canon EOS C70", "Canon EOS C70"),
  ],
  "bmd-ursa-12k": [
    P("Blackmagic-URSA-mini-on-a-tripod.jpg", "كاميرا من عائلة Blackmagic URSA Mini", "A Blackmagic URSA Mini family camera", true),
  ],
  "sigma-18-35-cine": [
    P("Nikon D7200 and Sigma 18-35mm f1.8 DC HSM Art.jpg", "عدسة Sigma 18-35mm (نسخة التصوير الفوتوغرافي)", "Sigma 18-35mm (photo version)", true),
  ],
};

/* Fallback photos for hotels and restaurants without their own photo */
const PHOTOS_GENERIC = {
  traditional: [P("Iraqi Masgouf Restaurant-Mosul 01.jpg", "مطعم مسكوف في الموصل", "A masgouf restaurant in Mosul", true)],
  grill: [P("Iraqi kebab كباب عراقي Baghdad.jpg", "كباب عراقي", "Iraqi kebab", true)],
  cafe: [P("Kleicha (كليجة).jpg", "كليجة عراقية", "Iraqi kleicha", true)],
};
