# Universal Components Documentation

## نظرة عامة

تم إنشاء مجموعة من المكونات العالمية لتحسين التناسق والأداء في التطبيق. هذه المكونات مصممة لاستخدامها في جميع أنحاء التطبيق لضمان تجربة مستخدم متسقة.

## المكونات الجديدة

### 1. UniversalCard

مكون كارد عالمي يمكن استخدامه لعرض الفيديوهات، العروض، الكوبونات، والمنشورات.

#### الاستخدام

```tsx
import UniversalCard from "@/components/ui/UniversalCard";

<UniversalCard
  id="123"
  title="عنوان العرض"
  image="/path/to/image.jpg"
  type="video" // أو "offer" أو "coupon" أو "post"
  discount="20%"
  views={150}
  likes={25}
  onClick={() => handleClick()}
  href="/store/123" // اختياري
  className="custom-class"
/>;
```

#### الخصائص

- `id`: معرف العنصر
- `title`: عنوان العنصر
- `image`: رابط الصورة
- `type`: نوع العنصر (video, offer, coupon, post)
- `discount`: نسبة الخصم (اختياري)
- `views`: عدد المشاهدات (اختياري)
- `likes`: عدد الإعجابات (اختياري)
- `onClick`: دالة النقر (اختياري)
- `href`: رابط التوجيه (اختياري)
- `className`: كلاسات CSS إضافية (اختياري)

### 2. Image Component (Next.js)

تم استخدام مكون Image الخاص بـ Next.js مع خاصية lazy loading المدمجة.

#### الاستخدام

```tsx
import Image from "next/image";

<Image
  src="/path/to/image.jpg"
  alt="وصف الصورة"
  width={300}
  height={200}
  fill={false}
  className="custom-class"
  loading="lazy"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = "/fallback-image.jpg";
  }}
/>;
```

#### الخصائص

- `src`: رابط الصورة
- `alt`: نص بديل للصورة
- `width`: عرض الصورة (إذا لم يكن fill)
- `height`: ارتفاع الصورة (إذا لم يكن fill)
- `fill`: ملء الحاوية (boolean)
- `className`: كلاسات CSS إضافية
- `loading`: "lazy" للتحميل الكسول أو "eager" للتحميل الفوري
- `onError`: دالة عند خطأ التحميل

### 3. InfiniteScroll

مكون لتحميل المحتوى بشكل لا نهائي عند الوصول لنهاية الصفحة.

#### الاستخدام

```tsx
import InfiniteScroll from "@/components/ui/InfiniteScroll";

<InfiniteScroll
  hasMore={true}
  loadMore={() => fetchMoreData()}
  threshold={0.1}
  rootMargin="100px"
  className="custom-class"
  loadingComponent={<CustomLoader />}
  endMessage={<CustomEndMessage />}
>
  {items.map((item) => (
    <ItemComponent key={item.id} item={item} />
  ))}
</InfiniteScroll>;
```

#### الخصائص

- `hasMore`: هل يوجد المزيد من المحتوى
- `loadMore`: دالة تحميل المزيد
- `threshold`: عتبة التحميل (0-1)
- `rootMargin`: هامش الجذر
- `className`: كلاسات CSS إضافية
- `loadingComponent`: مكون التحميل المخصص
- `endMessage`: رسالة نهاية المحتوى

## التحديثات المطبقة

### صفحة البروفايل (`app/profile/[id]/page.tsx`)

- ✅ تحديث التابات لتكون: posts, offers, likes, coupons
- ✅ استخدام UniversalCard لجميع أنواع المحتوى
- ✅ إزالة console.log statements
- ✅ تحسين الإحصائيات
- ✅ تحديث VideoModal للعمل مع البيانات الجديدة

### مكون Slider (`app/Explorer/_components/Slider.tsx`)

- ✅ استخدام UniversalCard بدلاً من الكود المخصص
- ✅ تحسين الأداء مع Image component من Next.js
- ✅ الحفاظ على معلومات المستخدم

### مكون CategoryCard (`app/Discover/Categories/_components/CategoryCard.tsx`)

- ✅ استخدام UniversalCard كقاعدة
- ✅ إضافة معلومات إضافية كـ overlay
- ✅ تحسين التصميم والاستجابة

### صفحة المتجر (`app/store/[id]/page.tsx`)

- ✅ استخدام UniversalCard للعروض
- ✅ تحسين Empty states
- ✅ توحيد التصميم

## المزايا

### 1. التناسق

- تصميم موحد لجميع الكروت
- ألوان وظلال متسقة
- تأثيرات hover موحدة

### 2. الأداء

- تحميل كسول للصور باستخدام Next.js Image
- تحسين استخدام الذاكرة
- تحسين سرعة التحميل

### 3. سهولة الصيانة

- كود أقل تكراراً
- مكونات قابلة لإعادة الاستخدام
- تحديثات مركزية

### 4. تجربة المستخدم

- تحميل سلس للمحتوى
- تأثيرات بصرية محسنة
- استجابة أفضل للأجهزة المختلفة

## الاستخدام المستقبلي

يمكن استخدام هذه المكونات في:

- صفحات جديدة
- مكونات أخرى تحتاج لعرض المحتوى
- تحسين المكونات الموجودة
- إضافة ميزات جديدة

## التطوير المستقبلي

- إضافة المزيد من أنواع الكروت
- تحسين InfiniteScroll
- إضافة المزيد من التأثيرات البصرية
- تحسين الأداء أكثر
