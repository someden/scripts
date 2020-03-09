import 'dotenv/config';
import webpack from 'webpack';
import reporter from './helpers/reporter';
import * as webpackConfig from './webpack';

const webpackBuildCompiler = webpack(webpackConfig.dslBuild());

webpackBuildCompiler.run(reporter);
