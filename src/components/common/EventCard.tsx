import { OpenInNew } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import { eventOverviewType } from "../../types/eventDataType";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/const";

type EventCardProp = {
  eventId: string;
};

export const EventCard = ({ eventId }: EventCardProp) => {
  const navigate = useNavigate();

  const fetchUrl = `${BASE_URL}event/overview/${eventId}`;
  const { data, error, isLoading } = useSWR(fetchUrl, async (url) => {
    const response = await fetch(url).then((res) => res.json());
    return response as eventOverviewType | null;
  });
  if (!data || error) return null;

  const { title: eventTitle, create_at: createDate } = data;
  return (
    !isLoading && (
      <Card sx={{ width: "240px", m: 1 }}>
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
            paddingBottom: 0,
          }}
        >
          <Typography variant="body2">作成日: {createDate}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => navigate(`/event/${eventId}`)}
            endIcon={<OpenInNew />}
          >
            開く
          </Button>
        </CardActions>
      </Card>
    )
  );
};
