// type ScheduleTableProps = {
//   data: EventDataType;
// };

export const ScheduleTable = (/*{ data }: ScheduleTableProps*/) => {
  // return (
  //   <TableContainer component={Paper}>
  //     <Table>
  //       <TableHead>
  //         <TableRow>
  //           <TableCell />
  //           {data.selectDate.map((date) => (
  //             <TableCell key={date.date}>{convertDate(date.date)}</TableCell>
  //           ))}
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {data.userSchedule.map((userData) => (
  //           <TableRow key={userData.userId}>
  //             <TableCell>{userData.userName}</TableCell>
  //             {data.selectDate.map((date) => {
  //               const schedule = userData.schedule.find(
  //                 (s) => s.date === date.date
  //               );
  //               if (!schedule) {
  //                 return <TableCell />;
  //               }
  //               if (schedule.status === 0) {
  //                 return (
  //                   <TableCell>
  //                     <PanoramaFishEye />
  //                   </TableCell>
  //                 );
  //               }
  //               if (schedule.status === 1) {
  //                 return (
  //                   <TableCell>
  //                     <Box display="flex">
  //                       <ChangeHistory />
  //                       <Typography>
  //                         {schedule.start}〜{schedule.end}
  //                       </Typography>
  //                     </Box>
  //                   </TableCell>
  //                 );
  //               }
  //               if (schedule.status === 2) {
  //                 return (
  //                   <TableCell>
  //                     <Clear />
  //                   </TableCell>
  //                 );
  //               }
  //               return <TableCell />;
  //             })}
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // );
};
