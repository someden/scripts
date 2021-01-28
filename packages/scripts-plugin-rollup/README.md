# @trigen/scripts-plugin-rollup

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Dependabot badge][dependabot]][dependabot-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-plugin-rollup.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-plugin-rollup

[node]: https://img.shields.io/node/v/%40trigen/scripts-plugin-rollup.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-plugin-rollup
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-plugin-rollup

[build]: https://img.shields.io/github/workflow/status/TrigenSoftware/scripts/CI.svg
[build-url]: https://github.com/TrigenSoftware/scripts/actions

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/scripts
[dependabot-url]: https://dependabot.com/

Jest scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-rollup
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-rollup",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts build
```

## Available scripts

```bash
# Build bundle
yarn build
```
