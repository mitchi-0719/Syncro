import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DatePicker, TimePicker } from "../common";
import { createEvent } from "../../api/createEvent";

export const EventCreator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectDates, setSelectDates] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("22:00");

  return (
    <Box display="flex" justifyContent="space-around" mx="auto" p="1">
      <Box display="flex" flexDirection="column" justifyContent="space-around">
        <Box>
          <Typography>イベント名</Typography>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ bgcolor: "#fff" }}
          />
        </Box>
        <Box>
          <Typography>イベントの説明</Typography>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ bgcolor: "#fff" }}
          />
        </Box>
        <Box>
          <Typography>調整する時間範囲</Typography>
          <TimePicker value={startTime} onChange={setStartTime} />
          <TimePicker value={endTime} onChange={setEndTime} />
        </Box>
      </Box>
      <Box>
        <Typography>選択された日付</Typography>
        <Box
          sx={{
            width: "100%",
            height: "240px",
            position: "relative",
          }}
        >
          <TextField
            value={selectDates.join("\n")}
            sx={{
              bgcolor: "#fff",
              height: "100%",
              "& .MuiInputBase-root": {
                height: "100%",
                alignItems: "flex-start",
              },
              "& .MuiInputBase-input": {
                height: "100%",
                overflowY: "auto",
              },
            }}
            multiline
          />
        </Box>
      </Box>
      <Box>
        <Typography>日付を選択してください。</Typography>
        <DatePicker
          value={selectDates}
          onChange={(s) => setSelectDates(s.sort())}
        />
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          const eventDates = selectDates.map((date) => ({
            eventDate: date,
          }));
          createEvent(title, description, startTime, endTime, eventDates);
        }}
      >
        イベントを作成する
      </Button>
    </Box>
  );
};
