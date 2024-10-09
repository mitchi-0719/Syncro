import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Top } from "./pages/Top";
import { Event } from "./pages/Event";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/event/:eventId" element={<Event />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
