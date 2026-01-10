import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const COOKIE_NAME = "gdpr_consent";

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  popup: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#555",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  link: {
    color: "#007BFF",
    textDecoration: "underline",
    cursor: "pointer",
    marginLeft: "4px",
  },
};

function GDPRConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (consent !== "accepted") {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, []);

  const acceptConsent = () => {
    setCookie(COOKIE_NAME, "accepted", 365);
    window.dispatchEvent(new Event("gdpr-consent-changed"));

    closePopup();
  };

  const closePopup = () => {
    setIsVisible(false);
    document.body.style.overflow = "auto";
  };

  const noConsent = () => {
    setCookie(COOKIE_NAME, "refused", 365);
    window.dispatchEvent(new Event("gdpr-consent-changed"));
    navigate("/consent-required");
    closePopup();
  };

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  if (!isVisible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button onClick={noConsent} style={styles.closeButton}>
          ×
        </button>
        <h2>We Value Your Privacy</h2>
        <p>
          This website uses cookies to ensure you get the best experience. By
          continuing, you agree to our use of cookies. Read our{" "}
          <Link to={`/privacy-policy`}> Privacy Policy</Link>.
        </p>
        <button onClick={acceptConsent} style={styles.button}>
          I Accept
        </button>
      </div>
    </div>
  );
}

export default GDPRConsent;
