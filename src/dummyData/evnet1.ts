import {
  EventType,
  SelectDateType,
  UserScheduleType,
} from "../types/eventDataType";

export const dummyEventData: EventType = {
  eventId: "abcd1234",
  eventTitle: "テストイベント1",
  eventDescription: "このイベントはダミーです。イベント1です。",
  startTime: "10:00",
  endTime: "20:00",
  createDate: "2022-01-01",
  lastUpdateDate: "2022-01-01",
};

export const dummySelectDate: SelectDateType[] = [
  { date: "2022-01-01", hostComment: "" },
  { date: "2022-01-02", hostComment: "" },
  { date: "2022-01-03", hostComment: "" },
];

export const dummyUserSchedule: UserScheduleType[] = [
  {
    userId: "12ab",
    userName: "test太郎",
    schedule: [
      { date: "2022-01-01", status: 0 },
      { date: "2022-01-02", status: 1, start: "10:00", end: "12:00" },
      { date: "2022-01-03", status: 2 },
    ],
  },
  {
    userId: "34cd",
    userName: "test太郎2",
    schedule: [
      { date: "2022-01-01", status: 2 },
      { date: "2022-01-02", status: 0 },
      { date: "2022-01-03", status: 1, start: "12:00", end: "16:00" },
    ],
  },
];
