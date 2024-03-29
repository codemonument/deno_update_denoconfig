import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import { getSelf_PackageVersion } from "./getSelf_PackageVersion.ts";
import { ZodSemver } from "@codemonument/zod-semver";

describe("getPackageVersion", () => {
  it("should return the version of the package", async () => {
    const version = await getSelf_PackageVersion();
    const parsedSemver = ZodSemver.safeParse(version);
    assert(parsedSemver.success === true);
    console.log("Version:", version);
  });
});
