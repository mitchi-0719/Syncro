export type EventId = string;
export type UserId = string;
export type ScheduleId = number;
export type ScheduleTimeId = number;
export const statuses = [1, 2, 3];
export type StatusId = (typeof statuses)[number];

export type EventType = {
  event_id: EventId;
  title: string;
  description: string;
  // TODO 日付と時間の型をちゃんと定義したい
  create_at: string;
  last_update_at: string;
  default_start_time: string;
  default_end_time: string;
};

export type DateType = {
  event_date: string;
  start_time: string;
  end_time: string;
  date_memo: string;
};

export type UserType = {
  user_id: UserId;
  user_name: string;
  user_memo: string;
};

export type ScheduleTimeType = {
  schedule_time_id: ScheduleId;
  schedule_start_time: string | null;
  schedule_end_time: string | null;
};

export type ScheduleType = {
  schedule_id: ScheduleTimeId;
  event_date: string;
  user_id: string;
  status_id: StatusId;
  schedule_time: Array<ScheduleTimeType>;
};

export type EventDetailType = {
  event: EventType;
  dates: Array<DateType>;
  users: Array<UserType>;
  schedules: Array<ScheduleType>;
};

export type EventOverviewType = {
  event_id: string;
  title: string;
  create_at: string;
};
