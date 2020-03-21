
export function getConfigFromEnv(name, defaultsOrMutator) {

	if (typeof defaultsOrMutator === 'function') {
		return defaultsOrMutator(JSON.parse(process.env[name] || '{}'));
	}

	return {
		...defaultsOrMutator,
		...JSON.parse(process.env[name] || '{}')
	};
}
