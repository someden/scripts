import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import {
	imageSnapshot
} from '@storybook/addon-storyshots-puppeteer';

function customizePage(page) {
	return page.setViewport({
		width:  1280,
		height: 720
	});
}

function getMatchOptions(options = {}) {
	return ({
		context: {
			kind,
			story
		}
	}) => ({
		...options,
		customSnapshotIdentifier: `${kind}__${story.replace(/ /g, '-')}`
	});
}

export default function init(options = {}, srcDir, buildDir) {

	process.env.PROJECT_SRC = srcDir || path.join(process.cwd(), 'src');

	initStoryshots({
		suite: 'Storyshots',
		test:  imageSnapshot({
			storybookUrl: buildDir
				? path.join('file://', buildDir)
				: path.join('file://', process.cwd(), 'storybook-build'),
			getMatchOptions: getMatchOptions(options),
			customizePage
		})
	});
}
