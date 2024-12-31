import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { eventDetailType } from "../types/eventDataType";
import { ScheduleTable } from "../components/event";
import { BASE_URL } from "../constants/const";

export const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const fetchUrl = `${BASE_URL}event/detail/${eventId}`;
  const { data, error, isLoading } = useSWR(fetchUrl, async (url) => {
    const response = await fetch(url).then((res) => res.json());
    return response as eventDetailType | null;
  });

  if (!data || error) return null;
  return (
    !isLoading && (
      <Box>
        <Typography variant="h2">{data.event.title}</Typography>
        <ScheduleTable data={data} />
        {/* <Button onClick={() => setIsInsertSchedule(!isInsertSchedule)}>
          スケジュールを入力する
        </Button>
        {isInsertSchedule && <InsertSchedule data={data} />} */}
      </Box>
    )
  );
};
