/** صفحات الثقة: من نحن، اتصل بنا، الخصوصية، الشروط، إخلاء المسؤولية. */
import type { Locale } from "@/i18n/dict";
import type { ArticleSection, FaqItem } from "./tools";

export type LegalDoc = {
  title: string;
  description: string;
  intro: string[];
  sections: ArticleSection[];
  faq?: FaqItem[];
};

export const LEGAL_SLUGS = ["about", "contact", "privacy", "terms", "disclaimer"] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

const about: Record<Locale, LegalDoc> = {
  ar: {
    title: "من نحن", description: "ما هو عُدّة، ولماذا بنيناه، وكيف نحرّر محتوانا.",
    intro: [
      "عُدّة هو موقع صغير بأدوات كبيرة: خمس أدوات تعمل داخل متصفحك، وثمانية قوالب قابلة للطباعة، واثنا عشر دليلًا عمليًا بالعربية والفرنسية. الفكرة بسيطة: صانع المحتوى لا يحتاج منصّة ضخمة ليبدأ، بل يحتاج أدوات صادقة لا تطلب بياناته ولا تعده بال viralité.",
      "بدأنا من سؤال واحد: لماذا تطلب معظم مواقع الأدوات منك أن ترفع نصك أو رابطك إلى خادمها؟ الجواب غالبًا تقني لا ضروري. لذلك قررنا أن يكون كل شيء في المتصفح: لا قاعدة بيانات، لا حساب مستخدم، لا نماذج تجميع، ولا واجهات برمجة مدفوعة.",
    ],
    sections: [
      { h: "لماذا «عُدّة»؟", p: [
        "العدّة هي ما يحمله الحرفي معه في كل يوم: أدوات بسيطة يعرفها جيدًا ويصلحها بنفسه. أردنا للموقع أن يكون كذلك — خفيف، مفهوم، وجاهز حين تحتاجه، لا يعقّد عملك ولا يضيف خطوة أخرى بين الفكرة والنشر.",
        "الاسم مكتوب بلغتين لأن الجمهور الذي نخاطبه ثنائي اللغة فعلًا. لسنا موقعًا عربيًا مترجمًا آليًا إلى الفرنسية، ولا موقعًا فرنسيًا مترجمًا إلى العربية؛ كل نسخة مكتوبة بلغتها، بتراكيبها الطبيعية وأمثلتها المحلية.",
      ] },
      { h: "كيف نكتب المحتوى", p: [
        "كل دليل يبدأ من مشكلة حقيقية واجهناها: رمز QR لا يُقرأ بعد الطباعة، هاشتاغات منسوخة بلا نتائج، صورة مصغّرة غير واضحة على الهاتف، أو نص عربي يُحسب عدد كلماته بطريقة خاطئة. نشرح السبب قبل الخطوات، ونذكر الحدود قبل المزايا.",
        "نستعمل أدوات الذكاء الاصطناعي أحيانًا كمساعدة على التنظيم واكتشاف النقاط الناقصة، لكن النصوص تُعاد صياغتها ومراجعتها يدويًا، وتُقارن بتجربة عملية. لا ننشر صفحة لمجرّد ملء عدد، ولا نترجم صفحة واحدة إلى عشرين نسخة متشابهة.",
      ] },
      { h: "الخصوصية ليست ميزة إضافية", p: [
        "ما تكتبه داخل عدّاد الكلمات أو مولّد كلمات السر أو مولّد الهاشتاغات لا يخرج من جهازك. لا نستعمل ملفات تعريف ارتباط للتحليلات، ولا سكربتات تتبّع، ولا خطوطًا أو مكتبات من خوادم خارجية داخل صفحات الأدوات. الصور المصغّرة في أداة يوتيوب تُحمّل مباشرة من خادم الصور العام للمنصّة، لأن هذه هي طريقة عملها.",
        "الموقع ثابت بالكامل (Static Export): ملفات HTML وCSS وJavaScript فقط، بلا خادم تطبيقات ولا قاعدة بيانات. هذا يجعله أسرع وأرخص وأسهل في الفحص من قِبل أي شخص يريد التأكد من كلامنا.",
      ] },
      { h: "كيف نغطّي التكاليف", p: [
        "الاستضافة المجانية كافية لموقع ثابت. التكلفة الوحيدة المتوقعة هي اسم نطاق خاص عند النشر. قد نفعّل إعلانات Google AdSense لاحقًا لتغطية هذه التكاليف؛ عندها ستظهر إعلانات في أماكن مخصّصة، ولن يتغيّر أي شيء في طريقة عمل الأدوات.",
        "لا نضع سكربتًا إعلانيًا قبل الحصول على موافقة فعلية من البرنامج، ولا نضع معرّف ناشر وهميًا في ملف ads.txt. إن رفضت الإعلانات المخصّصة من شريط الخصوصية، فالأدوات تستمر في العمل كما هي.",
      ] },
      { h: "ما لا نقدّمه", p: [
        "لا نقدّم استشارات قانونية أو ضريبية أو مالية أو طبية، ولا نضمن قبولًا في أي برنامج إعلاني، ولا نعد بزيادة المشاهدات أو المتابعين. أدواتنا تعليمية وتنظيمية؛ القرار دائمًا لك، والمسؤولية عن استعمال النتائج تقع على من يستعملها.",
      ] },
    ],
    faq: [
      { q: "هل الموقع تابع لشركة أو جهة رسمية؟", a: "لا. عُدّة مشروع محتوى مستقل وغير رسمي، وليس مرتبطًا بأي منصّة أو مؤسسة حكومية." },
      { q: "هل يمكنني المساهمة أو اقتراح تحسين؟", a: "نعم، عبر صفحة «اتصل بنا». نرحّب بملاحظات حول الأخطاء اللغوية أو التقنية أو اقتراحات الأدوات." },
      { q: "هل ستضيفون أدوات أخرى؟", a: "قد نضيف أدوات جديدة، لكن بشرط أن تكون مفيدة فعلًا وتعمل داخل المتصفح دون تكلفة." },
    ],
  },
  fr: {
    title: "À propos", description: "Qu'est-ce qu'Oudda, pourquoi nous l'avons créé et comment nous écrivons.",
    intro: [
      "Oudda est un petit site avec de grands outils : cinq utilitaires qui tournent dans votre navigateur, huit modèles imprimables et douze guides pratiques en français et en arabe. L'idée est simple : un créateur n'a pas besoin d'une plateforme géante pour commencer, il a besoin d'outils honnêtes qui ne réclament pas ses données.",
      "Nous sommes partis d'une question : pourquoi la plupart des sites d'outils vous demandent-ils d'envoyer votre texte ou votre lien à leur serveur ? La réponse est souvent technique, rarement nécessaire. Nous avons donc tout placé côté navigateur : pas de base de données, pas de compte, pas de formulaire de collecte, pas d'API payante.",
    ],
    sections: [
      { h: "Pourquoi « Oudda » ?", p: [
        "« Oudda » désigne la boîte à outils que l'artisan emporte chaque jour : des instruments simples, bien connus, qu'il répare lui-même. Nous voulons que le site soit ainsi — léger, compréhensible, disponible quand vous en avez besoin, sans ajouter d'étape entre l'idée et la publication.",
        "Le nom est bilingue car notre public l'est réellement. Nous ne sommes pas un site arabe traduit automatiquement en français, ni un site français traduit en arabe : chaque version est écrite dans sa langue, avec ses tournures naturelles et ses exemples locaux.",
      ] },
      { h: "Comment nous écrivons", p: [
        "Chaque guide part d'un problème concret : un QR code illisible après impression, des hashtags copiés sans résultat, une miniature floue sur mobile, ou un texte arabe dont le nombre de mots est mal compté. Nous expliquons la cause avant les étapes, et les limites avant les avantages.",
        "Nous utilisons parfois des outils d'IA pour organiser un plan ou repérer un angle mort, mais les textes sont reformulés et relus manuellement, puis confrontés à la pratique. Nous ne publions pas une page pour remplir un quota et ne déclinons pas un même article en vingt versions quasi identiques.",
      ] },
      { h: "La confidentialité n'est pas une option", p: [
        "Ce que vous saisissez dans le compteur de mots, le générateur de mots de passe ou le générateur de hashtags ne quitte pas votre appareil. Nous n'utilisons ni cookies d'analyse, ni scripts de suivi, ni polices ou bibliothèques chargées depuis des serveurs tiers dans les pages d'outils. Les miniatures YouTube sont chargées depuis le CDN public d'images de la plateforme, car c'est ainsi qu'elles fonctionnent.",
        "Le site est entièrement statique (Static Export) : uniquement des fichiers HTML, CSS et JavaScript, sans serveur applicatif ni base de données. C'est plus rapide, moins cher, et facile à vérifier par n'importe qui.",
      ] },
      { h: "Comment nous finançons le projet", p: [
        "L'hébergement gratuit suffit pour un site statique. Le seul coût prévu est un nom de domaine personnalisé. Nous pourrons activer plus tard les annonces Google AdSense pour couvrir ces frais ; elles apparaîtront alors dans des emplacements dédiés, sans rien changer au fonctionnement des outils.",
        "Aucun script publicitaire n'est chargé avant une acceptation réelle au programme, et aucun identifiant d'éditeur fictif n'est placé dans ads.txt. Si vous refusez les annonces personnalisées depuis la bannière de consentement, les outils continuent de fonctionner normalement.",
      ] },
      { h: "Ce que nous ne faisons pas", p: [
        "Nous ne donnons aucun conseil juridique, fiscal, financier ou médical, ne garantissons aucune acceptation dans un programme publicitaire et ne promettons aucune hausse de vues ou d'abonnés. Nos outils sont pédagogiques et organisationnels ; la décision et la responsabilité de l'usage des résultats vous appartiennent.",
      ] },
    ],
    faq: [
      { q: "Le site dépend-il d'une entreprise ou d'une institution ?", a: "Non. Oudda est un projet de contenu indépendant et non officiel, sans lien avec une plateforme ou un organisme public." },
      { q: "Puis-je contribuer ou proposer une amélioration ?", a: "Oui, via la page « Contact ». Nous accueillons les remarques sur les erreurs de langue, les bugs et les idées d'outils." },
      { q: "Allez-vous ajouter d'autres outils ?", a: "Peut-être, à condition qu'ils soient réellement utiles et qu'ils fonctionnent dans le navigateur sans coût." },
    ],
  },
};

