import {
  AddCircle,
  Cancel,
  ChangeHistory,
  PanoramaFishEye,
  RemoveCircle,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
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
import { FC, MouseEvent, useState } from "react";
import { KeyedMutator } from "swr";
import { InsertSchedule } from "../../api/InsertSchedule";
import { EventDetailType, StatusId } from "../../types/EventDataType";
import { RangeTimePicker } from "../common/RangeTimePicker";
import { TypographyWithDivider } from "../common/TypographyWithDivider";

type ScheduleInsertButtonProps = {
  data: EventDetailType;
  mutate: KeyedMutator<EventDetailType | null>;
};

export type InsertScheduleType = {
  date: string;
  status: StatusId;
  scheduleTime: { start_time: string | null; end_time: string | null }[];
};

export const ScheduleInsertButton: FC<ScheduleInsertButtonProps> = ({
  data,
  mutate,
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
            mutate={mutate}
            onClose={() => setIsInsertSchedule(false)}
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
  mutate: KeyedMutator<EventDetailType | null>;
  onClose: () => void;
};

const ScheduleForm: FC<ScheduleFormProps> = ({
  eventId,
  schedule,
  defaultStartTime,
  defaultEndTime,
  mutate,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [tempSchedule, setTempSchedule] = useState(schedule);
  const handleInsertSchedule = () => {
    InsertSchedule(eventId, name, tempSchedule, comment).then(() => {
      mutate();
      onClose();
    });
  };

  return (
    <Box sx={{ marginX: "20%", bgcolor: "#fff", padding: 2 }}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h5">スケジュールを入力</Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TypographyWithDivider
          TypographyProps={{ variant: "h6" }}
          DividerProps={{ sx: { marginBottom: 2 } }}
        >
          名前
        </TypographyWithDivider>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Box>
      <TypographyWithDivider
        TypographyProps={{ variant: "h6" }}
        DividerProps={{ sx: { marginBottom: 2 } }}
      >
        出欠を入力
      </TypographyWithDivider>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow key="header" sx={{ backgroundColor: "#efefef" }}>
              <TableCell width="160px">日付</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>
                詳細時間
                <Typography variant="caption">{`（${defaultStartTime}~${defaultEndTime}）`}</Typography>
              </TableCell>
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
        <TypographyWithDivider
          TypographyProps={{ variant: "h6" }}
          DividerProps={{ sx: { marginBottom: 2 } }}
        >
          コメント
        </TypographyWithDivider>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          sx={{ width: "100%" }}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={handleInsertSchedule}
          disabled={name === ""}
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
  const [error, setError] = useState<string | null>(null);
  const handleToggle = (_: MouseEvent<HTMLElement>, value: StatusId) => {
    const newScheduleTime =
      value === 3
        ? [{ start_time: null, end_time: null }]
        : value === 1
        ? [{ start_time: defaultStartTime, end_time: defaultEndTime }]
        : scheduleTime;
    setSchedule({ date, status: value, scheduleTime: newScheduleTime });
  };

  const handleAddTime = () => {
    if (scheduleTime.length >= 3) return;
    if (
      scheduleTime.some((t) => t.start_time === null || t.end_time === null)
    ) {
      setError("時間を入力してください");
      return;
    }
    setSchedule({
      date,
      status,
      scheduleTime: [...scheduleTime, { start_time: null, end_time: null }],
    });
    setError(null);
  };

  const handleDeleteTime = () => {
    if (scheduleTime.length <= 1) return;
    const newScheduleTime = scheduleTime.slice(0, -1);
    setSchedule({
      date,
      status,
      scheduleTime: newScheduleTime,
    });
    setError(null);
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
        <Box display="flex">
          <Box display="flex" flexDirection="column" gap={1}>
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
                  minTime={defaultStartTime}
                  maxTime={defaultEndTime}
                  disabled={status === 3 || status === 1}
                />
              );
            })}
            {error && (
              <Typography color="error" variant="caption">
                {error}
              </Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton
              color="primary"
              disabled={status !== 2 || scheduleTime.length >= 3}
              onClick={handleAddTime}
            >
              <AddCircle />
            </IconButton>
            <IconButton
              color="primary"
              disabled={status !== 2 || scheduleTime.length <= 1}
              onClick={handleDeleteTime}
            >
              <RemoveCircle />
            </IconButton>
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
};
