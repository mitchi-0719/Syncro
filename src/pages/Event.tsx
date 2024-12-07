import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
// ダーミー
import {
  dummyEventData,
  dummySelectDate,
  dummyUserSchedule,
} from "../dummyData/evnet1";
import { InsertSchedule, ScheduleTable } from "../components/event";

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
