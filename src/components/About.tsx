import { about, profile } from "../content";
import "./About.css";

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about-text">
          <h2 className="section-title" id="about-title">
            About
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside className="about-side">
          <img
            className="about-photo"
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            width={144}
            height={144}
            loading="lazy"
          />
          <dl className="about-facts">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
