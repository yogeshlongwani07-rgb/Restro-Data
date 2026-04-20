import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./css/onTheWay.css";

/* ── Mock data (swap with real props/context) ── */
const ORDER = {
  id: "SWG-48291",
  restaurant: "Sher-E-Punjab",
  restroAddress: "Old Itarsi Road, Hoshangabad",
  items: ["Margherita Pizza", "Pepperoni Pizza", "Veggie Supreme"],
  total: "₹876",
  placedAt: new Date(Date.now() - 8 * 60 * 1000), // 8 min ago
};

const PARTNER = {
  name: "Arjun Verma",
  phone: "+91 98XXX X4821",
  rating: 4.8,
  trips: 1243,
  vehicle: "Honda Activa · MH 12 AX 4821",
  avatar: "AV",
};

const DELIVERY = {
  address: "B-204, Emerald Heights, Sector 65, Gurugram",
  eta: 2, // minutes from now (initial)
};

/* ── Delivery stages ── */
const STAGES = [
  { id: 0, icon: "✓", label: "Order Confirmed", done: true },
  { id: 1, icon: "👨‍🍳", label: "Preparing Food", done: true },
  { id: 2, icon: "🛵", label: "Out for Delivery", done: true },
  { id: 3, icon: "📍", label: "Arriving Soon", done: false },
];

