import { dirname, join, normalize } from "@std/url";

/**
 * @returns The root url of this package relative to this file.
 */
export function getPackageRoot() {
  const thisFileUrl = new URL(import.meta.url);
  const thisPackageRoot = normalize(join(dirname(thisFileUrl), "..", ".."));
  return thisPackageRoot;
}
