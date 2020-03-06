
export default function pasteBrowserslistEnv(template, browserslistEnv) {
	return template.replace('.[env].', browserslistEnv
		? `.${browserslistEnv}.`
		: '.'
	);
}
