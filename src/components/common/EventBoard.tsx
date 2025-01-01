import { Box } from "@mui/material";
import { EventCard } from "./EventCard";
import { EventId } from "../../types/eventDataType";

type Props = {
  eventIdList: EventId[];
};

export const EventBoard = ({ eventIdList }: Props) => {
  return (
    <Box display="flex" mx="auto">
      {eventIdList?.map((eventId) => (
        <EventCard key={eventId} eventId={eventId} />
      ))}
    </Box>
  );
};
