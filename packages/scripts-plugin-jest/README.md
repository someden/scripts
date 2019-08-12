# @trigen/scripts-plugin-jest

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Dependabot badge][dependabot]][dependabot-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-plugin-jest.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-plugin-jest

[node]: https://img.shields.io/node/v/%40trigen/scripts-plugin-jest.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-plugin-jest
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-plugin-jest

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/scripts
[dependabot-url]: https://dependabot.com/

Jest scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-jest
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-jest",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts jest --watch
```

## Available scripts

```bash
# Run tests with Jest
yarn jest
# Run tests
yarn test
```
