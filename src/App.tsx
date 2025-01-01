import { Box, CssBaseline } from "@mui/material";
import { Provider } from "./provider/Provider";
import { Router } from "./Router";
import { Footer, Header } from "./components/common";

const App = () => {
  return (
    <Provider>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flex={1} marginX={2}>
          <Router />
        </Box>
        <Footer />
      </Box>
    </Provider>
  );
};

export default App;
