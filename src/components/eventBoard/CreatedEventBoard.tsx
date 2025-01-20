import { Box } from "@mui/material";
import { EventBoard } from "./EventBoard";
import { getCreatorIdList } from "../../function/localStorage/creatorIdList";
import useSWR from "swr";
import { BASE_URL } from "../../constants/const";
import { isNullOrUndefinedOrEmptyArray } from "../../function/isNullOrUndefined";
import { isEqualArray } from "../../function/isEqualArray";
import { TypographyWithDivider } from "../common/TypographyWithDivider";
import { useMemo } from "react";
import { swrFetcher } from "../../util/swrFetcher";

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
      fetchUrlParams.append("creatorId", creatorId);
    });

    return `${BASE_URL}event/creator?${fetchUrlParams.toString()}`;
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
