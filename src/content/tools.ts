/** محتوى تحريري أصلي لكل صفحة أداة — عربي/فرنسي. الأداة وحدها لا تكفي لـ AdSense. */
import type { Locale } from "@/i18n/dict";

export type ArticleSection = { h: string; p: string[]; ul?: string[] };
export type FaqItem = { q: string; a: string };
export type ToolDoc = {
  slug: string;
  icon: string;
  color: string;
  title: string;
  short: string;
  h1: string;
  intro: string[];
  sections: ArticleSection[];
  tips: string[];
  mistakes: string[];
  faq: FaqItem[];
};

export const TOOL_SLUGS = [
  "qr-generator", "word-counter", "password-generator", "youtube-thumbnail", "hashtag-generator",
] as const;
export type ToolSlug = (typeof TOOL_SLUGS)[number];

/* ------------------------------------------------------------------ */
/* 1) QR GENERATOR                                                     */
/* ------------------------------------------------------------------ */
const qrAr: ToolDoc = {
  slug: "qr-generator", icon: "qr", color: "teal",
  title: "مولّد رمز QR", short: "حوّل رابطًا أو نصًا إلى صورة QR جاهزة للتحميل.",
  h1: "مولّد رمز QR مجاني — صورة PNG بدون رفع أي بيانات",
  intro: [
    "رمز QR (Quick Response) هو صورة مربّعة تخزّن نصًا أو رابطًا ليقرأه هاتفك بكاميرته مباشرة. نستعمله اليوم على الملصقات، بطاقات العمل، علب المنتجات، منشورات الفعاليات، وحتى في زوايا الفيديوهات لقياس عدد المشاهدين الذين انتقلوا من شاشة التلفاز إلى الهاتف.",
    "أداة عُدّة تولّد الرمز داخل متصفحك فقط: تكتب النص، تختار الحجم واللون، وتنزّل ملف PNG. لا نرسل الرابط إلى أي خادم، ولا نحتفظ به، ولا نستعمل أي خدمة خارجية لتوليد الرموز. الرمز يُنتَج بمكتبة مفتوحة المصدر (qrcode.react) تعمل محليًا داخل الصفحة.",
  ],
  sections: [
    { h: "كيف يعمل رمز QR فعليًا؟", p: [
      "خلف المربّعات السوداء والبيضاء يوجد نص مُرمَّز بنظام يسمّى «تصحيح الخطأ» (Error Correction). هذا النظام يضيف معلومات زائدة عن الحاجة تسمح للهاتف بقراءة الرمز حتى لو كان جزء منه مغطّى بالغبار أو مشوّهًا أو مطبوعًا بشكل رديء. لذلك لا تقلق إن بدت لك المربّعات كثيرة مقابل رابط قصير: معظمها احتياطي للأخطاء.",
      "كلما زاد طول النص داخل الرمز، زادت كثافة المربّعات وصعبت قراءته على شاشة صغيرة أو عند طباعته بحجم صغير. لهذا ننصح دائمًا باستعمال روابط قصيرة، وباختيار حجم 500×500 بكسل للطباعة، و200×200 للاستخدام الرقمي فقط.",
    ] },
    { h: "اختيار الحجم المناسب", p: [
      "الحجم هنا يُقاس بالبكسل وليس بالسنتيمتر. ملف 200×200 يكفي لعرض الرمز على شاشة هاتف أو داخل منشور رقمي. أما إذا كنت ستطبعه على ورقة أو ملصق، فاختر 500×500 ثم اضبط المقاس الفعلي داخل برنامج الطباعة.",
      "قاعدة عملية بسيطة: قسمة 10. أي أن رمزًا بمقاس 3 سنتيمترات يحتاج مسافة قراءة لا تقل عن 30 سنتيمترًا. رمز على ملصق داخل متجر يُقرأ من مسافة مترين؟ اجعله أكبر من 20 سنتيمترًا. ولا تنسَ ترك هامش أبيض صامت (Quiet Zone) حول الرمز، لأن الكاميرا تحتاجه لتمييز حدود الصورة عن الخلفية.",
    ], ul: [
      "منشور على إنستغرام أو قصة: 200×200 بكسل كافٍ.",
      "بطاقة عمل أو نشرة A5: 500×500 بكسل مع مقاس طباعة 3–4 سم.",
      "ملصق كبير أو لوحة: 500×500 بكسل مع تكبير المقاس في برنامج التصميم.",
      "احرص على تباين عالٍ: مقدّمة داكنة على خلفية فاتحة.",
    ] },
    { h: "اللون: جمالي لكن بحدود", p: [
      "يمكنك تغيير لون المقدّمة والخلفية كما تشاء، لكن الكاميرا لا ترى الألوان بل ترى الفرق في الإضاءة. رمز بلون أصفر فاتح على خلفية بيضاء قد يبدو أنيقًا على الشاشة لكنه لن يُقرأ بهاتفك. الأفضل دائمًا: أسود أو أخضر داكن أو أزرق داكن على خلفية بيضاء أو فاتحة جدًا.",
      "تجنّب كذلك التدرّجات اللونية والشفافية، ولا تضع شعارًا كبيرًا في وسط الرمز. إن أردت شعارًا، فليكن صغيرًا جدًا وفي المنتصف، واختبر الرمز بثلاثة هواتف مختلفة قبل طباعة آلاف النسخ.",
    ] },
    { h: "الخصوصية: لماذا نصرّ على العمل داخل المتصفح؟", p: [
      "كثير من مواقع توليد QR ترسل الرابط الذي تكتبه إلى خادمها، وقد تختصره عبر خدمتها الخاصة ثم تعيد توجيه الزائر عبر نطاقها. هذا يعني أن جهة ثالثة تعرف محتوى حملتك وتستطيع تغيير وجهة الرابط لاحقًا. في عُدّة لا يحدث أي من هذا: الرابط يُحوَّل إلى صورة على جهازك، والصورة لا تخرج من جهازك.",
      "نصيحة أخيرة: إن كان الرمز سيُطبع لفترة طويلة، فاستعمل رابطًا تملكه أنت (نطاقك الخاص) بدل رابط مختصر لخدمة قد تغلق يومًا ما. تغيير وجهة رابط مطبوع على ألف ملصق مكلف جدًا.",
    ] },
  ],
  tips: [
    "اختبر الرمز دائمًا بكاميرا هاتفك قبل الطباعة، وليس بقارئ داخل نفس الموقع.",
    "اترك هامشًا أبيض لا يقل عن عرض أربع مربّعات حول الرمز.",
    "استخدم روابط قصيرة لتقليل كثافة المربّعات وتسهيل القراءة.",
    "إن كان الرمز على فيديو، اعرضه 5 ثوانٍ على الأقل ليتمكّن المشاهد من إخراج هاتفه.",
    "لا تضع الرمز في زاوية الفيديو حيث تظهر أزرار المنصة فوقه.",
  ],
  mistakes: [
    "طباعة الرمز بحجم أصغر من 2 سم — لن يقرأه أحد.",
    "استعمال ألوان فاتحة بلا تباين كافٍ.",
    "توليد الرمز عبر خدمة مجهولة تختصر الرابط وتتحكم فيه لاحقًا.",
    "نسيان اختبار الرمز بعد تغيير لون الخلفية داخل برنامج التصميم.",
  ],
  faq: [
    { q: "هل يمكنني توليد رمز QR لملف PDF أو رقم هاتف؟", a: "نعم. الأداة تقبل أي نص: رابط موقع، رقم هاتف بصيغة tel:، بريد بصيغة mailto:، أو نص عادي. ضع البادئة المناسبة إن أردت أن يفتح الهاتف تطبيقًا معيّنًا تلقائيًا." },
    { q: "هل تنتهي صلاحية الرمز الذي ولّدته؟", a: "لا. الرمز الذي تولّده هنا رمز ثابت (Static QR) لا تنتهي صلاحيته أبدًا ولا يحتاج اشتراكًا. سيبقى يعمل ما دام الرابط الذي أدخلته ما زال يعمل." },
    { q: "هل تحفظون الروابط التي أكتبها؟", a: "لا، إطلاقًا. التحويل يتم داخل متصفحك بمكتبة JavaScript مفتوحة المصدر. لا توجد قاعدة بيانات في هذا الموقع، ولا يُرسل أي طلب شبكة عند كتابتك للنص." },
    { q: "لماذا لا يقرأ هاتفي الرمز رغم أنه يظهر بوضوح؟", a: "الأسباب الأكثر شيوعًا: تباين غير كافٍ بين اللونين، غياب الهامش الأبيض، حجم طباعة صغير جدًا، أو انعكاس الضوء على سطح لامع. جرّب الأبيض والأسود أولًا ثم أضف اللون تدريجيًا." },
    { q: "ما الفرق بين 200×200 و500×500؟", a: "عدد البكسلات في الصورة الناتجة. 200×200 مناسب للشاشات، و500×500 يمنحك مساحة أكبر للطباعة دون أن تفقد الحدة. يمكنك دائمًا تصغير صورة كبيرة، لكن لا يمكنك تكبير صغيرة دون تشويش." },
    { q: "هل أحتاج حسابًا أو دفعًا لتحميل PNG؟", a: "لا. زر التحميل ينشئ الملف مباشرة من الرسم الموجود في صفحتك. بلا تسجيل، بلا حدود عدد، بلا علامة مائية." },
  ],
};

