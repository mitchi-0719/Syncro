import { useRoutes } from "react-router-dom";
import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import routes from "./Routes";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  const routing = useRoutes(routes);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header />
      <Box component="main">{routing}</Box>
      <Footer />
    </LocalizationProvider>
  );
};

export default App;
