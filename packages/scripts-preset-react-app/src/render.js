import 'dotenv/config';
import webpack from 'webpack';
import {
	reporter
} from './helpers';
import * as webpackConfig from './webpack';

const webpackBuildCompiler = webpack(webpackConfig.dslBuild());
const webpackRenderCompiler = webpack(webpackConfig.render());

webpackBuildCompiler.run((errors, stats) => {
	reporter(errors, stats);
	webpackRenderCompiler.run(reporter);
});
