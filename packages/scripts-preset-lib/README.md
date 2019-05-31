# @trigen/scripts-preset-lib

Lib scripts preset.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-preset-lib
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "preset-lib",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts build
```

## Available scripts

```bash
# Run tests with Jest
yarn jest
# Check bundle size
yarn checkSize
# Run lint, tests and build
yarn test
# Start given script
yarn start
# Build soruces
yarn build
# Clean package publish
yarn cleanPublish
```
