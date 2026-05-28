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
  tools: string[];
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
    twitter: string;
    email: string;
  };
}
