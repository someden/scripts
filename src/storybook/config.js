import React from 'react';
import {
	configure,
	addParameters,
	addDecorator
} from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

addParameters({
	options: {
		brandTitle:     process.env.PROJECT_NAME,
		brandUrl:       process.env.PROJECT_HOMEPAGE,
		panelPosition: 'right'
	}
});

addDecorator(story => (
	<div style={{ padding: '12px' }}>
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
