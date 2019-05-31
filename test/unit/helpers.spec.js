import {
	getScriptArg,
	addItems
} from '../../packages/scripts/src/helpers';
import {
	external
} from '../../packages/scripts-plugin-rollup/src/helpers';

describe('@trigen/scripts', () => {

	describe('helpers', () => {

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

		describe('addItems', () => {

			it('should add to `undefined`', () => {

				expect(
					addItems(undefined, 'script')
				).toEqual(
					['script']
				);

				expect(
					addItems(undefined, ['script'])
				).toEqual(
					['script']
				);

				expect(
					addItems(undefined, ['script', 'script2'])
				).toEqual(
					['script', 'script2']
				);
			});

			it('should add to item', () => {

				expect(
					addItems('item', 'script')
				).toEqual(
					['item', 'script']
				);

				expect(
					addItems('item', ['script'])
				).toEqual(
					['item', 'script']
				);

				expect(
					addItems('item', ['script', 'script2'])
				).toEqual(
					['item', 'script', 'script2']
				);
			});

			it('should add to items', () => {

				expect(
					addItems(['item'], 'script')
				).toEqual(
					['item', 'script']
				);

				expect(
					addItems(['item'], ['script'])
				).toEqual(
					['item', 'script']
				);

				expect(
					addItems(['item'], ['script', 'script2'])
				).toEqual(
					['item', 'script', 'script2']
				);
			});

			it('should not add existing item', () => {

				expect(
					addItems(['item'], 'item')
				).toEqual(
					['item']
				);
			});

			it('should unshift', () => {

				expect(
					addItems('item', 'script', true)
				).toEqual(
					['script', 'item']
				);

				expect(
					addItems(['item'], ['script'], true)
				).toEqual(
					['script', 'item']
				);

				expect(
					addItems(['item'], ['script', 'script2'], true)
				).toEqual(
					['script2', 'script', 'item']
				);
			});
		});
	});
});

describe('@trigen/scripts-plugin-rollup', () => {

	describe('helpers', () => {

		describe('external', () => {

			it('should use dependencies', () => {

				const fn = external({
					dependencies: {
						react: 1
					}
				});

				expect(
					fn('react')
				).toBe(true);

				expect(
					fn('react/some')
				).toBe(true);

				expect(
					fn('preact/some')
				).toBe(false);
			});

			it('should use peerDependencies', () => {

				const fn = external({
					dependencies:     {
						react: 1
					},
					peerDependencies: {
						webpack: 2
					}
				});

				expect(
					fn('react')
				).toBe(true);

				expect(
					fn('webpack/some')
				).toBe(true);

				expect(
					fn('preact/some')
				).toBe(false);
			});

			it('should exclude internals', () => {

				const fn = external({
					dependencies:     {
						react: 1
					},
					peerDependencies: {
						webpack: 2
					}
				}, true);

				expect(
					fn('react')
				).toBe(true);

				expect(
					fn('webpack/some')
				).toBe(true);

				expect(
					fn('os')
				).toBe(true);

				expect(
					fn('fs')
				).toBe(true);

				expect(
					fn('preact/some')
				).toBe(false);
			});
		});
	});
});
