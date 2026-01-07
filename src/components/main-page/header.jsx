import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ onScheduleClick }) {
  const nav_links = [
    { label: "Services", href: "#services" },
    { label: "Events", href: "/events" },
    { label: "Our Clients", href: "#clients" },

    { label: "Why us", href: "#why-us" },
    { label: "Case Studies", href: "/case-studies/remax" },
    { label: "About", href: "/about" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const consent = document.cookie.match(/(^| )gdpr_consent=([^;]+)/)?.[2];
    document.body.style.overflow = consent !== "accepted" ? "hidden" : "auto";
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Optional: lock page scroll when menu is open (mobile UX)
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const handleClick = (e, href) => {
    // always close menu when a link is clicked
    setMenuOpen(false);

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
      : "is-transparent"
    : "is-solid";

  return (
    <header
      className={`site-header ${headerMode} ${menuOpen ? "menu-open" : ""}`}
    >
      <div className="container">
        <nav className="site-nav">
          <Link
            to="/"
            className="logo"
            aria-label="Go to home"
            onClick={() => {
              setMenuOpen(false);
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/logo_noback_white.png"
              alt="Haarper"
              className="logo-img logo-img--transparent"
            />
            <img
              src="/logo_noback.png"
              alt="Haarper"
              className="logo-img logo-img--solid"
            />
          </Link>

          {/* Desktop links */}
          <ul className="nav-links nav-links--desktop">
            {nav_links.map((nav) => (
              <li key={nav.label}>
                {nav.href.startsWith("#") ? (
                  <a href={nav.href} onClick={(e) => handleClick(e, nav.href)}>
                    {nav.label}
                  </a>
                ) : (
                  <Link to={nav.href} onClick={() => setMenuOpen(false)}>
                    {nav.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="btn btn--desktop"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
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

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
          </button>
        </nav>

        {/* Mobile menu panel */}
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <ul className="mobile-menu__links">
            {nav_links.map((nav) => (
              <li key={nav.label}>
                {nav.href.startsWith("#") ? (
                  <a href={nav.href} onClick={(e) => handleClick(e, nav.href)}>
                    {nav.label}
                  </a>
                ) : (
                  <Link to={nav.href} onClick={() => setMenuOpen(false)}>
                    {nav.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="btn mobile-menu__cta"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
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
        </div>
      </div>
    </header>
  );
}

export default Header;
