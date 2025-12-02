import { ButtonProps } from "@/interface";

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  fullWidth = false,
  loading = false,
  icon,
  iconProperties,
  ...props
}) => {
  const variants = {
    primary:
      "bg-theme-accent-primary text-theme-text-inverse hover:bg-theme-accent-secondary active:bg-theme-accent-secondary/80 focus:ring-theme-accent-primary/50 ",

    secondary:
      "bg-theme-bg-button text-theme-text-primary hover:bg-theme-bg-hover active:bg-theme-bg-active focus:ring-theme-border-primary/50",
    linerBg:
      "bg-theme-accent-primary text-theme-text-inverse hover:bg-theme-accent-secondary active:bg-theme-accent-secondary/80 focus:ring-theme-accent-primary/50 ",
    outline:
      "border group border-theme-accent-primary text-theme-text-primary bg-transparent hover:bg-theme-accent-primary hover:text-theme-text-inverse active:bg-theme-accent-primary/80 focus:ring-theme-accent-primary/30",
    ghost:
      "text-theme-text-secondary bg-transparent hover:bg-theme-bg-hover active:bg-theme-bg-active focus:ring-theme-border-primary/50",
    danger:
      "bg-theme-accent-error text-theme-text-inverse hover:bg-theme-accent-error/80 active:bg-theme-accent-error/90 focus:ring-theme-accent-error/50",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs sm:px-2.5 sm:py-1.5 sm:text-xs ",
    sm: "px-2.5 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm md:text-sm",
    md: "px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base md:text-base",
    lg: "px-4 py-2.5 text-base sm:px-5 sm:py-3 sm:text-lg md:text-lg lg:text-xl",
    xl: "px-5 py-3 text-lg sm:px-6 sm:py-4 sm:text-xl md:text-xl lg:text-2xl",
  };

  const responsiveRadius =
    "rounded-bookik-rounded-2xl sm:rounded-bookik-rounded-2xl md:rounded-bookik-rounded-2xl";
  const responsiveFocus = "focus:ring-2 sm:focus:ring-2 md:focus:ring-4";
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`
        ${responsiveRadius}
        transition-all
        duration-200 
        ease-in-out
        focus:outline-none 
        ${responsiveFocus}
        focus:ring-opacity-50
        ${variants[variant as keyof typeof variants]} 
        ${sizes[size as keyof typeof sizes]} 
        ${fullWidth ? "w-full" : "w-auto"}
        ${
          disabled || loading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:scale-105 active:scale-95"
        } 
        ${loading ? "relative" : ""}
        font-bold
        inline-flex
        items-center
        justify-center
        gap-bookik-gap-sm
        touch-manipulation
        ${className}
       
      `
        .trim()
        .replace(/\s+/g, " ")}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {icon && (
        <span
          className={`${iconProperties}  group-hover:text-inherit   duration-200 
        ease-in-out`}
        >
          {icon}
        </span>
      )}
      <span className={`${loading ? "opacity-75" : ""}  `}>{children}</span>
    </button>
  );
};

export default Button;
