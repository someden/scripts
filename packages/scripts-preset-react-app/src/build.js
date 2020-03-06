import 'dotenv/config';
import webpack from 'webpack';
import {
	getBrowserslistEnvList
} from 'bdsl-webpack-plugin';
import reporter from './helpers/reporter';
import * as webpackConfig from './webpack';

const transpile = {
	dependencies: [],
	extensions:   [],
	...JSON.parse(process.env.REACT_APP_TRANSPILE)
};
const webpackBuildConfigs = [
	...getBrowserslistEnvList(),
	undefined
].map((browserslistEnv, index) => webpackConfig.build({
	isFirstBuild: index === 0,
	transpile,
	browserslistEnv
}));
const webpackBuildCompiler = webpack(webpackBuildConfigs);

webpackBuildCompiler.run(reporter);
