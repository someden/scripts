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

## Available scripts

```bash
# Lint only typescript
yarn lint:ts
# Lint only scripts
yarn lint:scripts
# Lint all sources
yarn lint
# Run type checking
yarn typecheck
# Run lint
yarn test
# Generate docs for typescript sources
yarn build:docs
# Start given script
yarn start
# Build sources
yarn build
```
