import { Link, useParams } from "react-router-dom";
import "../css/RestaurantDetail.css";
import { useLocation } from "react-router-dom";
import restaurantMenu from "../Data/MenuData";
import { useState } from "react";

export default function RestroMenu() {
  const { state } = useLocation();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="rd-root">
      <Link to={`/`}>
        <button className="rd-back"> Back</button>
      </Link>
      {console.log(restaurantMenu.items[0].id)}
      <header className="rd-hero">
        <div>
          <h1 className="rd-title">{state.restro.name}</h1>
          <p className="rd-tagline">Top places for great food</p>

          <div className="rd-badges">
            <div className="rd-badge">
              ⭐⭐⭐⭐☆{" "}
              <span className="rating-number">{state.restro.avgRating}</span>
            </div>

            <div className="rd-badge small">
              <strong>Famous for</strong>
              <div className="pill-row">
                <span className="pill muted">{state.restro.cuisines[0]}</span>
                <span className="pill muted">
                  {state.restro.cuisines[state.restro.cuisines.length - 1]}
                </span>
              </div>
            </div>

            <div className="rd-badge small">
              <strong>Cuisines</strong>
              <div className="pill-row">
                {state.restro.cuisines.map((el, index) => {
                  return (
                    <span className="pill" key={restaurantMenu.items[index].id}>
                      {el}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="meta">
          <div>
            <small>Delivery</small>
            <div className="meta-strong">{state.restro.sla.slaString}</div>
          </div>
          <div>
            <small>Average Dining Cost</small>
            <div className="meta-strong">{state.restro.costForTwo}</div>
          </div>
          <div>
            <small>Location</small>
            <div className="meta-strong">{state.restro.locality}</div>
          </div>
        </div>
      </header>
      {/* Menu */}
      <main className="rd-main">
        <section className="rd-menu-col">
          <div className="category-card">
            <div className="category-head">
              <h3>Chef’s Choice</h3>
              <div className="cat-rating">⭐ 4.5</div>
            </div>

            <div className="items-grid">
              {restaurantMenu.items.map((el) => {
                return (
                  <div className="item-card" key={el.id}>
                    <div>
                      <h4>{el.name}</h4>
                      <div className="muted small">{el.description}</div>
                    </div>

                    <div className="item-right">
                      <div className="item-price">₹{el.price}</div>
                      <button className="cta">Add</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Aside */}
        <aside className="rd-aside">
          <div className="aside-card">
            <h4>About</h4>
            <p className="muted">
              A popular place known for quick service and great taste.
            </p>
          </div>
          <div className="aside-card" style={{ marginTop: 16 }}>
            <h4>Need Help?</h4>
            <p className="muted" style={{ fontSize: 13 }}>
              Have a question about your order or this restaurant?
            </p>
            <button className="help-btn" onClick={() => setHelpOpen(true)}>
              Contact Support
            </button>
          </div>
        </aside>
      </main>

      {helpOpen && (
        <div className="help-overlay" onClick={() => setHelpOpen(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="help-modal-close"
              onClick={() => setHelpOpen(false)}
            >
              ✕
            </button>

            <h3>We're here for you</h3>
            <p className="muted">Our support team is available 24/7.</p>

            <div className="help-options">
              <a href="" className="help-option">
                Email Us
              </a>

              <a
                href="#"
                className="help-option"
                onClick={(e) => e.preventDefault()}
              >
                Live Chat
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
