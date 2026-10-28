/** قوالب قابلة للطباعة — محتواها البنيوي يُستعمل في مكوّن PrintableTemplate. */
import type { Locale } from "@/i18n/dict";

export type TemplateField =
  | { kind: "line"; label: string }
  | { kind: "lines"; label: string; count: number }
  | { kind: "box"; label: string; height: "sm" | "md" | "lg" }
  | { kind: "grid"; label: string; cols: number; rows: number; cells: string[] }
  | { kind: "checklist"; label: string; items: string[] };

export type TemplateDoc = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  description: string;
  howTo: string[];
  faq: { q: string; a: string }[];
  printTitle: string;
  fields: TemplateField[];
};

export const TEMPLATE_SLUGS = [
  "content-calendar", "video-script", "shot-list", "hashtag-tracker",
  "idea-card", "pre-publish-checklist", "weekly-planner", "media-kit",
] as const;
export type TemplateSlug = (typeof TEMPLATE_SLUGS)[number];

type Pair = { ar: TemplateDoc; fr: TemplateDoc };

const pairs: Pair[] = [
  {
    ar: {
      slug: "content-calendar", icon: "calendar",
      title: "تقويم محتوى شهري", short: "ورقة واحدة تخطّط بها شهرًا كاملًا من المنشورات.",
      description: "قالب بسيط من أربعة أسابيع، لكل أسبوع خمسة أيام. اكتب فيه الركيزة، العنوان، المنصة، والحالة. لا يحتاج أي تطبيق، فقط اطبعه واملأه بخطك.",
      howTo: ["اضغط «طباعة / حفظ PDF» لتحصل على نسخة نظيفة.", "اكتب الركائز الثلاث أعلى الورقة قبل ملء الأيام.", "اترك يومًا فارغًا كل أسبوع للطوارئ.", "في نهاية الأسبوع، دوّن أفضل منشور وسبب نجاحه."],
      faq: [
        { q: "هل يمكنني استعماله لأكثر من منصة؟", a: "نعم. اكتب اسم المنصة في خانة «المنصة» لكل يوم، أو اطبع نسخة لكل منصة." },
        { q: "هل أحتاج تطبيقًا لتعديله؟", a: "لا. تستطيع الكتابة مباشرة داخل الصفحة قبل الطباعة، أو طباعته وملؤه بالقلم." },
        { q: "هل تحفظون ما أكتبه؟", a: "لا. الكتابة تبقى داخل متصفحك ولا تُرسل لأي جهة." },
      ],
      printTitle: "تقويم المحتوى الشهري",
      fields: [
        { kind: "lines", label: "الركائز الثلاث: 1) …………………  2) …………………  3) …………………", count: 1 },
        { kind: "grid", label: "الأسبوع الأول", cols: 5, rows: 4, cells: ["اليوم", "الركيزة", "العنوان", "المنصة", "الحالة"] },
        { kind: "grid", label: "الأسبوع الثاني", cols: 5, rows: 4, cells: ["اليوم", "الركيزة", "العنوان", "المنصة", "الحالة"] },
        { kind: "grid", label: "الأسبوع الثالث", cols: 5, rows: 4, cells: ["اليوم", "الركيزة", "العنوان", "المنصة", "الحالة"] },
        { kind: "grid", label: "الأسبوع الرابع", cols: 5, rows: 4, cells: ["اليوم", "الركيزة", "العنوان", "المنصة", "الحالة"] },
        { kind: "box", label: "ملاحظات نهاية الشهر: ما الذي نجح؟", height: "md" },
      ],
    },
    fr: {
      slug: "content-calendar", icon: "calendar",
      title: "Calendrier de contenu mensuel", short: "Une feuille pour planifier tout un mois de publications.",
      description: "Un modèle simple de quatre semaines, cinq jours chacune. Notez le pilier, le titre, la plateforme et l'état. Aucune application requise : imprimez et remplissez à la main.",
      howTo: ["Cliquez sur « Imprimer / PDF » pour une copie propre.", "Écrivez vos trois piliers en haut avant de remplir les jours.", "Laissez une case vide chaque semaine pour les imprévus.", "En fin de semaine, notez la meilleure publication et pourquoi."],
      faq: [
        { q: "Puis-je l'utiliser pour plusieurs plateformes ?", a: "Oui. Indiquez la plateforme dans la case prévue pour chaque jour, ou imprimez une copie par plateforme." },
        { q: "Ai-je besoin d'une application ?", a: "Non. Vous pouvez écrire directement dans la page avant d'imprimer, ou remplir la feuille au stylo." },
        { q: "Conservez-vous ce que j'écris ?", a: "Non. Le texte reste dans votre navigateur et n'est envoyé nulle part." },
      ],
      printTitle: "Calendrier de contenu mensuel",
      fields: [
        { kind: "lines", label: "Les trois piliers : 1) …………………  2) …………………  3) …………………", count: 1 },
        { kind: "grid", label: "Semaine 1", cols: 5, rows: 4, cells: ["Jour", "Pilier", "Titre", "Plateforme", "État"] },
        { kind: "grid", label: "Semaine 2", cols: 5, rows: 4, cells: ["Jour", "Pilier", "Titre", "Plateforme", "État"] },
        { kind: "grid", label: "Semaine 3", cols: 5, rows: 4, cells: ["Jour", "Pilier", "Titre", "Plateforme", "État"] },
        { kind: "grid", label: "Semaine 4", cols: 5, rows: 4, cells: ["Jour", "Pilier", "Titre", "Plateforme", "État"] },
        { kind: "box", label: "Notes de fin de mois : qu'est-ce qui a marché ?", height: "md" },
      ],
    },
  },
  {
    ar: {
      slug: "video-script", icon: "script",
      title: "سكريبت فيديو قصير", short: "خطاف، مشكلة، حل، ودعوة — في ورقة واحدة.",
      description: "قالب من أربع خانات يمنعك من نسيان الخطاف أو الدعوة في نهاية الفيديو. اطبعه قبل التسجيل واملأه بخط يدك، أو اكتب داخل الصفحة مباشرة.",
      howTo: ["ابدأ بالخطاف: جملة واحدة لا تتجاوز 15 كلمة.", "اكتب المشكلة بلغة من يواجهها فعلًا.", "الحل في 3 إلى 5 جمل قصيرة.", "دعوة واحدة فقط في النهاية."],
      faq: [
        { q: "أكتب قبل التصوير أم بعده؟", a: "قبل التصوير. ثلاث دقائق مع الورقة توفّر عليك عشرين دقيقة في المونتاج." },
        { q: "هل يصلح للفيديوهات الطويلة؟", a: "يمكنك استعماله كهيكل أولي ثم توسيع كل خانة، لكنه مصمّم للفيديو القصير." },
        { q: "هل أحفظ ما أكتبه؟", a: "لا، الكتابة داخل المتصفح فقط. استعمل «طباعة / حفظ PDF» إن أردت الاحتفاظ بنسخة." },
      ],
      printTitle: "سكريبت فيديو قصير",
      fields: [
        { kind: "box", label: "1) الخطاف — جملة واحدة توقف المشاهد", height: "sm" },
        { kind: "box", label: "2) المشكلة — لماذا يهتمّ بها؟", height: "sm" },
        { kind: "box", label: "3) الحل — الفائدة الحقيقية", height: "lg" },
        { kind: "box", label: "4) الدعوة — طلب واحد فقط", height: "sm" },
        { kind: "lines", label: "ملاحظات التصوير: المكان، الأدوات، المدة", count: 2 },
      ],
    },
    fr: {
      slug: "video-script", icon: "script",
      title: "Script de vidéo courte", short: "Accroche, problème, solution, appel — sur une seule feuille.",
      description: "Un modèle en quatre cases pour ne pas oublier l'accroche ni l'appel à l'action. Imprimez-le avant le tournage et remplissez-le à la main.",
      howTo: ["Commencez par l'accroche : une seule phrase de moins de 15 mots.", "Écrivez le problème avec les mots de la personne concernée.", "La solution en 3 à 5 phrases courtes.", "Un seul appel à l'action à la fin."],
      faq: [
        { q: "Avant ou après le tournage ?", a: "Avant. Trois minutes avec la feuille vous évitent vingt minutes de montage." },
        { q: "Convient-il aux vidéos longues ?", a: "Comme structure de départ, oui. Mais il est conçu pour les formats courts." },
        { q: "Conservez-vous ce que j'écris ?", a: "Non, le texte reste dans le navigateur. Utilisez « Imprimer / PDF » pour garder une copie." },
      ],
      printTitle: "Script de vidéo courte",
      fields: [
        { kind: "box", label: "1) L'accroche — une phrase qui arrête le spectateur", height: "sm" },
        { kind: "box", label: "2) Le problème — pourquoi est-ce important ?", height: "sm" },
        { kind: "box", label: "3) La solution — le bénéfice réel", height: "lg" },
        { kind: "box", label: "4) L'appel — une seule demande", height: "sm" },
        { kind: "lines", label: "Notes de tournage : lieu, accessoires, durée", count: 2 },
      ],
    },
  },
  {
    ar: {
      slug: "shot-list", icon: "camera",
      title: "قائمة تصوير (Shot List)", short: "رتّب لقطاتك قبل أن تشغل الكاميرا.",
      description: "قالب من عشرة صفوف: اللقطة، الزاوية، المكان، والمدة. يمنعك من الوصول إلى المونتاج واكتشاف أنك نسيت لقمة أساسية.",
      howTo: ["رتّب اللقطات حسب ترتيب السكريبت لا حسب السهولة.", "اكتب زاوية واحدة واضحة لكل لقطة.", "اترك لقطة احتياطية لكل فيديو.", "اطبع نسخة واحدة لكل يوم تصوير."],
      faq: [
        { q: "هل أحتاج قالبًا لكل فيديو؟", a: "إن كنت تصوّر عدة فيديوهات في يوم واحد، اطبع نسخة لكل فيديو." },
        { q: "ماذا تعني كلمة «زاوية»؟", a: "مكان الكاميرا: أمامية، جانبية، من الأعلى، أو لقطة مقرّبة." },
        { q: "هل يمكنني الكتابة داخل الصفحة؟", a: "نعم، كل الحقول قابلة للكتابة قبل الطباعة." },
      ],
      printTitle: "قائمة التصوير",
      fields: [
        { kind: "grid", label: "اللقطات المخطّطة", cols: 5, rows: 10, cells: ["رقم", "اللقطة", "الزاوية", "المكان", "المدة"] },
        { kind: "lines", label: "ملاحظات الإضاءة والصوت", count: 2 },
      ],
    },
    fr: {
      slug: "shot-list", icon: "camera",
      title: "Liste de tournage (Shot List)", short: "Organisez vos plans avant d'allumer la caméra.",
      description: "Un modèle de dix lignes : plan, angle, lieu et durée. Il vous évite d'arriver au montage et de découvrir qu'il manque un plan essentiel.",
      howTo: ["Classez les plans dans l'ordre du script, pas par facilité.", "Indiquez un angle précis pour chaque plan.", "Prévoyez un plan de secours pour chaque vidéo.", "Imprimez une copie par journée de tournage."],
      faq: [
        { q: "Un modèle par vidéo ?", a: "Oui, si vous tournez plusieurs vidéos en une journée, imprimez une copie pour chacune." },
        { q: "Que signifie « angle » ?", a: "La position de la caméra : face, côté, plongée ou gros plan." },
        { q: "Puis-je écrire dans la page ?", a: "Oui, tous les champs sont éditables avant l'impression." },
      ],
      printTitle: "Liste de tournage",
      fields: [
        { kind: "grid", label: "Plans prévus", cols: 5, rows: 10, cells: ["N°", "Plan", "Angle", "Lieu", "Durée"] },
        { kind: "lines", label: "Notes sur la lumière et le son", count: 2 },
      ],
    },
  },
  {
    ar: {
      slug: "hashtag-tracker", icon: "hash",
      title: "متتبّع الهاشتاغات", short: "دوّن الوسوم التي استعملتها وأيها جلب مشاهدات.",
      description: "قالب من عشرة صفوف لتسجيل تاريخ النشر، الوسوم، مصدر المشاهدات، ومعدل إكمال الفيديو. دفتر بسيط يكشف لك ما لا يخبرك به أي مولّد.",
      howTo: ["بعد 48 ساعة من النشر، افتح إحصائيات الفيديو.", "دوّن مصدر المشاهدات: بحث، For You، أم متابعون.", "أضف الوسوم التي استعملتها في نفس الصف.", "بعد عشرة فيديوهات، قارن ودوّن ملاحظتك."],
      faq: [
        { q: "هل أحتاج أداة تحليل مدفوعة؟", a: "لا. إحصائيات المنصة نفسها مجانية وتكفي لهذا التتبّع." },
        { q: "بعد كم يوم أراجع النتائج؟", a: "بعد 48 ساعة تكون الصورة أوضح. راجعها مرة أخرى بعد أسبوع." },
        { q: "هل تحفظون بياناتي؟", a: "لا. كل ما تكتبه يبقى في متصفحك." },
      ],
      printTitle: "متتبّع الهاشتاغات",
      fields: [
        { kind: "grid", label: "سجل المنشورات", cols: 5, rows: 10, cells: ["التاريخ", "الوسوم", "المصدر", "المشاهدات", "ملاحظة"] },
        { kind: "box", label: "أهم ما تعلّمته بعد عشر منشورات", height: "md" },
      ],
    },
    fr: {
      slug: "hashtag-tracker", icon: "hash",
      title: "Suivi des hashtags", short: "Notez les tags utilisés et ceux qui ont apporté des vues.",
      description: "Un modèle de dix lignes pour consigner la date, les tags, la source des vues et le taux de complétion. Un carnet simple qui révèle ce qu'aucun générateur ne vous dira.",
      howTo: ["Après 48 heures, ouvrez les statistiques de la vidéo.", "Notez la source des vues : recherche, Pour Vous, ou abonnés.", "Ajoutez les tags utilisés sur la même ligne.", "Après dix vidéos, comparez et tirez une conclusion."],
      faq: [
        { q: "Ai-je besoin d'un outil payant ?", a: "Non. Les statistiques natives de la plateforme sont gratuites et suffisent largement." },
        { q: "Après combien de jours analyser ?", a: "Après 48 heures, l'image est plus claire. Refaites un point après une semaine." },
        { q: "Conservez-vous mes données ?", a: "Non. Tout ce que vous écrivez reste dans votre navigateur." },
      ],
      printTitle: "Suivi des hashtags",
      fields: [
        { kind: "grid", label: "Journal des publications", cols: 5, rows: 10, cells: ["Date", "Tags", "Source", "Vues", "Note"] },
        { kind: "box", label: "Ce que j'ai appris après dix publications", height: "md" },
      ],
    },
  },
  {
    ar: {
      slug: "idea-card", icon: "bulb",
      title: "بطاقة فكرة محتوى", short: "حوّل الفكرة الغامضة إلى خطة قابلة للتنفيذ.",
      description: "قالب من أربع بطاقات في ورقة واحدة: الفكرة، الجمهور، الخطاف، والفائدة. استعمله في بداية كل أسبوع لملء تقويم المحتوى.",
      howTo: ["اكتب الفكرة في جملة واحدة فقط.", "حدّد الجمهور المستفيد بدقة.", "صغ خطافًا لا يتجاوز 15 كلمة.", "حدّد الفائدة الواحدة بوضوح.", "اختر المنصة واليوم المناسبين."],
      faq: [
        { q: "أين أجد أفكارًا جديدة؟", a: "من تعليقات جمهورك وأسئلتهم المتكررة. إنها بنك أفكار مجاني." },
        { q: "كم بطاقة أملأ في الأسبوع؟", a: "ثلاث إلى خمس بطاقات تكفي لمعظم القنوات الصغيرة." },
        { q: "هل يمكنني طباعتها على أكثر من ورقة؟", a: "نعم. يمكنك تعديل عدد البطاقات في خيارات الطباعة أو طباعة الورقة أكثر من مرة." },
      ],
      printTitle: "بطاقة فكرة محتوى",
      fields: [
        { kind: "box", label: "1) الفكرة في جملة واحدة", height: "sm" },
        { kind: "box", label: "2) من المستفيد تحديدًا؟", height: "sm" },
        { kind: "box", label: "3) الخطاف (أول 3 ثوانٍ)", height: "sm" },
        { kind: "box", label: "4) الفائدة الواحدة", height: "sm" },
        { kind: "lines", label: "المنصة / التاريخ / الحالة", count: 1 },
      ],
    },
    fr: {
      slug: "idea-card", icon: "bulb",
      title: "Fiche idée de contenu", short: "Transformez une idée vague en plan concret.",
      description: "Quatre fiches sur une seule page : l'idée, l'audience, l'accroche et le bénéfice. À utiliser en début de semaine pour remplir votre calendrier.",
      howTo: ["Écrivez l'idée en une seule phrase.", "Précisez exactement à qui elle s'adresse.", "Formulez une accroche de moins de 15 mots.", "Notez le bénéfice unique pour le spectateur.", "Choisissez la plateforme et le jour."],
      faq: [
        { q: "Où trouver de nouvelles idées ?", a: "Dans les commentaires de votre audience et ses questions récurrentes. C'est une banque d'idées gratuite." },
        { q: "Combien de fiches par semaine ?", a: "Trois à cinq fiches suffisent pour la plupart des petites chaînes." },
        { q: "Puis-je imprimer plusieurs feuilles ?", a: "Oui. Imprimez simplement la page plusieurs fois." },
      ],
      printTitle: "Fiche idée de contenu",
      fields: [
        { kind: "box", label: "1) L'idée en une phrase", height: "sm" },
        { kind: "box", label: "2) À qui s'adresse-t-elle exactement ?", height: "sm" },
        { kind: "box", label: "3) L'accroche (3 premières secondes)", height: "sm" },
        { kind: "box", label: "4) Le bénéfice unique", height: "sm" },
        { kind: "lines", label: "Plateforme / Date / État", count: 1 },
      ],
    },
  },
  {
    ar: {
      slug: "pre-publish-checklist", icon: "check",
      title: "قائمة تحقق قبل النشر", short: "15 نقطة تمنعك من نشر منشور فيه خطأ.",
      description: "قالب من خمس عشرة نقطة تغطي الفكرة، النص، الصورة، الوسوم، والروابط. اطبعه وعلّقه بجانب مكتبك، وامرّ عليه قبل كل منشور.",
      howTo: ["راجع الفكرة: هل تهمّ جمهورك فعلًا؟", "راجع النص: هل فيه خطأ لغوي أو رقم خاطئ؟", "راجع الصورة: هل تظهر كاملة على الهاتف؟", "راجع الوسوم: هل تصف المحتوى؟", "ثم راجع الرابط والدعوة في النهاية."],
      faq: [
        { q: "هل أحتاج طباعتها؟", a: "لا، يمكنك استعمالها داخل المتصفح مباشرة. لكن طباعتها وتعليقها أفضل." },
        { q: "هل تناسب كل المنصات؟", a: "نعم، النقاط عامة. أضف نقاطك الخاصة بكل منصة." },
        { q: "هل تحفظون علاماتي؟", a: "لا. كل ما تكتبه يبقى داخل متصفحك." },
      ],
      printTitle: "قائمة تحقق قبل النشر",
      fields: [
        { kind: "checklist", label: "الفكرة والعنوان", items: ["الفكرة تهم جمهوري", "العنوان واضح ومحدد", "العنوان لا يتجاوز 60 حرفًا", "المقدمة تشرح الفائدة"] },
        { kind: "checklist", label: "النص واللغة", items: ["لا توجد أخطاء لغوية", "الأرقام صحيحة", "الجمل قصيرة ومناسبة للهاتف", "الوصف لا يتجاوز حدود المنصة"] },
        { kind: "checklist", label: "الصورة والفيديو", items: ["الصورة واضحة على الهاتف", "النص على الشاشة مقروء", "أول 3 ثوانٍ جذابة", "لا مواقع مختلقة"] },
        { kind: "checklist", label: "الوسوم والروابط", items: ["الوسوم تصف المحتوى", "الرابط يفتح بشكل صحيح", "الدعوة واحدة فقط"] },
        { kind: "checklist", label: "المراجعة الأخيرة", items: ["قرأت المنشور كاملًا", "تأكدت من حقوق الصور", "أنشره في وقت مناسب"] },
      ],
    },
    fr: {
      slug: "pre-publish-checklist", icon: "check",
      title: "Checklist avant publication", short: "15 points pour éviter de publier une erreur.",
      description: "Un modèle de quinze points couvrant l'idée, le texte, le visuel, les tags et les liens. Imprimez-le et accrochez-le près de votre bureau.",
      howTo: ["Vérifiez l'idée : intéresse-t-elle vraiment votre audience ?", "Vérifiez le texte : faute de langue ou chiffre erroné ?", "Vérifiez l'image : est-elle complète sur mobile ?", "Vérifiez les tags : décrivent-ils le contenu ?", "Vérifiez enfin le lien et l'appel à l'action."],
      faq: [
        { q: "Dois-je l'imprimer ?", a: "Non, vous pouvez l'utiliser directement dans le navigateur. Mais l'imprimer et l'afficher est plus efficace." },
        { q: "Convient-elle à toutes les plateformes ?", a: "Oui, les points sont généraux. Ajoutez vos propres points par plateforme." },
        { q: "Conservez-vous mes coches ?", a: "Non. Tout ce que vous écrivez reste dans votre navigateur." },
      ],
      printTitle: "Checklist avant publication",
      fields: [
        { kind: "checklist", label: "L'idée et le titre", items: ["L'idée intéresse mon audience", "Le titre est clair et précis", "Le titre fait moins de 60 caractères", "L'introduction explique le bénéfice"] },
        { kind: "checklist", label: "Le texte et la langue", items: ["Aucune faute de langue", "Les chiffres sont exacts", "Les phrases sont courtes pour le mobile", "La description respecte les limites"] },
        { kind: "checklist", label: "L'image et la vidéo", items: ["L'image est nette sur mobile", "Le texte à l'écran est lisible", "Les 3 premières secondes accrochent", "Aucun site fictif"] },
        { kind: "checklist", label: "Les tags et les liens", items: ["Les tags décrivent le contenu", "Le lien s'ouvre correctement", "Un seul appel à l'action"] },
        { kind: "checklist", label: "Dernière relecture", items: ["J'ai lu la publication entière", "J'ai vérifié les droits des images", "Je publie au bon moment"] },
      ],
    },
  },
  {
    ar: {
      slug: "weekly-planner", icon: "calendar",
      title: "مخطّط أسبوعي", short: "ورقة واحدة لأسبوع واحد، بلا تعقيد.",
      description: "قالب من خمسة أيام، كل يوم فيه ثلاث مهام وفخان للملاحظات. لا يوجد تطبيق ولا حساب، فقط اطبع واملأ.",
      howTo: ["اكتب أهم ثلاث مهام لكل يوم.", "ارتبها حسب الأولوية لا حسب السهولة.", "اترك وقتًا للطوارئ.", "في نهاية الأسبوع، قيّم ما أنجزته.", "احتفظ بملاحظاتك للأسبوع القادم."],
      faq: [
        { q: "هل أحتاج طباعته؟", a: "نعم، أو يمكنك حفظه كملف PDF عبر زر «طباعة / حفظ PDF»." },
        { q: "هل يمكنني الكتابة داخل الصفحة؟", a: "نعم، كل الحقول قابلة للكتابة قبل الطباعة." },
        { q: "هل تحفظون مهامي؟", a: "لا، تبقى داخل متصفحك فقط." },
      ],
      printTitle: "المخطّط الأسبوعي",
      fields: [
        { kind: "grid", label: "الأسبوع", cols: 3, rows: 5, cells: ["اليوم", "أهم 3 مهام", "ملاحظات"] },
        { kind: "box", label: "أهم ما أريد تحقيقه هذا الأسبوع", height: "sm" },
      ],
    },
    fr: {
      slug: "weekly-planner", icon: "calendar",
      title: "Planificateur hebdomadaire", short: "Une feuille pour une semaine, sans complications.",
      description: "Un modèle de cinq jours, trois tâches par jour et deux cases de notes. Aucune application ni compte : imprimez et remplissez.",
      howTo: ["Écrivez les trois tâches principales de chaque jour.", "Classez-les par priorité, pas par facilité.", "Laissez du temps pour les imprévus.", "En fin de semaine, évaluez ce qui a été fait.", "Gardez vos notes pour la semaine suivante."],
      faq: [
        { q: "Dois-je l'imprimer ?", a: "Oui, ou vous pouvez l'enregistrer en PDF via le bouton « Imprimer / PDF »." },
        { q: "Puis-je écrire dans la page ?", a: "Oui, tous les champs sont éditables avant l'impression." },
        { q: "Conservez-vous mes tâches ?", a: "Non, tout reste dans votre navigateur." },
      ],
      printTitle: "Planificateur hebdomadaire",
      fields: [
        { kind: "grid", label: "La semaine", cols: 3, rows: 5, cells: ["Jour", "3 tâches clés", "Notes"] },
        { kind: "box", label: "Ce que je veux accomplir cette semaine", height: "sm" },
      ],
    },
  },
  {
    ar: {
      slug: "media-kit", icon: "sparkle",
      title: "بطاقة تعريف صانع محتوى", short: "ورقة واحدة تقدّم نفسك لأي جهة تريد التعاون معها.",
      description: "قالب من خمس خانات: اسمك، تخصصك، جمهورك، أرقامك، وطريقة التواصل. استعمله كورقة تعريف بسيطة عند مراسلة علامة تجارية أو جهة إعلامية.",
      howTo: ["اكتب تعريفًا من جملة واحدة فقط.", "حدّد جمهورك: من يتابعك ولماذا؟", "أضف أرقامك الحقيقية ولا تبالغ.", "واكتب ما تقدّمه تحديدًا: مراجعة، فيديو، أم مقال؟", "واترك وسيلة تواصل واحدة واضحة."],
      faq: [
        { q: "هل أحتاج أرقامًا كبيرة؟", a: "لا. الجمهور الصغير المتفاعل أفضل من الجمهور الكبير الصامت." },
        { q: "هل يمكنني طباعتها؟", a: "نعم، أو احفظها كملف PDF عبر زر «طباعة / حفظ PDF»." },
        { q: "هل تحفظون بياناتي؟", a: "لا. كل ما تكتبه يبقى داخل متصفحك." },
      ],
      printTitle: "بطاقة تعريف صانع المحتوى",
      fields: [
        { kind: "box", label: "1) من أنت؟ (جملة واحدة)", height: "sm" },
        { kind: "box", label: "2) ما مجالك؟", height: "sm" },
        { kind: "box", label: "3) من جمهورك؟", height: "sm" },
        { kind: "box", label: "4) أرقامك (متابعون، مشاهدات، تفاعل)", height: "sm" },
        { kind: "box", label: "5) ماذا تقدّم؟ وطريقة التواصل", height: "md" },
      ],
    },
    fr: {
      slug: "media-kit", icon: "sparkle",
      title: "Fiche de présentation créateur", short: "Une feuille pour vous présenter à un partenaire.",
      description: "Un modèle de cinq cases : votre nom, votre domaine, votre audience, vos chiffres et vos coordonnées. À utiliser comme fiche de visite pour contacter une marque.",
      howTo: ["Écrivez une présentation d'une seule phrase.", "Définissez votre audience : qui vous suit et pourquoi ?", "Ajoutez vos chiffres réels, sans exagérer.", "Précisez ce que vous proposez : test, vidéo ou article ?", "Laissez un seul moyen de contact clair."],
      faq: [
        { q: "Ai-je besoin de gros chiffres ?", a: "Non. Une petite audience engagée vaut mieux qu'une grande audience silencieuse." },
        { q: "Puis-je l'imprimer ?", a: "Oui, ou enregistrez-la en PDF via le bouton « Imprimer / PDF »." },
        { q: "Conservez-vous mes données ?", a: "Non. Tout ce que vous écrivez reste dans votre navigateur." },
      ],
      printTitle: "Fiche de présentation créateur",
      fields: [
        { kind: "box", label: "1) Qui êtes-vous ? (une phrase)", height: "sm" },
        { kind: "box", label: "2) Quel est votre domaine ?", height: "sm" },
        { kind: "box", label: "3) Qui est votre audience ?", height: "sm" },
        { kind: "box", label: "4) Vos chiffres (abonnés, vues, engagement)", height: "sm" },
        { kind: "box", label: "5) Que proposez-vous ? Et comment vous contacter ?", height: "md" },
      ],
    },
  },
];

export const TEMPLATES: Record<Locale, Record<TemplateSlug, TemplateDoc>> = {
  ar: {}, fr: {},
} as Record<Locale, Record<TemplateSlug, TemplateDoc>>;

for (const p of pairs) {
  TEMPLATES.ar[p.ar.slug as TemplateSlug] = p.ar;
  TEMPLATES.fr[p.fr.slug as TemplateSlug] = p.fr;
}
