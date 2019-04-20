/* eslint-disable import/no-dynamic-require */

export default function getPlugins(plugins, prefix) {
	return plugins.map(_ => require(`${prefix}${_}`));
}
