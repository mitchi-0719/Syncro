export const convertDate = (date: string): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  };
  const formattedDate = dateObj.toLocaleDateString("ja-JP", options);
  return formattedDate;
};
