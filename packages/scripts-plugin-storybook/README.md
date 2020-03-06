# @trigen/scripts-plugin-storybook

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Dependabot badge][dependabot]][dependabot-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-plugin-storybook.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-plugin-storybook

[node]: https://img.shields.io/node/v/%40trigen/scripts-plugin-storybook.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-plugin-storybook
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-plugin-storybook

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/scripts
[dependabot-url]: https://dependabot.com/

Storybook scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-storybook
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-storybook",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts start:storybook
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| storybookConfigs | `string` | - | Path to directory containing Storybook configs. |

## Available scripts

```bash
# Start Storybook
yarn start:storybook
# Build standalone Storybook bundle
yarn build:storybook
```
