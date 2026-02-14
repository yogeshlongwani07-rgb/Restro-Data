import { useContext, useState } from "react";
import { locationContext } from "./Context";
import "./css/Navbar.css";
import axios from "axios";
import LoginDia from "./LoginDia";
import SignUpDai from "./SignUpDia";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  let [hiUser, setHiuser] = useState("");
  const [login, setLogin] = useState(false);
  let { islocation, setIslocation } = useContext(locationContext);
  let [xerror, setError] = useState("");
  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  let [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //https://backend-restro-data.vercel.app
  async function register() {
    try {
      const res = await fetch(
        "https://backend-restro-data.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        setError(data.errors.error);
        return;
      }
      setSignUpData({
        name: "",
        email: "",
        password: "",
      });
      setHiuser(signUpData.name.split(" ")[0]);
      setLogin(true);
      setError("");
      setShowModal2(false);
    } catch (err) {
      console.log(err.status);
    }
  }

  async function auth() {
    try {
      const res = await axios.post(
        "https://backend-restro-data.onrender.com/login",
        loginData,
      );
      setLoginData({
        email: "",
        password: "",
      });
      setHiuser(res.data.userName.split(" ")[0]);
      setLogin(true);
      setError("");
      setShowModal(false);
    } catch (err) {
      if (!err.response) {
        setError("Sorry — service temporarily unavailable.");
        return;
      }

      const { status, data } = err.response;

      if (status === 400) {
        // Required fields missing
        setError(data.errors.error);
      } else if (status === 401) {
        // Invalid email OR password
        setError(data.error);
      } else if (status === 500) {
        setError(data.error);
      } else {
        setError("Unexpected error. You broke something.");
      }
    }
  }

  function inputHandle(state) {
    return (e) => {
      state((pre) => {
        return {
          ...pre,
          [e.target.name]: e.target.value,
        };
      });
    };
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 border-bottom">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4 text-success" href="#">
            Hi {hiUser.length > 0 ? hiUser : "User"},
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-4 align-items-center gap-3">
              <li className="nav-item">
                <a
                  className="nav-link fw-semibold text-muted"
                  href="/Restro/cities"
                >
                  700+ Cities Covered
                </a>
              </li>
              <li className="nav-item">
                <button
                  className={
                    islocation
                      ? "nav-link fw-semibold text-success"
                      : "nav-link fw-semibold text-muted"
                  }
                  onClick={() => {
                    setIslocation(true);
                  }}
                >
                  <i className="fa-solid fa-location-arrow fa-lg"></i>
                  &nbsp; Allow Location
                </button>
              </li>
            </ul>
            <div className="ms-auto">
              {!login && (
                <>
                  <button
                    className="btn btn-outline-success px-3 py-1 mx-2 fw-semibold rounded-pill"
                    onClick={() => setShowModal2(true)}
                  >
                    Sign Up
                  </button>

                  <button
                    className="btn btn-outline-success px-3 py-1 mx-3 fw-semibold rounded-pill"
                    onClick={() => setShowModal(true)}
                  >
                    Login
                  </button>
                </>
              )}
              {login && (
                <button
                  className="btn btn-success px-3 py-1 fw-semibold rounded-pill"
                  onClick={() => {
                    setHiuser("");
                    setLogin(false);
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {showModal && (
        <LoginDia
          xerror={xerror}
          setShowModal={setShowModal}
          setError={setError}
          inputHandle={inputHandle}
          setLoginData={setLoginData}
          loginData={loginData}
          auth={auth}
        />
      )}
      {showModal2 && (
        <SignUpDai
          xerror={xerror}
          setError={setError}
          setShowModal2={setShowModal2}
          inputHandle={inputHandle}
          setSignUpData={setSignUpData}
          signUpData={signUpData}
          register={register}
        />
      )}
    </>
  );
}

export default Navbar;
