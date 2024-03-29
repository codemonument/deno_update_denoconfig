import * as json5 from "json5-writer";
import * as jsonc from "@std/jsonc";
import { deepmerge } from "deepmerge-ts";

/**
 * Updates an existing deno.jsonc (or deno.json) file with the provided 'updatedConfig',
 * while preserving comments.
 *
 * CAUTION: This function does not do any validation of the updatedConfig!
 * Make sure that you only use valid options for the deno.jsonc/deno.json file!
 *
 * @param updatedConfig an updated config in the same format as the deno.jsonc file
 */
export async function updateConfig(
  denoConfigPathOrUrl: string | URL,
  updatedConfig: Record<string, any>,
) {
  // 1.
  // Load the config file two times, once with the deno std jsonc parser
  // and once with the json5-writer package parser
  // Reason:
  // json5-writer removes all properties from the target file which are not present in the updated config
  // We don't want that.
  // Normally, json5-writer expects the updated config to list all properties with "undefined" as value to keep them in the target file.
  // To avoid listing ALL possible props of a deno.json file (which would be a hell to maintain),
  // we load the target file with the deno std jsonc parser first and combine the updated object with the new one.
  const fileContent = await Deno.readTextFile(denoConfigPathOrUrl);
  const denoJsoncParsed = jsonc.parse(fileContent);
  const denoJson5Parsed = json5.load(fileContent);

  if (typeof denoJsoncParsed !== "object") {
    // This should never happen, because the deno.jsonc file should always be an object
    throw new Error("Expected a root object for deno.jsonc content");
  }

  // import all the properties from existing deno.jsonc, so that json5-writer doesn't remove them
  // merge them with the properties we want to update
  const newConfig = deepmerge(denoJsoncParsed, updatedConfig);

  denoJson5Parsed.write(newConfig);

  // for debugging, in case we need to go into the AST in the future:
  //   output all ast paths there are
  // denoJsonc.ast.forEach((path: any) => {
  //   console.log(path);
  // });

  await Deno.writeTextFile(
    denoConfigPathOrUrl,
    denoJson5Parsed.toSource({
      quote: "double",
      trailingComma: false,
      quoteKeys: true,
    }),
  );
}
