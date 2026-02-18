export default function LoginDia({
  xerror,
  setShowModal,
  setError,
  inputHandle,
  setLoginData,
  loginData,
  auth,
}) {
  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              {xerror.length > 0 ? (
                <p style={{ color: "#EF4444" }}>{xerror}</p>
              ) : (
                "Welcome Back 👋"
              )}
            </h5>
            <button
              className="btn-close"
              onClick={() => {
                setShowModal(false);
                setError("");
              }}
            ></button>
          </div>
          <form>
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
          </form>
          <div className="modal-footer">
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setError("");
                setShowModal(false);
              }}
            >
              Cancel
            </button>

            <button className="btn btn-success px-4" onClick={auth}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
