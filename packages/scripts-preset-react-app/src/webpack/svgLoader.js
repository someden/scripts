import path from 'path';
import update from 'immutability-helper';
import {
	findIndex
} from '../helpers';

const svgTest = /\.svg$/;

export function base(config) {
	return update(config, {
		module: {
			rules: {
				$push: [{
					test: svgTest,
					use:  [{
						loader:  'svg-sprite-loader',
						options: {
							runtimeGenerator: path.join(__dirname, '..', 'helpers', 'icons', 'svgToComponent.js'),
							runtimeOptions:   {
								iconModule: path.join(__dirname, '..', 'helpers', 'icons', 'IconComponent.js')
							}
						}
					}]
				}]
			}
		}
	});
}

export function dev(config) {
	return config;
}

export function build(config) {
	return update(config, {
		module:  {
			rules: {
				$apply: rules => update(rules, {
					[findIndex('test', svgTest, rules)]: {
						use: {
							$push: ['svgo-loader']
						}
					}
				})
			}
		}
	});
}

export {
	build as render
};
