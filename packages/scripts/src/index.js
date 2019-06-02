#!/usr/bin/env node
import chalk from 'chalk';
import spawn from './helpers/spawn';
import {
	getScriptAndArgs,
	getScripts
} from './scripts';

const [
	exec,
	args
] = getScriptAndArgs(process.argv);
const scripts = getScripts(args);

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

	if (!command) {
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

if (scripts[exec]) {
	run(exec);
} else {
	throw new Error(`Unknown script "${exec}"`);
}
