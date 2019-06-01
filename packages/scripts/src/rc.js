import getRc from 'rcfile';

export default function getConfigFromRC(options) {
	return [
		...getRc('trigenscripts', options)
	];
}
