import "./css/PageNotFound.css";
function NoPageFound() {
  return (
    <div className="notfound-container">
      <div className="glass-card">
        <h1 className="error-code">404</h1>

        <h2 className="error-title">Page Not Found</h2>

        <p className="error-text">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <button
          className="home-btn"
          onClick={() => (window.location.href = "/")}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default NoPageFound;
