import { Box, TextField, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

export const EventCreator = () => {
  return (
    <Box display="flex" justifyContent="space-around" mx="auto" p="1" bgcolor="#e6f0f0" width="95vw">
      <Box display="flex" flexDirection="column" justifyContent="space-around">
        <Box>
          <Typography>イベント名</Typography>
          <TextField />
        </Box>
        <Box>
          <Typography>イベントの説明</Typography>
          <TextField />
        </Box>
      </Box>
      <Box>
        <Typography>イベントの日時</Typography>
        <DateCalendar />
      </Box>
    </Box>
  );
};
