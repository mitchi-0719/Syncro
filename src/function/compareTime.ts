export const compareTime = (time1: string, time2: string): number => {
  const t1 = new Date(`1970-01-01T${time1}:00Z`);
  const t2 = new Date(`1970-01-01T${time2}:00Z`);

  if (t1 > t2) {
    return -1;
  } else if (t1 < t2) {
    return 1;
  } else {
    return 0;
  }
};
