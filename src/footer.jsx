import { Link } from "react-router-dom";
import "./css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Explore */}
        <div className="footer-col">
          <h5>Explore</h5>
          <ul>
            <li>
              <Link to="/Restro/cities">Cities</Link>
            </li>
            <li>
              <a href="#">Restaurants</a>
            </li>
            <li>
              <a href="#">Offers</a>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div className="footer-col">
          <h5>Account</h5>
          <ul>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Orders</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h5>Support</h5>
          <ul>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 All rights reserved</span>
      </div>
    </footer>
  );
}
