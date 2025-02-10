import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { EventDetailType } from "../types/EventDataType";
import { ScheduleInsertButton, ScheduleTable } from "../components/event";
import { BASE_URL } from "../constants/const";
import { PastSeenEventBoard } from "../components/eventBoard/PastSeenEventBoard";
import { useEffect } from "react";
import { isNotNullOrUndefined } from "../function/isNullOrUndefined";
import { setSeenEventIdList } from "../function/localStorage/seenEventIdList";
import { CreatedEventBoard } from "../components/eventBoard/CreatedEventBoard";
import { UrlCopyButton } from "../components/common/UrlCopyButton";
import { ScheduleSuggester } from "../components/suggest/ScheduleSuggester";
import { TypographyWithDivider } from "../components/common/TypographyWithDivider";
import { swrFetcher } from "../util/swrFetcher";
import { NotFound } from "./NotFound";
import { Loading } from "./Loading";

export const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const fetchUrl = `${BASE_URL}events/${eventId}/detail`;

  const { data, error, isLoading, mutate } = useSWR(
    fetchUrl,
    swrFetcher<EventDetailType | null>
  );

  useEffect(() => {
    if (isNotNullOrUndefined(eventId) && !(!data || error)) {
      setSeenEventIdList(eventId);
    }
  }, [eventId, data, error]);

  if (isLoading) return <Loading />;

  if (!data || error) return <NotFound />;
  return (
    !isLoading && (
      <Box>
        <TypographyWithDivider
          TypographyProps={{ variant: "h4", fontWeight: "bold" }}
          DividerProps={{ sx: { marginBottom: 2 } }}
        >
          {data.event.title}
        </TypographyWithDivider>
        <TypographyWithDivider
          TypographyProps={{ variant: "h6" }}
          DividerProps={{ sx: { marginBottom: 0.5 } }}
        >
          イベントの説明
        </TypographyWithDivider>
        <Box marginX={1} marginBottom={2} bgcolor={"#efefef"} p={1}>
          <Typography variant="caption" sx={{ whiteSpace: "pre-wrap" }}>
            {data.event.description}
          </Typography>
        </Box>
        <Typography variant="h6">
          スケジュール
          <Typography variant="caption">
            {`（調整時間 ${data.event.default_start_time}~${data.event.default_end_time}）`}
          </Typography>
        </Typography>
        <ScheduleTable data={data} />
        <ScheduleInsertButton data={data} mutate={mutate} />
        <ScheduleSuggester
          dates={data.dates}
          schedules={data.schedules}
          users={data.users}
        />
        <UrlCopyButton url={window.location.href} />
        <PastSeenEventBoard currentEventid={eventId} />
        <CreatedEventBoard currentEventid={eventId} />
      </Box>
    )
  );
};
