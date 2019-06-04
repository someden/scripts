import update from 'immutability-helper';
import {
	FILL_ME,
	getScriptArg,
	addScripts
} from '@trigen/scripts/helpers';

const scripts = {
	'test':         ['build'],
	'cleanPublish': [
		'test',
		{
			cmd:  'clean-publish',
			args: FILL_ME
		}
	]
};

export default function getScripts(args, allScripts) {

	const cd = getScriptArg(args, 0, './').length
		? []
		: [args[0]];
	const cpArgs = cd.length ? args.slice(1) : args;

	return update(allScripts, {
		'test':         {
			$apply: _ => addScripts(_, scripts.test, allScripts)
		},
		'cleanPublish': {
			$set: update(scripts.cleanPublish, {
				1: {
					args: {
						$push: cpArgs
					}
				},
				$apply: _ => (
					!cd.length ? _ : update(_, {
						$splice: [[
							1, 0, {
								cmd:  'cd',
								args: cd
							}
						]]
					})
				)
			})
		}
	});
}
