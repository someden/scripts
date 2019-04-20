import getPlugins from './helpers/plugins';
import rc from './rc';

const PREFIX = `@trigen/scripts-`;
const {
	scripts:  rcScripts,
	features: rcFeatures
} = rc;

export default function getScripts(inputArgs) {

	const plugins = getPlugins(rcScripts, PREFIX);
	const {
		features,
		scripts
	} = plugins.reduce((result, plugin) => {

		const {
			features,
			scripts
		} = result;
		const {
			Features: pluginFeatures,
			default:  pluginGetScripts
		} = plugin;
		const pluginScripts = pluginGetScripts(inputArgs, rcFeatures);

		features.push(...pluginFeatures);
		Object.assign(scripts.scripts, pluginScripts.scripts);
		scripts.exec = pluginScripts.exec;

		return result;
	}, {
		features: [],
		scripts:  {}
	});

	validateFeatures(features);

	return scripts;
}

function validateFeatures(features) {

	rcFeatures.forEach((feature) => {

		if (!features.includes(feature)) {
			throw new Error(`Unknown feature "${feature}"`);
		}
	});
}
