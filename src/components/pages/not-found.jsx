import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section style={{ padding: "8rem 0" }}>
      <div className="container">
        <h1>404 — Page not found</h1>
        <p>The page you’re looking for doesn’t exist.</p>

        <div style={{ marginTop: "1.5rem" }}>
          <Link className="btn" to="/">
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
