import { exec, log } from "../helpers";

export async function buildCommand() {
  // Netlify caching mechanism causes chromium used by puppeteer not to work properly.
  if (process.env.NETLIFY) {
    await reinstallPuppeteer();
  }

  // await Promise.all([
  //   exec("pnpm generate:colors"),
  //   exec("pnpm generate:favicons"),
  // ]);
  // await execWithLocalServer("pnpm generate:og");

  await exec("astro build");
  process.exit(0);
}

async function reinstallPuppeteer() {
  log.info("Reinstalling puppeteer...");

  await exec("pnpm rm puppeteer");
  await exec("pnpm add puppeteer");

  log.success("Puppeteer reinstalled successfully");
}
