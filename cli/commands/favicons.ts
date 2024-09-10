import { writeFile } from "fs/promises";
import { join } from "node:path";

import type {
  FaviconFile,
  FaviconHtmlElement,
  FaviconImage,
  FaviconOptions,
} from "favicons";
import { favicons } from "favicons";

import data from "favicons.data.json";
import { ensureCleanDirExists, exec, log } from "../helpers";

const OUTPUT_ASSETS_DIR = "public/generated/favicons";
const OUTPUT_ASTRO_DIR = "src/web/components/metadata/generated";
const OUTPUT_ASTRO_FILE = "favicons.astro";

const FAVICONS_OPTIONS = {
  path: OUTPUT_ASSETS_DIR.replace("public", ""),
  appName: data.appName,
  appDescription: data.appDescription,
  appShortName: data.appShortName,
  lang: data.lang,
  start_url: ".",
  icons: {
    android: ["android-chrome-192x192.png", "android-chrome-512x512.png"],
    windows: false,
    yandex: false,
    appleStartup: false,
    appleIcon: ["apple-touch-icon.png"],
    favicons: ["favicon-16x16.png", "favicon-32x32.png", "favicon.ico"],
  },
} satisfies FaviconOptions;

export async function faviconsCommand() {
  const { images, files, html } = await generateFavicons();

  await Promise.all([
    ensureCleanDirExists(OUTPUT_ASSETS_DIR),
    ensureCleanDirExists(OUTPUT_ASTRO_DIR),
  ]);
  await Promise.all([
    images.map(saveFaviconsFile),
    files.map(saveFaviconsFile),
    saveAstroFile(html),
  ]);

  log.success("Favicons generated successfully");
  process.exit(0);
}

async function generateFavicons() {
  return favicons(data.baseImage, FAVICONS_OPTIONS);
}

async function saveFaviconsFile(file: FaviconFile | FaviconImage) {
  log.info(`Creating ${file.name} file...`);
  await writeFile(`${OUTPUT_ASSETS_DIR}/${file.name}`, file.contents);
}

async function saveAstroFile(html: FaviconHtmlElement[]) {
  log.info(`Creating ${OUTPUT_ASTRO_FILE} file...`);

  const topComment = `
  <!--
    This file is auto-generated. Do not edit it manually.
    In order to apply changes to it, adjust configuration object in scripts/generate-favicons.ts script and run it
  -->
`.trim();
  const astroFilePath = join(OUTPUT_ASTRO_DIR, OUTPUT_ASTRO_FILE);

  await writeFile(astroFilePath, [topComment, ...html].join("\n"));
  await exec(`prettier --write ${astroFilePath} --log-level error`);
}
