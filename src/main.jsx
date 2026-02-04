import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import RestroMenu from "./RestroMenu.jsx";
import Cities from "./Cities.jsx";
import NopageFound from "./NoPageFound.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Routes>
      <Route path="*" element={<NopageFound />} />
      <Route path="/" element={<App />} />
      <Route path="/Restro/:id/:name" element={<RestroMenu />} />
      <Route path="/Restro/cities" element={<Cities />} />
    </Routes>
  </BrowserRouter>,
);
