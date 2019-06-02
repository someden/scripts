import update from 'immutability-helper';
import {
	FILL_ME,
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
	return update(allScripts, {
		'test':         {
			$apply: _ => addScripts(_, scripts.test, allScripts)
		},
		'cleanPublish': {
			$set: update(scripts.cleanPublish, {
				1: {
					args: {
						$push: args
					}
				}
			})
		}
	});
}
