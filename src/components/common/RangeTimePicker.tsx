import { Box, TextField } from "@mui/material";
import { FC } from "react";

type RangeTimePickerProps = {
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  disabled?: boolean;
};

export const RangeTimePicker: FC<RangeTimePickerProps> = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  disabled,
}) => {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        value={startTime}
        type="time"
        size="small"
        onChange={handleStartChange}
        disabled={disabled}
      />
      〜
      <TextField
        value={endTime}
        type="time"
        size="small"
        onChange={handleEndChange}
        disabled={disabled}
      />
    </Box>
  );
};
