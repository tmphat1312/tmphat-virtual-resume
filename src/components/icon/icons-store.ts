import type { AstroGlobal } from "astro";
import { nanoid } from "nanoid";

import type { ContextSlice } from "@/types/context";
import { getGlobalContext } from "@/utils/get-global-context";
import { log } from "cli/helpers";

/**
 * List of sources to fetch icons from.
 */
const ICON_SOURCES = [
  "https://api.iconify.design",
  "https://api.simplesvg.com",
  "https://api.unisvg.com",
] as const;

/**
 * Store used for server icons. Allows to:
 * - avoid fetching the same icon multiple times,
 * - reuse same icon markup based on its key.
 */
export const iconsStore = createIconsStore();

function createIconsStore() {
  const id = nanoid(8);

  async function get(set: string, icon: string, astro: AstroGlobal) {
    const context = getGlobalContext<ContextSlice<"iconStore">>(astro);
    const key = `${set}:${icon}-${id}`;

    if (context.iconStore.has(key)) {
      return {
        key,
        isFirst: false,
        element: await context.iconStore.get(key)!,
      };
    }

    context.iconStore.set(key, fetchIcon(set, icon));

    return { key, isFirst: true, element: await context.iconStore.get(key)! };
  }

  return { get };
}

async function fetchIcon(set: string, icon: string) {
  const path = `${set}/${icon}.svg`;

  for (const source of ICON_SOURCES) {
    const { result, error } = await safeFetch(`${source}/${path}`);
    if (result) return result;
    if (error) log.error(`Cannot fetch icon from ${source}: ${error}`);
  }

  throw new Error(`Cannot fetch icon: ${set}:${icon} from any source.`);
}

async function safeFetch(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { result: null, error: response.statusText };
    }

    return { result: await response.text(), error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { result: null, error: error.message };
    }

    throw error;
  }
}
