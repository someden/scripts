# @trigen/scripts-plugin-rollup

Jest scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-rollup
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-rollup",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts build
```

## Available scripts

```bash
# Build bundle
yarn build
```
