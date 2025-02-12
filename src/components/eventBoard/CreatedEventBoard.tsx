import { Box } from "@mui/material";
import { useMemo } from "react";
import useSWR from "swr";
import { BASE_URL } from "../../constants/const";
import { isEqualArray } from "../../util/isEqualArray";
import { isNullOrUndefinedOrEmptyArray } from "../../util/isNullOrUndefined";
import { getCreatorIdList } from "../../function/localStorage/creatorIdList";
import { swrFetcher } from "../../util/swrFetcher";
import { TypographyWithDivider } from "../common/TypographyWithDivider";
import { EventBoard } from "./EventBoard";

type Props = {
  currentEventid?: string;
};

type EventIdListType = {
  eventIdList: string[];
};

export const CreatedEventBoard = ({ currentEventid }: Props) => {
  const creatorIdList = getCreatorIdList();
  const fetchUrl = useMemo(() => {
    const fetchUrlParams = new URLSearchParams();
    creatorIdList.forEach((creatorId) => {
      fetchUrlParams.append("creator_id", creatorId);
    });

    return `${BASE_URL}events/created-events?${fetchUrlParams.toString()}`;
  }, [creatorIdList]);

  const {
    data: eventIdList,
    error,
    isLoading,
  } = useSWR(fetchUrl, swrFetcher<EventIdListType | null>);

  if (
    error ||
    isNullOrUndefinedOrEmptyArray(eventIdList?.eventIdList) ||
    isEqualArray(eventIdList?.eventIdList ?? [], [currentEventid], true)
  ) {
    return null;
  }

  return (
    !isLoading && (
      <Box marginY={4}>
        <TypographyWithDivider TypographyProps={{ variant: "h5" }}>
          作成したイベント
        </TypographyWithDivider>
        <EventBoard
          eventIdList={eventIdList?.eventIdList ?? []}
          notDisplayEventId={currentEventid}
        />
      </Box>
    )
  );
};
