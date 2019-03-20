import { spawnSync } from 'child_process';

export default function spawn(nodeEnv, cmd, args, ignoreResult) {

	const result = spawnSync(cmd, args, {
		stdio: 'inherit',
		env:   {
			...process.env,
			NODE_ENV: process.env.NODE_ENV || nodeEnv
		}
	});

	if (ignoreResult === true) {
		return 0;
	}

	switch (result.signal) {

		case 'SIGKILL':
		case 'SIGTERM':
			console.error(
				`The build failed because the process exited too early (by signal \`${result.signal}\`).`
			);
			return 1;

		default:
			return result.status;
	}
}
