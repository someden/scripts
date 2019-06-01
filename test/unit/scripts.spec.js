import fs from 'fs';
import path from 'path';
import {
	getScripts
} from '../../packages/scripts/src/scripts';

const rcPath = path.join(__dirname, '.trigenscriptsrc');
const cwd = process.cwd();

function writeRC(scripts) {
	fs.writeFileSync(
		rcPath,
		JSON.stringify(
			scripts.map(_ =>
				path.join(cwd, 'packages', `scripts-${_}`, 'src', 'index.js')
			)
		)
	);
}

function deleteRC() {
	fs.unlinkSync(rcPath);
}

describe('@trigen/scripts', () => {

	afterAll(deleteRC);

	describe('getScripts', () => {

		it('should get scripts by rc file', () => {

			writeRC([
				'plugin-eslint'
			]);

			const result = getScripts(
				[],
				{ cwd: __dirname }
			);

			expect(result).toEqual({
				'lint:js':      {
					cmd:  'eslint',
					args: ['--cache', 'src/**/*.{js,jsx}']
				},
				'lint:scripts': ['lint:js'],
				'lint':         ['lint:scripts'],
				'test':         ['lint']
			});
		});

		it('should pass args', () => {

			let result = getScripts(
				['packages/*/src/**/*.js'],
				{ cwd: __dirname }
			);

			expect(result).toEqual({
				'lint:js':      {
					cmd:  'eslint',
					args: ['--cache', 'packages/*/src/**/*.js']
				},
				'lint:scripts': ['lint:js'],
				'lint':         ['lint:scripts'],
				'test':         ['lint']
			});

			result = getScripts(
				['-v'],
				{ cwd: __dirname }
			);

			expect(result).toEqual({
				'lint:js':      {
					cmd:  'eslint',
					args: ['--cache', 'src/**/*.{js,jsx}', '-v']
				},
				'lint:scripts': ['lint:js'],
				'lint':         ['lint:scripts'],
				'test':         ['lint']
			});
		});

		it('should combine plugins', () => {

			writeRC([
				'plugin-eslint',
				'plugin-typescript'
			]);

			const result = getScripts(
				[],
				{ cwd: __dirname }
			);

			expect(result['lint:scripts']).toEqual(
				['lint:js', 'lint:ts']
			);

			expect(result.lint).toEqual(
				['lint:scripts']
			);

			expect(result.test).toEqual(
				['typecheck', 'lint']
			);
		});

		it('should combine plugins and preset', () => {

			writeRC([
				'plugin-typescript',
				'plugin-rollup',
				'preset-lib'
			]);

			const result = getScripts(
				[],
				{ cwd: __dirname }
			);

			expect(result['lint:scripts']).toEqual(
				['lint:ts']
			);

			expect(result.lint).toEqual(
				['lint:scripts']
			);

			expect(result.test).toEqual(
				['typecheck', 'lint', 'jest', 'build', 'checkSize']
			);
		});
	});
});
