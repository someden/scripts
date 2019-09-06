import path from 'path';
import webpack from 'webpack';
import externals from 'webpack-node-externals';
import {
	CleanWebpackPlugin as CleanPlugin
} from 'clean-webpack-plugin';
import FilterWarningPlugins from 'webpack-filter-warnings-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import ScriptHtmlPlugin from 'script-ext-html-webpack-plugin';
import ExcludeHtmlPlugin from 'html-webpack-exclude-assets-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import update from 'immutability-helper';
import {
	decamelize
} from 'humps';
import findIndex from '../helpers/findIndex';
import applyReducers from '../helpers/applyReducers';
import addDevScripts from '../helpers/addDevScripts';
import getWebpackHook from '../helpers/getWebpackHook';
import htmlminConfig from '../configs/htmlmin';
import {
	excludeAssets
} from './common';
import * as stylableLoader from './stylableLoader';
import * as svgLoader from './svgLoader';
import * as swLoader from './swLoader';

const cwd = process.cwd();
const loaders = [
	stylableLoader,
	svgLoader,
	swLoader,
	getWebpackHook()
];
const baseLoaders = loaders.map(_ => _.base);
const devLoaders = loaders.map(_ => _.dev);
const buildLoaders = loaders.map(_ => _.build);
const renderLoaders = loaders.map(_ => _.render);
const ignoreWarnings = loaders.reduce((all, { ignoreWarnings }) => {

	if (ignoreWarnings) {
		return all.concat(ignoreWarnings);
	}

	return all;
}, [
	/**
	 * Ignore warnings about TypeScript interfaces.
	 */
	/export 'I[A-Z][^']+'(| \([^)]+\)) was not found in/,
	/**
	 * Ignore warnings about favicons coping.
	 */
	/unable to locate 'src\/(favicons|manifest)/
]);

function base({
	envify = {}
} = {}) {
	return applyReducers(baseLoaders, {
		entry:   {
			index: path.join(cwd, 'src/App/index.tsx')
		},
		output:  {
			path:             path.join(cwd, 'build'),
			filename:         '[name].js',
			chunkFilename:    '[name].js',
			hashDigestLength: 10,
			publicPath:       '/'
		},
		resolve: {
			extensions: [
				'.es.js',
				'.js',
				'.jsx',
				'.json',
				'.ts',
				'.tsx'
			],
			alias: {
				'~': path.join(cwd, 'src/App')
			}
		},
		module:  {
			rules: [{
				test:   /\.js$/,
				parser: {
					amd: false
				}
			}, /* {
				test:    /\.jsx?$/,
				exclude: /node_modules/,
				use:     [
					{
						loader: 'babel-loader'
					},
					{
						loader:  'eslint-loader',
						options: {
							emitError: true
						}
					}
				]
			}, */ {
				test:    /\.tsx?$/,
				exclude: /node_modules/,
				use:     [{
					loader:  'awesome-typescript-loader',
					options: {
						forceIsolatedModules: true,
						useTranspileModule:   true,
						useCache:             true,
						reportFiles:          [
							'src/**/*.{ts,tsx}',
							'!globals.d.ts'
						],
						useBabel:             true,
						babelCore:            '@babel/core'
					}
				}, {
					loader:  'tslint-loader',
					options: {
						emitErrors: true
					}
				}]
			}]
		},
		plugins: [
			new webpack.EnvironmentPlugin(Object.keys(process.env)),
			new webpack.DefinePlugin(
				Object.entries(envify).reduce((env, [key, value]) => ({
					...env,
					[`process.env.${decamelize(key).toUpperCase()}`]: JSON.stringify(value)
				}), {})
			),
			new FilterWarningPlugins({
				exclude: ignoreWarnings
			}),
			new CopyPlugin([
				{
					from:   'src/favicons',
					to:     'favicons',
					ignore: '!*.{ico,png}'
				},
				'src/manifest.json'
			], {
				logLevel: 'silent'
			})
		]
	});
}

export function dev(params) {

	const config = base(params);
	const devScripts = [
		'webpack-hot-middleware/client?http://localhost:3000/&reload=true'
	];

	return applyReducers(devLoaders, update(config, {
		entry:        { $apply: entry => addDevScripts(entry, devScripts) },
		mode:         { $set: 'development' },
		devtool:      { $set: 'inline-source-map' },
		optimization: { $set: {
			noEmitOnErrors: true
		} },
		plugins:      { $unshift: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlPlugin({
				template: 'src/index.html'
			})
		] }
	}));
}

export function build(params) {

	const config = base(params);
	const { rules } = config.module;

	return applyReducers(buildLoaders, update(config, {
		output:       {
			filename:      { $set: '[name].[chunkhash].js' },
			chunkFilename: { $set: '[name].[chunkhash].js' }
		},
		mode:         { $set: 'production' },
		module:  {
			rules: {
				// [findIndex('test', '/\\.jsx?$/', rules)]: {
				// 	use: {
				// 		1: {
				// 			options: {
				// 				failOnError: { $set: true }
				// 			}
				// 		}
				// 	}
				// },
				[findIndex('test', '/\\.tsx?$/', rules)]: {
					use: {
						1: {
							options: {
								failOnHint: { $set: true }
							}
						}
					}
				}
			}
		},
		optimization: { $set: {
			runtimeChunk: 'single',
			splitChunks:  {
				name:        true,
				cacheGroups: {
					default: {
						chunks:     'initial',
						minChunks:  2
					},
					vendor: {
						name:     'vendor',
						chunks:   'initial',
						priority: 10,
						enforce:  true,
						test(module) {

							if (module.resource && !/\.(j|t)sx?$/.test(module.resource)) {
								return false;
							}

							return module.context
								&& module.context.includes('node_modules')
								&& !module.context.includes('@flexis/ui/components'); // sad hack
						}
					}
				}
			}
		} },
		plugins:      { $unshift: [
			new CleanPlugin(),
			new webpack.HashedModuleIdsPlugin(),
			new HtmlPlugin({
				template: 'src/index.html',
				inject:   'head',
				minify:   htmlminConfig,
				excludeAssets
			}),
			new ScriptHtmlPlugin({
				defaultAttribute: 'async'
			}),
			new ExcludeHtmlPlugin()
		] }
	}));
}

export function render(params) {

	const config = base(params);
	const { rules } = config.module;

	return applyReducers(renderLoaders, update(config, {
		entry:        { $set: {
			index: path.join(cwd, 'src/App/render.tsx')
		} },
		output:       {
			path:          { $set: path.join(cwd, 'build', 'render') },
			libraryTarget: { $set: 'commonjs2' }
		},
		target:       { $set: 'node' },
		externals:    { $set: [externals({
			whitelist: [/^@flexis\/ui/]
		})] },
		mode:         { $set: 'production' },
		optimization: { $set: { minimize: false } },
		module:       {
			rules: {
				[findIndex('test', '/\\.tsx?$/', rules)]: {
					use: {
						1: {
							options: {
								failOnHint: { $set: true }
							}
						}
					}
				}
			}
		},
		plugins:      { $unshift: [
			new CleanPlugin(),
			new webpack.HashedModuleIdsPlugin()
		] }
	}));
}
