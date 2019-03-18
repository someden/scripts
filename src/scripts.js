import path from 'path';
import update from 'immutability-helper';

const storybookConfigs = path.join(__dirname, 'storybook');
const scripts = {
	'lint:styles':     {
		cmd:  'stylelint',
		args: ['src/**/*.css']
	},
	'lint:scripts':    {
		cmd:  'tslint',
		args: ['-p', '.', '-t', 'stylish', 'src/**/*.{ts,tsx}']
	},
	'lint':            ['lint:styles', 'lint:scripts'],
	'typecheck':       {
		cmd:  'tsc',
		args: ['--noEmit', '--pretty', '--skipLibCheck']
	},
	'jest':            {
		env:  'test',
		cmd:  'jest',
		args: ['-c', 'jest.config.json']
	},
	'test':            ['typecheck', 'lint', 'jest', 'build'],
	'build:docs':      [{
		cmd:    'typedoc',
		args:   [null/* FILL ME */],
		noExit: true
	}, {
		cmd:  'tocuh',
		args: ['docs/.nojekyll']
	}],
	'start:storybook': {
		cmd:  'start-storybook',
		args: [null/* FILL ME */]
	},
	'build:storybook': {
		env:  'development',
		cmd:  'build-storybook',
		args: [null/* FILL ME */]
	},
	'start':           {
		env:  'development',
		cmd:  'node',
		args: [path.join(__dirname, 'start.js')]
	},
	'build':           {
		env:  'production',
		cmd:  'node',
		args: [path.join(__dirname, 'build.js')]
	},
	'serve':           {
		env:  'production',
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
		scripts.args.push(...args);
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
	const scriptsWithArgs = update(scripts, {
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
			args: {
				$set: [
					'--ci', '-p', '3001',
					...getScriptArg(args, '-c', storybookConfigs)
				]
			}
		},
		'build:storybook': {
			args: {
				$set: [
					...getScriptArg(args, '-c', storybookConfigs),
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
