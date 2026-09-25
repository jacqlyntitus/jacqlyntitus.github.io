import './Home.css'
import heroImage from '../assets/jt-logo.png'
import skillsImage from '../assets/home-skills.png'
import softSkillsImage from '../assets/home-soft-skills.png'
import { SkillCard } from '../components/SkillCard'
import { softSkills, technicalSkills } from '../data/skills'

function Home() {
  return (
    <div className="home">
      <section className="home-section home-intro">
        <div className="home-intro-text">
          <h1 className="home-name">Jacqlyn Titus</h1>
          <p className="home-tagline">Full-Stack Developer</p>
          <p>
            I&apos;m an AI-native full-stack developer who enjoys understanding
            how systems work from end to end. I love problem solving: stepping
            back to see the big picture, then zeroing in on the details that
            fix it.
          </p>
          <p>
            Twelve years in healthcare taught me to be prompt, precise, and
            comfortable working directly with clients, and I bring that same
            care to every project.
          </p>
        </div>
        <img
          className="home-image"
          src={heroImage}
          alt="Jacqlyn Titus JT monogram logo"
        />
      </section>

      <section className="home-section home-technical">
        <div className="home-banner">
          <img
            className="home-banner-image"
            src={skillsImage}
            alt="AI-generated banner of glowing circuitry intertwined with leaves"
          />
          <h2 className="home-heading">Technical Skills</h2>
        </div>
        <div className="home-grid home-grid-two">
          {technicalSkills.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

      <section className="home-section home-soft">
        <div className="home-banner">
          <img
            className="home-banner-image"
            src={softSkillsImage}
            alt="AI-generated banner of glowing light and leaves suggesting connection and growth"
          />
          <h2 className="home-heading">Soft Skills</h2>
        </div>
        <div className="home-grid home-grid-three">
          {softSkills.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
