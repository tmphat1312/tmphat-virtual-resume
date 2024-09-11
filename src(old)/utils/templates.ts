const excludedKeys = ["collection", "title", "entries"];

/** Picks all props that can be provided to the component used for section content rendering. */
export function pickSectionProps<S extends object>(section: S) {
  return Object.fromEntries(
    Object.entries(section).filter(([key]) => !excludedKeys.includes(key)),
  ) as Omit<S, (typeof excludedKeys)[number]>;
}
