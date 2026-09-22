import linkReactImage from '../assets/link-react.png'
import linkTechWorldImage from '../assets/link-techworld.png'
import linkW3schoolsImage from '../assets/link-w3schools.png'

export const links = [
  {
    name: 'React Documentation',
    url: 'https://react.dev/',
    description:
      'The official React docs, where I look up hooks, component patterns, and how state and effects actually behave. The interactive examples make it easy to check something before writing it into a project.',
    image: linkReactImage,
    imageAlt: 'AI-generated illustration of a glowing purple ring with a gold leaf',
  },
  {
    name: 'W3Schools',
    url: 'https://www.w3schools.com/',
    description:
      'A quick-reference site I return to for HTML, CSS, and JavaScript syntax. The runnable examples make it easy to test something in seconds without setting up a project.',
    image: linkW3schoolsImage,
    imageAlt: 'AI-generated illustration of three glowing orange lines beside a gold leaf',
  },
  {
    name: 'Tech World with Nana',
    url: 'https://www.youtube.com/@techworldwithnana',
    description:
      "Nana Janashia's channel breaks down DevOps and cloud topics like Docker, Kubernetes, and CI/CD pipelines into clear, beginner-friendly tutorials. It's where I go to understand the deployment side of development.",
    image: linkTechWorldImage,
    imageAlt: 'AI-generated illustration of a glowing purple triangle outline around a gold leaf',
  },
]
