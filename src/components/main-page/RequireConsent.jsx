import { Navigate, Outlet, useLocation } from "react-router-dom";

const COOKIE_NAME = "gdpr_consent";

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

export default function RequireConsent() {
  const location = useLocation();
  const consent = getCookie(COOKIE_NAME);

  // allow these pages even without consent
  const allowed = ["/privacy-policy", "/consent-required"];
  const isAllowed = allowed.some(
    (p) => location.pathname === p || location.pathname.startsWith(p + "/")
  );

  if (consent === "accepted" || isAllowed) {
    return <Outlet />;
  }

  return <Navigate to="/consent-required" replace />;
}
