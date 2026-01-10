import { useEffect, useMemo, useState } from "react";

const COOKIE_NAME = "gdpr_consent";

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [consent, setConsent] = useState(() => getCookie(COOKIE_NAME));

  useEffect(() => {
    const onChange = () => setConsent(getCookie(COOKIE_NAME));
    window.addEventListener("gdpr-consent-changed", onChange);
    return () => window.removeEventListener("gdpr-consent-changed", onChange);
  }, []);

  const showAccept = useMemo(() => consent !== "accepted", [consent]);

  const acceptHere = () => {
    setCookie(COOKIE_NAME, "accepted", 365);
    setConsent("accepted");
    window.dispatchEvent(new Event("gdpr-consent-changed"));
    document.body.style.overflow = "auto"; // in case the popup locked it
  };

  return (
    <div className="policy" id="policy">
      <h1>Privacy Policy</h1>
      {showAccept && (
        <div
          style={{
            margin: "1.25rem 0",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: 0 }}>
            You haven’t accepted cookies yet. This website uses cookies to
            ensure you get the best experience. By continuing, you agree to our
            use of cookies.
          </p>
          <button
            onClick={acceptHere}
            style={{
              marginTop: "0.75rem",
              padding: "0.6rem 1rem",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#007BFF",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Accept cookies
          </button>
        </div>
      )}
      <p>
        We value your privacy. This Privacy Policy explains how we collect, use,
        and protect your personal information when you use our website.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address,
        and phone number when you fill out forms on our site.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use your information to process event registrations, respond to
        inquiries, and improve our services.
      </p>

      <h2>3. Cookies</h2>
      <p>
        We use cookies to enhance user experience and analyze website traffic.
        By using our site, you consent to our use of cookies.
      </p>

      <h2>4. Your Rights</h2>
      <p>
        You have the right to request access to or deletion of your personal
        data. Contact us at info@haarper.pt for any data-related requests.
      </p>

      <h2>5. Contact</h2>
      <p>
        If you have any questions about this policy, please contact us at
        info@haarper.pt.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
