import path from 'path';
import update from 'immutability-helper';
import { config } from './rc';

const FILL_ME = [null/* FILL ME */];
const storybookConfigs = path.join(__dirname, 'storybook');
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
	'lint:scripts':    [
		config.features.eslint && 'lint:js',
		config.features.tslint && 'lint:ts'
	].filter(Boolean),
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

function getScriptAndArgs(inputArgs) {

	const scriptIndex = inputArgs.findIndex(_ => scriptsNames.includes(_));
	const script = inputArgs[scriptIndex] || null;
	const args = script ? inputArgs.slice(scriptIndex + 1) : [];

	return {
		script,
		args
	};
}

function getScriptArg(args, arg, value) {

	if (typeof arg === 'number') {

		if (arg >= args.length || args[arg][0] === '-') {
			return [value];
		}
	} else
	if (!args.includes(arg)) {
		return typeof value !== 'undefined'
			? [arg, value]
			: [arg];
	}

	return [];
}

function pushArgs(scripts, args) {

	if (typeof scripts === 'string') {
		return;
	}

	if (scripts.hasOwnProperty('args')) {

		if (!scripts.hasOwnProperty('immutable')) {
			scripts.args.push(...args);
		}

		return;
	}

	for (const script in scripts) {
		pushArgs(scripts[script], args);
	}
}

export default function getScripts(inputArgs) {

	const {
		script,
		args
	} = getScriptAndArgs(inputArgs);
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
