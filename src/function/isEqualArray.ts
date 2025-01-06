export const isEqualArray = <T>(
  array1: T[],
  array2: T[],
  isSort: boolean = false
): boolean => {
  if (isSort) {
    array1 = array1.sort();
    array2 = array2.sort();
  }

  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((value, index) => value === array2[index]);
};

export const isNotEqualArray = <T>(
  array1: T[],
  array2: T[],
  isSort: boolean = false
): boolean => {
  return !isEqualArray(array1, array2, isSort);
};
