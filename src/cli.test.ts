import { startCli } from "@/src/cli.ts";
import { getSelf_PackageRootUrl } from "@/src/utils/getSelf_PackageRootUrl.ts";
import { describe, it } from "@std/testing/bdd";
import { assertSnapshot } from "@std/testing/snapshot";
import { join } from "@std/url";
import * as json5 from "json5-writer";
import { parse } from "@std/jsonc";
import { assertEquals } from "@std/assert";

describe("startCli()", () => {
  it("should successfully edit real-world-like deno.jsonc", async (t) => {
    const testfilePath = join(
      getSelf_PackageRootUrl(),
      "test/cli/deno.jsonc",
    );

    const initialJson5Parse = json5.load(await Deno.readTextFile(testfilePath));

    const updateArgs = [
      `--config=test/cli/deno.jsonc`,
      "--kv.version=1.0.0",
      '--kv.tasks.echo=echo "Hello World!"',
    ];

    // testcall with fake args
    await startCli(updateArgs);

    // read updated config
    const updatedFileContent = await Deno.readTextFile(testfilePath);

    // compare the ast of the updated config to the saved snapshot
    // should always match since this test function is deterministic, as long as the testfile and this test do not change.
    const updatedJson5Parse = json5.load(updatedFileContent);
    await assertSnapshot(t, updatedJson5Parse.ast);

    // compare the updated config to expected values
    const updatedJsoncParse = parse(updatedFileContent) as any;
    assertEquals(updatedJsoncParse?.version, "1.0.0");
    assertEquals(updatedJsoncParse?.tasks?.echo, 'echo "Hello World!"');

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
