# @trigen/scripts-plugin-typescript

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependency status][deps]][deps-url]
[![Build status][build]][build-url]
[![Greenkeeper badge][greenkeeper]][greenkeeper-url]

[npm]: https://img.shields.io/npm/v/%40trigen/scripts-plugin-typescript.svg
[npm-url]: https://www.npmjs.com/package/@trigen/scripts-plugin-typescript

[node]: https://img.shields.io/node/v/%40trigen/scripts-plugin-typescript.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/scripts.svg?path=packages/scripts-plugin-typescript
[deps-url]: https://david-dm.org/TrigenSoftware/scripts?path=packages/scripts-plugin-typescript

[build]: http://img.shields.io/travis/com/TrigenSoftware/scripts.svg
[build-url]: https://travis-ci.com/TrigenSoftware/scripts

[greenkeeper]: https://badges.greenkeeper.io/TrigenSoftware/scripts.svg
[greenkeeper-url]: https://greenkeeper.io/

TypeScript scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-typescript
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-typescript",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts start src/test.ts
```

## Available scripts

```bash
# Lint only typescript
yarn lint:ts
# Lint only scripts
yarn lint:scripts
# Lint all sources
yarn lint
# Run type checking
yarn typecheck
# Run lint
yarn test
# Generate docs for typescript sources
yarn build:docs
# Start given script
yarn start
# Build sources
yarn build
```
