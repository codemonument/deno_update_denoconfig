# update-denoconfig package: cli & exported function

A package to update deno.json or deno.jsonc config files easily, without loosing comments.

## Run in deno without installation

Note: Please adjust the `--config` path to your actual deno.jsonc file path and the `--kv` key-value pairs to your desired changes.

```bash
deno run --allow-read=.,deno.jsonc --allow-write=.,deno.jsonc --allow-net=jsr.io jsr:@codemonument/update-denoconfig@1.0.6 --config ./deno.jsonc --kv.version=1.0.0 --kv.tasks.echo=\"echo \\\"Hello World!\\\"\"
```

## Install & Use as CLI

Install

```bash
deno install -g deno install -g --allow-read=.,deno.jsonc --allow-write=.,deno.jsonc --allow-net=jsr.io jsr:@codemonument/update-denoconfig@1.0.6
```

Update (with -f flag to force install)

```bash
deno install -gf --allow-read=.,deno.jsonc --allow-write=.,deno.jsonc --allow-net=jsr.io jsr:@codemonument/update-denoconfig@1.0.6
```

Run the cli

```bash
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

## Install & use in a build script

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

## How to release a new version (for maintainers)

1. Update the version in `deno.jsonc`
2. Update the version in `README.md` for the installation instructions
3. Update CHANGELOG.md with the new version and changes
4. Commit
5. Tag the commit with the new version
6. Push the commit and tag => Github Actions will automatically publish the new version to jsr

## TODO (bjesuiter)

- [ ] - branch out "asset loading from jsr" into it's own package
