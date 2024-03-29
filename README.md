# update-denoconfig cli & exported function

A package to update deno.json or deno.jsonc config files easily, without loosing comments.

## Usage as CLI

```bash
deno install -g jsr:@codemonument/update-denoconfig
update-denoconfig --config ./deno.jsonc --kv.version=1.0.0 --kv.tasks.echo=\"echo \\\"Hello World!\\\"\"
```

Result: Updates the input deno.jsonc (or deno.json) file with the provided key-value pairs and while keeping all comments. (also does deep updates, as seen for `tasks.echo`!)

```jsonc
{
	// This is a comment
	"version": "1.0.0",
	"tasks": {
		"echo": "echo \"Hello World!\""
	}
}
```

## Usage as exported function

```bash
deno add @codemonument/update-denoconfig
```

```typescript
import {updateConfig} from '@codemonument/update-denoconfig';

const updateObject = {
	version: '1.0.0',
	tasks: {
		echo: "echo 'Hello World!'",
	},
};

// Note: The path is relative to the current working directory
await updateConfig('./deno.jsonc', updateObject);
```

## Important notes

This cli currently only supports two levels of key nesting (e.g. `tasks.echo`) and no array access.  
For example - given this `publish` key:

```
 "publish": {
    "include": [
      "./main.ts",
      "./deno.jsonc",
      "./deno.lock",
      "./README.md",
      "./LICENSE",
      "./src"
    ]
  }
```

This cli is able to overwrite the whole `publish.include` array via `--kv.publish.include=[...]`, but not add or remove individual elements of the array.

I only need it currently to update the `version` property, and I don't want to write a whole new `jq` cli.
If you need more advanced editing functionality in the cli or in the exported `updateConfig()` function, please open an issue or PR at https://github.com/codemonument/deno_update_denoconfig/issues !