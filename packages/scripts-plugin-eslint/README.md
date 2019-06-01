# @trigen/scripts-plugin-eslint

ESLint scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-eslint
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-eslint",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts lint:js
```

## Available scripts

```bash
# Lint only javascript
yarn lint:js
# Lint only scripts
yarn lint:scripts
# Lint all sources
yarn lint
# Run lint
yarn test
```
