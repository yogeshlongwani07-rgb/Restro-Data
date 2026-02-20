import { useContext, useState } from "react";
import { locationContext } from "../functions/Context";
import "../css/Navbar.css";

import LoginDia from "../Dialog/LoginDia";
import SignUpDai from "../Dialog/SignUpDia";

import useNavUtility from "./NavUtility";
import useAuthUtility from "../Auth/AuthenticationUtitlity";
import NavbarBrand from "./NavbarBrand";
import NavBarLinks from "./NavBarLinks";
import AuthButtons from "../Auth/AuthButton";

function Navbar() {
  let { islocation, setIslocation } = useContext(locationContext);

  const nav = useNavUtility();
  const [menuOpen, setMenuOpen] = useState(false);

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
  const { auth, register } = useAuthUtility(nav);

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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <NavBarLinks
              setIslocation={setIslocation}
              islocation={islocation}
            />

            <AuthButtons
              login={login}
              setLogin={setLogin}
              setHiuser={setHiuser}
              setShowModal={setShowModal}
              setShowModal2={setShowModal2}
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
