import { assertServerIsRunning, exec } from "../helpers";

export async function generateCommand() {
  assertServerIsRunning();
  await exec('concurrently "pnpm:generate:*(!watch)" -c red,yellow,blue');
  process.exit(0);
}
