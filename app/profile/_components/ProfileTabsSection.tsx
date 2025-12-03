"use client";

import SimpleItemCard from "./SimpleItemCard";
import { FaUsers, FaBullhorn } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Button from "../../../components/ui/button";

interface ProfileTabsSectionProps {
  activeTab: "followers" | "followings" | "stores";
  setActiveTab: (tab: "followers" | "followings" | "stores") => void;
  followers: any[];
  followings: any[];
  followingStore: any[];
  loading: boolean;
}

export default function ProfileTabsSection({
  activeTab,
  setActiveTab,
  followers,
  followings,
  followingStore,
  loading,
}: ProfileTabsSectionProps) {
  const router = useRouter();

  return (
    <div className="bg-theme-bg-card rounded-bookik-rounded-lg p-4 text-sm font-light border border-theme-border-primary shadow-theme-shadow-sm relative z-[70]">
      <div className="mt-4">
        <div className="flex border-b border-theme-border-primary mb-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab("followers");
            }}
            className={`flex-1 py-2 text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
              activeTab === "followers"
                ? "text-theme-accent-primary border-b-2 border-theme-accent-primary shadow-theme-shadow-sm"
                : "text-theme-text-secondary hover:text-theme-accent-primary"
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <FaUsers size={12} />
              <span>المتابعون</span>
              <span className="bg-theme-accent-primary/20 text-theme-accent-primary px-1 py-0.5 rounded-full text-xs font-bold">
                {followers.length}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab("followings");
            }}
            className={`flex-1 py-2 text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
              activeTab === "followings"
                ? "text-theme-accent-primary border-b-2 border-theme-accent-primary shadow-theme-shadow-sm"
                : "text-theme-text-secondary hover:text-theme-accent-primary"
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <FaUsers size={12} />
              <span>تتابع</span>
              <span className="bg-theme-accent-primary/20 text-theme-accent-primary px-1 py-0.5 rounded-full text-xs font-bold">
                {followings.length}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab("stores");
            }}
            className={`flex-1 py-2 text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
              activeTab === "stores"
                ? "text-theme-accent-primary border-b-2 border-theme-accent-primary shadow-theme-shadow-sm"
                : "text-theme-text-secondary hover:text-theme-accent-primary"
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <FaBullhorn size={12} />
              <span>المتاجر</span>
              <span className="bg-theme-accent-primary/20 text-theme-accent-primary px-1 py-0.5 rounded-full text-xs font-bold">
                {followingStore.length}
              </span>
            </div>
          </button>
        </div>

        <div className="min-h-[200px]">
          {loading ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-accent-primary mx-auto mb-2"></div>
              <p className="text-theme-text-secondary font-medium text-sm">
                جاري التحميل...
              </p>
            </div>
          ) : activeTab === "followers" ? (
            <div className="space-y-2">
              {followers && followers.length > 0 ? (
                followers.map((follower: any) => (
                  <SimpleItemCard
                    key={follower.id}
                    id={follower.id}
                    name={follower.name}
                    nickname={follower.nickname}
                    image={follower.image}
                    type="user"
                    extraInfo={{
                      is_company: follower.is_company,
                      is_advertiser: follower.is_advertiser,
                      is_featured_advertiser: follower.is_featured_advertiser,
                    }}
                    buttonText="متابعة"
                    buttonAction={() => {}}
                    isFollowing={false}
                    showMessageButton={true}
                  />
                ))
              ) : (
                <div className="text-center py-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-theme-accent-primary/10 to-theme-accent-secondary/10 rounded-full flex items-center justify-center shadow-theme-shadow-md">
                    <FaUsers className="w-12 h-12 text-theme-accent-primary" />
                  </div>
                  <h3 className="text-textlg font-semibold text-theme-text-primary mb-2">
                    لا يوجد متابعون بعد
                  </h3>
                  <p className="text-theme-text-secondary text-sm mb-4">
                    لم يتابعك أحد بعد. ابدأ بإنشاء محتوى جذاب لجذب المتابعين!
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-theme-accent-primary hover:bg-theme-accent-primary/90"
                  >
                    إنشاء محتوى
                  </Button>
                </div>
              )}
            </div>
          ) : activeTab === "followings" ? (
            <div className="space-y-2">
              {followings && followings.length > 0 ? (
                followings.map((following: any) => (
                  <SimpleItemCard
                    key={following.id}
                    id={following.id}
                    name={following.name}
                    nickname={following.nickname}
                    image={following.image}
                    type="user"
                    extraInfo={{
                      is_company: following.is_company,
                      is_advertiser: following.is_advertiser,
                      is_featured_advertiser: following.is_featured_advertiser,
                    }}
                    buttonText="إلغاء المتابعة"
                    buttonAction={() => {}}
                    isFollowing={true}
                    showMessageButton={true}
                  />
                ))
              ) : (
                <div className="text-center py-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-theme-accent-primary/10 to-theme-accent-secondary/10 rounded-full flex items-center justify-center shadow-theme-shadow-md">
                    <FaUsers className="w-12 h-12 text-theme-accent-primary" />
                  </div>
                  <h3 className="text-textlg font-semibold text-theme-text-primary mb-2">
                    لا تتابع أحداً بعد
                  </h3>
                  <p className="text-theme-text-secondary text-sm mb-4">
                    لم تبدأ بمتابعة أي مستخدمين بعد. اكتشف الأشخاص الرائعين
                    وابدأ بمتابعتهم!
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-theme-accent-primary hover:bg-theme-accent-primary/90"
                  >
                    اكتشاف المستخدمين
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {followingStore && followingStore.length > 0 ? (
                followingStore.map((store: any) => (
                  <SimpleItemCard
                    key={store.id}
                    id={store.id}
                    name={store.title}
                    nickname={store.title_en || ""}
                    image={store.image}
                    type="store"
                    extraInfo={{
                      is_featured: store.is_featured,
                      title_en: store.title_en,
                    }}
                    buttonText="زيارة المتجر"
                    buttonAction={() => router.push(`/store/${store.id}`)}
                    isFollowing={true}
                    showMessageButton={false}
                  />
                ))
              ) : (
                <div className="text-center py-6">
                  <div className="w-28 h-28 mx-auto mb-4 bg-gradient-to-br from-theme-accent-primary/10 to-theme-accent-secondary/10 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-6xl">🏪</span>
                  </div>
                  <h3 className="text-textlg font-semibold text-theme-text-primary mb-2">
                    لا تتابع متاجر بعد
                  </h3>
                  <p className="text-theme-text-secondary mb-4 max-w-md mx-auto text-sm leading-relaxed">
                    لم تبدأ بمتابعة أي متاجر بعد. اكتشف المتاجر الرائعة وابدأ
                    بمتابعتها!
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-theme-accent-primary to-theme-accent-secondary hover:from-theme-accent-primary/90 hover:to-theme-accent-secondary/90 transition-all duration-300 hover:scale-105 shadow-theme-shadow-lg"
                    onClick={() => (window.location.href = "/Discover")}
                  >
                    🔍 اكتشاف المتاجر
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
