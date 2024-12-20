export const MethodTypeValues = ["GET", "POST", "PUT", "DELETE"] as const;
export type MethodType = (typeof MethodTypeValues)[number];
export const isMethodType = (value: string): value is MethodType => {
  return MethodTypeValues.some((v) => v === value);
};
