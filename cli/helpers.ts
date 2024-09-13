import { existsSync } from "fs";
import { mkdir, readdir, rm } from "fs/promises";
import os from "node:os";

import chalk from "chalk";
import { execa } from "execa";
import puppeteer, { Page } from "puppeteer";

import { SERVER_URL } from "./constants";

export function exec(command: string) {
  return execa(command, {
    shell: true,
    stdio: ["ignore", "inherit", "inherit"],
  });
}

export function execWithLocalServer(command: string) {
  return exec(`start-server-and-test "pnpm dev" ${SERVER_URL} "${command}"`);
}

export const log = {
  info: function (message: string) {
    console.log(chalk.blue(`[INFO] ${message}`));
  },
  success: function (message: string) {
    console.log(chalk.green(`[SUCCESS] ${message}`));
  },
  warn: function (message: string) {
    console.log(chalk.yellow(`[WARNING] ${message}`));
  },
  error: function (message: string) {
    console.error(chalk.red(`[ERROR] ${message}`));
  },
};

export async function ensureCleanDirExists(dir: string) {
  if (existsSync(dir)) {
    await rm(dir, { recursive: true, force: true });
  }
  await mkdir(dir, { recursive: true });
}

export async function assertServerIsRunning() {
  try {
    await fetch(SERVER_URL, { method: "HEAD" });
  } catch {
    throw new Error(
      "Cannot connect to the server. Please run `pnpm run dev` before running this command.",
    );
  }
}

export async function runBrowser(cb: (page: Page) => Promise<void>) {
  const options =
    os.platform() === "win32"
      ? { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
      : undefined;
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  await cb(page);

  await browser.close();
}

export async function forAllPages(
  path: string,
  callback: (name: string) => Promise<void>,
) {
  for (const file of await readdir(path)) {
    if (file.endsWith(".astro")) {
      await callback(file.replace(".astro", ""));
    }
  }
}

export async function visitPage(baseUrl: string, name: string, page: Page) {
  const url = `${baseUrl}/${name.replace("index", "")}`;

  if (!(await doesPageExist(url))) {
    log.warn(`Page ${url} does not exist. Skipping...`);
    return;
  }

  await page.goto(url, { waitUntil: "networkidle0" });
  await removeAstroToolbar(page);
}

async function doesPageExist(url: string) {
  const response = await fetch(url, { method: "HEAD" });
  return response.ok;
}

async function removeAstroToolbar(page: Page) {
  await page.evaluate(() =>
    document.querySelector("astro-dev-toolbar")?.remove(),
  );
}
