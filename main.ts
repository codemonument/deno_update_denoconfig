import "./src/cli.ts";

/**
 * Note: This main.ts file exports all the functions of this package when imported and starts a cli when import.meta.main is true.
 */

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Hello, world!");
}
