
export function findIndex(key, value, array) {

	for (const index in array) {

		if (String(array[index][key]) == value) {
			return index;
		}
	}

	return -1;
}
