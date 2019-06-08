# @trigen/scripts-plugin-rollup

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Greenkeeper badge][greenkeeper]][greenkeeper-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-plugin-rollup.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-plugin-rollup

[node]: https://img.shields.io/node/v/%40trigen/scripts-plugin-rollup.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-plugin-rollup
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-plugin-rollup

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[greenkeeper]: https://badges.greenkeeper.io/TrigenSoftware/scripts.svg
[greenkeeper-url]: https://greenkeeper.io/

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
