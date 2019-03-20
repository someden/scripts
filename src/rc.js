import rc from 'rcfile';

export const Features = {
	ESLint: 'eslint',
	TSLint: 'tslint'
};

export const defaults = {
	scripts:  [],
	features: [
		Features.TSLint
	]
};

const sourceConfig = {
	...defaults,
	...rc('trigenscripts')
};

export const config = {
	...sourceConfig,
	features: Object.values(Features).reduce((featuresMap, feature) => {
		featuresMap[feature] = sourceConfig.features.includes(feature);
		return featuresMap;
	}, {})
};
