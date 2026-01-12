import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const COOKIE_NAME = "gdpr_consent";

const styles = {
  overlay: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
    pointerEvents: "none", // lets the rest of the site remain clickable
  },
  popup: {
    pointerEvents: "auto", // but the banner itself is clickable
    backgroundColor: "#fff",
    padding: "1rem 1.25rem",
    borderRadius: "8px",
    maxWidth: "720px",
    width: "100%",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  button: {
    padding: "0.5rem 0.9rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  accept: {
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  refuse: {
    backgroundColor: "#e9ecef",
    color: "#111",
  },
  text: {
    flex: "1 1 320px",
    margin: 0,
  },
};

function GDPRConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (consent !== "accepted" && consent !== "refused") {
      setIsVisible(true);
    }
  }, []);

  const acceptConsent = () => {
    setCookie(COOKIE_NAME, "accepted", 365);
    window.dispatchEvent(new Event("gdpr-consent-changed"));
    setIsVisible(false);
  };

  const refuseConsent = () => {
    setCookie(COOKIE_NAME, "refused", 365);
    window.dispatchEvent(new Event("gdpr-consent-changed"));
    setIsVisible(false);
  };

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    // SameSite helps; Secure is good when you're on HTTPS
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; Secure`;
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  if (!isVisible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <p style={styles.text}>
          We use cookies to improve your experience. You can accept or refuse
          non-essential cookies. Read our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={refuseConsent}
            style={{ ...styles.button, ...styles.refuse }}
          >
            Refuse
          </button>
          <button
            onClick={acceptConsent}
            style={{ ...styles.button, ...styles.accept }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default GDPRConsent;
