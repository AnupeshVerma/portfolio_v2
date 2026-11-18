import { hero, profile } from "../content";
import { Icon } from "./Icon";
import { PipelineRun } from "./PipelineRun";
import "./Hero.css";

export function Hero() {
  return (
    <div className="hero" id="top">
      <div className="container">
        <h1 className="hero-headline">{hero.headline}</h1>
        <p className="hero-intro">{hero.intro}</p>
        <div className="hero-actions">
          <a
            className="button button-primary"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            View resume
            <Icon name="external" size={16} />
          </a>
          <a className="button" href="#projects">
            See projects
          </a>
          <ul className="hero-links">
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <PipelineRun />
      </div>
    </div>
  );
}
