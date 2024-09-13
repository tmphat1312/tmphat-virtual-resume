import type { WebContext } from "@/web/utils/initialize-web-context";

export type Theme = "light" | "dark" | "system" | "custom";

export type IconStore = Map<string, string | Promise<string>>;

type Context = Omit<WebContext, "type"> & {
  type: WebContext["type"];
};
/**
 // type Context = WebContext;
 * We could use this, but I will leave it like above for extension later
 */

export type ContextSlice<T extends keyof Context> = Pick<Context, T>;
