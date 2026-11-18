import { skills } from "../content";
import "./Skills.css";

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <h2 className="section-title" id="skills-title">
          Skills
        </h2>
        <dl className="skills">
          {skills.map((group) => (
            <div className="skills-row" key={group.group}>
              <dt>{group.group}</dt>
              <dd>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
