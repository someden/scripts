/* eslint-disable no-magic-numbers */
import getPlugins from './helpers/plugins';
import getConfigFromRC from './rc';

const PREFIX = `@trigen/scripts-`;

export function getScriptAndArgs(inputArgs) {

	const [
		script,
		...args
	] = inputArgs.slice(2);

	return [
		script,
		args
	];
}

export function getScripts(args, options) {

	const rcPlugins = getConfigFromRC(options);
	const plugins = getPlugins(rcPlugins, PREFIX);
	const scripts = plugins.reduce((scripts, plugin) => {

		const {
			default: getPluginScripts
		} = plugin;

		return getPluginScripts(args, scripts);
	}, {});

	return scripts;
}
