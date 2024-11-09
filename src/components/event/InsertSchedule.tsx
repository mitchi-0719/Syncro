import {
  Box,
  Button,
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
import { EventDataType, SelectDateType } from "../../types/eventDataType";
import { Cancel, ChangeHistory, PanoramaFishEye } from "@mui/icons-material";
import { useState } from "react";

type InsertScheduleProps = {
  data: EventDataType;
};

export const InsertSchedule = ({ data }: InsertScheduleProps) => {
  return (
    <Box>
      <Typography>名前</Typography>
      <TextField />
      <Typography>スケジュール</Typography>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>ステータス</TableCell>
            <TableCell>参加可能な時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.selectDate.map((date) => (
            <InsertScheduleInner date={date} />
          ))}
        </TableBody>
      </TableContainer>
      <Typography>コメント</Typography>
      <TextField />
      <Button>決定</Button>
    </Box>
  );
};

type InsertScheduleInnerProps = {
  date: SelectDateType;
};

const InsertScheduleInner = ({ date }: InsertScheduleInnerProps) => {
  const [status, setStatus] = useState(2);
  return (
    <TableRow key={date.date}>
      <TableCell>
        <Typography>{date.date}</Typography>
      </TableCell>
      <TableCell>
        <ToggleButtonGroup
          value={status}
          exclusive
          onChange={(_, v) => setStatus(v)}
          color="primary"
        >
          <ToggleButton
            value={0}
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
            value={1}
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
            value={2}
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
        <TextField />
      </TableCell>
    </TableRow>
  );
};
