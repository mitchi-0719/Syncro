import { Box, Divider, Typography } from "@mui/material";
import { EventBoard } from "./EventBoard";
import { getCreatorIdList } from "../../function/localStorage/creatorIdList";
import useSWR from "swr";
import { BASE_URL } from "../../constants/const";
import { isNullOrUndefinedOrEmptyArray } from "../../function/isNullOrUndefined";

type Props = {
  currentEventid?: string;
};

export const CreatedEventBoard = ({ currentEventid }: Props) => {
  const creatorIdList = getCreatorIdList();

  const {
    data: eventIdList,
    error,
    isLoading,
  } = useSWR(
    `${BASE_URL}event/creator`,
    async (url) => {
      const fetchUrlParams = new URLSearchParams();
      creatorIdList.forEach((creatorId) => {
        fetchUrlParams.append("creatorId", creatorId);
      });
      const fetchUrl = `${url}?${fetchUrlParams.toString()}`;

      const response = await fetch(fetchUrl, {
        method: "GET",
      }).then((res) => res.json());
      return (response?.eventIdList ?? []) as string[];
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error || isLoading || isNullOrUndefinedOrEmptyArray(eventIdList)) {
    return null;
  }

  return (
    <Box marginY={4}>
      <Typography variant="h5">作成したイベント</Typography>
      <Divider sx={{ marginBottom: 1 }} />
      <EventBoard
        eventIdList={eventIdList}
        notDisplayEventId={currentEventid}
      />
    </Box>
  );
};
