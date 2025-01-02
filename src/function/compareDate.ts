export const compareDate = (date1: string, date2: string): number => {
  const d1 = new Date(`1970-01-01T${date1}:00Z`);
  const d2 = new Date(`1970-01-01T${date2}:00Z`);

  if (d1 > d2) {
    return -1;
  } else if (d1 < d2) {
    return 1;
  } else {
    return 0;
  }
};
