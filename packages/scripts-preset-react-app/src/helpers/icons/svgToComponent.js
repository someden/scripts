import path from 'path';
import {
	stringifySymbol,
	stringify,
	generateImport,
	generateExport
} from 'svg-sprite-loader/lib/utils';
import {
	stringifyRequest
} from 'loader-utils';
import {
	pascalize
} from 'humps';

module.exports = runtimeGenerator;

function runtimeGenerator({
	symbol,
	config,
	context,
	loaderContext
}) {

	const {
		spriteModule,
		symbolModule,
		runtimeOptions,
		esModule
	} = config;
	const {
		iconModule,
		skipSymbol
	} = runtimeOptions;
	const compilerContext = loaderContext._compiler.context;
	const iconModulePath = path.resolve(compilerContext, iconModule);
	const iconModuleRequest = stringify(
		path.relative(path.dirname(symbol.request.file), iconModulePath)
	);
	const spriteRequest = stringifyRequest({ context }, spriteModule);
	const symbolRequest = stringifyRequest({ context }, symbolModule);
	const displayName = `Icon${pascalize(symbol.id)}`;
	const [,, width, height] = symbol.viewBox.split(' ');

	return `
		${generateImport('React', 'react', esModule)}
		${generateImport('SpriteSymbol', symbolRequest, esModule)}
		${generateImport('sprite', spriteRequest, esModule)}
		${generateImport(esModule ? 'Icon' : '{ default: Icon }', iconModuleRequest, esModule)}

		${skipSymbol ? '' : `
		sprite.add(new SpriteSymbol(${stringifySymbol(symbol)}));
		`}

		function ${displayName}() {
			Icon.apply(this, arguments);
		}

		${displayName}.prototype = Object.create(Icon.prototype);

		${displayName}.defaultProps = Object.assign(
			{},
			Icon.defaultProps,
			{
				glyph: '${symbol.id}',
				width:  ${width},
				height: ${height}
			}
		);

		${generateExport(displayName, esModule)}
	`;
}
