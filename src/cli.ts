import { updateConfig } from "@/src/features/update-config.ts";
import {
  cliVersion,
  setCliVersion,
  setLogMode,
} from "@/src/utils/global_config.ts";
import { zodType } from "@codemonument/cliffy-zod-option/zodType";
import { Command } from "@codemonument/cliffy/command";
import { z } from "zod";
import { getSelf_PackageVersion } from "./utils/getSelf_PackageVersion.ts";

const version = await getSelf_PackageVersion();
setCliVersion(version);

export const LogModeSchema = z.enum([
  "debug",
  "verbose",
  "info",
  "warn",
  "error",
]);

export type LogMode = z.infer<typeof LogModeSchema>;

export async function startCli(args: string[] = Deno.args) {
  const command = new Command()
    .name("update-denoconfig")
    .version(() => cliVersion())
    .description(
      "A package to update deno.json or deno.jsonc config files easily, without loosing comments",
    )
    .type("LogMode", zodType(LogModeSchema))
    .option(
      "-l, --logMode <logMode:LogMode>",
      "Set the log mode for this cli",
      {
        global: true,
        default: "info" as const,
      },
    )
    .option(
      "-c, --config <file:string>",
      "The deno.json or deno.jsonc file to update",
      { required: true },
    )
    .option(
      "--kv.* <value:string>",
      "The key-value pairs to update, example: --kv.version=1.0.0 updates the 'version' property to '1.0.0'",
    )
    .option(
      "--kv.*.* <value:string>",
      `The key-value pairs on the second depth to update, example: --kv.tasks.echo="echo \\"Hello World!\\""`,
    )
    .allowEmpty()
    .action(async (options) => {
      // console.log("cli called with options: ", { options });

      if (!options.config) {
        command.showHelp();
        return;
      }

      if (!options.kv) {
        throw new Error(
          "Please provide at least one key-value pair to update with the --kv.* or --kv.*.* option",
        );
      }

      setLogMode(options.logMode);

      await updateConfig(options.config, options.kv);
    });

  await command.parse(args);
}
