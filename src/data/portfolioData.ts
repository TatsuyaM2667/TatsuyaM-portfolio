import type { PortfolioData } from "../types/portfolio";

export const portfolioDataEn: PortfolioData = {
  name: "Tatsuya",
  role: "Full Stack Developer",
  bio: "Building scalable web applications and exploring new technologies.",
  skills: {
    languages: ["TypeScript", "JavaScript", "Go", "Python"],
    frontend: ["React", "Tailwind CSS"],
    backend: ["Node.js", "Express", "MySQL", "Redis"],
    tools: ["Git", "Docker", "AWS", "Kubernetes"],
  },
  projects: [
    {
      name: "portfolio-v2",
      tech: ["React", "TypeScript", "Vite"],
      desc: "A terminal-inspired portfolio website with interactive CLI features.",
      link: "https://github.com/tatsuya/portfolio-v2",
    },
    {
      name: "tech-blog",
      tech: ["Next.js", "Tailwind", "MDX"],
      desc: "Technical blog with deep dives into web development and architecture.",
      link: "https://github.com/tatsuya/tech-blog",
    },
  ],
  experiences: [
    {
      period: "2023 - Present",
      role: "Senior Software Engineer",
      company: "TechCorp",
      desc: "Leading frontend development for a cloud-native platform.",
    },
  ],
  contact: {
    github: "https://github.com/tatsuya",
    twitter: "https://x.com/tatsuya",
    email: "hello@tatsuya.dev",
  },
};

export const portfolioDataJp: PortfolioData = {
  name: "Tatsuya",
  role: "フルスタックエンジニア",
  bio: "スケーラブルなWebアプリケーションの構築と新しい技術の探求をしています。",
  skills: {
    languages: ["TypeScript", "JavaScript", "Go", "Python"],
    frontend: ["React", "Next.js", "Tailwind CSS", "Vue.js"],
    backend: ["Node.js", "Express", "PostgreSQL", "Redis"],
    tools: ["Git", "Docker", "AWS", "Kubernetes"],
  },
  projects: [
    {
      name: "portfolio-v2",
      tech: ["React", "TypeScript", "Vite"],
      desc: "インタラクティブなCLI機能を備えたターミナル風ポートフォリオ。",
      link: "https://github.com/tatsuya/portfolio-v2",
    },
    {
      name: "tech-blog",
      tech: ["Next.js", "Tailwind", "MDX"],
      desc: "Web開発とアーキテクチャに関する技術ブログ。",
      link: "https://github.com/tatsuya/tech-blog",
    },
  ],
  experiences: [
    {
      period: "2023 - 現在",
      role: "シニアソフトウェアエンジニア",
      company: "TechCorp",
      desc: "クラウドネイティブプラットフォームのフロントエンド開発をリード。",
    },
  ],
  contact: {
    github: "https://github.com/tatsuya",
    twitter: "https://x.com/tatsuya",
    email: "hello@tatsuya.dev",
  },
};
