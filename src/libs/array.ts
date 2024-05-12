import type { MaybeArray, MaybeNull } from "../types";
import { ConstructorOf } from "../types";
import { is } from "../utils/nil";

export function toArray<T>(array?: MaybeNull<MaybeArray<T>>): T[] {
	array = array ?? [];

	return Array.isArray(array) ? array : [array];
}

export const flattenArrayable = <T>(
	array?: MaybeNull<MaybeArray<T | T[]>>,
): T[] => toArray(array).flat(1) as T[];

export const uniq = <T>(array: readonly T[]): T[] => [...new Set(array)];

export function last(array: readonly []): undefined;
export function last<T>(array: readonly T[]): T;
export function last<T>(array: readonly T[]): T | undefined {
	return at(array, -1);
}

export function remove<T>(array: T[], value: T) {
	if (!array) {
		return false;
	}
	const index = array.indexOf(value);
	if (index >= 0) {
		array.splice(index, 1);

		return true;
	}

	return false;
}

export function at(array: readonly [], index: number): undefined;
export function at<T>(array: readonly T[], index: number): T;
export function at<T>(array: readonly T[] | [], index: number): T | undefined {
	const len = array.length;
	if (!len) {
		return undefined;
	}

	if (index < 0) {
		index += len;
	}

	return array[index];
}

export const arrayEquals = <T>(array1: T[], array2: T[]): boolean =>
	array1.length === array2.length
		? array1.every((element, index) => element === array2[index])
		: false;

export const arrayStartsWith = <T>(array: T[], prefix: T[]): boolean =>
	prefix.length > array.length
		? false
		: arrayEquals(array.slice(0, prefix.length), prefix);

/**
 * Places the items in the array in random order.
 * @param array - The array to shuffle.
 * @typeParam TElements - The type of the elements in the array.
 * @returns The passed array in random order.
 * @group Array
 */
export const shuffleArray = <TElements>(array: Array<TElements>) => {
	for (let index = array.length - 1; index > 0; index--) {
	const targetIndex = Math.trunc(Math.random() * (index + 1));
	const temp = array[index];
	array[index] = array[targetIndex];
	array[targetIndex] = temp;
	}
	return array;
};

/**
 * Returns an array that holds all items that appear in both
 * passed arrays.
 * @param a - The first array.
 * @param b - The second array.
 * @typeParam TElements - The type of the elements in the array.
 * @returns A new array which holds the items that appear in
 * both passed arrays.
 * @group Array
 */
export const intersect = <TElements>(a: Array<TElements>, b: Array<TElements>) => {
	return a.filter(x => b.includes(x));
};

/**
 * Returns an array that holds all items that only appear in `a`.
 * @param a - The first array.
 * @param b - The second array.
 * @typeParam TElements - The type of the elements in the array.
 * @returns A new array which holds the items that ony appear in `a`.
 * @group Array
 */
export const difference = <TElements>(a: Array<TElements>, b: Array<TElements>) => {
	return a.filter(x => !b.includes(x));
};

/**
 * From an array with unknown contents, retrieve all the elements
 * that are of a certain type and return them as a new array.
 * @param array - The array to filter.
 * @param InstanceType - The type to search for.
 * @typeParam TElements - The type of the elements in the array.
 * @returns A new array with the filtered items.
 * @group Array
 */
export const filterType = <TElements>(
	array: Array<unknown>,
	InstanceType: ConstructorOf<TElements>,
) => array.filter(element => is(element, InstanceType)) as Array<TElements>;