import 'dotenv/config';
import webpack from 'webpack';
import reporter from './helpers/reporter';
import * as webpackConfig from './webpack';

const webpackBuildCompiler = webpack(webpackConfig.build());
const webpackRenderCompiler = webpack(webpackConfig.render());

webpackBuildCompiler.run((errors, stats) => {
	reporter(errors, stats);
	webpackRenderCompiler.run(reporter);
});
