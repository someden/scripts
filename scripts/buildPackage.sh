#!/bin/bash

rm -rf packages
cp -R src packages
NODE_ENV=production babel --root-mode upward ./packages -d ./packages -s inline
