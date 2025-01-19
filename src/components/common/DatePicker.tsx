import { FC, useState } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Tokyo");

interface DatePickerProps {
  value?: string[];
  onChange?: (selectedDates: string[]) => void;
  minDate?: string;
  maxDate?: string;
}

export const DatePicker: FC<DatePickerProps> = ({
  value = [],
  onChange,
  minDate,
  maxDate,
}) => {
  const weekConst = ["日", "月", "火", "水", "木", "金", "土"];
  const [currentDate, setCurrentDate] = useState(dayjs.tz());
  const [selectedDates, setSelectedDates] = useState<Set<string>>(
    new Set(value)
  );

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  const daysInMonth = Array.from({ length: endOfMonth.date() }, (_, i) =>
    startOfMonth.add(i, "day")
  );

  const handlePrevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };

  const handleDateClick = (date: string) => {
    if (
      (minDate && dayjs(date).isBefore(minDate, "day")) ||
      (maxDate && dayjs(date).isAfter(maxDate, "day"))
    ) {
      return;
    }

    setSelectedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      const selectedArray = Array.from(newSet);
      onChange?.(selectedArray);
      return newSet;
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        width: "100%",
        margin: "auto",
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: 0.5,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          size="small"
          color="secondary"
          onClick={handlePrevMonth}
          startIcon={<KeyboardDoubleArrowLeft />}
          disabled={
            !!minDate && currentDate.startOf("month").isBefore(minDate, "day")
          }
        >
          前月
        </Button>
        <Typography variant="h6">
          {currentDate.format("YYYY年 MM月")}
        </Typography>
        <Button
          size="small"
          color="secondary"
          onClick={handleNextMonth}
          endIcon={<KeyboardDoubleArrowRight />}
          disabled={
            !!maxDate && currentDate.endOf("month").isAfter(maxDate, "day")
          }
        >
          翌月
        </Button>
      </Box>
      <Grid container columns={7} sx={{ mb: 1 }}>
        {weekConst.map((day) => (
          <Grid item xs={1} key={day}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: 12,
                width: 24,
                height: 24,
                margin: "0 auto",
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container columns={7}>
        {Array.from({ length: startOfMonth.day() }).map((_, i) => (
          <Grid item xs={1} key={`empty-${i}`} />
        ))}
        {daysInMonth.map((day) => {
          const dateStr = day.format("YYYY-MM-DD");
          const isSelected = selectedDates.has(dateStr);
          const isDisabled =
            (minDate && day.isBefore(minDate, "day")) ||
            (maxDate && day.isAfter(maxDate, "day"));

          return (
            <Grid item xs={1} key={dateStr}>
              <Box
                onClick={() => !isDisabled && handleDateClick(dateStr)}
                sx={{
                  padding: "8px",
                  fontSize: 12,
                  borderRadius: 5,
                  textAlign: "center",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  bgcolor: isSelected
                    ? "secondary.main"
                    : isDisabled
                    ? "#f0f0f0"
                    : "transparent",
                  color: isSelected ? "#fff" : isDisabled ? "#ccc" : "inherit",
                  "&:hover": {
                    bgcolor: isDisabled
                      ? "#f0f0f0"
                      : isSelected
                      ? "secondary.main"
                      : "secondary.light",
                    color: isDisabled ? "#ccc" : "#fff",
                  },
                }}
              >
                {day.date()}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
