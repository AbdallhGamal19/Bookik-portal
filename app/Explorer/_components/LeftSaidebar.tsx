"use client";
import RatingBar from "@/components/ui/RatingBar";
import Spinner from "@/components/ui/Spinner";
import {
  getFeaturedDeals,
  getHomeDeals,
  getTopAdvertisers,
} from "@/server-actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { IoLocationSharp } from "react-icons/io5";
import { MdCampaign, MdVideoLibrary } from "react-icons/md";
import { getCategories } from "../../../server-actions";
import Slider from "./Slider";
import { Creator, Message, CategoryData } from "@/interface";
export default function LeftSaidebar() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [featuredDeals, setFeaturedDeals] = useState<any[]>([]);
  const [homeDeals, setHomeDeals] = useState<any[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingHomeDeals, setIsLoadingHomeDeals] = useState(true);
  const [isLoadingFeaturedDeals, setIsLoadingFeaturedDeals] = useState(true);
  const [topAdvertisers, setTopAdvertisers] = useState<any[]>([]);
  const [isLoadingTopAdvertisers, setIsLoadingTopAdvertisers] = useState(true);
  useEffect(() => {
    // getFeaturedDeals();

    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await getCategories();
        // console.log("Categories response:", response);
        if (response && Array.isArray(response)) {
          setCategories(response);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    const fetchFeaturedDeals = async () => {
      try {
        setIsLoadingFeaturedDeals(true);
        const response = await getFeaturedDeals();
        if (response && Array.isArray(response)) {
          const featuredDeals = response
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
          setFeaturedDeals(featuredDeals);
        } else {
          setFeaturedDeals([]);
        }
      } catch (error) {
        console.error("Error fetching featured deals:", error);
        setFeaturedDeals([]);
      } finally {
        setIsLoadingFeaturedDeals(false);
      }
    };

    const fetchHomeDeals = async () => {
      try {
        setIsLoadingHomeDeals(true);
        const response = await getHomeDeals();

        if (response && Array.isArray(response)) {
          const homeDeals = response
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
          setHomeDeals(homeDeals);
        } else {
          setHomeDeals([]);
        }
      } catch (error) {
        console.error("Error fetching home deals:", error);
        setHomeDeals([]);
      } finally {
        setIsLoadingHomeDeals(false);
      }
    };
    const fetchTopAdvertisers = async () => {
      try {
        setIsLoadingTopAdvertisers(true);
        const response = await getTopAdvertisers();
        if (response && Array.isArray(response)) {
          setTopAdvertisers(response.slice(0, 3));
          console.log(response, "response topAdvertisers from left sidebar");
        } else {
          setTopAdvertisers([]);
        }
      } catch (error) {
        console.error("Error fetching top advertisers:", error);
        setTopAdvertisers([]);
      } finally {
        setIsLoadingTopAdvertisers(false);
      }
    };
    fetchCategories();
    fetchHomeDeals();
    fetchFeaturedDeals();
    fetchTopAdvertisers();
  }, []);

  return (
    <div className=" hidden hide-scrollbar lg:block max-w-[450px] overflow-x-hidden  h-[calc(100vh-114px)] md:h-[calc(100vh-78px)]   overflow-y-scroll min-w-[394px] bg-theme-bg-primary  pt-6 px-2 ">
      <div className="space-y-4 ">
        {/* Creators Section */}
        <div className="px-2">
          <h2 className="text-text4 font-semibold leading-9  text-theme-text-primary mb-2">
            المبدعين
          </h2>
          {isLoadingTopAdvertisers ? (
            <div className="flex items-center justify-center py-8">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {topAdvertisers.map((advertiser) => (
                  <Link
                    key={advertiser.id}
                    href={`/profile/${advertiser.id}`}
                    className="block bg-theme-bg-card rounded-lg p-2 hover:shadow-theme-shadow-md transition-shadow duration-200 cursor-pointer border border-theme-border-primary"
                  >
                    <div className="flex items-start gap-bookik-gap-sm mb-1 relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_WEB_URL}/images/user/${
                          advertiser.image || advertiser.avatar
                        }`}
                        alt={advertiser.name}
                        width={40}
                        height={40}
                        className="rounded-full flex-shrink-0 max-w-[40px] max-h-[40px] border-2 border-theme-border-primary object-cover"
                      />
                      <div className="flex-1">
                        <div className="">
                          <h3 className="text-text8 mb-1 leading-5 font-extrabold bg-gradient-to-b from-theme-accent-warning to-theme-accent-warning/80 bg-clip-text text-transparent">
                            {advertiser.name}
                          </h3>
                          {advertiser.nickname && (
                            <p className="text-text9 font-light leading-4 text-right text-theme-text-secondary mb-1">
                              @{advertiser.nickname}
                            </p>
                          )}
                          {/* {advertiser.rating && (
                            <div className="flex items-center gap-bookik-gap-xs -mt-0.5">
                              <RatingBar
                                rating={advertiser.rating}
                                size="xs"
                                readonly
                              />
                              {advertiser.reviewCount && (
                                <span className="text-text9 font-light leading-4 text-right text-theme-text-secondary">
                                  {advertiser.reviewCount} تقييم
                                </span>
                              )}
                            </div>
                          )} */}
                        </div>
                        <div className="mb-1">
                          <p className="font-medium my-3 text-justify text-theme-text-secondary">
                            {advertiser.brief || "لا يوجد وصف"}
                          </p>
                          <div className="flex items-center gap-bookik-gap-xs flex-wrap">
                            <div className="bg-theme-bg-secondary rounded-full px-2 py-1 flex items-center gap-bookik-gap-sm text-theme-text-secondary border border-theme-border-primary">
                              <IoLocationSharp className="w-2 h-2" />
                              <span className="text-text10 font-medium">
                                {advertiser.address || "لا يوجد"}
                              </span>
                            </div>
                            <div className="bg-theme-bg-secondary rounded-full px-2 py-1 flex items-center gap-bookik-gap-sm text-theme-text-secondary border border-theme-border-primary">
                              <MdCampaign className="w-2 h-2" />
                              <span className="text-text10 font-medium">
                                {advertiser.coupon?.length || 0} إعلان
                              </span>
                            </div>
                            <div className="bg-theme-bg-secondary rounded-full px-2 py-1 flex items-center gap-bookik-gap-sm text-theme-text-secondary border border-theme-border-primary">
                              <MdVideoLibrary className="w-2 h-2" />
                              <span className="text-text10 font-medium">
                                {advertiser.is_featured_advertiser
                                  ? "مميز"
                                  : "عادي"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/Discover/top-Advertiser"
                  className="inline-block bg-theme-accent-primary hover:bg-theme-accent-primary/90 text-white px-4 py-2 rounded-bookik-rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  المزيد
                </Link>
              </div>
            </>
          )}
          <div className=" h-[1px] mt-6    bg-theme-border-primary  w-[50%] m-auto" />
        </div>
        {/* Orders Section */}
        <div className="px-2">
          <Slider
            data={homeDeals}
            sliderTitle="جديد العروض"
            isLoading={isLoadingHomeDeals}
          />
          <div className=" h-[1px] mt-6    bg-theme-border-primary  w-[50%] m-auto" />
        </div>
        {/* Messages Section */}
        <div className="px-2">
          <Slider
            sliderTitle="عروض مميزة"
            data={featuredDeals}
            isLoading={isLoadingFeaturedDeals}
          />

          <div className=" h-[1px] mt-6    bg-theme-border-primary  w-[50%] m-auto" />
        </div>

        {/* Categories Section */}
        <div className="px-2">
          <h2 className="text-text4  font-semibold leading-9 text-right text-theme-text-secondary mb-2">
            الأقسام
          </h2>
          <div className="space-y-4">
            <Slider
              data={categories}
              sliderTitle=""
              type="categories"
              isLoading={isLoadingCategories}
            />
          </div>
          <div className=" h-[1px] mt-6    bg-theme-border-primary  w-[50%] m-auto" />
        </div>

        {/* Join Creators Info Section */}
        <div className="px-2">
          <h2 className="text-text4 font-semibold leading-9 text-right text-theme-text-secondary mb-2">
            معلومات مهمة
          </h2>
          <div className="bg-gradient-to-br from-theme-bg-secondary to-theme-bg-tertiary rounded-lg p-3 border border-theme-border-primary">
            <div className="text-center mb-3">
              <div className="w-12 h-12 bg-theme-accent-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-theme-text-inverse text-lg">✨</span>
              </div>
              <h3 className="font-semibold text-theme-accent-primary text-sm mb-2">
                انضم للمبدعين
              </h3>
              <p className="text-xs text-theme-text-secondary mb-3">
                انضم إلى أكبر منصة إعلانية في المملكة
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-bookik-gap-sm text-xs text-theme-accent-primary">
                <span>🎯</span>
                <span>نحن نبحث عن المبدعين</span>
              </div>
              <div className="flex items-center gap-bookik-gap-sm text-xs text-theme-accent-primary">
                <span>💡</span>
                <span>منصة متكاملة لعرض إبداعاتك</span>
              </div>
              <div className="flex items-center gap-bookik-gap-sm text-xs text-theme-accent-primary">
                <span>🚀</span>
                <span>ابدأ رحلتك نحو النجاح</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
