# عُدّة / Oudda

موقع ثابت مجاني بالعربية والفرنسية لصانعي المحتوى: 5 أدوات تعمل داخل المتصفح، 12 دليلًا أصليًا بكل لغة، و8 قوالب قابلة للطباعة بكل لغة، مع صفحات الثقة والأسئلة الشائعة.

Site statique bilingue (ar/fr) pour les créateurs de contenu : 5 outils 100 % côté navigateur, 12 guides originaux par langue et 8 modèles imprimables par langue, avec pages de confiance et FAQ.

---

## 1. ما الذي يجعله آمنًا / Ce qui le rend sûr

- **لا خادم ولا قاعدة بيانات.** `output: "export"` → مجلد `out/` يحتوي HTML/CSS/JS فقط.
- **لا تتبّع.** لا Google Analytics، لا بكسل، لا كوكيز تحليلية، لا خطوط أو سكربتات من CDN.
- **الأدوات كلها داخل المتصفح.** النصوص والروابط وكلمات السر لا تُرسل لأي جهة. لا توجد `fetch()` في مكوّنات الأدوات.
- **كلمات سر بتشفير حقيقي.** `crypto.getRandomValues` مع رفض الانحياز (rejection sampling) وخلط Fisher–Yates. لا توجد أي دالة عشوائية غير آمنة في الكود.
- **QR محلي.** مكتبة `qrcode.react` ترسم على `canvas` داخل الصفحة. لا توجد خدمة توليد خارجية.
- **الهاشتاغات من ملف JSON ثابت.** لا نموذج ذكاء اصطناعي، لا مفاتيح، لا تكلفة.
- **صور يوتيوب.** نعرض الروابط العامة من `img.youtube.com` فقط، مع بديل تلقائي عند غياب الدقة العليا. لا نوفّر تنزيل صور الغير، ونذكّر بحقوق أصحابها.
- **إعلانات اختيارية تمامًا.** لا يُحمّل أي سكربت إعلاني إلا إذا ضُبط `NEXT_PUBLIC_ADSENSE_CLIENT` **و** وافق الزائر في شريط الخصوصية. ملف `ads.txt` تعليقات فقط إلى حين الحصول على معرّف حقيقي.

## 2. المتطلبات / Prérequis

- Node.js **22** (تم البناء والتحقق على 22.23.4) و npm 10.
- لا حاجة لأي متغيّر بيئة للتطوير أو للبناء — كل شيء يعمل بقيم افتراضية آمنة.

```bash
npm ci                 # تثبيت مطابق لـ package-lock.json
npm run dev            # معاينة تطويرية
npm run typecheck      # TypeScript strict
npm run lint           # ESLint
npm test               # 32 اختبارًا
npm run build          # يولّد out/
npm run verify         # 48 فحصًا على out/
npm run check          # كل ما سبق في سلسلة واحدة
npm start              # خادم ثابت محلي بسيط لـ out/ (PORT=3000)
```

## 3. متغيّرات البيئة / Variables d'environnement

انسخ `.env.example` إلى `.env` (لا ترفع `.env` إلى مستودع عام). كلها اختيارية:

| المتغيّر | الغرض | إن تُرك فارغًا |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | نطاقك الحقيقي، مثلاً `https://votredomaine.com`. يُستعمل في canonical و hreflang المطلقة و sitemap.xml و robots.txt و JSON-LD. | **لا يُرسل الموقع أي canonical ولا أي نطاق مختلق.** hreflang تصبح نسبية، وخريطة الموقع فارغة لكنها XML صالح. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | يظهر كرابط `mailto:` في صفحة اتصل بنا. | تظهر رسالة إعداد ناقص بدل عنوان وهمي. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | معرّف الناشر `ca-pub-…` بعد القبول الفعلي في AdSense. | لا يُحمّل أي سكربت إعلاني إطلاقًا. |
| `NEXT_PUBLIC_SITE_NAME` | اسم النطاق المعروض في النصوص (اختياري). | يُستعمل اسم الموقع الافتراضي. |

> **قاعدة ذهبية:** لا تضع نطاقًا أو بريدًا أو معرّف ناشر إلا بعد أن تملكه فعلًا. لهذا لا يوجد `example.com` ولا `localhost` في `out/`.

## 4. النشر / Déploiement

### Cloudflare Pages (موصى به / recommandé)
1. ارفع المشروع إلى مستودع GitHub/GitLab.
2. أنشئ Pages project → Framework preset: **Next.js (Static HTML Export)**.
3. Build command: `npm run build` — Build output directory: `out`.
4. Environment variable: `NEXT_PUBLIC_SITE_URL=https://votredomaine.com`.
5. أضف نطاقك الخاص من قسم Custom domains (SSL مجاني).
6. بديل سريع: ارفع محتوى `oudda-static-site.zip` مباشرة (Drag & Drop) دون بناء.

