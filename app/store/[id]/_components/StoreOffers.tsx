"use client";
import CardInfiniteScroll from "@/components/ui/CardInfiniteScroll";

type StoreOffersProps = {
  store: any;
  currentItems: any[];
  hasMore: boolean;
  loadingMore: boolean;
  loadMoreItems: () => Promise<void>;
  openVideoModal: (coupon: any, index: number) => void;
};

const StoreOffers = ({
  store,
  currentItems,
  hasMore,
  loadingMore,
  loadMoreItems,
  openVideoModal,
}: StoreOffersProps) => {
  if (store.coupon && store.coupon.length > 0) {
    return (
      <div className="space-y-6">
        <CardInfiniteScroll
          items={currentItems.map((coupon: any, index: number) => ({
            ...coupon,
            onClick: () => openVideoModal(coupon, index),
          }))}
          hasMore={hasMore}
          loadMore={loadMoreItems}
          loading={loadingMore}
          showStoreImage={false}
        />
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="bg-theme-bg-secondary rounded-bookik-rounded-2xl p-8 mx-auto max-w-md">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-text4 font-bold text-theme-text-primary mb-2">
          لا توجد عروض متاحة
        </h3>
        <p className="text-theme-text-secondary mb-4">
          هذا المتجر لم يقم بنشر أي عروض حتى الآن
        </p>
      </div>
    </div>
  );
};

export default StoreOffers;
