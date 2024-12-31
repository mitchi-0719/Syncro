export const getSeenEventIdList = (): string[] =>
  JSON.parse(localStorage.getItem("seenEventIdList") ?? "[]");
