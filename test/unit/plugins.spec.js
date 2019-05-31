import fs from 'fs';
import path from 'path';

const packages = path.join(process.cwd(), 'packages');
const plugins = fs.readdirSync(packages).filter(
	_ => _ !== 'scripts' && _[0] != '.'
);

describe('@trigen/scripts-*', () => {

	plugins.forEach((_) => {

		it(`${_} should return correct scripts object`, () => {

			expect(
				// eslint-disable-next-line import/no-dynamic-require
				require(path.join(packages, _, 'src', 'index.js')).default([], {})
			).toMatchSnapshot();
		});
	});
});
