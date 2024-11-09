import { Box, Button, Typography } from "@mui/material";
import {
  EventType,
  SelectDateType,
  UserScheduleType,
} from "../types/eventDataType";
import { ScheduleTable } from "../components/event/ScheduleTable";
import { InsertSchedule } from "../components/event/InsertSchedule";
import { useState } from "react";

const dummyEventData: EventType = {
  eventId: "abcd1234",
  eventTitle: "テストイベント",
  eventDescription: "このイベントはダミーです",
  startTime: "10:00",
  endTime: "20:00",
  createDate: "2022-01-01",
  lastUpdateDate: "2022-01-01",
};

const dummySelectDate: SelectDateType[] = [
  { date: "2022-01-01", hostComment: "" },
  { date: "2022-01-02", hostComment: "" },
  { date: "2022-01-03", hostComment: "" },
];

const dummyUserSchedule: UserScheduleType = [
  {
    userId: "12ab",
    userName: "test太郎",
    schedule: [
      { date: "2022-01-01", status: 0 },
      { date: "2022-01-02", status: 1, start: "10:00", end: "12:00" },
      { date: "2022-01-03", status: 2 },
    ],
  },
  {
    userId: "34cd",
    userName: "test太郎2",
    schedule: [
      { date: "2022-01-01", status: 2 },
      { date: "2022-01-02", status: 0 },
      { date: "2022-01-03", status: 1, start: "12:00", end: "16:00" },
    ],
  },
];

export const Event = () => {
  const [isInsertSchedule, setIsInsertSchedule] = useState(false);
  // const { eventId } = useParams<{ eventId: string }>();
  // const { data } = useSWR(`/api/event/${eventId}`, () => dummyEventData);
  const data = {
    eventData: dummyEventData,
    selectDate: dummySelectDate,
    userSchedule: dummyUserSchedule,
  };
  return (
    <Box>
      <Typography>{data.eventData.eventTitle}</Typography>
      <ScheduleTable data={data} />
      <Button onClick={() => setIsInsertSchedule(!isInsertSchedule)}>
        スケジュールを入力する
      </Button>
      {isInsertSchedule && <InsertSchedule data={data} />}
    </Box>
  );
};
