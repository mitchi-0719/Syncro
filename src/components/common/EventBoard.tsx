import { Box } from "@mui/material";
import { dummyEventData, dummyUserSchedule } from "../../dummyData/evnet1";
import { EventCard } from "./EventCard";

export const EventBoard = () => {
  const eventData = dummyEventData;
  const userSchedule = dummyUserSchedule;

  return (
    <Box display="flex" mx="auto" bgcolor="#e6f0f0">
      <EventCard {...eventData} writeCount={userSchedule.length} />
    </Box>
  );
};
