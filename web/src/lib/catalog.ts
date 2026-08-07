import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export type ArtKey =
  | "cup"
  | "paperCup"
  | "plate"
  | "bowl"
  | "cutlery"
  | "container"
  | "tray"
  | "lid"
  | "straw"
  | "napkin"
  | "glove"
  | "kraft";

export type CategoryId =
  | "cups"
  | "plates"
  | "cutlery"
  | "containers"
  | "trays"
  | "lids"
  | "hygiene"
  | "eco";

export type Category = {
  id: CategoryId;
  slug: string;
  art: ArtKey;
  /** tailwind-free gradient stops, used inline for the card wash */
  from: string;
  to: string;
  skus: number;
  name: Localized;
  blurb: Localized;
};

export const categories: Category[] = [
  {
    id: "cups",
    slug: "cups-glasses",
    art: "cup",
    from: "#0F3554",
    to: "#17A2BF",
    skus: 46,
    name: {
      en: "Cups & Glasses",
      fa: "لیوان و پیاله",
      ar: "أكواب وكاسات",
    },
    blurb: {
      en: "Paper, PP and PET cups from 90 ml tea glasses to 700 ml cold drink tumblers.",
      fa: "لیوان‌های کاغذی، پلی‌پروپیلن و پت؛ از استکان ۹۰ میلی‌لیتری چای تا لیوان ۷۰۰ میلی‌لیتری نوشیدنی سرد.",
      ar: "أكواب ورقية وبولي بروبيلين و PET من ٩٠ مل للشاي حتى ٧٠٠ مل للمشروبات الباردة.",
    },
  },
  {
    id: "plates",
    slug: "plates-bowls",
    art: "plate",
    from: "#123E60",
    to: "#2FB6C9",
    skus: 38,
    name: {
      en: "Plates & Bowls",
      fa: "بشقاب و کاسه",
      ar: "أطباق وأوعية",
    },
    blurb: {
      en: "Rigid plates, compartment trays and soup bowls in five diameters and three weights.",
      fa: "بشقاب‌های مقاوم، سینی‌های چندخانه و کاسه‌های سوپ در پنج اندازه و سه گراماژ مختلف.",
      ar: "أطباق صلبة وصواني مقسّمة وأوعية شوربة بخمسة أقطار وثلاثة أوزان.",
    },
  },
  {
    id: "cutlery",
    slug: "cutlery",
    art: "cutlery",
    from: "#0C2E4A",
    to: "#1B8FB2",
    skus: 27,
    name: {
      en: "Cutlery",
      fa: "قاشق، چنگال و کارد",
      ar: "أدوات الطعام",
    },
    blurb: {
      en: "Injection-moulded forks, spoons, knives and stirrers — bulk, wrapped or in cutlery kits.",
      fa: "قاشق، چنگال، کارد و همزن‌های تزریقی؛ به‌صورت فله، بسته‌بندی تکی یا پک کامل پذیرایی.",
      ar: "شوك وملاعق وسكاكين ومحرّكات بالحقن — سائبة أو مغلّفة أو ضمن أطقم.",
    },
  },
  {
    id: "containers",
    slug: "food-containers",
    art: "container",
    from: "#0F3554",
    to: "#3FBDD8",
    skus: 52,
    name: {
      en: "Food Containers",
      fa: "ظروف دربدار غذا",
      ar: "علب الطعام",
    },
    blurb: {
      en: "Leak-resistant takeaway boxes, sauce cups and microwave-safe meal containers.",
      fa: "ظروف ضدنشت بیرون‌بر، سس‌خوری و ظروف غذای مناسب استفاده در مایکروویو.",
      ar: "علب طلبات خارجية مقاومة للتسرّب وكؤوس صلصة وعلب آمنة للميكروويف.",
    },
  },
  {
    id: "trays",
    slug: "trays-platters",
    art: "tray",
    from: "#14456A",
    to: "#22A6C0",
    skus: 21,
    name: {
      en: "Trays & Platters",
      fa: "سینی و دیس",
      ar: "صواني وأطباق تقديم",
    },
    blurb: {
      en: "Catering platters, serving trays and cake bases for events and retail counters.",
      fa: "دیس‌های پذیرایی، سینی سرو و زیرکیکی برای مراسم و ویترین فروشگاه‌ها.",
      ar: "أطباق تموين وصواني تقديم وقواعد كيك للمناسبات وواجهات البيع.",
    },
  },
  {
    id: "lids",
    slug: "lids-straws",
    art: "lid",
    from: "#0B2A42",
    to: "#1D93AE",
    skus: 34,
    name: {
      en: "Lids & Straws",
      fa: "درب و نی",
      ar: "أغطية وشفّاطات",
    },
    blurb: {
      en: "Dome, flat and sip lids matched to every cup, plus paper and PP straws.",
      fa: "انواع درِ گنبدی، تخت و نی‌خور، متناسب با هر لیوان؛ به‌همراه نی کاغذی و پلی‌پروپیلن.",
      ar: "أغطية مقبّبة ومسطّحة وبفتحة شرب مطابقة لكل كوب، مع شفّاطات ورقية وبلاستيكية.",
    },
  },
  {
    id: "hygiene",
    slug: "hygiene-service",
    art: "napkin",
    from: "#123E60",
    to: "#4FC6DC",
    skus: 29,
    name: {
      en: "Hygiene & Service",
      fa: "ملزومات بهداشتی و پذیرایی",
      ar: "النظافة والخدمة",
    },
    blurb: {
      en: "Napkins, table covers, food-safe gloves and aprons for front and back of house.",
      fa: "دستمال سفره، رومیزی، دستکش بهداشتی و پیش‌بند مخصوص سالن و آشپزخانه.",
      ar: "مناديل وأغطية طاولات وقفازات آمنة غذائياً ومرايل للصالة والمطبخ.",
    },
  },
  {
    id: "eco",
    slug: "eco-line",
    art: "kraft",
    from: "#0E4A46",
    to: "#5CC9A7",
    skus: 33,
    name: {
      en: "Eco Line",
      fa: "محصولات زیست‌سازگار",
      ar: "الخط البيئي",
    },
    blurb: {
      en: "Kraft, bagasse and wooden alternatives — compostable, printable, ready for volume.",
      fa: "محصولات کرافت، باگاس و چوبی؛ کمپوست‌پذیر، قابل چاپ و مناسب سفارش‌های عمده.",
      ar: "كرافت وباجاس وخشب — قابلة للتحلّل والطباعة وجاهزة للكميات.",
    },
  },
];

