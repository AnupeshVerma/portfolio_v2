import { experience } from "../content";
import "./Experience.css";

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <h2 className="section-title" id="experience-title">
          Experience
        </h2>

        <div className="jobs">
          {experience.map((job) => (
            <article className="job" key={job.company}>
              <header className="job-header">
                <h3 className="job-company">{job.company}</h3>
                <p className="job-meta">
                  {job.note && <span>{job.note}, </span>}
                  {job.location}
                </p>
              </header>

              <ol className="roles">
                {job.roles.map((role) => (
                  <li className="role" key={role.title}>
                    <p className="role-period">{role.period}</p>
                    <div className="role-body">
                      <h4 className="role-title">{role.title}</h4>
                      <ul className="role-points">
                        {role.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
