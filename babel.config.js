module.exports = {
	exclude: 'node_modules/**',
	presets: [
		['babel-preset-trigen', {
			targets:  { node: 'current' },
			commonjs: true
		}]
	],
	overrides: [{
		test:    [
			/(IconComponent|storybook\/config)\.jsx?$/,
			/helpers\/renderer/
		],
		presets: [
			['babel-preset-trigen', {
				targets: {
					browsers: require('browserslist-config-trigen/browsers')
				},
				commonjs: true,
				react:    true
			}]
		]
	}]
};
