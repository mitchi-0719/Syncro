import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Event } from "./pages/Event";
import { NotFound } from "./pages/NotFound";
import { Top } from "./pages/Top";

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
