import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/support.css";

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
  if (t.includes("rate") || t.includes("review") || t.includes("rating")) {
    return `Thanks for rating your order from ${order.restaurant}! Your feedback helps us serve you better. ⭐`;
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
      {/* <button className="sp-back-btn" onClick={() => navigate(-1)}>
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
      </button> */}

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

        {/* RIGHT — Orders + Detail */}
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
                <button
                  className="sp-action-btn rate"
                  onClick={() => sendMsg("Rate and review")}
                >
                  <span>⭐</span> Rate Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
