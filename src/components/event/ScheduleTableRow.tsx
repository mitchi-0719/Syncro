import { ChangeHistory, Clear, PanoramaFishEye } from "@mui/icons-material";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { FC } from "react";
import { DateType, ScheduleType, UserType } from "../../types/EventDataType";

type ScheduleTableRowProp = {
  dates: Array<DateType>;
  user: UserType;
  schedules: Array<ScheduleType>;
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
          (s) => s.event_date === date.event_date && s.user_id === user.user_id
        );

        return (
          <TableCell
            sx={{
              textAlign: "center",
              borderLeft: 1,
              borderRight: 1,
              borderColor: "grey.300",
            }}
            key={date.event_date}
          >
            {schedule &&
              (schedule.status_id === 1 ? (
                <PanoramaFishEye />
              ) : schedule.status_id === 2 ? (
                <>
                  {schedule.schedule_time[0].schedule_start_time === null ? (
                    <ChangeHistory />
                  ) : (
                    <Box>
                      {schedule.schedule_time.map((times) => (
                        <Typography
                          key={times.schedule_time_id}
                          variant="body2"
                          fontSize={12}
                        >
                          {`${times.schedule_start_time}〜${times.schedule_end_time}`}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </>
              ) : (
                <Clear />
              ))}
          </TableCell>
        );
      })}
      <TableCell sx={{ textAlign: "center" }}>
        {user.user_memo ? user.user_memo : "-"}
      </TableCell>
    </TableRow>
  );
};
