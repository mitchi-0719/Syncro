import { useRoutes } from "react-router-dom";
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";
import routes from "./Routes";

const App = () => {
  const routing = useRoutes(routes);
  return (
    <>
      <Header />
      {routing}
      <Footer />
    </>
  );
};

export default App;
