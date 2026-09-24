import { Download } from 'lucide-react'
import './Portfolio.css'
import experienceImage from '../assets/portfolio-experience.png'
import projectsImage from '../assets/portfolio-projects.png'
import { ProjectCard } from '../components/ProjectCard'
import { education, projects, work } from '../data/portfolio'

function Portfolio() {
  return (
    <div className="portfolio">
      <div className="portfolio-top">
        <h1>Portfolio</h1>
        <a
          className="portfolio-resume-link"
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          download="Jacqlyn-Titus-Resume.pdf"
        >
          <Download size={18} aria-hidden="true" />
          Download Resume (PDF)
        </a>
      </div>

      <section className="portfolio-section portfolio-education">
        <h2 className="portfolio-heading">Education</h2>
        <div className="portfolio-grid">
          {education.map((entry) => (
            <article key={entry.institution} className="portfolio-card">
              <p className="portfolio-card-title">{entry.institution}</p>
              <p className="portfolio-card-text">{entry.program}</p>
              <p className="portfolio-card-text">{entry.dates}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-work">
        <div className="portfolio-banner">
          <img
            className="portfolio-banner-image"
            src={experienceImage}
            alt="AI-generated banner of a glowing purple line winding through gold leaves"
          />
          <h2 className="portfolio-heading">Work Experience</h2>
        </div>
        <div className="portfolio-grid">
          {work.map((entry) => (
            <article key={entry.title} className="portfolio-card">
              <p className="portfolio-card-title">{entry.title}</p>
              <p className="portfolio-card-text">{entry.organization}</p>
              <p className="portfolio-card-text">{entry.dates}</p>
              <p className="portfolio-card-text">{entry.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-projects">
        <div className="portfolio-banner">
          <img
            className="portfolio-banner-image"
            src={projectsImage}
            alt="AI-generated banner of a glowing orange line winding through gold leaves"
          />
          <h2 className="portfolio-heading">Projects</h2>
        </div>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Portfolio
