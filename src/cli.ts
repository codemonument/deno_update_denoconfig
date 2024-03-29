import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { getSelf_PackageVersion } from "./utils/getSelf_PackageVersion.ts";

export async function startCli() {
  await new Command()
    .name("update-denoconfig")
    .version(await getSelf_PackageVersion())
    .description(
      "A package to update deno.json or deno.jsonc config files easily, without loosing comments",
    )
    .option(
      "-c, --config <file:string>",
      "The deno.json or deno.jsonc file to update",
    )
    .option(
      "--kv.* <value:string>",
      "The key-value pairs to update, example: --kv.version=1.0.0 updates the 'version' property to '1.0.0'",
    )
    .option(
      "--kv.*.* <value:string>",
      `The key-value pairs on the second depth to update, example: --kv.tasks.echo="echo \\"Hello World!\\""`,
    )
    .action((options) => {
      console.log("cli called with options and args: ", { options });
    })
    .parse(Deno.args);
}
