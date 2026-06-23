function About() {
  return (
    <section className="section page-section">
      <div className="page-header">
        <p className="eyebrow">Our story</p>
        <h1>StudentSpace Store is built for modern student life.</h1>
        <p>
          We bring together products that support study, comfort, creativity,
          and everyday routines in a clean shopping experience.
        </p>
      </div>

      <div className="about-grid">
        <div className="info-card">
          <h3>Simple shopping</h3>
          <p>
            Products are easy to browse, search, filter, and add to your cart.
          </p>
        </div>
        <div className="info-card">
          <h3>Student lifestyle</h3>
          <p>
            The store focuses on modern products that fit dorm rooms, study
            corners, and busy schedules.
          </p>
        </div>
        <div className="info-card">
          <h3>Real API data</h3>
          <p>
            Every product comes from DummyJSON, so the project demonstrates real
            frontend fetching with fetch().
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
