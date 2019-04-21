/* eslint-disable import/no-dynamic-require */

export default function getPlugins(plugins, prefix) {
	return plugins.map((_) => {

		try {
			return require(`${prefix}${_}`);
		} catch (err) {
			return require(_);
		}
	});
}
