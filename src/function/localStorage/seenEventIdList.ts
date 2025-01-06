export const getSeenEventIdList = (): string[] =>
  JSON.parse(localStorage.getItem("seenEventIdList") ?? "[]");

export const setSeenEventIdList = (eventId: string) => {
  const seenEventIdList = getSeenEventIdList();
  const newList = seenEventIdList.filter((id) => id !== eventId);
  newList.push(eventId);
  localStorage.setItem("seenEventIdList", JSON.stringify(newList));
};
