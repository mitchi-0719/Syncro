import { AppBar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ padding: 2, marginBottom: 1 }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "2rem",
          fontFamily: '"Agu Display", serif',
          fontOpticalSizing: "auto",
          fontWeight: 400,
          fontStyle: "normal",
          fontVariationSettings: '"MORF" 10',
        }}
      >
        Syncro
      </Typography>
    </AppBar>
  );
};