const contact: Record<Locale, LegalDoc> = {
  ar: {
    title: "اتصل بنا", description: "كيف تصل إلينا بخصوص خطأ أو اقتراح أو استفسار.",
    intro: [
      "نقرأ كل رسالة تصلنا. قبل أن تكتب، قد تجد جوابك مباشرة في صفحة الأسئلة الشائعة الخاصة بالأداة أو الدليل الذي تستعمله — فهي مكتوبة لتغطية أكثر الأسئلة تكرارًا.",
      "لأن الموقع ثابت بالكامل، لا توجد استمارة «اتصل بنا» ترفع بياناتك إلى خادم. بدل ذلك نستعمل رابط بريد إلكتروني عادي يفتح تطبيق البريد على جهازك. لا نجمع عناوين البريد، ولا نضعها في قائمة بريدية، ولا نستعملها لأي غرض آخر.",
    ],
    sections: [
      { h: "ما الذي يساعدنا في رسالتك؟", p: [
        "إن كنت تبلّغ عن خطأ تقني، فاذكر اسم المتصفح ونظام التشغيل، والصفحة التي حدث فيها الخطأ، والخطوات التي أدّت إليه. إن كان الخطأ لغويًا، فاذكر الجملة المقصودة واقتراحك للتصحيح. وإن كان اقتراح أداة جديدة، فاشرح المشكلة التي تحلّها لا اسم الأداة فقط.",
        "لا ترسل إلينا كلمات سر، ولا بيانات شخصية، ولا معلومات حساسة عن قناتك أو عملك؛ لسنا جهة مختصّة لحفظها، ولن نحتاجها أبدًا للردّ على استفسارك.",
      ], ul: [
        "عنوان واضح: «خطأ في عدّاد الكلمات» أفضل من «مساعدة».",
        "رابط الصفحة التي تتحدث عنها.",
        "لقطة شاشة إن كان الخطأ بصريًا — مع إخفاء أي بيانات خاصة.",
        "اللغة التي تفضّل أن نردّ بها: العربية أو الفرنسية.",
      ] },
      { h: "زمن الردّ", p: [
        "الموقع يُدار بجهود محدودة، لذلك لا نعد بردّ خلال مدة محدّدة. نحاول الردّ على البلاغات التقنية أولًا، ثم الاقتراحات التحريرية. إن لم يصلك ردّ، فلا يعني ذلك تجاهل الرسالة، بل قد تكون وصلت إلى مجلد غير مرغوب أو تأخّرت في المراجعة.",
      ] },
      { h: "الإعلانات والشراكات", p: [
        "نفضّل أن تبقى الأدوات مجانية وبلا تأثير تجاري على النتائج التي تظهر للمستخدم. لا نقبل محتوى مدفوعًا يخفي صورته كدليل محايد، ولا نبيع مساحات في النصوص التحريرية. أي إعلان يظهر على الموقع سيكون في مساحة معلّمة بوضوح على أنها إعلان.",
      ] },
    ],
    faq: [
      { q: "لماذا لا توجد استمارة اتصال؟", a: "لأن الموقع بلا خادم ولا قاعدة بيانات. رابط البريد الإلكتروني أبسط وأكثر خصوصية ولا يرسل بياناتك إلى طرف ثالث." },
      { q: "هل تردّون بالعربية والفرنسية؟", a: "نعم، نحاول الردّ باللغة التي كتبت بها رسالتك." },
      { q: "هل يمكنني طلب أداة جديدة؟", a: "نعم. اشرح لنا المشكلة والجمهور الذي يعاني منها، وسندرس إمكانية بنائها محليًا." },
    ],
  },
  fr: {
    title: "Contact", description: "Comment nous joindre pour une erreur, une idée ou une question.",
    intro: [
      "Nous lisons tous les messages reçus. Avant d'écrire, vous trouverez peut-être votre réponse dans la FAQ de l'outil ou du guide concerné : elle est rédigée pour couvrir les questions les plus fréquentes.",
      "Comme le site est entièrement statique, il n'y a pas de formulaire de contact qui envoie vos données à un serveur. Nous utilisons un simple lien e-mail qui ouvre votre application de messagerie. Nous ne collectons pas les adresses, ne les ajoutons à aucune liste et ne les utilisons à aucune autre fin.",
    ],
    sections: [
      { h: "Ce qui nous aide dans votre message", p: [
        "Pour un bug technique, indiquez le navigateur, le système d'exploitation, la page concernée et les étapes qui ont mené au problème. Pour une erreur de langue, citez la phrase et proposez une correction. Pour proposer un outil, décrivez le problème qu'il résout, pas seulement son nom.",
        "Ne nous envoyez jamais de mots de passe, de données personnelles ou d'informations sensibles sur votre chaîne ou votre activité : nous ne sommes pas habilités à les conserver et n'en avons pas besoin pour répondre.",
      ], ul: [
        "Un objet clair : « Erreur dans le compteur de mots » plutôt que « Aide ».",
        "Le lien de la page concernée.",
        "Une capture d'écran si le problème est visuel — en masquant toute donnée privée.",
        "La langue souhaitée pour la réponse : français ou arabe.",
      ] },
      { h: "Délai de réponse", p: [
        "Le site est géré avec des moyens limités : nous ne promettons pas de délai précis. Nous traitons d'abord les signalements techniques, puis les propositions éditoriales. L'absence de réponse ne signifie pas que le message a été ignoré ; il peut être arrivé dans les indésirables ou être en attente de relecture.",
      ] },
      { h: "Publicité et partenariats", p: [
        "Nous préférons que les outils restent gratuits et que les résultats affichés ne soient pas influencés par des considérations commerciales. Nous n'acceptons pas de contenu payant déguisé en guide neutre et ne vendons pas d'espaces dans les textes éditoriaux. Toute annonce sur le site apparaîtra dans un emplacement clairement identifié comme publicitaire.",
      ] },
    ],
    faq: [
      { q: "Pourquoi n'y a-t-il pas de formulaire ?", a: "Parce que le site n'a ni serveur ni base de données. Un lien e-mail est plus simple, plus privé et n'envoie rien à un tiers." },
      { q: "Répondez-vous en arabe et en français ?", a: "Oui, nous essayons de répondre dans la langue de votre message." },
      { q: "Puis-je demander un nouvel outil ?", a: "Oui. Décrivez le problème et le public concerné ; nous étudierons la possibilité de le construire localement." },
    ],
  },
};

