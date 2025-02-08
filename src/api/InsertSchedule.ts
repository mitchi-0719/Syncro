import { InsertScheduleType } from "../components/event";
import { BASE_URL } from "../constants/const";

export const InsertSchedule = async (
  eventId: string,
  name: string,
  schedule: InsertScheduleType[],
  comment: string
) => {
  const response = await fetch(`${BASE_URL}schedules/${eventId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      eventId,
      name,
      schedule,
      comment,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create event");
  }
  return response.json();
};
