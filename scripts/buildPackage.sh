#!/bin/bash

rm -rf package
mkdir package
cp -R src/ package/
NODE_ENV=production babel ./package -d ./package -s inline
cp LICENSE package
cp package.json package
# cp README.md package
