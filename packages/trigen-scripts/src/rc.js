import getRc from 'rcfile';

const defaults = {
	scripts:  [],
	features: []
};
const rc = {
	...defaults,
	...getRc('trigenscripts')
};

export default {
	...rc,
	features: rc.features.reduce((featuresMap, feature) => {
		featuresMap[feature] = true;
		return featuresMap;
	}, {})
};