export type Badge = "new" | "bestseller" | "eco";
export type Stock = "in" | "low" | "out";

export type Product = {
  id: string;
  slug: string;
  sku: string;
  category: CategoryId;
  art: ArtKey;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  stock: Stock;
  badges: Badge[];
  featured?: boolean;
  addedRank: number;
  name: Localized;
  blurb: Localized;
  description: Localized;
  material: Localized;
  capacity: Localized;
  packSize: Localized;
  moq: Localized;
};

export const products: Product[] = [
  {
    id: "p01",
    slug: "double-wall-paper-cup-240",
    sku: "TX-CUP-240DW",
    category: "cups",
    art: "paperCup",
    price: 18.4,
    compareAt: 21.0,
    rating: 4.9,
    reviews: 214,
    stock: "in",
    badges: ["bestseller"],
    featured: true,
    addedRank: 18,
    name: {
      en: "Double-Wall Paper Cup 240 ml",
      fa: "لیوان کاغذی دوجداره ۲۴۰ میلی‌لیتر",
      ar: "كوب ورقي مزدوج الجدار ٢٤٠ مل",
    },
    blurb: {
      en: "Holds heat without a sleeve. The café standard.",
      fa: "بدون نیاز به هولدر، گرما را حفظ می‌کند؛ انتخابی استاندارد برای کافه‌ها.",
      ar: "يحفظ الحرارة دون غلاف. معيار المقاهي.",
    },
    description: {
      en: "A 300 gsm food-grade board cup with an insulating air gap between walls. Rolled rim for a clean drink edge and a secure lid seat. Printable in up to six colours for private label runs.",
      fa: "لیوان از مقوای گرید غذایی ۳۰۰ گرمی با فاصله هوایی عایق میان دو جداره. لبه رول‌شده برای نوشیدن تمیز و نشیمن مطمئن درب. قابل چاپ تا شش رنگ برای سفارش‌های برند اختصاصی.",
      ar: "كوب من كرتون معتمد غذائياً بوزن ٣٠٠ غم مع فراغ هوائي عازل بين الجدارين. حافة ملفوفة لحوافّ شرب نظيفة ومقعد غطاء محكم. قابل للطباعة حتى ستة ألوان للعلامات الخاصة.",
    },
    material: { en: "Food-grade board + PE", fa: "مقوای گرید غذایی + پوشش PE", ar: "كرتون غذائي + طبقة PE" },
    capacity: { en: "240 ml / 8 oz", fa: "۲۴۰ میلی‌لیتر", ar: "٢٤٠ مل" },
    packSize: { en: "50 pcs / sleeve · 1000 / carton", fa: "۵۰ عدد در شرینک · ۱۰۰۰ عدد در کارتن", ar: "٥٠ حبة/رزمة · ١٠٠٠/كرتونة" },
    moq: { en: "5 cartons", fa: "۵ کارتن", ar: "٥ كراتين" },
  },
  {
    id: "p02",
    slug: "clear-pet-tumbler-500",
    sku: "TX-CUP-500PET",
    category: "cups",
    art: "cup",
    price: 15.9,
    rating: 4.7,
    reviews: 168,
    stock: "in",
    badges: ["bestseller"],
    featured: true,
    addedRank: 12,
    name: {
      en: "Crystal PET Tumbler 500 ml",
      fa: "لیوان پت کریستالی ۵۰۰ میلی‌لیتر",
      ar: "كوب PET كريستالي ٥٠٠ مل",
    },
    blurb: {
      en: "Glass-clear, rigid, and it does not haze with ice.",
      fa: "شفاف مانند شیشه، مقاوم و بدون کدر شدن در تماس با یخ.",
      ar: "شفاف كالزجاج وصلب ولا يتغيّم مع الثلج.",
    },
    description: {
      en: "Injection-grade PET drawn to a uniform 0.32 mm wall. Stacks tightly without locking, and takes both flat and dome lids from our matching lid line.",
      fa: "پت گرید تزریقی با ضخامت یکنواخت ۰٫۳۲ میلی‌متر. چیدمان فشرده بدون قفل شدن روی هم و سازگار با درب تخت و گنبدی از خط درب ما.",
      ar: "PET بدرجة الحقن بسماكة جدار منتظمة ٠٫٣٢ مم. يتراصّ بإحكام دون التصاق ويقبل الأغطية المسطّحة والمقبّبة من خطنا.",
    },
    material: { en: "Virgin PET", fa: "پت نو (بدون آسیاب)", ar: "PET بكر" },
    capacity: { en: "500 ml / 16 oz", fa: "۵۰۰ میلی‌لیتر", ar: "٥٠٠ مل" },
    packSize: { en: "50 pcs / sleeve · 1000 / carton", fa: "۵۰ عدد در شرینک · ۱۰۰۰ عدد در کارتن", ar: "٥٠ حبة/رزمة · ١٠٠٠/كرتونة" },
    moq: { en: "5 cartons", fa: "۵ کارتن", ar: "٥ كراتين" },
  },
  {
    id: "p03",
    slug: "tea-glass-90",
    sku: "TX-CUP-090PP",
    category: "cups",
    art: "cup",
    price: 7.2,
    rating: 4.6,
    reviews: 302,
    stock: "in",
    badges: [],
    addedRank: 4,
    name: {
      en: "Tea Glass 90 ml",
      fa: "استکان یکبار مصرف ۹۰ میلی‌لیتر",
      ar: "كوب شاي ٩٠ مل",
    },
    blurb: {
      en: "The tea glass that survives boiling water without warping.",
      fa: "استکانی که با آب جوش تاب برنمی‌دارد.",
      ar: "كوب الشاي الذي لا يتشوّه مع الماء المغلي.",
    },
    description: {
      en: "Heat-stable polypropylene rated to 95 °C, with a reinforced base ring so a full glass does not flex when carried on a tray.",
      fa: "پلی‌پروپیلن مقاوم حرارتی تا ۹۵ درجه سانتی‌گراد با رینگ تقویتی کف، تا استکان پر روی سینی خم نشود.",
      ar: "بولي بروبيلين ثابت حرارياً حتى ٩٥° مع حلقة قاعدة معزّزة تمنع الانثناء عند الحمل على صينية.",
    },
    material: { en: "Heat-stable PP", fa: "پلی‌پروپیلن مقاوم حرارت", ar: "بولي بروبيلين ثابت حرارياً" },
    capacity: { en: "90 ml", fa: "۹۰ میلی‌لیتر", ar: "٩٠ مل" },
    packSize: { en: "100 pcs / sleeve · 3000 / carton", fa: "۱۰۰ عدد در شرینک · ۳۰۰۰ عدد در کارتن", ar: "١٠٠ حبة/رزمة · ٣٠٠٠/كرتونة" },
    moq: { en: "3 cartons", fa: "۳ کارتن", ar: "٣ كراتين" },
  },
  {
    id: "p04",
    slug: "ripple-hot-cup-360",
    sku: "TX-CUP-360RP",
    category: "cups",
    art: "paperCup",
    price: 22.5,
    rating: 4.8,
    reviews: 97,
    stock: "low",
    badges: ["new"],
    addedRank: 22,
    name: {
      en: "Ripple Wall Hot Cup 360 ml",
      fa: "لیوان موج‌دار داغ ۳۶۰ میلی‌لیتر",
      ar: "كوب ساخن مموّج ٣٦٠ مل",
    },
    blurb: {
      en: "Corrugated outer wall — grip and insulation in one.",
      fa: "جداره بیرونی کنگره‌ای — چسبندگی و عایق‌بندی با هم.",
      ar: "جدار خارجي مضلّع — قبضة وعزل في آن واحد.",
    },
    description: {
      en: "A fluted outer layer raises the insulation value and gives a positive grip when full. Suited to specialty coffee where sleeves slow down service.",
      fa: "لایه بیرونی کنگره‌ای عایق‌بندی را بالا می‌برد و هنگام پر بودن، گرفتن لیوان را مطمئن‌تر می‌کند. مناسب کافه‌های تخصصی که هولدر سرعت سرویس را کم می‌کند.",
      ar: "طبقة خارجية مضلّعة ترفع قيمة العزل وتمنح قبضة أكيدة عند الامتلاء. مناسب للقهوة المختصة حيث تبطئ الأغلفة الخدمة.",
    },
    material: { en: "3-layer board + PE", fa: "مقوای سه‌لایه + پوشش PE", ar: "كرتون ثلاثي + PE" },
    capacity: { en: "360 ml / 12 oz", fa: "۳۶۰ میلی‌لیتر", ar: "٣٦٠ مل" },
    packSize: { en: "25 pcs / sleeve · 500 / carton", fa: "۲۵ عدد در شرینک · ۵۰۰ عدد در کارتن", ar: "٢٥ حبة/رزمة · ٥٠٠/كرتونة" },
    moq: { en: "4 cartons", fa: "۴ کارتن", ar: "٤ كراتين" },
  },
  {
    id: "p05",
    slug: "rigid-dinner-plate-26",
    sku: "TX-PLT-260RG",
    category: "plates",
    art: "plate",
    price: 24.8,
    compareAt: 27.9,
    rating: 4.8,
    reviews: 143,
    stock: "in",
    badges: ["bestseller"],
    featured: true,
    addedRank: 15,
    name: {
      en: "Rigid Dinner Plate 26 cm",
      fa: "بشقاب غذاخوری مستحکم ۲۶ سانتی‌متر",
      ar: "طبق عشاء صلب ٢٦ سم",
    },
    blurb: {
      en: "Holds a full main course flat on one hand.",
      fa: "یک وعده کامل غذا را حتی روی یک دست، صاف و محکم نگه می‌دارد.",
      ar: "يحمل وجبة كاملة مستوية على يد واحدة.",
    },
    description: {
      en: "Our heaviest plate at 11 g, with a deep rim roll for rigidity. Rated for hot food contact and cuts cleanly under a knife without splitting.",
      fa: "سنگین‌ترین بشقاب ما با وزن ۱۱ گرم و لبه رول عمیق برای استحکام. مناسب تماس با غذای داغ و مقاوم در برابر ترک‌خوردن زیر کارد.",
      ar: "أثقل أطباقنا بوزن ١١ غم مع حافة ملفوفة عميقة للصلابة. معتمد لملامسة الطعام الساخن ولا ينشقّ تحت السكين.",
    },
    material: { en: "Food-grade PS, 11 g", fa: "پلی‌استایرن گرید غذایی، ۱۱ گرم", ar: "بوليسترين غذائي، ١١ غم" },
    capacity: { en: "Ø 26 cm", fa: "قطر ۲۶ سانتی‌متر", ar: "قطر ٢٦ سم" },
    packSize: { en: "25 pcs / sleeve · 500 / carton", fa: "۲۵ عدد در شرینک · ۵۰۰ عدد در کارتن", ar: "٢٥ حبة/رزمة · ٥٠٠/كرتونة" },
    moq: { en: "4 cartons", fa: "۴ کارتن", ar: "٤ كراتين" },
  },
  {
    id: "p06",
    slug: "three-compartment-tray",
    sku: "TX-PLT-3CMP",
    category: "plates",
    art: "plate",
    price: 29.6,
    rating: 4.6,
    reviews: 88,
    stock: "in",
    badges: [],
    addedRank: 10,
    name: {
      en: "Three-Compartment Meal Tray",
      fa: "سینی غذای سه‌خانه",
      ar: "صينية وجبة ثلاثية الأقسام",
    },
    blurb: {
      en: "Keeps rice, stew and salad from meeting.",
      fa: "برنج، خورش و سالاد را از هم جدا نگه می‌دارد.",
      ar: "تفصل الأرز والمرق والسلطة عن بعضها.",
    },
    description: {
      en: "Deep 320 ml main well with two 120 ml sides. Compatible with our sealing film line for catering and airline service.",
      fa: "خانه اصلی عمیق ۳۲۰ میلی‌لیتری با دو خانه ۱۲۰ میلی‌لیتری. سازگار با خط فیلم سیل ما برای کترینگ و سرویس هوایی.",
      ar: "حجرة رئيسية عميقة ٣٢٠ مل مع حجرتين ١٢٠ مل. متوافقة مع خط أغشية اللحام للتموين وخدمة الطيران.",
    },
    material: { en: "Food-grade PP", fa: "پلی‌پروپیلن گرید غذایی", ar: "بولي بروبيلين غذائي" },
    capacity: { en: "320 + 2 × 120 ml", fa: "۳۲۰ + دو خانه ۱۲۰ میلی‌لیتر", ar: "٣٢٠ + ٢×١٢٠ مل" },
    packSize: { en: "25 pcs / sleeve · 300 / carton", fa: "۲۵ عدد در شرینک · ۳۰۰ عدد در کارتن", ar: "٢٥ حبة/رزمة · ٣٠٠/كرتونة" },
    moq: { en: "3 cartons", fa: "۳ کارتن", ar: "٣ كراتين" },
  },
  {
    id: "p07",
    slug: "soup-bowl-450",
    sku: "TX-BWL-450",
    category: "plates",
    art: "bowl",
    price: 19.9,
    rating: 4.5,
    reviews: 61,
    stock: "in",
    badges: [],
    addedRank: 7,
    name: {
      en: "Soup Bowl 450 ml",
      fa: "کاسه سوپ ۴۵۰ میلی‌لیتر",
      ar: "وعاء شوربة ٤٥٠ مل",
    },
    blurb: {
      en: "Deep, stable, and it takes a snap lid.",
      fa: "عمیق، پایدار و سازگار با درب پرسی.",
      ar: "عميق وثابت ويقبل غطاءً بالضغط.",
    },
    description: {
      en: "A wide-base bowl that resists tipping on a moving tray, with a rim profile designed for our TX-LID-450 snap lid for delivery.",
      fa: "کاسه با کف پهن که روی سینی متحرک واژگون نمی‌شود و پروفیل لبه‌ای مخصوص درب پرسی TX-LID-450 برای ارسال دارد.",
      ar: "وعاء بقاعدة عريضة يقاوم الانقلاب على الصينية المتحركة، بحافة مصمّمة لغطاء TX-LID-450 للتوصيل.",
    },
    material: { en: "Food-grade PP", fa: "پلی‌پروپیلن گرید غذایی", ar: "بولي بروبيلين غذائي" },
    capacity: { en: "450 ml", fa: "۴۵۰ میلی‌لیتر", ar: "٤٥٠ مل" },
    packSize: { en: "25 pcs / sleeve · 500 / carton", fa: "۲۵ عدد در شرینک · ۵۰۰ عدد در کارتن", ar: "٢٥ حبة/رزمة · ٥٠٠/كرتونة" },
    moq: { en: "3 cartons", fa: "۳ کارتن", ar: "٣ كراتين" },
  },
  {
    id: "p08",
    slug: "heavy-cutlery-set",
    sku: "TX-CUT-HVY3",
    category: "cutlery",
    art: "cutlery",
    price: 26.4,
    rating: 4.9,
    reviews: 176,
    stock: "in",
    badges: ["bestseller"],
    featured: true,
    addedRank: 16,
    name: {
      en: "Heavy-Duty Cutlery Set",
      fa: "ست مقاوم قاشق، چنگال و کارد",
      ar: "طقم أدوات طعام ثقيل",
    },
    blurb: {
      en: "Fork, knife, spoon and napkin — sealed, ready to hand over.",
      fa: "قاشق، چنگال، کارد و دستمال؛ بسته‌بندی‌شده و آماده ارائه به مشتری.",
      ar: "شوكة وسكين وملعقة ومنديل — مغلّفة وجاهزة للتسليم.",
    },
    description: {
      en: "A 4.2 g fork with a reinforced neck — the part that usually fails. Individually sealed in a printed film pack for hygiene-sensitive delivery.",
      fa: "چنگال ۴٫۲ گرمی با گردن تقویت‌شده — همان نقطه‌ای که معمولاً می‌شکند. تک‌بسته در فیلم چاپی برای ارسال با حساسیت بهداشتی.",
      ar: "شوكة بوزن ٤٫٢ غم بعنق معزّز — الجزء الذي يفشل عادة. مغلّفة فردياً بغشاء مطبوع للتوصيل الحسّاس صحياً.",
    },
    material: { en: "Reinforced PS", fa: "پلی‌استایرن تقویت‌شده", ar: "بوليسترين معزّز" },
    capacity: { en: "3-piece + napkin", fa: "سه‌تکه + دستمال", ar: "٣ قطع + منديل" },
    packSize: { en: "250 sets / carton", fa: "۲۵۰ سرویس در کارتن", ar: "٢٥٠ طقم/كرتونة" },
    moq: { en: "2 cartons", fa: "۲ کارتن", ar: "كرتونتان" },
  },
  {
    id: "p09",
    slug: "dessert-spoon-bulk",
    sku: "TX-CUT-DSP",
    category: "cutlery",
    art: "cutlery",
    price: 9.8,
    rating: 4.4,
    reviews: 121,
    stock: "in",
    badges: [],
    addedRank: 3,
    name: {
      en: "Dessert Spoon — Bulk",
      fa: "قاشق دسر — فله",
      ar: "ملعقة حلوى — سائبة",
    },
    blurb: {
      en: "The workhorse spoon, priced for volume.",
      fa: "قاشق پرکاربرد، با قیمت تیراژ بالا.",
      ar: "الملعقة الأكثر استخداماً بسعر الكميات.",
    },
    description: {
      en: "Standard 2.6 g dessert spoon in bulk polybags for high-turnover canteens and ice-cream counters.",
      fa: "قاشق دسر استاندارد ۲٫۶ گرمی در بسته‌بندی فله برای سلف‌سرویس‌های پرگردش و بستنی‌فروشی‌ها.",
      ar: "ملعقة حلوى قياسية ٢٫٦ غم بأكياس سائبة للمقاصف عالية الحركة وأكشاك المثلجات.",
    },
    material: { en: "Food-grade PS", fa: "پلی‌استایرن گرید غذایی", ar: "بوليسترين غذائي" },
    capacity: { en: "14 cm", fa: "۱۴ سانتی‌متر", ar: "١٤ سم" },
    packSize: { en: "100 pcs / bag · 5000 / carton", fa: "۱۰۰ عدد در بسته · ۵۰۰۰ در کارتن", ar: "١٠٠ حبة/كيس · ٥٠٠٠/كرتونة" },
    moq: { en: "2 cartons", fa: "۲ کارتن", ar: "كرتونتان" },
  },
  {
    id: "p10",
    slug: "wooden-cutlery-eco",
    sku: "TX-CUT-WOOD",
    category: "eco",
    art: "cutlery",
    price: 34.2,
    rating: 4.7,
    reviews: 54,
    stock: "in",
    badges: ["eco", "new"],
    featured: true,
    addedRank: 24,
    name: {
      en: "Birch Wood Cutlery",
      fa: "قاشق و چنگال چوبی از جنس توس",
      ar: "أدوات طعام من خشب البتولا",
    },
    blurb: {
      en: "Smooth-sanded birch. No splinters, no aftertaste.",
      fa: "چوب توس با سطحی کاملاً صیقلی؛ بدون تراشه و بدون ایجاد طعم ناخوشایند.",
      ar: "بتولا مصقول. دون شظايا ودون طعم دخيل.",
    },
    description: {
      en: "FSC-sourced birch, double-sanded and heat-treated. Fully compostable and paired with our kraft container line for a single-material waste stream.",
      fa: "چوب توس با منشأ FSC، دوبار سنباده‌خورده و حرارت‌دیده. کاملاً کامپوست‌پذیر و هماهنگ با خط ظروف کرافت برای جریان پسماند تک‌جنسی.",
      ar: "بتولا بمصدر FSC، مصقول مرّتين ومعالج حرارياً. قابل للتحلّل بالكامل ومتوافق مع خط علب الكرافت لتيار نفايات أحادي المادة.",
    },
    material: { en: "FSC birch wood", fa: "چوب توس دارای گواهی FSC", ar: "خشب بتولا معتمد FSC" },
    capacity: { en: "16 cm", fa: "۱۶ سانتی‌متر", ar: "١٦ سم" },
    packSize: { en: "100 pcs / box · 2000 / carton", fa: "۱۰۰ عدد در جعبه · ۲۰۰۰ در کارتن", ar: "١٠٠ حبة/علبة · ٢٠٠٠/كرتونة" },
    moq: { en: "2 cartons", fa: "۲ کارتن", ar: "كرتونتان" },
  },
  {
    id: "p11",
    slug: "leak-proof-takeaway-750",
    sku: "TX-CNT-750LP",
    category: "containers",
    art: "container",
    price: 38.5,
    compareAt: 43.0,
    rating: 4.9,
    reviews: 231,
    stock: "in",
    badges: ["bestseller"],
    featured: true,
    addedRank: 20,
    name: {
      en: "Leak-Proof Takeaway Box 750 ml",
      fa: "ظرف بیرون‌بر ضدنشت ۷۵۰ میلی‌لیتر",
      ar: "علبة طلبات مانعة للتسرّب ٧٥٠ مل",
    },
    blurb: {
      en: "Tested upside down with 750 ml of broth.",
      fa: "در حالت وارونه با ۷۵۰ میلی‌لیتر مایع آزمایش شده است.",
      ar: "مختبرة مقلوبة بـ٧٥٠ مل من المرق.",
    },
    description: {
      en: "A dual-lock rim geometry that seals under transport vibration. Microwave-safe to 110 °C and stackable when sealed, so riders can carry three orders flat.",
      fa: "هندسه لبه دوقفله که زیر لرزش حمل‌ونقل آب‌بندی می‌ماند. مناسب مایکروویو تا ۱۱۰ درجه و قابل چیدن روی هم پس از بستن، تا پیک بتواند سه سفارش را صاف حمل کند.",
      ar: "حافة بقفل مزدوج تظلّ محكمة تحت اهتزاز النقل. آمنة للميكروويف حتى ١١٠° وقابلة للتراصّ بعد الإغلاق ليحمل السائق ثلاثة طلبات مستوية.",
    },
    material: { en: "Food-grade PP", fa: "پلی‌پروپیلن گرید غذایی", ar: "بولي بروبيلين غذائي" },
    capacity: { en: "750 ml", fa: "۷۵۰ میلی‌لیتر", ar: "٧٥٠ مل" },
    packSize: { en: "50 sets / sleeve · 300 / carton", fa: "۵۰ ست در شرینک · ۳۰۰ در کارتن", ar: "٥٠ طقم/رزمة · ٣٠٠/كرتونة" },
    moq: { en: "3 cartons", fa: "۳ کارتن", ar: "٣ كراتين" },
  },
  {
    id: "p12",
    slug: "sauce-cup-60",
    sku: "TX-CNT-060SC",
    category: "containers",
    art: "container",
    price: 11.3,
    rating: 4.6,
    reviews: 149,
    stock: "in",
    badges: [],
    addedRank: 6,
    name: {
      en: "Sauce Cup 60 ml with Lid",
      fa: "سس‌خوری دربدار ۶۰ میلی‌لیتر",
      ar: "كأس صلصة ٦٠ مل بغطاء",
    },
    blurb: {
      en: "Hinged lid that clicks and stays clicked.",
      fa: "درب لولایی که محکم جا می‌افتد و باز نمی‌شود.",
      ar: "غطاء مفصلي يُقفل ويبقى مقفلاً.",
    },
    description: {
      en: "One-piece hinged sauce cup — no separate lid to lose or mismatch on the packing line. Clear PP for visible contents.",
      fa: "سس‌خوری یکپارچه با درب لولایی — بدون درب جدا که گم شود یا در خط بسته‌بندی جفت نشود. پی‌پی شفاف برای دیده شدن محتویات.",
      ar: "كأس صلصة بغطاء مفصلي من قطعة واحدة — دون غطاء منفصل يُفقد أو لا يُطابق في خط التعبئة. PP شفاف لرؤية المحتوى.",
    },
    material: { en: "Clear PP", fa: "پی‌پی شفاف", ar: "PP شفاف" },
    capacity: { en: "60 ml", fa: "۶۰ میلی‌لیتر", ar: "٦٠ مل" },
    packSize: { en: "100 pcs / bag · 2000 / carton", fa: "۱۰۰ عدد در بسته · ۲۰۰۰ در کارتن", ar: "١٠٠ حبة/كيس · ٢٠٠٠/كرتونة" },
    moq: { en: "2 cartons", fa: "۲ کارتن", ar: "كرتونتان" },
  },
  {
    id: "p13",
    slug: "kraft-salad-bowl-1000",
    sku: "TX-ECO-1000KB",
    category: "eco",
    art: "kraft",
    price: 44.0,
    rating: 4.8,
    reviews: 72,
    stock: "low",
    badges: ["eco"],
    addedRank: 21,
    name: {
      en: "Kraft Salad Bowl 1000 ml",
      fa: "کاسه سالاد کرافت ۱۰۰۰ میلی‌لیتر",
      ar: "وعاء سلطة كرافت ١٠٠٠ مل",
    },
    blurb: {
      en: "Kraft outside, PLA lined inside, compostable throughout.",
      fa: "کرافت در بیرون، پوشش PLA در داخل، کاملاً کامپوست‌پذیر.",
      ar: "كرافت من الخارج وبطانة PLA من الداخل، قابل للتحلّل بالكامل.",
    },
    description: {
      en: "Unbleached kraft board with a plant-based PLA barrier instead of PE. Handles oil-based dressings for four hours without wicking, and prints beautifully in one or two colours.",
      fa: "مقوای کرافت سفیدنشده با لایه محافظ گیاهی PLA به‌جای PE. تا چهار ساعت در برابر سس‌های روغنی نشت نمی‌کند و چاپ یک یا دو رنگ روی آن بسیار تمیز می‌نشیند.",
      ar: "كرتون كرافت غير مبيّض مع حاجز PLA نباتي بدل PE. يتحمّل الصلصات الزيتية أربع ساعات دون نفاذ، ويطبع بلون أو لونين بجودة عالية.",
    },
    material: { en: "Kraft board + PLA", fa: "مقوای کرافت + پوشش PLA", ar: "كرتون كرافت + PLA" },
    capacity: { en: "1000 ml", fa: "۱۰۰۰ میلی‌لیتر", ar: "١٠٠٠ مل" },
    packSize: { en: "50 pcs / sleeve · 300 / carton", fa: "۵۰ عدد در شرینک · ۳۰۰ در کارتن", ar: "٥٠ حبة/رزمة · ٣٠٠/كرتونة" },
    moq: { en: "3 cartons", fa: "۳ کارتن", ar: "٣ كراتين" },
  },
  {
    id: "p14",
    slug: "bagasse-clamshell-9",
    sku: "TX-ECO-CLAM9",
    category: "eco",
    art: "kraft",
    price: 47.6,
    rating: 4.7,
    reviews: 63,
    stock: "in",
    badges: ["eco", "new"],
    addedRank: 25,
    name: {
      en: "Bagasse Clamshell 9\"",
      fa: "ظرف صدفی باگاس ۹ اینچ",
      ar: "علبة صدفية من الباجاس ٩ إنش",
    },
    blurb: {
      en: "Sugarcane fibre. Freezer to microwave, no plastic.",
      fa: "الیاف نیشکر. از فریزر تا مایکروویو، بدون پلاستیک.",
      ar: "ألياف قصب السكر. من الفريزر إلى الميكروويف دون بلاستيك.",
    },
    description: {
      en: "Moulded from sugarcane pulp, a by-product of sugar milling. Handles –20 °C to 120 °C, breathes just enough to keep fried food crisp, and composts in twelve weeks.",
      fa: "قالب‌گیری‌شده از خمیر نیشکر، محصول جانبی کارخانه قند. تحمل دمای منفی ۲۰ تا ۱۲۰ درجه، تنفس کنترل‌شده برای ترد ماندن سرخ‌کردنی و تجزیه در دوازده هفته.",
      ar: "مصبوبة من لبّ قصب السكر، وهو ناتج ثانوي لمعامل السكر. تتحمّل من -٢٠° إلى ١٢٠°، وتتنفّس بما يكفي لبقاء المقليات مقرمشة، وتتحلّل خلال اثني عشر أسبوعاً.",
    },
    material: { en: "Sugarcane bagasse", fa: "باگاس نیشکر", ar: "باجاس قصب السكر" },
    capacity: { en: "9 × 9 inch, 3 compartments", fa: "۹×۹ اینچ، سه خانه", ar: "٩×٩ إنش، ٣ أقسام" },
    packSize: { en: "50 pcs / sleeve · 200 / carton", fa: "۵۰ عدد در شرینک · ۲۰۰ در کارتن", ar: "٥٠ حبة/رزمة · ٢٠٠/كرتونة" },
    moq: { en: "3 cartons", fa: "۳ کارتن", ar: "٣ كراتين" },
  },
  {
    id: "p15",
    slug: "catering-platter-large",
    sku: "TX-TRY-LRG",
    category: "trays",
    art: "tray",
    price: 33.9,
    rating: 4.5,
    reviews: 47,
    stock: "in",
    badges: [],
    addedRank: 9,
    name: {
      en: "Catering Platter — Large",
      fa: "دیس پذیرایی — بزرگ",
      ar: "طبق تقديم — كبير",
    },
    blurb: {
      en: "Rigid enough to carry loaded, across a room.",
      fa: "آن‌قدر مستحکم که پر، از یک سر سالن تا سر دیگر برود.",
      ar: "صلب بما يكفي لحمله محمّلاً عبر القاعة.",
    },
    description: {
      en: "A 45 × 30 cm platter with a stiffening rib pattern under the base. Pairs with a clear dome lid for buffet transport and display.",
      fa: "دیس ۴۵×۳۰ سانتی با الگوی رینگ تقویتی زیر کف. با درب گنبدی شفاف برای حمل و نمایش بوفه هماهنگ است.",
      ar: "طبق ٤٥×٣٠ سم بنمط أضلاع تقوية أسفل القاعدة. يقترن بغطاء مقبّب شفاف لنقل البوفيه والعرض.",
    },
    material: { en: "Rigid PS", fa: "پلی‌استایرن مستحکم", ar: "بوليسترين صلب" },
    capacity: { en: "45 × 30 cm", fa: "۴۵ × ۳۰ سانتی‌متر", ar: "٤٥ × ٣٠ سم" },
    packSize: { en: "10 pcs / sleeve · 100 / carton", fa: "۱۰ عدد در شرینک · ۱۰۰ در کارتن", ar: "١٠ حبات/رزمة · ١٠٠/كرتونة" },
    moq: { en: "2 cartons", fa: "۲ کارتن", ar: "كرتونتان" },
  },
  {
    id: "p16",
    slug: "cake-base-round",
    sku: "TX-TRY-CKB",
    category: "trays",
    art: "tray",
    price: 21.4,
    rating: 4.6,
    reviews: 38,
    stock: "in",
    badges: [],
    addedRank: 5,
    name: {
      en: "Round Cake Base 28 cm",
      fa: "زیرکیکی گرد ۲۸ سانتی‌متر",
      ar: "قاعدة كيك دائرية ٢٨ سم",
    },
    blurb: {
      en: "Silver-laminated, grease-resistant, cuts clean.",
      fa: "روکش نقره‌ای، ضدچربی، برش تمیز.",
      ar: "مغلّفة بالفضي، مقاومة للدهون، تُقطع بنظافة.",
    },
    description: {
      en: "Laminated corrugated base rated for 4 kg. The foil face resists butter cream migration for 48 hours in a chilled display.",
      fa: "زیرکیکی مقوایی لمینت‌شده با تحمل ۴ کیلوگرم. سطح فویلی تا ۴۸ ساعت در ویترین سرد در برابر نفوذ خامه مقاوم است.",
      ar: "قاعدة مضلّعة مغلّفة تتحمّل ٤ كغم. الوجه المعدني يقاوم نفاذ الكريمة ٤٨ ساعة في العرض المبرّد.",
    },
    material: { en: "Laminated corrugate", fa: "مقوای کارتنی لمینتی", ar: "كرتون مضلّع مغلّف" },
    capacity: { en: "Ø 28 cm, up to 4 kg", fa: "قطر ۲۸ سانتی، تا ۴ کیلوگرم", ar: "قطر ٢٨ سم، حتى ٤ كغم" },
    packSize: { en: "25 pcs / pack · 200 / carton", fa: "۲۵ عدد در بسته · ۲۰۰ در کارتن", ar: "٢٥ حبة/عبوة · ٢٠٠/كرتونة" },
    moq: { en: "2 cartons", fa: "۲ کارتن", ar: "كرتونتان" },
  },
  {
    id: "p17",
    slug: "dome-lid-90mm",
    sku: "TX-LID-090DM",
    category: "lids",
    art: "lid",
    price: 12.8,
    rating: 4.7,
    reviews: 112,
    stock: "in",
    badges: [],
    addedRank: 8,
    name: {
      en: "Dome Lid Ø 90 mm",
      fa: "درب گنبدی قطر ۹۰ میلی‌متر",
      ar: "غطاء مقبّب قطر ٩٠ مم",
    },
    blurb: {
      en: "Room for cream and a straw cross.",
      fa: "فضای کافی برای خامه و محل نی.",
      ar: "مساحة للكريمة وفتحة الشفّاطة.",
    },
    description: {
      en: "Snap-fit dome with a pre-scored straw cross that reseals around the straw. Matched to our 500 ml and 700 ml tumblers.",
      fa: "درب پرسی گنبدی با ضربدر از پیش برش‌خورده که دور نی بسته می‌ماند. متناسب با لیوان‌های ۵۰۰ و ۷۰۰ میلی‌لیتری ما.",
      ar: "غطاء مقبّب بالضغط بفتحة صليبية مسبقة تُحكم حول الشفّاطة. مطابق لأكوابنا ٥٠٠ و٧٠٠ مل.",
    },
    material: { en: "Clear PET", fa: "پت شفاف", ar: "PET شفاف" },
    capacity: { en: "Ø 90 mm", fa: "قطر ۹۰ میلی‌متر", ar: "قطر ٩٠ مم" },
    packSize: { en: "100 pcs / sleeve · 1000 / carton", fa: "۱۰۰ عدد در شرینک · ۱۰۰۰ در کارتن", ar: "١٠٠ حبة/رزمة · ١٠٠٠/كرتونة" },
    moq: { en: "2 cartons", fa: "۲ کارتن", ar: "كرتونتان" },
  },
  {
    id: "p18",
    slug: "paper-straw-jumbo",
    sku: "TX-STR-PPJ",
    category: "lids",
    art: "straw",
    price: 16.2,
    rating: 4.3,
    reviews: 95,
    stock: "in",
    badges: ["eco"],
    addedRank: 14,
    name: {
      en: "Paper Straw — Jumbo",
      fa: "نی کاغذی — جامبو",
      ar: "شفّاطة ورقية — جامبو",
    },
    blurb: {
      en: "Three-ply. Still a straw at the bottom of the glass.",
      fa: "سه‌لایه. تا ته لیوان هنوز نی است.",
      ar: "ثلاث طبقات. تبقى شفّاطة حتى قاع الكوب.",
    },
    description: {
      en: "Three-ply spiral wound with food-safe adhesive, tested to hold structure for 3 hours in a cold drink — the failure point of most single-ply paper straws.",
      fa: "سه‌لایه مارپیچ با چسب بهداشتی، آزمون‌شده برای حفظ استحکام تا ۳ ساعت در نوشیدنی سرد — همان نقطه‌ضعف بیشتر نی‌های کاغذی تک‌لایه.",
      ar: "ثلاث طبقات ملفوفة حلزونياً بلاصق آمن غذائياً، مختبرة للحفاظ على شكلها ٣ ساعات في مشروب بارد — وهي نقطة فشل معظم الشفّاطات أحادية الطبقة.",
    },
    material: { en: "3-ply food-safe paper", fa: "کاغذ سه‌لایه بهداشتی", ar: "ورق ثلاثي آمن غذائياً" },
    capacity: { en: "Ø 10 mm × 210 mm", fa: "قطر ۱۰ × طول ۲۱۰ میلی‌متر", ar: "قطر ١٠ × ٢١٠ مم" },
    packSize: { en: "250 pcs / box · 5000 / carton", fa: "۲۵۰ عدد در جعبه · ۵۰۰۰ در کارتن", ar: "٢٥٠ حبة/علبة · ٥٠٠٠/كرتونة" },
    moq: { en: "2 cartons", fa: "۲ کارتن", ar: "كرتونتان" },
  },
  {
    id: "p19",
    slug: "dinner-napkin-2ply",
    sku: "TX-NAP-2PLY",
    category: "hygiene",
    art: "napkin",
    price: 14.7,
    rating: 4.5,
    reviews: 84,
    stock: "in",
    badges: [],
    addedRank: 11,
    name: {
      en: "Dinner Napkin 2-Ply 33 cm",
      fa: "دستمال سفره دولایه ۳۳ سانتی‌متر",
      ar: "منديل عشاء طبقتين ٣٣ سم",
    },
    blurb: {
      en: "Soft face, absorbent core, embossed edge.",
      fa: "سطح نرم، مغز جاذب، لبه امباس‌شده.",
      ar: "وجه ناعم ولبّ ماص وحافة منقوشة.",
    },
    description: {
      en: "100% virgin pulp, dermatologically neutral and unbleached with chlorine. Quarter-folded for a dispenser or a plate setting.",
      fa: "۱۰۰٪ خمیر نو، خنثی برای پوست و بدون سفیدکننده کلر. تاخورده چهارگوش، مناسب دیسپنسر یا چیدمان بشقاب.",
      ar: "لبّ بكر ١٠٠٪، محايد جلدياً وغير مبيّض بالكلور. مطوي أرباعاً للموزّع أو لتنسيق الطبق.",
    },
    material: { en: "Virgin pulp tissue", fa: "تیشو از خمیر نو", ar: "ورق من لبّ بكر" },
    capacity: { en: "33 × 33 cm", fa: "۳۳ × ۳۳ سانتی‌متر", ar: "٣٣ × ٣٣ سم" },
    packSize: { en: "100 pcs / pack · 3000 / carton", fa: "۱۰۰ عدد در بسته · ۳۰۰۰ در کارتن", ar: "١٠٠ حبة/عبوة · ٣٠٠٠/كرتونة" },
    moq: { en: "2 cartons", fa: "۲ کارتن", ar: "كرتونتان" },
  },
  {
    id: "p20",
    slug: "food-safe-gloves",
    sku: "TX-GLV-PE",
    category: "hygiene",
    art: "glove",
    price: 8.9,
    rating: 4.2,
    reviews: 66,
    stock: "out",
    badges: [],
    addedRank: 2,
    name: {
      en: "Food-Safe Gloves — Box of 500",
      fa: "دستکش بهداشتی — جعبه ۵۰۰ عددی",
      ar: "قفازات آمنة غذائياً — علبة ٥٠٠",
    },
    blurb: {
      en: "Powder-free, embossed grip, one size fits service.",
      fa: "بدون پودر، سطح امباس برای گرفتن بهتر، سایز آزاد.",
      ar: "خالية من البودرة، بسطح منقوش، مقاس واحد للخدمة.",
    },
    description: {
      en: "Embossed PE gloves for food handling at the counter. Dispenser box designed to release one glove at a time.",
      fa: "دستکش PE امباس‌دار برای کار با مواد غذایی پشت پیشخوان. جعبه دیسپنسری که هر بار یک دستکش بیرون می‌دهد.",
      ar: "قفازات PE منقوشة لتداول الطعام عند المنضدة. علبة موزّعة تُخرج قفازاً واحداً في كل مرة.",
    },
    material: { en: "Food-grade PE", fa: "پلی‌اتیلن گرید غذایی", ar: "بولي إيثيلين غذائي" },
    capacity: { en: "Universal", fa: "سایز آزاد", ar: "مقاس موحّد" },
    packSize: { en: "500 pcs / box · 20 boxes / carton", fa: "۵۰۰ عدد در جعبه · ۲۰ جعبه در کارتن", ar: "٥٠٠ حبة/علبة · ٢٠ علبة/كرتونة" },
    moq: { en: "1 carton", fa: "۱ کارتن", ar: "كرتونة واحدة" },
  },
  {
    id: "p21",
    slug: "hinged-burger-box",
    sku: "TX-CNT-BRG",
    category: "containers",
    art: "container",
    price: 31.0,
    rating: 4.6,
    reviews: 79,
    stock: "in",
    badges: ["new"],
    addedRank: 23,
    name: {
      en: "Hinged Burger Box",
      fa: "جعبه برگر لولایی",
      ar: "علبة برجر مفصلية",
    },
    blurb: {
      en: "Vented so the bun does not steam soft.",
      fa: "دارای منفذ تهویه تا نان بخار نگیرد و وا نرود.",
      ar: "مزوّدة بفتحات تهوية كي لا يلين الخبز بالبخار.",
    },
    description: {
      en: "Four micro-vents release steam without letting heat go. Prints edge-to-edge for delivery branding and stacks four high when closed.",
      fa: "چهار منفذ ریز بخار را خارج می‌کند بدون آنکه گرما را از بین ببرد. چاپ تمام‌سطح برای برندینگ ارسال و قابلیت چیدن چهارتایی در حالت بسته.",
      ar: "أربع فتحات دقيقة تصرّف البخار دون فقد الحرارة. تُطبع من الحافة إلى الحافة للعلامة، وتتراصّ أربعاً عند الإغلاق.",
    },
    material: { en: "Kraft board", fa: "مقوای کرافت", ar: "كرتون كرافت" },
    capacity: { en: "13 × 13 × 8 cm", fa: "۱۳ × ۱۳ × ۸ سانتی‌متر", ar: "١٣ × ١٣ × ٨ سم" },
    packSize: { en: "50 pcs / sleeve · 300 / carton", fa: "۵۰ عدد در شرینک · ۳۰۰ در کارتن", ar: "٥٠ حبة/رزمة · ٣٠٠/كرتونة" },
    moq: { en: "3 cartons", fa: "۳ کارتن", ar: "٣ كراتين" },
  },
  {
    id: "p22",
    slug: "cold-cup-700",
    sku: "TX-CUP-700PP",
    category: "cups",
    art: "cup",
    price: 19.6,
    rating: 4.5,
    reviews: 58,
    stock: "in",
    badges: [],
    addedRank: 13,
    name: {
      en: "Cold Drink Tumbler 700 ml",
      fa: "لیوان نوشیدنی سرد ۷۰۰ میلی‌لیتر",
      ar: "كوب مشروبات باردة ٧٠٠ مل",
    },
    blurb: {
      en: "Tall, thick-walled, built for crushed ice.",
      fa: "بلند، جداره ضخیم، ساخته‌شده برای یخ خردشده.",
      ar: "طويل بجدار سميك، مصنوع للثلج المجروش.",
    },
    description: {
      en: "Deep tumbler for smoothies and iced coffee, with a rim engineered for both flat and dome lids so one cup covers the whole cold menu.",
      fa: "لیوان عمیق برای اسموتی و قهوه سرد، با لبه‌ای که هم درب تخت و هم گنبدی را می‌پذیرد تا یک لیوان کل منوی سرد را پوشش دهد.",
      ar: "كوب عميق للسموذي والقهوة المثلجة، بحافة تقبل الأغطية المسطّحة والمقبّبة ليغطي كوب واحد قائمة المشروبات الباردة كاملة.",
    },
    material: { en: "Food-grade PP", fa: "پلی‌پروپیلن گرید غذایی", ar: "بولي بروبيلين غذائي" },
    capacity: { en: "700 ml / 24 oz", fa: "۷۰۰ میلی‌لیتر", ar: "٧٠٠ مل" },
    packSize: { en: "50 pcs / sleeve · 500 / carton", fa: "۵۰ عدد در شرینک · ۵۰۰ در کارتن", ar: "٥٠ حبة/رزمة · ٥٠٠/كرتونة" },
    moq: { en: "3 cartons", fa: "۳ کارتن", ar: "٣ كراتين" },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function relatedProducts(product: Product, limit = 4) {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  const rest = products.filter(
    (p) => p.category !== product.category && p.id !== product.id,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export const featuredProducts = products.filter((p) => p.featured);

export const priceBounds = {
  min: Math.floor(Math.min(...products.map((p) => p.price))),
  max: Math.ceil(Math.max(...products.map((p) => p.price))),
};
