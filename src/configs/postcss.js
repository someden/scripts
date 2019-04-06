import autoprefixer from 'autoprefixer';
import momentum from 'postcss-momentum-scrolling';

export default [
	autoprefixer(),
	momentum([
		'scroll',
		'auto'
	])
];
