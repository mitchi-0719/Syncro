import { Box } from "@mui/material";
import { EventCreator } from "../components/Top/EventCreator";
import { TypographyWithDivider } from "../components/common/TypographyWithDivider";
import { CreatedEventBoard } from "../components/eventBoard/CreatedEventBoard";
import { PastSeenEventBoard } from "../components/eventBoard/PastSeenEventBoard";

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