const qrFr: ToolDoc = {
  slug: "qr-generator", icon: "qr", color: "teal",
  title: "Générateur de QR code", short: "Transformez un lien ou un texte en image QR téléchargeable.",
  h1: "Générateur de QR code gratuit — PNG sans envoi de données",
  intro: [
    "Un QR code (Quick Response) est une image carrée qui stocke du texte ou un lien que votre téléphone lit directement avec son appareil photo. On le retrouve sur les affiches, les cartes de visite, les emballages, les supports d'événements et même dans un coin des vidéos pour mesurer le passage du grand écran au mobile.",
    "L'outil Oudda génère le code uniquement dans votre navigateur : vous saisissez le texte, choisissez la taille et les couleurs, puis téléchargez un PNG. Aucun lien n'est envoyé à un serveur, rien n'est conservé, et aucun service externe de génération de codes n'est utilisé. Le code est produit par une bibliothèque open source (qrcode.react) qui tourne localement.",
  ],
  sections: [
    { h: "Comment fonctionne réellement un QR code ?", p: [
      "Derrière les petits carrés noirs et blancs se cache un texte encodé avec un mécanisme appelé « correction d'erreur ». Ce mécanisme ajoute des informations redondantes qui permettent au téléphone de lire le code même si une partie est salie, abîmée ou mal imprimée. Ne vous étonnez donc pas du nombre de carrés pour un simple lien : la majorité sert de sécurité.",
      "Plus le texte est long, plus les carrés sont denses et plus la lecture devient difficile sur un petit écran ou à faible taille d'impression. D'où notre conseil : utilisez des liens courts, choisissez 500×500 px pour l'impression et gardez 200×200 px pour un usage purement numérique.",
    ] },
    { h: "Choisir la bonne taille", p: [
      "La taille est exprimée en pixels, pas en centimètres. Un fichier de 200×200 suffit pour un affichage sur un écran de téléphone ou dans une publication numérique. Pour imprimer sur une feuille ou un autocollant, choisissez 500×500 puis réglez la dimension physique dans votre logiciel d'impression.",
      "Règle pratique : divisez par 10. Un code de 3 cm se lit à environ 30 cm. Un code destiné à être lu à deux mètres dans une vitrine doit mesurer au moins 20 cm. Et n'oubliez jamais la zone de silence (Quiet Zone), ce petit espace blanc qui entoure le code et permet à l'appareil photo d'en détecter les bords.",
    ], ul: [
      "Publication Instagram ou story : 200×200 px suffisent.",
      "Carte de visite ou flyer A5 : 500×500 px pour une impression de 3–4 cm.",
      "Affiche grand format : 500×500 px agrandi dans le logiciel de mise en page.",
      "Conservez un contraste élevé : premier plan sombre sur fond clair.",
    ] },
    { h: "La couleur : esthétique, mais à encadrer", p: [
      "Vous pouvez modifier les couleurs, mais l'appareil photo ne voit pas les couleurs : il voit une différence de luminosité. Un code jaune pâle sur fond blanc paraît élégant à l'écran mais sera illisible. Le plus sûr reste du noir, du vert foncé ou du bleu marine sur fond blanc ou très clair.",
      "Évitez les dégradés, la transparence et les logos trop grands au centre. Si vous tenez à ajouter un logo, gardez-le minuscule, centré, puis testez le code avec trois téléphones différents avant de lancer l'impression.",
    ] },
    { h: "Confidentialité : pourquoi insister sur le navigateur ?", p: [
      "Beaucoup de générateurs envoient votre lien à leur serveur, le raccourcissent via leur propre service, puis redirigent les visiteurs à travers leur domaine. Un tiers connaît alors le contenu de votre campagne et peut modifier la destination plus tard. Chez Oudda, rien de tout cela : le lien devient une image sur votre appareil et n'en sort pas.",
      "Dernier conseil : si le code doit rester imprimé longtemps, utilisez une URL que vous contrôlez (votre propre domaine) plutôt qu'un raccourcisseur qui pourrait disparaître. Changer la destination d'un lien imprimé sur mille autocollants coûte très cher.",
    ] },
  ],
  tips: [
    "Testez toujours le code avec l'appareil photo du téléphone, pas avec un lecteur intégré au site.",
    "Laissez une marge blanche d'au moins quatre modules autour du code.",
    "Utilisez des URL courtes pour réduire la densité des modules.",
    "Dans une vidéo, affichez le code au moins 5 secondes pour laisser le temps de sortir le téléphone.",
    "Ne placez pas le code dans un coin masqué par les boutons de la plateforme.",
  ],
  mistakes: [
    "Imprimer le code à moins de 2 cm — personne ne pourra le lire.",
    "Choisir des couleurs claires sans contraste suffisant.",
    "Générer le code via un service inconnu qui raccourcit et contrôle l'URL ensuite.",
    "Oublier de retester après avoir modifié la couleur du fond dans un logiciel de design.",
  ],
  faq: [
    { q: "Puis-je générer un QR code pour un PDF ou un numéro de téléphone ?", a: "Oui. L'outil accepte tout texte : une URL, un numéro au format tel:, une adresse au format mailto: ou du texte brut. Ajoutez le préfixe approprié si vous voulez que le téléphone ouvre une application précise." },
    { q: "Le code que je génère expire-t-il ?", a: "Non. Il s'agit d'un QR code statique : il n'expire jamais et ne demande aucun abonnement. Il fonctionnera tant que l'URL saisie fonctionnera." },
    { q: "Conservez-vous les liens que je saisis ?", a: "Non, jamais. La conversion se fait dans votre navigateur avec une bibliothèque JavaScript open source. Ce site n'a pas de base de données et aucune requête réseau n'est émise lorsque vous tapez votre texte." },
    { q: "Pourquoi mon téléphone ne lit-il pas le code alors qu'il est net ?", a: "Causes fréquentes : contraste insuffisant, absence de zone de silence, taille d'impression trop petite ou reflet sur un support brillant. Essayez d'abord le noir sur blanc, puis ajoutez la couleur progressivement." },
    { q: "Quelle différence entre 200×200 et 500×500 ?", a: "Le nombre de pixels de l'image produite. 200×200 convient aux écrans ; 500×500 donne de la marge pour l'impression sans perte de netteté. On peut toujours réduire une grande image, mais pas agrandir une petite sans flou." },
    { q: "Faut-il un compte ou payer pour télécharger le PNG ?", a: "Non. Le bouton crée le fichier directement depuis le dessin affiché dans votre page. Sans inscription, sans limite, sans filigrane." },
  ],
};

