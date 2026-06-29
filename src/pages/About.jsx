const teamMembers = [
  {
    name: "Khuon Banditbutra",
    image: "/images/pfp1.jpg",
  },
  {
    name: "Say MengKheang",
    image: "/images/pfp2.webp",
  },
  {
    name: "Vun Sovannrith",
    image: "/images/pfp3.webp",
  },
  {
    name: "Keo Sereirotana",
    image: "/images/pfp4.jpg",
  },
];

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

      <div className="team-section">
        <div className="section-heading">
          <h2>Team Nhom</h2>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <article className="team-card" key={member.name}>
              <img className="team-avatar" src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}

export default About;
