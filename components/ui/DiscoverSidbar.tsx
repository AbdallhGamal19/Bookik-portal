import { FaBullhorn, FaHome, FaSearch, FaUser, FaUsers } from "react-icons/fa";

import { DiscoverSidbarProps } from "@/interface";

const DiscoverSidbar = ({}: DiscoverSidbarProps) => {
  return (
    <div className="fixed top-0 right-0 w-[calc(100%-300px)] p-5 text-white bg-gray-900 border-l border-gray-700 z-30">
      <nav className="space-y-4">
        <ul className="flex justify-around items-center">
          <li>افضل المبدعين</li>
          <li>جديد العروض</li>
          <li>العروض المميزه</li>
        </ul>
      </nav>
    </div>
  );
};

export default DiscoverSidbar;
