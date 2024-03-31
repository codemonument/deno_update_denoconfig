# Changelog

## 1.0.5 - 2024-03-31

- add complete log level management to the cli
- query version of cli in action instead of in global scope to have logMode option available

## 1.0.4 - 2024-03-31

- add force install flag command in readme

## 1.0.3 - 2024-03-31

- refine getSelf_PackageVersion code

## 1.0.2 - 2024-03-31

- make getSelf_PackageVersion function able to load deno.jsonc of this package from a web url

## 1.0.1 - 2024-03-30

- mark "run without installation" as WIP in README.md

## 1.0.0 - 2024-03-30

- update README.md with usage without installation

## 0.1.2 - 2024-03-30

- create a new version of the package for deploying via github actions to fullfill provenance requirements

## 0.1.1 - 2024-03-29

- improve behavior when starting without any options: show help screen

## 0.1.0 - 2024-03-29

- initial release of the package
- allow editing a deno.jsonc or deno.json file with key-value pairs via a cli or exported function (see readme for usage)
