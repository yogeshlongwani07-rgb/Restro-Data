import { useState, useContext } from "react";
import "./css/profile.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./main";

function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

function EditModal({ field, label, value, onClose, onSave }) {
  const [val, setVal] = useState(value);
  return (
    <div className="pf-overlay" onClick={onClose}>
      <div className="pf-modal edit-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pf-modal-close" onClick={onClose}>
          ✕
        </button>
        <h3 className="pf-modal-title">Edit {label}</h3>
        <p className="pf-modal-sub muted small">
          Update your {label.toLowerCase()} details
        </p>
        <input
          className="pf-input"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          autoFocus
        />
        <div className="pf-modal-actions">
          <button className="pf-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="pf-btn-primary"
            onClick={() => {
              onSave(field, val);
              onClose();
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function AddressCard({ address, onSetDefault, onDelete }) {
  return (
    <div className={`pf-address-card ${address.default ? "default" : ""}`}>
      {address.default && <span className="pf-default-badge">Default</span>}
      <div className="pf-address-top">
        <div className="pf-address-icon">{address.icon}</div>
        <div className="pf-address-body">
          <div className="pf-address-tag">{address.tag}</div>
          <div className="pf-address-line">{address.line1}</div>
          <div className="pf-address-line muted">{address.line2}</div>
        </div>
      </div>
      <div className="pf-address-actions">
        {!address.default && (
          <button
            className="pf-addr-btn"
            onClick={() => onSetDefault(address.id)}
          >
            Set as Default
          </button>
        )}
        <button
          className="pf-addr-btn danger"
          onClick={() => onDelete(address.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user: authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultUser = {
    name: authUser?.name || "Guest User",
    initials: getInitials(authUser?.name || "Guest User"),
    email: authUser?.email || "Not provided",
    mobile: "Not provided",
    gender: "Not specified",
    dob: "Not provided",
    memberSince: authUser ? "Recently joined" : "Not logged in",
    totalOrders: 0,
    totalSaved: 0,
    recentBadge: "🍔 Burger Lover",
  };

  const defaultAddresses = [];
  const defaultPrefs = {
    notifications: true,
    smsUpdates: false,
    promoEmails: true,
  };

  const [user, setUser] = useState(defaultUser);
  const [editModal, setEditModal] = useState(null);
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (field, value) => {
    setUser((u) => ({ ...u, [field]: value }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, default: a.id === id })));
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const togglePref = (key) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const fields = [
    { key: "name", label: "Full Name", icon: "👤", value: user.name },
    { key: "email", label: "Email", icon: "✉️", value: user.email },
    { key: "mobile", label: "Mobile", icon: "📱", value: user.mobile },
    { key: "gender", label: "Gender", icon: "⚧️", value: user.gender },
    { key: "dob", label: "Date of Birth", icon: "🎂", value: user.dob },
  ];

  return (
    <div className="pf-root">
      {/* ── Back Button ── */}
      <div className="pf-back-bar">
        {/* <button className="pf-back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </button> */}
      </div>

      {/* ── Hero ── */}
      <div className="pf-hero">
        <div className="pf-hero-bg" />
        <div className="pf-hero-content">
          <div className="pf-avatar-wrap">
            <div className="pf-avatar">{user.initials}</div>
            <button className="pf-avatar-edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="pf-hero-info">
            <h1 className="pf-name">{user.name}</h1>
            <p className="pf-email-display">{user.email}</p>
            <div className="pf-hero-badges">
              <span className="pf-badge member">🥇 {user.memberSince}</span>
              <span className="pf-badge earned">{user.recentBadge}</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="pf-stats-row">
          <div className="pf-stat">
            <div className="pf-stat-val">{user.totalOrders}</div>
            <div className="pf-stat-label">Total Orders</div>
          </div>
          <div className="pf-stat-divider" />
          <div className="pf-stat">
            <div className="pf-stat-val">
              ₹{user.totalSaved.toLocaleString("en-IN")}
            </div>
            <div className="pf-stat-label">Total Saved</div>
          </div>
          <div className="pf-stat-divider" />
          <div className="pf-stat">
            <div className="pf-stat-val">{addresses.length}</div>
            <div className="pf-stat-label">Saved Addresses</div>
          </div>
        </div>
      </div>

      {saved && (
        <div className="pf-toast">
          <span>✓</span> Changes saved successfully
        </div>
      )}

      {/* ── Personal Info ── */}
      <div className="pf-section">
        <div className="pf-section-header">
          <div>
            <h2 className="pf-section-title">Personal Information</h2>
            <p className="pf-section-sub muted small">
              Your account details & identity
            </p>
          </div>
        </div>

        <div className="pf-fields-list">
          {fields.map((f) => (
            <div className="pf-field-row" key={f.key}>
              <div className="pf-field-left">
                <span className="pf-field-icon">{f.icon}</span>
                <div>
                  <div className="pf-field-label">{f.label}</div>
                  <div className="pf-field-value">{f.value}</div>
                </div>
              </div>
              <button
                className="pf-edit-btn"
                onClick={() =>
                  setEditModal({ field: f.key, label: f.label, value: f.value })
                }
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Addresses ── */}
      <div className="pf-section">
        <div className="pf-section-header">
          <div>
            <h2 className="pf-section-title">Saved Addresses</h2>
            <p className="pf-section-sub muted small">
              Your delivery locations
            </p>
          </div>
          {/* <button className="pf-add-btn">
            <span>+</span> Add New
          </button> */}
        </div>

        <div className="pf-address-list">
          {addresses.map((a) => (
            <AddressCard
              key={a.id}
              address={a}
              onSetDefault={handleSetDefault}
              onDelete={handleDeleteAddress}
            />
          ))}
          {addresses.length === 0 && (
            <div className="pf-empty-state">
              <div className="pf-empty-icon">📍</div>
              <p>No saved addresses yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Preferences ── */}
      <div className="pf-section">
        <div className="pf-section-header">
          <div>
            <h2 className="pf-section-title">Notification Preferences</h2>
            <p className="pf-section-sub muted small">
              Control how we reach you
            </p>
          </div>
        </div>

        <div className="pf-prefs-list">
          {[
            {
              key: "notifications",
              label: "Order Notifications",
              desc: "Get real-time delivery updates",
              icon: "🔔",
            },
            {
              key: "smsUpdates",
              label: "SMS Updates",
              desc: "Receive order alerts via SMS",
              icon: "💬",
            },
            {
              key: "promoEmails",
              label: "Promo Emails",
              desc: "Deals, offers & new restaurants",
              icon: "🎁",
            },
          ].map((p) => (
            <div className="pf-pref-row" key={p.key}>
              <div className="pf-pref-left">
                <span className="pf-field-icon">{p.icon}</span>
                <div>
                  <div className="pf-pref-label">{p.label}</div>
                  <div className="pf-pref-desc muted small">{p.desc}</div>
                </div>
              </div>
              <button
                className={`pf-toggle ${prefs[p.key] ? "on" : "off"}`}
                onClick={() => togglePref(p.key)}
                aria-label={`Toggle ${p.label}`}
              >
                <div className="pf-toggle-knob" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Danger zone ── */}
      <div className="pf-section danger-zone">
        <div className="pf-section-header">
          <div>
            <h2 className="pf-section-title">Account</h2>
            <p className="pf-section-sub muted small">
              Manage your account access
            </p>
          </div>
        </div>
        <div className="pf-danger-btns">
          <button
            className="pf-btn-logout"
            onClick={() => setLogoutConfirm(true)}
          >
            <span>🚪</span> Log Out
          </button>
          {/* <button className="pf-btn-delete">
            <span>🗑️</span> Delete Account
          </button> */}
        </div>
      </div>

      {/* ── Edit Modal ── */}
      {editModal && (
        <EditModal
          field={editModal.field}
          label={editModal.label}
          value={editModal.value}
          onClose={() => setEditModal(null)}
          onSave={handleSave}
        />
      )}

      {/* ── Logout confirm ── */}
      {logoutConfirm && (
        <div className="pf-overlay" onClick={() => setLogoutConfirm(false)}>
          <div
            className="pf-modal confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="pf-modal-close"
              onClick={() => setLogoutConfirm(false)}
            >
              ✕
            </button>
            <div className="confirm-icon">👋</div>
            <h3 className="pf-modal-title">Log out?</h3>
            <p className="pf-modal-sub muted small">
              You'll need to sign in again to place orders.
            </p>
            <div className="pf-modal-actions">
              <button
                className="pf-btn-secondary"
                onClick={() => setLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button className="pf-btn-primary danger-btn">Log Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
