# نظام الثيمات - Bookik Portal

## نظرة عامة

تم إنشاء نظام ثيمات متكامل باستخدام مكتبة `next-themes` مع Next.js. يدعم النظام ثلاثة ثيمات رئيسية:

1. **الثيم الفاتح (Light)** - الثيم الافتراضي
2. **الثيم الداكن (Dark)** - للاستخدام الليلي
3. **ثيم اليوم الوطني (National Day)** - ثيم خاص باليوم الوطني السعودي

## الملفات الرئيسية

### 1. `context/ThemeProvider.tsx`

- يوفر `ThemeProvider` باستخدام `next-themes`
- يدعم الثيمات الثلاثة: `light`, `dark`, `national-day`
- يتعامل مع تفضيلات النظام تلقائياً
- يحفظ الثيم المختار في `localStorage`

### 2. `app/themes.css`

- يحتوي على متغيرات CSS للثيمات
- يحدد الألوان والظلال والحدود لكل ثيم
- يدعم الانتقالات السلسة بين الثيمات

### 3. `components/ui/ThemeToggle.tsx`

- مكون تبديل الثيمات مع قائمة منسدلة
- يعرض الثيم الحالي مع أيقونة مناسبة
- يدعم التصميم المتجاوب

### 4. `components/ui/ThemeInitializer.tsx`

- يتحقق من التاريخ تلقائياً
- يطبق ثيم اليوم الوطني في 23 سبتمبر
- يحترم اختيار المستخدم اليدوي

## كيفية الاستخدام

### 1. إضافة ThemeProvider

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/context/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
```

### 2. استخدام مكون تبديل الثيمات

```tsx
import ThemeToggle from "@/components/ui/ThemeToggle";

