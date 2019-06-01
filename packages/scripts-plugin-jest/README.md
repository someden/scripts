# @trigen/scripts-plugin-jest

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
