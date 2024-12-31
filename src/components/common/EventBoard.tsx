import { Box } from "@mui/material";
import { EventCard } from "./EventCard";
import { EventId } from "../../types/eventDataType";

type Props = {
  eventIdList: EventId[];
};

export const EventBoard = ({ eventIdList }: Props) => {
  return (
    <Box display="flex" mx="auto" bgcolor="#e6f0f0">
      {eventIdList?.map((eventId) => (
        <EventCard key={eventId} eventId={eventId} />
      ))}
    </Box>
  );
};
