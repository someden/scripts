
export function addHtmlAttributes(...attributes: string[]) {
	return (_: string) => _.replace(
		/<html([^>]*)>/,
		`<html$1 ${attributes.join('')}>`
	);
}

export function addHeadElements(...elements: string[]) {
	return (_: string) => _.replace(
		/(<head[^>]*>)/,
		`$1${elements.join('')}`
	);
}

export function replaceEntryScript(...scripts: string[]) {
	return (_: string) => _.replace(
		/<script[^>]*src.*<\/script>/,
		scripts.join('')
	);
}

export function replaceDslScript(...scripts: string[]) {
	return (_: string) => _.replace(
		/<script>function dsl(.|\n)*<\/script>/m,
		scripts.join('')
	);
}

export function prependEmbededScripts(...scripts: string[]) {
	return (_: string) => _.replace(
		/(<script)/,
		`${scripts.map(_ => `<script>${_}</script>`).join('')}$1`
	);
}

export function setViewContent(...contents: string[]) {
	return (_: string) => _.replace(
		/(<div id=view>)(<\/div>)/,
		`$1${contents.join('')}$2`
	);
}

export function addElementsBeforeView(...elements: string[]) {
	return (_: string) => _.replace(
		/(<div id=view>)/,
		`${elements.join('')}$1`
	);
}

export function apply(template: string, ...injectors: ((_: string) => string)[]) {
	return injectors.reduce((template, injector) => injector(template), template);
}
