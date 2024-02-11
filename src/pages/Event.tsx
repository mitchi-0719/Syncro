import { useParams } from "react-router-dom";

export const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  return <div>Event: {eventId}</div>;
};
