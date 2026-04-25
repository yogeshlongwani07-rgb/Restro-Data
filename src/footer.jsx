import { Link } from "react-router-dom";
import "./css/footer.css";

export default function Footer() {
  return (
    <footer className="ft-root">
      <div className="ft-wrap">
        {/* Navigation Links */}
        <div className="ft-links">
          <Link to="/">🏠 Home</Link>
          <Link to="/profile">👤 Profile</Link>
          <Link to="/orders">📦 Orders</Link>
          <Link to="/orders">💬 Help</Link>
          <Link to="/terms">📄 Terms</Link>
          <a
            href="https://wonder-list-nine.vercel.app/listings"
            target="_blank"
          >
            🏠 Find Your Stay
          </a>
        </div>

        {/* Copyright */}
        <div className="ft-bottom">© 2025 All rights reserved.</div>
      </div>
    </footer>
  );
}
