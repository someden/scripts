import update from 'immutability-helper';
import {
	addItems
} from '@trigen/scripts/helpers/args';
import babel from '@trigen/scripts-plugin-babel';
import jest from '@trigen/scripts-plugin-jest';
import rollup from '@trigen/scripts-plugin-rollup';

const scripts = {
	'test': ['build']
};

export default function getScripts(args, inputAllScripts) {

	let allScripts = inputAllScripts;

	allScripts = babel(args, allScripts);
	allScripts = jest(args, allScripts);
	allScripts = rollup(args, allScripts);

	return update(allScripts, {
		'test':         {
			$apply: _ => addItems(_, scripts.test)
		}
	});
}
