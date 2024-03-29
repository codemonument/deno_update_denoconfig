import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { getSelf_PackageVersion } from "./utils/getSelf_PackageVersion.ts";
import { updateConfig } from "@/src/features/update-config.ts";

export async function startCli(args: string[] = Deno.args) {
  await new Command()
    .name("update-denoconfig")
    .version(await getSelf_PackageVersion())
    .description(
      "A package to update deno.json or deno.jsonc config files easily, without loosing comments",
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
    .action(async (options) => {
      // console.log("cli called with options: ", { options });

      if (!options.config) {
        throw new Error(
          "Please provide a deno config file to update with the --config option",
        );
      }

      if (!options.kv) {
        throw new Error(
          "Please provide at least one key-value pair to update with the --kv.* or --kv.*.* option",
        );
      }

      await updateConfig(options.config, options.kv);
    })
    .parse(args);
}
