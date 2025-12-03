import EmptyStateWrapper from "../../../components/ui/EmptyStateWrapper";
import { getHomeDeals } from "../../../server-actions/index";
import VideoWithInfinityScroll from "../_components/VideoWithInfinityScroll";

export const revalidate = 3600;

const NewOffers = async () => {
  const data = await getHomeDeals();

  if (!data || data?.length === 0) {
    return (
      <div className="min-h-screen bg-theme-bg-primary">
        <EmptyStateWrapper
          title="لا توجد عروض مميزة متاحة"
          description="عذراً، لا توجد عروض مميزة متاحة حالياً..."
        />
      </div>
    );
  } else {
    return <VideoWithInfinityScroll data={data} />;
  }
};

export default NewOffers;
