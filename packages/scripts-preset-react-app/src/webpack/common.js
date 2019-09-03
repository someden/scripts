
export const excludeAssets = {
	constructor: RegExp,
	test(asset) {

		if (/index\..*\.css$/.test(asset)) {
			return false;
		}

		return /(\.css$)|(favicons\/)/.test(asset);
	}
};

export const filterAssets = [
	'*.css',
	'!index.*.css'
];
