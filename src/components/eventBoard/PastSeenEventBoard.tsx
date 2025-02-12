import { Box } from "@mui/material";
import { isEqualArray } from "../../util/isEqualArray";
import { isNullOrUndefinedOrEmptyArray } from "../../util/isNullOrUndefined";
import { getSeenEventIdList } from "../../function/localStorage/seenEventIdList";
import { TypographyWithDivider } from "../common/TypographyWithDivider";
import { EventBoard } from "./EventBoard";

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
