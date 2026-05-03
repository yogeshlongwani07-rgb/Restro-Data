import { Link, useNavigate } from "react-router-dom";
import "../css/RestaurantDetail.css";
import "../css/orders.css";
import { useLocation } from "react-router-dom";
import restaurantMenu from "../Data/MenuData";
import { useState, useRef, useEffect } from "react";

//chat bot AI specific for menu or restro
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
    const t = (text || "").toLowerCase().trim();

    const hasAny = (keywords) => keywords.some((k) => t.includes(k));

    if (
      hasAny([
        "hi",
        "hello",
        "hey",
        "hii",
        "hola",
        "good morning",
        "good afternoon",
        "good evening",
      ])
    ) {
      return `Hi! 👋 Welcome to ${restaurantName}. How can I help you today?`;
    }

    // Bye
    if (hasAny(["bye", "goodbye", "see you", "later"])) {
      return `Thanks for visiting ${restaurantName}. Hope to serve you again soon! 👋`;
    }

    // How are you
    if (hasAny(["how are you", "how r you", "how's it going"])) {
      return `I'm doing great and ready to help you with ${restaurantName}! 😊`;
    }

    // Hours
    if (hasAny(["hour", "open", "close", "time", "timing"])) {
      return `${restaurantName} is open daily from 10:00 AM to 11:00 PM.`;
    }

    // Veg
    if (hasAny(["veg", "vegetarian", "vegan", "jain"])) {
      return `Yes! ${restaurantName} offers many vegetarian options. Jain options are available on request.`;
    }

    // Delivery
    if (hasAny(["delivery", "eta", "fast", "late", "how long"])) {
      return `Delivery usually takes 25–40 minutes depending on distance and order volume.`;
    }

    // Offers
    if (hasAny(["discount", "offer", "coupon", "promo", "deal"])) {
      return `🎉 Use code FIRST50 for 50% off your first order (up to ₹100).`;
    }

    // Minimum order
    if (hasAny(["minimum", "min order", "free delivery"])) {
      return `Minimum order is ₹149. Free delivery on orders above ₹299.`;
    }

    // Allergies
    if (hasAny(["allerg", "nut", "gluten", "dairy"])) {
      return `Please check item descriptions for allergen info or add notes before checkout.`;
    }

    // Cancel / Refund
    if (hasAny(["cancel", "refund"])) {
      return `You can cancel within 2 minutes for a full refund.`;
    }

    // Track order
    if (hasAny(["track", "where is my order", "status"])) {
      return `You can track your order live from the Orders page.`;
    }

    // Payment
    if (hasAny(["payment", "upi", "cash", "card", "wallet"])) {
      return `We accept UPI, cards, wallets, and Cash on Delivery where available.`;
    }

    // Best seller
    if (hasAny(["best", "popular", "top item", "recommended"])) {
      return `Our bestsellers are Chef Special Burger, Paneer Wrap, and Loaded Fries.`;
    }

    // Spicy
    if (hasAny(["spicy", "less spicy", "mild"])) {
      return `Many dishes can be customized for spice level. Add notes before checkout.`;
    }

    // Combo
    if (hasAny(["combo", "meal deal", "family pack"])) {
      return `Yes! We offer combo meals and family packs at great prices.`;
    }

    // Freshness
    if (hasAny(["fresh", "frozen", "quality"])) {
      return `We prepare orders fresh using quality ingredients whenever possible.`;
    }

    // Ingredients
    if (hasAny(["ingredient", "made of", "contains"])) {
      return `Please check the menu item description for ingredients or ask support.`;
    }

    // Address
    if (hasAny(["address", "located", "location", "where are you"])) {
      return `${restaurantName} location details are available on the restaurant info page.`;
    }

    // Reservation
    if (hasAny(["book table", "reservation", "reserve"])) {
      return `Currently this page supports online ordering only. Please contact the restaurant directly for table reservations.`;
    }

    // Pickup
    if (hasAny(["pickup", "takeaway", "self pickup"])) {
      return `Yes, self-pickup may be available depending on your location.`;
    }

    // Packaging
    if (hasAny(["packaging", "packed", "safe packing"])) {
      return `Orders are securely packed to maintain hygiene and freshness.`;
    }

    // Kids
    if (hasAny(["kids", "child", "children"])) {
      return `We have several kid-friendly options available in the menu.`;
    }

    // Healthy
    if (hasAny(["healthy", "diet", "low calorie"])) {
      return `We offer salads, grilled items, and lighter meal options too.`;
    }

    // Birthday
    if (hasAny(["birthday", "party", "celebration"])) {
      return `Planning a celebration? We also offer group meals and party combos.`;
    }

    // Bulk order
    if (hasAny(["bulk", "corporate", "office order", "large order"])) {
      return `Yes! Bulk and corporate orders are available. Please contact support for assistance.`;
    }

    // App issue
    if (hasAny(["not working", "error", "bug", "issue", "problem"])) {
      return `Sorry for the inconvenience. Please refresh the page or contact support if the issue continues.`;
    }

    // Slow website
    if (hasAny(["slow app", "lag", "loading"])) {
      return `We're sorry for the delay. Please refresh once or check your internet connection.`;
    }

    // Contact support
    if (hasAny(["support", "help", "agent", "customer care"])) {
      return `Our support team is available to help you. Please use the Help section in the app.`;
    }

    // Thank you
    if (hasAny(["thanks", "thank you", "ok", "great", "nice"])) {
      return `Happy to help! 😊 Enjoy your meal from ${restaurantName}!`;
    }

    // Fallback
    return `Thanks for your message! Our support team will get back to you shortly. Anything else I can help with?`;
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

  const cart = restaurantMenu.items.flatMap((item) =>
    Array(qtys[item.id] || 0).fill(item),
  );

  const totalItems = cart.length;

  return (
    <div className="rd-root">
      {/* <button className="rd-back" onClick={() => navigate(-1)}>
        Back
      </button> */}
      <header className="rd-hero">
        <div>
          <h1 className="rd-title">{state.restro.name}</h1>
          <p className="rd-tagline">Top places for great food</p>

          <div className="rd-badges">
            <div className="rd-badge">
              ⭐⭐⭐⭐☆
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
                        <button
                          className="cta menu-add-btn"
                          onClick={() => increment(el)}
                        >
                          Add
                        </button>
                      ) : (
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

      {totalItems > 0 && (
        <Link
          to={"/cart"}
          state={{
            items: cart,
            restaurantName: state.restro.name,
            restaurantAddress: state.restro.locality,
          }}
        >
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
