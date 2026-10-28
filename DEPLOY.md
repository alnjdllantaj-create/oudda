# دليل النشر — عُدّة / Oudda
## Guide de mise en ligne — gratuit, étape par étape

**الهدف / Objectif :** موقعك على النت اليوم بصفر درهم، يخدم الناس شهورًا، ومن بعد تقدّم على AdSense.
**Avoir votre site en ligne aujourd'hui pour 0 DH, le faire vivre quelques semaines, puis demander AdSense.**

---

## الخريطة / La carte (3 مراحل)

| المرحلة | الوقت | التكلفة | النتيجة |
|---|---|---|---|
| **1. النشر** | 10 دقائق | **0 DH** | `https://oudda-xxx.pages.dev` أو `https://xxxx.netlify.app` شغّال للعالم |
| **2. الفهرسة والزيارات** | 15 دقيقة + أسابيع | **0 DH** | كيظهر فـ Google، كيجيه زوّار |
| **3. النطاق + AdSense** | بعد 4–8 أسابيع | ~120–150 DH/سنة | نطاق خاص + تقديم على أدسنس |

> ⚠️ **الصراحة أولاً:** الاستضافة مجانية بالكامل، ولكن **AdSense عمليًا كيطلب نطاق خاص** (ماشي `pages.dev` ولا `netlify.app`). النطاق هو المصروف الوحيد: `.ma` تقريبًا **119–150 DH/سنة** و`.com` تقريبًا **145 DH/سنة** عند مسجّلين مغاربة. [⚠️ تكلفة النطاق](https://www.hebergeurmarocain.com/guide-nom-domaine-maroc/) · [أسعار .ma و .com](https://www.vala.ma/domaine) · [Cloudflare Registrar international](https://rohansurve.in/blog/make-money-online/how-to-get-google-adsense-approved-for-your-blog-in-2026)


---

## 🚀 طريقة Netlify (إلا بغيتي Netlify بالضبط) — 3 دقائق، 0 درهم

**الملفات الجاهزة ليك:**
- **`oudda-BUILT-out.zip`** ← فيه مجلد **`out/`** كامل (702 ملف، 72 صفحة HTML) + `README-NETLIFY.txt`.
- **`oudda-NETLIFY-DROP.zip`** ← نفس الموقع ولكن مسطّح (الملفات فالجذر)، تقدر تسحب الـ ZIP برّه مباشرة.

### أ) أسهل طريقة (بلا ما تفكّ حتى شي)
1. سير لـ **https://app.netlify.com/drop**
2. اسحب **`oudda-NETLIFY-DROP.zip`** مباشرة فالمربع.
3. كتخرج لك `https://xxxx.netlify.app` فثوانٍ — جرّب `/ar/` و`/fr/`.
4. **سجّل الدخول / Sign up** باش تثبيت الرابط (بلا حساب كيبقى الرابط مؤقتاً ومحمي بكلمة سر). [وثائق Netlify Drop](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/)

### ب) إلا بغيتي تشوف مجلد `out/` بعينيك
1. فكّ **`oudda-BUILT-out.zip`** → غتلقى مجلد اسمو `out`.
2. اسحب **مجلد `out` بوحدو** (ماشي المجلد الأب) لـ Netlify Drop.
3. ✅ خاص `index.html` يكون فجدر المجلد اللي كتسحبو. Netlify كينصح: فكّ الـ ZIP أولاً وتأكد أن الملفات داخل مجلد. [وثائق Create deploys](https://docs.netlify.com/deploy/create-deploys/)

### ج) إلا بغيتي Git + بناء تلقائي
- ملف **`netlify.toml`** موجود فالمصدر: `publish = "out"` و`command = "npm run build"` و`NODE_VERSION = "22"`.
- فـ Netlify: **Add new site → Import from Git** → هو كيقرا الإعداد بوحدو.
- ⚠️ مهم: ما تخلّيش Netlify يبني من `.next` — خاصو يطلّع `out/` (مضبوط فالملف).

> **تنبيه على الخطة المجانية (2026):** Netlify Drop مجاني، ولكن الحسابات الجديدة كتخدم بـ **300 crédit/شهر** (كل deploy بـ 15 crédits، وbandwidth ≈15 GB). موقع صغير كيدوز عادي. إلا بغيتي bandwidth غير محدود بلا قيود، **Cloudflare Pages** (المرحلة 1) أحسن على المدى الطويل. [تفاصيل رصيد Netlify المجاني](https://convika.com/compare/netlify-free-plan/)

> **و AdSense؟** `*.netlify.app` نطاق فرعي مجاني — مزيان للبداية، ولكن قبل التقديم على AdSense بدّلو بنطاق خاص (`Site settings → Domain management → Add custom domain`، الشهادة مجانية). [Netlify: نطاق مخصص وSSL مجاني](https://www.netlify.com/knowledge-base/deploy-your-google-stitch-app-to-netlify/)

---

# المرحلة 1 — انشر الموقع دابا (10 دقائق، 0 DH)

### 1.1 حمّل الملف
من مساحة العمل: **`oudda-static-site.zip`** (≈3 MB، فيه 702 ملف).
⚠️ ما ترفعوش `oudda-complete.zip` — هاديك فيها المصدر كامل.

### 1.2 حساب Cloudflare (مجاني)
1. سير لـ **https://dash.cloudflare.com/sign-up** → سجّل بالإيميل + كلمة سر → أكّد الإيميل.
2. من القائمة: **Workers & Pages** → **Create application** → Tab **Pages** → **Drag and drop your files**.
3. سمّي المشروع مثلًا `oudda` (أي اسم متاح) → **Create project**.
4. اسحب **`oudda-static-site.zip`** فالمربع → **Deploy site**.

✅ بعد ثوانٍ: `https://oudda.pages.dev` (أو بزيادة حروف عشوائية).

**علاش Cloudflare؟** الطلبات والـ bandwidth على الملفات الثابتة **مجانية وغير محدودة**، 500 بناء/شهر، 20.000 ملف، و100 نطاق مخصص فالخطة المجانية، و SSL/HTTPS تلقائي. الرفع بالسحب محدود فـ **1.000 ملف** — موقعك 702 ✅. [وثائق Cloudflare للحدود](https://developers.cloudflare.com/pages/platform/limits/) · [وثائق الرفع المباشر](https://developers.cloudflare.com/pages/get-started/direct-upload/)

### 1.3 جرّب بصح (دقيقتان)
- افتح `https://oudda.pages.dev/ar/` و`/fr/`
- جرّب أداة QR، بدّل اللغة، اطبع قالب
- افتح `/ads.txt` و`/robots.txt` و`/sitemap.xml`
- صغّر النافذة باش تشوف شكل الهاتف

🎉 **موقعك منشور — شارك الرابط دابا مع الناس.**

### 1.4 (اختياري) النشر التلقائي بـ Git — مجاني حتى هو
إلا بغيتي كل تعديل يطلع أوتوماتيك:
1. فكّ `oudda-source.zip`، اعمل repository على GitHub (Public).
2. الملف `.github/workflows/deploy-pages.yml` جاهز أصلاً.
3. فـ Cloudflare Pages: اربط الـ repo، Build command = `npm run build`، Output = `out`، Node = 22.
4. فـ GitHub: **Settings → Secrets and variables → Actions → Variables**، زيد `NEXT_PUBLIC_SITE_URL` (= رابط pages.dev ديالك) و`NEXT_PUBLIC_CONTACT_EMAIL`.

> **GitHub Pages بديل مجاني:** استعمل نفس الـ workflow (كيخدم `actions/deploy-pages`). ضروري الملف **`out/.nojekyll`** — موجود أصلاً فالنسخة ديالنا — حيت Jekyll كيتجاهل مجلد `_next` ويخلي الموقع بلا CSS. [شرح .nojekyll](https://www.runxbuild.com/blog/getting-started-with-github-pages/) · [وثائق GitHub للنطاقات](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)

---

# المرحلة 2 — خلّي Google يعرف بيك (0 DH)

### 2.1 canonical و sitemap (مهم!)
الموقع كيتبنى **بلا canonical ولا روابط فالـ sitemap** حيت ما كاين حتى نطاق حقيقي مضبوط. منين تعرف الرابط ديال pages.dev، عندك جوج خيارات:

**الخيار A (الأسهل):** قولّي الرابط وكنعيد لك البناء فـ 20 ثانية.
**الخيار B (بنفسك، بلا إعادة بناء):**
```bash
node scripts/finalize-url.mjs https://oudda.pages.dev
```
هادا كيصلّح الـ 68 صفحة: canonical مطلق + hreflang مطلق + `og:url` + `sitemap.xml` بـ 68 رابط + سطر `Sitemap:` فـ `robots.txt`. من بعد أعد ضغط `out/` وارفعو من جديد فـ Cloudflare (**Create new deployment**).
(مختبر: 68 صفحة، 50/50 فحص ناجح ✅.)

> إلا درتي `NEXT_PUBLIC_SITE_URL` فـ متغيّرات البناء، `generate-meta.mjs` كيدير نفس الشي أوتوماتيكياً.

### 2.2 Google Search Console
1. سير لـ **https://search.google.com/search-console** → **Add property** → **URL prefix** → الصق `https://oudda.pages.dev`.
2. التحقق: إمّا **HTML tag** (زيدو فـ `<head>` وأعد الرفع) أو **DNS** (أسهل: CNAME/TXT عند مزوّد النطاق من بعد ما تشري النطاق). مع pages.dev، طريقة **DNS** ماشي متاحة ديما → استعمل **HTML tag** أو **Google Analytics/Search Console verification عبر `finalize-url`**… أسهل طريق: ضع ملف التحقق فـ `public/` وأعد البناء.
3. من **Sitemaps** قدّم: `sitemap.xml`.
4. من **URL Inspection** اطلب فهرسة `https://oudda.pages.dev/ar/`.

### 2.3 جيب زوّار حقيقيين (بلا ما تخلص)
- **شارك** رابط كل دليل فـ مجموعات فيسبوك/ديسكورد/واتساب عندها نفس الاهتمام (بلا سبام).
- **Pinterest**: أنشئ Pin لكل قالب قابل للطباعة (القوالب كيجيبو ترافيك دائم).
- **تيك توك / إنستغرام / يوتيوب Shorts**: صوّر 30 ثانية كتشرح أداة واحدة (مثلاً «كيف تصنع QR للطباعة») وحط الرابط فالبايو.
- **زيد دليل واحد كل أسبوع** — استعمل القوالب الموجودة كأمثلة.
- ✅ ممنوع: شراء زيارات، تبادل نقرات، بوتات، أو الضغط على إعلاناتك. هادي كتسبّب رفض AdSense نهائيًا. [سياسات المحتوى منخفض القيمة](https://support.google.com/adsense/community-guide/241032356/how-can-you-solve-the-low-value-content-adsense-disapproval-challenge?hl=en)

---

# المرحلة 3 — النطاق ومن بعد AdSense (بعد 4–8 أسابيع)

### 3.1 شري نطاق
- `.ma`: ~119–150 DH/سنة عند مسجّل معتمد ANRT (Clouder, Hostino, ADK Media…). خاصك **CIN** للتسجيل و14 يوم لتأكيد الهوية، وإلا كيدوز `serverHold`. [دليل .ma 2026](https://www.hebergeurmarocain.com/guide-nom-domaine-maroc/)
- أولاً `.com`: ~145 DH/سنة عند مزوّد مغربي، أو ~$10/سنة عند Cloudflare Registrar / Namecheap. [مقارنة الأسعار](https://www.vala.ma/domaine)
- نصيحة: خد **`oudda.com`** أولاً `.ma`، وخلي الاسم قصير وسهل.

### 3.2 اربطو بـ Cloudflare (مجاني)
1. فـ Cloudflare Pages → مشروعك → **Custom domains** → **Set up a custom domain** → اكتب `oudda.com`.
2. Cloudflare كيعطيك سجلّات DNS (CNAME للـ `www` و A للنطاق العاري). زيدهم عند مسجّل النطاق.
3. **Enforce HTTPS** — الشهادة كتجي أوتوماتيكياً (Let's Encrypt، مجانية).
4. قرّر: إمّا `https://oudda.com` أو `https://www.oudda.com` — **واحد فقط**، والآخر يعمل تحويل 301. [أهمية الـ canonical الموحّد](https://howtomakemoneyfromhome.online/ai-websites/adsense-approval-guide/)

### 3.3 أعد البناء بالنطاق الحقيقي
```bash
NEXT_PUBLIC_SITE_URL=https://oudda.com \
NEXT_PUBLIC_CONTACT_EMAIL=contact@oudda.com \
npm ci && npm run build && npm run verify
```
أو قولّي النطاق وكنجهّز لك ZIP جاهز. النتيجة: canonical مطلقة + hreflang مطلقة + sitemap بـ 68 رابط + robots.txt صحيح + `og:url` + JSON-LD.
✅ **`NEXT_PUBLIC_CONTACT_EMAIL` ضروري**: بلا بيه صفحة «اتصل بنا» كتظهر «إعداد ناقص»، وAdSense كيشوفها نقطة ضعف. [قائمة صفحات الثقة المطلوبة](https://theguidex.com/google-adsense-approval/)

### 3.4 راجع قبل التقديم (قائمة قصيرة)
- [ ] 18 سنة فما فوق، حساب Google واحد فقط، ما عندكش حساب AdSense محظور. [الشروط الرسمية ملخّصة](https://www.digitalpritam.in/google-adsense-approval/)
- [ ] الموقع شغّال على نطاقك الخاص، HTTPS، سريع على الهاتف.
- [ ] كل الصفحات مكتوبة بأسلوبك: بدّل الأمثلة، زيد تجربتك الشخصية، صحّح الأخطاء. **المحتوى الأصلي هو الشرط رقم 1**؛ الرفض الأكثر شيوعًا هو «low value content». [تحليل 2026](https://theguidex.com/resources/google-adsense-approval)
- [ ] صفحات About / Contact / Privacy / Terms / Disclaimer كاملين ومربوطين فالفوتر (موجودين ✅).
- [ ] **`ads.txt` مازال تعليقات فقط** — لا تضع `pub-…` قبل القبول.
- [ ] صفر روابط مكسورة، صفر صفحات فارغة، sitemap مقبول فـ Search Console.
- [ ] شوية زيارات حقيقية (ما كاينش حد أدنى رسمي، ولكن كيعاون). [لا يوجد حد أدنى رسمي للزيارات](https://blogerhub.com/adsense-approval-update-2026-what-new-blogs-must-know/)

### 3.5 قدّم على AdSense
1. **https://www.google.com/adsense/start** → سجّل الدخول → اربط الموقع.
2. للتحقق من الملكية: إمّا كود AdSense فـ `<head>` **أو** ملف `ads.txt` فالجذر **أو** ملكية Search Console. [خيارات التحقق](https://itsdad.io/adsense/setting-up-your-website-for-success)
3. ⚠️ **قولّي قبل ما تقدّم**: الإعلانات دابا كتظهر غير بعد ما الزائر يوافق فشريط الخصوصية، وزاحف AdSense ما كيشوفهاش. كندير لك تبديل صغير (5 دقائق) باش الكود كيبان فـ `<head>` والوحدات كتظهر للزاحف مع احترام رفض الزائر — بلا ما نخرجو على شرط «ما كيتحمّل حتى سكربت إلا بمعرّف ناشر حقيقي».
4. بعد القبول: ضبط `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-…` + سطر واحد صحيح فـ `public/ads.txt`:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
   ثم إعادة البناء والرفع.
5. ❌ عمرك تضغط على إعلاناتك ولا تطلب من شي واحد يضغط.

---

## أسئلة سريعة / FAQ express

**واش نقدر نبدا بلا ما نشري النطاق؟** نعم — المرحلة 1 و2 كاملين بصفر درهم. غير ما تقدّمش على AdSense بـ `pages.dev` ولا `netlify.app`: كيترفض غالبًا حيت النطاق ماشي ملكك. [تحليل حالة Vercel/Netlify/GitHub subdomains](https://dev.to/morinaga/why-google-adsense-will-not-approve-a-vercelapp-site-110b) · [AdSense وإزالة السابدومينات](https://www.webnots.com/how-to-add-subdomains-in-google-adsense-account/)

**واش كاين حد أدنى دالزيارات أو 20 مقال؟** لا — Google ما كيعلن حتى حد رسمي لا للزيارات لا لعدد المقالات لا لعمر النطاق. كيطلب محتوى أصلي ومفيد وتجربة مستخدم مزيانة. [الخرافات الشائعة](https://theguidex.com/resources/google-adsense-approval) · [قراءة 2026](https://www.digitalpritam.in/google-adsense-approval/)

**شحال كيخصني من الوقت قبل ما نربح؟** واقعيًا: الفهرسة 1–3 أسابيع، ترافيك Pinterest/الشبكات الاجتماعية 1–3 أشهر، SEO 3–6 أشهر. AdSense كيقبل موقع صغير — ولكن الربح كيجي مع الترافيك، ماشي مع القبول بوحدو.

**واش كاين شي مصاريف مخفية؟** لا. الاستضافة مجانية، SSL مجاني، الأدوات كلها داخل المتصفح، حتى APIs مدفوعة ما كايناش. غير النطاق (~120–150 DH/سنة).

---

## أوامر مفيدة / Commandes utiles

```bash
# إعادة بناء كاملة وفحص
npm ci && npm run check

# ضبط نطاق على نسخة out/ جاهزة (بلا إعادة بناء)
node scripts/finalize-url.mjs https://oudda.com

# معاينة محلية لـ out/
npm start            # http://localhost:3000

# فحص شامل لـ out/
npm run verify
```
