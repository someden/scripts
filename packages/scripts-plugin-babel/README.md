# @trigen/scripts-plugin-babel

Babel scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-babel
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-babel",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts start src/test.js
```
