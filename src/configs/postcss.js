import autoprefixer from 'autoprefixer';
import momentum from 'postcss-momentum-scrolling';

export default function postcss() {
	return {
		plugins: [
			autoprefixer(),
			momentum([
				'scroll',
				'auto'
			])
		]
	};
}