/* ------------------------------------------------------------------ */
/* 2) WORD COUNTER                                                     */
/* ------------------------------------------------------------------ */
const wcAr: ToolDoc = {
  slug: "word-counter", icon: "text", color: "indigo",
  title: "عداد الكلمات والحروف", short: "كلمات، حروف، جمل، فقرات ووقت قراءة في لحظة.",
  h1: "عداد الكلمات والحروف مجانًا — بدون زر، النتيجة تظهر وأنت تكتب",
  intro: [
    "قد يبدو عدّ الكلمات أمرًا بسيطًا، لكنه يحدّد أشياء مهمة: هل سيُقرأ مقالك حتى نهايته؟ هل يناسب وصف الفيديو حدود المنصة؟ هل سيتجاوز منشورك المساحة المتاحة في التصميم؟ لهذا جمعنا في أداة واحدة الكلمات، الحروف مع الفراغات وبدونها، الجمل، الفقرات، ووقت القراءة التقديري.",
    "كل شيء يُحسب داخل متصفحك أثناء الكتابة، بدون ضغط أي زر، وبدون إرسال نصك إلى أي جهة. يمكنك لصق مسودة مقال أو سكريبت فيديو أو منشور طويل وترى الأرقام تتحدّث مباشرة.",
  ],
  sections: [
    { h: "كيف نحسب الكلمات في لغة عربية؟", p: [
      "المنطق الأساسي بسيط: نحذف الفراغات من الطرفين، ثم نقسّم النص على أي سلسلة من الفراغات. لكن العربية تضيف تحديات صغيرة: المسافات العربية الخاصة، الأسطر الجديدة، علامات الترقيم الملصقة بالكلمة، والأرقام المكتوبة بالأحرف. لذلك نتعامل مع كل أنواع الفراغات (بما فيها الفراغ غير القابل للكسر) كفاصل واحد، ونعتبر الكلمة التي تحتوي رقمًا أو شرطة كلمة واحدة.",
      "النص الفارغ يعطي صفرًا لا واحدًا — وهي مشكلة تقنية شائعة في الحلول السريعة التي تستعمل split مباشرة على سلسلة فارغة. تعمّدنا معالجة هذه الحالة لأن صانع المحتوى يفرغ الحقل أحيانًا ليعيد الكتابة، فلا يعقل أن يرى «كلمة واحدة» وهو لم يكتب شيئًا.",
    ] },
    { h: "لماذا نعدّ الجمل والفقرات أصلًا؟", p: [
      "عدد الجمل مؤشّر على إيقاع النص. جمل قليلة جدًا في فقرة واحدة تعني كتلة نصية تُرهب القارئ على الهاتف، وجمل كثيرة جدًا متتالية قصيرة تعطي إحساسًا بالتقطيع. في المتوسط، فقرة من 3 إلى 5 جمل مريحة للقراءة على شاشة صغيرة.",
      "نعدّ الجمل بفصل النص عند النقطة وعلامة الاستفهام وعلامة التعجب — بنسختيها اللاتينية والعربية (؟ و!) — إضافة إلى النقطة العربية (۔) ونقطتي الحذف المتتاليتين. أما الفقرات فتُحسب بتقسيم النص على سطرين فارغين أو أكثر، وهي الطريقة التي يكتب بها معظم الناس مسوداتهم.",
      "وقت القراءة التقديري نحسبه على أساس 200 كلمة في الدقيقة للنص العربي، وهو متوسط واقعي للقراءة الهادئة على شاشة. إن كان نصك تقنيًا أو شعريًا أو مليئًا بالأرقام، فالوقت الفعلي أطول. استعمل الرقم كدليل تقريبي لا كوعد.",
    ] },
    { h: "حدود المنصات التي تستحق أن تعرفها", p: [
      "لكل منصة سقفها الخاص، ومعرفته مسبقًا يوفّر عليك إعادة الكتابة في اللحظة الأخيرة. لا تعتمد على ذاكرتك: ضع هذه الأرقام في مفكرتك أو ارجع إلى هذه الصفحة عند الحاجة.",
    ], ul: [
      "منشور إنستغرام: حتى 2,200 حرف، لكن يظهر منها سطران فقط قبل «المزيد».",
      "وصف فيديو يوتيوب: حتى 5,000 حرف، وأهم جملة يجب أن تكون في أول 100 حرف.",
      "تغريدة/منشور X: 280 حرفًا للحسابات المجانية، وأكثر للمشتركين.",
      "وصف تيك توك: حدود قصيرة نسبيًا، فاجعل الوسوم في النهاية.",
      "عنوان SEO: يفضّل أن يبقى تحت 60 حرفًا حتى لا يُقتطع في نتائج البحث.",
    ] },
    { h: "الخصوصية مهمة هنا أكثر من أي أداة أخرى", p: [
      "النصوص التي نلصقها في عدّاد الكلمات غالبًا ما تكون مسودات غير منشورة: مقال لعميل، سكريبت إعلاني، أو فكرة مشروع. إرسالها إلى خادم مجهول ليس فكرة جيدة. لذلك صمّمنا الأداة لتعمل بالكامل داخل الصفحة: لا نماذج، لا تخزين محلي، لا طلبات شبكة.",
      "يمكنك التحقق بنفسك: افتح أدوات المطوّر في المتصفح، ثم اذهب إلى تبويب الشبكة (Network) واكتب نصًا. لن يظهر أي طلب جديد. هذه هي أسهل طريقة للتأكد من أن أداة «مجانية» لا تجمع مسوداتك.",
    ] },
  ],
  tips: [
    "اكتب المسودة كاملة ثم احذف 10% من الكلمات — غالبًا لن تفتقدها.",
    "استعمل الفقرات القصيرة (3–5 جمل) لأن أغلب قرّائك على الهاتف.",
    "ضع أهم معلومة في أول جملة، فهي التي تظهر في المقتطفات.",
    "احتفظ بعنوانك تحت 60 حرفًا ليبقى كاملًا في نتائج البحث.",
    "للنصوص التقنية، أضف 25% لوقت القراءة التقديري.",
  ],
  mistakes: [
    "اعتبار وقت القراءة رقمًا دقيقًا بدل تقدير تقريبي.",
    "نسيان أن علامات الترقيم تدخل ضمن عدد الحروف.",
    "الاعتماد على عدّاد يرسل النص لخادم خارجي.",
    "قياس النص بالكلمات فقط وتجاهل عدد الحروف في المنصات ذات الحدود الحرفية.",
  ],
  faq: [
    { q: "هل تُحسب علامات الترقيم ضمن الحروف؟", a: "نعم. «عدد الحروف» يشمل كل شيء: الحروف، الأرقام، علامات الترقيم، والفراغات. أما «الحروف بدون فراغات» فيحذف الفراغات فقط ويُبقي علامات الترقيم، وهو الرقم الأقرب لحدود المنصات." },
    { q: "كيف تحسبون وقت القراءة؟", a: "نقسم عدد الكلمات على 200 كلمة في الدقيقة، ثم نقرّب للأعلى مع حد أدنى دقيقة واحدة. هذا متوسط للقراءة الهادئة بالعربية. النصوص التقنية أو التي تحتوي جداول تستغرق وقتًا أطول." },
    { q: "هل تتعامل الأداة مع النص العربي والفرنسي معًا؟", a: "نعم. لا يهم اتجاه الكتابة أو ت مختلط اللغات؛ الفواصل هي الفراغات، وعلامات الاستفهام والتعجب تُعامل بنسختيها العربية واللاتينية. يمكنك لصق نص ثنائي اللغة مباشرة." },
    { q: "هل يمكنني استعمال الأداة بدون إنترنت؟", a: "بعد تحميل الصفحة مرة واحدة، نعم — لأن الحساب كله JavaScript محلي. لن تحتاج اتصالًا إلا إذا أردت إعادة فتح الموقع من جديد." },
    { q: "لماذا يظهر صفر للنص الفارغ؟", a: "لأننا نعالج حالة النص الفارغ صراحةً. الحلول البرمجية السريعة التي تستعمل split دون فحص مسبق تُرجع كلمة واحدة لسلسلة فارغة، وهذا خطأ شائع أصلحناه." },
    { q: "هل تحفظون ما أكتبه؟", a: "لا. لا يوجد تخزين محلي (localStorage) ولا قاعدة بيانات ولا إرسال لأي جهة. أغلق الصفحة وسيختفي النص نهائيًا." },
  ],
};

