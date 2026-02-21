import { useContext } from "react";
import { AuthContext } from "../main";
function AuthButtons({
  login,
  setLogin,
  setHiuser,
  setShowModal,
  setShowModal2,
  logout,
}) {
  const { user } = useContext(AuthContext);
  return (
    <div className="ms-auto">
      {!user ? (
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
      ) : (
        <button
          className="btn btn-success px-3 py-1 fw-semibold rounded-pill"
          onClick={() => {
            setHiuser("");
            logout();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default AuthButtons;
