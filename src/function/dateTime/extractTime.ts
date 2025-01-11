export const extractTime = (date: Date): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const time = dateObj.toLocaleTimeString("ja-JP", options);
  return time;
};
