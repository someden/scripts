
export function applyReducers(reducers, params, object) {
	return reducers.reduce(
		(object, reducer) => reducer(object, params),
		object
	);
}
