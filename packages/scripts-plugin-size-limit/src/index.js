import update from 'immutability-helper';
import {
	FILL_ME
} from '@trigen/scripts/helpers';

const scripts = {
	'checkSize': {
		cmd:  'size-limit',
		args: FILL_ME
	}
};

export default function getScripts(args, allScripts) {
	return update(allScripts, {
		'checkSize': {
			$set: update(scripts.checkSize, {
				args: {
					$push: args
				}
			})
		}
	});
}
