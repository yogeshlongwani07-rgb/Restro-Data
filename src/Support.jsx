import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const QUICK = [
  "Where is my order?",
  "Missing item",
  "Request refund",
  "Change address",
];

function getSmartReply(text, order) {
  const t = text.toLowerCase();
  if (
    t.includes("where") ||
    t.includes("track") ||
    t.includes("location") ||
    t.includes("status")
  ) {
    if (order.status === "delivered")
      return `Your order #${order.id} was successfully delivered on ${order.date} in ${order.deliveryTime}. Hope you enjoyed your meal!`;
    return `Your order #${order.id} is currently on its way! Estimated arrival is within 20-30 minutes.`;
  }
  if (t.includes("missing") || t.includes("wrong") || t.includes("item")) {
    return `Sorry to hear that! For order #${order.id}, please describe which item was missing. We will arrange a replacement or refund within 24 hours.`;
  }
  if (t.includes("refund") || t.includes("money") || t.includes("payment")) {
    return `For order #${order.id} (paid via ${order.paymentMode}), refunds are processed within 5-7 business days. Shall I initiate a refund request?`;
  }
  if (t.includes("address") || t.includes("deliver")) {
    return `Your order #${order.id} is set for delivery to: "${order.address}". If not picked up yet, I can try to update the address.`;
  }
  if (t.includes("late") || t.includes("delay")) {
    return `We apologize for the delay! As a goodwill gesture, we will add 50 credits to your account.`;
  }
  if (t.includes("thanks") || t.includes("ok") || t.includes("great")) {
    return `You are welcome! Is there anything else I can assist you with for order #${order.id}?`;
  }
  return `Thanks for reaching out about order #${order.id}. I have noted your concern. Our support team will review this within 2 hours.`;
}

