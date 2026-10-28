/** كل نصوص الواجهة — عربي/فرنسي. لا توجد أي طلبات خطوط أو موارد خارجية. */
export type Locale = "ar" | "fr";
export const LOCALES: Locale[] = ["ar", "fr"];
export const DEFAULT_LOCALE: Locale = "ar";

export function isLocale(x: string): x is Locale {
  return x === "ar" || x === "fr";
}

export const dict = {
  ar: {
    locale: "ar",
    dir: "rtl",
    siteName: "عُدّة",
    siteNameLatin: "Oudda",
    tagline: "أدوات وقوالب صانع المحتوى العربي",
    description:
      "أدوات مجانية تعمل داخل متصفحك، وقوالب جاهزة للطباعة، وأدلة عملية بالعربية والفرنسية لصانعي المحتوى. بلا تسجيل، بلا رفع ملفات، بلا APIs مدفوعة.",
    nav: {
      home: "الرئيسية", tools: "الأدوات", guides: "الأدلة", templates: "القوالب",
      about: "من نحن", contact: "اتصل بنا", skip: "تجاوز إلى المحتوى",
      menu: "القائمة", close: "إغلاق", language: "Langue / اللغة",
    },
    footer: {
      about: "عن عُدّة", links: "روابط مهمة", legal: "قانوني",
      rights: "جميع الحقوق محفوظة", madeWith: "صُنع بلا تتبّع ولا ملفات تعريف ارتباط تحليلية.",
      disclaimerShort: "محتوى تعليمي عام، وليس استشارة مهنية.",
    },
    home: {
      badge: "مجاني 100% · يعمل داخل متصفحك",
      h1: "عدّتك اليومية لصناعة محتوى أفضل",
      lead: "خمس أدوات سريعة، قوالب قابلة للطباعة، وأدلة عملية مكتوبة بعناية — كلها مجانية وتشتغل مباشرة في متصفحك بدون أن نرى بياناتك.",
      ctaTools: "جرّب الأدوات", ctaGuides: "تصفّح الأدلة",
      trust1: "بلا تسجيل", trust2: "بلا رفع ملفات", trust3: "بلا APIs مدفوعة",
      toolsTitle: "خمس أدوات، ضغطة واحدة",
      toolsLead: "أدوات صغيرة نستعملها يوميًا قبل نشر أي منشور أو فيديو.",
      guidesTitle: "أدلة تشرح «لماذا» قبل «كيف»",
      guidesLead: "شروحات أصلية بالعربية والفرنسية، مكتوبة لصانع محتوى يريد نتيجة لا وعودًا.",
      templatesTitle: "قوالب جاهزة للطباعة",
      templatesLead: "اضغط «طباعة» لتحصل على PDF أو ورقة، واملأها بخطك.",
      latestGuides: "أحدث الأدلة", allGuides: "كل الأدلة", allTemplates: "كل القوالب", allTools: "كل الأدوات",
      faqTitle: "أسئلة شائعة عن عُدّة",
      faq: [
        { q: "هل أدوات عُدّة مجانية فعلًا؟", a: "نعم. كل الأدوات والقوالب والأدلة مجانية بالكامل، بلا حساب، بلا حدود استخدام، وبلا نسخة مدفوعة مخفية. الموقع يُموَّل عبر إعلانات Google AdSense بعد قبوله، وهذا لا يغيّر شيئًا في طريقة عمل الأدوات." },
        { q: "هل تُرسَل نصوصي أو كلمات سري إلى خادم؟", a: "لا. جميع الأدوات تعمل داخل متصفحك فقط (Client-Side). لا توجد قاعدة بيانات ولا نماذج ترفع محتواك. يمكنك التحقق من ذلك بفتح أدوات المطوّر في متصفحك: لن ترى أي طلب يحمل النص الذي كتبته." },
        { q: "هل أحتاج تثبيت برنامج أو إنشاء حساب؟", a: "لا تحتاج شيئًا. افتح الصفحة واستخدم الأداة مباشرة. القوالب تُطبع من المتصفح أو تُحفظ كملف PDF عبر زر «طباعة»." },
        { q: "هل يمكنني استعمال المحتوى في قناتي أو مدونتي؟", a: "يمكنك الاستفادة منه شخصيًا والاقتباس منه مع ذكر المصدر ورابط إليه. لا يُسمح بنسخ صفحات كاملة وإعادة نشرها كما هي على موقع آخر، لأن المحتوى الأصلي هو ما يميّز هذا الموقع." },
        { q: "هل النتائج التي تعطيها الأدوات دقيقة قانونيًا أو ماليًا؟", a: "الأدوات تعليمية وتقديرية. لا تقدّم استشارات قانونية أو ضريبية أو مالية أو طبية. لأي قرار مهم، راجع مختصًا أو مصدرًا رسميًا." },
      ],
    },
    tools: {
      title: "الأدوات", lead: "خمس أدوات مجانية تعمل داخل متصفحك. اختر ما تحتاجه وابدأ فورًا.",
      indexTitle: "كل الأدوات", backToTools: "العودة لكل الأدوات",
      howTitle: "كيف تستعمل هذه الأداة؟", tipsTitle: "نصائح عملية",
      mistakesTitle: "أخطاء شائعة تتجنّبها", faqTitle: "الأسئلة الشائعة",
      relatedTitle: "أدوات ذات صلة", noteTitle: "ملاحظة مهمة",
      launch: "افتح الأداة", usageNote: "الأداة تعمل بالكامل داخل متصفحك.",
    },
    guides: { title: "الأدلة", lead: "شروحات أصلية ومفصّلة حول صناعة المحتوى، مكتوبة بلغة واضحة.", indexTitle: "كل الأدلة", backToGuides: "العودة لكل الأدلة", readingTime: "دقائق قراءة", published: "نُشر في", updated: "آخر تحديث", tableOfContents: "محتوى المقال", relatedTitle: "اقرأ أيضًا", faqTitle: "أسئلة شائعة" },
    templates: { title: "القوالب", lead: "قوالب بسيطة قابلة للطباعة، تساعدك تنظّم يومك ومحتواك بلا برامج معقّدة.", indexTitle: "كل القوالب", backToTemplates: "العودة لكل القوالب", print: "طباعة / حفظ PDF", clear: "مسح كل الكتابة", editHint: "انقر على أي فراغ واكتب مباشرة، ثم اضغط «طباعة / حفظ PDF».", howTitle: "كيف تستعمل هذا القالب؟", faqTitle: "أسئلة شائعة", noteTitle: "تنبيه", privacyNote: "ما تكتبه هنا يبقى في متصفحك. لا نحفظه ولا نرسله لأي جهة.", printTitle: "قالب", blank: "........................................................" },
    common: {
      copy: "نسخ", copied: "تم النسخ ✓", copyAll: "نسخ الكل", reset: "إعادة التعيين",
      download: "تحميل", open: "فتح في تبويب جديد", result: "النتيجة",
      optional: "اختياري", required: "مطلوب", characters: "حرف", words: "كلمة",
      yes: "نعم", no: "لا", loading: "جارٍ التحميل…",
      breadcrumbHome: "الرئيسية", share: "شارك الصفحة",
      lastUpdated: "آخر تحديث", tableOfContents: "فهرس",
      note: "ملاحظة", example: "مثال", warning: "تنبيه",
    },
    ad: { label: "مساحة إعلانية", note: "الإعلانات لا تُعرض قبل قبول الموقع في برنامج AdSense." },
    consent: {
      title: "الخصوصية أولاً",
      text: "نحن لا نستعمل ملفات تعريف ارتباط للتحليلات أو التتبّع. عند تفعيل إعلانات Google قد يستعمل مزوّد الإعلانات ملفات تعريف ارتباط لعرض إعلانات ملائمة. يمكنك رفض ذلك ولن يتأثر عمل الأدوات.",
      accept: "موافق", refuse: "رفض الإعلانات المخصّصة", settings: "سياسة الخصوصية",
    },
    notFound: { title: "الصفحة غير موجودة", text: "ربما غيّرنا الرابط أو كتبته بشكل مختلف.", back: "العودة للرئيسية" },
  },
  fr: {
    locale: "fr",
    dir: "ltr",
    siteName: "Oudda",
    siteNameLatin: "عدّة",
    tagline: "Outils et modèles pour les créateurs de contenu",
    description:
      "Des outils gratuits qui tournent dans votre navigateur, des modèles imprimables et des guides pratiques en français et en arabe. Sans inscription, sans upload, sans API payante.",
    nav: {
      home: "Accueil", tools: "Outils", guides: "Guides", templates: "Modèles",
      about: "À propos", contact: "Contact", skip: "Aller au contenu",
      menu: "Menu", close: "Fermer", language: "Langue / اللغة",
    },
    footer: {
      about: "À propos d'Oudda", links: "Liens utiles", legal: "Mentions légales",
      rights: "Tous droits réservés", madeWith: "Conçu sans tracking ni cookies analytiques.",
      disclaimerShort: "Contenu pédagogique général, pas un conseil professionnel.",
    },
    home: {
      badge: "100% gratuit · dans votre navigateur",
      h1: "Votre boîte à outils quotidienne pour créer de meilleurs contenus",
      lead: "Cinq outils rapides, des modèles imprimables et des guides pratiques rédigés avec soin — le tout gratuitement, directement dans votre navigateur, sans que nous voyions vos données.",
      ctaTools: "Essayer les outils", ctaGuides: "Parcourir les guides",
      trust1: "Sans inscription", trust2: "Sans upload", trust3: "Sans API payante",
      toolsTitle: "Cinq outils, un clic",
      toolsLead: "De petits outils que nous utilisons chaque jour avant de publier un post ou une vidéo.",
      guidesTitle: "Des guides qui expliquent le « pourquoi » avant le « comment »",
      guidesLead: "Des explications originales en français et en arabe, écrites pour un créateur qui veut des résultats, pas des promesses.",
      templatesTitle: "Des modèles prêts à imprimer",
      templatesLead: "Cliquez sur « Imprimer » pour obtenir un PDF ou une feuille, puis remplissez à la main.",
      latestGuides: "Derniers guides", allGuides: "Tous les guides", allTemplates: "Tous les modèles", allTools: "Tous les outils",
      faqTitle: "Questions fréquentes sur Oudda",
      faq: [
        { q: "Les outils d'Oudda sont-ils vraiment gratuits ?", a: "Oui. Tous les outils, modèles et guides sont entièrement gratuits, sans compte, sans limite d'utilisation et sans version payante cachée. Le site est financé par la publicité Google AdSense après acceptation, ce qui ne change rien au fonctionnement des outils." },
        { q: "Mes textes ou mes mots de passe sont-ils envoyés à un serveur ?", a: "Non. Tous les outils fonctionnent uniquement dans votre navigateur (côté client). Il n'y a ni base de données ni formulaire qui envoie votre contenu. Vous pouvez le vérifier dans les outils de développement : aucune requête ne contient le texte saisi." },
        { q: "Dois-je installer un logiciel ou créer un compte ?", a: "Non, rien du tout. Ouvrez la page et utilisez l'outil directement. Les modèles s'impriment depuis le navigateur ou s'enregistrent en PDF via le bouton « Imprimer »." },
        { q: "Puis-je réutiliser le contenu sur ma chaîne ou mon blog ?", a: "Vous pouvez l'utiliser personnellement et le citer en mentionnant la source avec un lien. Il n'est pas autorisé de copier des pages entières et de les republier telles quelles sur un autre site, car le contenu original est ce qui distingue ce site." },
        { q: "Les résultats des outils ont-ils une valeur légale ou financière ?", a: "Les outils sont pédagogiques et approximatifs. Ils ne fournissent aucun conseil juridique, fiscal, financier ou médical. Pour toute décision importante, consultez un professionnel ou une source officielle." },
      ],
    },
    tools: {
      title: "Outils", lead: "Cinq outils gratuits qui fonctionnent dans votre navigateur. Choisissez et commencez.",
      indexTitle: "Tous les outils", backToTools: "Retour aux outils",
      howTitle: "Comment utiliser cet outil ?", tipsTitle: "Conseils pratiques",
      mistakesTitle: "Erreurs fréquentes à éviter", faqTitle: "Questions fréquentes",
      relatedTitle: "Outils associés", noteTitle: "Remarque importante",
      launch: "Ouvrir l'outil", usageNote: "L'outil fonctionne entièrement dans votre navigateur.",
    },
    guides: { title: "Guides", lead: "Des explications originales et détaillées sur la création de contenu, dans une langue claire.", indexTitle: "Tous les guides", backToGuides: "Retour aux guides", readingTime: "min de lecture", published: "Publié le", updated: "Mis à jour", tableOfContents: "Sommaire", relatedTitle: "À lire aussi", faqTitle: "Questions fréquentes" },
    templates: { title: "Modèles", lead: "Des modèles simples à imprimer pour organiser votre journée et votre contenu sans logiciel compliqué.", indexTitle: "Tous les modèles", backToTemplates: "Retour aux modèles", print: "Imprimer / PDF", clear: "Effacer le texte", editHint: "Cliquez dans un espace et écrivez directement, puis cliquez sur « Imprimer / PDF ».", howTitle: "Comment utiliser ce modèle ?", faqTitle: "Questions fréquentes", noteTitle: "Attention", privacyNote: "Ce que vous écrivez reste dans votre navigateur. Nous ne le stockons ni ne l'envoyons.", printTitle: "Modèle", blank: "........................................................" },
    common: {
      copy: "Copier", copied: "Copié ✓", copyAll: "Tout copier", reset: "Réinitialiser",
      download: "Télécharger", open: "Ouvrir dans un nouvel onglet", result: "Résultat",
      optional: "facultatif", required: "obligatoire", characters: "caractères", words: "mots",
      yes: "Oui", no: "Non", loading: "Chargement…",
      breadcrumbHome: "Accueil", share: "Partager la page",
      lastUpdated: "Dernière mise à jour", tableOfContents: "Sommaire",
      note: "Remarque", example: "Exemple", warning: "Attention",
    },
    ad: { label: "Espace publicitaire", note: "Aucune annonce n'est affichée avant l'acceptation du site dans AdSense." },
    consent: {
      title: "La vie privée d'abord",
      text: "Nous n'utilisons aucun cookie d'analyse ou de suivi. Lorsque la publicité Google est activée, le fournisseur peut utiliser des cookies pour afficher des annonces pertinentes. Vous pouvez refuser : le fonctionnement des outils n'en sera pas affecté.",
      accept: "Accepter", refuse: "Refuser les annonces personnalisées", settings: "Politique de confidentialité",
    },
    notFound: { title: "Page introuvable", text: "Le lien a peut-être changé ou comporte une erreur.", back: "Retour à l'accueil" },
  },
} as const;

export type Dict = ReturnType<typeof getDict>;
export function getDict(locale: Locale) {
  return dict[locale];
}
