"use client";
import {
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface StoreDetailsProps {
  store: any;
}

const StoreDetails = ({ store }: StoreDetailsProps) => {
  const isFeatured = store.is_featured === 1;
  const isActive = store.is_active === 1;
  const phoneVerified = store.phone_verified === 1;

  return (
    <div className="bg-theme-bg-primary rounded-2xl p-6 shadow-theme-shadow-lg border border-theme-border-primary">
      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {isFeatured && (
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm px-4 py-2 rounded-full font-bold shadow-lg">
            ⭐ معلن مميز
          </span>
        )}
        {isActive && (
          <div className="flex items-center gap-2 bg-green-500/20 px-3 py-2 rounded-full border border-green-400/30">
            <FaCheckCircle className="text-green-500 text-sm" />
            <span className="text-green-700 text-sm font-medium">نشط</span>
          </div>
        )}
        {phoneVerified && (
          <span className="bg-green-500/20 text-green-700 text-sm px-3 py-2 rounded-full border border-green-400/30">
            ✓ موثق
          </span>
        )}
        {store.cr_number && (
          <span className="bg-blue-500/20 text-blue-700 text-sm px-3 py-2 rounded-full border border-blue-400/30">
            🏢 مسجل تجاري
          </span>
        )}
      </div>

      {/* Contact & Info Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-theme-bg-secondary rounded-xl p-4 border border-theme-border-primary">
          <h3 className="text-theme-text-primary font-semibold text-lg mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-theme-accent-primary rounded-full"></div>
            معلومات التواصل
          </h3>
          <div className="space-y-3">
            {store.address && (
              <div className="flex items-start gap-3 text-theme-text-primary">
                <FaMapMarkerAlt className="text-yellow-500 text-sm mt-1 flex-shrink-0" />
                <span className="text-sm">{store.address}</span>
              </div>
            )}
            {store.phone && (
              <div className="flex items-center gap-3 text-theme-text-primary">
                <FaPhone className="text-green-500 text-sm flex-shrink-0" />
                <span className="text-sm font-mono">{store.phone}</span>
              </div>
            )}
            {store.email && (
              <div className="flex items-start gap-3 text-theme-text-primary">
                <FaEnvelope className="text-blue-500 text-sm mt-1 flex-shrink-0" />
                <span className="text-sm break-all">{store.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-theme-bg-secondary rounded-xl p-4 border border-theme-border-primary">
          <h3 className="text-theme-text-primary font-semibold text-lg mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-theme-accent-primary rounded-full"></div>
            معلومات إضافية
          </h3>
          <div className="space-y-3">
            {store.cr_number && (
              <div className="flex items-center gap-3 text-theme-text-primary">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 text-xs font-bold">CR</span>
                </div>
                <span className="text-sm font-mono">{store.cr_number}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-theme-text-primary">
              <FaCalendarAlt className="text-purple-500 text-sm flex-shrink-0" />
              <span className="text-sm">
                انضم في {new Date(store.created_at).toLocaleDateString("ar-SA")}
              </span>
            </div>
            {store.tax_number && (
              <div className="flex items-center gap-3 text-theme-text-primary">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-500 text-xs">💰</span>
                </div>
                <span className="text-sm font-mono">{store.tax_number}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
