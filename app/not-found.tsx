import Link from "next/link";
import { FiHome } from "react-icons/fi";
import "./globals.css";
import Button from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-theme-text-primary text-center p-6 bg-theme-bg-primary">
      <h1 className="text-8xl font-extrabold animate-pulse">404</h1>
      <p className="text-2xl font-semibold mt-4 ">Page Not Found</p>
      <p className=" my-2 max-w-md text-theme-text-secondary">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link href={"/"}>
        <Button
          variant="primary"
          size="md"
          icon={<FiHome className="text-xl" />}
        >
          العوده الى الصفحه الرئسيه
        </Button>
      </Link>
    </div>
  );
}
