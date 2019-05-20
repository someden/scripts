import {
	getScriptAndArgs,
	pushArgs
} from '../../../packages/scripts/src/helpers/args';

export const Features = [
	'feature3'
];

export const DefaultFeatures = [];

export default function getScripts(inputArgs, features) {

	const scripts = {
		'script3':  {
			cmd:  'execScript3',
			args: Object.keys(features)
		}
	};
	const scriptsNames = Object.keys(scripts);
	const {
		script,
		args
	} = getScriptAndArgs(inputArgs, scriptsNames);

	pushArgs(scripts, args);

	return {
		scripts,
		exec: script
	};
}
