"use client";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaGlobe,
  FaCalendarAlt,
} from "react-icons/fa";

interface StoreBranchesProps {
  store: any;
}

const StoreBranches = ({ store }: StoreBranchesProps) => {
  if (store.branches && store.branches.length > 0) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-bookik-gap-lg">
          {store.branches.map((branch: any) => (
            <div
              key={branch.id}
              className="bg-theme-bg-card rounded-lg shadow-theme-shadow-md p-6"
            >
              <h3 className="text-xl font-semibold text-theme-text-primary mb-3">
                {branch.branch_name}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <FaMapMarkerAlt className="text-theme-accent-primary" />
                  <span className="text-theme-text-secondary">
                    {branch.full_address}
                  </span>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <FaBuilding className="text-theme-accent-primary" />
                  <span className="text-theme-text-secondary">
                    {branch.city?.city}
                  </span>
                </div>

                {branch.website_link && (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <FaGlobe className="text-theme-accent-primary" />
                    <a
                      href={branch.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-accent-primary hover:underline"
                    >
                      الموقع الإلكتروني
                    </a>
                  </div>
                )}

                <div className="flex items-center space-x-2 space-x-reverse">
                  <FaCalendarAlt className="text-theme-accent-primary" />
                  <span className="text-theme-text-secondary">
                    {new Date(branch.created_at).toLocaleDateString("ar-SA")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <p className="text-theme-text-secondary text-lg">لا توجد فروع متاحة</p>
    </div>
  );
};

export default StoreBranches;
