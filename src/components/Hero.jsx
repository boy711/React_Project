import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Premium picks for campus life</p>
        <h1>Upgrade your student space with smart everyday products.</h1>
        <p>
          Discover clean, modern, and useful items selected for study rooms,
          dorms, and student routines.
        </p>
        <Link className="primary-button" to="/shop">
          Shop Now
        </Link>
      </div>
      <div className="hero-panel">
        <span>New Collection</span>
        <strong>Study. Live. Create.</strong>
        <p>Curated products from DummyJSON with real API fetching.</p>
      </div>
    </section>
  );
}

export default Hero;
