import {
	getScriptAndArgs,
	getScriptArg,
	pushArgs
} from '../../packages/scripts/src/helpers/args';

describe('@trigen/scripts', () => {

	describe('args', () => {

		describe('getScriptAndArgs', () => {

			const inputArgs = [
				'arg',
				'arg2',
				'scriptName',
				'scriptArg',
				'scriptArg2'
			];

			it('should return script and args', () => {

				const {
					script,
					args
				} = getScriptAndArgs(
					inputArgs,
					['scriptName']
				);

				expect(script).toBe('scriptName');
				expect(args).toEqual(inputArgs.slice(3));
			});

			it('shouldn\'t return script and args', () => {

				const {
					script,
					args
				} = getScriptAndArgs(
					inputArgs,
					['noName']
				);

				expect(script).toBe(null);
				expect(args).toEqual([]);
			});
		});

		describe('getScriptArg', () => {

			it('should return param', () => {

				expect(
					getScriptArg([], 0, 'test')
				).toEqual(
					['test']
				);

				expect(
					getScriptArg(['some', '--flag'], 1, 'test')
				).toEqual(
					['test']
				);
			});

			it('shouldn\'t return param', () => {

				expect(
					getScriptArg(['param'], 0, 'test')
				).toEqual(
					[]
				);

				expect(
					getScriptArg(['some', 'param'], 1, 'test')
				).toEqual(
					[]
				);
			});

			it('should return flag', () => {

				expect(
					getScriptArg([], '--flag', 'test')
				).toEqual(
					['--flag', 'test']
				);

				expect(
					getScriptArg(['some', 'flag'], '--flag')
				).toEqual(
					['--flag']
				);
			});

			it('shouldn\'t return flag', () => {

				expect(
					getScriptArg(['--flag'], '--flag', 'test')
				).toEqual(
					[]
				);
			});
		});

		describe('pushArgs', () => {

			it('should push args', () => {

				const scripts = {
					script1: {
						args: [0, 1, 2]
					},
					script2: [{
						args: [2, 3]
					}, {
						args:      [2, 3],
						immutable: true
					}]
				};

				pushArgs(scripts, [10, 12]);

				expect(
					scripts
				).toEqual({
					script1: {
						args: [0, 1, 2, 10, 12]
					},
					script2: [{
						args: [2, 3, 10, 12]
					}, {
						args:      [2, 3],
						immutable: true
					}]
				});
			});
		});
	});
});
