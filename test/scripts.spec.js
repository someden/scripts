require('dotenv/config'); // OPENWEATHER_APPID
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const chalk = require('chalk');
const del = require('del');
// Constants
const WEATHER_PATH = path.join(__dirname, 'weather');
const PACKAGE_JSON_PATH = path.join(WEATHER_PATH, 'package.json');

try {

	console.log(chalk.blue('\n> Cloning `weather`...\n'));

	execSync('git clone git@github.com:TrigenSoftware/weather.git', {
		stdio: 'inherit',
		cwd:   __dirname
	});

	console.log(chalk.blue('\n> Patching `package.json`...\n'));

	const packageJson = require(PACKAGE_JSON_PATH); // eslint-disable-line

	packageJson.devDependencies['@trigen/scripts'] = '../../';

	fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson));

	console.log(chalk.blue('\n> Installing dependencies...\n'));

	execSync('yarn', {
		stdio: 'inherit',
		cwd:   WEATHER_PATH
	});

	console.log(chalk.blue('\n> Testing...\n'));

	execSync(`node ${path.join(__dirname, '..', 'package', 'index')} test`, {
		stdio: 'inherit',
		cwd:   WEATHER_PATH
	});

} catch (err) {
	throw err;
} finally {
	del.sync([WEATHER_PATH]);
}
