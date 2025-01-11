import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { EventDetailType, ScheduleType } from "../../types/EventDataType";
import { convertDate } from "../../function/dateTime/convertDate";
import { ScheduleTableRow } from "./ScheduleTableRow";

type ScheduleTableProps = {
  data: EventDetailType;
};

export const ScheduleTable = ({ data }: ScheduleTableProps) => {
  const { dates, users, schedules } = data;
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table>
        <TableHead sx={{ borderBottom: 3, borderColor: "grey.300" }}>
          <TableRow>
            <TableCell
              sx={{ borderRight: 3, borderColor: "grey.300" }}
              rowSpan={2}
            />
            {dates.map((date) => (
              <TableCell
                key={date.event_date}
                sx={{
                  textAlign: "center",
                  borderLeft: 1,
                  borderRight: 1,
                  borderColor: "grey.300",
                }}
              >
                {convertDate(date.event_date)}
              </TableCell>
            ))}
            <TableCell sx={{ textAlign: "center" }} rowSpan={2}>
              コメント
            </TableCell>
          </TableRow>
          <TableRow>
            {dates.map((date) => (
              <TableCell
                key={date.event_date}
                sx={{
                  textAlign: "center",
                  borderLeft: 1,
                  borderRight: 1,
                  borderColor: "grey.300",
                }}
              >
                <Typography variant="body2" fontSize={12}>
                  {date.date_memo ? date.date_memo : "-"}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <ScheduleTableRow
              key={user.user_id}
              dates={dates}
              user={user}
              schedules={schedules}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              sx={{ borderTop: 3, borderRight: 3, borderColor: "grey.300" }}
            />
            {dates.map((date) => (
              <TableCell
                key={date.event_date}
                sx={{
                  textAlign: "center",
                  borderLeft: 1,
                  borderRight: 1,
                  borderTop: 3,
                  borderColor: "grey.300",
                }}
              >
                <Typography variant="body2" fontSize={12}>
                  {summarize(schedules, date.event_date)}
                </Typography>
              </TableCell>
            ))}
            <TableCell sx={{ borderTop: 3, borderColor: "grey.300" }} />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

const summarize = (schedules: ScheduleType[], date: string) => {
  const result = {
    1: 0,
    2: 0,
    3: 0,
  };
  schedules
    .filter((s) => s.event_date === date)
    .forEach((s) => {
      result[s.status_id] += 1;
    });

  return `◯:${result[1]} / △:${result[2]} / ×:${result[3]}`;
};
