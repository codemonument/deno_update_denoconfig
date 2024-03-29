import { dirname, join, normalize } from "@std/url";

/**
 * @returns The root url of this package relative to this file.
 */
export function getSelf_PackageRootUrl() {
  // import.meta.url is the exact url to this getSelf_PackageRootUrl.ts file
  const thisFileUrl = new URL(import.meta.url);
  const thisPackageRoot = normalize(join(dirname(thisFileUrl), "..", ".."));
  return thisPackageRoot;
}
