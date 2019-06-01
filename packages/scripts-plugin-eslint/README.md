# @trigen/scripts-plugin-eslint

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependency status][deps]][deps-url]
[![Build status][build]][build-url]
[![Greenkeeper badge][greenkeeper]][greenkeeper-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-plugin-eslint.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-plugin-eslint

[node]: https://img.shields.io/node/v/%40trigen/scripts-plugin-eslint.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-plugin-eslint
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-plugin-eslint

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[greenkeeper]: https://badges.greenkeeper.io/TrigenSoftware/scripts.svg
[greenkeeper-url]: https://greenkeeper.io/

ESLint scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-eslint
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-eslint",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts lint:js
```

## Available scripts

```bash
# Lint only javascript
yarn lint:js
# Lint only scripts
yarn lint:scripts
# Lint all sources
yarn lint
# Run lint
yarn test
```
