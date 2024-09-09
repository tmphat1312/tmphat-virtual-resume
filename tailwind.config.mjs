import twColors from "tailwindcss/colors";
import twTypography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector"],
  content: ["./src/**/*.{astro,html,js,jsx,md,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        md: "64em",
      },
      padding: "0.5rem",
    },
    extend: {
      colors: {
        bg: twColors.gray[50],
        fg: twColors.gray[900],
        bg_dark: twColors.gray[900],
        fg_dark: twColors.gray[50],
      },
    },
  },
  plugins: [twTypography],
};
