import { ChangeHistory, Clear, PanoramaFishEye } from "@mui/icons-material";
import { Box, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { dateType, scheduleType, userType } from "../../types/eventDataType";
import { FC } from "react";

type ScheduleTableRowProp = {
  dates: Array<dateType>;
  user: userType;
  schedules: Array<scheduleType>;
  displayTime: boolean;
};

export const ScheduleTableRow: FC<ScheduleTableRowProp> = ({
  dates,
  user,
  schedules,
  displayTime,
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
                  <Tooltip
                    title={
                      <Box>
                        <Typography variant="body1">参加可能時間</Typography>
                        {schedule.schedule_time.map((times) => (
                          <Typography
                            key={times.schedule_time_id}
                            variant="body2"
                          >
                            {`${times.schedule_start_time}〜${times.schedule_end_time}`}
                          </Typography>
                        ))}
                      </Box>
                    }
                  >
                    <ChangeHistory />
                  </Tooltip>
                  {displayTime && (
                    <Box>
                      {schedule.schedule_time.map((times) => (
                        <Typography
                          key={times.schedule_time_id}
                          variant="body2"
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
    </TableRow>
  );
};
