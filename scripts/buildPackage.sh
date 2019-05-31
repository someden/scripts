#!/bin/bash

rm -rf package
cp -R src package
NODE_ENV=production babel --root-mode upward ./package -d ./package -s inline
cp README.md package/
cp package.json package/
sed -i '' -E 's/file:..\/(.+)"/file:..\/..\/\1\/package"/g' package/package.json
cp ../../LICENSE package/
