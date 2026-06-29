import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        
        <h1>StudentSpace Store</h1>
        <p>
          A cleaner way to browse everyday essentials for study desks, small
          rooms, and the busy routines in between.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/shop">
            Shop
          </Link>
          <Link className="secondary-button" to="/about">
            Our story
          </Link>
          
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-photo"></div>
        <div className="hero-card">
          <span>New season setup</span>
          <strong>Study. Rest. Repeat.</strong>
          <p>Simple products styled for real student spaces.</p>
        </div>
        <div className="hero-stats">

        </div>
      </div>
    </section>
  );
}

export default Hero;
