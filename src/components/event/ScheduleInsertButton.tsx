import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Cancel, ChangeHistory, PanoramaFishEye } from "@mui/icons-material";
import { FC, MouseEvent, useState } from "react";
import { eventDetailType, StatusId } from "../../types/eventDataType";
import { KeyedMutator } from "swr";
import { RangeTimePicker } from "../common/RangeTimePicker";
import { InsertSchedule } from "../../api/InsertSchedule";

type ScheduleInsertButtonProps = {
  data: eventDetailType;
  mutate: KeyedMutator<eventDetailType | null>;
};

export type InsertScheduleType = {
  date: string;
  status: StatusId;
  scheduleTime: { start_time: string | null; end_time: string | null }[];
};

export const ScheduleInsertButton: FC<ScheduleInsertButtonProps> = ({
  data,
}) => {
  const { event, dates } = data;
  const schedule: InsertScheduleType[] = dates.map((date) => ({
    date: date.event_date,
    status: 3,
    scheduleTime: [{ start_time: null, end_time: null }],
  }));
  const [isInsertSchedule, setIsInsertSchedule] = useState(false);

  return (
    <Box display="flex" flexDirection="column">
      <Box width="100%" display="flex" justifyContent="center">
        {!isInsertSchedule && (
          <Button
            variant="contained"
            sx={{
              marginX: "auto",
              width: "30%",
              color: "white",
              marginY: 5,
              fontWeight: "bold",
              fontSize: 16,
            }}
            onClick={() => setIsInsertSchedule(!isInsertSchedule)}
          >
            スケジュールを入力する
          </Button>
        )}
      </Box>
      {isInsertSchedule && (
        <Box marginTop={5}>
          <ScheduleForm
            eventId={event.event_id}
            schedule={schedule}
            defaultStartTime={event.default_start_time}
            defaultEndTime={event.default_end_time}
          />
        </Box>
      )}
    </Box>
  );
};

type ScheduleFormProps = {
  eventId: string;
  schedule: InsertScheduleType[];
  defaultStartTime: string;
  defaultEndTime: string;
};

const ScheduleForm: FC<ScheduleFormProps> = ({
  eventId,
  schedule,
  defaultStartTime,
  defaultEndTime,
}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [tempSchedule, setTempSchedule] = useState(schedule);
  console.log(tempSchedule);
  const handleInsertSchedule = () => {
    InsertSchedule(eventId, name, tempSchedule, comment);
  };

  return (
    <Box sx={{ marginX: "20%", bgcolor: "#fff", padding: 2 }}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h5">スケジュールを入力</Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">名前</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: "100%", bgcolor: "#fff" }}
        />
      </Box>
      <Typography variant="h6">出欠を入力</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow key="header" sx={{ backgroundColor: "#efefef" }}>
              <TableCell width="160px">日付</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>詳細時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tempSchedule.map((s) => (
              <ScheduleFormRow
                key={s.date}
                date={s.date}
                status={s.status}
                setSchedule={(schedule) => {
                  const newSchedule = tempSchedule.map((ts) =>
                    ts.date === s.date ? schedule : ts
                  );
                  setTempSchedule(newSchedule);
                }}
                scheduleTime={s.scheduleTime}
                defaultStartTime={defaultStartTime}
                defaultEndTime={defaultEndTime}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{ marginBottom: 3 }} />
      <Box>
        <Typography variant="h6">コメント</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ width: "100%", bgcolor: "#fff" }}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={handleInsertSchedule}
          sx={{ color: "#fff", fontWeight: "bold", fontSize: 20, marginTop: 2 }}
        >
          スケジュールを入力する
        </Button>
      </Box>
    </Box>
  );
};

type ScheduleFormRowProps = {
  date: string;
  status: StatusId;
  scheduleTime: { start_time: string | null; end_time: string | null }[];
  setSchedule: (schedule: InsertScheduleType) => void;
  defaultStartTime: string;
  defaultEndTime: string;
};

const ScheduleFormRow: FC<ScheduleFormRowProps> = ({
  date,
  status,
  scheduleTime,
  setSchedule,
  defaultStartTime,
  defaultEndTime,
}) => {
  const handleToggle = (_: MouseEvent<HTMLElement>, value: StatusId) => {
    const newScheduleTime =
      value === 3
        ? [{ start_time: null, end_time: null }]
        : value === 1
        ? [{ start_time: defaultStartTime, end_time: defaultEndTime }]
        : scheduleTime;
    setSchedule({ date, status: value, scheduleTime: newScheduleTime });
  };
  return (
    <TableRow key={date}>
      <TableCell>
        <Typography>{date}</Typography>
      </TableCell>
      <TableCell>
        {/* TODO: 見た目キモいから、自作に置き換える */}
        <ToggleButtonGroup
          value={status}
          exclusive
          onChange={handleToggle}
          color="primary"
        >
          <ToggleButton
            value={1}
            sx={{
              marginX: 1,
              outline: 1,
              outlineColor: "lightgray",
              borderRadius: 1,
            }}
          >
            <PanoramaFishEye />
          </ToggleButton>
          <ToggleButton
            value={2}
            sx={{
              marginX: 1,
              outline: 1,
              outlineColor: "lightgray",
              borderRadius: 1,
            }}
          >
            <ChangeHistory />
          </ToggleButton>
          <ToggleButton
            value={3}
            sx={{
              marginX: 1,
              outline: 1,
              outlineColor: "lightgray",
              borderRadius: 1,
            }}
          >
            <Cancel />
          </ToggleButton>
        </ToggleButtonGroup>
      </TableCell>
      <TableCell>
        {scheduleTime.map((t, index) => {
          return (
            <RangeTimePicker
              key={index}
              startTime={t.start_time ?? ""}
              endTime={t.end_time ?? ""}
              setStartTime={(time) =>
                setSchedule({
                  date,
                  status,
                  scheduleTime: scheduleTime.map((st, i) =>
                    i === index ? { ...st, start_time: time } : st
                  ),
                })
              }
              setEndTime={(time) =>
                setSchedule({
                  date,
                  status,
                  scheduleTime: scheduleTime.map((st, i) =>
                    i === index ? { ...st, end_time: time } : st
                  ),
                })
              }
              disabled={status === 3 || status === 1}
            />
          );
        })}
      </TableCell>
    </TableRow>
  );
};
