import { extractTime } from "../../function/dateTime/extractTime";
import { isInRangeTime } from "../../function/dateTime/isInRangeTime";
import {
  isNotNullOrUndefined,
  isNullOrUndefined,
} from "../../util/isNullOrUndefined";
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
    participantStatus[statusKey].push(
      isNotNullOrUndefined(user.user_name) ? user.user_name : ""
    );
  });
  return participantStatus;
};

const bundleSuggestValue = (
  attendees: {
    date: string;
    time: string;
    participantStatus: Record<number, string[]>;
  }[]
) => {
  const bundledAttendees = [];
  let currentBundle = attendees[0];

  for (let i = 1; i < attendees.length; i++) {
    const current = attendees[i];
    const previous = attendees[i - 1];

    if (
      current.date === previous.date &&
      current.participantStatus[statuses[0]].join() ===
        previous.participantStatus[statuses[0]].join() &&
      current.participantStatus[statuses[1]].join() ===
        previous.participantStatus[statuses[1]].join() &&
      current.participantStatus[statuses[2]].join() ===
        previous.participantStatus[statuses[2]].join()
    ) {
      currentBundle.time = `${currentBundle.time.split("~")[0]}~${
        current.time
      }`;
    } else {
      bundledAttendees.push(currentBundle);
      currentBundle = current;
    }
  }

  bundledAttendees.push(currentBundle);
  return bundledAttendees;
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
  return bundleSuggestValue(attendees);
};
