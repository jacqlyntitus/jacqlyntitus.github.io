import './Home.css'
import heroImage from '../assets/home-hero.png'
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
            I&apos;m a full-stack developer who enjoys understanding how systems
            work from end to end. I love problem solving: stepping back to see
            the big picture, then zeroing in on the details that fix it. Twelve
            years in healthcare taught me to be prompt, precise, and
            comfortable working directly with clients, and I bring that same
            care to every project.
          </p>
        </div>
        <img
          className="home-image"
          src={heroImage}
          alt="Portrait of Jacqlyn Titus"
        />
      </section>

      <section className="home-section home-technical">
        <h2 className="home-heading">Technical Skills</h2>
        <img
          className="home-image home-banner"
          src={skillsImage}
          alt="AI-generated banner of glowing circuitry intertwined with leaves"
        />
        <div className="home-grid home-grid-two">
          {technicalSkills.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

      <section className="home-section home-soft">
        <h2 className="home-heading">Soft Skills</h2>
        <img
          className="home-image home-banner"
          src={softSkillsImage}
          alt="AI-generated banner of glowing light and leaves suggesting connection and growth"
        />
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
