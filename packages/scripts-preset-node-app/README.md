# @trigen/scripts-preset-node-app

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Dependabot badge][dependabot]][dependabot-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-preset-node-app.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-preset-node-app

[node]: https://img.shields.io/node/v/%40trigen/scripts-preset-node-app.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-preset-node-app
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-preset-node-app

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/scripts
[dependabot-url]: https://dependabot.com/

Node app scripts preset.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-preset-node-app
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "preset-node-app",
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
| testSkipBuild | `boolean` | `false` | Skip build step while testing. |

## Available scripts

```bash
# Run tests with Jest
yarn jest
# Run lint, tests and build
yarn test
# Start given script
yarn start
# Build soruces
yarn build
```
