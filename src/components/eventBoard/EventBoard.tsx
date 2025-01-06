import { Box } from "@mui/material";
import { EventId } from "../../types/eventDataType";
import { EventCard } from "./EventCard";

type Props = {
  eventIdList: EventId[];
  notDisplayEventId?: EventId;
};

export const EventBoard = ({ eventIdList, notDisplayEventId }: Props) => {
  return (
    <Box display="flex" flexWrap="wrap" mx="auto" bgcolor={"#efefef"} p={1}>
      {eventIdList.reverse().map((eventId) => {
        if (eventId === notDisplayEventId) return null;
        return <EventCard key={eventId} eventId={eventId} />;
      })}
    </Box>
  );
};
