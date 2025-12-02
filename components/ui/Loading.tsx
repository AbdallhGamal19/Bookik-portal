import Image from "next/image.js";
import { ImSpinner9 } from "react-icons/im";
import { useEffect } from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-theme-bg-primary z-[9999] overflow-hidden">
      <Image
        className=" animate-bounce "
        src="/Bookik.svg"
        alt="Bookik Icon"
        width={300}
        height={300}
      />
      <div className=" text-center">
        <ImSpinner9 className="text-3xl text-theme-accent-primary animate-spin mx-auto mt-3" />

        <p className="text-theme-text-primary mt-2 "></p>
      </div>
    </div>
  );
}
