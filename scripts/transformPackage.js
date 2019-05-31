#!/usr/bin/env node
/* eslint-disable */
const fs = require('fs');

const pkgPath = process.argv[2];
const pkg = fs.readFileSync(pkgPath, 'utf8');
const transformed = pkg.replace(/file:\.\.\/(.+)"/g, 'file:../../$1/package"');

fs.writeFileSync(pkgPath, transformed);
