import { EventDetail } from "../types/TableType";
import {
  isNotNullOrUndefined,
  isNullOrUndefined,
} from "../util/isNullOrUndefined";

export const parseDetailData = (data: EventDetail[]) => {
  const event = {
    eventId: data[0].event_id,
    title: data[0].title,
    description: data[0].description,
    createAt: data[0].create_at,
    lastUpdateAt: data[0].last_update_at,
    defaultStartTime: formatTime(data[0].default_start_time),
    defaultEndTime: formatTime(data[0].default_end_time),
  };

  const dates = {};
  const users = {};
  const schedules = {};
  data.forEach((d) => {
    if (
      isNotNullOrUndefined(d.event_date) &&
      isNullOrUndefined(dates[d.event_date])
    ) {
      dates[d.event_date] = {
        eventDate: d.event_date,
        startTime: formatTime(d.start_time),
        endTime: formatTime(d.end_time),
        dateMemo: d.date_memo,
      };
    }

    if (
      isNotNullOrUndefined(d.user_id) &&
      isNullOrUndefined(users[d.user_id])
    ) {
      users[d.user_id] = {
        userId: d.user_id,
        userName: d.user_name,
        userMemo: d.user_memo,
      };
    }

    if (isNotNullOrUndefined(d.schedule_id)) {
      if (isNullOrUndefined(schedules[d.schedule_id])) {
        schedules[d.schedule_id] = {
          scheduleId: d.schedule_id,
          eventDate: d.event_date,
          userId: d.user_id,
          statusId: d.status_id,
          status: d.status,
          scheduleTime: [
            {
              scheduleTimeId: d.schedule_time_id,
              scheduleStartTime: formatTime(d.schedule_start_time),
              scheduleEndTime: formatTime(d.schedule_end_time),
            },
          ],
        };
      } else {
        schedules[d.schedule_id].schedule_time.push({
          scheduleTimeId: d.schedule_time_id,
          scheduleStartTime: formatTime(d.schedule_start_time),
          scheduleEndTime: formatTime(d.schedule_end_time),
        });
      }
    }
  });

  return {
    event,
    dates: Object.values(dates),
    users: Object.values(users),
    schedules: Object.values(schedules),
  };
};

const formatTime = (time: string | null) => {
  if (time && time.length === 8) {
    return time.substring(0, 5);
  }
  return time;
};
