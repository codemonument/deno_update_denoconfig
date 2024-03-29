import { describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import { getPackageVersion } from "./getPackageVersion.ts";
import { ZodSemver } from "@codemonument/zod-semver";

describe("getPackageVersion", () => {
  it("should return the version of the package", async () => {
    const version = await getPackageVersion();
    const parsedSemver = ZodSemver.safeParse(version);
    assert(parsedSemver.success === true);
    console.log("Version:", version);
  });
});
