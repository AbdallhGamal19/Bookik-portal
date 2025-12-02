"use client"; // Only for App Router

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";
import Button from "@/components/ui/Button";
// import "./globals.css";
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-theme-bg-primary text-theme-text-primary">
      <FiAlertTriangle className="text-theme-accent-error text-6xl mb-4" />
      <h1 className="text-3xl font-bold">حدث خطأ ما</h1>
      <p className=" mt-2 text-theme-text-secondary">
        حدث خطأ غير متوقع. من فضلك حاول مرة أخرى
      </p>

      <div className="mt-6 flex gap-bookik-gap-md">
        <Button onClick={() => reset()} icon={<FiRefreshCw />}>
          اعادةالتحميل
        </Button>
        <Link href="/">
          <Button icon={<FiHome />}>العوده الي الصفحه الرئسيه</Button>
        </Link>
      </div>
    </div>
  );
}
