import { Box } from "@mui/material";
import { Provider } from "./provider/Provider";
import { Router } from "./Router";
import { Footer, Header } from "./components/common";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    (async () => {
      const response = await fetch("/.netlify/functions/test");
      const data = await response.json();
      console.log(data);
    })();
  }, []);
  return (
    <Provider>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flex={1} marginX="10%" marginY={4}>
          <Router />
        </Box>
        <Footer />
      </Box>
    </Provider>
  );
};

export default App;
