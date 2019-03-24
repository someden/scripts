module.exports = {
	"exclude": "node_modules/**",
	"presets": [
        ["babel-preset-trigen", {
			"targets": { "node": "current" },
			"corejs": 2,
            "commonjs": true
        }]
	],
	"overrides": [{
		test: /(IconComponent|storybook\/config)\.js$/,
		"presets": [
			["babel-preset-trigen", {
				"targets": {
					"browsers": require('browserslist-config-trigen/browsers')
				},
				"corejs": 2,
				"commonjs": true,
				"react": true
			}]
		]
	}]
}
