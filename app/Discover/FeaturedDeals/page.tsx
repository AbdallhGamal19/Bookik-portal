import { getFeaturedDeals } from "../../../server-actions";
import { IVideo } from "../../../interface";
import VideoWithInfinityScroll from "../_components/VideoWithInfinityScroll";
import EmptyState from "../../../components/ui/EmptyState";
import { MdCampaign } from "react-icons/md";
import EmptyStateWrapper from "../../../components/ui/EmptyStateWrapper";

export const revalidate = 3600;

const FeaturedDeals = async () => {
  const data = await getFeaturedDeals();

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-theme-bg-primary">
        <EmptyStateWrapper
          icon={MdCampaign}
          title="لا توجد عروض مميزة متاحة"
          description="عذراً، لا توجد عروض مميزة متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً أو تصفح العروض الأخرى."
          actionText="تصفح العروض الأخرى"
          onAction={() => (window.location.href = "/Discover/NewOffers")}
        />
      </div>
    );
  }

  return <VideoWithInfinityScroll data={data} />;
};

export default FeaturedDeals;
