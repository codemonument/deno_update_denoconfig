import { updateConfig } from "@codemonument/update-denoconfig";

await updateConfig("test/demo/deno.jsonc", {
  version: "1.0.0",
  tasks: {
    echo: "echo 'Hello World!'",
  },
});
