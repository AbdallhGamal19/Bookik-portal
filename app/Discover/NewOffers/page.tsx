import { getHomeDeals } from "../../../server-actions/index";
import VideoWithInfinityScroll from "../_components/VideoWithInfinityScroll";

import EmptyState from "@/components/ui/EmptyState";
import { MdCampaign } from "react-icons/md";

export const revalidate = 3600;

const NewOffers = async () => {
  const data = await getHomeDeals();

  if (!data || data?.length === 0) {
    return (
      <div className="min-h-screen bg-theme-bg-primary">
        <EmptyState
          icon={MdCampaign}
          title="لا توجد عروض مميزة متاحة"
          description="عذراً، لا توجد عروض مميزة متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً أو تصفح العروض الأخرى."
          actionText="تصفح العروض الأخرى"
          onAction={() => (window.location.href = "/Discover/FeaturedDeals")}
        />
      </div>
    );
  } else {
    return <VideoWithInfinityScroll data={data} />;
  }

  return <VideoWithInfinityScroll data={data} />;
};

export default NewOffers;