const privacy: Record<Locale, LegalDoc> = {
  ar: {
    title: "سياسة الخصوصية", description: "أي بيانات نعالجها عند استعمال عُدّة — وأي بيانات لا نعالجها.",
    intro: [
      "هذه السياسة تشرح بوضوح ما يحدث عند زيارتك لعُدّة. القاعدة الأساسية: الأدوات تعمل داخل متصفحك، ونحن لا نملك خادمًا يستقبل ما تكتبه. آخر تحديث لهذه الصفحة: أكتوبر 2026.",
      "إن كان لديك أي سؤال حول هذه السياسة، راجع صفحة «اتصل بنا». لا تُعدّ هذه السياسة استشارة قانونية؛ إن كنت تنشر موقعًا تجاريًا، فاطلب مراجعة مختصّ في بلدك.",
    ],
    sections: [
      { h: "البيانات التي لا نجمعها", p: [
        "لا نطلب اسمك، بريدك، رقم هاتفك، تاريخ ميلادك، موقعك الجغرافي، أو أي حساب مستخدم. لا توجد استمارات تسجيل، لا تعليقات، لا نشرة بريدية، ولا رفع ملفات. النصوص التي تكتبها في عدّاد الكلمات، والروابط في مولّد QR، والكلمات المفتاحية في مولّد الهاشتاغات، وكلمات السر المولّدة، تبقى في ذاكرة الصفحة وتختفي عند إغلاقها.",
        "لا نستعمل أدوات تحليلات مثل Google Analytics، ولا نستعمل ملفات تعريف ارتباط (cookies) خاصة بنا، ولا نستعمل بكسلات تتبّع أو بصمات متصفّح. لا نحمّل خطوطًا أو سكربتات من شبكات خارجية في صفحات الأدوات.",
      ] },
      { h: "الطلبات التي تخرج من متصفحك", p: [
        "عند فتح صفحة، يطلب متصفحك ملفات HTML وCSS وJavaScript من مزوّد الاستضافة الثابتة. هذا طبيعي ولا يتضمن محتوى ما تكتبه. في أداة «عرض صورة يوتيوب المصغّرة»، يطلب متصفحك الصور مباشرة من نطاق img.youtube.com؛ لا نستطيع منع ذلك لأن هذه الصور موجودة هناك، لكننا لا نرسل أي نص تكتبه إلى ذلك النطاق سوى معرّف الفيديو العام نفسه.",
        "مولّد QR لا يستعمل أي خدمة خارجية لتوليد الرموز. مولّد الهاشتاغات يستعمل قاعدة كلمات ثابتة مضمّنة في المشروع، لا نماذج ذكاء اصطناعي مدفوعة ولا أي واجهة برمجية مدفوعة. لا توجد طلبات fetch تحمل نصوصك إلى أي جهة.",
      ] },
      { h: "ملفات تعريف الارتباط والإعلانات", p: [
        "قد نفعّل يومًا إعلانات Google AdSense لتغطية تكاليف النطاق. عندها قد يستعمل مزوّد الإعلانات ملفات تعريف ارتباط أو تقنيات مشابهة لعرض إعلانات ملائمة وقياسها. شريط الخصوصية في أسفل الصفحة يتيح لك رفض الإعلانات المخصّصة، وسيُحفظ اختيارك محليًا في متصفحك فقط (localStorage) لا على خادمنا.",
        "لا يُحمّل أي سكربت إعلاني ما لم يضبط مالك الموقع معرّف ناشر حقيقيًا في إعدادات البناء. قبل ذلك، مساحات الإعلانات مجرّد إطارات فارغة لا تتواصل مع أي جهة. ملف ads.txt لا يحتوي على أي معرّف وهمي.",
      ] },
      { h: "التخزين المحلي", p: [
        "نستعمل التخزين المحلي للمتصفح لأمرين فقط: تذكّر اختيارك في شريط الخصوصية، والاحتفاظ مؤقتًا بما تكتبه داخل القوالب القابلة للطباعة أثناء وجودك على الصفحة يمكنك مسحه فورًا عبر زر «مسح كل الكتابة» أو بمسح بيانات الموقع من متصفحك. لا يُرفع أي من هذا إلينا.",
      ] },
      { h: "الأطفال", p: [
        "الموقع موجّه لصانعي المحتوى البالغين والمراهقين، ولا يطلب أي بيانات من أي زائر. إن كنت وليّ طفل وتعتقد أنه أدخل بيانات خاصة في نموذج خارجي، فامسح بيانات المتصفح من جهازه.",
      ] },
      { h: "التغييرات على هذه السياسة", p: [
        "قد نعدّل هذه الصفحة عند تغيّر طريقة عمل الموقع، مثل تفعيل الإعلانات أو إضافة مزوّد استضافة جديد. سيظهر تاريخ آخر تحديث في أعلى هذه السياسة. استمرارك في استعمال الموقع بعد التعديل يعني أنك اطّلعت على النسخة الجديدة.",
      ] },
    ],
    faq: [
      { q: "هل ترون كلمة السر التي ولّدتها؟", a: "لا. تُولَّد داخل المتصفح باستخدام Web Crypto ولا تُرسل إلى أي جهة. ننصحك بنسخها وحفظها في مدير كلمات سر موثوق." },
      { q: "هل تتبعون زياراتي بـ Google Analytics؟", a: "لا. لا توجد أي أداة تحليلات أو تتبّع في المشروع." },
      { q: "كيف أمسح اختياري في شريط الخصوصية؟", a: "امسح بيانات الموقع (Site data) من إعدادات متصفحك، وسيظهر الشريط من جديد." },
    ],
  },
  fr: {
    title: "Politique de confidentialité", description: "Les données que nous traitons sur Oudda — et surtout celles que nous ne traitons pas.",
    intro: [
      "Cette politique explique clairement ce qui se passe lorsque vous visitez Oudda. Règle de base : les outils fonctionnent dans votre navigateur et nous n'avons aucun serveur qui reçoit ce que vous saisissez. Dernière mise à jour : octobre 2026.",
      "Pour toute question sur cette politique, consultez la page « Contact ». Ce document n'est pas un conseil juridique ; si vous publiez un site commercial, faites-le relire par un professionnel dans votre pays.",
    ],
    sections: [
      { h: "Les données que nous ne collectons pas", p: [
        "Nous ne demandons ni nom, ni e-mail, ni numéro de téléphone, ni date de naissance, ni position géographique, ni compte utilisateur. Il n'y a ni inscription, ni commentaires, ni newsletter, ni upload de fichiers. Les textes saisis dans le compteur de mots, les liens dans le générateur QR, les mots-clés du générateur de hashtags et les mots de passe générés restent en mémoire dans la page et disparaissent à sa fermeture.",
        "Nous n'utilisons aucun outil d'analyse comme Google Analytics, aucun cookie propriétaire, aucun pixel de suivi et aucune empreinte de navigateur. Aucune police ni bibliothèque externe n'est chargée dans les pages d'outils.",
      ] },
      { h: "Les requêtes qui quittent votre navigateur", p: [
        "À l'ouverture d'une page, votre navigateur demande les fichiers HTML, CSS et JavaScript à l'hébergeur statique. C'est normal et cela ne contient rien de ce que vous saisissez. Dans l'outil « miniature YouTube », votre navigateur charge les images directement depuis img.youtube.com ; nous ne pouvons pas l'éviter car ces images y sont hébergées, mais aucun texte que vous saisissez n'est envoyé à ce domaine, seul l'identifiant public de la vidéo est utilisé.",
        "Le générateur QR n'utilise aucun service externe de génération de codes. Le générateur de hashtags utilise une base de mots statique incluse dans le projet : ni modèle d'IA payant, ni API payante. Aucune requête fetch ne transporte vos textes vers un tiers.",
      ] },
      { h: "Cookies et publicité", p: [
        "Nous pourrons activer un jour les annonces Google AdSense pour couvrir le nom de domaine. Le fournisseur pourrait alors utiliser des cookies ou technologies similaires pour afficher et mesurer des annonces pertinentes. La bannière de confidentialité en bas de page vous permet de refuser les annonces personnalisées ; votre choix est conservé uniquement dans votre navigateur (localStorage), pas sur notre serveur.",
        "Aucun script publicitaire n'est chargé tant que le propriétaire du site n'a pas configuré un identifiant d'éditeur réel dans les paramètres de build. Avant cela, les emplacements publicitaires sont de simples cadres vides qui ne communiquent avec personne. Le fichier ads.txt ne contient aucun identifiant fictif.",
      ] },
      { h: "Stockage local", p: [
        "Nous utilisons le stockage local du navigateur pour deux choses seulement : mémoriser votre choix dans la bannière de confidentialité, et conserver temporairement ce que vous écrivez dans les modèles imprimables pendant votre visite. Vous pouvez l'effacer immédiatement avec le bouton « Effacer le texte » ou en supprimant les données du site depuis votre navigateur. Rien n'est téléversé vers nous.",
      ] },
      { h: "Enfants", p: [
        "Le site s'adresse à des créateurs adultes et adolescents et ne demande aucune donnée à ses visiteurs. Si vous êtes parent et pensez qu'un enfant a saisi des données privées, effacez les données du site depuis son navigateur.",
      ] },
      { h: "Modifications de cette politique", p: [
        "Nous pourrons modifier cette page si le fonctionnement du site change, par exemple en cas d'activation de la publicité ou de changement d'hébergeur. La date de dernière mise à jour figure en haut de cette politique. Continuer à utiliser le site après modification signifie que vous avez pris connaissance de la nouvelle version.",
      ] },
    ],
    faq: [
      { q: "Voyez-vous le mot de passe que j'ai généré ?", a: "Non. Il est créé dans le navigateur avec Web Crypto et n'est envoyé à personne. Copiez-le dans un gestionnaire de mots de passe fiable." },
      { q: "Suivez-vous mes visites avec Google Analytics ?", a: "Non. Aucun outil d'analyse ou de suivi n'est présent dans le projet." },
      { q: "Comment effacer mon choix de confidentialité ?", a: "Supprimez les données du site depuis les paramètres de votre navigateur ; la bannière réapparaîtra." },
    ],
  },
};

