import { BASE_URL } from "../constants/const";

type EventDate = {
  eventDate: string;
  startTime?: string;
  endTime?: string;
  memo?: string;
};

export const createEvent = async (
  title: string,
  description: string,
  defaultStartTime: string,
  defaultEndTime: string,
  dates: EventDate[]
) => {
  dates.forEach((date) => {
    if (!date.startTime) {
      date.startTime = defaultStartTime;
    }
    if (!date.endTime) {
      date.endTime = defaultEndTime;
    }
  });
  const response = await fetch(`${BASE_URL}events`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      defaultStartTime,
      defaultEndTime,
      dates,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create event");
  }
  return response.json();
};
