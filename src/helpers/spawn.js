import { spawnSync } from 'child_process';

export default function spawn(nodeEnv, cmd, args) {

	const result = spawnSync(cmd, args, {
		stdio: 'inherit',
		env:   {
			...process.env,
			NODE_ENV: process.env.NODE_ENV || nodeEnv
		}
	});

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