const terms: Record<Locale, LegalDoc> = {
  ar: {
    title: "شروط الاستخدام", description: "القواعد البسيطة لاستعمال عُدّة وأدواته ومحتواه.",
    intro: [
      "باستعمالك لهذا الموقع، أنت توافق على هذه الشروط. إن لم توافق، فلا تستعمل الموقع. آخر تحديث: أكتوبر 2026. هذه الشروط عامة وليست صياغة قانونية متخصّصة؛ لا تعتمد عليها كبديل لاستشارة محامٍ.",
      "الموقع مجاني بالكامل، ولا يوجد أي عقد بينك وبيننا يتضمّن دفعًا أو ضمانًا أو التزامًا بالصيانة.",
    ],
    sections: [
      { h: "الاستعمال المسموح", p: [
        "يمكنك استعمال الأدوات والقوالب لأغراضك الشخصية أو المهنية، وطباعة القوالب وتعديلها بما يناسب عملك. يمكنك الاقتباس من الأدلة بشرط ذكر المصدر «عُدّة / Oudda» مع رابط إلى الصفحة الأصلية، وبشرط ألا يكون الاقتباس مضلّلًا أو خارج سياقه.",
        "يمكنك كذلك الإشارة إلى الموقع في فيديو أو مقال أو منشور، وشرح طريقة استعماله. نرحّب بذلك ولا نطلب إذنًا مسبقًا.",
      ] },
      { h: "الاستعمال غير المسموح", p: [
        "لا يجوز نسخ صفحات كاملة وإعادة نشرها كما هي على موقع آخر أو داخل تطبيق أو قناة، ولا ترجمة الأدلة آليًا ونشرها على أنها عملك الأصلي، ولا إزالة إشارة المصدر. لا يجوز استعمال الموقع لتوليد محتوى احتيالي أو مضلّل أو ينتهك حقوق الآخرين.",
      ], ul: [
        "لا تستعمل الأدوات لانتحال شخصية أو خداع أو تصيّد.",
        "لا تحاول تعطيل الموقع أو الوصول إلى موارد غير معلنة.",
        "لا تبيع القوالب كما لو أنك مؤلّفها الوحيد.",
        "لا تضع إعلاناتك الخاصة داخل نسخة منسوخة من الموقع ونسبها إلينا.",
      ] },
      { h: "الملكية الفكرية", p: [
        "النصوص والتصاميم والشعار وأسماء الأقسام من إعدادنا، وتظل ملكًا لنا. المكتبات مفتوحة المصدر المستعملة (مثل qrcode.react) تحتفظ بتراخيصها الأصلية. الصور المصغّرة التي تعرضها أداة يوتيوب مملوكة لأصحاب الفيديوهات على المنصّة، ونحن لا نملكها ولا نسمح بتحميلها عبر موقعنا؛ نعرض رابطها العام فقط.",
        "إن أردت استعمال صورة مصغّرة لفيديو لا تملكه، فاطلب إذن صاحبه أو استعمل القنوات الرسمية للمنصّة. احترام حقوق الآخرين جزء من صناعة محتوى مستدامة.",
      ] },
      { h: "إخلاء الضمانات", p: [
        "الموقع يُقدَّم «كما هو»، دون أي ضمان صريح أو ضمني. لا نضمن أن النتائج دقيقة بنسبة 100%، ولا أن الموقع سيعمل دون انقطاع، ولا أنه خالٍ من الأخطاء. قد تتغيّر الأدوات أو تُحذف في أي وقت دون إشعار مسبق.",
        "قد يحتوي الموقع على روابط لمواقع خارجية (مثل صور يوتيوب أو صفحات رسمية). نحن لا نتحكّم في تلك المواقع ولا نتحمّل مسؤولية محتواها أو سياساتها.",
      ] },
      { h: "حدود المسؤولية", p: [
        "إلى أقصى حد يسمح به القانون المعمول به، لا نتحمّل مسؤولية أي ضرر مباشر أو غير مباشر ينتج عن استعمال الموقع أو الاعتماد على نتائجه، بما في ذلك فقدان بيانات أو فرص عمل أو أرباح. أنت وحدك المسؤول عن التحقق من أي نتيجة قبل استعمالها في قرار مهم.",
      ] },
      { h: "القانون المعمول به", p: [
        "تُفسَّر هذه الشروط وفق القواعد العامة للإنترنت والقانون المعمول به في بلد إقامة الناشر، مع احترام القوانين المحلية للمستخدم. أي نزاع يُحلّ وديًا أولًا عبر صفحة «اتصل بنا».",
      ] },
    ],
  },
  fr: {
    title: "Conditions d'utilisation", description: "Les règles simples pour utiliser Oudda, ses outils et son contenu.",
    intro: [
      "En utilisant ce site, vous acceptez ces conditions. Si vous les refusez, n'utilisez pas le site. Dernière mise à jour : octobre 2026. Ces conditions sont générales et ne constituent pas une rédaction juridique spécialisée ; ne les substituez pas à l'avis d'un avocat.",
      "Le site est entièrement gratuit : aucun contrat entre vous et nous ne prévoit de paiement, de garantie ou d'obligation de maintenance.",
    ],
    sections: [
      { h: "Usage autorisé", p: [
        "Vous pouvez utiliser les outils et les modèles pour vos besoins personnels ou professionnels, imprimer les modèles et les adapter à votre travail. Vous pouvez citer les guides en mentionnant la source « Oudda / عدّة » avec un lien vers la page originale, à condition que la citation ne soit ni trompeuse ni sortie de son contexte.",
        "Vous pouvez également mentionner le site dans une vidéo, un article ou une publication et expliquer son fonctionnement. Nous en sommes ravis et ne demandons aucune autorisation préalable.",
      ] },
      { h: "Usage interdit", p: [
        "Il est interdit de copier des pages entières et de les republier telles quelles sur un autre site ou dans une application, de traduire automatiquement les guides pour les présenter comme votre travail original, ou de retirer la mention de source. Le site ne doit pas servir à produire du contenu frauduleux, trompeur ou portant atteinte aux droits d'autrui.",
      ], ul: [
        "N'utilisez pas les outils pour usurper une identité, tromper ou hameçonner.",
        "Ne tentez pas de perturber le site ou d'accéder à des ressources non publiées.",
        "Ne vendez pas les modèles comme si vous en étiez l'unique auteur.",
        "Ne placez pas vos propres annonces dans une copie du site en nous l'attribuant.",
      ] },
      { h: "Propriété intellectuelle", p: [
        "Les textes, le design, le logo et les intitulés sont notre travail et restent notre propriété. Les bibliothèques open source utilisées (comme qrcode.react) conservent leurs licences d'origine. Les miniatures affichées par l'outil YouTube appartiennent aux ayants droit des vidéos : nous ne les possédons pas et ne permettons pas de les télécharger via notre site, nous affichons uniquement leur URL publique.",
        "Si vous souhaitez utiliser la miniature d'une vidéo qui ne vous appartient pas, demandez l'autorisation de son auteur ou passez par les canaux officiels de la plateforme. Le respect des droits d'autrui fait partie d'une création de contenu durable.",
      ] },
      { h: "Exclusion de garanties", p: [
        "Le site est fourni « tel quel », sans garantie explicite ou implicite. Nous ne garantissons pas l'exactitude absolue des résultats, ni une disponibilité ininterrompue, ni l'absence totale d'erreurs. Les outils peuvent évoluer ou être retirés à tout moment sans préavis.",
        "Le site peut contenir des liens vers des ressources externes (images YouTube, pages officielles). Nous ne contrôlons pas ces ressources et déclinons toute responsabilité quant à leur contenu ou leurs politiques.",
      ] },
      { h: "Limitation de responsabilité", p: [
        "Dans toute la mesure permise par le droit applicable, nous déclinons toute responsabilité pour un dommage direct ou indirect résultant de l'utilisation du site ou de la confiance accordée à ses résultats, y compris une perte de données, d'opportunités ou de revenus. Vous êtes seul responsable de la vérification de tout résultat avant de l'utiliser dans une décision importante.",
      ] },
      { h: "Droit applicable", p: [
        "Ces conditions s'interprètent selon les règles générales d'Internet et le droit applicable au pays de résidence de l'éditeur, dans le respect des lois locales de l'utilisateur. Tout différend est d'abord traité à l'amiable via la page « Contact ».",
      ] },
    ],
  },
};

