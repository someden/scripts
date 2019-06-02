# @trigen/scripts-plugin-size-limit

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependency status][deps]][deps-url]
[![Build status][build]][build-url]
[![Greenkeeper badge][greenkeeper]][greenkeeper-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-plugin-size-limit.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-plugin-size-limit

[node]: https://img.shields.io/node/v/%40trigen/scripts-plugin-size-limit.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-plugin-size-limit
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-plugin-size-limit

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[greenkeeper]: https://badges.greenkeeper.io/TrigenSoftware/scripts.svg
[greenkeeper-url]: https://greenkeeper.io/

Size-limit scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-size-limit
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-size-limit",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts checkSize
```

## Available scripts

```bash
# Check bundle size
yarn checkSize
```
