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

// Inline theme logic so we can embed it in the More dropdown
const THEMES = [
  { key: "light", label: "Light", icon: "☀️" },
  { key: "dark", label: "Dark", icon: "🌙" },
  { key: "system", label: "System Default", icon: "💻" },
];

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(pref) {
  const resolved = pref === "system" ? getSystemTheme() : pref;
  document.documentElement.setAttribute("data-theme", resolved);
}

function Navbar() {
  let { islocation, setIslocation } = useContext(locationContext);

  const nav = useNavUtility();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [themeHovered, setThemeHovered] = useState(false);
  const moreRef = useRef(null);
  const themeLeaveTimer = useRef(null);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme-pref") || "system";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme-pref", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

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
        setThemeHovered(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentThemeIcon = THEMES.find((t) => t.key === theme)?.icon || "💻";

  const handleThemeMouseEnter = () => {
    clearTimeout(themeLeaveTimer.current);
    setThemeHovered(true);
  };

  const handleThemeMouseLeave = () => {
    themeLeaveTimer.current = setTimeout(() => setThemeHovered(false), 150);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 border-bottom">
        <div className="container">
          <NavbarBrand hiUser={hiUser} />
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
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
              <button
                className="more-menu-btn"
                onClick={() => {
                  setMoreOpen(!moreOpen);
                  setThemeHovered(false);
                }}
              >
                <i className="fa-solid fa-grip"></i>
              </button>

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

                  <Link to="/profile" state={{ hiUser }}>
                    <button
                      className="more-dropdown-item"
                      onClick={() => setMoreOpen(false)}
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

                  <Link to="/orders">
                    <button
                      className="more-dropdown-item"
                      onClick={() => setMoreOpen(false)}
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

                  <a
                    href="https://wonder-list-nine.vercel.app/listings"
                    target="_blank"
                  >
                    <button
                      className="more-dropdown-item"
                      onClick={() => setMoreOpen(false)}
                    >
                      <span className="more-item-icon">
                        <i class="fa-solid fa-house"></i>
                      </span>
                      <div>
                        <div className="more-item-title">Find Your Stay</div>
                        <div className="more-item-sub">Search. Book. Stay.</div>
                      </div>
                    </button>
                  </a>

                  <Link to="/support">
                    <button
                      className="more-dropdown-item"
                      onClick={() => setMoreOpen(false)}
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
                  <Link to="/terms">
                    <button
                      className="more-dropdown-item"
                      onClick={() => setMoreOpen(false)}
                    >
                      <span className="more-item-icon">
                        <i className="fa-solid fa-file-contract"></i>
                      </span>
                      <div>
                        <div className="more-item-title">T&C</div>
                        <div className="more-item-sub">Terms & Conditions</div>
                      </div>
                    </button>
                  </Link>

                  <div className="more-divider" />

                  {/* Theme control inside More */}
                  <div
                    className="more-theme-wrapper"
                    onMouseEnter={handleThemeMouseEnter}
                    onMouseLeave={handleThemeMouseLeave}
                  >
                    <button className="more-dropdown-item more-theme-trigger">
                      <span className="more-item-icon">{currentThemeIcon}</span>
                      <div>
                        <div className="more-item-title">Theme</div>
                        <div className="more-item-sub">
                          {THEMES.find((t) => t.key === theme)?.label}
                        </div>
                      </div>
                      <span className="more-theme-chevron">›</span>
                    </button>

                    {themeHovered && (
                      <div className="more-theme-submenu">
                        <div className="more-dropdown-header">
                          <span>Appearance</span>
                        </div>
                        {THEMES.map((t) => (
                          <button
                            key={t.key}
                            className={
                              "more-dropdown-item" +
                              (theme === t.key ? " active" : "")
                            }
                            onClick={() => {
                              setTheme(t.key);
                            }}
                          >
                            <span className="more-item-icon">{t.icon}</span>
                            <div>
                              <div className="more-item-title">{t.label}</div>
                            </div>
                            {theme === t.key && (
                              <span className="more-theme-check">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
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
