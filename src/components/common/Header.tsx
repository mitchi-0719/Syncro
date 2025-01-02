import { AppBar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ paddingX: 2, paddingTop: 0.5, paddingBottom: 2, marginBottom: 1 }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "2.4rem",
          fontFamily: '"Agu Display", serif',
          fontOpticalSizing: "auto",
          fontWeight: 400,
          fontStyle: "normal",
          fontVariationSettings: '"MORF" 10',
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          Syncro
        </Link>
      </Typography>
    </AppBar>
  );
};
