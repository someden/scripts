
export default {
	server:     'build',
	ui:         process.env.DISABLE_BROWSER_SYNC
		? false
		: { port: 3001 },
	ghostMode:  !process.env.DISABLE_BROWSER_SYNC,
	open:       false,
	notify:     false,
	logSnippet: false
};
