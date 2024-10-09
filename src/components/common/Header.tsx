import { Box, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box component="header" py={2}>
      <Typography variant="h1" align="center" sx={{ fontSize: "2rem" }}>
        Header
      </Typography>
    </Box>
  );
};
