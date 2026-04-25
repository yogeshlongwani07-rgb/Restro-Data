import { useContext, useState, useRef, useEffect } from "react";
import { locationContext } from "../functions/Context";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

import LoginDia from "../Dialog/LoginDia";
import SignUpDai from "../Dialog/SignUpDia";

import useNavUtility from "./NavUtility";
import useAuthUtility from "../Auth/AuthenticationUtitlity";
import NavbarBrand from "./NavbarBrand";
import NavBarLinks from "./NavBarLinks";
import AuthButtons from "../Auth/AuthButton";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  let { islocation, setIslocation } = useContext(locationContext);

  const nav = useNavUtility();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  const {
    loginData,
    setLoginData,
    signUpData,
    setSignUpData,
    inputHandle,
    setError,
    xerror,
    hiUser,
    setHiuser,
    login,
    setLogin,
    showModal,
    setShowModal,
    showModal2,
    setShowModal2,
  } = nav;
  const { auth, register, logout } = useAuthUtility(nav);

  useEffect(() => {
    function handleClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 border-bottom">
        <div className="container">
          <NavbarBrand hiUser={hiUser} />
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              {menuOpen ? (
                <i
                  className="fa-solid fa-x"
                  style={{ color: "rgb(25, 135, 84)" }}
                ></i>
              ) : (
                <span className="navbar-toggler-icon"></span>
              )}
            </span>
          </button>
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <NavBarLinks
              setIslocation={setIslocation}
              islocation={islocation}
            />

            <div className="ms-3 more-menu-wrapper" ref={moreRef}>
              {/* BUTTON */}
              <button
                className="more-menu-btn"
                onClick={() => setMoreOpen(!moreOpen)}
              >
                <i className="fa-solid fa-grip"></i>
              </button>

              {/* 👇 THIS IS WHERE YOUR CODE GOES */}
              {moreOpen && (
                <div className="more-dropdown">
                  <div className="more-dropdown-header">
                    <span>Quick Access</span>
                  </div>
                  <button
                    className={`more-dropdown-item${islocation ? " active" : ""}`}
                    onClick={() => {
                      setIslocation(true);
                      setMoreOpen(false);
                    }}
                  >
                    <span className="more-item-icon">
                      <i className="fa-solid fa-location-arrow"></i>
                    </span>
                    <div>
                      <div className="more-item-title">Allow Location</div>
                    </div>
                  </button>
                  <div className="more-divider" />
                  <Link to={"/orders"}>
                    <button
                      className="more-dropdown-item"
                      onClick={() => {
                        setMoreOpen(false);
                      }}
                    >
                      <span className="more-item-icon">
                        <i className="fa-solid fa-burger"></i>
                      </span>
                      <div>
                        <div className="more-item-title">Your Order</div>
                        <div className="more-item-sub">Order Summary</div>
                      </div>
                    </button>
                  </Link>
                  <Link to={"/terms"}>
                    <button
                      className="more-dropdown-item"
                      onClick={() => {
                        setMoreOpen(false);
                      }}
                    >
                      <span className="more-item-icon">
                        <i class="fa-solid fa-file-contract"></i>
                      </span>
                      <div>
                        <div className="more-item-title">T&C</div>
                        <div className="more-item-sub">Terms & Conditions</div>
                      </div>
                    </button>
                  </Link>
                  <Link to={"/profile"} state={{ hiUser }}>
                    <button
                      className="more-dropdown-item"
                      onClick={() => {
                        setMoreOpen(false);
                      }}
                    >
                      <span className="more-item-icon">
                        <i className="fa-solid fa-user-circle"></i>
                      </span>
                      <div>
                        <div className="more-item-title">Profile</div>
                        <div className="more-item-sub">Manage account</div>
                      </div>
                    </button>
                  </Link>
                  <Link to={"/support"}>
                    <button
                      className="more-dropdown-item"
                      onClick={() => {
                        setMoreOpen(false);
                      }}
                    >
                      <span className="more-item-icon">
                        <i className="fa-solid fa-headset"></i>
                      </span>
                      <div>
                        <div className="more-item-title">Help</div>
                        <div className="more-item-sub">
                          Support & assistance
                        </div>
                      </div>
                    </button>
                  </Link>

                  <button
                    className="more-dropdown-item"
                    onClick={() => {
                      setMoreOpen(false);
                    }}
                  >
                    <span className="more-item-icon">
                      <i class="fa-solid fa-circle-half-stroke"></i>
                    </span>
                    <div>
                      <div className="more-item-title">Theme Control</div>
                      <div className="more-item-sub">
                        Theme Management System
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <div className="ms-2">
              <ThemeToggle />
            </div>

            <AuthButtons
              login={login}
              setLogin={setLogin}
              setHiuser={setHiuser}
              setShowModal={setShowModal}
              setShowModal2={setShowModal2}
              logout={logout}
            />
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