const disclaimer: Record<Locale, LegalDoc> = {
  ar: {
    title: "إخلاء المسؤولية", description: "حدود ما تقدّمه عُدّة، وما لا تقدّمه بأي حال من الأحوال.",
    intro: [
      "هذه الصفحة مهمة: عُدّة موقع تعليمي وتنظيمي، وليس جهة استشارية. كل ما تجده هنا هو معلومات عامة لأغراض التعلّم وتنظيم العمل، وليس بديلًا عن رأي مختصّ. آخر تحديث: أكتوبر 2026.",
      "باستعمالك للموقع، فإنك تقرّ بأنك تفهمت هذه الحدود وأنك تتحمّل مسؤولية قراراتك.",
    ],
    sections: [
      { h: "لا استشارات قانونية", p: [
        "لا نقدّم استشارات قانونية، ولا نفسّر القوانين، ولا نساعد على التحايل عليها. مسائل مثل حقوق النشر، وقواعد المنصّات، والضرائب، وحماية البيانات، والعمل الحر تختلف من بلد لآخر وتتغيّر مع الوقت. راجع محاميًا أو جهة رسمية مختصّة في بلدك قبل أي إجراء قانوني.",
        "صفحات «الخصوصية» و«الشروط» و«إخلاء المسؤولية» في هذا الموقع هي نصوص توضيحية مكتوبة بلغة بسيطة، وليست صياغة قانونية معتمدة، ولا تُغني عن مراجعة مختصّ.",
      ] },
      { h: "لا استشارات مالية أو ضريبية", p: [
        "لا نقدّم نصائح استثمارية أو ضريبية أو محاسبية، ولا نحسب رواتب أو اقتطاعات أو التزامات مالية، ولا نعد بأرباح من الإعلانات أو أي نشاط تجاري. أي حديث عن تكاليف النطاق أو عرض الإعلانات هو شرح تقني عام وليس تقديرًا ماليًا لحالتك.",
      ] },
      { h: "لا استشارات طبية أو نفسية", p: [
        "لا يقدّم الموقع أي تشخيص أو علاج أو نصيحة صحية أو نفسية. إن كانت لديك مشكلة صحية، فاستشر طبيبًا مختصًا. المحتوى المتعلّق بالصحة في أمثلة الهاشتاغات هو مجرّد مثال على موضوع محتوى، وليس نصيحة طبية.",
      ] },
      { h: "لا ضمان للنتائج", p: [
        "الهاشتاغات المقترحة، وأحجام صور يوتيوب، وأحجام رموز QR، وأرقام عدّاد الكلمات هي اقتراحات تقريبية. قد تتغيّر قواعد المنصّات في أي وقت. لا نضمن زيادة المشاهدات أو المتابعين أو التفاعل، ولا نضمن قبولك في Google AdSense أو أي برنامج إعلاني.",
        "مولّد كلمات السر يستعمل عشوائية تشفيرية من متصفحك، لكن قوّة كلمة السر وحدها لا تحميك من التصيّد أو إعادة الاستعمال أو اختراق جهازك. استعمل مدير كلمات سر موثوقًا وفعّل المصادقة الثنائية حيثما أمكن.",
      ] },
      { h: "محتوى المستخدم ومحتوى الأطراف الثالثة", p: [
        "أنت المسؤول الوحيد عن النصوص التي تكتبها والروابط التي تولّدها والصور التي تختار استعمالها. نحن لا نراجعها، لا نخزّنها، ولا نتحكّم فيها. الصور المصغّرة المعروضة في أداة يوتيوب تخصّ أصحابها، ولا نقدّم أي ترخيص لاستعمالها.",
        "الموقع لا يوفّر خاصية تنزيل صور الغير مباشرة؛ إن أردت استعمال صورة، فتحقق من حقوقها أولًا.",
      ] },
      { h: "الدقة والتوفّر", p: [
        "نحرص على الدقة، لكن الأخطاء واردة. إن وجدت خطأً تقنيًا أو لغويًا، بلّغنا عبر صفحة «اتصل بنا» وسنصحّحه. قد نعدّل المحتوى أو نوقف أداة مؤقتًا للصيانة دون إشعار مسبق.",
      ] },
    ],
  },
  fr: {
    title: "Avertissement", description: "Les limites de ce qu'apporte Oudda, et ce qu'il n'apporte en aucun cas.",
    intro: [
      "Cette page est importante : Oudda est un site pédagogique et organisationnel, pas un cabinet de conseil. Tout ce que vous y trouvez est une information générale destinée à apprendre et à s'organiser, jamais un substitut à l'avis d'un professionnel. Dernière mise à jour : octobre 2026.",
      "En utilisant le site, vous reconnaissez comprendre ces limites et assumez la responsabilité de vos décisions.",
    ],
    sections: [
      { h: "Aucun conseil juridique", p: [
        "Nous ne donnons aucun conseil juridique, n'interprétons aucune loi et n'aidons pas à la contourner. Les questions de droits d'auteur, de règles des plateformes, de fiscalité, de protection des données ou de travail indépendant varient selon les pays et évoluent. Consultez un avocat ou un organisme officiel compétent dans votre pays avant toute démarche.",
        "Les pages « Confidentialité », « Conditions » et « Avertissement » de ce site sont des textes explicatifs en langage simple, pas une rédaction juridique validée, et ne remplacent pas une relecture professionnelle.",
      ] },
      { h: "Aucun conseil financier ou fiscal", p: [
        "Nous ne donnons aucun conseil en investissement, fiscalité ou comptabilité, ne calculons ni salaires, ni retenues, ni obligations financières, et ne promettons aucun revenu publicitaire. Toute mention du coût d'un domaine ou de l'affichage d'annonces est une explication technique générale, pas une estimation pour votre situation.",
      ] },
      { h: "Aucun conseil médical ou psychologique", p: [
        "Le site ne fournit aucun diagnostic, traitement ou conseil de santé physique ou mentale. Pour un problème de santé, consultez un professionnel. Le contenu lié à la santé dans les exemples de hashtags illustre un thème de contenu, il ne constitue pas un avis médical.",
      ] },
      { h: "Aucune garantie de résultat", p: [
        "Les hashtags proposés, les tailles de miniatures YouTube, les dimensions des QR codes et les chiffres du compteur de mots sont des approximations. Les règles des plateformes peuvent changer à tout moment. Nous ne garantissons aucune hausse de vues, d'abonnés ou d'engagement, ni votre acceptation dans Google AdSense ou tout autre programme.",
        "Le générateur de mots de passe utilise l'aléa cryptographique de votre navigateur, mais la robustesse d'un mot de passe ne vous protège pas seule du hameçonnage, de la réutilisation ou d'un appareil compromis. Utilisez un gestionnaire de mots de passe fiable et activez la double authentification lorsque c'est possible.",
      ] },
      { h: "Contenu utilisateur et tiers", p: [
        "Vous êtes seul responsable des textes que vous saisissez, des liens que vous générez et des images que vous choisissez d'utiliser. Nous ne les examinons pas, ne les stockons pas et ne les contrôlons pas. Les miniatures affichées dans l'outil YouTube appartiennent à leurs ayants droit et nous n'accordons aucune licence pour leur utilisation.",
        "Le site ne propose pas de téléchargement direct des images d'autrui : si vous souhaitez utiliser une image, vérifiez d'abord ses droits.",
      ] },
      { h: "Exactitude et disponibilité", p: [
        "Nous visons l'exactitude, mais des erreurs restent possibles. Si vous trouvez une erreur technique ou linguistique, signalez-la via la page « Contact » et nous la corrigerons. Le contenu peut être modifié et un outil temporairement suspendu pour maintenance sans préavis.",
      ] },
    ],
  },
};

export const LEGAL: Record<Locale, Record<LegalSlug, LegalDoc>> = {
  ar: { about: about.ar, contact: contact.ar, privacy: privacy.ar, terms: terms.ar, disclaimer: disclaimer.ar },
  fr: { about: about.fr, contact: contact.fr, privacy: privacy.fr, terms: terms.fr, disclaimer: disclaimer.fr },
};
