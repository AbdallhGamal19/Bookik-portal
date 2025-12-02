"use client";

import FormField from "@/components/ui/FormField";
import { ErrorMessage, Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import {
  MdOutlineBusiness,
  MdOutlineDescription,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePerson,
  MdOutlinePhone,
  MdOutlineWork,
} from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import Button from "../../components/ui/Button";

const JoinCreatorsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
      .required("الاسم مطلوب"),
    email: Yup.string()
      .email("صيغة البريد الإلكتروني غير صحيحة")
      .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]+$/, "رقم الهاتف غير صحيح")
      .required("رقم الهاتف مطلوب"),
    skills: Yup.string().required("المهارات مطلوبة"),
  });

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    skills: "",
  };

  const notify = (message: string, type: "success" | "error" = "success") =>
    toast[type](message, {
      className: type === "success" ? "text-green-500" : "text-red-500",
      position: "top-center",
      autoClose: type === "success" ? 5000 : 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);
    try {
      // هنا يمكن إضافة منطق إرسال البيانات إلى الخادم

      // محاكاة إرسال البيانات
      await new Promise((resolve) => setTimeout(resolve, 2000));

      notify("تم إرسال طلبك بنجاح! سنتواصل معك قريباً", "success");
      resetForm();

      // إعادة توجيه المستخدم إلى الصفحة الرئيسية بعد النجاح
      setTimeout(() => {
        notify("سيتم توجيهك إلى الصفحة الرئيسية خلال لحظات...", "success");
        setTimeout(() => {
          window.location.href = "/Explorer";
        }, 2000);
      }, 2000);
    } catch (error) {
      notify("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const labelClass = "block text-sm font-medium text-theme-text-primary mb-2";

  return (
    <>
      <div className="w-full md:h-[calc(100vh-102px)] h-[calc(100vh-128px)] px-4 md:px-0 flex-1 flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="relative">
            <Image
              className="mb-3 w-[120px] md:w-[139px] h-auto"
              alt="Bookik"
              src="/Bookik.svg"
              width={239}
              height={60}
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✨</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-global-text1 text-center mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text ">
            انضم للمبدعين
          </h1>
          <p className="font-bold text-global-text1 text-text5 text-center tracking-[0] leading-[normal] [direction:rtl] max-w-2xl">
            انضم إلى أكبر منصة إعلانية في المملكة وابدأ رحلتك نحو النجاح!
          </p>
        </div>

        <div className="bg-theme-bg-card rounded-bookik-rounded-4xl border border-solid border-theme-accent-primary shadow-theme-shadow-lg px-5 md:px-14 py-5 md:py-8 relative overflow-auto hide-scrollbar w-full max-w-4xl">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting: formikSubmitting,
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
            }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="fullName"
                    label="الاسم الكامل"
                    placeholder="أدخل اسمك الكامل"
                    icon={MdOutlinePerson}
                    required
                    labelClass={labelClass}
                  />

                  <FormField
                    name="email"
                    label="البريد الإلكتروني"
                    type="email"
                    placeholder="example@email.com"
                    icon={MdOutlineEmail}
                    required
                    labelClass={labelClass}
                  />

                  <FormField
                    name="phone"
                    label="رقم الهاتف"
                    placeholder="05xxxxxxxx"
                    icon={MdOutlinePhone}
                    required
                    labelClass={labelClass}
                  />

                  <div className="w-full">
                    <label className="block text-sm font-medium text-theme-text-primary mb-2">
                      المهارات
                    </label>
                    <div className="relative ">
                      <select
                        name="skills"
                        value={values.skills}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full  px-3 py-[9px] pr-10 rounded-bookik-rounded-md border border-solid border-theme-border-primary bg-theme-bg-input  text-theme-text-primary focus:outline-none focus:border-theme-accent-primary focus:ring-2 focus:ring-theme-accent-primary/20 transition-all duration-200 appearance-none cursor-pointer"
                        dir="rtl"
                      >
                        <option value="">اختر المهارة</option>
                        <option value="مصمم">مصمم</option>
                        <option value="ممنتج">ممنتج</option>
                        <option value="كاتب محتوي">كاتب محتوي</option>
                        <option value="فويس اوفر">فويس اوفر</option>
                        <option value="مصور">مصور</option>
                        <option value="مودل">مودل</option>
                        <option value="Micro Blogger">Micro Blogger</option>
                        <option value="UGC">UGC</option>
                      </select>
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-theme-text-secondary">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.skills && touched.skills && (
                      <ErrorMessage
                        name="skills"
                        component="div"
                        className="text-theme-accent-error text-sm mt-1"
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || formikSubmitting}
                    variant="primary"
                    size="lg"
                    className="min-w-[200px]"
                  >
                    {isSubmitting || formikSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        جاري الإرسال...
                      </span>
                    ) : (
                      "إرسال الطلب"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="rtl"
          theme="light"
          limit={3}
        />
      </div>
    </>
  );
};

export default JoinCreatorsPage;
