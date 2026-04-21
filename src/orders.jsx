import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/orders.css";

const ORDERS = [
  {
    id: "ORD-20489",
    restaurant: "Burger Farm",
    restaurantInitial: "BF",
    accentColor: "#E8572A",
    date: "Today, 2:45 PM",
    status: "delivered",
    statusLabel: "Delivered",
    deliveryTime: "32 mins",
    items: [
      { name: "Butter Chicken", qty: 1, price: 349 },
      { name: "Veg Biryani", qty: 2, price: 259 },
      { name: "Mango Lassi", qty: 1, price: 99 },
    ],
    total: 966,
    address: "Plot 42, Sector 14, Gurugram",
    paymentMode: "UPI",
  },
  {
    id: "ORD-20341",
    restaurant: "The Spice Garden",
    restaurantInitial: "SG",
    accentColor: "#2563EB",
    date: "Yesterday, 7:12 PM",
    status: "delivered",
    statusLabel: "Delivered",
    deliveryTime: "28 mins",
    items: [
      { name: "Dal Makhani", qty: 1, price: 279 },
      { name: "Paneer Tikka", qty: 1, price: 349 },
      { name: "Butter Naan", qty: 3, price: 49 },
    ],
    total: 775,
    address: "Plot 42, Sector 14, Gurugram",
    paymentMode: "Card",
  },
  {
    id: "ORD-20198",
    restaurant: "Pizza House",
    restaurantInitial: "PH",
    accentColor: "#7C3AED",
    date: "Apr 18, 1:30 PM",
    status: "cancelled",
    statusLabel: "Cancelled",
    deliveryTime: "—",
    items: [
      { name: "Margherita Pizza (L)", qty: 1, price: 449 },
      { name: "Garlic Bread", qty: 1, price: 149 },
    ],
    total: 598,
    address: "Plot 42, Sector 14, Gurugram",
    paymentMode: "UPI",
  },
  {
    id: "ORD-20056",
    restaurant: "Wok & Roll",
    restaurantInitial: "WR",
    accentColor: "#059669",
    date: "Apr 15, 8:55 PM",
    status: "delivered",
    statusLabel: "Delivered",
    deliveryTime: "41 mins",
    items: [
      { name: "Hakka Noodles", qty: 1, price: 199 },
      { name: "Chilli Chicken", qty: 1, price: 299 },
      { name: "Spring Rolls", qty: 2, price: 129 },
      { name: "Fried Rice", qty: 1, price: 179 },
    ],
    total: 935,
    address: "Plot 42, Sector 14, Gurugram",
    paymentMode: "Cash",
  },
];

const FILTER_TABS = ["All Orders", "Delivered", "Cancelled"];

