import { assert, assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { getSelf_PackageRootUrl } from "./getSelf_PackageRootUrl.ts";

describe("getSelf_PackageRootUrl", () => {
  it("should return the root of this package", () => {
    const root = getSelf_PackageRootUrl();
    console.log("Self Package Root:", root.href);
    assertEquals(root.protocol, "file:");
    assert(root.pathname.endsWith("deno_update_denoconfig"));
  });
});
