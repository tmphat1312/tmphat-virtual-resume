import type { WebContext } from "src(old)/web/utils/initialize-web-context";

export type Theme = "light" | "dark" | "system" | "custom";

export type IconStore = Map<string, string | Promise<string>>;

type Context = Omit<WebContext, "type"> & {
  type: WebContext["type"];
};

export type ContextSlice<T extends keyof Context> = Pick<Context, T>;
