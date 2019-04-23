# scripts

CLI tool for running scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-app
```

2. Add installed scripts to `.trigenscriptsrc`

```json
{
    "scripts": {
        "app",
        "./some/other"
    }
}
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts lint
```
