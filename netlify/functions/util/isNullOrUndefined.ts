export const isNullOrUndefined = <T>(value: T | null | undefined): value is null | undefined => {
  return value === null || value === undefined;
};

export const isNotNullOrUndefined = <T>(value: T | null | undefined): value is T => {
  return !isNullOrUndefined(value);
};
