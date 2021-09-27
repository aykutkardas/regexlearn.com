import "./landing-page.scss";

import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="container">
      <div className="content landing">
        <h1>
          Learn ReGex, step by step, zero to advanced. Test and Share RegEx.
        </h1>
        <p>
          <span className="highlight">RegEx</span> is not as difficult as you
          might think. You can use this tool to{" "}
          <span className="highlight">learn</span>,{" "}
          <span className="highlight">practice</span>,{" "}
          <span className="highlight">test</span> and{" "}
          <span className="highlight">share</span> regex easily.
        </p>
        <Link to="/learn">
          <button className="primary">Learn</button>
        </Link>
        <button disabled>Playgroud</button>
      </div>
      <div className="intro"></div>
    </div>
  );
}

export default LandingPage;
