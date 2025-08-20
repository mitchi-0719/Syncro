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
        {user.userName}
      </TableCell>

      {dates.map((date) => {
        const schedule = schedules.find(
          (s) => s.eventDate === date.eventDate && s.userId === user.userId
        );

        return (
          <TableCell
            sx={{
              textAlign: "center",
              borderLeft: 1,
              borderRight: 1,
              borderColor: "grey.300",
            }}
            key={date.eventDate}
          >
            {schedule &&
              (schedule.statusId === 1 ? (
                <PanoramaFishEye />
              ) : schedule.statusId === 2 ? (
                <>
                  {schedule.scheduleTime[0].scheduleStartTime === null ? (
                    <ChangeHistory />
                  ) : (
                    <Box>
                      {schedule.scheduleTime.map((times) => (
                        <Typography
                          key={times.scheduleTimeId}
                          variant="body2"
                          fontSize={12}
                        >
                          {`${times.scheduleStartTime}〜${times.scheduleEndTime}`}
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
      <TableCell sx={{ textAlign: "center", whiteSpace: "pre-wrap" }}>
        {user.userMemo ? user.userMemo : "-"}
      </TableCell>
    </TableRow>
  );
};
