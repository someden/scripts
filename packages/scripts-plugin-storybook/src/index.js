import path from 'path';
import update from 'immutability-helper';
import {
	FILL_ME,
	getScriptArg
} from '@trigen/scripts/helpers';

const storybookConfigs = path.join(__dirname, 'storybook');
const scripts = {
	'start:storybook': {
		vars: {},
		cmd:  'start-storybook',
		args: FILL_ME
	},
	'build:storybook': {
		vars: { NODE_ENV: 'development' },
		cmd:  'build-storybook',
		args: FILL_ME
	}
};

export default function getScripts(args, allScripts) {

	const storybookConfigsArgs = getScriptArg(args, '-c', storybookConfigs);
	const storybookAutoConfigure = Boolean(storybookConfigsArgs.length);

	return update(allScripts, {
		'start:storybook': {
			$set: update(scripts['start:storybook'], {
				vars: {
					STORYBOOK_AUTO_CONFIGURE: {
						$set: JSON.stringify(storybookAutoConfigure)
					}
				},
				args: {
					$push: [
						'--ci', '-p', '3001',
						...storybookConfigsArgs
					]
				}
			})
		},
		'build:storybook': {
			$set: update(scripts['build:storybook'], {
				vars: {
					STORYBOOK_AUTO_CONFIGURE: {
						$set: JSON.stringify(storybookAutoConfigure)
					}
				},
				args: {
					$set: [
						...storybookConfigsArgs,
						'-o', 'storybook-build'
					]
				}
			})
		}
	});
}
