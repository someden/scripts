# @trigen/scripts-preset-lib

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependency status][deps]][deps-url]
[![Build status][build]][build-url]
[![Greenkeeper badge][greenkeeper]][greenkeeper-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-preset-lib.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-preset-lib

[node]: https://img.shields.io/node/v/%40trigen/scripts-preset-lib.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-preset-lib
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-preset-lib

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[greenkeeper]: https://badges.greenkeeper.io/TrigenSoftware/scripts.svg
[greenkeeper-url]: https://greenkeeper.io/

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

## Available scripts

```bash
# Run tests with Jest
yarn jest
# Check bundle size
yarn checkSize
# Run lint, tests and build
yarn test
# Start given script
yarn start
# Build soruces
yarn build
# Clean package publish
yarn cleanPublish
```
