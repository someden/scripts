import fs from 'fs';
import path from 'path';
import getScripts from '../../packages/scripts/src/scripts';

const rcPath = path.join(__dirname, '.trigenscriptsrc');

function writeRC(scripts, features) {
	fs.writeFileSync(
		rcPath,
		JSON.stringify({
			scripts: scripts.map(_ => path.join(__dirname, 'mock-plugins', _)),
			features
		})
	);
}

function deleteRC() {
	fs.unlinkSync(rcPath);
}

describe('@trigen/scripts', () => {

	describe('getScripts', () => {

		describe('Plugin A', () => {

			it('should get scripts by rc file', () => {

				writeRC([
					'plugin-a.js'
				], [
					'feature1'
				]);

				let result = getScripts(
					['script', '-c', '.dir'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(result.exec).toBe(null);

				result = getScripts(
					['script1'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(
					result.scripts[result.exec]
				).toEqual({
					cmd:  'execScript1',
					args: [
						'feature1',
						'feature2'
					]
				});

				result = getScripts(
					['script2', '-c', '.dir'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(
					result.scripts[result.exec]
				).toEqual({
					vars: {
						NODE_ENV: 'test'
					},
					cmd:  'execScript2',
					args: [
						'--flag',
						'-c', '.dir'
					]
				});

				result = getScripts(
					['script3', '-c', '.dir'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(
					result.scripts[result.exec]
				).toEqual({
					cmd:  'execScript3',
					args: ['-c', '.dir']
				});

				result = getScripts(
					['script12'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(
					result.scripts[result.exec]
				).toEqual([
					'script1',
					'script2'
				]);

				result = getScripts(
					['scripts', '--arg'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(
					result.scripts[result.exec]
				).toEqual([{
					cmd:          'execScripts1',
					args:         ['--arg'],
					ignoreResult: true
				}, {
					cmd:       'execScripts2',
					args:      ['-f'],
					immutable: true
				}]);

				deleteRC();
			});

			it('should validate features', () => {

				writeRC([
					'plugin-a.js'
				], [
					'featurer'
				]);

				expect(() => {
					getScripts(
						['script', '-c', '.dir'],
						{
							cwd: path.join(__dirname, 'mock-plugins')
						}
					);
				}).toThrow('Unknown feature "featurer"');

				deleteRC();
			});
		});

		describe('Plugin B', () => {

			it('should get scripts by rc file', () => {

				writeRC([
					'plugin-b.js'
				], [
					'feature3'
				]);

				let result = getScripts(
					['script', '-c', '.dir'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(result.exec).toBe(null);

				result = getScripts(
					['script3', '-c', '.dir'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(
					result.scripts[result.exec]
				).toEqual({
					cmd:  'execScript3',
					args: [
						'feature3',
						'-c', '.dir'
					]
				});

				deleteRC();

				writeRC([
					'plugin-b.js'
				], []);

				result = getScripts(
					['script3'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(
					result.scripts[result.exec]
				).toEqual({
					cmd:  'execScript3',
					args: []
				});

				deleteRC();
			});

			it('should validate features', () => {

				writeRC([
					'plugin-b.js'
				], [
					'feature'
				]);

				expect(() => {
					getScripts(
						['script3', '-c', '.dir'],
						{
							cwd: path.join(__dirname, 'mock-plugins')
						}
					);
				}).toThrow('Unknown feature "feature"');

				deleteRC();
			});
		});

		describe('Plugins combination', () => {

			it('should validate features', () => {

				writeRC([
					'plugin-a.js',
					'plugin-b.js'
				], [
					'feature1'
				]);

				let result = getScripts(
					['script3', '-c', '.dir'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(
					result.scripts[result.exec]
				).toEqual({
					cmd:  'execScript3',
					args: [
						'feature1',
						'feature2',
						'-c', '.dir'
					]
				});

				deleteRC();

				writeRC([
					'plugin-b.js',
					'plugin-a.js'
				], [
					'feature1'
				]);

				result = getScripts(
					['script3', '-c', '.dir'],
					{
						cwd: path.join(__dirname, 'mock-plugins')
					}
				);

				expect(
					result.scripts[result.exec]
				).toEqual({
					cmd:  'execScript3',
					args: ['-c', '.dir']
				});

				deleteRC();
			});
		});
	});
});
