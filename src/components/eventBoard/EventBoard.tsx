import { Box } from "@mui/material";
import { EventId } from "../../types/eventDataType";
import { EventCard } from "./EventCard";

type Props = {
  eventIdList: EventId[];
};

export const EventBoard = ({ eventIdList }: Props) => {
  return (
    <Box display="flex" mx="auto" bgcolor={"#efefef"} p={1}>
      {eventIdList.reverse().map((eventId) => (
        <EventCard key={eventId} eventId={eventId} />
      ))}
    </Box>
  );
};
