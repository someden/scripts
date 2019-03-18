#!/usr/bin/env node
import chalk from 'chalk';
import spawn from './helpers/spawn';
import getScripts from './scripts';

const {
	exec,
	scripts
} = getScripts(process.argv);

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
	const status = spawn(env, cmd, args);

	if (status && !noExit) {
		process.exit(status);
	}
}

if (exec) {
	run(exec);
} else {
	console.error('Unknown script.');
}
