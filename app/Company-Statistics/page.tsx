"use client";
import { useAppContext } from "@/context/appContext";
import { Button } from "@headlessui/react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../globals.css";

import { CompanyStatisticsPageProps } from "@/interface";

const Page = ({}: CompanyStatisticsPageProps) => {
  const [readScanner, setReadScanner] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [list, setList] = useState<any>(null);
  const router = useRouter();
  const { openLoginModal, currentUser } = useAppContext();

  const handleScanner = (result: any) => {
    setList((prev: any) => {
      return [...(prev || []), result[0].rawValue];
    });
    setReadScanner(false);

    Swal.fire({
      title: "تم مسح الرمز!",
      text: `القيمة: ${result[0].rawValue}`,
      icon: "success",
      confirmButtonText: "حسناً",
    }).then(() => {
      setTimeout(() => {
        setReadScanner(true);
      }, 500);
    });
  };

  useEffect(() => {
    if (!currentUser) {
      openLoginModal();
    }
  }, [currentUser, openLoginModal]);

  if (!currentUser) return null;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, "");
    if (value.length > 6) return;

    if (value.length >= 3) {
      setQrCode(`${value.slice(0, 3)}-${value.slice(3, 6)}`);
    } else {
      setQrCode(value);
    }
  };

  const handleSubmit = () => {
    if (!qrCode || qrCode.length < 7) {
      Swal.fire({
        title: "خطأ!",
        text: "الرجاء إدخال كود صالح مكون من 6 أحرف أو أرقام.",
        icon: "error",
        confirmButtonText: "حسناً",
      });
      return;
    }
    Swal.fire({
      title: "تم الإدخال!",
      text: `تم إدخال الكود: ${qrCode}`,
      icon: "success",
      confirmButtonText: "حسناً",
    });
  };

  return (
    <div dir="rtl" className="h-screen bg-theme-bg-primary">
      <h1 className="p-5 font-bold text-2xl text-theme-text-primary">
        الاحصائيات
      </h1>
      <div className="container mx-auto">
        <div className="flex justify-center mt-5 -space-x-6">
          <Button
            onClick={() => {
              setReadScanner((prev) => !prev);
              setManualEntry(false);
            }}
            className="me-5 rounded-md bg-theme-accent-primary py-3 px-3 text-sm font-semibold text-theme-text-inverse shadow-theme-shadow-inner focus:outline-none cursor-pointer hover:bg-theme-accent-primary/90"
          >
            مسح الرمز - Scan-Code
          </Button>
          <Button
            onClick={() => {
              setManualEntry((prev) => !prev);
              setReadScanner(false);
            }}
            className="me-5 rounded-md bg-theme-accent-primary py-3 px-3 text-sm font-semibold text-theme-text-inverse shadow-theme-shadow-inner focus:outline-none cursor-pointer hover:bg-theme-accent-primary/90"
          >
            {manualEntry ? "إخفاء الإدخال اليدوي" : "إدخال الكود يدوياً"}
          </Button>
        </div>
        {readScanner && (
          <div className="w-full mt-4">
            <Scanner onScan={(result) => handleScanner(result)} />
          </div>
        )}
        {manualEntry && (
          <div className="mt-4 flex flex-col items-center">
            <input
              type="text"
              value={qrCode}
              onChange={handleInputChange}
              placeholder="أدخل الكود مثل F13-JES"
              maxLength={7}
              className="p-2 text-center text-lg border-2 border-theme-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-theme-accent-primary/20 mb-3 bg-theme-bg-input text-theme-text-primary placeholder:text-theme-text-muted"
            />
            <Button
              onClick={handleSubmit}
              className="rounded-md bg-theme-accent-primary py-2 px-4 text-sm font-semibold text-theme-text-inverse shadow-theme-shadow-inner focus:outline-none cursor-pointer hover:bg-theme-accent-primary/90"
            >
              إرسال الكود
            </Button>
          </div>
        )}
        {qrCode && manualEntry && (
          <p className="mt-3 text-center text-theme-text-primary">
            الكود المدخل: {qrCode}
          </p>
        )}
        <div className="flex">
          <pre className="text-theme-text-secondary">
            {JSON.stringify(list)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Page;
