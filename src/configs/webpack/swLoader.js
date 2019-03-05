import path from 'path';
import update from 'immutability-helper';
import WorkboxPlugin from '@flexis/workbox-webpack-plugin';
import findIndex from '../../helpers/findIndex';

const swTest = /(\/|\.)sw\.js$/;
const cwd = process.cwd();

export function base(config) {
	return update(config, {
		module: {
			rules: { $push: [{
				test:    swTest,
				exclude: /node_modules/,
				loader:  'service-worker-loader',
				options: {
					filename:   '[path][name].js',
					outputPath: path.join(cwd, 'build')
				}
			}] }
		},
		plugins: { $push: [
			new WorkboxPlugin(swTest)
		] }
	});
}

export function dev(config) {
	return config;
}

export function build(config) {
	return update(config, {
		module: {
			rules: {
				[findIndex('loader', 'service-worker-loader', config.module.rules)]: {
					options: {
						filename: { $set: '[name].[chunkhash].js' }
					}
				}
			}
		}
	});
}