function Header() {
  return (
    <header>
      <ThemeToggle />
      {/* باقي محتوى الهيدر */}
    </header>
  );
}
```

### 3. استخدام hooks الثيمات

```tsx
import { useTheme } from "next-themes";

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div>
      <p>الثيم الحالي: {theme}</p>
      <button onClick={() => setTheme("dark")}>تفعيل الثيم الداكن</button>
    </div>
  );
}
```

## متغيرات CSS المتاحة

### الألوان الأساسية

```css
--theme-bg-primary      /* الخلفية الرئيسية */
--theme-bg-secondary    /* الخلفية الثانوية */
--theme-bg-tertiary     /* الخلفية الثالثية */
--theme-bg-card         /* خلفية البطاقات */
--theme-bg-overlay      /* خلفية الطبقات */
--theme-bg-input        /* خلفية حقول الإدخال */
--theme-bg-button       /* خلفية الأزرار */
--theme-bg-hover        /* خلفية عند التمرير */
--theme-bg-active       /* خلفية عند النقر */
--theme-bg-disabled     /* خلفية العناصر المعطلة */
--theme-bg-success      /* خلفية رسائل النجاح */
--theme-bg-warning      /* خلفية رسائل التحذير */
--theme-bg-error        /* خلفية رسائل الخطأ */
--theme-bg-info         /* خلفية رسائل المعلومات */
```

### ألوان النصوص

```css
--theme-text-primary    /* النص الرئيسي */
--theme-text-secondary  /* النص الثانوي */
--theme-text-tertiary   /* النص الثالثي */
--theme-text-muted      /* النص المخفف */
--theme-text-disabled   /* النص المعطل */
--theme-text-success    /* نص النجاح */
--theme-text-warning    /* نص التحذير */
--theme-text-error      /* نص الخطأ */
--theme-text-info       /* نص المعلومات */
--theme-text-link       /* نص الروابط */
--theme-text-inverse    /* النص المعكوس */
```

### ألوان الحدود

```css
--theme-border-primary  /* الحد الرئيسي */
--theme-border-secondary /* الحد الثانوي */
--theme-border-accent   /* الحد المميز */
--theme-border-focus    /* حد التركيز */
--theme-border-error    /* حد الخطأ */
--theme-border-success  /* حد النجاح */
--theme-border-warning  /* حد التحذير */
--theme-border-disabled /* الحد المعطل */
```

### ألوان التمييز

```css
--theme-accent-primary  /* اللون المميز الرئيسي */
--theme-accent-secondary /* اللون المميز الثانوي */
--theme-accent-success  /* لون النجاح */
--theme-accent-warning  /* لون التحذير */
--theme-accent-error    /* لون الخطأ */
--theme-accent-info     /* لون المعلومات */
--theme-accent-purple   /* اللون البنفسجي */
--theme-accent-pink     /* اللون الوردي */
--theme-accent-indigo   /* اللون النيلي */
--theme-accent-teal     /* اللون التركوازي */
--theme-accent-orange   /* اللون البرتقالي */
--theme-accent-rose     /* اللون الوردي الداكن */
```

### الظلال

```css
--theme-shadow-sm       /* ظل صغير */
--theme-shadow-md       /* ظل متوسط */
--theme-shadow-lg       /* ظل كبير */
--theme-shadow-xl       /* ظل كبير جداً */
--theme-shadow-2xl      /* ظل ضخم */
```

## فئات Tailwind المتاحة

### الخلفيات

```tsx
className = "bg-theme-bg-primary"; // الخلفية الرئيسية
className = "bg-theme-bg-secondary"; // الخلفية الثانوية
className = "bg-theme-bg-tertiary"; // الخلفية الثالثية
className = "bg-theme-bg-card"; // خلفية البطاقات
className = "bg-theme-bg-overlay"; // خلفية الطبقات
className = "bg-theme-bg-input"; // خلفية حقول الإدخال
className = "bg-theme-bg-button"; // خلفية الأزرار
className = "bg-theme-bg-hover"; // خلفية عند التمرير
className = "bg-theme-bg-active"; // خلفية عند النقر
className = "bg-theme-bg-disabled"; // خلفية العناصر المعطلة
className = "bg-theme-bg-success"; // خلفية رسائل النجاح
className = "bg-theme-bg-warning"; // خلفية رسائل التحذير
className = "bg-theme-bg-error"; // خلفية رسائل الخطأ
className = "bg-theme-bg-info"; // خلفية رسائل المعلومات
```

### النصوص

```tsx
className = "text-theme-text-primary"; // النص الرئيسي
className = "text-theme-text-secondary"; // النص الثانوي
className = "text-theme-text-tertiary"; // النص الثالثي
className = "text-theme-text-muted"; // النص المخفف
className = "text-theme-text-disabled"; // النص المعطل
className = "text-theme-text-success"; // نص النجاح
className = "text-theme-text-warning"; // نص التحذير
className = "text-theme-text-error"; // نص الخطأ
className = "text-theme-text-info"; // نص المعلومات
className = "text-theme-text-link"; // نص الروابط
className = "text-theme-text-inverse"; // النص المعكوس
```

### الحدود

```tsx
className = "border-theme-border-primary"; // الحد الرئيسي
className = "border-theme-border-secondary"; // الحد الثانوي
className = "border-theme-border-accent"; // الحد المميز
className = "border-theme-border-focus"; // حد التركيز
className = "border-theme-border-error"; // حد الخطأ
className = "border-theme-border-success"; // حد النجاح
className = "border-theme-border-warning"; // حد التحذير
className = "border-theme-border-disabled"; // الحد المعطل
```

### الظلال

```tsx
className = "shadow-theme-shadow-sm"; // ظل صغير
className = "shadow-theme-shadow-md"; // ظل متوسط
className = "shadow-theme-shadow-lg"; // ظل كبير
className = "shadow-theme-shadow-xl"; // ظل كبير جداً
className = "shadow-theme-shadow-2xl"; // ظل ضخم
```

## الثيمات المتاحة

### 1. الثيم الفاتح (Light)

- **الخلفية**: أبيض وألوان فاتحة
- **النصوص**: ألوان داكنة للقراءة الواضحة
- **الحدود**: ألوان رمادية فاتحة
- **الألوان المميزة**: ألوان زاهية ومتدرجة

### 2. الثيم الداكن (Dark)

- **الخلفية**: ألوان داكنة وأسود
- **النصوص**: ألوان فاتحة للتباين العالي
- **الحدود**: ألوان رمادية داكنة
- **الألوان المميزة**: ألوان نيون ومتوهجة
- **الألوان الجديدة**: خلفيات متدرجة، نصوص ملونة، حدود مميزة

### 3. ثيم اليوم الوطني (National Day)

- **الخلفية**: ألوان ذهبية فاتحة
- **النصوص**: ألوان خضراء وذهبية
- **الحدود**: ألوان العلم السعودي
- **الألوان المميزة**: الأخضر السعودي والذهبي

## أمثلة على الاستخدام

### 1. البطاقات

```tsx
<div className="bg-theme-bg-card border border-theme-border-primary rounded-bookik-rounded-lg shadow-theme-shadow-md p-4">
  <h3 className="text-theme-text-primary font-bold mb-2">عنوان البطاقة</h3>
  <p className="text-theme-text-secondary">محتوى البطاقة</p>
