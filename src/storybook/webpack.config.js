import path from 'path';
import fs from 'fs';
import * as webpackConfig from '../configs/webpack';

module.exports = configureStorybook;

function configureStorybook({
	config: storybookBaseConfig
}) {

	const projectRoot = process.cwd();
	const pkg = JSON.parse(
		fs.readFileSync(
			path.join(projectRoot, 'package.json'),
			'utf8'
		)
	);

	process.env.PROJECT_NAME = pkg.name;
	process.env.PROJECT_HOMEPAGE = pkg.repository.url.replace(/(^git\+)|(\.git$)/g, '');
	process.env.PROJECT_SRC = path.join(projectRoot, 'src');

	const webpackDevConfig = webpackConfig.dev();

	storybookBaseConfig.resolve.extensions.push(
		...webpackDevConfig.resolve.extensions
	);
	Object.assign(
		storybookBaseConfig.resolve.alias,
		webpackDevConfig.resolve.alias
	);

	storybookBaseConfig.module.rules = [
		...storybookBaseConfig.module.rules.filter(
			_ => !/css|svg/.test(String(_.test))
		),
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
