import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import "./css/cart.css";
import { AuthContext } from "./main";

export default function Cart() {
  const { state } = useLocation();
  const {
    items,
    restaurantName = "Restaurant",
    restaurantAddress = "",
  } = state ?? {};
  const navigate = useNavigate();
  const { user: authUser } = useContext(AuthContext);

  /* Use real logged-in user if available, otherwise fallback */
  const CUSTOMER = {
    name: authUser?.name || "Guest",
    phone: authUser?.phone || "XXXXXXXXXX",
    address: "B-204, Emerald Heights, Sector 65, Gurugram, Haryana – 122018",
  };

  /* normalise incoming items — each item may appear multiple times */
  const buildCart = (items) => {
    const map = {};
    (items || []).forEach((item) => {
      if (map[item.name]) {
        map[item.name].qty += 1;
      } else {
        map[item.name] = { ...item, qty: 1 };
      }
    });
    return Object.values(map);
  };

  const [cart, setCart] = useState(() => buildCart(items));
  const [instruction, setInstruction] = useState("");
  const [showInstruction, setShowInstruction] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confettiList, setConfettiList] = useState([]);
  const instructionRef = useRef(null);

  /* ── derived totals ── */
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 299 ? 0 : 39;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes;

  /* ── qty helpers ── */
  const change = (name, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  /* ── confirm animation ── */
  const handlePay = () => {
    /* generate confetti positions */
    const pieces = Array.from({ length: 48 }, (_, k) => ({
      id: k,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      color: ["#E8572A", "#1db954", "#FFB800", "#4A90E2", "#FF6B9D"][k % 5],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    setConfettiList(pieces);
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setConfettiList([]);
      navigate("/onTheWay", {
        state: {
          order: {
            id: `SWG-${Math.floor(10000 + Math.random() * 90000)}`,
            restaurant: restaurantName,
            restroAddress: restaurantAddress,
            items: cart.map((i) => i.name),
            total: `₹${total.toLocaleString("en-IN")}`,
            placedAt: new Date(),
          },
          partner: {
            name: "Arjun Verma",
            phone: "+91 98XXX X4821",
            rating: 4.8,
            trips: 1243,
            vehicle: "Honda Activa · MH 12 AX 4821",
            avatar: "AV",
          },
          delivery: {
            address: CUSTOMER.address,
            eta: 22,
          },
        },
      });
    }, 5000);
  };

  /* focus textarea when shown */
  useEffect(() => {
    if (showInstruction && instructionRef.current) {
      instructionRef.current.focus();
    }
  }, [showInstruction]);

  if (!state || cart.length === 0) {
    return (
      <div className="cart-empty-root">
        <div className="cart-empty-box">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some delicious items from the menu first.</p>
          <button className="cta" onClick={() => navigate(-1)}>
            ← Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Confirmation overlay ── */}
      {confirmed && (
        <div className="confirm-overlay">
          {confettiList.map((p) => (
            <span
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.x}%`,
                animationDelay: `${p.delay}s`,
                background: p.color,
                width: p.size,
                height: p.size,
                transform: `rotate(${p.rotation}deg)`,
              }}
            />
          ))}
          <div className="confirm-card">
            <div className="confirm-ring">
              <svg viewBox="0 0 80 80" fill="none">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#1db954"
                  strokeWidth="4"
                  strokeDasharray="226"
                  strokeDashoffset="0"
                  className="confirm-circle"
                />
                <path
                  d="M24 40l12 13 20-24"
                  stroke="#1db954"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="confirm-check"
                />
              </svg>
            </div>
            <h2 className="confirm-title">Order Placed!</h2>
            <p className="confirm-sub">
              Preparing your order 🍽️
              <br />
              Estimated delivery: <strong>30–45 mins</strong>
            </p>
            <div className="confirm-amount">₹{total}</div>
          </div>
        </div>
      )}

      <div className="cart-root">
        {/* ── Back ── */}
        <button className="rd-back" onClick={() => navigate(-1)}>
          Back to Menu
        </button>

        <div className="cart-layout">
          {/* ════════ LEFT COLUMN ════════ */}
          <div className="cart-left">
            {/* ── Items card ── */}
            <div className="cart-card">
              <div className="cart-card-head">
                <h2>Your Order</h2>
                <span className="cart-count-badge">
                  {cart.reduce((s, i) => s + i.qty, 0)} items
                </span>
              </div>

              <ul className="cart-items-list">
                {cart.map((item) => (
                  <li key={item.name} className="cart-item-row">
                    <div className="cart-item-info">
                      <div className="cart-item-dot" />
                      <div>
                        <p className="cart-item-name">{item.name}</p>
                        {item.description && (
                          <p className="cart-item-desc">{item.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="cart-item-right">
                      {/* qty stepper */}
                      <div className="qty-stepper">
                        <button
                          className="qty-btn"
                          onClick={() => change(item.name, -1)}
                          aria-label="decrease"
                        >
                          −
                        </button>
                        <span className="qty-val">{item.qty}</span>
                        <button
                          className="qty-btn qty-plus"
                          onClick={() => change(item.name, 1)}
                          aria-label="increase"
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-item-price">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* ── Add Instructions ── */}
              <div className="instruction-wrap">
                {!showInstruction ? (
                  <button
                    className="instruction-toggle"
                    onClick={() => setShowInstruction(true)}
                  >
                    <span className="instruction-icon">📝</span>
                    Add cooking instructions
                    <span className="instruction-chevron">›</span>
                  </button>
                ) : (
                  <div className="instruction-box">
                    <label className="instruction-label">
                      Cooking Instructions
                    </label>
                    <textarea
                      ref={instructionRef}
                      className="instruction-ta"
                      placeholder="e.g. Less spicy, no onions, extra sauce…"
                      value={instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                      rows={3}
                    />
                    <div className="instruction-actions">
                      <span className="instruction-hint">
                        {instruction.length}/200
                      </span>
                      <button
                        className="instruction-save"
                        onClick={() => setShowInstruction(false)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Delivery address card ── */}
            <div className="cart-card">
              <div className="cart-card-head">
                <h2>Delivery Details</h2>
                <span className="delivery-badge">🏠 Home</span>
              </div>

              <div className="delivery-info">
                <div className="delivery-row">
                  <span className="delivery-label">Name</span>
                  <span className="delivery-val">{CUSTOMER.name}</span>
                </div>
                <div className="delivery-row">
                  <span className="delivery-label">Phone</span>
                  <span className="delivery-val phone-masked">
                    {CUSTOMER.phone}
                  </span>
                </div>
                <div className="delivery-row delivery-addr-row">
                  <span className="delivery-label">Address</span>
                  <span className="delivery-val">{CUSTOMER.address}</span>
                </div>
              </div>

              <button className="change-addr-btn">Change address</button>
            </div>
          </div>

          {/* ════════ RIGHT COLUMN (sticky) ════════ */}
          <div className="cart-right">
            <div className="bill-card">
              <h3 className="bill-title">Bill Summary</h3>

              <div className="bill-lines">
                <div className="bill-row">
                  <span>Item Total</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span>₹{delivery}</span>
                </div>
                <div className="bill-row">
                  <span>GST & Taxes (5%)</span>
                  <span>₹{taxes}</span>
                </div>
              </div>

              <div className="bill-divider" />

              <div className="bill-total-row">
                <span>To Pay</span>
                <span className="bill-total-amt">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              {/* ── Payment buttons ── */}
              <p className="pay-label">Choose payment</p>
              <div className="pay-btns">
                <button className="pay-btn upi-btn" onClick={handlePay}>
                  <span className="pay-btn-icon">⚡</span>
                  <span>
                    <span className="pay-btn-title">UPI</span>
                    <span className="pay-btn-sub">Instant & secure</span>
                  </span>
                </button>

                <button className="pay-btn wallet-btn" onClick={handlePay}>
                  <span className="pay-btn-icon">👛</span>
                  <span>
                    <span className="pay-btn-title">Wallet</span>
                    <span className="pay-btn-sub">Quick checkout</span>
                  </span>
                </button>
              </div>

              <p className="pay-secure">
                🔒 100% secure payments · PCI-DSS compliant
              </p>
            </div>

            {/* ── Offer strip ── */}
            <div className="offer-strip">
              <span className="offer-tag">🎉 OFFER</span>
              <span className="offer-text">
                Free delivery on orders above ₹299
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
