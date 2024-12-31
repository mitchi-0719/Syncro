import { ChangeHistory, Clear, PanoramaFishEye } from "@mui/icons-material";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { dateType, scheduleType, userType } from "../../types/eventDataType";
import { FC } from "react";

type ScheduleTableRowProp = {
  dates: Array<dateType>;
  user: userType;
  schedules: Array<scheduleType>;
};

export const ScheduleTableRow: FC<ScheduleTableRowProp> = ({
  dates,
  user,
  schedules,
}) => {
  return (
    <TableRow>
      <TableCell sx={{ borderRight: 3, borderColor: "grey.300" }}>
        {user.user_name}
      </TableCell>

      {dates.map((date) => {
        const schedule = schedules.find(
          (s) => s.event_date === date.event_date
        );

        return (
          <TableCell
            sx={{ borderLeft: 1, borderRight: 1, borderColor: "grey.300" }}
            key={date.event_date}
          >
            {schedule &&
              (schedule.status_id === 1 ? (
                <PanoramaFishEye />
              ) : schedule.status_id === 2 ? (
                <Box display="flex">
                  <ChangeHistory />
                  <Box>
                    {schedule.schedule_time.map((times) => (
                      <Typography key={times.schedule_time_id} variant="body2">
                        {`${times.schedule_start_time}〜${times.schedule_end_time}`}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Clear />
              ))}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
