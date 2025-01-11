export const isInRangeTime = (
  time: string,
  start: string,
  end: string
): boolean => {
  const t = new Date(`1970-01-01T${time}:00Z`);
  const s = new Date(`1970-01-01T${start}:00Z`);
  const e = new Date(`1970-01-01T${end}:00Z`);

  return s <= t && t <= e;
};
