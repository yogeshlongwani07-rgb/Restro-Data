import { useContext, useState } from "react";
import { locationContext } from "./Context";
import "./css/Navbar.css";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [login, setLogin] = useState(false);
  let { islocation, setIslocation } = useContext(locationContext);
  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  let [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
            Hi User,
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
                <button className="btn btn-success px-3 py-1 fw-semibold rounded-pill">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {showModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 shadow">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Welcome Back 👋</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={loginData.email}
                      onChange={inputHandle(setLoginData)}
                    />
                    <label>Email address</label>
                  </div>

                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={inputHandle(setLoginData)}
                    />
                    <label>Password</label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button className="btn btn-success px-4">Login</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showModal2 && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 shadow">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Welcome Back 👋</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal2(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="form-floating mb-3">
                    <input
                      type="name"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={signUpData.name}
                      onChange={inputHandle(setSignUpData)}
                    />
                    <label>Your Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={signUpData.email}
                      onChange={inputHandle(setSignUpData)}
                    />
                    <label>Email address</label>
                  </div>

                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={signUpData.password}
                      onChange={inputHandle(setSignUpData)}
                    />
                    <label>Password</label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowModal2(false)}
                  >
                    Cancel
                  </button>

                  <button className="btn btn-success px-4">SignUp</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
