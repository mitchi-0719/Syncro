import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import { Box } from "@mui/material";
import { Provider } from "./provider/Provider";
import { Router } from "./Router";

const App = () => {
  return (
    <Provider>
      <Header />
      <Box component="main">
        <Router />
      </Box>
      <Footer />
    </Provider>
  );
};

export default App;
