import codebloggsImage from '../assets/codebloggs.png'
import rocketFoodDeliveryImage from '../assets/rocket-food-delivery.png'

export const education = [
  {
    institution: 'Codeboxx',
    program: 'Full-Stack Developer Bootcamp',
    dates: '2026',
  },
  {
    institution: 'St. Petersburg College',
    program: 'A.S., Respiratory Care',
    dates: '2014',
  },
  {
    institution: 'Pasco-Hernando Community College',
    program: 'A.A.',
    dates: '2009',
  },
]

export const work = [
  {
    title: 'Registered Respiratory Therapist',
    organization: 'Hospitals across the Tampa Bay area',
    dates: '2015 – Present',
    description:
      'Deliver critical-care respiratory therapy across emergency, ICU, and floor units, making rapid, evidence-based decisions under pressure. Maintain precise, audit-ready documentation and interpret complex clinical data to adjust treatment in real time. Recognized for consistent, error-free work and serve as a go-to mentor for colleagues and new hires.',
  },
]

export const projects = [
  {
    name: 'CodeBloggs',
    tech: [
      'React',
      'Redux Toolkit',
      'React Router',
      'Node.js',
      'Express',
      'MongoDB (Mongoose)',
      'bcrypt',
    ],
    description:
      'A simple social blogging app where users register, log in, and share posts and comments. I built both the front end and the back end: a React client and a Node.js and Express REST API backed by MongoDB.',
    image: codebloggsImage,
    imageAlt:
      'Screenshot of the CodeBloggs network page showing user profile cards',
  },
  {
    name: 'Rocket Food Delivery',
    tech: ['React Native', 'Expo', 'Java', 'Spring Boot'],
    description:
      'A React Native and Expo mobile app with a Spring Boot backend, covering the customer ordering flow, courier delivery management, and account settings. I built the mobile app against the backend API.',
    image: rocketFoodDeliveryImage,
    imageAlt:
      'Screenshot of the Rocket Food Delivery app showing a list of nearby restaurants',
  },
]
