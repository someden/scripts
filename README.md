# @trigen/scripts

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependency status][deps]][deps-url]
[![Build status][build]][build-url]
[![Greenkeeper badge][greenkeeper]][greenkeeper-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts

[node]: https://img.shields.io/node/v/%40trigen/scripts.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg
[deps-url]: https://david-dm.org/TrigenSoftware/scripts

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[greenkeeper]: https://badges.greenkeeper.io/TrigenSoftware/scripts.svg
[greenkeeper-url]: https://greenkeeper.io/

Scripts and configuration for TrigenSoftware's projects.

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

## Available plugins and presets

- [plugin-eslint](https://github.com/TrigenSoftware/scripts/tree/master/packages/scripts-plugin-eslint#readme)
- [plugin-babel](https://github.com/TrigenSoftware/scripts/tree/master/packages/scripts-plugin-babel#readme)
- [plugin-typescript](https://github.com/TrigenSoftware/scripts/tree/master/packages/scripts-plugin-typescript#readme)
- [plugin-jest](https://github.com/TrigenSoftware/scripts/tree/master/packages/scripts-plugin-jest#readme)
- [plugin-rollup](https://github.com/TrigenSoftware/scripts/tree/master/packages/scripts-plugin-rollup#readme)
- [plugin-storybook](https://github.com/TrigenSoftware/scripts/tree/master/packages/scripts-plugin-storybook#readme)
- [preset-lib](https://github.com/TrigenSoftware/scripts/tree/master/packages/scripts-preset-lib#readme)
- [preset-node-app](https://github.com/TrigenSoftware/scripts/tree/master/packages/scripts-preset-node-app#readme)
- [preset-react-app](https://github.com/TrigenSoftware/scripts/tree/master/packages/scripts-preset-react-app#readme)
