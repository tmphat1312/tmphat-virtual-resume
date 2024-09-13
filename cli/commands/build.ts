import { exec, execWithLocalServer, log } from "../helpers";

export async function buildCommand() {
  // Netlify caching mechanism causes chromium used by puppeteer not to work properly.
  if (process.env.NETLIFY) {
    await reinstallPuppeteer();
  }

  await exec("pnpm generate:colors");
  await execWithLocalServer("pnpm generate");

  await exec("astro build");
  process.exit(0);
}

async function reinstallPuppeteer() {
  log.info("Reinstalling puppeteer...");

  await exec("pnpm rm puppeteer");
  await exec("pnpm add puppeteer");

  log.success("Puppeteer reinstalled successfully");
}
