import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <ul className="footer-links">
        <li>
          <a href="mailto:jacqlyntitus@gmail.com">jacqlyntitus@gmail.com</a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/jacqlyn-titus/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/jacqlyntitus"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
      <p className="footer-copyright">
        © {year} Jacqlyn Titus. All rights reserved.
      </p>
    </footer>
  )
}
