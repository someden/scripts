import path from 'path';
import update from 'immutability-helper';
import {
	FILL_ME,
	getScriptArg,
	addItems
} from '@trigen/scripts/helpers/args';
import babel from '@trigen/scripts-plugin-babel';
import typescript from '@trigen/scripts-plugin-typescript';
import jest from '@trigen/scripts-plugin-jest';
import storybook from '@trigen/scripts-plugin-storybook';

const storybookConfigs = path.join(__dirname, 'configs', 'storybook');
const scripts = {
	'lint:styles': {
		cmd:  'stylelint',
		args: FILL_ME
	},
	'lint':        ['lint:styles'],
	'test':        ['build'],
	'start':       {
		vars: { NODE_ENV: 'development' },
		cmd:  'node',
		args: [path.join(__dirname, 'start.js')]
	},
	'build':       {
		vars: { NODE_ENV: 'production' },
		cmd:  'node',
		args: [path.join(__dirname, 'build.js')]
	},
	'serve':       {
		vars: { NODE_ENV: 'production' },
		cmd:  'node',
		args: [path.join(__dirname, 'serve.js')]
	}
};

export default function getScripts(args, inputAllScripts) {

	const storybookConfigsArgs = getScriptArg(args, '-c', storybookConfigs);
	const storybookAutoConfigure = Boolean(storybookConfigsArgs.length);
	let allScripts = inputAllScripts;

	allScripts = babel(args, allScripts);
	allScripts = typescript(args, allScripts);
	allScripts = jest(args, allScripts);
	allScripts = storybook([
		...getScriptArg(args, '-c', storybookConfigs),
		...args
	], allScripts);

	return update(allScripts, {
		'lint:styles':     {
			$set: update(scripts['lint:styles'], {
				args: {
					$push: [
						...getScriptArg(args, 0, 'src/**/*.css'),
						...args
					]
				}
			})
		},
		'lint':            {
			$apply: _ => addItems(_, scripts['lint:lint'], true)
		},
		'test':            {
			$apply: _ => addItems(_, scripts.test)
		},
		'start:storybook': {
			vars: {
				REACT_APP_STORYBOOK_AUTO_CONFIGURE: {
					$set: JSON.stringify(storybookAutoConfigure)
				}
			}
		},
		'build:storybook': {
			vars: {
				REACT_APP_STORYBOOK_AUTO_CONFIGURE: {
					$set: JSON.stringify(storybookAutoConfigure)
				}
			}
		},
		'start':     {
			$set: update(scripts.start, {
				args: {
					$push: args
				}
			})
		},
		'build':     {
			$set: update(scripts.build, {
				args: {
					$push: args
				}
			})
		},
		'serve':     {
			$set: update(scripts.serve, {
				args: {
					$push: args
				}
			})
		}
	});
}
