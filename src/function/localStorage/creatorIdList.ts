export const getCreatorIdList = (): string[] =>
  JSON.parse(localStorage.getItem("creatorIdList") ?? "[]");

export const setCreatorIdList = (eventId: string) => {
  const creatorIdList = getCreatorIdList();
  const newList = creatorIdList.filter((id) => id !== eventId);
  newList.push(eventId);
  localStorage.setItem("creatorIdList", JSON.stringify(newList));
};
