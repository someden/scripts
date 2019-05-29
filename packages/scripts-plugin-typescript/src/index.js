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
		cmd:  'ts-node',
		args: FILL_ME
	},
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
					$set: [
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
		'start': {
			$set: update(scripts.start, {
				args: {
					$set: [
						'-P', './tsconfig.dev.json',
						...getScriptArg(args, 0, 'src/index.ts'),
						...args
					]
				}
			})
		},
		'build': {
			$set: update(scripts.build, {
				args: {
					$set: [
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
