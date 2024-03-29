import { assert, assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { getSelfPackageRootUrl } from "./getSelfPackageRootUrl.ts";

describe("getSelfPackageRootUrl", () => {
  it("should return the root of this package", () => {
    const root = getSelfPackageRootUrl();
    console.log("Self Package Root:", root.href);
    assertEquals(root.protocol, "file:");
    assert(root.pathname.endsWith("deno_update_denoconfig"));
  });
});
