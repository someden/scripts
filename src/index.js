#!/usr/bin/env node
import path from 'path';
import chalk from 'chalk';
import {
	spawn,
	getScriptAndArgs
} from './helpers/spawn';

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
		args:   ['./src', '--out', './docs', '--excludeExternals', '--mode', 'modules'],
		noExit: true
	}, {
		cmd:  'tocuh',
		args: ['docs/.nojekyll']
	}],
	'start:storybook': {
		cmd:  'start-storybook',
		args: ['--ci', '-p', '3001', '-c', storybookConfigs]
	},
	'build:storybook': {
		env:  'development',
		cmd:  'build-storybook',
		args: ['-c', storybookConfigs, '-o', 'storybook-build']
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
const {
	script,
	args: scriptArgs
} = getScriptAndArgs(
	Object.keys(scripts),
	process.argv
);

function humanize(script) {
	return script
		.replace(/:/g, ' ')
		.replace(/([A-Z])/, ' $1')
		.toLowerCase()
		.replace(script[0].toLowerCase(), script[0].toUpperCase());
}

function run(script) {

	const command = scripts[script] || script;

	if (Array.isArray(command)) {
		command.forEach(run);
		return;
	}

	if (typeof command === 'string') {
		run(scripts[script]);
		return;
	}

	if (typeof script === 'string') {
		console.log(
			chalk.blue(`\n> ${
				humanize(script)
			}\n`)
		);
	}

	const {
		env,
		cmd,
		args,
		noExit
	} = command;
	const status = spawn(env, cmd, [
		...args,
		...scriptArgs
	]);

	if (status && !noExit) {
		process.exit(status);
	}
}

if (script) {
	run(script);
} else {
	console.error('Unknown script.');
}
