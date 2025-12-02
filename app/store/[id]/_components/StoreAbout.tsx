"use client";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaBuilding,
  FaCalendarAlt,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

interface StoreAboutProps {
  store: any;
}

const StoreAbout = ({ store }: StoreAboutProps) => {
  return (
    <div className="bg-theme-bg-card rounded-lg shadow-theme-shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-theme-text-primary">
        معلومات المتجر
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-bookik-gap-lg">
        <div>
          <h3 className="text-lg font-semibold text-theme-text-primary mb-3">
            الوصف
          </h3>
          <p className="text-theme-text-secondary leading-relaxed">
            {store.bio || "لا يوجد وصف متاح"}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-theme-text-primary mb-3">
            معلومات التواصل
          </h3>
          <div className="space-y-3">
            {store.phone && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <FaPhone className="text-theme-accent-primary" />
                <span className="text-theme-text-secondary">{store.phone}</span>
                {store.phone_verified && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    موثق
                  </span>
                )}
              </div>
            )}

            {store.email && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <FaEnvelope className="text-theme-accent-primary" />
                <span className="text-theme-text-secondary">{store.email}</span>
              </div>
            )}

            {store.address && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <FaMapMarkerAlt className="text-theme-accent-primary" />
                <span className="text-theme-text-secondary">
                  {store.address}
                </span>
              </div>
            )}

            {store.cr_number && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <FaIdCard className="text-theme-accent-primary" />
                <span className="text-theme-text-secondary">
                  رقم السجل التجاري: {store.cr_number}
                </span>
              </div>
            )}

            {store.admin_position && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <FaBuilding className="text-theme-accent-primary" />
                <span className="text-theme-text-secondary">
                  المنصب: {store.admin_position}
                </span>
              </div>
            )}

            <div className="flex items-center space-x-2 space-x-reverse">
              <FaCalendarAlt className="text-theme-accent-primary" />
              <span className="text-theme-text-secondary">
                تاريخ الإنشاء:{" "}
                {new Date(store.created_at).toLocaleDateString("ar-SA")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      {(store.facebook ||
        store.twitter ||
        store.instagram ||
        store.youtube) && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-theme-text-primary mb-3">
            وسائل التواصل الاجتماعي
          </h3>
          <div className="flex space-x-4 space-x-reverse">
            {store.instagram && (
              <a
                href={store.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-accent-primary hover:opacity-80"
              >
                <FaInstagram size={24} />
              </a>
            )}
            {store.twitter && (
              <a
                href={store.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-accent-primary hover:opacity-80"
              >
                <FaTwitter size={24} />
              </a>
            )}
            {store.facebook && (
              <a
                href={store.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-accent-primary hover:opacity-80"
              >
                <FaFacebook size={24} />
              </a>
            )}
            {store.youtube && (
              <a
                href={store.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-accent-primary hover:opacity-80"
              >
                <FaYoutube size={24} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreAbout;
