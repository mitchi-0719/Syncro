import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5999e8",
    },
    secondary: {
      main: "#224b8f",
      light: "#659ad2",
    },
    info: {
      main: "#87ceeb",
    },
    background: {
      default: "#f8f8f8",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#1c2659",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "8px",
        },
      },
    },
  },
});
