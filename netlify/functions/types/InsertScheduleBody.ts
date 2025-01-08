type scheduleTimeType = {
  start_time: string;
  end_time: string;
};

type scheduleType = {
  date: string;
  status: string;
  scheduleTime: scheduleTimeType[];
};

export type InsertScheduleBodyType = {
  eventId: string;
  name: string;
  schedule: scheduleType[];
  comment: string;
};
