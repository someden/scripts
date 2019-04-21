import getPlugins from './helpers/plugins';
import rc, {
	getFeaturesMap
} from './rc';

const PREFIX = `@trigen/scripts-`;
const {
	scripts:  rcScripts,
	features: rcFeatures
} = rc;

export default function getScripts(inputArgs) {

	const allFeatures = [];
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
		scripts.exec = pluginScripts.exec;

		return scripts;
	}, {});

	validateFeatures(allFeatures);

	return scripts;
}

function validateFeatures(features) {

	rcFeatures.forEach((feature) => {

		if (!features.includes(feature)) {
			throw new Error(`Unknown feature "${feature}"`);
		}
	});
}
