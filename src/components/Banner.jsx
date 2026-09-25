import skillsImage from '../assets/home-skills.png'
import './Banner.css'

export function Banner({ title }) {
  return (
    <div className="banner">
      <img
        className="banner-image"
        src={skillsImage}
        alt="AI-generated banner of glowing circuitry intertwined with leaves"
      />
      <h1 className="banner-heading">{title}</h1>
    </div>
  )
}
