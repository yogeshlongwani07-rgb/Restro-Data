import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import RestroMenu from "./RestroMenu.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Restro/:id/:name" element={<RestroMenu />} />
    </Routes>
  </BrowserRouter>
);
