# @trigen/scripts-plugin-storybook

Storybook scripts.

## Usage

1. Install scripts package

```bash
yarn add -D @trigen/scripts-plugin-storybook
```

2. Add installed scripts to `.trigenscriptsrc`

```json
[
    "plugin-storybook",
    "./some/other"
]
```

3. Now you can run some script

```bash
yarn exec -- trigen-scripts start:storybook
```

## Available scripts

```bash
# Start Storybook
yarn start:storybook
# Build standalone Storybook bundle
yarn build:storybook
```
