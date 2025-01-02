import { Box, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { eventDetailType } from "../types/eventDataType";
import { ScheduleInsertButton, ScheduleTable } from "../components/event";
import { BASE_URL } from "../constants/const";
import { PastSeenEventBoard } from "../components/eventBoard/PastSeenEventBoard";

export const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const fetchUrl = `${BASE_URL}event/detail/${eventId}`;
  const { data, error, isLoading, mutate } = useSWR(
    fetchUrl,
    async (url) => {
      const response = await fetch(url).then((res) => res.json());
      return response as eventDetailType | null;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!data || error) return null;
  return (
    !isLoading && (
      <Box>
        <Typography variant="h4" fontWeight="bold">
          {data.event.title}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="h6">イベントの説明</Typography>
        <Divider sx={{ marginBottom: 0.5 }} />
        <Box marginX={1} marginBottom={2} bgcolor={"#efefef"} p={1}>
          <Typography variant="caption">{data.event.description}</Typography>
        </Box>
        <Typography variant="h6">調整時間</Typography>
        <Typography variant="h6">
          スケジュール
          <Typography variant="caption">
            {`（調整時間 ${data.event.default_start_time}~${data.event.default_end_time}）`}
          </Typography>
        </Typography>
        <ScheduleTable data={data} />
        <ScheduleInsertButton data={data} mutate={mutate} />
        <PastSeenEventBoard />
      </Box>
    )
  );
};
