# إصلاح رابط Netlify — عُدّة / Oudda

## 1) علاش الرابط اللي عطيتيني "ما كيفتش"؟

`https://app.netlify.com/projects/oudda-content/deploys` هادي **صفحة التحكم الخاصة بحسابك** (Dashboard)، ماشي رابط الموقع.
- كتفتح غير إلا كنت **مسجّل الدخول** فنفس حساب Netlify.
- أي شخص آخر (حتى أنا) ما يقدرش يشوفها — كتردّو لصفحة Login.

✅ **الرابط العمومي ديال الموقع هو:**
```
https://oudda-content.netlify.app/
```

## 2) التشخيص اللي درتُو (باش تفهم المشكل)

| الرابط | الحالة |
|---|---|
| `https://oudda-content.netlify.app/` | ❌ 404 |
| `https://oudda-content.netlify.app/ar/` | ❌ 404 |
| `https://oudda-content.netlify.app/out/ar/` | ✅ 200 — الصفحة كاينة! |
| `/_next/static/chunks/…css` | ❌ 404 → التصميم والأدوات مكسورين |

**السبب:** ترفع المجلد **الأب** اللي فيه `out/`، ماشي محتوى `out/` برّاصو.
Netlify حطّ كلشي تحت `/out/`، و HTML كيشير لـ `/_next/…` (جذر مطلق) → ما لقاهومش.

> يعني الموقع **ماشي فارغ** — كاين، غير فالبلاصة الغلط.

## 3) الحل — اختار طريقة وحدة

### ✅ الطريقة A (الأسهل): أعد النشر بـ `oudda-NETLIFY-FIX.zip`
1. افتح **https://app.netlify.com/projects/oudda-content/deploys** (سجّل الدخول أولاً).
2. كاين مربع **"Deploy manually" / "Drag and drop your site output folder here"** — اسحب **`oudda-NETLIFY-FIX.zip`** فيه.
   (أو من **Deploys → Deploy settings → Deploy manually**.)
3. ستنى حتى يولّي **Published** (ثوانٍ).
4. جرّب:
   ```
   https://oudda-content.netlify.app/
   https://oudda-content.netlify.app/ar/
   https://oudda-content.netlify.app/fr/
   https://oudda-content.netlify.app/ar/tools/qr-generator/
   ```

💡 هاد الملف زدت فيه `_redirects` باش حتى الروابط القديمة `/out/*` توجّه للجذر أوتوماتيكياً.

### ✅ الطريقة B: بلا ما تستعمل ملف جديد
1. فكّ **`oudda-BUILT-out.zip`**.
2. غتلقى مجلد اسمو `out` — **ادخل ليه**.
3. اسحب **المجلد `out` بوحدو** لمربع النشر (ماشي الأب ديالو).
4. ✅ خاصك تشوف `index.html` مباشرة فأول ما تفتح المجلد اللي كتسحبو.

### ❌ ما ترفعش هادو
- `oudda-BUILT-out.zip` → كيرجّع نفس المشكل (`/out/`).
- `oudda-complete.zip` / `oudda-source.zip` → كود مصدري، ماشي موقع مبني.

## 4) إلا بغيتي تبدّل المشروع من Git (اختياري)
ملف `netlify.toml` فالمصدر مضبوط:
```toml
[build]
  command = "npm run build"
  publish = "out"
[build.environment]
  NODE_VERSION = "22"
```
من بعد ما تربط الـ repo، Netlify كيبني ويطلّع `out/` وحدو بلا مشكل.

## 5) من بعد ما يخدم ✅
- بدّل الرابط القديم اللي شاركتيه بالنابض الصحيح `https://oudda-content.netlify.app/ar/`.
- عطيني الرابط باش نصلّح لك `canonical` + `sitemap.xml` (68 رابط) + `robots.txt` بلا إعادة بناء.
- ضبط `NEXT_PUBLIC_CONTACT_EMAIL` باش صفحة «اتصل بنا» ما تبقاش كتقول «إعداد ناقص».

---
**SHA-256 ديال ملف التصحيح:** `3375642e501ddfaca4043be9df6091fd68e890fa0714db513e0dd2c4863cb909`
