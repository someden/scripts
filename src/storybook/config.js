import React from 'react';
import {
	configure,
	addParameters,
	addDecorator
} from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
// import { withOptions } from '@storybook/addon-options';
import { withA11y } from '@storybook/addon-a11y';
import stylesheet from '@flexis/ui/reboot.st.css';

addParameters({
	options: {
		brandTitle:     process.env.PROJECT_NAME,
		brandUrl:       process.env.PROJECT_HOMEPAGE,
		panelPosition: 'right'
	}
});

addDecorator(story => (
	<div
		{...stylesheet('root')}
		style={{ padding: '12px' }}
	>
		{story()}
	</div>
));
addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(withA11y);

const stories = require.context(
	process.env.PROJECT_SRC,
	true,
	/\.stories\.tsx$/
);

function loadStories() {
	stories.keys().forEach(filename =>
		stories(filename)
	);
}

configure(loadStories, module);