const wcFr: ToolDoc = {
  slug: "word-counter", icon: "text", color: "indigo",
  title: "Compteur de mots", short: "Mots, caractères, phrases, paragraphes et temps de lecture.",
  h1: "Compteur de mots et de caractères gratuit — résultats en direct, sans bouton",
  intro: [
    "Compter les mots paraît anodin, mais cela détermine des choses importantes : votre article sera-t-il lu jusqu'au bout ? Votre description respecte-t-elle les limites de la plateforme ? Votre texte débordera-t-il de la maquette ? Nous avons donc réuni dans un seul outil les mots, les caractères avec et sans espaces, les phrases, les paragraphes et une estimation du temps de lecture.",
    "Tout est calculé dans votre navigateur pendant la saisie, sans bouton à presser et sans envoyer votre texte à qui que ce soit. Collez un brouillon d'article, un script vidéo ou un long post et voyez les chiffres évoluer immédiatement.",
  ],
  sections: [
    { h: "Comment compte-t-on les mots en arabe ?", p: [
      "La logique de base est simple : on retire les espaces aux extrémités puis on découpe sur toute suite d'espaces. Mais l'arabe ajoute de petits défis : espaces spéciaux, retours à la ligne, ponctuation collée au mot, chiffres écrits en toutes lettres. Nous traitons donc toutes les variantes d'espaces (y compris l'espace insécable) comme un seul séparateur, et un mot contenant un chiffre ou un tiret reste un seul mot.",
      "Un texte vide donne zéro, pas un — c'est un bug fréquent des solutions rapides qui appliquent split à une chaîne vide. Nous avons volontairement traité ce cas, car un créateur vide souvent son champ pour recommencer : il est absurde de voir « 1 mot » alors qu'il n'a rien écrit.",
    ] },
    { h: "Pourquoi compter les phrases et les paragraphes ?", p: [
      "Le nombre de phrases indique le rythme du texte. Trop peu de phrases dans un paragraphe donne un bloc intimidant sur mobile ; une succession de phrases très courtes donne une impression saccadée. En moyenne, un paragraphe de 3 à 5 phrases se lit confortablement sur petit écran.",
      "Nous détectons les phrases sur le point, le point d'interrogation et le point d'exclamation — dans leurs variantes latines et arabes — ainsi que sur les points de suspension. Les paragraphes sont comptés en découpant sur deux retours à la ligne ou plus, comme la plupart des gens rédigent leurs brouillons.",
      "Le temps de lecture est calculé sur 200 mots par minute pour l'arabe, une moyenne réaliste pour une lecture attentive sur écran. Un texte technique, poétique ou rempli de chiffres prendra plus de temps : utilisez ce chiffre comme repère, pas comme promesse.",
    ] },
    { h: "Les limites des plateformes à connaître", p: [
      "Chaque plateforme a son plafond ; le connaître à l'avance évite de réécrire au dernier moment. Ne comptez pas sur votre mémoire : gardez ces chiffres sous la main.",
    ], ul: [
      "Légende Instagram : 2 200 caractères, mais deux lignes seulement avant « plus ».",
      "Description YouTube : 5 000 caractères, la phrase clé doit être dans les 100 premiers.",
      "Post X/Twitter : 280 caractères pour les comptes gratuits.",
      "Description TikTok : limite courte, placez les hashtags à la fin.",
      "Titre SEO : restez sous 60 caractères pour éviter la troncature dans les résultats.",
    ] },
    { h: "Ici, la confidentialité compte plus qu'ailleurs", p: [
      "Les textes collés dans un compteur de mots sont souvent des brouillons non publiés : article pour un client, script publicitaire, idée de projet. Les envoyer à un serveur inconnu est risqué. Notre outil fonctionne donc entièrement dans la page : pas de formulaire, pas de stockage local, pas de requête réseau.",
      "Vérifiez par vous-même : ouvrez les outils de développement, allez dans l'onglet Réseau et tapez du texte. Aucune nouvelle requête n'apparaîtra. C'est la façon la plus simple de vérifier qu'un outil « gratuit » ne collecte pas vos brouillons.",
    ] },
  ],
  tips: [
    "Rédigez le brouillon complet, puis supprimez 10 % des mots : vous n'y verrez que du feu.",
    "Utilisez des paragraphes courts (3–5 phrases), la majorité de vos lecteurs sont sur mobile.",
    "Placez l'information clé dans la première phrase, celle qui apparaît dans les extraits.",
    "Gardez votre titre sous 60 caractères pour qu'il reste entier dans les résultats de recherche.",
    "Pour un texte technique, ajoutez 25 % au temps de lecture estimé.",
  ],
  mistakes: [
    "Prendre le temps de lecture pour une valeur exacte plutôt que pour une estimation.",
    "Oublier que la ponctuation compte dans le nombre de caractères.",
    "Utiliser un compteur qui envoie le texte à un serveur externe.",
    "Mesurer uniquement les mots alors que la plateforme impose une limite en caractères.",
  ],
  faq: [
    { q: "La ponctuation compte-t-elle dans les caractères ?", a: "Oui. « Caractères » inclut tout : lettres, chiffres, ponctuation et espaces. « Caractères sans espaces » retire seulement les espaces et garde la ponctuation : c'est le chiffre le plus proche des limites des plateformes." },
    { q: "Comment calculez-vous le temps de lecture ?", a: "On divise le nombre de mots par 200 mots par minute, puis on arrondit à l'entier supérieur avec un minimum d'une minute. C'est une moyenne pour une lecture attentive en arabe. Les textes techniques prennent plus de temps." },
    { q: "L'outil gère-t-il un texte arabe et français mélangés ?", a: "Oui. Peu importe le sens d'écriture ou le mélange des langues : les séparateurs sont les espaces et les marques de ponctuation sont reconnues dans leurs variantes arabe et latine." },
    { q: "Puis-je utiliser l'outil hors ligne ?", a: "Oui, après un premier chargement de la page : tout le calcul est en JavaScript local. Vous n'aurez besoin du réseau que pour rouvrir le site." },
    { q: "Pourquoi un texte vide affiche-t-il zéro ?", a: "Parce que nous traitons explicitement ce cas. Les implémentations rapides qui utilisent split sans vérification préalable renvoient un mot pour une chaîne vide : c'est une erreur classique que nous avons corrigée." },
    { q: "Conservez-vous ce que j'écris ?", a: "Non. Pas de localStorage, pas de base de données, pas d'envoi. Fermez la page et le texte disparaît définitivement." },
  ],
};

/* ------------------------------------------------------------------ */
/* 3) PASSWORD GENERATOR                                               */
/* ------------------------------------------------------------------ */
const pwAr: ToolDoc = {
  slug: "password-generator", icon: "lock", color: "amber",
  title: "مولّد كلمات سر قوية", short: "كلمة سر عشوائية بطولك وشروطك، مع مؤشّر قوة.",
  h1: "مولّد كلمات سر قوية — عشوائية حقيقية داخل متصفحك",
  intro: [
    "أضعف نقطة في أمن أي صانع محتوى ليست المنصة التي يستعملها، بل كلمة السر التي يعيد استعمالها في خمسة مواقع. اختراق واحد لحساب بريد قد يعني فقدان قناتك، صفحتك، وملفاتك دفعة واحدة. هذه الأداة تولّد لك كلمة سر عشوائية طويلة وتخبرك بمستوى قوتها قبل أن تستعملها.",
    "الفرق الجوهري عن كثير من الأدوات المشابهة: نستعمل مولّد الأرقام العشوائية المشفّر المدمج في المتصفح (crypto.getRandomValues) وليس الدالة العشوائية غير المشفّرة. كما أن الكلمة لا تُرسل لأي خادم، ولا تُحفظ، ولا تُسجَّل في أي مكان.",
  ],
  sections: [
    { h: "لماذا لا تكفي الدالة العشوائية غير المشفّرة؟", p: [
      "الدالة العشوائية غير المشفّرة في JavaScript صُمّمت للمحاكاة والألعاب، لا للأمن. قيمها قابلة للتوقّع نسبيًا لأنها مبنية على مولّد داخلي ذي حالة (state) يمكن استنتاجها في بعض الظروف. بالنسبة لكلمة سر، هذا يعني أن مهاجمًا يعرف لحظة التوليد قد يضيّق احتمالات البحث بشكل كبير.",
      "بديلها الصحيح هو Web Crypto API وتحديدًا crypto.getRandomValues()، الذي يطلب أرقامًا عشوائية من نظام التشغيل نفسه. هذا ما نستعمله هنا. نطبّق كذلك رفضًا للقيم الخارجة عن النطاق (rejection sampling) لتفادي الانحياز عند تحويل الأرقام إلى حروف، لأن استعمال باقي القسمة مباشرة يجعل بعض الحروف تظهر أكثر من غيرها.",
    ] },
    { h: "كيف نحسب قوة كلمة السر؟", p: [
      "القوة الحقيقية تُقاس بـ «الإنتروبيا»: عدد البتات التي يحتاج المهاجم لتخمينها. تقريبها العملي هو: طول الكلمة × اللوغاريتم الثنائي لحجم مجموعة الحروف المستعملة. كلمة من 12 حرفًا من مجموعة مكوّنة من 94 حرفًا تعطي حوالي 78 بتًا — وهذا قوي جدًا. كلمة من 8 حروف صغيرة فقط تعطي حوالي 38 بتًا، وهي تُخمَن بسرعة.",
      "لذلك لا نبني مؤشّر القوة على الطول وحده، بل على الطول مع تنوّع الحروف. شريطنا يعرض ثلاث درجات: ضعيف (أقل من 50 بتًا)، متوسط (50–79 بتًا)، وقوي (80 بتًا فأكثر). إن أردت حسابات حساسة فاختر 16 حرفًا على الأقل مع تفعيل كل الخيارات الأربعة.",
    ] },
    { h: "أين تحفظ كلمة السر بعد توليدها؟", p: [
      "أفضل إجابة: لا تحفظها في ذاكرتك ولا في ملف نصي، بل في مدير كلمات سر موثوق. المتصفحات الحديثة تتضمّن مديرًا مدمجًا، وهناك تطبيقات مفتوحة المصدر معروفة. المدير يحفظ كلمات طويلة ومعقّدة لكل موقع على حدة، فلا تضطر لتذكّرها ولا تُغريك إعادة استعمالها.",
      "فعّل كذلك المصادقة الثنائية (2FA) على بريدك وقناتك، ويفضّل استعمال تطبيق مصادقة بدل الرسائل القصيرة إن أمكن. كلمة السر القوية تحميك من التخمين، لكن المصادقة الثنائية تحميك حتى لو تسرّبت كلمة السر من مكان آخر.",
      "تنبيه صريح: هذه الأداة تعليمية. لا يمكننا ضمان أمن كلمة سر على جهاز مصاب ببرامج خبيثة، ولا نقدّم استشارة أمنية متخصّصة. للشركات والأنظمة الحسّاسة، راجع مختص أمن معلومات.",
    ] },
  ],
  tips: [
    "اختر 16 حرفًا أو أكثر لحسابات البريد والقنوات، و12 على الأقل لباقي الحسابات.",
    "فعّل الأنواع الأربعة (كبيرة، صغيرة، أرقام، رموز) لرفع الإنتروبيا.",
    "لا تعِد استعمال نفس الكلمة في موقعين — استعمل كلمة مختلفة لكل حساب.",
    "خزّنها في مدير كلمات سر ولا تشاركها عبر الرسائل أو البريد.",
    "فعّل المصادقة الثنائية على حسابك الأساسي قبل أي شيء آخر.",
  ],
  mistakes: [
    "استعمال الدالة العشوائية غير المشفّرة في توليد كلمات سر (غير آمن تشفيريًا).",
    "اختيار 8 حروف فقط ثم الاعتقاد أن التنويع يعوّض الطول.",
    "نسخ الكلمة إلى ملف نصي أو ملاحظة غير مشفّرة على الهاتف.",
    "إرسال كلمة السر لنفسك عبر واتساب أو بريد إلكتروني.",
    "إعادة استعمال كلمة قديمة ظهرت في تسريب بيانات سابق.",
  ],
  faq: [
    { q: "هل تُرسل كلمة السر إلى خادمكم؟", a: "لا، إطلاقًا. التوليد يتم داخل المتصفح باستعمال crypto.getRandomValues(). لا توجد قاعدة بيانات ولا طلبات شبكة، ونص الكلمة لا يترك صفحتك." },
    { q: "ما الفرق بين هذه الأداة وأداة تستعمل الدالة العشوائية غير المشفّرة؟", a: "الدالة العشوائية غير المشفّرة مولّد عشوائي زائف مخصّص للأغراض غير الأمنية وقابل للتوقّع نسبيًا. Web Crypto API يطلب عشوائية من نظام التشغيل، وهو المعيار المقبول لتوليد كلمات السر." },
    { q: "كم حرفًا يكفي؟", a: "لحساب بريد أو قناة: 16 حرفًا على الأقل مع الأنواع الأربعة. 12 حرفًا مقبول للحسابات الأقل أهمية. تجنّب أقل من 10 أحرف تمامًا." },
    { q: "ماذا يعني شريط القوة؟", a: "نحسب الإنتروبيا التقريبية = الطول × log2(عدد الحروف المتاحة). أقل من 50 بتًا ضعيف، 50–79 متوسط، و80+ قوي. هذا تقدير رياضي لا يأخذ في الحسبان القواميس أو الكلمات الشائعة." },
    { q: "هل يمكنني استبعاد الرموز لأن بعض المواقع ترفضها؟", a: "نعم. يمكنك تعطيل أي نوع من الأنواع الأربعة. لكن تأكّد من إبقاء نوع واحد على الأقل مفعّلًا، وزد الطول لتعويض تقليل التنويع." },
    { q: "هل تحفظون آخر كلمة ولّدتها؟", a: "لا. لا نستعمل localStorage ولا أي تخزين. إذا أغلقت الصفحة قبل نسخ الكلمة، ستحتاج توليد كلمة جديدة." },
  ],
};

