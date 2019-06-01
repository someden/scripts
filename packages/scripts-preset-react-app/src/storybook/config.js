import {
	configure
} from '@trigen/scripts-plugin-storybook/storybook/config';

export * from '@trigen/scripts-plugin-storybook/storybook/config';

if (process.env.REACT_APP_STORYBOOK_AUTO_CONFIGURE === 'true') {
	configure(module);
}
