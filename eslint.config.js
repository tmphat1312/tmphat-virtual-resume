import pluginJs from "@eslint/js";
import pluginAstro from "eslint-plugin-astro";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import pluginTs from "typescript-eslint";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  { ignores: ["**/*.d.ts"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  pluginPrettier,
  ...pluginAstro.configs.recommended,
  {
    files: ["**/*.{astro,ts}"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
