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
    <>
      {/* Backdrop */}
      <div
        className="dia-backdrop"
        onClick={() => {
          setError("");
          setShowModal2(false);
        }}
      />

      {/* Dialog */}
      <div className="dia-wrapper">
        <div className="dia-box" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="dia-header">
            <div>
              <div className="dia-eyebrow">Create account</div>
              <h2 className="dia-title">
                {xerror.length > 0 ? (
                  <span className="dia-error">{xerror}</span>
                ) : (
                  "Join us today"
                )}
              </h2>
            </div>
            <button
              className="dia-close"
              onClick={() => {
                setError("");
                setShowModal2(false);
              }}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Body */}
          <div className="dia-body">
            <div className="dia-field">
              <label className="dia-label">Your name</label>
              <input
                type="text"
                className="dia-input"
                name="name"
                placeholder="Full name"
                value={signUpData.name}
                onChange={inputHandle(setSignUpData)}
              />
            </div>
            <div className="dia-field">
              <label className="dia-label">Email address</label>
              <input
                type="email"
                className="dia-input"
                name="email"
                placeholder="you@example.com"
                value={signUpData.email}
                onChange={inputHandle(setSignUpData)}
              />
            </div>
            <div className="dia-field">
              <label className="dia-label">Password</label>
              <input
                type="password"
                className="dia-input"
                name="password"
                placeholder="Create a password"
                value={signUpData.password}
                onChange={inputHandle(setSignUpData)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="dia-footer">
            <button
              className="dia-btn-ghost"
              onClick={() => {
                setError("");
                setShowModal2(false);
              }}
            >
              Cancel
            </button>
            <button className="dia-btn-primary" onClick={register}>
              <i className="fa-solid fa-user-plus"></i>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