const pwFr: ToolDoc = {
  slug: "password-generator", icon: "lock", color: "amber",
  title: "Générateur de mots de passe", short: "Un mot de passe aléatoire, avec indicateur de robustesse.",
  h1: "Générateur de mots de passe forts — aléa cryptographique dans votre navigateur",
  intro: [
    "Le point faible d'un créateur de contenu n'est pas la plateforme qu'il utilise, mais le mot de passe réemployé sur cinq sites. Un seul compte e-mail piraté peut faire perdre la chaîne, la page et les fichiers d'un coup. Cet outil génère un mot de passe aléatoire long et vous indique sa robustesse avant usage.",
    "Différence essentielle avec beaucoup d'outils similaires : nous utilisons le générateur cryptographique intégré au navigateur (crypto.getRandomValues) et non la fonction aléatoire non cryptographique. Le mot de passe n'est ni envoyé à un serveur, ni conservé, ni journalisé.",
  ],
  sections: [
    { h: "Pourquoi la fonction aléatoire non cryptographique ne suffit pas ?", p: [
      "La fonction aléatoire non cryptographique en JavaScript a été conçue pour les simulations et les jeux, pas pour la sécurité. Ses valeurs sont relativement prévisibles car elles proviennent d'un générateur à état interne qui peut être déduit dans certaines conditions. Pour un mot de passe, un attaquant qui connaît le moment de la génération peut réduire considérablement l'espace de recherche.",
      "L'alternative correcte est la Web Crypto API, précisément crypto.getRandomValues(), qui demande de l'aléa au système d'exploitation. C'est ce que nous utilisons. Nous appliquons aussi un rejet des valeurs hors plage (rejection sampling) pour éviter le biais lors de la conversion des nombres en caractères : un simple modulo rendrait certains caractères plus fréquents que d'autres.",
    ] },
    { h: "Comment mesure-t-on la robustesse ?", p: [
      "La vraie robustesse se mesure en « entropie » : le nombre de bits qu'un attaquant doit deviner. On l'approxime par : longueur × logarithme en base 2 de la taille du jeu de caractères. Un mot de 12 caractères pris parmi 94 symboles donne environ 78 bits — c'est très solide. Un mot de 8 minuscules seulement donne environ 38 bits et se devine vite.",
      "Notre indicateur ne repose donc pas seulement sur la longueur, mais sur la longueur combinée à la diversité. Trois niveaux : faible (moins de 50 bits), moyen (50–79 bits) et fort (80 bits et plus). Pour un compte sensible, choisissez au moins 16 caractères avec les quatre options activées.",
    ] },
    { h: "Où conserver le mot de passe ensuite ?", p: [
      "Meilleure réponse : ni dans votre mémoire ni dans un fichier texte, mais dans un gestionnaire de mots de passe fiable. Les navigateurs modernes en intègrent un, et il existe des applications open source reconnues. Le gestionnaire retient un mot long et unique par site : plus besoin de le mémoriser, plus de tentation de le réutiliser.",
      "Activez aussi la double authentification (2FA) sur votre e-mail et votre chaîne, de préférence avec une application d'authentification plutôt que par SMS. Un mot de passe fort protège contre le devinage ; la 2FA protège même si le mot de passe fuit ailleurs.",
      "Avertissement clair : cet outil est pédagogique. Nous ne pouvons garantir la sécurité d'un mot de passe sur un appareil infecté et nous ne fournissons pas de conseil en sécurité professionnel. Pour une entreprise, consultez un spécialiste.",
    ] },
  ],
  tips: [
    "Choisissez 16 caractères ou plus pour l'e-mail et les chaînes, 12 au minimum pour le reste.",
    "Activez les quatre types (majuscules, minuscules, chiffres, symboles) pour augmenter l'entropie.",
    "N'utilisez jamais le même mot de passe sur deux sites.",
    "Stockez-le dans un gestionnaire, ne l'envoyez pas par message ou e-mail.",
    "Activez la double authentification sur le compte principal avant toute autre chose.",
  ],
  mistakes: [
    "Utiliser la fonction aléatoire non cryptographique pour générer un mot de passe (non sûr cryptographiquement).",
    "Choisir 8 caractères en pensant que la diversité compense la longueur.",
    "Copier le mot de passe dans un fichier texte ou une note non chiffrée.",
    "S'envoyer le mot de passe par WhatsApp ou par e-mail.",
    "Réutiliser un ancien mot de passe apparu dans une fuite de données.",
  ],
  faq: [
    { q: "Le mot de passe est-il envoyé à votre serveur ?", a: "Non, jamais. La génération se fait dans le navigateur avec crypto.getRandomValues(). Pas de base de données, pas de requête réseau : le mot de passe ne quitte pas la page." },
    { q: "Quelle différence avec un outil basé sur la fonction aléatoire non cryptographique ?", a: "La fonction aléatoire non cryptographique est un générateur pseudo-aléatoire non sécuritaire, relativement prévisible. La Web Crypto API puise son aléa dans le système d'exploitation : c'est la norme admise pour les mots de passe." },
    { q: "Combien de caractères suffisent ?", a: "Pour un e-mail ou une chaîne : 16 caractères minimum avec les quatre types. 12 caractères sont acceptables pour des comptes secondaires. Évitez totalement moins de 10 caractères." },
    { q: "Que signifie l'indicateur de robustesse ?", a: "Nous calculons l'entropie approximative = longueur × log2(nombre de caractères disponibles). Moins de 50 bits : faible ; 50–79 : moyen ; 80+ : fort. C'est une estimation mathématique qui ne tient pas compte des dictionnaires." },
    { q: "Puis-je désactiver les symboles car certains sites les refusent ?", a: "Oui. Vous pouvez désactiver chacun des quatre types, mais gardez-en au moins un actif et augmentez la longueur pour compenser la perte de diversité." },
    { q: "Conservez-vous le dernier mot de passe généré ?", a: "Non. Aucun localStorage, aucun stockage. Si vous fermez la page avant de le copier, il faudra en générer un nouveau." },
  ],
};

