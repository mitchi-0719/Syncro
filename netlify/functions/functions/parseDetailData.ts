import { EventDetail } from "../types/TableType";
import {
  isNotNullOrUndefined,
  isNullOrUndefined,
} from "../util/isNullOrUndefined";

export const parseDetailData = (data: EventDetail[]) => {
  const event = {
    event_id: data[0].event_id,
    title: data[0].title,
    description: data[0].description,
    create_at: data[0].create_at,
    last_update_at: data[0].last_update_at,
    default_start_time: data[0].default_start_time,
    default_end_time: data[0].default_end_time,
  };

  const date = {};
  const user = {};
  const schedule = {};
  data.forEach((d) => {
    if (
      isNotNullOrUndefined(d.event_date) &&
      isNullOrUndefined(date[d.event_date])
    ) {
      date[d.event_date] = {
        event_date: d.event_date,
        start_time: d.start_time,
        end_time: d.end_time,
        date_memo: d.date_memo,
      };
    }

    if (isNotNullOrUndefined(d.user_id) && isNullOrUndefined(user[d.user_id])) {
      user[d.user_id] = {
        user_id: d.user_id,
        user_name: d.user_name,
        user_memo: d.user_memo,
      };
    }

    if (isNotNullOrUndefined(d.schedule_id)) {
      if (isNullOrUndefined(schedule[d.schedule_id])) {
        schedule[d.schedule_id] = {
          schedule_id: d.schedule_id,
          event_date: d.event_date,
          user_id: d.user_id,
          status_id: d.status_id,
          status: d.status,
          schedule_time: [
            {
              schedule_time_id: d.schedule_time_id,
              schedule_start_time: d.schedule_start_time,
              schedule_end_time: d.schedule_end_time,
            },
          ],
        };
      } else {
        schedule[d.schedule_id].schedule_time.push({
          schedule_time_id: d.schedule_time_id,
          schedule_start_time: d.schedule_start_time,
          schedule_end_time: d.schedule_end_time,
        });
      }
    }
  });

  return {
    event,
    date: Object.values(date),
    user: Object.values(user),
    schedule: Object.values(schedule),
  };
};
