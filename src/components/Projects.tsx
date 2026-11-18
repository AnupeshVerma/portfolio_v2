import { featuredProject, otherProjects } from "../content";
import { Icon } from "./Icon";
import { ProjectFlow } from "./ProjectFlow";
import "./Projects.css";

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <h2 className="section-title" id="projects-title">
          Projects
        </h2>

        <article className="featured">
          <div className="featured-body">
            <h3 className="project-name">{featuredProject.name}</h3>
            <p className="project-summary">{featuredProject.summary}</p>

            <dl className="project-facts">
              {featuredProject.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="project-stack">{featuredProject.stack.join(", ")}</p>
            <a className="button" href={featuredProject.codeUrl} target="_blank" rel="noreferrer">
              View code on GitHub
              <Icon name="external" size={16} />
            </a>
          </div>

          <div className="featured-diagram">
            <div className="featured-flow">
              <p className="featured-flow-caption">{featuredProject.flow.caption}</p>
              <ProjectFlow flow={featuredProject.flow} />
            </div>
            <a
              className="featured-diagram-link"
              href={featuredProject.diagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open the full architecture diagram
              <Icon name="external" size={15} />
            </a>
          </div>
        </article>

        <div className="projects-more">
          {otherProjects.map((project) => (
            <article className="project" key={project.name}>
              <div
                className="project-figure"
                data-fit={project.imageFit ?? "cover"}
                style={project.imageBackdrop ? { background: project.imageBackdrop } : undefined}
              >
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
              </div>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-summary">{project.summary}</p>
              <p className="project-stack">{project.stack.join(", ")}</p>
              <a className="project-link" href={project.codeUrl} target="_blank" rel="noreferrer">
                View code on GitHub
                <Icon name="external" size={15} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
