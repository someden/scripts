# @trigen/scripts-preset-node-app

Node app scripts preset.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-preset-node-app
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "preset-node-app",
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
# Run lint, tests and build
yarn test
# Start given script
yarn start
# Build soruces
yarn build
```
