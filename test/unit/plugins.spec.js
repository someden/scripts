import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const packages = path.join(cwd, 'packages');
const plugins = fs.readdirSync(packages).filter(
	_ => _ !== 'scripts' && _[0] != '.'
);

describe('@trigen/scripts-*', () => {

	plugins.forEach((_) => {

		it(`${_} should return correct scripts object`, () => {

			// eslint-disable-next-line import/no-dynamic-require
			const scripts = require(path.join(packages, _, 'src', 'index.js')).default([], {});
			let scriptsSnapshot = JSON.stringify(scripts, null, '\t');

			while (scriptsSnapshot.includes(cwd)) {
				scriptsSnapshot = scriptsSnapshot.replace(cwd, '');
			}

			expect(scriptsSnapshot).toMatchSnapshot();
		});
	});
});
