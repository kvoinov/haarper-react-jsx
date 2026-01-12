import { Link } from "react-router-dom";
import { canon } from "../../helpers/dumb/canonisation";
const links = [
  { slug: "ai-automation", title: "AI & Workflow Automation" },
  { slug: "it-consulting", title: "IT Consulting" },
  { slug: "software-development", title: "Software Development" },
  { slug: "it-support", title: "IT Support" },
  { slug: "web-development", title: "Web Development" },
  { slug: "knowledge-management", title: "Knowledge Management" },
];
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <a href="/" className="logo">
              <img src="/logo_noback.png" alt="logo" />
            </a>

            <div className="social-links">
              <a
                target="_blank"
                href="https://www.linkedin.com/company/haarper/"
                className="social-link"
              >
                <img src="/assets/icons/linked.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Services</h3>
            <ul>
              {links.map((s) => (
                <li>
                  <Link
                    to={canon(`/services/${s.slug}`)}
                    className="service-card-link"
                  >
                    <div>{s.title}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#why-us">Why Choose Us</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
              <li>
                <Link to={canon(`/privacy-policy`)}>Privacy Policy</Link>
              </li>
              <li></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="#">Rua Jacinto Nunes 19</a>
              </li>
              <li>
                <a href="#">Lisbon, 1170-187</a>
              </li>
              <li>
                <a href="#">Portugal</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} Haarper Technologies. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
