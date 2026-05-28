import type { PortfolioData } from "../types/portfolio";

export const portfolioDataEn: PortfolioData = {
  name: "Tatsuya　Miura",
  role: "Full Stack Developer",
  bio: "Building scalable web applications and exploring new technologies.",
  skills: {
    languages: ["TypeScript", "JavaScript", "Rust", "Go", "Python"],
    frontend: ["React", "Tailwind CSS"],
    backend: ["Node.js", "vite", "MySQL"],
    Infrastructure: ["Cloudflare", "Docker", "AWS", "Kubernetes"],
  },
  projects: [
    {
      name: "OPENEssex menber website",
      tech: ["React", "TypeScript", "Vite"],
      desc: "OpenEssexのメンバー限定公式ウェブサイト",
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
    github: "https://github.com/TatsuyaM2667",
    LinkedIn: "https://www.linkedin.com/in/tatsuya-miura-1bb48339a/",
    email: "hello@tatsuya.dev",
  },
};

export const portfolioDataJp: PortfolioData = {
  name: "Tatsuya Miura",
  role: "フルスタックエンジニア",
  bio: "Reactを使用したアプリケーション構築とArduinoを使用したIoTシステムの構築。",
  skills: {
    languages: ["TypeScript", "JavaScript", "Rust", "Go", "Python"],
    frontend: ["React", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express", "PostgreSQL"],
    Infrastructure: ["Git", "Docker", "AWS"],
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
      period: "2025",
      role: "CTO",
      company: "法政二高物理部",
      desc: "宇宙甲子園カンサット部門において全国準優勝",
    },
    {
      period: "2026-現在",
      role: "PM",
      company: "SKYS",
      desc: "Web開発とアーキテクチャ開発",
    },
  ],
  contact: {
    github: "https://github.com/TatsuyaM2667",
    LinkedIn: "https://www.linkedin.com/in/tatsuya-miura-1bb48339a/",
    email: "tatsuyamiura2667@gmail.com",
  },
};
