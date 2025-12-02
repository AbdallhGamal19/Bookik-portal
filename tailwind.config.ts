import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"], // global
      },

      fontSize: {
        // الأحجام الأساسية
        text1: "36px",
        text2: "32px",
        text3: "24px",
        text4: "20px",
        text18px: "18px",
        text5: "16px",
        text6: "14px",
        text7: "12px",
        text8: "10px",
        text9: "8px",
        text10: "6px",
        text11: "4px",

        // أحجام إضافية للنصوص
        textlg: "18px", // text-lg
        textxl: "20px", // text-xl
        textsm: "14px", // text-sm
        textxs: "12px", // text-xs
        text2xl: "24px", // text-2xl
        text3xl: "30px", // text-3xl
        text4xl: "36px", // text-4xl
        text5xl: "48px", // text-5xl
        text6xl: "60px", // text-6xl
        text7xl: "72px", // text-7xl
        text8xl: "96px", // text-8xl
        text9xl: "128px", // text-9xl
      },

      // متغيرات المسافات (Spacing)
      spacing: {
        // Margins
        "bookik-margin-xs": "4px",
        "bookik-margin-sm": "8px",
        "bookik-margin-md": "16px",
        "bookik-margin-lg": "24px",
        "bookik-margin-xl": "32px",
        "bookik-margin-2xl": "48px",
        "bookik-margin-3xl": "64px",

        // Paddings
        "bookik-padding-xs": "4px",
        "bookik-padding-sm": "8px",
        "bookik-padding-md": "16px",
        "bookik-padding-lg": "24px",
        "bookik-padding-xl": "32px",
        "bookik-padding-2xl": "48px",
        "bookik-padding-3xl": "64px",
        "bookik-padding-4xl": "72px",

        // Gaps
        "bookik-gap-xs": "4px",
        "bookik-gap-sm": "8px",
        "bookik-gap-md": "16px",
        "bookik-gap-lg": "24px",
        "bookik-gap-xl": "32px",
        "bookik-gap-2xl": "48px",
        "bookik-gap-3xl": "64px",
      },

      // متغيرات الحواف المدورة
      borderRadius: {
        "bookik-rounded-xs": "4px",
        "bookik-rounded-sm": "8px",
        "bookik-rounded-md": "12px",
        "bookik-rounded-lg": "16px",
        "bookik-rounded-xl": "20px",
        "bookik-rounded-2xl": "24px",
        "bookik-rounded-3xl": "32px",
        "bookik-rounded-full": "9999px",
        "bookik-rounded-4xl": "52px",
      },
      boxShadow: {
        "bookik-shadow-sm": "0px 0px 7px #00000059",
        "bookik-shadow-md": "0px 0px 20px #00000019",
        "bookik-shadow-lg": "0px 4px 4px #00000040",
        // Theme shadows
        "theme-shadow-sm": "var(--theme-shadow-sm)",
        "theme-shadow-md": "var(--theme-shadow-md)",
        "theme-shadow-lg": "var(--theme-shadow-lg)",
      },
      width: {
        "bookik-w-xs": "60px",
        "bookik-w-sm": "70px",
        "bookik-w-md": "74px",
        "bookik-w-lg": "100px",
        "bookik-w-xl": "111px",
        "bookik-w-2xl": "150px",
        "bookik-w-3xl": "238px",
        "bookik-w-4xl": "404px",
        "bookik-w-5xl": "450px",
        "bookik-w-6xl": "580px",
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
        },
        secondaryColor: "#ffffff99",
        secondary: {
          DEFAULT: "var(--secondaryColor)",
          dark: "var(--secondary-dark)",
        },
        yellow: {
          light: "var(--yellow-light)",
          dark: "var(--yellow-dark)",
        },
        headerLinkBg: "#C6C6C8",
        CategoryDetails: "#ECECEC",

        //background colors
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          background3: "var(--global-bg-3)",
          background4: "var(--global-bg-4)",
          background5: "var(--global-bg-5)",
          background6: "var(--global-bg-6)",
          background7: "var(--global-bg-7)",
          background8: "var(--global-bg-8)",
          background9: "var(--global-bg-9)",
          background10: "var(--global-bg-10)",

          //text colors
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
          text3: "var(--global-text-3)",
          text4: "var(--global-text-4)",
          text5: "var(--global-text-5)",
          text6: "var(--global-text-6)",
          text7: "var(--global-text-7)",
          text8: "var(--global-text-8)",
          text9: "var(--global-text-9)",
          text10: "var(--global-text-10)",
          text11: "var(--global-text-11)",
          text12: "var(--global-text-12)",
          text13: "var(--global-text-13)",
          text14: "var(--global-text-14)",
        },
        header: {
          background1: "var(--header-bg-1)",
          background2: "var(--header-bg-2)",
          text1: "var(--header-text-1)",
        },
        searchview: {
          background1: "var(--searchview-bg-1)",
          text1: "var(--searchview-text-1)",
        },
        button: {
          background1: "var(--button-bg-1)",
          text1: "var(--button-text-1)",
        },

        // ألوان إضافية للنظام
        "text-neutral": {
          50: "var(--text-neutral-50)",
          100: "var(--text-neutral-100)",
          200: "var(--text-neutral-200)",
          300: "var(--text-neutral-300)",
          400: "var(--text-neutral-400)",
          500: "var(--text-neutral-500)",
          600: "var(--text-neutral-600)",
          700: "var(--text-neutral-700)",
          800: "var(--text-neutral-800)",
          900: "var(--text-neutral-900)",
        },
        "text-red": {
          500: "var(--text-red-500)",
          600: "var(--text-red-600)",
          700: "var(--text-red-700)",
        },
        "text-yellow": {
          100: "var(--text-yellow-100)",
          600: "var(--text-yellow-600)",
        },
        "text-green": {
          100: "var(--text-green-100)",
          600: "var(--text-green-600)",
        },
        "text-blue": {
          100: "var(--text-blue-100)",
          600: "var(--text-blue-600)",
        },
        "text-purple": {
          100: "var(--text-purple-100)",
          600: "var(--text-purple-600)",
        },
        white: {
          DEFAULT: "#ffffff",
          90: "var(--white-90)",
        },
        black: {
          60: "var(--black-60)",
          17: "var(--black-17)",
        },

        // Theme Colors
        theme: {
          bg: {
            primary: "var(--theme-bg-primary)",
            secondary: "var(--theme-bg-secondary)",
            tertiary: "var(--theme-bg-tertiary)",
            card: "var(--theme-bg-card)",
            overlay: "var(--theme-bg-overlay)",
          },
          text: {
            primary: "var(--theme-text-primary)",
            secondary: "var(--theme-text-secondary)",
            tertiary: "var(--theme-text-tertiary)",
            muted: "var(--theme-text-muted)",
          },
          border: {
            primary: "var(--theme-border-primary)",
            secondary: "var(--theme-border-secondary)",
            accent: "var(--theme-border-accent)",
          },
          accent: {
            primary: "var(--theme-accent-primary)",
            secondary: "var(--theme-accent-secondary)",
            success: "var(--theme-accent-success)",
            warning: "var(--theme-accent-warning)",
            error: "var(--theme-accent-error)",
            info: "var(--theme-accent-info)",
          },
        },

        // Direct Theme Classes
        "theme-bg-primary": "var(--theme-bg-primary)",
        "theme-bg-secondary": "var(--theme-bg-secondary)",
        "theme-bg-tertiary": "var(--theme-bg-tertiary)",
        "theme-bg-card": "var(--theme-bg-card)",
        "theme-bg-overlay": "var(--theme-bg-overlay)",
        "theme-bg-input": "var(--theme-bg-input)",
        "theme-bg-button": "var(--theme-bg-button)",
        "theme-bg-hover": "var(--theme-bg-hover)",
        "theme-bg-active": "var(--theme-bg-active)",
        "theme-bg-disabled": "var(--theme-bg-disabled)",
        "theme-bg-success": "var(--theme-bg-success)",
        "theme-bg-warning": "var(--theme-bg-warning)",
        "theme-bg-error": "var(--theme-bg-error)",
        "theme-bg-info": "var(--theme-bg-info)",

        "theme-text-primary": "var(--theme-text-primary)",
        "theme-text-secondary": "var(--theme-text-secondary)",
        "theme-text-tertiary": "var(--theme-text-tertiary)",
        "theme-text-muted": "var(--theme-text-muted)",
        "theme-text-disabled": "var(--theme-text-disabled)",
        "theme-text-success": "var(--theme-text-success)",
        "theme-text-warning": "var(--theme-text-warning)",
        "theme-text-error": "var(--theme-text-error)",
        "theme-text-info": "var(--theme-text-info)",
        "theme-text-link": "var(--theme-text-link)",
        "theme-text-inverse": "var(--theme-text-inverse)",

        "theme-border-primary": "var(--theme-border-primary)",
        "theme-border-secondary": "var(--theme-border-secondary)",
        "theme-border-accent": "var(--theme-border-accent)",
        "theme-border-focus": "var(--theme-border-focus)",
        "theme-border-error": "var(--theme-border-error)",
        "theme-border-success": "var(--theme-border-success)",
        "theme-border-warning": "var(--theme-border-warning)",
        "theme-border-disabled": "var(--theme-border-disabled)",

        "theme-accent-primary": "var(--theme-accent-primary)",
        "theme-accent-secondary": "var(--theme-accent-secondary)",
        "theme-accent-success": "var(--theme-accent-success)",
        "theme-accent-warning": "var(--theme-accent-warning)",
        "theme-accent-error": "var(--theme-accent-error)",
        "theme-accent-info": "var(--theme-accent-info)",
        "theme-accent-purple": "var(--theme-accent-purple)",
        "theme-accent-pink": "var(--theme-accent-pink)",
        "theme-accent-indigo": "var(--theme-accent-indigo)",
        "theme-accent-teal": "var(--theme-accent-teal)",
        "theme-accent-orange": "var(--theme-accent-orange)",
        "theme-accent-rose": "var(--theme-accent-rose)",
      },
    },
  },
  plugins: [],
};
export default config;
