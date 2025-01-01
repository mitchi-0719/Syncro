import { Box } from "@mui/material";
import { Provider } from "./provider/Provider";
import { Router } from "./Router";
import { Footer, Header } from "./components/common";

const App = () => {
  return (
    <Provider>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flex={1}>
          <Router />
        </Box>
        <Footer />
      </Box>
    </Provider>
  );
};

export default App;
