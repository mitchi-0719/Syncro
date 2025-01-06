import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DatePicker, TimePicker } from "../common";
import { createEvent } from "../../api/createEvent";
import { compareDate } from "../../function/compareDate";
import { useNavigate } from "react-router-dom";
import { setSeenEventIdList } from "../../function/localStorage/seenEventIdList";
import { setCreatorIdList } from "../../function/localStorage/creatorIdList";

export const EventCreator = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectDates, setSelectDates] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("22:00");

  const handleClick = () => {
    const eventDates = selectDates.map((date) => ({
      eventDate: date,
    }));
    createEvent(title, description, startTime, endTime, eventDates)
      .then((res) => {
        const eventId = res.eventId;
        const creatorId = res.creatorId;
        setSeenEventIdList(eventId);
        setCreatorIdList(creatorId);
        navigate(`/event/${eventId}`);
      })
      .catch()
      .finally(() => {});
  };

  return (
    <Box
      height="440px"
      mx="auto"
      p={1}
      bgcolor={"#efefef"}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
    >
      <Box display="flex" justifyContent="space-around" marginX={10} gap={3}>
        <Box display="flex" flexDirection="column" flex="1" gap={1}>
          <Box>
            <Typography variant="h6">イベント名</Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例) お誕生日会"
              sx={{ bgcolor: "#fff", width: "100%" }}
            />
          </Box>
          <Box>
            <Typography variant="h6">イベントの説明</Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <TextField
              value={description}
              multiline
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例) お誕生日会を開催します。"
              sx={{
                bgcolor: "#fff",
                width: "100%",
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
            />
          </Box>
        </Box>
        <Box flex="1">
          <Box>
            <Typography variant="h6">調整する時間範囲</Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Box display="flex" alignItems="center">
              <TimePicker value={startTime} onChange={setStartTime} />
              〜
              <TimePicker value={endTime} onChange={setEndTime} />
            </Box>
          </Box>
          <Typography>選択された日付</Typography>
          <Box
            sx={{
              width: "100%",
              height: "60%",
            }}
          >
            <TextField
              value={selectDates.join("\n")}
              sx={{
                bgcolor: "#fff",
                height: "100%",
                width: "100%",
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
        <Box flex="1">
          <Typography>日付を選択してください。</Typography>
          <DatePicker
            value={selectDates}
            onChange={(s) => setSelectDates(s.sort())}
            minDate={new Date().toISOString().split("T")[0]}
          />
        </Box>
      </Box>
      <Box width="100%" display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          size="large"
          sx={{ width: "80%", color: "#fff", fontWeight: "bold", fontSize: 24 }}
          disabled={
            !title ||
            selectDates.length === 0 ||
            compareDate(startTime, endTime) === -1
          }
          onClick={handleClick}
        >
          イベントを作成する
        </Button>
      </Box>
    </Box>
  );
};
