/* eslint-disable import/no-dynamic-require */
import resolve from 'resolve-cwd';

export default function getPlugins(plugins, prefix) {
	return plugins.map((_) => {

		try {
			return require(resolve(`${prefix}${_}`));
		} catch (err) {

			try {
				return require(resolve(_));
			} catch (err2) {
				throw err;
			}
		}
	});
}
