import configure from '@trigen/scripts-plugin-storybook/storybook/webpack.config';
import * as webpackConfig from '../webpack';

module.exports = configureStorybook;

function configureStorybook(input) {

	const storybookBaseConfig = configure(input);
	const webpackDevConfig = webpackConfig.dev();

	storybookBaseConfig.resolve.extensions.push(
		...webpackDevConfig.resolve.extensions
	);
	Object.assign(
		storybookBaseConfig.resolve.alias,
		webpackDevConfig.resolve.alias
	);

	storybookBaseConfig.module.rules = [
		...storybookBaseConfig.module.rules.filter((rule) => {

			const test = String(rule.test);

			switch (true) {

				case /svg/.test(test):
					return false;

				case /css/.test(test):
					rule.exclude = /\.st\.css$/;
					return true;

				default:
					return true;
			}
		}),
		...webpackDevConfig.module.rules
	];

	storybookBaseConfig.plugins.push(
		...webpackDevConfig.plugins.filter((plugin) => {

			switch (plugin.constructor.name) {

				case 'HtmlWebpackPlugin':
				case 'HotModuleReplacementPlugin':
				case 'WorkboxWebpackPlugin':
					return false;

				default:
					return true;
			}
		})
	);

	return storybookBaseConfig;
}
