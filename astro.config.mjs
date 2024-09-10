import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  integrations: [tailwind(), icon()],
});

function getSiteUrl() {
  if (process.env.ASTRO_SITE) return process.env.ASTRO_SITE;
  if (process.env.NETLIFY) return process.env.URL;

  if (process.env.CI && process.env.CI_CHECKS !== "true") {
    console.error(
      "Site URL not not found. Please set the ASTRO_SITE environment variable.",
    );
    process.exit(1);
  }

  return "http://localhost:4321";
}
