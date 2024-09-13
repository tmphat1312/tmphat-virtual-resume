import { defineConfig, envField } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  experimental: {
    env: {
      schema: {
        PUBLIC_UMAMI_WEBSITE_ID: envField.string({
          context: "client",
          access: "public",
          optional: true,
        }),
        PUBLIC_POSTHOG_API_HOST: envField.string({
          context: "client",
          access: "public",
          optional: true,
          url: true,
        }),
        PUBLIC_POSTHOG_API_KEY: envField.string({
          context: "client",
          access: "public",
          optional: true,
        }),
      },
    },
  },
  integrations: [
    metaTags(),
    mdx(),
    icon(),
    tailwind(),
    sitemap({
      filter: function (url) {
        return new URL(url).pathname === "/";
      },
    }),
  ],
});

function getSiteUrl() {
  if (process.env.ASTRO_SITE) return process.env.ASTRO_SITE;
  if (process.env.NETLIFY) return process.env.URL;

  if (process.env.CI && process.env.CI_CHECKS !== "true") {
    console.error(`
      Site URL not not found. Please set the ASTRO_SITE environment variable.
    `);
    process.exit(1);
  }

  return "http://localhost:4321";
}