/* ------------------------------------------------------------------ */
/* 4) YOUTUBE THUMBNAIL                                                */
/* ------------------------------------------------------------------ */
const ytAr: ToolDoc = {
  slug: "youtube-thumbnail", icon: "play", color: "rose",
  title: "عارض صور يوتيوب المصغّرة", short: "اعرض صور الفيديو المصغّرة بأربعة مقاسات وانسخ روابطها.",
  h1: "عارض الصور المصغّرة لفيديوهات يوتيوب — أربعة مقاسات بلا API",
  intro: [
    "تحتاج أحيانًا أن ترى الصورة المصغّرة لفيديو ما بحجمها الحقيقي: لتحلّل تصميم منافس، لتختار لقطة غلاف لمقالك، أو لتتأكد أن الفيديو الذي ستضمّنه في عرضك التقديمي هو الفيديو الصحيح. هذه الأداة تستخرج معرّف الفيديو من الرابط وتعرض لك صوره المصغّرة بأربعة مقاسات.",
    "المميزات واضحة: لا تحتاج مفتاح API، ولا تسجيل دخول، ولا أي خدمة وسيطة. نبني روابط الصور المباشرة من خادم صور يوتيوب العام (img.youtube.com) ونتيح لك فتحها أو نسخ رابطها. كل ما تكتبه يبقى في متصفحك.",
  ],
  sections: [
    { h: "صيغ الروابط التي نتعرّف عليها", p: [
      "ندعم الصيغ الأكثر شيوعًا: الرابط الطويل youtube.com/watch?v=ID، الرابط المختصر youtu.be/ID، روابط الريلز youtube.com/shorts/ID، وروابط التضمين /embed/ID والبث المباشر /live/ID. نستخرج المعرّف المكوّن عادة من 11 حرفًا ثم نبني عليه روابط الصور.",
      "إن لم يتعرّف الموقع على رابطك، فالأغلب أنه يحتوي معاملات إضافية (مثل &t=30s أو &si=…) أو أنه منسوخ من تطبيق الهاتف بصيغة غير معتادة. جرّب نسخ الرابط من شريط العنوان في المتصفح بدل خيار «مشاركة» داخل التطبيق.",
    ] },
    { h: "المقاسات الأربعة ومتى تستعمل كل واحد", p: [
      "يوفّر يوتيوب عدة نسخ من صورة كل فيديو. نعرض أربعًا منها، ولكل واحدة استعمال عملي مختلف. المهم أن تعرف أن المقاسات الصغيرة موجودة دائمًا لكل فيديو، بينما النسخة الأكبر قد لا تكون متاحة دائمًا.",
    ], ul: [
      "default.jpg — 120×90: أيقونة صغيرة جدًا، مفيدة في قوائم مزدحمة.",
      "mqdefault.jpg — 320×180: معاينة متوسطة بنسبة 16:9، مناسبة لمقال أو عرض تقديمي.",
      "hqdefault.jpg — 480×360: النسخة الأكثر موثوقية، موجودة لكل فيديو عمليًا.",
      "maxresdefault.jpg — 1280×720: الأعلى دقة، لكنها غير متاحة لنحو فيديو من كل تسعة.",
    ] },
    { h: "لماذا قد ترى صورة رمادية بدل الصورة الكبيرة؟", p: [
      "هذه أشهر مشكلة تقنية في هذا المجال. نسخة maxresdefault.jpg لا تُنشأ إلا إذا رفع صاحب القناة صورة مخصّصة بدقة عالية أو كان الفيديو بدقة 720p فأعلى. إن لم تكن موجودة، لا يردّ الخادم خطأً واضحًا دائمًا، بل قد يعيد صورة رمادية صغيرة بحجم 120×90 — أي أن وسم الصورة «يُحمّل» لكن المحتوى ليس الصورة الحقيقية.",
      "طريقة الكشف الصحيحة إذن ليست انتظار حدث التحميل فقط، بل فحص العرض الطبيعي للصورة (naturalWidth): إن كان 120 بكسل أو أقل، فهي صورة بديلة وليست المقاس المطلوب. أداتنا تتحقق من ذلك وتنتقل تلقائيًا إلى النسخة الأقل (sddefault ثم hqdefault) لتعرض لك أكبر صورة حقيقية متاحة مع إعلامك بذلك.",
    ] },
    { h: "لماذا لا نوفّر زر «تحميل» مباشر؟", p: [
      "سبب تقني وسبب قانوني. تقنيًا: خادم صور يوتيوب لا يرسل ترويسات CORS التي تسمح لصفحة ويب بقراءة بكسلات الصورة، لذا أي محاولة لحفظ الصورة عبر canvas تُرفض من المتصفح (Tainted Canvas). أي موقع يدّعي تحميل الصورة مباشرة إمّا يستعمل خادمًا وسيطًا (أي أنه يمرّر طلبك عبر سيرفره) أو يخدعك بزر يفتح الصورة فحسب.",
      "قانونيًا: الصورة المصغّرة من صنع صاحب القناة، وحقوقها له. لهذا نفضّل أن نعرضها للمراجعة والتحليل، ونمنحك رابطها المباشر لاستعمله وفق شروط يوتيوب وusage équitable، بدل تشجيع التحميل الجماعي لمحتوى الغير. إن أردت حفظها، افتح الرابط في تبويب جديد ثم استعمل «حفظ الصورة باسم» من متصفحك، وتأكد أن لديك حق استعمالها.",
    ] },
  ],
  tips: [
    "استعمل hqdefault.jpg حين تحتاج صورة مضمونة الوجود في كل الحالات.",
    "لتحليل تصميم منافس، قارن أكثر من صورة مصغّرة ولا تقلّدها حرفيًا.",
    "لا تبنِ مقالك على maxresdefault وحدها — قد تختفي في فيديوهات قديمة.",
    "احترم حقوق صانع الفيديو عند إعادة استعمال أي صورة.",
    "استعمل الرابط المباشر داخل عروضك التقديمية بدل رفع نسخة بجودة أقل.",
  ],
  mistakes: [
    "افتراض أن maxresdefault.jpg موجودة دائمًا.",
    "تجاهل الصورة الرمادية 120×90 واعتبارها الصورة الحقيقية.",
    "محاولة تحميل الصورة عبر canvas دون CORS.",
    "استعمال صور الغير في تصاميم تجارية دون إذن.",
  ],
  faq: [
    { q: "هل أحتاج مفتاح API أو حساب Google؟", a: "لا. الأداة تبني روابط الصور العامة مباشرة من معرّف الفيديو. لا توجد مفاتيح، ولا تسجيل دخول، ولا حصة استخدام." },
    { q: "ما الصيغ المدعومة من رابط الفيديو؟", a: "watch?v=، youtu.be/، shorts/، embed/، live/، والروابط التي تحتوي معاملات إضافية. نستخرج المعرّف ون نتجاهل الباقي." },
    { q: "لماذا الصورة الكبيرة تظهر رمادية؟", a: "لأن نسخة maxresdefault.jpg غير متاحة لهذا الفيديو. أداتنا تكتشف ذلك عبر naturalWidth وتنتقل تلقائيًا إلى sddefault ثم hqdefault." },
    { q: "هل يمكنني تحميل الصورة مباشرة؟", a: "لا نوفر زر تحميل مباشر لأسباب تقنية (CORS) وحقوقية (الصورة مملوكة لصاحب القناة). يمكنك فتح الرابط في تبويب جديد وحفظه من متصفحك إن كان لديك الحق في استعماله." },
    { q: "هل تحفظون روابط الفيديوهات التي أبحث عنها؟", a: "لا. المعالجة محلية بالكامل؛ الرابط لا يُرسل لأي خادم من خوادمنا. طلب الصورة نفسه يذهب إلى خادم يوتيوب لأن المتصفح يعرضها، وهذا موضح في سياسة الخصوصية." },
    { q: "هل هذه الأداة تابعة ليوتيوب أو Google؟", a: "لا. عُدّة موقع مستقل غير مرتبط بشركة Google أو يوتيوب. نستعمل فقط روابط الصور العامة التي يتيحها يوتيوب للجميع." },
  ],
};

