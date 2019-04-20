
export const FILL_ME = [null/* FILL ME */];

export function getScriptAndArgs(inputArgs, scriptsNames) {

	const scriptIndex = inputArgs.findIndex(_ => scriptsNames.includes(_));
	const script = inputArgs[scriptIndex] || null;
	const args = script ? inputArgs.slice(scriptIndex + 1) : [];

	return {
		script,
		args
	};
}

export function getScriptArg(args, arg, value) {

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

export function pushArgs(scripts, args) {

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
