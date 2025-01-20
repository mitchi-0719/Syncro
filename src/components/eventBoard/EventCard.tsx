import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { BASE_URL } from "../../constants/const";
import { EventOverviewType } from "../../types/EventDataType";
import { swrFetcher } from "../../util/swrFetcher";

type EventCardProp = {
  eventId: string;
};

export const EventCard = ({ eventId }: EventCardProp) => {
  const navigate = useNavigate();

  const fetchUrl = `${BASE_URL}event/overview/${eventId}`;
  const { data, error, isLoading } = useSWR(
    fetchUrl,
    swrFetcher<EventOverviewType | null>
  );
  if (!data || error) return null;

  const { title: eventTitle, create_at: createDate } = data;
  return (
    !isLoading && (
      <Card sx={{ width: "240px", m: 1 }}>
        <CardActionArea onClick={() => navigate(`/event/${eventId}`)}>
          <CardHeader
            title={eventTitle}
            titleTypographyProps={{
              style: { fontSize: "18px", fontWeight: "bold" },
            }}
            sx={{ marginBottom: "0px", paddingBottom: "0px" }}
          />
          <Divider sx={{ marginX: 2, marginBottom: 1 }} />
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 1,
            }}
          >
            <Typography variant="body2">作成日: {createDate}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  );
};
