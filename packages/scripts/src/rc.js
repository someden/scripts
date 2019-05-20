import getRc from 'rcfile';

export function getConfigFromRC(options) {
	return {
		scripts:  [],
		features: [],
		...getRc('trigenscripts', options)
	};
}

export function getFeaturesMap(features) {
	return features.reduce((featuresMap, feature) => {
		featuresMap[feature] = true;
		return featuresMap;
	}, {});
}
