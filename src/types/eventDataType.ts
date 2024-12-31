export type EventId = string;
export type UserId = string;
export type ScheduleId = number;
export type ScheduleTimeId = number;

export type eventType = {
  event_id: EventId;
  title: string;
  description: string;
  // TODO 日付と時間の型をちゃんと定義したい
  create_at: string;
  last_update_at: string;
  default_start_time: string;
  default_end_time: string;
};

export type dateType = {
  event_date: string;
  start_time: string;
  end_time: string;
  date_memo: string;
};

export type userType = {
  user_id: UserId;
  user_name: string;
  user_memo: string;
};

export type scheduleTimeType = {
  schedule_time_id: ScheduleId;
  schedule_start_time: string | null;
  schedule_end_time: string | null;
};

export type scheduleType = {
  schedule_id: ScheduleTimeId;
  event_date: string;
  user_id: string;
  status_id: 1 | 2 | 3;
  status: string;
  schedule_time: Array<scheduleTimeType>;
};

export type eventDetailType = {
  event: eventType;
  dates: Array<dateType>;
  users: Array<userType>;
  schedules: Array<scheduleType>;
};

export type eventOverviewType = {
  event_id: string;
  title: string;
  create_at: string;
};
