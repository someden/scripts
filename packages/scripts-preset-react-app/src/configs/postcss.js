import autoprefixer from 'autoprefixer';
import momentum from 'postcss-momentum-scrolling';

export default function getPostcssConfig(browserslistEnv) {
	return [
		autoprefixer({
			env: browserslistEnv
		}),
		momentum([
			'scroll',
			'auto'
		])
	];
}