function RatingModal({ order, onClose }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(onClose, 1400);
  };

  return (
    <div className="od-overlay" onClick={onClose}>
      <div
        className="od-modal rating-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="od-modal-close" onClick={onClose}>
          ✕
        </button>
        {submitted ? (
          <div className="rating-success">
            <div className="rating-success-icon">🎉</div>
            <h3>Thanks for your feedback!</h3>
            <p>Your rating helps others discover great food.</p>
          </div>
        ) : (
          <>
            <div className="rating-modal-top">
              <div
                className="rating-rest-avatar"
                style={{
                  background: order.accentColor + "22",
                  color: order.accentColor,
                }}
              >
                {order.restaurantInitial}
              </div>
              <h3>Rate your order</h3>
              <p className="muted small">
                {order.restaurant} · {order.date}
              </p>
            </div>
            <div className="star-row">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  className={`star-btn ${s <= (hovered || rating) ? "lit" : ""}`}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(s)}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="rating-label">
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][
                hovered || rating
              ] || "Tap to rate"}
            </p>
            <button
              className={`od-primary-btn ${rating === 0 ? "disabled" : ""}`}
              onClick={handleSubmit}
            >
              Submit Rating
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ChatModal({ order, onClose }) {
  const [messages, setMessages] = useState([
    {
      from: "support",
      text: `Hi! I'm here to help with your order #${order.id} from ${order.restaurant}. What can I assist you with?`,
      time: "now",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const QUICK = [
    "Where is my order?",
    "I have a missing item",
    "Request a refund",
    "Change delivery address",
  ];

  const sendMsg = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text, time: "now" }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          from: "support",
          text: `Got it! I'm looking into "${text}" for your order #${order.id}. Our team will update you shortly. Is there anything else I can help with?`,
          time: "now",
        },
      ]);
    }, 1600);
  };

  return (
    <div className="od-overlay" onClick={onClose}>
      <div className="od-modal chat-modal" onClick={(e) => e.stopPropagation()}>
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">🎧</div>
            <div>
              <div className="chat-title">Support Agent</div>
              <div className="chat-status">
                <span className="chat-dot"></span> Online · Typically replies in
                2 mins
              </div>
            </div>
          </div>
          <button className="od-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="chat-order-pill">
          <span>📦</span>
          <span>
            Order #{order.id} — {order.restaurant}
          </span>
        </div>

        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble-wrap ${m.from}`}>
              {m.from === "support" && (
                <div className="chat-bubble-avatar">🎧</div>
              )}
              <div className={`chat-bubble ${m.from}`}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="chat-bubble-wrap support">
              <div className="chat-bubble-avatar">🎧</div>
              <div className="chat-bubble support typing-bubble">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-quick-row">
          {QUICK.map((q) => (
            <button
              key={q}
              className="chat-quick-pill"
              onClick={() => sendMsg(q)}
            >
              {q}
            </button>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            className="chat-input"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMsg(input)}
          />
          <button className="chat-send-btn" onClick={() => sendMsg(input)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [reordered, setReordered] = useState(false);

  const handleReorder = () => {
    setReordered(true);
    setTimeout(() => setReordered(false), 2500);
  };

  return (
    <>
      <div className={`od-card ${expanded ? "expanded" : ""}`}>
        {/* Top stripe accent */}
        <div
          className="od-card-stripe"
          style={{ background: order.accentColor }}
        />

        <div className="od-card-main">
          {/* Left: restaurant info */}
          <div className="od-card-left">
            <div
              className="od-rest-avatar"
              style={{
                background: order.accentColor + "18",
                color: order.accentColor,
                borderColor: order.accentColor + "33",
              }}
            >
              {order.restaurantInitial}
            </div>
            <div className="od-card-info">
              <div className="od-rest-name">{order.restaurant}</div>
              <div className="od-meta-row">
                <span className="od-order-id">{order.id}</span>
                <span className="od-dot">·</span>
                <span className="od-date">{order.date}</span>
              </div>
              <div className="od-items-preview">
                {order.items.slice(0, 2).map((it, i) => (
                  <span key={i} className="od-item-chip">
                    {it.name}
                  </span>
                ))}
                {order.items.length > 2 && (
                  <span className="od-item-chip muted">
                    +{order.items.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: status + total */}
          <div className="od-card-right">
            <span className={`od-status-badge ${order.status}`}>
              {order.status === "delivered" ? "✓" : "✕"} {order.statusLabel}
            </span>
            <div className="od-total">
              ₹{order.total.toLocaleString("en-IN")}
            </div>
            {order.status === "delivered" && (
              <div className="od-delivery-time">
                <span className="od-clock-icon">⏱</span> {order.deliveryTime}
              </div>
            )}
          </div>
        </div>

        {/* Expand toggle + always-visible chat button */}
        <div className="od-card-footer">
          <button
            className="od-expand-btn"
            onClick={() => setExpanded(!expanded)}
          >
            <span>{expanded ? "Hide details" : "View details"}</span>
            <span className={`od-chevron ${expanded ? "up" : ""}`}>›</span>
          </button>

          {/* Chat is always visible — never hidden behind "View details" */}
          <button
            className="od-chat-always-btn"
            onClick={() => setChatOpen(true)}
            title="Chat Support"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Chat Support
          </button>
        </div>

        {/* Expanded panel */}
        {expanded && (
          <div className="od-details-panel">
            <div className="od-details-grid">
              {/* Items */}
              <div className="od-detail-section">
                <div className="od-section-label">Items Ordered</div>
                <div className="od-items-list">
                  {order.items.map((it, i) => (
                    <div key={i} className="od-item-row">
                      <div className="od-item-name-qty">
                        <span className="od-qty-badge">{it.qty}×</span>
                        <span>{it.name}</span>
                      </div>
                      <span className="od-item-price">
                        ₹{(it.qty * it.price).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                  <div className="od-total-row">
                    <span>Total Paid</span>
                    <span className="od-total-val">
                      ₹{order.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery info */}
              <div className="od-detail-section">
                <div className="od-section-label">Delivery Info</div>
                <div className="od-info-block">
                  <div className="od-info-item">
                    <span className="od-info-icon">📍</span>
                    <div>
                      <div className="od-info-label">Address</div>
                      <div className="od-info-val">{order.address}</div>
                    </div>
                  </div>
                  <div className="od-info-item">
                    <span className="od-info-icon">💳</span>
                    <div>
                      <div className="od-info-label">Payment</div>
                      <div className="od-info-val">{order.paymentMode}</div>
                    </div>
                  </div>
                  {order.status === "delivered" && (
                    <div className="od-info-item">
                      <span className="od-info-icon">⏱</span>
                      <div>
                        <div className="od-info-label">Delivery Time</div>
                        <div className="od-info-val">{order.deliveryTime}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions — Rate and Reorder only (Chat is always visible above) */}
            <div className="od-actions-row">
              {order.status === "delivered" && (
                <button
                  className="od-action-btn rate-btn"
                  onClick={() => setRatingOpen(true)}
                >
                  <span>⭐</span> Rate Order
                </button>
              )}
              <button
                className={`od-action-btn reorder-btn ${reordered ? "reordered" : ""}`}
                onClick={handleReorder}
              >
                {reordered ? (
                  <>
                    <span>✓</span> Added to Cart!
                  </>
                ) : (
                  <>
                    <span>🔄</span> Reorder
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {chatOpen && (
        <ChatModal order={order} onClose={() => setChatOpen(false)} />
      )}
      {ratingOpen && (
        <RatingModal order={order} onClose={() => setRatingOpen(false)} />
      )}
    </>
  );
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const navigate = useNavigate();

  const filtered = ORDERS.filter((o) => {
    if (activeTab === "All Orders") return true;
    if (activeTab === "Delivered") return o.status === "delivered";
    if (activeTab === "Cancelled") return o.status === "cancelled";
    return true;
  });

  return (
    <div className="od-root">
      {/* Back button */}
      <button className="od-back-btn" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>

      {/* Header */}
      <div className="od-header">
        <div className="od-header-left">
          <h1 className="od-page-title">My Orders</h1>
          <p className="od-page-sub">
            Track, reorder, and get help with your deliveries
          </p>
        </div>
        <div className="od-header-badge">
          <span className="od-order-count">{ORDERS.length}</span>
          <span className="od-order-count-label">orders placed</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="od-tabs">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            className={`od-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <span className="od-tab-count">
              {tab === "All Orders"
                ? ORDERS.length
                : ORDERS.filter((o) =>
                    tab === "Delivered"
                      ? o.status === "delivered"
                      : o.status === "cancelled",
                  ).length}
            </span>
          </button>
        ))}
      </div>

      {/* Order cards */}
      <div className="od-list">
        {filtered.length === 0 ? (
          <div className="od-empty">
            <div className="od-empty-icon">📦</div>
            <p>No {activeTab.toLowerCase()} found</p>
          </div>
        ) : (
          filtered.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}
