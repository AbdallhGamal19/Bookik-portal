interface UserProfileStatsProps {
  userProfile: any;
}

const UserProfileStats: React.FC<UserProfileStatsProps> = ({ userProfile }) => {
  // Get user data from profile or fallback
  const user = userProfile.user || userProfile;

  return (
    <div className="bg-theme-bg-card rounded-bookik-rounded-2xl p-4 lg:p-8 mb-6 shadow-theme-shadow-lg border border-theme-border-primary">
      <h3 className="text-lg font-bold text-theme-text-primary mb-4 text-center lg:text-right">
        معلومات إضافية
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Account Status */}
        <div className="bg-theme-bg-secondary rounded-bookik-rounded-lg p-4">
          <h4 className="font-semibold text-theme-text-primary mb-2">
            حالة الحساب
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-theme-text-secondary">الحالة:</span>
              <span
                className={`font-medium ${
                  user.is_active ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.is_active ? "نشط" : "غير نشط"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-text-secondary">التحقق:</span>
              <span
                className={`font-medium ${
                  user.confirmed ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {user.confirmed ? "محقق" : "غير محقق"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-text-secondary">نوع الحساب:</span>
              <span className="font-medium text-theme-text-primary">
                {user.is_company ? "شركة" : "فردي"}
              </span>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="bg-theme-bg-secondary rounded-bookik-rounded-lg p-4">
          <h4 className="font-semibold text-theme-text-primary mb-2">
            إحصائيات النشاط
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-theme-text-secondary">
                إجمالي المشاهدات:
              </span>
              <span className="font-medium text-theme-text-primary">
                {userProfile.coupons?.reduce(
                  (total: number, coupon: any) =>
                    total + (coupon.views_count || 0),
                  0
                ) || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-text-secondary">
                إجمالي الإعجابات:
              </span>
              <span className="font-medium text-theme-text-primary">
                {userProfile.coupons?.reduce(
                  (total: number, coupon: any) =>
                    total + (coupon.likes?.length || 0),
                  0
                ) || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-text-secondary">متوسط التقييم:</span>
              <span className="font-medium text-theme-text-primary">
                {userProfile.coupons?.length > 0
                  ? (
                      userProfile.coupons.reduce(
                        (total: number, coupon: any) =>
                          total + (coupon.rating || 0),
                        0
                      ) / userProfile.coupons.length
                    ).toFixed(1)
                  : "0.0"}{" "}
                ⭐
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileStats;
