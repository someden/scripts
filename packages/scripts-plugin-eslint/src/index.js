import update from 'immutability-helper';
import {
	FILL_ME,
	getScriptArg,
	addItems
} from '@trigen/scripts/helpers';

const scripts = {
	'lint:js':      {
		cmd:  'eslint',
		args: FILL_ME
	},
	'lint:scripts': ['lint:js'],
	'lint':         ['lint:scripts'],
	'test':         ['lint']
};

export default function getScripts(args, allScripts) {
	return update(allScripts, {
		'lint:js':      {
			$set: update(scripts['lint:js'], {
				args: {
					$set: [
						'--cache',
						...getScriptArg(args, 0, 'src/**/*.{js,jsx}'),
						...args
					]
				}
			})
		},
		'lint:scripts': {
			$apply: _ => addItems(_, scripts['lint:scripts'])
		},
		'lint':         {
			$apply: _ => addItems(_, scripts.lint)
		},
		'test':         {
			$apply: _ => addItems(_, scripts.test)
		}
	});
}
