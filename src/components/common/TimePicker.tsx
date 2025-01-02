import React, { useState } from "react";
import { Box, Menu, MenuItem, TextField, Typography } from "@mui/material";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  hourRange?: [number, number];
  minuteRange?: [number, number];
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value = "12:00",
  onChange,
  hourRange = [0, 23],
  minuteRange = [0, 59],
}) => {
  const [selectedTime, setSelectedTime] = useState(value);
  const [hour, setHour] = useState(parseInt(value.split(":")[0], 10));
  const [minute, setMinute] = useState(parseInt(value.split(":")[1], 10));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTimeChange = (newHour: number, newMinute: number) => {
    const formattedTime = `${String(newHour).padStart(2, "0")}:${String(
      newMinute
    ).padStart(2, "0")}`;
    setSelectedTime(formattedTime);
    onChange?.(formattedTime);
  };

  const handleHourScroll = (delta: number) => {
    let newHour = hour + delta;
    if (newHour > hourRange[1]) newHour = hourRange[0];
    if (newHour < hourRange[0]) newHour = hourRange[1];
    setHour(newHour);
    handleTimeChange(newHour, minute);
  };

  const handleMinuteScroll = (delta: number) => {
    let newMinute = minute + delta;
    if (newMinute > minuteRange[1]) newMinute = minuteRange[0];
    if (newMinute < minuteRange[0]) newMinute = minuteRange[1];
    setMinute(newMinute);
    handleTimeChange(hour, newMinute);
  };

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    // TODO:: スマホで使えない
    <Box width={80} bgcolor={"#fff"} borderRadius={1}>
      <TextField
        value={selectedTime}
        onClick={openMenu}
        sx={{ width: "100%" }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        MenuListProps={{
          style: {
            display: "flex",
            flexDirection: "row",
          },
        }}
        PaperProps={{
          style: {
            maxHeight: "200px",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "200px",
            overflow: "hidden",
          }}
        >
          {[hour - 2, hour - 1, hour, hour + 1, hour + 2]
            .map((h) =>
              h < hourRange[0] ? h + 24 : h > hourRange[1] ? h - 24 : h
            )
            .map((h, index) => (
              <MenuItem
                key={index}
                onWheel={(e) => handleHourScroll((e.deltaY < 0 ? -1 : 1) * 2)}
                onClick={closeMenu}
                sx={{
                  userSelect: "none",
                  fontSize: h === hour ? "24px" : "16px",
                  opacity: h === hour ? 1 : 0.5,
                }}
              >
                {String(h).padStart(2, "0")}
              </MenuItem>
            ))}
        </Box>
        <Typography
          sx={{ alignSelf: "center", fontSize: "24px", lineHeight: "32px" }}
        >
          :
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "200px",
            overflow: "hidden",
          }}
        >
          {[minute - 2, minute - 1, minute, minute + 1, minute + 2]
            .map((m) =>
              m < minuteRange[0] ? m + 60 : m > minuteRange[1] ? m - 60 : m
            )
            .map((m, index) => (
              <MenuItem
                key={index}
                onWheel={(e) => handleMinuteScroll(e.deltaY < 0 ? -1 : 1)}
                onClick={closeMenu}
                sx={{
                  userSelect: "none",
                  fontSize: m === minute ? "24px" : "16px",
                  opacity: m === minute ? 1 : 0.5,
                }}
              >
                {String(m).padStart(2, "0")}
              </MenuItem>
            ))}
        </Box>
      </Menu>
    </Box>
  );
};
