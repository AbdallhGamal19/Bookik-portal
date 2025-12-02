"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { AiOutlineStock } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { FaBullhorn } from "react-icons/fa";

interface ProfileHeaderProps {
  user: any;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <>
      {/* Main Content */}
      <div className="relative w-full h-[120px] rounded-bookik-rounded-lg overflow-hidden shadow-theme-shadow-sm">
        <Image
          src="/profile/cover.svg"
          alt="Profile Background"
          fill
          className="object-cover"
        />
      </div>

      {/* User Info Section */}
      <div className="relative w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-bookik-rounded-lg sm:px-4 lg:px-6 -translate-y-[8%]">
        {/* الصورة والاسم - الناحية اليسرى */}
        <div className="flex justify-start items-center gap-3 ">
          <div className="w-[60px] h-[60px] md:min-w-[80px] md:h-[80px] border-2 border-theme-accent-primary rounded-full overflow-hidden p-1 -translate-y-[10%] shadow-theme-shadow-md">
            <Image
              src={
                user?.avatar || user?.image
                  ? `${process.env.NEXT_PUBLIC_WEB_URL}/images/user/${
                      user.avatar || user.image
                    }`
                  : "/testImages/test.jpeg"
              }
              alt={user?.name || "User"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-lg lg:text-xl font-bold text-theme-text-primary mb-1">
              {user?.name || user?.nickname || "مبدع Bookik"}
            </h1>
            <p className="text-sm text-theme-text-secondary font-light">
              {user?.brief || "مبدع محترف في منصة Bookik"}
            </p>
          </div>
        </div>

        {/* الإحصائيات - الوسط */}
        <div className="flex-1 flex md:justify-center items-center gap-6">
          <div className="text-center">
            <div className="text-theme-text-primary font-bold text-base">
              {user?.followers}
            </div>
            <div className="text-theme-text-secondary text-xs">المتابعون</div>
          </div>
          <div className="w-px h-6 bg-theme-border-primary" />
          <div className="text-center">
            <div className="text-theme-text-primary font-bold text-base">
              {user?.following}
            </div>
            <div className="text-theme-text-secondary text-xs">تتابع</div>
          </div>
          <div className="w-px h-6 bg-theme-border-primary" />
          <div className="text-center">
            <div className="text-theme-text-primary font-bold text-base">
              {user?.storesCount}
            </div>
            <div className="text-theme-text-secondary text-xs">المتاجر</div>
          </div>
        </div>

        {/* الصف الثاني - أزرار صغيرة */}
        <div className="flex gap-1 flex-wrap md:justify-end">
          {/* <Button
            variant="primary"
            size="sm"
            className="border-theme-accent-primary text-theme-accent-primary hover:bg-theme-accent-primary hover:text-white transition-all duration-300"
            icon={<AiOutlineStock className="text-textsm " />}
          >
            لوحه المعلومات الاحترافية
          </Button> */}

          <Button
            variant="outline"
            size="sm"
            className="border-theme-accent-primary text-theme-accent-primary hover:bg-theme-accent-primary hover:text-white transition-all duration-300"
            icon={<BiPencil className="text-textsm " />}
          >
            تعديل
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-theme-accent-primary text-theme-accent-primary hover:bg-theme-accent-primary hover:text-white transition-all duration-300"
            icon={<FaBullhorn className="text-textsm " />}
          >
            الاعلانات
          </Button>
        </div>
      </div>
    </>
  );
}
