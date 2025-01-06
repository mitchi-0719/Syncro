import { Box, Divider, Typography } from "@mui/material";
import { EventBoard } from "./EventBoard";
import { getSeenEventIdList } from "../../function/localStorage/seenEventIdList";
import { isEqualArray } from "../../function/isEqualArray";
import { isNullOrUndefinedOrEmptyArray } from "../../function/isNullOrUndefined";

type Props = {
  currentEventid?: string;
};

export const PastSeenEventBoard = ({ currentEventid }: Props) => {
  const seenEventIdList = getSeenEventIdList();

  if (
    isNullOrUndefinedOrEmptyArray(seenEventIdList) ||
    isEqualArray(seenEventIdList, [currentEventid], true)
  )
    return null;
  return (
    <Box marginY={4}>
      <Typography variant="h5">過去に開いたイベント</Typography>
      <Divider sx={{ marginBottom: 1 }} />
      <EventBoard
        eventIdList={seenEventIdList}
        notDisplayEventId={currentEventid}
      />
    </Box>
  );
};
