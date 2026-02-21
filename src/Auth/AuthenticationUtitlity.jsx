import axios from "axios";
import { backendUrl } from "../Data/URL";
axios.defaults.withCredentials = true;
import { useContext } from "react";
import { AuthContext } from "../main";

export default function useAuthUtility({
  loginData,
  setLoginData,
  signUpData,
  setSignUpData,
  setError,
  setHiuser,
  setLogin,
  setShowModal,
  setShowModal2,
}) {
  const { setUser } = useContext(AuthContext);
  // -------- REGISTER --------
  async function register() {
    try {
      const res = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(signUpData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Backend error:", data);
        setError(data?.errors?.error || "Signup failed");
        return;
      }

      // store name before clearing state
      const name = signUpData.name;

      setUser({
        id: data.userId,
        name: data.userName,
      });

      setSignUpData({
        name: "",
        email: "",
        password: "",
      });

      setHiuser(name?.split(" ")[0] || "");
      setLogin(true);
      setError("");

      if (setShowModal2) setShowModal2(false);
    } catch (err) {
      console.error(err);
      setError("Signup failed. Try again.");
    }
  }

  // -------- LOGIN --------
  async function auth() {
    try {
      const res = await axios.post(`${backendUrl}/login`, loginData, {
        withCredentials: true,
      });

      setLoginData({
        email: "",
        password: "",
      });

      setUser({
        id: res.data.userId,
        name: res.data.userName,
      });

      setHiuser(res.data?.userName?.split(" ")[0] || "");
      setLogin(true);
      setError("");

      if (setShowModal) setShowModal(false);
    } catch (err) {
      if (!err.response) {
        setError("Service temporarily unavailable.");
        return;
      }

      const { status, data } = err.response;

      if (status === 400) setError(data.errors?.error);
      else if (status === 401) setError(data.error);
      else if (status === 500) setError(data.error);
      else setError("Unexpected error occurred.");
    }
  }

  async function logout() {
    try {
      const resp = await axios.post(
        `${backendUrl}/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(resp);
      setUser(null);
      setHiuser("");
      setLogin(false);
    } catch (err) {
      console.log("error", err);
    }
  }

  return { auth, register, logout };
}
