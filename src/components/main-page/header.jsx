import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ onScheduleClick }) {
  const nav_links = [
    { label: "Services", href: "#services" },
    { label: "Events", href: "/events" },
    { label: "About", href: "#about" },
    { label: "Why us", href: "#why-us" },
    { label: "Case Studies", href: "/case-studies/remax" },
    { label: "Testimonials", href: "#clients" },
  ];
  // ALL other pages always solid

  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const consent = document.cookie.match(/(^| )gdpr_consent=([^;]+)/)?.[2];
    document.body.style.overflow = consent !== "accepted" ? "hidden" : "auto";
  }, []);

  // NEW: detect scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);

      if (location.pathname !== "/") {
        navigate("/", { replace: false });

        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate(href);
    }
  };
  const isHome = location.pathname === "/";
  const headerMode = isHome
    ? isScrolled
      ? "is-solid"
      : "is-transparent" // home can be transparent at top
    : "is-solid";
  return (
    <header className={`site-header ${headerMode}`}>
      <div className="container">
        <nav>
          <Link
            to="/"
            className="logo"
            aria-label="Go to home"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            {/* Logo for transparent header (top of home page) */}
            <img
              src="/logo_noback_white.png"
              alt="Haarper"
              className="logo-img logo-img--transparent"
            />

            {/* Logo for solid header (scrolled/hover) */}
            <img
              src="/logo_noback.png"
              alt="Haarper"
              className="logo-img logo-img--solid"
            />
          </Link>

          <div className="nav-links">
            {nav_links.map((nav) => (
              <li key={nav.label}>
                {nav.href.startsWith("#") ? (
                  <a href={nav.href} onClick={(e) => handleClick(e, nav.href)}>
                    {nav.label}
                  </a>
                ) : (
                  <a href={nav.href}>{nav.label}</a>
                )}
              </li>
            ))}
          </div>

          <a
            href="#contact"
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              navigate("/?scrollToContact=true");
              setTimeout(() => {
                onScheduleClick?.();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            Contact us!
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
