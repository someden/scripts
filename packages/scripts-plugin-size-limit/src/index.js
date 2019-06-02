import update from 'immutability-helper';
import {
	FILL_ME,
	addItems
} from '@trigen/scripts/helpers';

const scripts = {
	'test':      ['checkSize'],
	'checkSize': {
		cmd:  'size-limit',
		args: FILL_ME
	}
};

export default function getScripts(args, allScripts) {
	return update(allScripts, {
		'test':      {
			$apply: _ => addItems(_, scripts.test)
		},
		'checkSize': {
			$set: update(scripts.checkSize, {
				args: {
					$push: args
				}
			})
		}
	});
}
