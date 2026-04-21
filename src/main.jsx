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
import Layout from "./Layout.jsx";
import Terms from "./terms.jsx";

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

function Root() {
  const [islocation, setIslocation] = useState(false);

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Layout islocation={islocation} setIslocation={setIslocation}>
        <Routes>
          <Route
            path="/"
            element={
              <App islocation={islocation} setIslocation={setIslocation} />
            }
          />
          <Route path="/Restro/:id/:name" element={<RestroMenu />} />
          <Route path="/Restro/cities" element={<Cities />} />
          <Route path="*" element={<NopageFound />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/onTheWay" element={<OnTheWay />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/terms" element={<Terms />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Root />
  </AuthProvider>,
);
