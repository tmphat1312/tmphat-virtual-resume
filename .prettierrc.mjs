/** @type {import("prettier").Config} */
export default {
  semi: true,
  trailingComma: "all",
  bracketSameLine: true,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
