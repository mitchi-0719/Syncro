import { Delete, OpenInNew } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";

type EventCardProp = {
  eventTitle: string;
  eventDescription: string;
  createDate: string;
  lastUpdateDate: string;
  writeCount: number;
  isAdmin?: boolean;
};

export const EventCard = ({
  eventTitle,
  eventDescription,
  createDate,
  lastUpdateDate,
  writeCount,
  isAdmin,
}: EventCardProp) => {
  return (
    <Card sx={{ m: 1 }}>
      <CardHeader title={eventTitle} subheader={eventDescription} />
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box>作成日: {createDate}</Box>
            <Box>最終更新日: {lastUpdateDate}</Box>
            <Box>投稿数: {writeCount}</Box>
          </Box>
          <CardActions>
            <Button size="small" color="primary">
              開く
              <OpenInNew />
            </Button>
            {isAdmin && (
              <Button size="small" color="primary">
                削除
                <Delete />
              </Button>
            )}
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};
