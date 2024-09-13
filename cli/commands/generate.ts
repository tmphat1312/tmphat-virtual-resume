import { assertServerIsRunning, exec } from "../helpers";

export async function generateCommand() {
  assertServerIsRunning();
  try {
    await exec('concurrently "pnpm:generate:*(!colors)" -c red,yellow,blue');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
