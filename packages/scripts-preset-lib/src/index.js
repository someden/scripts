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
		? null
		: args[0];
	const publishArgs = cd ? args.slice(1) : args;

	return update(allScripts, {
		'test':         {
			$apply: _ => addScripts(_, scripts.test, allScripts)
		},
		'cleanPublish': {
			$set: update(scripts.cleanPublish, {
				1: {
					args: {
						$push: publishArgs
					},
					$apply: _ => (
						!cd ? _ : update(_, {
							cwd: {
								$set: cd
							}
						})
					)
				}
			})
		}
	});
}
