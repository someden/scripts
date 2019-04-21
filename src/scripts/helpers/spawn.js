import { spawnSync } from 'child_process';

export default function spawn(vars, cmd, args, ignoreResult) {

	const {
		error,
		signal,
		status
	} = spawnSync(cmd, args, {
		stdio: 'inherit',
		env:   {
			...process.env,
			...vars,
			NODE_ENV: process.env.NODE_ENV || vars.NODE_ENV
		}
	});

	if (ignoreResult === true) {
		return 0;
	}

	switch (signal) {

		case 'SIGKILL':
		case 'SIGTERM':
			console.error(
				`The build failed because the process exited too early (by signal \`${signal}\`).`
			);
			return 1;

		default:

			if (error) {
				throw error;
			}

			return status;
	}
}
