#!/bin/bash

set -e

rm -rf package
cp -R src package
NODE_ENV=production babel --root-mode upward ./package -d ./package -s inline
cp README.md package/
cp package.json package/
../../scripts/transformPackage.js package/package.json
cp ../../LICENSE package/
