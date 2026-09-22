import './ProjectCard.css'

export function ProjectCard({ name, tech, description, image, imageAlt }) {
  return (
    <article className="project-card">
      <img className="project-card-image" src={image} alt={imageAlt} />
      <h3 className="project-card-title">{name}</h3>
      <ul className="project-card-tech">
        {tech.map((item) => (
          <li key={item} className="project-card-tag">
            {item}
          </li>
        ))}
      </ul>
      <p className="project-card-text">{description}</p>
    </article>
  )
}
