import axios from "axios";
import { backendUrl } from "../Data/URL";

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
  // -------- REGISTER --------
  async function register() {
    try {
      const res = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      const res = await axios.post(`${backendUrl}/login`, loginData);

      setLoginData({
        email: "",
        password: "",
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

  return { auth, register };
}
