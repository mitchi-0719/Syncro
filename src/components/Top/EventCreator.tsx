import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "../common";
import { createEvent } from "../../api/createEvent";
import { useNavigate } from "react-router-dom";
import { setSeenEventIdList } from "../../function/localStorage/seenEventIdList";
import { setCreatorIdList } from "../../function/localStorage/creatorIdList";
import { RangeTimePicker } from "../common/RangeTimePicker";
import { compareTime } from "../../function/dateTime/compareTime";
import { TypographyWithDivider } from "../common/TypographyWithDivider";

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
            <TypographyWithDivider
              TypographyProps={{ variant: "h6" }}
              DividerProps={{ sx: { marginBottom: 2 } }}
            >
              イベント名
            </TypographyWithDivider>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例) お誕生日会"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box>
            <TypographyWithDivider
              TypographyProps={{ variant: "h6" }}
              DividerProps={{ sx: { marginBottom: 2 } }}
            >
              イベントの説明
            </TypographyWithDivider>
            <TextField
              value={description}
              multiline
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例) お誕生日会を開催します。"
              sx={{
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
            <TypographyWithDivider
              TypographyProps={{ variant: "h6" }}
              DividerProps={{ sx: { marginBottom: 2 } }}
            >
              調整する時間範囲
            </TypographyWithDivider>
            <RangeTimePicker
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              boxSx={{ gap: 2 }}
              timePickerSx={{ bgcolor: "#fff" }}
            />
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
          sx={{ width: "80%", fontWeight: "bold", fontSize: 24 }}
          disabled={
            !title ||
            selectDates.length === 0 ||
            compareTime(startTime, endTime) === -1
          }
          onClick={handleClick}
        >
          イベントを作成する
        </Button>
      </Box>
    </Box>
  );
};
