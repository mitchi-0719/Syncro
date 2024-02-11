import { RouteObject } from "react-router-dom";
import { Top } from "./pages/Top";
import { Event } from "./pages/Event";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";

const routes: RouteObject[] = [
  {
    children: [
      { path: "/", element: <Top /> },
      { path: "/event/:eventId", element: <Event /> },
      { path: "/admin", element: <Admin /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
