import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import RestroMenu from "./Restro/RestroMenu.jsx";
import Cities from "./Cities.jsx";
import NopageFound from "./Pages/NoPageFound.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { backendUrl } from "./Data/URL.js";
import Cart from "./cart.jsx";
import OnTheWay from "./onTheWay.jsx";
import Profile from "./profile.jsx";
import Orders from "./orders.jsx";

axios.defaults.withCredentials = true;

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backendUrl}/session`)
      .then((res) => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // keep localStorage synced
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Restro/:id/:name" element={<RestroMenu />} />
        <Route path="/Restro/cities" element={<Cities />} />
        <Route path="*" element={<NopageFound />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/onTheWay" element={<OnTheWay />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
);
