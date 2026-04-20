import { Link } from "react-router-dom";
import "./src/css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span style={{ color: "#FF4D00" }}>Fork</span>It
          </div>
          <p className="footer-tagline">
            Discover the best food &amp; drinks in your city. <br />
            Delivered fresh, delivered fast.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Links 1 */}
        <div className="footer-col">
          <h5>Explore</h5>
          <ul>
            <li>
              <Link to="/Restro/cities">700+ Cities Covered</Link>
            </li>
            <li>
              <a href="#">Top Restaurants</a>
            </li>
            <li>
              <a href="#">New Arrivals</a>
            </li>
            <li>
              <a href="#">Best Rated</a>
            </li>
            <li>
              <a href="#">Offers &amp; Deals</a>
            </li>
          </ul>
        </div>

        {/* Links 2 */}
        <div className="footer-col">
          <h5>Account</h5>
          <ul>
            <li>
              <a href="#">Profile Settings</a>
            </li>
            <li>
              <a href="#">Your Orders</a>
            </li>
            <li>
              <a href="#">Saved Addresses</a>
            </li>
            <li>
              <a href="#">Rewards</a>
            </li>
            <li>
              <a href="#">Refer a Friend</a>
            </li>
          </ul>
        </div>

        {/* Links 3 */}
        <div className="footer-col">
          <h5>Support</h5>
          <ul>
            <li>
              <a href="#">Help &amp; FAQ</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Report an Issue</a>
            </li>
            <li>
              <a href="#">Partner with Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Location badge */}
        <div className="footer-col footer-location-col">
          <h5>Coverage</h5>
          <div className="footer-city-badge">
            <i className="fa-solid fa-city"></i>
            <div>
              <div className="city-count">700+</div>
              <div className="city-label">Cities Covered</div>
            </div>
          </div>
          <div className="footer-app-btns">
            <a href="#" className="app-btn">
              <i className="fa-brands fa-apple"></i> App Store
            </a>
            <a href="#" className="app-btn">
              <i className="fa-brands fa-google-play"></i> Google Play
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 ForkIt. All rights reserved.</span>
        <span className="footer-bottom-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </span>
      </div>
    </footer>
  );
}
