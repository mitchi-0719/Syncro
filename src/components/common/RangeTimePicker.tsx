import { Box, SxProps, TextField, Theme, Typography } from "@mui/material";
import { FC, useState } from "react";

type RangeTimePickerProps = {
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  minTime?: string;
  maxTime?: string;
  disabled?: boolean;
  boxSx?: SxProps<Theme>;
  timePickerSx?: SxProps<Theme>;
};

export const RangeTimePicker: FC<RangeTimePickerProps> = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  minTime,
  maxTime,
  disabled,
  boxSx,
  timePickerSx,
}) => {
  const [error, setError] = useState<string | null>(null);

  const isInTimeRange = (time: string) => {
    if (!minTime || !maxTime) return true;
    return minTime <= time && time <= maxTime;
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    if (!isInTimeRange(newStartTime)) {
      setError("調整時間の範囲外です");
      return;
    } else if (newStartTime > endTime) {
      setError("開始時間は終了時間より前にしてください");
    } else {
      setError(null);
    }
    setStartTime(newStartTime);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    if (!isInTimeRange(newEndTime)) {
      setError("調整時間の範囲外です");
      return;
    } else if (startTime > newEndTime) {
      setError("終了時間は開始時間より後にしてください");
    } else {
      setError(null);
    }
    setEndTime(newEndTime);
  };

  return (
    <Box display="flex" flexDirection="column" sx={boxSx}>
      <Box display="flex" alignItems="center" gap={1}>
        <TextField
          className="start-time"
          value={startTime}
          type="time"
          size="small"
          onChange={handleStartChange}
          disabled={disabled}
          sx={timePickerSx}
          error={!!error}
        />
        〜
        <TextField
          className="end-time"
          value={endTime}
          type="time"
          size="small"
          onChange={handleEndChange}
          disabled={disabled}
          sx={timePickerSx}
          error={!!error}
        />
      </Box>
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Box>
  );
};
