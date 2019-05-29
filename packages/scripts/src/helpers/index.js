/* eslint-disable no-magic-numbers */

export const FILL_ME = [null/* FILL ME */];

export function getScriptArg(args, arg, value) {

	if (typeof arg === 'number') {

		if (arg >= args.length || args[arg][0] === '-') {
			return [value];
		}
	} else
	if (!args.includes(arg)) {
		return typeof value !== 'undefined'
			? [arg, value]
			: [arg];
	}

	return [];
}

export function addItems(items, add, unshift) {

	if (!items) {
		return add;
	}

	const itemsList = Array.isArray(items)
		? items.slice()
		: [items];
	const addList = Array.isArray(add)
		? add.slice()
		: [add];

	addList.forEach((add) => {

		if (!itemsList.includes(add)) {

			if (unshift) {
				itemsList.unshift(add);
			} else {
				itemsList.push(add);
			}
		}
	});

	if (itemsList.length < 2) {
		return itemsList[0];
	}

	return itemsList;
}