/* ── Fake map waypoints (normalised 0-1 coords on our SVG canvas) ── */
const ROUTE = [
  { x: 0.18, y: 0.72 }, // restaurant
  { x: 0.25, y: 0.58 },
  { x: 0.38, y: 0.48 },
  { x: 0.52, y: 0.4 },
  { x: 0.63, y: 0.34 },
  { x: 0.74, y: 0.3 },
  { x: 0.82, y: 0.28 }, // home
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function OnTheWay() {
  const navigate = useNavigate();

  /* ── ETA countdown ── */
  const [eta, setEta] = useState(DELIVERY.eta * 60); // seconds
  useEffect(() => {
    const id = setInterval(() => setEta((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const etaMins = Math.floor(eta / 60);
  const etaSecs = String(eta % 60).padStart(2, "0");

  /* ── Rider position along route ── */
  const [progress, setProgress] = useState(0); // 0→1
  useEffect(() => {
    const total = DELIVERY.eta * 60 * 1000;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(1, elapsed / total));
    }, 200);
    return () => clearInterval(id);
  }, []);

  /* Compute rider XY from progress along polyline */
  const riderPos = (() => {
    const seg = progress * (ROUTE.length - 1);
    const i = Math.min(Math.floor(seg), ROUTE.length - 2);
    const t = seg - i;
    return {
      x: lerp(ROUTE[i].x, ROUTE[i + 1].x, t),
      y: lerp(ROUTE[i].y, ROUTE[i + 1].y, t),
    };
  })();

  /* ── Pulse animation tick for rider dot ── */
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 900);
    return () => clearInterval(id);
  }, []);

  /* ── Call/message sheet ── */
  const [sheet, setSheet] = useState(null); // null | 'call' | 'msg'

  /* ── SVG dimensions (responsive via viewBox) ── */
  const W = 800,
    H = 420;

  /* Build road path string */
  const roadPath = ROUTE.map(
    (p, i) => `${i === 0 ? "M" : "L"} ${p.x * W} ${p.y * H}`,
  ).join(" ");

  /* Progress path (portion already travelled) */
  const travelledIdx = Math.min(
    Math.floor(progress * (ROUTE.length - 1)),
    ROUTE.length - 2,
  );
  const travelledPts = ROUTE.slice(0, travelledIdx + 2).map((p, i, arr) => {
    if (i < travelledIdx) return p;
    const seg = progress * (ROUTE.length - 1);
    const t = seg - travelledIdx;
    return i === travelledIdx + 1
      ? {
          x: lerp(ROUTE[travelledIdx].x, ROUTE[travelledIdx + 1].x, t),
          y: lerp(ROUTE[travelledIdx].y, ROUTE[travelledIdx + 1].y, t),
        }
      : p;
  });
  const travelledPath = travelledPts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x * W} ${p.y * H}`)
    .join(" ");

  return (
    <div className="otw-root">
      {/* ══════════ HERO HEADER ══════════ */}
      <header className="otw-header">
        <button className="rd-back otw-back" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="otw-header-center">
          <div className="otw-live-pill">
            <span className="otw-live-dot" />
            LIVE TRACKING
          </div>
          <h1 className="otw-headline">On the Way!</h1>
          <p className="otw-sub">Your order is speeding towards you 🛵</p>
        </div>

        {/* ── ETA pill ── */}
        <div className="otw-eta-blob">
          <span className="otw-eta-label">Arrives in</span>
          <div className="otw-eta-time">
            {etaMins}
            <span className="otw-eta-colon">:</span>
            {etaSecs}
          </div>
          <span className="otw-eta-unit">min</span>
        </div>
      </header>

      {/* ══════════ MAP ══════════ */}
      <div className="otw-map-shell">
        <svg
          className="otw-map-svg"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
        >
          {/* ── Grid / terrain blocks ── */}
          <rect width={W} height={H} fill="#eae6df" />

          {/* City blocks */}
          {[
            [20, 20, 110, 60],
            [160, 20, 90, 80],
            [290, 10, 120, 50],
            [450, 20, 100, 70],
            [590, 15, 120, 60],
            [720, 20, 60, 90],
            [20, 100, 80, 80],
            [130, 110, 100, 60],
            [260, 90, 90, 80],
            [380, 80, 120, 60],
            [530, 100, 80, 70],
            [650, 90, 100, 60],
            [20, 210, 100, 70],
            [150, 200, 80, 80],
            [260, 220, 110, 60],
            [400, 200, 90, 70],
            [520, 210, 100, 60],
            [650, 200, 80, 80],
            [740, 210, 50, 70],
            [20, 310, 90, 80],
            [140, 320, 100, 60],
            [270, 300, 80, 80],
            [380, 310, 120, 70],
            [530, 300, 90, 80],
            [650, 310, 100, 60],
            [760, 300, 35, 90],
          ].map(([x, y, w, h], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              fill={
                i % 3 === 0 ? "#ddd6ca" : i % 3 === 1 ? "#d4cec6" : "#cac4bc"
              }
              rx="4"
            />
          ))}

          {/* Green patches */}
          {[
            [350, 280, 60, 50],
            [580, 320, 70, 60],
            [100, 340, 50, 50],
          ].map(([x, y, w, h], i) => (
            <ellipse
              key={i}
              cx={x + w / 2}
              cy={y + h / 2}
              rx={w / 2}
              ry={h / 2}
              fill="#c8dbbf"
              opacity="0.7"
            />
          ))}

          {/* ── Road (unvisited) ── */}
          <path
            d={roadPath}
            stroke="#c4beb6"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={roadPath}
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="12 10"
            opacity="0.6"
          />

          {/* ── Road (travelled) ── */}
          <path
            d={travelledPath}
            stroke="#E8572A"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* ── Restaurant pin ── */}
          <g transform={`translate(${ROUTE[0].x * W}, ${ROUTE[0].y * H})`}>
            <circle r="18" fill="#fff" stroke="#E8572A" strokeWidth="2.5" />
            <text textAnchor="middle" dominantBaseline="central" fontSize="14">
              🍽️
            </text>
          </g>

          {/* ── Home pin ── */}
          <g
            transform={`translate(${ROUTE[ROUTE.length - 1].x * W}, ${ROUTE[ROUTE.length - 1].y * H})`}
          >
            <circle r="18" fill="#fff" stroke="#1db954" strokeWidth="2.5" />
            <text textAnchor="middle" dominantBaseline="central" fontSize="14">
              🏠
            </text>
          </g>

          {/* ── Rider dot with pulse ── */}
          <g transform={`translate(${riderPos.x * W}, ${riderPos.y * H})`}>
            <circle
              r={pulse ? 28 : 22}
              fill="#E8572A"
              opacity="0.15"
              style={{ transition: "r 0.9s ease" }}
            />
            <circle
              r="16"
              fill="#E8572A"
              stroke="#fff"
              strokeWidth="3"
              filter="url(#shadow)"
            />
            <text textAnchor="middle" dominantBaseline="central" fontSize="13">
              🛵
            </text>
          </g>

          {/* Shadow filter */}
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="4"
                floodColor="#E8572A"
                floodOpacity="0.4"
              />
            </filter>
          </defs>

          {/* ── Map labels ── */}
          <text
            x={ROUTE[0].x * W}
            y={ROUTE[0].y * H + 32}
            textAnchor="middle"
            fontSize="10"
            fill="#666"
            fontWeight="600"
          >
            Restaurant
          </text>
          <text
            x={ROUTE[ROUTE.length - 1].x * W}
            y={ROUTE[ROUTE.length - 1].y * H + 32}
            textAnchor="middle"
            fontSize="10"
            fill="#666"
            fontWeight="600"
          >
            Your Home
          </text>
        </svg>

        {/* Map attribution badge */}
        <div className="otw-map-badge">📍 Live Route</div>
      </div>

      {/* ══════════ CONTENT GRID ══════════ */}
      <div className="otw-grid">
        {/* ── LEFT: Partner + Progress ── */}
        <div className="otw-col-left">
          {/* Partner card */}
          <div className="otw-card otw-partner-card">
            <div className="otw-card-head">
              <h3>Delivery Partner</h3>
            </div>

            <div className="otw-partner-body">
              <div className="otw-avatar-wrap">
                <div className="otw-avatar">{PARTNER.avatar}</div>
                <div className="otw-avatar-online" />
              </div>

              <div className="otw-partner-info">
                <p className="otw-partner-name">{PARTNER.name}</p>
                <div className="otw-partner-meta">
                  <span className="otw-star">⭐ {PARTNER.rating}</span>
                  <span className="otw-dot-sep">·</span>
                  <span>{PARTNER.trips.toLocaleString()} trips</span>
                </div>
                <p className="otw-vehicle">{PARTNER.vehicle}</p>
              </div>

              <div className="otw-contact-btns">
                <button
                  className="otw-contact-btn otw-call-btn"
                  onClick={() => setSheet("call")}
                  aria-label="Call partner"
                >
                  <span>📞</span>
                  <span>Call</span>
                </button>
                <button
                  className="otw-contact-btn otw-msg-btn"
                  onClick={() => setSheet("msg")}
                  aria-label="Message partner"
                >
                  <span>💬</span>
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Progress tracker */}
          <div className="otw-card otw-progress-card">
            <div className="otw-card-head">
              <h3>Order Progress</h3>
              <span className="otw-order-id">#{ORDER.id}</span>
            </div>

            <div className="otw-stages">
              {STAGES.map((s, i) => (
                <div
                  key={s.id}
                  className={`otw-stage ${s.done ? "done" : "pending"}`}
                >
                  <div className="otw-stage-track">
                    <div className="otw-stage-node">
                      {s.done ? "✓" : s.icon}
                    </div>
                    {i < STAGES.length - 1 && (
                      <div
                        className={`otw-stage-line ${STAGES[i + 1].done ? "done" : ""}`}
                      />
                    )}
                  </div>
                  <div className="otw-stage-text">
                    <span className="otw-stage-label">{s.label}</span>
                    {s.done && i === 2 && (
                      <span className="otw-stage-time">Just now</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Address + Order summary ── */}
        <div className="otw-col-right">
          {/* Delivery address */}
          <div className="otw-card otw-address-card">
            <div className="otw-card-head">
              <h3>Delivering To</h3>
              <span className="otw-home-tag">🏠 Home</span>
            </div>

            <div className="otw-address-body">
              <div className="otw-address-icon">📍</div>
              <p className="otw-address-text">{DELIVERY.address}</p>
            </div>

            <div className="otw-address-meta">
              <div className="otw-address-row">
                <span className="otw-addr-label">Phone</span>
                <span className="otw-addr-val">{PARTNER.phone}</span>
              </div>
              <div className="otw-address-row">
                <span className="otw-addr-label">Order ID</span>
                <span className="otw-addr-val">#{ORDER.id}</span>
              </div>
              <div className="otw-address-row">
                <span className="otw-addr-label">From</span>
                <span className="otw-addr-val">{ORDER.restaurant}</span>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="otw-card otw-summary-card">
            <div className="otw-card-head">
              <h3>Order Summary</h3>
              <span className="otw-total-pill">{ORDER.total}</span>
            </div>

            <ul className="otw-items-list">
              {ORDER.items.map((item, i) => (
                <li key={i} className="otw-item-row">
                  <span className="otw-item-dot" />
                  <span className="otw-item-name">{item}</span>
                </li>
              ))}
            </ul>

            <div className="otw-summary-footer">
              <span className="otw-from-line">From {ORDER.restaurant}</span>
              <span className="otw-placed-line">
                Placed {Math.round((Date.now() - ORDER.placedAt) / 60000)} min
                ago
              </span>
            </div>
          </div>

          {/* Support */}
          <div className="otw-card otw-support-card">
            <span className="otw-support-icon">🛟</span>
            <div>
              <p className="otw-support-title">Need help with your order?</p>
              <p className="otw-support-sub">Our team is available 24/7</p>
            </div>
            <button className="otw-support-btn">Help</button>
          </div>
        </div>
      </div>

      {/* ══════════ CONTACT BOTTOM SHEET ══════════ */}
      {sheet && (
        <div className="otw-sheet-overlay" onClick={() => setSheet(null)}>
          <div className="otw-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="otw-sheet-handle" />

            {sheet === "call" ? (
              <>
                <div className="otw-sheet-avatar">{PARTNER.avatar}</div>
                <p className="otw-sheet-name">{PARTNER.name}</p>
                <p className="otw-sheet-phone">{PARTNER.phone}</p>
                <a
                  href={`tel:${PARTNER.phone}`}
                  className="otw-sheet-cta otw-sheet-call"
                >
                  📞 Call Now
                </a>
                <button
                  className="otw-sheet-cancel"
                  onClick={() => setSheet(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="otw-sheet-avatar">{PARTNER.avatar}</div>
                <p className="otw-sheet-name">Message {PARTNER.name}</p>
                <div className="otw-quick-msgs">
                  {[
                    "Please call on arrival 🔔",
                    "Leave at the door 🚪",
                    "I'm on my way down 🏃",
                    "Please hurry! 🙏",
                  ].map((m) => (
                    <button key={m} className="otw-quick-msg">
                      {m}
                    </button>
                  ))}
                </div>
                <button className="otw-sheet-cta otw-sheet-msg-send">
                  💬 Send Message
                </button>
                <button
                  className="otw-sheet-cancel"
                  onClick={() => setSheet(null)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
