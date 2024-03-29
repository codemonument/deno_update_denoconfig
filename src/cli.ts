import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { getPackageVersion } from "./utils/getPackageVersion.ts";

export async function startCli() {
  await new Command()
    .name("update-denoconfig")
    .version(await getPackageVersion())
    .description("A simple hello world example.")
    .action(() => {
      console.log("Hello, world!");
    })
    .parse(Deno.args);
}
