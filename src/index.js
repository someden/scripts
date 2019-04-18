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

function run(script, ignoreTitle) {

	const command = scripts[script] || script;

	if (!ignoreTitle
		&& typeof script === 'string'
		&& script !== exec
	) {
		console.log(
			chalk.blue(`\n> ${
				humanize(script)
			}\n`)
		);
	}

	if (Array.isArray(command)) {

		const onlyOneCommand = command.length <= 1;

		command.forEach(_ => run(_, onlyOneCommand));
		return;
	}

	if (typeof command === 'string') {
		run(scripts[script]);
		return;
	}

	const {
		vars = {},
		cmd,
		args,
		ignoreResult
	} = command;
	const status = spawn(vars, cmd, args, ignoreResult);

	if (status) {
		process.exit(status);
	}
}

if (exec) {
	run(exec);
} else {
	console.error('Unknown script.');
}
