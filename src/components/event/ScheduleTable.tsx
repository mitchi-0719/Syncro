import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { eventDetailType } from "../../types/eventDataType";
import { convertDate } from "../../function/convertDate";
import { ScheduleTableRow } from "./ScheduleTableRow";

type ScheduleTableProps = {
  data: eventDetailType;
  displayTime: boolean;
};

export const ScheduleTable = ({ data, displayTime }: ScheduleTableProps) => {
  const { dates, users, schedules } = data;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ borderBottom: 3, borderColor: "grey.300" }}>
            <TableCell sx={{ borderRight: 3, borderColor: "grey.300" }} />
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
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <ScheduleTableRow
              key={user.user_id}
              dates={dates}
              user={user}
              schedules={schedules}
              displayTime={displayTime}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
