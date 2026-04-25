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
    <>
      {/* Backdrop */}
      <div
        className="dia-backdrop"
        onClick={() => {
          setShowModal(false);
          setError("");
        }}
      />

      {/* Dialog */}
      <div className="dia-wrapper">
        <div className="dia-box" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="dia-header">
            <div>
              <div className="dia-eyebrow">Welcome back</div>
              <h2 className="dia-title">
                {xerror.length > 0 ? (
                  <span className="dia-error">{xerror}</span>
                ) : (
                  "Sign in to your account"
                )}
              </h2>
            </div>
            <button
              className="dia-close"
              onClick={() => {
                setShowModal(false);
                setError("");
              }}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Body */}
          <div className="dia-body">
            <div className="dia-field">
              <label className="dia-label">Email address</label>
              <input
                type="email"
                className="dia-input"
                name="email"
                placeholder="you@example.com"
                value={loginData.email}
                onChange={inputHandle(setLoginData)}
              />
            </div>
            <div className="dia-field">
              <label className="dia-label">Password</label>
              <input
                type="password"
                className="dia-input"
                name="password"
                placeholder="Your password"
                value={loginData.password}
                onChange={inputHandle(setLoginData)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="dia-footer">
            <button
              className="dia-btn-ghost"
              onClick={() => {
                setError("");
                setShowModal(false);
              }}
            >
              Cancel
            </button>
            <button className="dia-btn-primary" onClick={auth}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
