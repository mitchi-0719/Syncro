import { Box } from "@mui/material";
import { EventCreator } from "../components/Top/EventCreator";
import { PastSeenEventBoard } from "../components/eventBoard/PastSeenEventBoard";
import { CreatedEventBoard } from "../components/eventBoard/CreatedEventBoard";
import { TypographyWithDivider } from "../components/common/TypographyWithDivider";

export const Top = () => {
  return (
    <Box marginX={10} marginY={4}>
      <TypographyWithDivider
        TypographyProps={{ variant: "h5" }}
        DividerProps={{ sx: { marginBottom: 2 } }}
      >
        イベントを作成する
      </TypographyWithDivider>
      <EventCreator />
      <PastSeenEventBoard />
      <CreatedEventBoard />
    </Box>
  );
};
