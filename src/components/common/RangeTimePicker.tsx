import { Box, SxProps, TextField, Theme } from "@mui/material";
import { FC } from "react";

type RangeTimePickerProps = {
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  disabled?: boolean;
  boxSx?: SxProps<Theme>;
  timePickerSx?: SxProps<Theme>;
};

export const RangeTimePicker: FC<RangeTimePickerProps> = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  disabled,
  boxSx,
  timePickerSx,
}) => {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  return (
    <Box display="flex" alignItems="center" gap={1} sx={boxSx}>
      <TextField
        value={startTime}
        type="time"
        size="small"
        onChange={handleStartChange}
        disabled={disabled}
        sx={timePickerSx}
      />
      〜
      <TextField
        value={endTime}
        type="time"
        size="small"
        onChange={handleEndChange}
        disabled={disabled}
        sx={timePickerSx}
      />
    </Box>
  );
};
