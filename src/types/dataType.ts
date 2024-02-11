type N = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0; // 数字型
type Time = `${"0" | "1" | "2"}${N}:${N}${N}`; // hh:mm形式の文字列型

interface SchedulingData {
  schedule_id: string;
  user_name: string; // (10文字以内)
  schedule: Schedule[];
  memo: string; // (100文字以内)
}

interface Schedule {
  date: Date;
  state: 0 | 1 | 2;
  times: TimeRange[];
}

interface TimeRange {
  start: Time;
  end: Time;
}

interface UncommonDate {
  date: Date;
  start_time: Time;
  end_time: Time;
}

export interface Event {
  event_id: string;
  create_date: Date;
  last_update_date: Date;
  select_date: Date[];
  start_time: Time;
  end_time: Time;
  uncommon_date: UncommonDate[];
  scheduling_data: SchedulingData[];
  url: string;
}
