import { assertNotEquals } from "@std/assert";
import { parse } from "@std/jsonc";
import { describe, it } from "@std/testing/bdd";
import { join } from "@std/url";

import { getSelf_PackageRootUrl } from "@/src/utils/getSelf_PackageRootUrl.ts";
import { assertEquals } from "jsr:@std/assert";
import { updateConfig } from "./update-config.ts";

describe("updateConfig", () => {
  it("should update the config file", async () => {
    const testfilePath = join(
      getSelf_PackageRootUrl(),
      "test/update-config/deno.jsonc",
    );

    const initialConfig = parse(await Deno.readTextFile(testfilePath));
    const updateObject = {
      version: "1.0.0",
      tasks: {
        echo: "echo 'Hello World!'",
      },
    };
    // Assert that the initial config is not the same as the updateObject
    assertNotEquals(initialConfig, updateObject);

    await updateConfig(testfilePath, updateObject);
    const updatedConfig = parse(await Deno.readTextFile(testfilePath));
    // Assert that the updated config is the same as the updateObject
    assertEquals(updatedConfig, updateObject);

    // restore initial state of testfile for next test
    await Deno.writeTextFile(
      testfilePath,
      JSON.stringify(initialConfig, undefined, 2),
    );
  });
});
