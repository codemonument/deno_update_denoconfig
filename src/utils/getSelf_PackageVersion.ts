import { parse } from "@std/jsonc";
import { join } from "@std/url";
import { z } from "zod";
import { getSelf_PackageRootUrl } from "./getSelf_PackageRootUrl.ts";
import { isLogModeDebug } from "./global_config.ts";

/**
 * @returns The version of this package as defined in the deno.jsonc file in the root of this package.
 *
 * Caution: This function is needed because when the package is used as a dependency, the CWD is the project that uses this package, not this package.
 */
export async function getSelf_PackageVersion() {
  // this code gets the version of this package from the deno.jsonc config file in the root of this package
  const thisPackageRootUrl = getSelf_PackageRootUrl();
  const thisPackageDenoconfigUrl = join(thisPackageRootUrl, "deno.jsonc");

  let content = "";

  if (isLogModeDebug()) {
    console.log("thisPackageRootUrl: ", thisPackageRootUrl);
    console.log("thisPackageDenoconfigUrl: ", thisPackageDenoconfigUrl);
  }

  if (thisPackageDenoconfigUrl.protocol === "file:") {
    content = await Deno.readTextFile(thisPackageDenoconfigUrl);
  } else {
    content = await fetch(thisPackageDenoconfigUrl).then((res) => res.text());
  }

  const thisDenoconfig = parse(content);

  const schema = z.object({
    version: z.string(),
  });

  // expect a 'version' property in thisDenoconfig
  const validatedDenoconfig = schema.parse(thisDenoconfig);

  return validatedDenoconfig.version;
}
