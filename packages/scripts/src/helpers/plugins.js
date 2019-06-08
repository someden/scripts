/* eslint-disable import/no-dynamic-require */
import resolve from 'resolve-cwd';

export default function getPlugins(plugins, prefix) {
	return plugins.map((_) => {

		let name = '';
		let params = {};
		let plugin = null;

		if (Array.isArray(_)) {
			name = _[0];
			params = _[1] || params;
		} else {
			name = _;
		}

		try {
			plugin = require(resolve(`${prefix}${name}`));
		} catch (err) {

			try {
				plugin = require(resolve(name));
			} catch (err2) {
				throw err2;
			}
		}

		return [plugin, params];
	});
}
