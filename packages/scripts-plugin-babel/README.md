# @trigen/scripts-plugin-babel

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Dependabot badge][dependabot]][dependabot-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-plugin-babel.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-plugin-babel

[node]: https://img.shields.io/node/v/%40trigen/scripts-plugin-babel.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-plugin-babel
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-plugin-babel

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/scripts
[dependabot-url]: https://dependabot.com/

Babel scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-babel
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-babel",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts start src/test.js
```

## Available scripts

```bash
# Start given script
yarn start
# Build sources
yarn build
```
