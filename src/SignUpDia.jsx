export default function SignUpDai({
  xerror,
  setError,
  setShowModal2,
  inputHandle,
  setSignUpData,
  signUpData,
  register,
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
                "Let’s begin 👋"
              )}
            </h5>
            <button
              className="btn-close"
              onClick={() => {
                setError("");
                setShowModal2(false);
              }}
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
              onClick={() => {
                setError("");
                setShowModal2(false);
              }}
            >
              Cancel
            </button>

            <button className="btn btn-success px-4" onClick={register}>
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
