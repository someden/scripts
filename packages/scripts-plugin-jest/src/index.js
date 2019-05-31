import update from 'immutability-helper';
import {
	FILL_ME,
	getScriptArg,
	addItems
} from '@trigen/scripts/helpers';

const scripts = {
	'jest': {
		vars: { NODE_ENV: 'test' },
		cmd:  'jest',
		args: FILL_ME // ['-c', 'jest.config.json']
	},
	'test': ['jest']
};

export default function getScripts(args, allScripts) {
	return update(allScripts, {
		'jest': {
			$set: update(scripts.jest, {
				args: {
					$push: [
						...getScriptArg(args, '-c', 'jest.config.json'),
						...args
					]
				}
			})
		},
		'test': {
			$apply: _ => addItems(_, scripts.test)
		}
	});
}
