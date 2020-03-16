
export function getConfigFromEnv(name, defaults) {
	return {
		...defaults,
		...JSON.parse(process.env[name] || '{}')
	};
}
