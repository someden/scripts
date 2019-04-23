import getRc from 'rcfile';

const defaults = {
	scripts:  [],
	features: []
};

export default {
	...defaults,
	...getRc('trigenscripts')
};

export function getFeaturesMap(features) {
	return features.reduce((featuresMap, feature) => {
		featuresMap[feature] = true;
		return featuresMap;
	}, {});
}