export default function Support() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(ORDERS[0]);
  const [messages, setMessages] = useState([
    {
      from: "support",
      text: `Hi! I am your support assistant for order #${ORDERS[0].id} from ${ORDERS[0].restaurant}. How can I help you today?`,
      time: "now",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const selectOrder = (order) => {
    setSelectedOrder(order);
    setMessages([
      {
        from: "support",
        text: `Hi! I am your support assistant for order #${order.id} from ${order.restaurant}. How can I help you today?`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  };

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
            text: getSmartReply(text, selectedOrder),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      },
      1000 + Math.random() * 800,
    );
  };

  return (
    <div className="sp-root">
      <button className="sp-back-btn" onClick={() => navigate(-1)}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
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

      <div className="sp-page-header">
        <div className="sp-header-icon">🎧</div>
        <div>
          <h1 className="sp-page-title">Support Centre</h1>
          <p className="sp-page-sub">
            Select an order and chat with our support team instantly
          </p>
        </div>
        <div className="sp-status-pill">
          <span className="sp-status-dot"></span>
          Live Support
        </div>
      </div>

      <div className="sp-layout">
        {/* LEFT — Chat panel */}
        <div className="sp-chat-panel">
          <div className="sp-chat-head">
            <div className="sp-agent-avatar">🎧</div>
            <div className="sp-agent-info">
              <div className="sp-agent-name">Restro Support</div>
              <div className="sp-agent-status">
                <span className="sp-online-dot"></span>
                Online · replies in ~2 mins
              </div>
            </div>
          </div>

          <div
            className="sp-order-context-pill"
            style={{ borderLeftColor: selectedOrder.accentColor }}
          >
            <div
              className="sp-order-ctx-avatar"
              style={{
                background: selectedOrder.accentColor + "22",
                color: selectedOrder.accentColor,
              }}
            >
              {selectedOrder.restaurantInitial}
            </div>
            <div>
              <div className="sp-order-ctx-title">
                {selectedOrder.restaurant}
              </div>
              <div className="sp-order-ctx-sub">
                #{selectedOrder.id} · {selectedOrder.date}
              </div>
            </div>
            <span className={"sp-status-badge " + selectedOrder.status}>
              {selectedOrder.status === "delivered" ? "✓" : "✕"}{" "}
              {selectedOrder.statusLabel}
            </span>
          </div>

          <div className="sp-chat-body" ref={chatBodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={"sp-bubble-wrap " + m.from}>
                {m.from === "support" && (
                  <div className="sp-bubble-avatar">🎧</div>
                )}
                <div className={"sp-bubble " + m.from}>
                  <div className="sp-bubble-text">{m.text}</div>
                  <div className="sp-bubble-time">{m.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="sp-bubble-wrap support">
                <div className="sp-bubble-avatar">🎧</div>
                <div className="sp-bubble support sp-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="sp-quick-row">
            {QUICK.map((q) => (
              <button
                key={q}
                className="sp-quick-chip"
                onClick={() => sendMsg(q)}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="sp-input-row">
            <input
              className="sp-input"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg(input)}
            />
            <button
              className="sp-send-btn"
              onClick={() => sendMsg(input)}
              disabled={!input.trim()}
            >
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

        {/* RIGHT — Order details panel */}
        <div className="sp-right-panel">
          <div className="sp-orders-section">
            <div className="sp-section-label">Your Orders</div>
            <div className="sp-orders-list">
              {ORDERS.map((order) => (
                <button
                  key={order.id}
                  className={
                    "sp-order-item" +
                    (selectedOrder.id === order.id ? " active" : "")
                  }
                  onClick={() => selectOrder(order)}
                  style={
                    selectedOrder.id === order.id
                      ? {
                          borderColor: order.accentColor + "55",
                          background: order.accentColor + "08",
                        }
                      : {}
                  }
                >
                  <div
                    className="sp-order-item-avatar"
                    style={{
                      background: order.accentColor + "20",
                      color: order.accentColor,
                      borderColor: order.accentColor + "33",
                    }}
                  >
                    {order.restaurantInitial}
                  </div>
                  <div className="sp-order-item-info">
                    <div className="sp-order-item-name">{order.restaurant}</div>
                    <div className="sp-order-item-meta">
                      {order.id} · {order.date}
                    </div>
                  </div>
                  <span className={"sp-mini-badge " + order.status}>
                    {order.status === "delivered" ? "✓" : "✕"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sp-detail-card">
            <div
              className="sp-detail-stripe"
              style={{ background: selectedOrder.accentColor }}
            ></div>
            <div className="sp-detail-head">
              <div
                className="sp-detail-avatar"
                style={{
                  background: selectedOrder.accentColor + "20",
                  color: selectedOrder.accentColor,
                }}
              >
                {selectedOrder.restaurantInitial}
              </div>
              <div>
                <div className="sp-detail-rest-name">
                  {selectedOrder.restaurant}
                </div>
                <div className="sp-detail-order-id">{selectedOrder.id}</div>
              </div>
              <span className={"sp-status-badge large " + selectedOrder.status}>
                {selectedOrder.status === "delivered" ? "✓" : "✕"}{" "}
                {selectedOrder.statusLabel}
              </span>
            </div>

            <div className="sp-detail-section">
              <div className="sp-detail-section-title">Items Ordered</div>
              <div className="sp-items-list">
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="sp-item-row">
                    <div className="sp-item-left">
                      <span className="sp-item-qty">{it.qty}x</span>
                      <span className="sp-item-name">{it.name}</span>
                    </div>
                    <span className="sp-item-price">
                      Rs.{(it.qty * it.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
                <div className="sp-total-row">
                  <span>Total Paid</span>
                  <span className="sp-total-val">
                    Rs.{selectedOrder.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div className="sp-info-grid">
              <div className="sp-info-block">
                <div className="sp-info-icon">📍</div>
                <div>
                  <div className="sp-info-label">Address</div>
                  <div className="sp-info-val">{selectedOrder.address}</div>
                </div>
              </div>
              <div className="sp-info-block">
                <div className="sp-info-icon">💳</div>
                <div>
                  <div className="sp-info-label">Payment</div>
                  <div className="sp-info-val">{selectedOrder.paymentMode}</div>
                </div>
              </div>
              {selectedOrder.status === "delivered" && (
                <div className="sp-info-block">
                  <div className="sp-info-icon">⏱</div>
                  <div>
                    <div className="sp-info-label">Delivered In</div>
                    <div className="sp-info-val">
                      {selectedOrder.deliveryTime}
                    </div>
                  </div>
                </div>
              )}
              <div className="sp-info-block">
                <div className="sp-info-icon">📅</div>
                <div>
                  <div className="sp-info-label">Date</div>
                  <div className="sp-info-val">{selectedOrder.date}</div>
                </div>
              </div>
            </div>

            <div className="sp-actions-row">
              <button className="sp-action-btn reorder">
                <span>🔄</span> Reorder
              </button>
              {selectedOrder.status === "delivered" && (
                <button className="sp-action-btn rate">
                  <span>⭐</span> Rate
                </button>
              )}
            </div>
          </div>

          <div className="sp-faq-section">
            <div className="sp-section-label">Common Issues</div>
            <div className="sp-faq-list">
              {[
                { icon: "🚚", label: "Track my order" },
                { icon: "💰", label: "Refund policy" },
                { icon: "📦", label: "Missing items" },
                { icon: "⭐", label: "Rate and review" },
              ].map((faq) => (
                <button
                  key={faq.label}
                  className="sp-faq-item"
                  onClick={() => sendMsg(faq.label)}
                >
                  <span>{faq.icon}</span>
                  <span>{faq.label}</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ marginLeft: "auto", opacity: 0.4 }}
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sp-root { min-height: 100vh; background: var(--surface); padding: 100px 24px 48px; font-family: var(--font-body); }
        .sp-back-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: var(--radius-pill); border: 1px solid var(--border-med); background: var(--surface-card); color: var(--ink-mid); font-family: var(--font-body); font-size: 0.85rem; font-weight: 500; cursor: pointer; margin-bottom: 28px; transition: all var(--transition); }
        .sp-back-btn:hover { background: var(--surface-muted); color: var(--ink); transform: translateX(-2px); }
        .sp-page-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
        .sp-header-icon { width: 52px; height: 52px; border-radius: 16px; background: var(--brand-subtle); border: 1px solid var(--border-brand); display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
        .sp-page-title { font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; color: var(--ink); letter-spacing: -0.02em; margin: 0 0 2px; }
        .sp-page-sub { color: var(--ink-soft); font-size: 0.875rem; margin: 0; }
        .sp-status-pill { margin-left: auto; display: flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: var(--radius-pill); background: rgba(5,150,105,0.08); border: 1px solid rgba(5,150,105,0.2); color: #059669; font-size: 0.8rem; font-weight: 600; white-space: nowrap; }
        .sp-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #059669; animation: sp-pulse 2s infinite; flex-shrink: 0; }
        @keyframes sp-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(5,150,105,0.4); } 50% { box-shadow: 0 0 0 5px rgba(5,150,105,0); } }
        .sp-layout { display: grid; grid-template-columns: 1fr 400px; gap: 20px; max-width: 1200px; margin: 0 auto; align-items: start; }
        .sp-chat-panel { background: var(--surface-card); border: 1px solid var(--border-med); border-radius: var(--radius-xl); display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--shadow-card); height: 680px; }
        .sp-chat-head { display: flex; align-items: center; gap: 12px; padding: 20px 24px; border-bottom: 1px solid var(--border); background: var(--surface-muted); }
        .sp-agent-avatar { width: 44px; height: 44px; border-radius: 14px; background: var(--brand-subtle); border: 1px solid var(--border-brand); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .sp-agent-name { font-weight: 600; color: var(--ink); font-size: 0.9rem; }
        .sp-agent-status { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--ink-soft); margin-top: 2px; }
        .sp-online-dot { width: 7px; height: 7px; border-radius: 50%; background: #059669; animation: sp-pulse 2s infinite; flex-shrink: 0; }
        .sp-order-context-pill { display: flex; align-items: center; gap: 10px; padding: 10px 16px; margin: 10px 14px; background: var(--surface-muted); border-radius: var(--radius-md); border-left: 3px solid; }
        .sp-order-ctx-avatar { width: 32px; height: 32px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.72rem; flex-shrink: 0; }
        .sp-order-ctx-title { font-weight: 600; font-size: 0.83rem; color: var(--ink); }
        .sp-order-ctx-sub { font-size: 0.7rem; color: var(--ink-soft); margin-top: 1px; }
        .sp-status-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: var(--radius-pill); font-size: 0.72rem; font-weight: 600; margin-left: auto; flex-shrink: 0; }
        .sp-status-badge.delivered { background: rgba(5,150,105,0.1); color: #059669; }
        .sp-status-badge.cancelled { background: rgba(239,68,68,0.1); color: #EF4444; }
        .sp-status-badge.large { font-size: 0.78rem; padding: 5px 12px; }
        .sp-chat-body { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth; }
        .sp-chat-body::-webkit-scrollbar { width: 4px; }
        .sp-chat-body::-webkit-scrollbar-thumb { background: var(--border-med); border-radius: 4px; }
        .sp-bubble-wrap { display: flex; align-items: flex-end; gap: 8px; }
        .sp-bubble-wrap.user { flex-direction: row-reverse; }
        .sp-bubble-avatar { width: 28px; height: 28px; border-radius: 9px; background: var(--brand-subtle); display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; border: 1px solid var(--border-brand); }
        .sp-bubble { max-width: 75%; border-radius: 16px; padding: 10px 13px; }
        .sp-bubble.support { background: var(--surface-muted); border: 1px solid var(--border); border-bottom-left-radius: 4px; }
        .sp-bubble.user { background: var(--brand); color: #fff; border-bottom-right-radius: 4px; }
        .sp-bubble-text { font-size: 0.875rem; line-height: 1.5; color: inherit; }
        .sp-bubble.support .sp-bubble-text { color: var(--ink); }
        .sp-bubble-time { font-size: 0.68rem; margin-top: 4px; opacity: 0.5; }
        .sp-typing { display: flex !important; gap: 4px; padding: 14px !important; align-items: center; }
        .sp-typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--ink-ghost); animation: sp-dot 1.2s infinite; }
        .sp-typing span:nth-child(2) { animation-delay: 0.2s; }
        .sp-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes sp-dot { 0%,80%,100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-6px); opacity: 1; } }
        .sp-quick-row { display: flex; flex-wrap: wrap; gap: 5px; padding: 8px 14px; border-top: 1px solid var(--border); }
        .sp-quick-chip { padding: 5px 11px; border-radius: var(--radius-pill); border: 1px solid var(--border-med); background: var(--surface-card); color: var(--ink-mid); font-size: 0.77rem; font-weight: 500; cursor: pointer; font-family: var(--font-body); transition: all var(--transition); white-space: nowrap; }
        .sp-quick-chip:hover { background: var(--brand-subtle); border-color: var(--border-brand); color: var(--brand); }
        .sp-input-row { display: flex; gap: 8px; padding: 10px 14px 14px; }
        .sp-input { flex: 1; padding: 10px 15px; border: 1.5px solid var(--border-med); border-radius: var(--radius-pill); background: var(--surface-muted); color: var(--ink); font-family: var(--font-body); font-size: 0.875rem; outline: none; transition: border-color var(--transition), box-shadow var(--transition); }
        .sp-input::placeholder { color: var(--ink-ghost); }
        .sp-input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-glow); background: var(--surface-card); }
        .sp-send-btn { width: 42px; height: 42px; border-radius: 50%; border: none; background: var(--brand); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: all var(--transition); }
        .sp-send-btn:hover:not(:disabled) { background: var(--brand-deep); transform: scale(1.06); box-shadow: var(--shadow-brand); }
        .sp-send-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .sp-right-panel { display: flex; flex-direction: column; gap: 14px; }
        .sp-section-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--ink-ghost); margin-bottom: 6px; padding: 0 4px; }
        .sp-orders-section { background: var(--surface-card); border: 1px solid var(--border-med); border-radius: var(--radius-xl); padding: 14px; box-shadow: var(--shadow-card); }
        .sp-orders-list { display: flex; flex-direction: column; gap: 3px; }
        .sp-order-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: var(--radius-md); border: 1.5px solid transparent; background: transparent; cursor: pointer; text-align: left; font-family: var(--font-body); transition: all var(--transition); width: 100%; }
        .sp-order-item:hover { background: var(--surface-muted); }
        .sp-order-item-avatar { width: 34px; height: 34px; border-radius: 9px; border: 1px solid; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.7rem; flex-shrink: 0; }
        .sp-order-item-name { font-size: 0.83rem; font-weight: 600; color: var(--ink); }
        .sp-order-item-meta { font-size: 0.7rem; color: var(--ink-soft); margin-top: 1px; }
        .sp-mini-badge { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.62rem; font-weight: 700; flex-shrink: 0; margin-left: auto; }
        .sp-mini-badge.delivered { background: rgba(5,150,105,0.12); color: #059669; }
        .sp-mini-badge.cancelled { background: rgba(239,68,68,0.1); color: #EF4444; }
        .sp-detail-card { background: var(--surface-card); border: 1px solid var(--border-med); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-card); }
        .sp-detail-stripe { height: 4px; width: 100%; }
        .sp-detail-head { display: flex; align-items: center; gap: 12px; padding: 14px 18px 0; }
        .sp-detail-avatar { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.82rem; flex-shrink: 0; }
        .sp-detail-rest-name { font-weight: 700; font-size: 0.9rem; color: var(--ink); font-family: var(--font-display); }
        .sp-detail-order-id { font-size: 0.7rem; color: var(--ink-soft); margin-top: 2px; }
        .sp-detail-section { padding: 12px 18px 0; }
        .sp-detail-section-title { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-ghost); margin-bottom: 7px; }
        .sp-items-list { display: flex; flex-direction: column; gap: 3px; }
        .sp-item-row { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed var(--border); }
        .sp-item-row:last-child { border: none; }
        .sp-item-left { display: flex; align-items: center; gap: 7px; }
        .sp-item-qty { font-size: 0.7rem; font-weight: 700; background: var(--surface-muted); color: var(--ink-mid); padding: 2px 6px; border-radius: 5px; }
        .sp-item-name { font-size: 0.8rem; color: var(--ink-mid); }
        .sp-item-price { font-size: 0.8rem; font-weight: 600; color: var(--ink); }
        .sp-total-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0 1px; font-size: 0.83rem; font-weight: 600; color: var(--ink); border-top: 1.5px solid var(--border-med); margin-top: 4px; }
        .sp-total-val { font-size: 0.95rem; color: var(--brand); }
        .sp-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; padding: 12px 18px; }
        .sp-info-block { display: flex; align-items: flex-start; gap: 8px; padding: 9px; background: var(--surface-muted); border-radius: 10px; }
        .sp-info-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
        .sp-info-label { font-size: 0.65rem; color: var(--ink-soft); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px; }
        .sp-info-val { font-size: 0.77rem; color: var(--ink); font-weight: 600; }
        .sp-actions-row { display: flex; gap: 7px; padding: 0 18px 14px; }
        .sp-action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px; padding: 8px 12px; border-radius: var(--radius-pill); border: 1.5px solid var(--border-med); background: transparent; font-family: var(--font-body); font-size: 0.8rem; font-weight: 600; cursor: pointer; color: var(--ink-mid); transition: all var(--transition); }
        .sp-action-btn.reorder:hover { background: var(--brand-subtle); border-color: var(--border-brand); color: var(--brand); }
        .sp-action-btn.rate:hover { background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.3); color: #B45309; }
        .sp-faq-section { background: var(--surface-card); border: 1px solid var(--border-med); border-radius: var(--radius-xl); padding: 14px; box-shadow: var(--shadow-card); }
        .sp-faq-list { display: flex; flex-direction: column; gap: 2px; }
        .sp-faq-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 10px; border: none; background: transparent; cursor: pointer; font-family: var(--font-body); font-size: 0.83rem; color: var(--ink-mid); font-weight: 500; text-align: left; transition: all var(--transition); width: 100%; }
        .sp-faq-item:hover { background: var(--surface-muted); color: var(--ink); }
        @media (max-width: 900px) { .sp-layout { grid-template-columns: 1fr; } .sp-chat-panel { height: 520px; } }
        @media (max-width: 600px) { .sp-root { padding: 80px 12px 32px; } .sp-info-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
