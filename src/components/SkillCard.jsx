import './SkillCard.css'

export function SkillCard({ icon: Icon, title, description }) {
  return (
    <article className="skill-card">
      <Icon className="skill-card-icon" size={32} aria-hidden="true" />
      <h3 className="skill-card-title">{title}</h3>
      <p className="skill-card-text">{description}</p>
    </article>
  )
}
