export const isNullOrUndefined = <T>(
  value: T | null | undefined
): value is null | undefined => {
  return value === null || value === undefined;
};

export const isNotNullOrUndefined = <T>(
  value: T | null | undefined
): value is T => {
  return !isNullOrUndefined(value);
};

export const isNullOrUndefinedOrEmpty = <T>(
  value: T | null | undefined | ""
): value is null | undefined | "" => {
  return value === null || value === undefined || value === "";
};

export const isNotNullOrUndefinedOrEmpty = <T>(
  value: T | null | undefined | ""
): value is T => {
  return !isNullOrUndefinedOrEmpty(value);
};

export const isNullOrUndefinedOrEmptyArray = <T>(
  value: T[] | null | undefined | []
): value is null | undefined | [] => {
  return value === null || value === undefined || value.length === 0;
};

export const isNotNullOrUndefinedOrEmptyArray = <T>(
  value: T[] | null | undefined | []
): value is T[] => {
  return !isNullOrUndefinedOrEmptyArray(value);
};
