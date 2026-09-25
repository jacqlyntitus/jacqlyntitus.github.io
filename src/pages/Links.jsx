import './Links.css'
import { Banner } from '../components/Banner'
import { LinkCard } from '../components/LinkCard'
import { links } from '../data/links'

function Links() {
  return (
    <div className="links-page">
      <Banner title="Links" />
      <p className="links-intro">Where to find me online, plus a resource I use while building.</p>

      <section className="links-section">
        {links.map((link) => (
          <LinkCard key={link.name} {...link} />
        ))}
      </section>
    </div>
  )
}

export default Links
