# @trigen/scripts

CLI tool for running scripts.

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
