import { Link, useNavigate } from "react-router-dom";
import "../css/RestaurantDetail.css";
import "../css/orders.css";
import { useLocation } from "react-router-dom";
import restaurantMenu from "../Data/MenuData";
import { useState, useRef, useEffect } from "react";

// Smart support chat for RestroMenu page
function RestroSupportChat({ onClose, restaurantName }) {
  const chatBodyRef = useRef(null);
  const QUICK = [
    "What are your opening hours?",
    "Is this restaurant vegetarian-friendly?",
    "How long is delivery?",
    "Do you offer discounts?",
  ];

  const [messages, setMessages] = useState([
    {
      from: "support",
      text: `Hi there! 👋 I'm here to help you with ${restaurantName}. Ask me anything about the menu, delivery, or your order!`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function getSmartReply(text) {
    const t = text.toLowerCase();
    if (
      t.includes("hour") ||
      t.includes("open") ||
      t.includes("close") ||
      t.includes("time")
    )
      return `${restaurantName} is open daily from 10:00 AM to 11:00 PM. Orders placed before 10:45 PM will be accepted for same-day delivery.`;
    if (
      t.includes("veg") ||
      t.includes("vegetarian") ||
      t.includes("vegan") ||
      t.includes("jain")
    )
      return `Yes! ${restaurantName} offers a wide range of vegetarian options. All vegetarian items are clearly marked with a green dot on the menu. Jain options are available on request.`;
    if (
      t.includes("delivery") ||
      t.includes("long") ||
      t.includes("time") ||
      t.includes("eta") ||
      t.includes("fast")
    )
      return `Delivery from ${restaurantName} typically takes 25–40 minutes depending on your distance and current order volume. You'll see a live ETA once your order is confirmed.`;
    if (
      t.includes("discount") ||
      t.includes("offer") ||
      t.includes("coupon") ||
      t.includes("promo") ||
      t.includes("deal")
    )
      return `🎉 Current offers: Use code FIRST50 for 50% off your first order (up to ₹100). Members also get 10% cashback every weekend!`;
    if (
      t.includes("minimum") ||
      t.includes("min order") ||
      t.includes("order value")
    )
      return `The minimum order value for ${restaurantName} is ₹149. Free delivery is available on orders above ₹299.`;
    if (
      t.includes("allerg") ||
      t.includes("nut") ||
      t.includes("gluten") ||
      t.includes("dairy")
    )
      return `For allergen information, please check individual item descriptions or contact the restaurant directly. You can add allergy notes in your order before checkout.`;
    if (t.includes("cancel") || t.includes("refund"))
      return `You can cancel your order within 2 minutes of placing it for a full refund. After that, please go to Orders > Chat Support for assistance.`;
    if (t.includes("track") || t.includes("where") || t.includes("order"))
      return `Once you place your order, you can track it live on the "On The Way" page. You'll also get SMS and in-app notifications at each stage.`;
    if (
      t.includes("thanks") ||
      t.includes("thank") ||
      t.includes("ok") ||
      t.includes("great")
    )
      return `Happy to help! 😊 Enjoy your meal from ${restaurantName}! Is there anything else you'd like to know?`;
    return `Thanks for your question! Our support team will get back to you within 30 minutes. You can also browse the menu or check our FAQ for quick answers. Anything else I can help with?`;
  }

  const sendMsg = (text) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((m) => [...m, { from: "user", text, time: now }]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          {
            from: "support",
            text: getSmartReply(text),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      },
      900 + Math.random() * 700,
    );
  };

  return (
    <div className="help-overlay" onClick={onClose}>
      <div
        className="help-modal restro-chat-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0, maxWidth: 420, width: "95vw" }}
      >
        {/* Header */}
        <div
          className="chat-header"
          style={{ padding: "14px 16px", borderBottom: "1px solid #f0f0f0" }}
        >
          <div className="chat-header-left">
            <div className="chat-avatar">🎧</div>
            <div>
              <div className="chat-title">Support Chat</div>
              <div className="chat-status">
                <span className="chat-dot"></span> Online · Fast replies
              </div>
            </div>
          </div>
          <button
            className="help-modal-close od-modal-close"
            onClick={onClose}
            style={{ position: "static" }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div
          className="chat-body"
          ref={chatBodyRef}
          style={{
            height: 260,
            overflowY: "auto",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
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

        {/* Quick replies */}
        <div className="chat-quick-row" style={{ padding: "6px 14px" }}>
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

        {/* Input */}
        <div
          className="chat-input-row"
          style={{ padding: "10px 14px", borderTop: "1px solid #f0f0f0" }}
        >
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

export default function RestroMenu() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = useState(false);

  const [qtys, setQtys] = useState({});

  function increment(item) {
    setQtys((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  }

  function decrement(item) {
    setQtys((prev) => {
      const next = (prev[item.id] || 0) - 1;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }
      return { ...prev, [item.id]: next };
    });
  }

  /* Build flat cart array from qtys map (Cart.jsx expects array of items) */
  const cart = restaurantMenu.items.flatMap((item) =>
    Array(qtys[item.id] || 0).fill(item),
  );

  const totalItems = cart.length;

  return (
    <div className="rd-root">
      <button className="rd-back" onClick={() => navigate(-1)}>
        Back
      </button>
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
                {state.restro.cuisines.map((el, index) => (
                  <span
                    className="pill"
                    key={restaurantMenu.items[index]?.id ?? index}
                  >
                    {el}
                  </span>
                ))}
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

      {/* ── Menu ── */}
      <main className="rd-main">
        <section className="rd-menu-col">
          <div className="category-card">
            <div className="category-head">
              <h3>Chef's Choice</h3>
              <div className="cat-rating">⭐ 4.5</div>
            </div>

            <div className="items-grid">
              {restaurantMenu.items.map((el) => {
                const qty = qtys[el.id] || 0;

                return (
                  <div className="item-card" key={el.id}>
                    <div>
                      <h4>{el.name}</h4>
                      <div className="muted small">{el.description}</div>
                    </div>

                    <div className="item-right">
                      <div className="item-price">₹{el.price}</div>

                      {qty === 0 ? (
                        /* ── First tap: plain Add button ── */
                        <button
                          className="cta menu-add-btn"
                          onClick={() => increment(el)}
                        >
                          Add
                        </button>
                      ) : (
                        /* ── After first tap: stepper replaces the button ── */
                        <div className="menu-stepper">
                          <button
                            className="menu-step-btn"
                            onClick={() => decrement(el)}
                            aria-label="remove one"
                          >
                            −
                          </button>
                          <span className="menu-step-val">{qty}</span>
                          <button
                            className="menu-step-btn menu-step-plus"
                            onClick={() => increment(el)}
                            aria-label="add one"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Aside ── */}
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
        <RestroSupportChat
          restaurantName={state.restro.name}
          onClose={() => setHelpOpen(false)}
        />
      )}

      {/* ── Cart FAB ── */}
      {totalItems > 0 && (
        <Link to={"/cart"} state={cart}>
          <div className="cart-fab visible">
            <button className="cart-fab-btn">
              <div className="cart-fab-left">
                <i className="fa-solid fa-cart-arrow-down"></i>
                <div className="cart-fab-text">
                  <span>Your Cart</span>
                  <span>
                    {totalItems} item{totalItems > 1 ? "s" : ""} added
                  </span>
                </div>
              </div>
              <div className="cart-fab-right">
                <span className="cart-fab-count">{totalItems}</span>
                <span className="cart-fab-arrow">›</span>
              </div>
            </button>
          </div>
        </Link>
      )}
    </div>
  );
}
