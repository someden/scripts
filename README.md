
# scripts

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

Scripts and configuration for TrigenSoftware's web projects.

## Available scripts

```bash
# Lint only styles
yarn lint:styles
# Lint only scripts
yarn lint:scripts
# Lint all sources
yarn lint
# Run tests with Jest
yarn jest
# Run lint, tests and build
yarn test
# Generate docs for TypeScript sources
yarn build:docs
# Start Storybook
yarn start:storybook
# Build standalone Storybook bundle
yarn build:storybook
# Start development server
yarn start
# Build our bundle for production
yarn build
# Serve files from `build` directory
yarn serve
```

## Environment variables

Optional variables:

```bash
PROXY_API_URI='' # valid URI; not set by default
DISABLE_BROWSER_SYNC=false # boolean; `false` by default
```

You can create `.env` in project root with this variables.
