import { Box, Divider, Typography } from "@mui/material";
import { EventCreator } from "../components/Top/EventCreator";
import { PastSeenEventBoard } from "../components/eventBoard/PastSeenEventBoard";

export const Top = () => {
  return (
    <Box marginX={10} marginY={4}>
      <Typography variant="h5">イベントを作成する</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <EventCreator />
      <PastSeenEventBoard />
    </Box>
  );
};
