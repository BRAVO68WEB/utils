import { htmlEscape } from "escape-goat";

export class MissingValueError extends Error {
	constructor(public key: string) {
		super(
			`Missing a value for ${
				key ? `the placeholder: ${key}` : "a placeholder"
			}`,
		);
	}
}

export interface templateOptions {
	ignoreMissing?: boolean;
	transform?: (data: { value: unknown; key: string }) => unknown;
}

export const doubleBraceRegex = /((?!])(?!\[).)+/g;
export const braceRegex = /{(\d+|[$_a-z][\w$-]*(?:\.[\w$-]*)*)}/gi;

export const composeHtmlEscape = (replacer: (...args: string[]) => string) => (...args: string[]) => htmlEscape(replacer(...args));

export function template(
	template: string,
	data: Record<string, any>,
	{ ignoreMissing = false, transform = ({ value }) => value }: templateOptions = {},
) {
	function replace(placeholder: string, key: string) {
		let value = data;
		for (const property of key.split(".")) {
			value = value ? value[property] : undefined;
		}

		const transformedValue = transform({ value, key });
		if (transformedValue === undefined) {
			if (ignoreMissing) {
				return placeholder;
			}

			throw new MissingValueError(key);
		}

		return String(transformedValue);
	}

	if (doubleBraceRegex.test(template)) {
		template = template.replaceAll(doubleBraceRegex, composeHtmlEscape(replace));
	}

	return template.replaceAll(braceRegex, replace);
}
