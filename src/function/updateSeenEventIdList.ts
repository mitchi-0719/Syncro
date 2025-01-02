import { getSeenEventIdList } from "./getSeenEventIdList";

export const updateSeenEventIdList = (eventId: string) => {
  const seenEventIdList = getSeenEventIdList();
  const newList = seenEventIdList.filter((id) => id !== eventId);
  newList.push(eventId);
  localStorage.setItem("seenEventIdList", JSON.stringify(newList));
};
