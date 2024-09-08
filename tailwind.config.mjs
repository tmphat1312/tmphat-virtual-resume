import twColors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector"],
  content: ["./src/**/*.{astro,html,js,jsx,md,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: twColors.gray[50],
        fg: twColors.gray[900],
        bg_dark: twColors.gray[900],
        fg_dark: twColors.gray[50],
      },
    },
  },
  plugins: [],
};