const ytFr: ToolDoc = {
  slug: "youtube-thumbnail", icon: "play", color: "rose",
  title: "Visionneuse de miniatures YouTube", short: "Affichez 4 tailles et copiez leurs liens.",
  h1: "Visionneuse de miniatures YouTube — quatre tailles, sans API",
  intro: [
    "Vous avez parfois besoin de voir la miniature d'une vidéo en taille réelle : analyser le design d'un concurrent, choisir une image de couverture pour un article, ou vérifier que la vidéo à intégrer dans une présentation est la bonne. Cet outil extrait l'identifiant de la vidéo et affiche ses miniatures en quatre tailles.",
    "Les avantages sont simples : pas de clé API, pas de connexion, pas de service intermédiaire. Nous construisons les URL directes des images depuis le CDN public de YouTube (img.youtube.com) et vous pouvez les ouvrir ou copier leur lien. Tout ce que vous saisissez reste dans votre navigateur.",
  ],
  sections: [
    { h: "Les formats d'URL reconnus", p: [
      "Nous gérons les formats courants : youtube.com/watch?v=ID, le raccourci youtu.be/ID, les shorts youtube.com/shorts/ID, les liens d'intégration /embed/ID et les direct /live/ID. Nous extrayons l'identifiant (généralement 11 caractères) puis construisons les URL d'images.",
      "Si votre lien n'est pas reconnu, c'est souvent qu'il contient des paramètres supplémentaires (&t=30s, &si=…) ou qu'il a été copié depuis l'application mobile. Essayez de copier l'URL depuis la barre d'adresse du navigateur plutôt que via « Partager ».",
    ] },
    { h: "Les quatre tailles et leur usage", p: [
      "YouTube conserve plusieurs versions de la miniature de chaque vidéo. Nous en affichons quatre, chacune avec un usage pratique. Retenez surtout que les petites tailles existent toujours pour toutes les vidéos, alors que la plus grande peut manquer.",
    ], ul: [
      "default.jpg — 120×90 : toute petite icône, utile dans une liste dense.",
      "mqdefault.jpg — 320×180 : aperçu moyen en 16:9, idéal pour un article ou une présentation.",
      "hqdefault.jpg — 480×360 : la version la plus fiable, présente pour quasiment toutes les vidéos.",
      "maxresdefault.jpg — 1280×720 : la plus haute définition, absente pour environ une vidéo sur neuf.",
    ] },
    { h: "Pourquoi une image grise à la place de la grande ?", p: [
      "C'est le piège technique le plus fréquent. La version maxresdefault.jpg n'est créée que si le créateur a importé une miniature personnalisée en haute définition ou si la vidéo est en 720p ou plus. Sinon, le serveur ne renvoie pas toujours une erreur claire : il peut renvoyer une petite image grise de 120×90. La balise image « charge » donc, mais le contenu n'est pas la vraie miniature.",
      "La bonne détection ne consiste donc pas à attendre l'événement de chargement, mais à vérifier la largeur naturelle (naturalWidth) : si elle vaut 120 px ou moins, c'est un substitut. Notre outil effectue cette vérification et bascule automatiquement sur la version inférieure (sddefault puis hqdefault) en vous l'indiquant.",
    ] },
    { h: "Pourquoi pas de bouton « télécharger » direct ?", p: [
      "Une raison technique et une raison juridique. Techniquement, le CDN d'images de YouTube n'envoie pas les en-têtes CORS qui permettraient à une page web de lire les pixels de l'image : toute tentative de sauvegarde via canvas est bloquée (Tainted Canvas). Un site qui prétend télécharger directement utilise donc un serveur relais — ou un bouton qui ne fait qu'ouvrir l'image.",
      "Juridiquement, la miniature est créée par l'auteur de la chaîne et lui appartient. Nous préférons l'afficher pour analyse et vous donner son lien direct, à utiliser selon les conditions de YouTube et un usage équitable, plutôt que d'encourager le téléchargement en masse du contenu d'autrui. Pour l'enregistrer, ouvrez le lien dans un nouvel onglet puis « Enregistrer l'image sous », en vous assurant d'en avoir le droit.",
    ] },
  ],
  tips: [
    "Utilisez hqdefault.jpg quand vous avez besoin d'une image garantie.",
    "Pour analyser un concurrent, comparez plusieurs miniatures sans les copier telles quelles.",
    "Ne basez pas un article sur maxresdefault seule : elle manque sur les anciennes vidéos.",
    "Respectez les droits du créateur lors de toute réutilisation.",
    "Utilisez le lien direct dans vos présentations plutôt qu'une copie de moindre qualité.",
  ],
  mistakes: [
    "Supposer que maxresdefault.jpg existe toujours.",
    "Prendre l'image grise 120×90 pour la vraie miniature.",
    "Tenter un téléchargement via canvas sans CORS.",
    "Réutiliser des images d'autrui dans des visuels commerciaux sans autorisation.",
  ],
  faq: [
    { q: "Ai-je besoin d'une clé API ou d'un compte Google ?", a: "Non. L'outil construit les URL publiques des images à partir de l'identifiant. Aucune clé, aucune connexion, aucun quota." },
    { q: "Quels formats d'URL sont pris en charge ?", a: "watch?v=, youtu.be/, shorts/, embed/, live/ et les liens avec paramètres supplémentaires. Nous extrayons l'identifiant et ignorons le reste." },
    { q: "Pourquoi la grande image est-elle grise ?", a: "Parce que maxresdefault.jpg n'existe pas pour cette vidéo. L'outil le détecte via naturalWidth et bascule automatiquement sur sddefault puis hqdefault." },
    { q: "Puis-je télécharger l'image directement ?", a: "Nous ne proposons pas de téléchargement direct pour des raisons techniques (CORS) et juridiques (l'image appartient au créateur). Vous pouvez ouvrir le lien dans un nouvel onglet et l'enregistrer depuis le navigateur si vous en avez le droit." },
    { q: "Conservez-vous les liens que je recherche ?", a: "Non. Le traitement est entièrement local ; aucun lien n'est envoyé à nos serveurs. La requête d'image, elle, va vers le CDN de YouTube puisque le navigateur l'affiche — c'est précisé dans la politique de confidentialité." },
    { q: "Cet outil est-il lié à YouTube ou Google ?", a: "Non. Oudda est un site indépendant, non affilié à Google ou YouTube. Nous utilisons uniquement les URL d'images publiques mises à disposition par YouTube." },
  ],
};

/* ------------------------------------------------------------------ */
/* 5) HASHTAG GENERATOR                                                */
/* ------------------------------------------------------------------ */
const htAr: ToolDoc = {
  slug: "hashtag-generator", icon: "hash", color: "violet",
  title: "مولّد الهاشتاغات", short: "30 هاشتاغًا مقسّمة صغيرة ومتوسطة وكبيرة، مع نسخ الكل.",
  h1: "مولّد هاشتاغات مجاني — 30 وسمًا مقسّمة حسب المنافسة",
  intro: [
    "الهاشتاغ ليس زينة توضع في نهاية المنشور، بل إشارة تصنيف تساعد المنصة على فهم موضوعك وعرضه على المهتمين به. المشكلة أن أغلب صانعي المحتوى يستعملون نفس الوسوم العملاقة (#love #viral #fyp) فيضيع منشورهم بين ملايين المنشورات خلال ثوانٍ.",
    "أداة عُدّة تعطيك ثلاثين وسمًا مقسّمة إلى ثلاث مجموعات: عشرة صغيرة (منافسة ضعيفة، فرصة ظهور عالية)، عشرة متوسطة، وعشرة كبيرة (انتشار واسع لكن منافسة شديدة). النتيجة مبنية على قاعدة بيانات ثابتة مكتوبة محليًا، لا على ذكاء اصطناعي مدفوع ولا على أي API.",
  ],
  sections: [
    { h: "لماذا نقسّم الوسوم إلى ثلاث فئات؟", p: [
      "تخيّل أنك تفتح محلًا صغيرًا في مدينة مزدحمة. إن وضعت لافتة تقول «محل» فلن يميّزك أحد، وإن وضعت لافتة تقول «محل بيع أقلام الرصاص الخضراء في الحي الفلاني» فلن يفهمها أحد. التوازن هو أن تمزج بين كلمات عامة تعرّف مجالك، وكلمات محدّدة تصف محتواك بدقة.",
      "الوسوم الكبيرة تمنحك فرصة الوصول إلى جمهور ضخم لكن لثوانٍ قليلة. الوسوم الصغيرة لا تجلب آلاف المشاهدات، لكن من يراها مهتم فعلًا بموضوعك، وقد يبقى متابعًا. المزج بين الفئات الثلاث هو ما نسمّيه «هرم الوسوم»، وهو التوزيع الذي نطبّقه في النتيجة.",
    ] },
    { h: "قاعدة البيانات المحلية", p: [
      "أعددنا حزمًا جاهزة لمجالات متعددة: كرة القدم والبطولة المغربية، الطبخ المغربي، السفر، الموضة، التقنية، التعليم، الأعمال، اللياقة، التصوير، والموسيقى. كل حزمة مكتوبة بعناية وتضم وسومًا بالعربية وأخرى بالفرنسية أو الإنجليزية حسب ما يستعمله الجمهور فعلًا على المنصة.",
      "إن كتبت كلمة غير موجودة في القاعدة، لا نعطيك صفحة فارغة: نحوّل كلمتك إلى وسم صالح (نحذف الفراغات وعلامات الترقيم والتشكيل) ثم نضيف إليها وسومًا عامة مناسبة للمنصة. بهذا تحصل دائمًا على ثلاثين وسمًا قابلة للاستعمال مباشرة.",
      "نظافة النص مهمة: الوسم لا يقبل الفراغات، ويُفضّل ألا يحتوي على رموز خاصة. إن كتبت «كرة قدم!» فسينتج #كرة_قدم بدون علامة التعجب. جرّب أكثر من صيغة للكلمة المفتاحية لتحصل على تنوّع أكبر.",
    ] },
    { h: "تيك توك أم إنستغرام؟", p: [
      "القاعدة الذهبية الآن على المنصتين: الجودة أهم من الكمية. ثلاثون وسمًا رقم أقصى معقول للمحتوى الغني؛ أما في العادة فاستعمل من 5 إلى 12 وسمًا شديد الصلة بموضوعك. انسخ المجموعة كاملة ثم احذف ما لا يناسب منشورك فعلًا — الوسم غير ذي الصلة يضرّ أكثر مما ينفع.",
      "على تيك توك، تؤدي الوسوم وظيفة إضافية هي فهم موضوع الفيديو، لذا اجعل الوسم الأول مرتبطًا مباشرة بما يظهر في الفيديو. على إنستغرام، يفضّل وضع الوسوم في نهاية الوصف أو في أول تعليق، مع ترتيبها من الأكثر تحديدًا إلى الأعمّ.",
      "لا تنسَ أن الوسوم وحدها لا تصنع انتشارًا. أول ثلاث ثوانٍ من الفيديو، وضوح الصورة المصغّرة، وسؤال في نهاية الوصف تدعو فيه للتعليق — كلها عوامل أقوى من أي وسم. استعمل هذه الأداة كمساعد، لا كبديل عن فكرة جيدة.",
    ] },
  ],
  tips: [
    "اختر من 5 إلى 12 وسمًا من النتيجة، لا تنسخ الثلاثين آليًا دائمًا.",
    "ابدأ بالوسوم الأكثر تحديدًا ثم انتقل للأعمّ.",
    "احذف أي وسم لا يصف محتوى المنشور فعلًا، حتى لو كان شائعًا.",
    "جرّب صيغًا مختلفة للكلمة المفتاحية (مفرد/جمع، عربي/فرنسي).",
    "تابع أي الوسوم جلبت لك مشاهدات في إحصائيات المنصة ودوّنها.",
    "لا تستعمل وسومًا محظورة أو مخالفة لقواعد المنصة — فهي تقلّل الوصول.",
  ],
  mistakes: [
    "نسخ نفس قائمة الوسوم في كل منشور دون تغيير.",
    "استعمال وسوم رائجة لا علاقة لها بالمحتوى.",
    "الاعتقاد أن كثرة الوسوم تعوّض ضعف الفكرة.",
    "إضافة فراغات أو رموز داخل الوسم فيفقد معناه.",
    "نسيان أن الوسوم قد تختلف قواعدها بين تيك توك وإنستغرام.",
  ],
  faq: [
    { q: "هل تستعملون نموذج ذكاء اصطناعي أو واجهة برمجية مدفوعة؟", a: "لا، إطلاقًا. كل الوسوم مأخوذة من قاعدة بيانات ثابتة مكتوبة داخل المشروع. لا توجد مفاتيح، ولا تكلفة، ولا إرسال لكلمتك المفتاحية إلى أي خدمة خارجية." },
    { q: "ماذا يحدث إن كتبت كلمة غير موجودة في القاعدة؟", a: "نحوّل كلمتك إلى وسم صالح (بدون فراغات ولا رموز) ثم نكمّل النتيجة بوسوم عامة مناسبة للمنصة، فتحصل دائمًا على 30 وسمًا." },
    { q: "هل 30 وسمًا رقم مثالي؟", a: "لا. ثلاثون هي أقصى ما تعطيه الأداة لتختار منه. عمليًا، من 5 إلى 12 وسمًا دقيقًا أفضل من 30 وسمًا عامًا. انسخ الكل ثم احذف ما لا يناسبك." },
    { q: "هل الوسوم العربية تشتغل على المنصات؟", a: "نعم، وتزداد أهميتها مع نمو المحتوى العربي. نمزج بين العربية والفرنسية/الإنجليزية في النتائج لأن جمهور المغرب والمنطقة يستعمل الخليط نفسه." },
    { q: "هل تضمن الوسوم الانتشار؟", a: "لا، ولا أي أداة تضمن ذلك. الوسوم عامل واحد ضمن عوامل كثيرة: جودة الفكرة، أول ثوانٍ من الفيديو، الصورة المصغّرة، وتفاعل الجمهور. نقدّم اقتراحات عملية لا وعودًا." },
    { q: "هل تحفظون الكلمات التي أكتبها؟", a: "لا. التوليد يتم داخل المتصفح، بلا تخزين محلي وبلا إرسال لأي خادم. أغلق الصفحة ولن يبقى أي أثر." },
  ],
};

