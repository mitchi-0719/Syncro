export type UserScheduleType = {
  userId: string;
  userName: string;
  schedule: { date: string; status: number; start?: string; end?: string }[];
}[];

export type SelectDateType = { date: string; hostComment?: string };

export type EventType = {
  eventId: string;
  eventTitle: string;
  eventDescription: string;
  startTime: string;
  endTime: string;
  createDate: string;
  lastUpdateDate: string;
};

export type EventDataType = {
  eventData: EventType;
  selectDate: SelectDateType[];
  userSchedule: UserScheduleType;
};
