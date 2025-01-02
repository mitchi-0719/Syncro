import { Box, Divider, Typography } from "@mui/material";
import { getSeenEventIdList } from "../../function/getSeenEventIdList";
import { EventBoard } from "./EventBoard";

export const PastSeenEventBoard = () => {
  const seenEventIdList = getSeenEventIdList();
  return (
    <Box marginY={4}>
      <Typography variant="h5">過去に開いたイベント</Typography>
      <Divider sx={{ marginBottom: 1 }} />
      <EventBoard eventIdList={seenEventIdList} />
    </Box>
  );
};
