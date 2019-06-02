import update from 'immutability-helper';
import {
	addScripts,
	saveScripts
} from '@trigen/scripts/helpers';
import babel from '@trigen/scripts-plugin-babel';
import jest from '@trigen/scripts-plugin-jest';
import rollup from '@trigen/scripts-plugin-rollup';

const scripts = {
	'test': ['build']
};

export default function getScripts(args, inputAllScripts) {

	let allScripts = inputAllScripts;

	allScripts = saveScripts(['start'], babel(args, allScripts), allScripts);
	allScripts = jest(args, allScripts);
	allScripts = rollup(args, allScripts);

	return update(allScripts, {
		'test':         {
			$apply: _ => addScripts(_, scripts.test)
		}
	});
}
