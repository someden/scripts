# @trigen/scripts-plugin-typescript

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