const htFr: ToolDoc = {
  slug: "hashtag-generator", icon: "hash", color: "violet",
  title: "Générateur de hashtags", short: "30 hashtags petits, moyens et grands, avec copie globale.",
  h1: "Générateur de hashtags gratuit — 30 tags classés par concurrence",
  intro: [
    "Un hashtag n'est pas une décoration en fin de publication : c'est un signal de classement qui aide la plateforme à comprendre votre sujet et à le montrer aux personnes intéressées. Le problème, c'est que la plupart des créateurs utilisent les mêmes tags géants (#love #viral #fyp) et leur publication disparaît parmi des millions d'autres en quelques secondes.",
    "L'outil Oudda vous propose trente tags répartis en trois groupes : dix petits (faible concurrence, bonne chance d'apparition), dix moyens et dix grands (portée large mais concurrence forte). Le résultat provient d'une base de données statique écrite localement — aucune IA payante, aucune API.",
  ],
  sections: [
    { h: "Pourquoi trois catégories ?", p: [
      "Imaginez une petite boutique dans une ville animée. Une enseigne « Boutique » ne vous distingue pas ; une enseigne « Vente de crayons verts dans tel quartier » ne parle à personne. L'équilibre consiste à mélanger des mots généraux qui définissent votre domaine et des mots précis qui décrivent exactement votre contenu.",
      "Les grands tags offrent une portée énorme pendant quelques secondes. Les petits n'apportent pas des milliers de vues, mais ceux qui les voient sont réellement intéressés et peuvent rester. Ce mélange est ce que nous appelons la « pyramide de hashtags », et c'est la répartition appliquée dans nos résultats.",
    ] },
    { h: "La base de données locale", p: [
      "Nous avons préparé des packs pour plusieurs thèmes : football et championnat marocain, cuisine marocaine, voyage, mode, technologie, éducation, business, fitness, photographie et musique. Chaque pack est rédigé avec soin et contient des tags en arabe ainsi qu'en français ou en anglais selon l'usage réel de l'audience sur la plateforme.",
      "Si votre mot-clé n'existe pas dans la base, vous n'obtenez pas une page vide : nous le convertissons en tag valide (suppression des espaces, de la ponctuation et des diacritiques) puis nous complétons avec des tags généraux adaptés à la plateforme. Vous obtenez toujours trente tags utilisables.",
      "La propreté du texte compte : un hashtag n'accepte pas les espaces et évite les caractères spéciaux. « football ! » donnera #football. Essayez plusieurs variantes de votre mot-clé pour plus de diversité.",
    ] },
    { h: "TikTok ou Instagram ?", p: [
      "Règle d'or actuelle sur les deux plateformes : la qualité prime sur la quantité. Trente tags est un maximum raisonnable pour un contenu riche ; en pratique, utilisez 5 à 12 tags très pertinents. Copiez la liste complète puis supprimez ce qui ne correspond pas vraiment à votre publication — un tag hors sujet nuit plus qu'il n'aide.",
      "Sur TikTok, les hashtags aident aussi la plateforme à comprendre le sujet de la vidéo : placez donc le plus pertinent en premier. Sur Instagram, mettez les tags en fin de légende ou en premier commentaire, du plus spécifique au plus général.",
      "N'oubliez pas que les hashtags seuls ne créent pas la viralité. Les trois premières secondes, la clarté de la miniature et une question en fin de description sont des facteurs plus puissants. Utilisez cet outil comme assistant, pas comme substitut à une bonne idée.",
    ] },
  ],
  tips: [
    "Choisissez 5 à 12 tags dans le résultat, ne copiez pas systématiquement les trente.",
    "Commencez par les plus spécifiques, terminez par les plus généraux.",
    "Supprimez tout tag qui ne décrit pas vraiment le contenu, même s'il est populaire.",
    "Essayez plusieurs variantes du mot-clé (singulier/pluriel, arabe/français).",
    "Notez dans les statistiques quels tags ont réellement apporté des vues.",
    "Évitez les tags interdits ou contraires aux règles : ils réduisent la portée.",
  ],
  mistakes: [
    "Copier la même liste de tags sur chaque publication.",
    "Utiliser des tags populaires sans rapport avec le contenu.",
    "Croire que la quantité compense une idée faible.",
    "Laisser des espaces ou des symboles dans le tag, qui perd alors son sens.",
    "Oublier que les règles diffèrent entre TikTok et Instagram.",
  ],
  faq: [
    { q: "Utilisez-vous un modèle d'IA ou une API payante ?", a: "Non, jamais. Tous les tags proviennent d'une base statique intégrée au projet. Aucune clé, aucun coût, et votre mot-clé n'est envoyé à aucun service externe." },
    { q: "Que se passe-t-il si mon mot-clé n'est pas dans la base ?", a: "Nous le convertissons en tag valide (sans espaces ni symboles) puis complétons avec des tags généraux adaptés à la plateforme : vous obtenez toujours 30 tags." },
    { q: "30 tags est-il le nombre idéal ?", a: "Non. Trente est le maximum fourni par l'outil pour vous laisser le choix. En pratique, 5 à 12 tags précis valent mieux que 30 tags génériques. Copiez tout puis supprimez le superflu." },
    { q: "Les hashtags arabes fonctionnent-ils ?", a: "Oui, et leur importance grandit avec le contenu arabe. Nous mélangeons arabe et français/anglais car le public marocain et régional utilise lui-même ce mélange." },
    { q: "Garantissez-vous la viralité ?", a: "Non, et aucun outil ne le peut. Les hashtags sont un facteur parmi d'autres : qualité de l'idée, premières secondes, miniature et engagement. Nous proposons des suggestions pratiques, pas des promesses." },
    { q: "Conservez-vous les mots que je saisis ?", a: "Non. La génération se fait dans le navigateur, sans stockage local ni envoi serveur. Fermez la page et il ne reste aucune trace." },
  ],
};

export const TOOLS: Record<Locale, Record<ToolSlug, ToolDoc>> = {
  ar: { "qr-generator": qrAr, "word-counter": wcAr, "password-generator": pwAr, "youtube-thumbnail": ytAr, "hashtag-generator": htAr },
  fr: { "qr-generator": qrFr, "word-counter": wcFr, "password-generator": pwFr, "youtube-thumbnail": ytFr, "hashtag-generator": htFr },
};
