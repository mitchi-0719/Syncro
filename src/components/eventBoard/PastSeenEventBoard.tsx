import { Box } from "@mui/material";
import { EventBoard } from "./EventBoard";
import { getSeenEventIdList } from "../../function/localStorage/seenEventIdList";
import { isEqualArray } from "../../function/isEqualArray";
import { isNullOrUndefinedOrEmptyArray } from "../../function/isNullOrUndefined";
import { TypographyWithDivider } from "../common/TypographyWithDivider";

type Props = {
  currentEventid?: string;
};

export const PastSeenEventBoard = ({ currentEventid }: Props) => {
  const seenEventIdList = getSeenEventIdList();

  if (
    isNullOrUndefinedOrEmptyArray(seenEventIdList) ||
    isEqualArray(seenEventIdList, [currentEventid], true)
  ) {
    return null;
  }
  return (
    <Box marginY={4}>
      <TypographyWithDivider TypographyProps={{ variant: "h5" }}>
        過去に開いたイベント
      </TypographyWithDivider>
      <EventBoard
        eventIdList={seenEventIdList}
        notDisplayEventId={currentEventid}
      />
    </Box>
  );
};
