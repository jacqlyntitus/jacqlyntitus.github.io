import {
  Brain,
  Code,
  Database,
  GitBranch,
  MessagesSquare,
  RefreshCw,
  Server,
} from 'lucide-react'

export const technicalSkills = [
  {
    title: 'Front-End Development',
    description:
      'I build responsive interfaces with React, JavaScript, HTML, and CSS.',
    icon: Code,
  },
  {
    title: 'Back-End and APIs',
    description:
      'I create REST APIs with Node.js and Express that connect front ends to data.',
    icon: Server,
  },
  {
    title: 'Databases',
    description: 'I design and query data with MySQL, MongoDB, and Supabase.',
    icon: Database,
  },
  {
    title: 'Git and Deployment',
    description:
      'I manage code with Git and GitHub and automate deployments with GitHub Actions.',
    icon: GitBranch,
  },
]

export const softSkills = [
  {
    title: 'Technical Adaptability',
    description:
      "I learn new tools and frameworks quickly and adjust smoothly when a project's needs change.",
    icon: RefreshCw,
  },
  {
    title: 'Critical Thinking',
    description:
      'I break complex problems into clear steps and weigh the options before choosing a solution.',
    icon: Brain,
  },
  {
    title: 'Client-Focused Communication',
    description:
      'I listen first, explain technical ideas in plain language, and keep the end user in mind.',
    icon: MessagesSquare,
  },
]
