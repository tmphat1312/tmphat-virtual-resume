/** @type {import("prettier").Config} */
export default {
  endOfLine: "lf",
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  semi: true,
  plugins: ["prettier-plugin-astro", "prettier-plugin-packagejson"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
