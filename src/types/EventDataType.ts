export type EventId = string;
export type UserId = string;
export type ScheduleId = number;
export type ScheduleTimeId = number;
export const statuses = [1, 2, 3];
export type StatusId = (typeof statuses)[number];

export type EventType = {
  eventId: EventId;
  title: string;
  description: string;
  // TODO 日付と時間の型をちゃんと定義したい
  createAt: string;
  lastUpdateAt: string;
  defaultStartTime: string;
  defaultEndTime: string;
};

export type DateType = {
  eventDate: string;
  startTime: string;
  endTime: string;
  dateMemo: string;
};

export type UserType = {
  userId: UserId;
  userName: string;
  userMemo: string;
};

export type ScheduleTimeType = {
  scheduleTimeId: ScheduleId;
  scheduleStartTime: string | null;
  scheduleEndTime: string | null;
};

export type ScheduleType = {
  scheduleId: ScheduleTimeId;
  eventDate: string;
  userId: string;
  statusId: StatusId;
  scheduleTime: Array<ScheduleTimeType>;
};

export type EventDetailType = {
  event: EventType;
  dates: Array<DateType>;
  users: Array<UserType>;
  schedules: Array<ScheduleType>;
};

export type EventOverviewType = {
  eventId: string;
  title: string;
  createAt: string;
};
