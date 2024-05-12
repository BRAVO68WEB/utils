/**
 * Check is value defined
 * @param value Value to check
 * @returns Flag determines that value is not defined
 */
export const isNullOrUndefined = <T>(value: T): boolean => {
    return isNullCheck(value) || isUndefinedCheck(value);
};

/**
 * Check is value is null
 * @param value Value to check
 * @returns Flag determines that value is null
 */
export const isNullCheck = <T>(value: T): boolean => {
    return value === null;
};

/**
 * Check is value undefined
 * @param value Value to check
 * @returns Flat determines that value is undefined
 */
export const isUndefinedCheck = <T>(value: T): boolean => {
    return value === undefined;
};

/**
 * Get value if it defined, otherwise - get default value
 * @param value Probably not defined value
 * @param defaultValue Default value which should be returned in default case
 * @returns Definitely defined value
 */
export const getValueOrDefault = <TValue>(value: TValue | undefined, defaultValue: TValue): TValue => {
    return isNullOrUndefined(value) ? defaultValue : value!;
};

/**
 * Check is object empty or consists of empty values
 * @param object Object to check
 * @returns `true` if object empty or contains null\undefined values
 */
export const isObjectEmpty = (object: any): boolean => {
    if (isNullOrUndefined(object)) {
        return true;
    }

    const result = Object.entries(object)
        .reduce(
            (result, [value]) => isNullOrUndefined(value[1]) && result
            , true
        );

    return result;
};