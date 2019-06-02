import update from 'immutability-helper';
import {
	FILL_ME,
	addItems,
	saveScripts
} from '@trigen/scripts/helpers';
import babel from '@trigen/scripts-plugin-babel';

const scripts = {
	'checkSize':    {
		cmd:  'size-limit',
		args: FILL_ME
	},
	'test':         ['build', 'checkSize'],
	'cleanPublish': [
		'test',
		{
			cmd:  'clean-publish',
			args: FILL_ME
		}
	]
};

export default function getScripts(args, inputAllScripts) {

	let allScripts = inputAllScripts;

	allScripts = saveScripts(['start', 'build'], babel(args, allScripts), allScripts);

	return update(allScripts, {
		'checkSize':    {
			$set: update(scripts.checkSize, {
				args: {
					$push: args
				}
			})
		},
		'test':         {
			$apply: _ => addItems(_, scripts.test)
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
