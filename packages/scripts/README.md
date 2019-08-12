# @trigen/scripts

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Dependabot badge][dependabot]][dependabot-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts

[node]: https://img.shields.io/node/v/%40trigen/scripts.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/scripts
[dependabot-url]: https://dependabot.com/

CLI tool for running scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts
```

2. Install any plugin package

```bash
yarn add -D @trigen/scripts-preset-react-app
```

3. Add installed plugin to `.trigenscriptsrc`

```json
[
    "preset-react-app",
    "./some/other"
]
```

4. Now you can run some script

```bash
yarn exec -- trigen-scripts lint
```
