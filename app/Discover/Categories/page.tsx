import Link from "next/link";
import { getCategories } from "../../../server-actions/index";
import CategoryGrid from "./_components/CategoryGrid";
import Image from "next/image";
import EmptyState from "../../../components/ui/EmptyState";
import { MdCategory } from "react-icons/md";

export const revalidate = 3600;

const Categories = async () => {
  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen bg-theme-bg-primary">
        <EmptyState
          icon={MdCategory}
          title="لا توجد فئات متاحة"
          description="عذراً، لا توجد فئات عروض متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً."
          actionText="العودة للصفحة الرئيسية"
          onAction={() => (window.location.href = "/")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg-primary py-8">
      <div className="px-6 h">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-theme-text-primary mb-4">
            فئات العروض
          </h1>
          <p className="text-lg text-theme-text-secondary">
            اكتشف أفضل العروض والخصومات في فئات مختلفة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-bookik-gap-lg">
          {categories?.map((category: any) => (
            <Link
              href={`/Discover/Categories/${category.id}`}
              key={category.id}
              className="bg-theme-bg-card rounded-xl border border-theme-border-primary overflow-hidden hover:shadow-theme-shadow-lg transition-shadow duration-300 group "
            >
              <div className="relative">
                <div className="aspect-[4/3] w-full relative overflow-hidden">
                  <Image
                    fill
                    src={
                      category.second_image
                        ? `${process.env.NEXT_PUBLIC_WEB_URL}${category.second_image}`
                        : "/testImages/test.jpeg"
                    }
                    alt={category.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-theme-text-primary text-lg mb-2 line-clamp-2">
                  {category.title}
                </h3>

                <Link
                  href={`/Discover/Categories/${category.id}`}
                  className="flex items-center justify-center px-4 py-2 bg-theme-accent-primary text-theme-text-inverse rounded-lg hover:bg-theme-accent-primary/90 transition-colors text-sm font-medium"
                >
                  عرض الفئة
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
