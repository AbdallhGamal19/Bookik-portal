"use client";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdClose, MdLockOutline, MdOutlinePerson } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { useAppContext } from "@/context/appContext";

import { LoginModalProps } from "@/interface";

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAppContext();

  const router = useRouter();

  const validationSchema = Yup.object({
    emailOrUsername: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleForgotPassword = () => {
    // Handle forgot password logic here

    toast.info("Forgot password functionality coming soon!");
  };

  const handleCreateAccount = () => {
    // Handle create account logic here

    toast.info("Create account functionality coming soon!");
  };

  const notify = (
    message: string,
    type: "success" | "error" | "info" = "error"
  ) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message, { className: "text-red-500" });
    } else {
      toast.info(message);
    }
  };

  const handleSubmit = async (
    values: { emailOrUsername: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setErrorMessage("");

      // Use the login function from app context

      const result = await login(values.emailOrUsername, values.password);

      if (result.success) {
        // Show success message
        notify("Login successful! Redirecting...", "success");

        // Close modal and notify parent of successful login
        onLoginSuccess();
        onClose();

        // Redirect to last page or default based on user type
        const lastPage = sessionStorage.getItem("lastPage") || "/";

        if (lastPage !== "/login" && lastPage !== "/") {
          router.push(lastPage);
        } else {
          // Default redirect to Explorer for now
          router.push("/Explorer");
        }
      } else {
        // Show the specific error message from the API
        const errorMsg =
          result.message ||
          "Login failed. Please check your credentials and try again.";
        setErrorMessage(errorMsg);
        notify(errorMsg, "error");
      }
    } catch (error) {
      const errorMsg = "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      notify(errorMsg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-4">
        <div className="bg-theme-bg-card rounded-bookik-rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-theme-border-primary">
            <h2 className="text-xl font-semibold text-theme-text-primary">
              تسجيل الدخول
            </h2>
            <button
              onClick={onClose}
              className="text-theme-text-secondary hover:text-theme-text-primary transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Logo and Title */}
          <div className="flex flex-col justify-center items-center p-6">
            <Image
              className="mb-3 w-[80px] h-auto"
              alt="Bookik"
              src="/Bookik.svg"
              width={80}
              height={20}
            />
            <p className="font-bold text-theme-text-primary text-text5 text-center tracking-[0] leading-[normal] [direction:rtl]">
              اكبر صرح إعلاني في المملكة..!
            </p>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="mx-6 mb-4 p-3 bg-theme-bg-error border border-theme-border-error text-theme-text-error rounded-bookik-rounded-md">
              {errorMessage}
            </div>
          )}

          {/* Login Form */}
          <div className="px-6 pb-6">
            <Formik
              initialValues={{
                emailOrUsername: "admin@orchid.com",
                password: "123123",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validate={(values) => {
                console.log("Formik validate called with values:", values);
                return {};
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Username Field */}
                  <FormField
                    name="emailOrUsername"
                    label="Username or email"
                    placeholder="اسم المستخدم او رقم الهاتف"
                    icon={<MdOutlinePerson size={16} />}
                    containerClass=""
                    inputClass="font-normal text-theme-text-primary text-text7 text-right placeholder:text-theme-text-muted"
                    labelClass="ps-1 font-normal text-theme-text-secondary text-text5 mb-1 block text-left"
                  />

                  {/* Password Field */}
                  <FormField
                    name="password"
                    label="Password"
                    placeholder="كلمة السر"
                    type="password"
                    icon={<MdLockOutline size={16} />}
                    showPasswordToggle={true}
                    inputClass="font-normal text-theme-text-primary text-text7 text-right placeholder:text-theme-text-muted"
                    labelClass="ps-1 font-normal text-theme-text-secondary text-text5 mb-1 block text-left"
                  />

                  {/* Remember Me and Forgot Password */}
                  <div className="flex items-center justify-between px-2 mt-4">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="bg-[linear-gradient(180deg,rgba(182,67,151,1)_0%,rgba(78,37,73,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-bold text-transparent text-xs text-left tracking-[0] leading-[normal] [direction:rtl] cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      نسيت كلمة السر؟
                    </button>
                    <div className="flex items-center justify-center cursor-pointer gap-bookik-gap-sm">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-[17px] h-4 border border-solid border-primary appearance-none checked:bg-primary checked:border-primary cursor-pointer"
                      />
                      <span className="font-normal text-theme-text-primary text-text7 text-left tracking-[0] leading-[normal] [direction:rtl] select-none">
                        تذكرني
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                    onClick={() => console.log("Submit button clicked")}
                  >
                    {isSubmitting ? "جاري تسجيل الدخول" : "دخول"}
                  </Button>

                  {/* Create Account Link */}
                  <div className="text-center pt-2">
                    <span className="font-normal text-theme-text-secondary text-sm">
                      ليس لديك حساب؟{" "}
                    </span>
                    <button
                      type="button"
                      onClick={handleCreateAccount}
                      className="bg-[linear-gradient(180deg,rgba(182,67,151,1)_0%,rgba(78,37,73,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-extrabold text-transparent text-sm text-center underline tracking-[0] leading-[normal] [direction:rtl] cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      حساب جديد
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
