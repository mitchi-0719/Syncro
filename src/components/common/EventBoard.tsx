import { Box } from "@mui/material";
import { EventCard } from "./EventCard";

export const EventBoard = () => {
  return (
    <Box display="flex" mx="auto" bgcolor="#e6f0f0" width="95vw">
      <EventCard
        title="イベント1"
        description="イベント1の説明"
        createDate="2021/10/01"
        lastUpdateDate="2021/10/01"
        writeCount={10}
      />
    </Box>
  );
};
