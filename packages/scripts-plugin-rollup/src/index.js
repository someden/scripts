import update from 'immutability-helper';

const scripts = {
	'build': {
		vars: { NODE_ENV: 'production' },
		cmd:  'rollup',
		args: ['-c']
	}
};

export default function getScripts(args, allScripts) {
	return update(allScripts, {
		'build': {
			$set: update(scripts.build, {
				args: {
					$push: args
				}
			})
		}
	});
}
