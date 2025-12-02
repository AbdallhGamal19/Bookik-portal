import { getCategoryDeals } from "../../../../server-actions/index";
import CategoryGrid from "../_components/CategoryGrid";
import EmptyState from "../../../../components/ui/EmptyState";
import { MdShoppingBag } from "react-icons/md";

export const revalidate = 3600;

const CategoryDeals = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const deals = await getCategoryDeals(id);

  if (!deals || deals.length === 0) {
    return (
      <div className="min-h-screen bg-theme-bg-primary">
        <EmptyState
          icon={MdShoppingBag}
          title="لا توجد عروض في هذه الفئة"
          description="عذراً، لا توجد عروض متاحة في هذه الفئة حالياً. يرجى المحاولة مرة أخرى لاحقاً أو تصفح الفئات الأخرى."
          actionText="تصفح الفئات الأخرى"
          onAction={() => (window.location.href = "/Discover/Categories")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-theme-text-primary mb-4">
            عروض الفئة
          </h1>
          <p className="text-lg text-theme-text-secondary">
            اكتشف أفضل العروض والخصومات في هذه الفئة
          </p>
        </div>

        <CategoryGrid
          items={deals}
          title="عروض الفئة"
          subtitle="جميع العروض المتاحة في هذه الفئة"
          showViewAll={false}
        />
      </div>
    </div>
  );
};

export default CategoryDeals;
