import update from 'immutability-helper';
import {
	FILL_ME,
	getScriptArg,
	addItems
} from '@trigen/scripts/helpers';

const scripts = {
	'lint:ts':      {
		cmd:  'tslint',
		args: FILL_ME
	},
	'lint:scripts': ['lint:ts'],
	'lint':         ['lint:scripts'],
	'typecheck':    {
		cmd:  'tsc',
		args: ['--noEmit', '--pretty', '--skipLibCheck']
	},
	'test':         ['typecheck', 'lint'],
	'start':        {
		vars: { NODE_ENV: 'development' },
		cmd:  'ts-node-dev',
		args: FILL_ME
	},
	'build:docs':   [{
		cmd:          'typedoc',
		args:         FILL_ME,
		ignoreResult: true
	}, {
		cmd:  'touch',
		args: ['docs/.nojekyll']
	}],
	'build':        {
		vars: { NODE_ENV: 'production' },
		cmd:  'tsc',
		args: FILL_ME
	}
};

export default function getScripts(args, allScripts) {
	return update(allScripts, {
		'lint:ts':      {
			$set: update(scripts['lint:ts'], {
				args: {
					$push: [
						'-p', '.', '-t', 'stylish',
						...getScriptArg(args, 0, 'src/**/*.{ts,tsx}'),
						...args
					]
				}
			})
		},
		'lint:scripts': {
			$apply: _ => addItems(_, scripts['lint:scripts'])
		},
		'lint':         {
			$apply: _ => addItems(_, scripts.lint)
		},
		'typecheck':    {
			$set: update(scripts.typecheck, {
				args: {
					$push: args
				}
			})
		},
		'test':         {
			$apply: _ => addItems(_, scripts.test, true)
		},
		'start':        {
			$set: update(scripts.start, {
				args: {
					$push: [
						'-P', './tsconfig.dev.json',
						'-r', 'tsconfig-paths/register',
						'--respawn', '--transpileOnly',
						'--ignore-watch', 'node_modules',
						...getScriptArg(args, 0, 'src/index.ts'),
						...args
					]
				}
			})
		},
		'build:docs':   {
			$set: update(scripts['build:docs'], {
				0: {
					args: {
						$push: [
							'./src',
							...getScriptArg(args, '--out', './docs'),
							'--excludeExternals', '--mode', 'modules',
							...args
						]
					}
				}
			})
		},
		'build':        {
			$set: update(scripts.build, {
				args: {
					$push: [
						'--rootDir',
						...getScriptArg(args, 0, './src'),
						...getScriptArg(args, '--outDir', './lib'),
						...args
					]
				}
			})
		}
	});
}
