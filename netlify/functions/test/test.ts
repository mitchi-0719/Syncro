import { Handler } from "@netlify/functions";
import { insertEvent } from "../event/insertEvent";

export const handler: Handler = async (event) => {
  const body = {
    title: "api-test",
    description: "stringstringstringstringstring",
    defaultStartTime: "10:00",
    defaultEndTime: "20:00",
    dates: [
      {
        eventDate: "2024-12-24",
        startTime: "10:00",
        endTime: "20:00",
        memo: "memomomomomommomo",
      },
      {
        eventDate: "2024-12-25",
        startTime: "11:00",
        endTime: "21:00",
        memo: "memomomomomommomo",
      },
    ],
  };
  return insertEvent(body);
};
