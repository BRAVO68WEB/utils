import { mustExist } from "./nil";
import { isNullOrUndefined } from "./checks";

/**
 * Indent every line of the passed text.
 * @param subject - The text to indent.
 * @param depth - How often to apply the indenting.
 * @param prefix - The string to use as the indent.
 * @returns The indented text.
 * @group Strings
 */
export const indent = (subject: string, depth = 0, prefix = "    "): string =>
  subject.replaceAll(/^/gm, prefix.repeat(depth));

/**
 * A fast and simple 53-bit string hash function with decent collision resistance.
 * Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
 * License: Public domain. Attribution appreciated.
 * cyrb53 (c) 2018 bryc (github.com/bryc)
 * @param subject - The string to hash.
 * @param seed - An optional seed value.
 * @returns A hash of the string.
 * @group Strings
 */
export const hashCyrb53 = (subject: string, seed = 0): string => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < subject.length; i++) {
    ch = subject.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
};

/**
 * Encodes the provided string in Base64.
 * @param subject - The string to encode.
 * @returns The subject string encoded in Base64.
 * @group Strings
 */
export const base64Encode = (subject: string): string => {
  const bytes = new TextEncoder().encode(subject);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
};

/**
 * Decodes the provided Base64 encoded string.
 * @param subject - The string to decode.
 * @returns The decoded subject string.
 * @group Strings
 */
export const base64Decode = (subject: string): string => {
  const binString = atob(subject);
  const bytes = Uint8Array.from(binString, m => mustExist(m.codePointAt(0)));
  return new TextDecoder().decode(bytes);
};

/**
 * Formats a given input string with numeric placeholders.
 * @example
 * ```ts
 * // returns "Hello World"
 * formatString("{0} {1}", ["Hello", "World"]);
 * ```
 * @param string - The input string with placeholders.
 * @param formatArguments - An array of strings to place into the placeholders.
 * @returns The formatted string.
 * @group Strings
 */
export const formatString = (string: string, ...formatArguments: Array<string>): string => {
  return string.replace(/{(\d+)}/g, (match, matchedDigits: number): string =>
    typeof formatArguments[matchedDigits] !== "undefined" ? formatArguments[matchedDigits] : match,
  );
};

/**
 * Formats a given input string with alphanumeric placeholders.
 * @example
 * ```ts
 * // returns "Hello World"
 * formatString("{first} {second}", {first:"Hello", second:"World"});
 * ```
 * @param string - The input string with placeholders.
 * @param parameters - A hash of parameters to place in the placeholders.
 * @returns The formatted string.
 * @group Strings
 */
export const formatStringTemplate = (
  string: string,
  parameters: Record<string, string | undefined>,
): string => {
  string = string.replace(
    /#{[\w.]+}/g,
    query => parameters[query.slice(2, query.length - 1)] ?? "<missing parameter>",
  );
  return string;
};

/**
 * Check is string is empty
 * @param value String to check
 * @returns Flag determines that string is empty
 */
export const isStringEmpty = (value: string): boolean => {
    return value.length === 0;
};

/**
 * Check is value is null or undefined or empty string
 * @param value Value to check
 * @returns Flag is passed value null or undefined or empty string
 */
export const isNullOrEmpty = (value?: string | null): boolean => {
    return isNullOrUndefined(value) || isStringEmpty(value as string);
};

declare global {
    interface String {
        /**
         * Formate string by replacing anchors {0} with function arguments
         * @example `"{0} world!".format("Hello")` // => "Hello world!"
         * @returns {string} Formatted string
         */
        format(...args: Array<string>): string;

        /**
         * Convert first letter to uppercase
         * @example `"hello world!".capitalize()` // => "Hello world!"
         * @returns {string} String
         */
        capitalize(): string;
    }
}

if (isNullOrUndefined(String.prototype.format)) {
    String.prototype.format = function (...args: Array<string>) {
        let result = this as string;

        [...args].forEach((arg: any, i: number) => {
            result = result.replace(`{${i}}`, arg);
        });

        return result;
    };
}

if (isNullOrUndefined(String.prototype.capitalize)) {
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
}
