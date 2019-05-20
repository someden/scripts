import {
	getScriptAndArgs,
	pushArgs
} from '../../../packages/scripts/src/helpers/args';

export const Features = [
	'feature1',
	'feature2',
	'feature3'
];

export const DefaultFeatures = [
	'feature2'
];

export default function getScripts(inputArgs, features) {

	const scripts = {
		'script1':  {
			cmd:  'execScript1',
			args: Object.keys(features)
		},
		'script2':  {
			vars: { NODE_ENV: 'test' },
			cmd:  'execScript2',
			args: ['--flag']
		},
		'script3':  {
			cmd:  'execScript3',
			args: []
		},
		'script12': ['script1', 'script2'],
		'scripts':  [{
			cmd:          'execScripts1',
			args:         [],
			ignoreResult: true
		}, {
			cmd:       'execScripts2',
			args:      ['-f'],
			immutable: true
		}]
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
