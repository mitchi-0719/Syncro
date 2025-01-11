import { extractTime } from "../../function/dateTime/extractTime";
import { isInRangeTime } from "../../function/dateTime/isInRangeTime";
import {
  isNotNullOrUndefined,
  isNullOrUndefined,
} from "../../function/isNullOrUndefined";
import {
  DateType,
  ScheduleTimeType,
  ScheduleType,
  statuses,
  UserType,
} from "../../types/EventDataType";

const getTimeList = (start: string, end: string) => {
  const startTime = new Date(`2021-01-01T${start}`);
  const endTime = new Date(`2021-01-01T${end}`);
  const timeList = [];
  for (let i = startTime; i <= endTime; i.setHours(i.getHours() + 1)) {
    timeList.push(extractTime(i));
  }
  return timeList;
};

const isParticipable = (time: string, scheduleTime: ScheduleTimeType[]) => {
  if (
    scheduleTime.some(
      (_time) =>
        _time.schedule_start_time === null || _time.schedule_end_time === null
    )
  ) {
    return statuses[1];
  }

  const isParticipable = scheduleTime.some((_time) => {
    if (
      isNullOrUndefined(_time.schedule_start_time) ||
      isNullOrUndefined(_time.schedule_end_time)
    ) {
      return false;
    }
    isInRangeTime(time, _time.schedule_start_time, _time.schedule_end_time);
  });

  return isParticipable ? statuses[0] : statuses[1];
};

const getParticipantStatus = (
  schedules: ScheduleType[],
  users: UserType[],
  date: string,
  time: string
) => {
  const dates = schedules.filter((schedule) => schedule.event_date === date);
  const participantStatus: Record<number, string[]> = {
    [statuses[0]]: [],
    [statuses[1]]: [],
    [statuses[2]]: [],
  };
  dates.forEach((schedule) => {
    const user = users.find((user) => user.user_id === schedule.user_id);
    if (isNullOrUndefined(user)) {
      return;
    }
    const statusKey =
      schedule.status_id !== statuses[1]
        ? schedule.status_id
        : isParticipable(time, schedule.schedule_time);
    console.log(statusKey, date, time, user.user_name);
    participantStatus[statusKey].push(
      isNotNullOrUndefined(user.user_name) ? user.user_name : ""
    );
  });
  return participantStatus;
};

export const scheduleSuggester = (
  dates: DateType[],
  schedules: ScheduleType[],
  users: UserType[]
) => {
  const attendees = dates
    .flatMap((date) => {
      const times = getTimeList(date.start_time, date.end_time);
      return times.map((time) => {
        return {
          date: date.event_date,
          time,
          participantStatus: getParticipantStatus(
            schedules,
            users,
            date.event_date,
            time
          ),
        };
      });
    })
    .sort((a, b) => {
      if (
        a.participantStatus[statuses[0]].length <
        b.participantStatus[statuses[0]].length
      ) {
        return 1;
      } else if (
        a.participantStatus[statuses[0]].length >
        b.participantStatus[statuses[0]].length
      ) {
        return -1;
      } else {
        if (
          a.participantStatus[statuses[1]].length <
          b.participantStatus[statuses[1]].length
        ) {
          return 1;
        } else if (
          a.participantStatus[statuses[1]].length >
          b.participantStatus[statuses[1]].length
        ) {
          return -1;
        }
        return 0;
      }
    });
  return attendees;
};