</div>
```

### 2. الأزرار

```tsx
<button className="bg-theme-accent-primary text-theme-text-inverse px-4 py-2 rounded-bookik-rounded-lg hover:bg-theme-accent-secondary transition-colors">
  زر
</button>
```

### 3. حقول الإدخال

```tsx
<input
  className="bg-theme-bg-input border border-theme-border-primary text-theme-text-primary px-3 py-2 rounded-bookik-rounded-md focus:border-theme-border-focus"
  placeholder="أدخل النص هنا"
/>
```

### 4. رسائل الحالة

```tsx
{
  /* رسالة نجاح */
}
<div className="bg-theme-bg-success border border-theme-border-success text-theme-text-success p-3 rounded-bookik-rounded-lg">
  تم الحفظ بنجاح!
</div>;

{
  /* رسالة تحذير */
}
<div className="bg-theme-bg-warning border border-theme-border-warning text-theme-text-warning p-3 rounded-bookik-rounded-lg">
  تحذير: يرجى التحقق من البيانات
</div>;

{
  /* رسالة خطأ */
}
<div className="bg-theme-bg-error border border-theme-border-error text-theme-text-error p-3 rounded-bookik-rounded-lg">
  حدث خطأ أثناء الحفظ
</div>;
```

## الميزات المتقدمة

### 1. الانتقالات السلسة

- جميع التغييرات تدعم الانتقالات
- مدة الانتقال: 300ms
- تأثيرات بصرية سلسة

### 2. التخزين المحلي

- يحفظ الثيم المختار في `localStorage`
- يتذكر تفضيلات المستخدم
- يدعم تفضيلات النظام

### 3. التطبيق التلقائي

- يطبق ثيم اليوم الوطني تلقائياً
- يحترم اختيار المستخدم
- يدعم تفضيلات النظام

### 4. دعم SSR

- متوافق مع Next.js
- لا يسبب مشاكل hydration
- يعمل مع SSR و SSG

## أفضل الممارسات

### 1. استخدام متغيرات الثيمات

```tsx
// ✅ صحيح
<div className="bg-theme-bg-primary text-theme-text-primary">

// ❌ خاطئ
<div className="bg-white text-black">
```

### 2. تجنب الألوان الثابتة

```tsx
// ✅ صحيح
<button className="bg-theme-accent-primary text-theme-text-inverse">

// ❌ خاطئ
<button className="bg-[#a73a93] text-white">
```

### 3. استخدام الظلال المناسبة

```tsx
// ✅ صحيح
<div className="shadow-theme-shadow-md">

// ❌ خاطئ
<div className="shadow-lg">
```

### 4. استخدام ألوان الحالة

```tsx
// ✅ صحيح
<div className="bg-theme-bg-success text-theme-text-success">

// ❌ خاطئ
<div className="bg-green-100 text-green-800">
```

## استكشاف الأخطاء

### 1. مشكلة Hydration

- تأكد من استخدام `mounted` state
- استخدم `ThemeInitializer` للتطبيق التلقائي
- تجنب استخدام `useTheme` في SSR

### 2. الثيم لا يتغير

- تأكد من إضافة `ThemeProvider`
- تحقق من `localStorage`
- أعد تشغيل التطبيق

### 3. الألوان لا تظهر

- تأكد من استيراد `themes.css`
- تحقق من متغيرات CSS
- تأكد من تطبيق `data-theme`

## التطوير المستقبلي

### 1. ثيمات إضافية

- ثيمات موسمية
- ثيمات خاصة بالأحداث
- ثيمات مخصصة للمستخدمين

### 2. تخصيص متقدم

- ألوان مخصصة
- خطوط مخصصة
- تأثيرات بصرية إضافية

### 3. دعم أفضل للأجهزة

- تحسين للأجهزة المحمولة
- دعم أفضل للشاشات الكبيرة
- تحسين الأداء

## الدعم والمساعدة

للمساعدة في تطوير أو تخصيص نظام الثيمات، يرجى التواصل مع فريق التطوير أو مراجعة الوثائق الرسمية لمكتبة `next-themes`.
