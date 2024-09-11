import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  integrations: [
    tailwind(),
    icon(),
    sitemap({ filter: (url) => new URL(url).pathname === "/" }),
    metaTags(),
  ],
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
