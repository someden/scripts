import path from 'path';
import update from 'immutability-helper';
import {
	FILL_ME,
	getScriptAndArgs,
	getScriptArg,
	pushArgs
} from '@trigen/scripts/helpers/args';

export const Features = [
	'eslint',
	'tslint'
];

export const DefaultFeatures = [
	'tslint'
];

const storybookConfigs = path.join(__dirname, 'configs', 'storybook');
const scripts = {
	'lint:styles':     {
		cmd:  'stylelint',
		args: FILL_ME
	},
	'lint:js':    {
		cmd:  'eslint',
		args: FILL_ME
	},
	'lint:ts':    {
		cmd:  'tslint',
		args: FILL_ME
	},
	'lint:scripts':    FILL_ME,
	'lint':            ['lint:styles', 'lint:scripts'],
	'typecheck':       {
		cmd:  'tsc',
		args: ['--noEmit', '--pretty', '--skipLibCheck']
	},
	'jest':            {
		vars: { NODE_ENV: 'test' },
		cmd:  'jest',
		args: ['-c', 'jest.config.json']
	},
	'test':            ['typecheck', 'lint', 'jest', 'build'],
	'build:docs':      [{
		cmd:          'typedoc',
		args:         FILL_ME,
		ignoreResult: true
	}, {
		cmd:       'touch',
		args:      ['docs/.nojekyll'],
		immutable: true
	}],
	'start:storybook': {
		vars: {},
		cmd:  'start-storybook',
		args: FILL_ME
	},
	'build:storybook': {
		vars: { NODE_ENV: 'development' },
		cmd:  'build-storybook',
		args: FILL_ME
	},
	'start':           {
		vars: { NODE_ENV: 'development' },
		cmd:  'node',
		args: [path.join(__dirname, 'start.js')]
	},
	'build':           {
		vars: { NODE_ENV: 'production' },
		cmd:  'node',
		args: [path.join(__dirname, 'build.js')]
	},
	'serve':           {
		vars: { NODE_ENV: 'production' },
		cmd:  'node',
		args: [path.join(__dirname, 'serve.js')]
	}
};
const scriptsNames = Object.keys(scripts);

export default function getScripts(inputArgs, features) {

	const {
		script,
		args
	} = getScriptAndArgs(inputArgs, scriptsNames);
	const storybookConfigsArgs = getScriptArg(args, '-c', storybookConfigs);
	const withCustomSotrybookConfigs = !storybookConfigsArgs.length;
	const scriptsWithArgs = update(scripts, {
		'lint:styles':     {
			args: {
				$set: getScriptArg(args, 0, 'src/**/*.css')
			}
		},
		'lint:js':         {
			args: {
				$set: [
					'--cache',
					...getScriptArg(args, 0, 'src/**/*.{js,jsx}')
				]
			}
		},
		'lint:ts':         {
			args: {
				$set: [
					'-p', '.', '-t', 'stylish',
					...getScriptArg(args, 0, 'src/**/*.{ts,tsx}')
				]
			}
		},
		'lint:scripts':    {
			$set: [
				features.eslint && 'lint:js',
				features.tslint && 'lint:ts'
			].filter(Boolean)
		},
		'build:docs':      {
			0: {
				args: {
					$set: [
						'./src',
						...getScriptArg(args, '--out', './docs'),
						'--excludeExternals', '--mode', 'modules'
					]
				}
			}
		},
		'start:storybook': {
			vars: {
				CUSTOM_CONFIGS: {
					$set: JSON.stringify(withCustomSotrybookConfigs)
				}
			},
			args: {
				$set: [
					'--ci', '-p', '3001',
					...storybookConfigsArgs
				]
			}
		},
		'build:storybook': {
			vars: {
				CUSTOM_CONFIGS: {
					$set: JSON.stringify(withCustomSotrybookConfigs)
				}
			},
			args: {
				$set: [
					...storybookConfigsArgs,
					'-o', 'storybook-build'
				]
			}
		}
	});

	pushArgs(scriptsWithArgs, args);

	return {
		scripts: scriptsWithArgs,
		exec:    script
	};
}
