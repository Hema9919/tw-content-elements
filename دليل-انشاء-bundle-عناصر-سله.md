# دليل إنشاء مشروع عناصر جديدة (Content Elements Bundle) لمتجر سلة — يدويًا بدون Salla CLI

> هذا الدليل بديل لأمر `salla bundle create` في حالة فشله على ويندوز (بسبب مشاكل `spawn pnpm ENOENT` أو `spawn /bin/zsh ENOENT`).

---

## 1) إنشاء الـ Bundle من لوحة Salla Partners

1. ادخل على [salla.partners](https://salla.partners) وسجّل دخول.
2. من القائمة الجانبية اضغط **Bundles**.
3. اضغط **Create your first bundle**.
4. اختار واحدة من طريقتين:
   - **Import Bundle from Github**: لو عندك ريبو جاهز، تربطه (Authorize مع GitHub + اختيار الريبو).
   - **Create Bundle**: تملأ البيانات يدويًا (أيقونة، اسم بالعربي/الإنجليزي، رابط دعم، إيميل دعم) ثم **Create Bundle**.

> ملحوظة: لو اخترت Import من ريبو موجود، سلة بتضيف تلقائيًا ملفات أساسية في الريبو (`README.md`, `package.json`, `twilight-bundle.json`) — لازم تاخد بالك منها لما تشتغل محليًا (راجع قسم "حل تعارض package.json" تحت).

---

## 2) تجهيز المشروع محليًا (بديل خطوة الـ CLI)

### أ. إنشاء المجلد وربطه بالريبو
```bash
mkdir tw-content-elements
cd tw-content-elements
git init
git remote add origin https://github.com/<حسابك>/tw-content-elements.git
```

### ب. تثبيت الحزمة الأساسية
الحزمة `@salla.sa/twilight-bundles` **لازم تتثبت بـ pnpm فقط** (مبرمجة ترفض npm/yarn):
```bash
npm install -g pnpm     # لو مش مثبت أصلاً
pnpm init                # لو الملف package.json مش موجود
pnpm install @salla.sa/twilight-bundles
```

### ج. الموافقة على build scripts
إصدارات pnpm الحديثة بتوقف build scripts تلقائيًا كإجراء أمان:
```bash
pnpm approve-builds
```
(اختار الحزمة بالـ Space ثم Enter)، وبعدين:
```bash
pnpm install
```

### د. هيكل المجلدات المطلوب
```
tw-content-elements/
└── src/
    └── components/
        └── your-component-name/
            ├── index.ts      # ملف المكوّن الرئيسي
            ├── styles.ts     # (اختياري)
            └── types.ts      # (اختياري)
```

---

## 3) رفع المشروع على GitHub وربطه بالـ Bundle

```bash
git add -A
git commit -m "Initial content elements bundle"
git branch -M main
git push -u origin main
```

### لو ظهر خطأ `non-fast-forward` (لأن سلة عملت commits على الريبو زي README/package.json):
```bash
git pull origin main --allow-unrelated-histories
```

### حل تعارض package.json (لو حصل):
- افتح الملف، هتلاقي تعارض بين نسختك ونسخة سلة.
- **احتفظ بنسخة سلة كاملة** (فيها `devDependencies`, `scripts`, `type: module`... إلخ)، لأنها الصحيحة والمُعدّة مسبقًا للعمل مع Vite وTwilight Bundles.
- احذف رموز `<<<<<<< HEAD` / `=======` / `>>>>>>>`.
- بعد الحفظ:
```bash
git add package.json
git commit -m "Merge remote changes with local setup"
git push -u origin main
pnpm install
```

---

## 4) تشغيل المشروع محليًا

```bash
pnpm run dev
```
هيشتغل Vite على `http://localhost:5173/`.

> تحذير طبيعي وقت البداية: `Could not auto-determine entry point...` — يختفي أول ما تضيف أول component جوه `src/components/`.

---

## ⚠️ ملاحظات عامة مهمة

- **متستخدمش npm أو yarn أبدًا** مع هذه الحزمة — استخدم pnpm فقط.
- **متستخدمش أمر salla-cli لإنشاء bundle على ويندوز** إلا لو حليت مشاكل WSL/zsh بشكل نهائي — الطريقة اليدوية أسرع وأضمن.
- لو حبيت تجرب الـ CLI تاني بعدين، تأكد إن WSL مفعّل بالكامل (`wsl --install`) وإن zsh متثبت جواه.
- عند عمل bundle جديد تاني في المستقبل، اتبع نفس الترتيب: (Partners Portal → git init/remote → pnpm install → approve-builds → git push → حل تعارض package.json لو حصل → pnpm run dev).

---
*آخر تحديث: 24 يوليو 2026*
