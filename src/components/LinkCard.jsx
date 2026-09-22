import './LinkCard.css'

export function LinkCard({ name, url, description, image, imageAlt }) {
  return (
    <article className="link-card">
      <img className="link-card-image" src={image} alt={imageAlt} />
      <h2 className="link-card-title">{name}</h2>
      <p className="link-card-text">{description}</p>
      <a
        className="link-card-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit {name}
      </a>
    </article>
  )
}
