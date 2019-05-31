# @trigen/scripts-preset-react-app

React App scripts preset.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-preset-react-app
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "preset-react-app",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts start
```

## Available scripts

```bash
# Lint only styles
yarn lint:styles
# Lint only scripts
yarn lint:scripts
# Lint all sources
yarn lint
# Run tests with Jest
yarn jest
# Run type checking
yarn typecheck
# Run lint, tests and build
yarn test
# Generate docs for typescript sources
yarn build:docs
# Start Storybook
yarn start:storybook
# Build standalone Storybook bundle
yarn build:storybook
# Start development server
yarn start
# Build app
yarn build
# Serve files from `build` directory
yarn serve
```

## Environment variables

Optional variables:

```bash
PROXY_API_URI='' # valid URI; not set by default
DISABLE_BROWSER_SYNC=false # boolean; `false` by default
```

You can create `.env` in project root with this variables.
