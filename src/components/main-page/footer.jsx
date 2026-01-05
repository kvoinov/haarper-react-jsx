function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <a href="#" className="logo">
              <img src="/logo_noback.png" alt="logo" />
            </a>

            <div className="social-links">
              <a href="#" className="social-link">
                <img src="/assets/linked.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Services</h3>
            <ul>
              <li>
                <a href="#services">AI & Workflow Automation</a>
              </li>
              <li>
                <a href="#services">IT Consulting</a>
              </li>
              <li>
                <a href="#services">IT Support</a>
              </li>
              <li>
                <a href="#services">Software Development</a>
              </li>
              <li>
                <a href="#services">Web Development</a>
              </li>
              <li>
                <a href="#services">Knowledge Management</a>
              </li>
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
              <li></li>
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

        <div className="copyright">© 2025 Haarper. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
