import { Box, Typography } from "@mui/material";
import { EventCreator } from "../components/Top/EventCreator";
import { EventBoard } from "../components/common/EventBoard";

export const Top = () => {
  return (
    <Box>
      <Typography>イベントを作成する</Typography>
      <EventCreator />
      <Typography>過去に開いたイベント</Typography>
      <EventBoard />
    </Box>
  );
};
