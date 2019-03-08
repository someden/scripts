require('dotenv/config'); // OPENWEATHER_APPID
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const chalk = require('chalk');
const del = require('del');
// Constants
const PATCHES_PATH = path.join(__dirname, 'patches');
const WEATHER_PATH = path.join(__dirname, 'weather');
const PACKAGE_JSON_PATH = path.join(WEATHER_PATH, 'package.json');
const shouldLeave = process.argv.includes('--leave');

try {

	console.log(chalk.blue('\n> Cleaning...\n'));

	del.sync([WEATHER_PATH]);

	console.log(chalk.blue('\n> Cloning `weather`...\n'));

	execSync('git clone https://github.com/TrigenSoftware/weather.git', {
		stdio: 'inherit',
		cwd:   __dirname
	});

	console.log(chalk.blue('\n> Patching...\n'));

	const packageJson = require(PACKAGE_JSON_PATH); // eslint-disable-line

	packageJson.devDependencies['@trigen/scripts'] = '../../package';

	fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson));
	fs.unlinkSync(path.join(WEATHER_PATH, 'yarn.lock'));

	try {

		const currentVersion = execSync('git rev-parse --short HEAD', {
			encoding: 'utf8',
			cwd:      WEATHER_PATH
		}).trim();
		const currentVersionPatches = path.join(PATCHES_PATH, currentVersion);
		const patches = fs.readdirSync(currentVersionPatches);

		console.log(chalk.blue(`\n> Applying patches for ${currentVersion}...\n`));

		patches.forEach((patch) => {
			fs.copyFileSync(
				path.join(currentVersionPatches, patch),
				path.join(WEATHER_PATH, patch)
			);
		});

	} catch (err) {
		// ignore
	}

	console.log(chalk.blue('\n> Installing dependencies...\n'));

	execSync('yarn', {
		stdio: 'inherit',
		cwd:   WEATHER_PATH
	});

	console.log(chalk.blue('\n> Testing...\n'));

	execSync(`node ${path.join(__dirname, '..', 'package', 'index.js')} test`, {
		stdio: 'inherit',
		cwd:   WEATHER_PATH
	});

} catch (err) {
	throw err;
} finally {

	if (!shouldLeave) {
		console.log(chalk.blue('\n> Cleaning...\n'));
		del.sync([WEATHER_PATH]);
	}
}
