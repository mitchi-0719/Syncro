import { Box, Typography, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"60vh"}
      gap={2}
    >
      <Typography variant="h4">読み込み中...</Typography>
      <CircularProgress />
    </Box>
  );
};