### Netlify (Drop — الأسرع)
- حمّل **`oudda-NETLIFY-DROP.zip`** واسحبه مباشرة على **https://app.netlify.com/drop** — بلا بناء، بلا Git.
- أو فكّ **`oudda-BUILT-out.zip`** واسحب مجلد `out/` بوحدو (خاص `index.html` فالجدر).
- للنشر عبر Git: ملف `netlify.toml` جاهز (`publish = "out"`, `command = "npm run build"`, Node 22).
- التفاصيل فـ `DEPLOY.md`.

### GitHub Pages
- انسخ محتوى `out/` إلى فرع `gh-pages` أو مجلد `/docs`، أو استعمل Workflow يشغّل `npm ci && npm run build` ثم ينشر `out/`.
- إن استعملت مسارًا فرعيًا للمستودع، يجب ضبط `basePath` في `next.config.ts` — النشر على نطاق جذري لا يحتاج ذلك.
- ملف `out/404.html` جاهز لصفحات الخطأ.
- ✅ ملف `out/.nojekyll` موجود أصلاً: بدونه Jekyll كيتجاهل مجلد `_next` ويطلع الموقع بلا CSS/JS.
- ✅ ملف `.github/workflows/deploy-pages.yml` جاهز للنشر التلقائي.

### بعد النشر / Après le déploiement
- افتح `/ar/` و`/fr/` و`/robots.txt` و`/sitemap.xml` و`/ads.txt`.
- تحقق من canonical و hreflang في «عرض المصدر» — يجب أن تبدأ بنطاقك الحقيقي.
- أضف الموقع في Google Search Console و أرسل `sitemap.xml`.

## 5. AdSense — قائمة تحقق واقعية

هذا الموقع مصمّم ليكون **مؤهلًا** للمراجعة، لكن لا أحد يضمن القبول. قبل التقديم:

1. **نطاق خاص حقيقي** (نطاقات الاستضافة المجانية الفرعية غير مناسبة لبرنامج AdSense العادي).
2. **بريد تواصل حقيقي** يعمل، وصفحات About / Contact / Privacy / Terms / Disclaimer كاملة — موجودة هنا.
3. **محتوى أصلي كافٍ**: 12 دليلًا × لغتين + 5 صفحات أدوات طويلة (أقصر صفحة أداة ≈ 912 كلمة، وأقصر دليل ≈ 669 كلمة)، مع FAQ و JSON-LD.
4. **مراجعة بشرية**: اقرأ كل صفحة وعدّل الأمثلة لتناسب جمهورك. المحتوى الأصلي غير المنقّح والمكرّر سبب رفض شائع.
5. **عدد زيارات حقيقي وسياسة خصوصية واضحة** — لا تشترِ زيارات.
6. بعد القبول فقط: اضبط `NEXT_PUBLIC_ADSENSE_CLIENT`، أضف سطرًا واحدًا صحيحًا في `public/ads.txt`:
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` (بمعرّفك أنت)، ثم أعد البناء.
7. لا تضغط على إعلاناتك ولا تطلب من غيرك ذلك.

## 6. حدود المسؤولية / Limites de responsabilité

المحتوى تعليمي عام. لا استشارات قانونية أو ضريبية أو مالية أو طبية. نصوص الخصوصية والشروط مكتوبة بلغة بسيطة وليست صياغة قانونية معتمدة — راجع مختصًا في بلدك قبل النشر التجاري. لا نضمن نتائج المشاهدات ولا قبول AdSense. الصور المصغّرة المعروضة مملوكة لأصحابها.

## 7. بنية المشروع / Structure

```
src/app/[locale]/…       72 صفحة ثابتة (68 ثنائية اللغة + الجذر + 404 + …)
src/content/tools.ts      5 أدوات × لغتين: شروحات طويلة + نصائح + أخطاء + FAQ
src/content/guides.ts     12 دليلًا × لغتين
src/content/templates.ts  8 قوالب × لغتين
src/content/legal.ts      5 صفحات ثقة × لغتين
src/content/hashtags.json قاعدة وسوم ثابتة (لا API)
src/components/tools/     مكوّنات الأدوات الخمسة (client-side فقط)
src/lib/                  text / password / youtube / hashtags / seo / consent
scripts/                  paths / generate-meta / finalize-url / verify-site / serve / make-archive
.github/workflows/        deploy-pages.yml — نشر تلقائي مجاني على GitHub Pages
DEPLOY.md                 دليل النشر خطوة بخطوة (عربي/فرنسي)
tests/                    32 اختبارًا بـ node:test
out/                      الموقع الثابت الجاهز للرفع
```

## 8. الترخيص / Licence

النصوص والتصميم من إعداد هذا المشروع. يمكنك استعمال الأدوات والقوالب واقتباس الأدلة مع ذكر المصدر ورابط إليه؛ يُمنع نسخ صفحات كاملة وإعادة نشرها كما هي. مكتبات الطرف الثالث تحتفظ بتراخيصها (انظر `node_modules/*/LICENSE`). راجع `/terms/` (صفحة شروط الاستخدام) على الموقع.
