"use client";
import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

const FormField: React.FC<any> = ({
  name,
  label,
  placeholder,
  type = "text",
  icon,
  showPasswordToggle = false,
  containerClass = "",
  inputClass = "",
  labelClass = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className={containerClass}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <div className="flex items-center w-full h-11 gap-bookik-gap-sm px-4 py-3 rounded-bookik-rounded-md border border-solid border-theme-border-primary bg-theme-bg-input focus-within:border-theme-border-focus transition-colors">
        {icon && (
          <div className="flex-shrink text-theme-text-secondary">{icon}</div>
        )}
        <Field
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          className={`flex-1 bg-transparent outline-none text-theme-text-primary placeholder-theme-text-muted ${inputClass}`}
          dir="rtl"
        />
        {showPasswordToggle && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="relative w-4 h-[12px] cursor-pointer hover:opacity-80 text-theme-text-secondary"
          >
            {showPassword ? <PiEyeLight /> : <PiEyeSlashLight />}
          </div>
        )}
      </div>
      <ErrorMessage
        name={name}
        component="p"
        className="text-theme-accent-error text-sm mt-1"
      />
    </div>
  );
};

export default FormField;
