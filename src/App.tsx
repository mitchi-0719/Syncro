import { useRoutes } from "react-router-dom";
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
import routes from "./Routes";
import { Box } from "@mui/material";

const App = () => {
  const routing = useRoutes(routes);
  return (
    <>
      <Header />
      <Box component="main">{routing}</Box>
      <Footer />
    </>
  );
};

export default App;
