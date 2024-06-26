export const objectKeys = <T extends Record<PropertyKey, unknown>>(obj: T) =>
	Object.keys(obj) as `${keyof T &
		(string | number | boolean | null | undefined)}`[];

export const objectEntries = <T extends Record<PropertyKey, unknown>>(obj: T) =>
	Object.entries(obj) as [keyof T, T[keyof T]][];

export const objectPick = <
	T extends Record<PropertyKey, unknown>,
	K extends keyof T,
>(
	obj: T,
	keys: K[],
	omitUndefined = false,
) =>
	{
		const n = {} as Pick<T, K>;
		for (const k of keys) {
			if (k in obj && (!omitUndefined || obj[k] !== undefined)) {
				n[k] = obj[k];
			}
		}
		return n;
	};
