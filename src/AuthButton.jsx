function AuthButtons({
  login,
  setLogin,
  setHiuser,
  setShowModal,
  setShowModal2,
}) {
  return (
    <div className="ms-auto">
      {!login ? (
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
            setLogin(false);
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default AuthButtons;
