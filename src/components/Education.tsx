import { education, recognition } from "../content";
import "./Education.css";

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-title">
      <div className="container background">
        <div>
          <h2 className="section-title" id="education-title">
            Education
          </h2>
          <h3 className="school">{education.school}</h3>
          <p className="school-degree">{education.degree}</p>
          <p className="school-meta">
            {education.period}, {education.detail}
          </p>
        </div>

        <div>
          <h2 className="section-title" id="recognition-title">
            Recognition
          </h2>
          <ul className="recognition" aria-labelledby="recognition-title">
            {recognition.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                {item.links && (
                  <p className="recognition-links">
                    {item.links.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
