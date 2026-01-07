import { Link } from "react-router-dom";

const ConsentRequired = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>Consent Required</h1>
    <p>
      You did not accept our privacy policy. Unfortunately, you cannot continue
      using the website without accepting it.
    </p>
    <p>
      Please review our
      <Link to={`/privacy-policy`}>Privacy Policy</Link>. and accept to proceed.
    </p>
  </div>
);

export default ConsentRequired;
