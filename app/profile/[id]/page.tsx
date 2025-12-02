import Link from "next/link";
import { getUserProfile } from "@/server-actions";
import UserProfileHeader from "./_components/UserProfileHeader";
import UserProfileStats from "./_components/UserProfileStats";
import UserProfileClient from "./_components/UserProfileClient";

interface UserProfilePageProps {
  params: { id: string };
}

const UserProfilePage: React.FC<UserProfilePageProps> = async ({ params }) => {
  let userProfile: any = null;
  let error: string | null = null;

  try {
    const userId = params.id;
    userProfile = await getUserProfile(userId);

    if (!userProfile) {
      error = "User not found";
    } else {
      // تحسين إضافي للبيانات لتقليل الحجم
      if (userProfile.posts) {
        // تقليل عدد المنشورات المعروضة في البداية
        const postsKeys = Object.keys(userProfile.posts);
        if (postsKeys.length > 50) {
          const limitedPosts: any = {};
          postsKeys.slice(0, 50).forEach((key) => {
            limitedPosts[key] = userProfile.posts[key];
          });
          userProfile.posts = limitedPosts;
        }
      }
    }
  } catch (err: any) {
    error = err.response?.data?.message || "Failed to fetch user profile";
  }

  if (error || !userProfile) {
    return (
      <div className="min-h-screen bg-theme-bg-primary flex items-center justify-center">
        <div className="bg-theme-bg-card rounded-bookik-rounded-2xl p-4 lg:p-8 text-center shadow-theme-shadow-lg">
          <h1 className="text-text3 font-bold text-theme-text-primary mb-4">
            المستخدم غير موجود
          </h1>
          <p className="text-theme-text-secondary mb-6">
            {error || "المستخدم الذي تبحث عنه غير موجود."}
          </p>
          <Link
            href="/"
            className="bg-theme-accent-primary text-theme-text-inverse px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg-primary" dir="rtl">
      {/* Main Content */}
      <div className="px-4 md:px-6 mt-6">
        {/* Profile Header */}
        <UserProfileHeader userProfile={userProfile} />

        {/* Additional Info Section */}
        <UserProfileStats userProfile={userProfile} />

        {/* Client Components for Interactive Features */}
        <UserProfileClient userProfile={userProfile} userId={params.id} />
      </div>
    </div>
  );
};

export default UserProfilePage;

// إعدادات الـ cache لتجنب مشكلة حجم البيانات الكبير
export const revalidate = 60; // إعادة التحقق كل دقيقة
export const dynamic = "force-dynamic"; // تعطيل الـ static generation
