export interface Project {
  name: string;
  tech: string[];
  desc: string;
  link: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  desc: string;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  Infrastructure: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string;
  skills: Skills;
  projects: Project[];
  experiences: Experience[];
  contact: {
    github: string;
    LinkedIn: string;
    email: string;
  };
}
