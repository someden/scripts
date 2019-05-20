import getPlugins from './helpers/plugins';
import {
	getConfigFromRC,
	getFeaturesMap
} from './rc';

const PREFIX = `@trigen/scripts-`;

export default function getScripts(inputArgs, options) {

	const allFeatures = [];
	const {
		scripts:  rcScripts,
		features: rcFeatures
	} = getConfigFromRC(options);
	const features = getFeaturesMap(rcFeatures);
	const plugins = getPlugins(rcScripts, PREFIX);
	const scripts = plugins.reduce((scripts, plugin) => {

		const {
			Features:        pluginFeatures,
			DefaultFeatures: pluginDefaultFeatures,
			default:         pluginGetScripts
		} = plugin;

		allFeatures.push(...pluginFeatures);
		Object.assign(features, getFeaturesMap(pluginDefaultFeatures));

		const pluginScripts = pluginGetScripts(inputArgs, features);

		Object.assign(scripts.scripts, pluginScripts.scripts);

		if (pluginScripts.exec) {
			scripts.exec = pluginScripts.exec;
		}

		return scripts;
	}, {
		exec:    null,
		scripts: {}
	});

	validateFeatures(allFeatures, rcFeatures);

	return scripts;
}

function validateFeatures(features, rcFeatures) {

	rcFeatures.forEach((feature) => {

		if (!features.includes(feature)) {
			throw new Error(`Unknown feature "${feature}"`);
		}
	});
}
