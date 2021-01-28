# @trigen/scripts-preset-lib

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Dependabot badge][dependabot]][dependabot-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-preset-lib.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-preset-lib

[node]: https://img.shields.io/node/v/%40trigen/scripts-preset-lib.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-preset-lib
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-preset-lib

[build]: https://img.shields.io/github/workflow/status/TrigenSoftware/scripts/CI.svg
[build-url]: https://github.com/TrigenSoftware/scripts/actions

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/scripts
[dependabot-url]: https://dependabot.com/

Lib scripts preset.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-preset-lib
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "preset-lib",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts build
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| publish | `string` | - | Custom path to publish as package. |
| testSkipBuild | `boolean` | `false` | Skip build step while testing. |

## Available scripts

```bash
# Run lint, tests and build
yarn test
# Clean package publish
yarn cleanPublish
```
