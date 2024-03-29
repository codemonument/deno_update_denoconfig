import { dirname, join, normalize } from "@std/url";
import { parse } from "@std/jsonc";
import { z } from "zod";

/**
 * @returns The version of this package as defined in the deno.jsonc file in the root of this package.
 *
 * Caution: This function is needed because when the package is used as a dependency, the CWD is the project that uses this package, not this package.
 */
export async function getPackageVersion() {
  // import.meta.url should be the path to this.getPackageVersion.ts file
  // this code gets the version of this package from the deno.jsonc config file in the root of this package
  const thisPackage = normalize(join(dirname(import.meta.url), "..", ".."));
  const thisPackageDenoconfig = join(thisPackage, "deno.jsonc");

  const thisDenoconfig = parse(await Deno.readTextFile(thisPackageDenoconfig));

  const schema = z.object({
    version: z.string(),
  });

  // expect a 'version' property in thisDenoconfig
  const validatedDenoconfig = schema.parse(thisDenoconfig);

  return validatedDenoconfig.version;
}
