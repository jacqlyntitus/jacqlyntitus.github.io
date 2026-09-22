import './Links.css'
import { LinkCard } from '../components/LinkCard'
import { links } from '../data/links'

function Links() {
  return (
    <div className="links-page">
      <h1>Links</h1>
      <p className="links-intro">Resources I use while learning and building.</p>

      <section className="links-section">
        {links.map((link) => (
          <LinkCard key={link.name} {...link} />
        ))}
      </section>
    </div>
  )
}

export default Links
