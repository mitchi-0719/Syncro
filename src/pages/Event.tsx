import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { eventOverviewType } from "../types/eventDataType";

export const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const fetchUrl = `.netlify/functions/event/detail/${eventId}`;
  const { data, error } = useSWR(fetchUrl, async (url) => {
    const response = await fetch(url);
    return response.json() as Promise<eventOverviewType | null>;
  });

  console.log(data);
  console.log(error);
  if (!data || error) return null;
  return (
    <Box>
      aaa
      {/* <Typography>{data.eventData.eventTitle}</Typography>
      <ScheduleTable data={data} />
      <Button onClick={() => setIsInsertSchedule(!isInsertSchedule)}>
        スケジュールを入力する
      </Button>
      {isInsertSchedule && <InsertSchedule data={data} />} */}
    </Box>
  );
};
