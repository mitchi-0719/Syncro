import { Box, Typography } from "@mui/material";
import { EventCreator } from "../components/Top/EventCreator";
import { EventBoard } from "../components/common";
import { getSeenEventIdList } from "../function/getSeenEventIdList";

export const Top = () => {
  const seenEventIdList = getSeenEventIdList();
  return (
    <Box marginY={4}>
      <Typography>イベントを作成する</Typography>
      <EventCreator />
      <Typography>過去に開いたイベント</Typography>
      <EventBoard eventIdList={seenEventIdList} />
    </Box>
  );
};
