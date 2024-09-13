#!/usr/bin/env tsx

import { program } from "commander";

import { buildCommand } from "./commands/build";
import { colorsCommand } from "./commands/colors";
import { faviconsCommand } from "./commands/favicons";
import { generateCommand } from "./commands/generate";
import { ogCommand } from "./commands/og";

program.name("zenith").description("Zenith CLI utilities").version("0.0.1");

program
  .command("favicons")
  .description("Generate favicons")
  .action(faviconsCommand);

program
  .command("og")
  .description("Generate open graph images")
  .argument("[name]", "name of the .astro file to generate open graph from.")
  .action(ogCommand);

program
  .command("colors")
  .description(
    "Generate color styles based on the config in `cli/commands/colors.ts`",
  )
  .action(colorsCommand);

program
  .command("generate")
  .description("Generate favicons, open graph images, and color styles")
  .action(generateCommand);

program.command("build").description("Build the project").action(buildCommand);
program.parse(process.argv);
