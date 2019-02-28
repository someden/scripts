import path from 'path';
import fs from 'fs';
import * as webpackConfig from '../configs/webpack';

module.exports = configureStorybook;

function configureStorybook(storybookBaseConfig) {

	const webpackDevConfig = webpackConfig.dev();
	const projectRoot = process.cwd();
	const pkg = JSON.parse(
		fs.readFileSync(
			path.join(projectRoot, 'package.json'),
			'utf8'
		)
	);

	process.env.PROJECT_NAME = pkg.name.toUpperCase();
	process.env.PROJECT_HOMEPAGE = pkg.repository.url.replace(/(^git\+)|(\.git$)/g, '');
	process.env.PROJECT_SRC = path.join(projectRoot, 'src');

	storybookBaseConfig.resolve.extensions.push(
		...webpackDevConfig.resolve.extensions
	);
	Object.assign(
		storybookBaseConfig.resolve.alias,
		webpackDevConfig.resolve.alias
	);

	storybookBaseConfig.module.rules.push(
		...webpackDevConfig.module.rules
	);
	storybookBaseConfig.plugins.push(
		...webpackDevConfig.plugins.filter((plugin) => {

			switch (plugin.constructor.name) {

				case 'HtmlWebpackPlugin':
					return false;

				case 'HotModuleReplacementPlugin':
					return false;

				default:
					return true;
			}
		})
	);

	return storybookBaseConfig;
}
