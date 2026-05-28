import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: 'Tatsuya',
  role: 'Full Stack Developer',
  bio: 'Building scalable web applications and exploring new technologies.',
  skills: {
    languages: ['TypeScript', 'JavaScript', 'Go', 'Python'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'Vue.js'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
    tools: ['Git', 'Docker', 'AWS', 'Kubernetes']
  },
  projects: [
    {
      name: 'portfolio-v2',
      tech: ['React', 'TypeScript', 'Vite'],
      desc: 'A terminal-inspired portfolio website with interactive CLI features.',
      link: 'https://github.com/tatsuya/portfolio-v2'
    },
    {
      name: 'tech-blog',
      tech: ['Next.js', 'Tailwind', 'MDX'],
      desc: 'Technical blog with deep dives into web development and architecture.',
      link: 'https://github.com/tatsuya/tech-blog'
    },
    {
      name: 'oss-tool',
      tech: ['Go', 'CLI'],
      desc: 'A high-performance CLI tool for developers.',
      link: 'https://github.com/tatsuya/oss-tool'
    }
  ],
  experiences: [
    {
      period: '2023 - Present',
      role: 'Senior Software Engineer',
      company: 'TechCorp',
      desc: 'Leading frontend development for a cloud-native platform and managing a team of 5 engineers.'
    },
    {
      period: '2021 - 2023',
      role: 'Full Stack Developer',
      company: 'StartupX',
      desc: 'Built and scaled a real-time messaging application using WebSocket and Node.js.'
    }
  ],
  contact: {
    github: 'https://github.com/tatsuya',
    twitter: 'https://x.com/tatsuya',
    email: 'hello@tatsuya.dev'
  }
};
