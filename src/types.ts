import type colors from "picocolors";
import { isNullOrUndefined } from "./utils";

export type Falsy = Undef | 0 | "";
export type Undef = false | null | undefined;
export type MaybePromise<T> = T | PromiseLike<T>;
export type MaybeNull<T> = T | null | undefined;
export type MaybeArray<T> = T | T[];
export type Fn<T = void> = () => T;
export type Constructor<T = void> = new (...args: any[]) => T;
export type ElementOf<T> = T extends (infer E)[] ? E : never;
export type UnionToIntersection<U> = (
	U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never;
export type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never;
export type MergeInsertions<T> = T extends Record<PropertyKey, unknown>
	? { [K in keyof T]: MergeInsertions<T[K]> }
	: T;
export type RGB = Readonly<[r: number, g: number, b: number]>;
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Describes a function that is a constructor for something.
 * @typeParam TConstructed - The type this is a constructor for.
 * @group Types
 */
export type ConstructorOf<TConstructed> = new (...args: Array<any>) => TConstructed;

/**
 * Describes any function.
 * @group Types
 */
export type AnyFunction = (...args: Array<any>) => any;

/**
 * Describes any asynchronous function.
 * @group Types
 */
export type AnyAsyncFunction = (...args: Array<any>) => Promise<any>;

/**
 * Any constructor
 * @group Types
 */
export type AnyConstructor = new (...args: Array<any>) => any;

/**
 * Describes a function returning an instance of a given type.
 * @typeParam TReturned - The type of the item returned by the function.
 * @group Types
 */
export type AnyFunctionReturning<TReturned = any> = (...args: Array<any>) => TReturned;

/**
 * Describes an async function returning an instance of a given type.
 * @typeParam TReturned - The type of the item returned by the function.
 * @group Types
 */
export type AnyAsyncFunctionReturning<TReturned = any> = (
  ...args: Array<any>
) => Promise<TReturned>;

/**
 * Describes a class "mixin", which is a function that returns a dynamically
 * constructed class, based on the passed parameters.
 *
 * **Hint**: Don't use mixins.
 * @typeParam TTarget - The type of the classed this mixin is being
 * mixed in with.
 * @group Types
 */
export type Mixin<TTarget extends AnyFunctionReturning> = InstanceType<ReturnType<TTarget>>;

/**
 * Recursive definition of a regular JS object, which is a key-value hash
 * of strings to primitives, or another object of the same type.
 * @group Types
 */
export type JsonObject =
  | string
  | number
  | boolean
  | null
  | Array<JsonObject>
  | { [key: string]: JsonObject };

export type Color = keyof Omit<
    typeof colors,
    "createColors" | "isColorSupported"
>;
export type Fn2 = (...args: any[]) => any;
export const isType = <T>(value: any): value is T => {
    console.warn("[DEPRECATED] 1.2.0 | Use manual check `value instanceof MyType`. Function not working with interfaces");
    const mapped = value as T;

    return !isNullOrUndefined(mapped);
};