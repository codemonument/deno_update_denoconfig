import { assertNotEquals, assertThrows } from "@std/assert";
import { parse } from "@std/jsonc";
import { describe, it } from "@std/testing/bdd";
import { assertSnapshot } from "@std/testing/snapshot";
import { join } from "@std/url";
import * as json5 from "json5-writer";

import { getSelf_PackageRootUrl } from "@/src/utils/getSelf_PackageRootUrl.ts";
import { assertEquals } from "jsr:@std/assert";
import { updateConfig } from "./update-config.ts";

describe("updateConfig", () => {
  it("should update the config file (without comments)", async () => {
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

  it("should update the config file (with comments)", async (t) => {
    const testfilePath = join(
      getSelf_PackageRootUrl(),
      "test/update-config-with-comments/deno.jsonc",
    );

    const initialTestfileContent = await Deno.readTextFile(testfilePath);

    const initialJsoncParse = parse(initialTestfileContent);
    const initialJson5Parse = json5.load(initialTestfileContent);
    const updateObject = {
      version: "1.0.0",
      tasks: {
        echo: "echo 'Hello World!'",
      },
    };

    // Ensure that initialJsoncParse and updateObject are not the same
    assertNotEquals(initialJsoncParse, updateObject);

    await updateConfig(testfilePath, updateObject);
    const updatedJson5Parse = json5.load(await Deno.readTextFile(testfilePath));

    // compare the ast of the updated config to the saved snapshot
    // should always match since this test function is deterministic, as long as the testfile and this test do not change.
    await assertSnapshot(t, updatedJson5Parse.ast);

    // restore initial state of testfile for next test
    await Deno.writeTextFile(
      testfilePath,
      initialJson5Parse.toSource({
        quote: "double",
        trailingComma: false,
        quoteKeys: true,
      }),
    );
  });
});
