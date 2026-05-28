import type { PortfolioData } from "../types/portfolio";

export const portfolioDataEn: PortfolioData = {
  name: "Tatsuya Miura",
  role: "Full Stack Engineer",
  bio: "Building applications with React and IoT systems with Arduino.",
  skills: {
    languages: ["TypeScript", "JavaScript", "Rust", "Go", "Python"],
    frontend: ["React", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express", "PostgreSQL"],
    Infrastructure: ["Git", "Docker", "AWS"],
  },
  projects: [
    {
      name: "Music App",
      tech: ["React", "TypeScript", "Vite"],
      desc: "Music application using React and Cloudflare R2 storage.",
      link: "https://github.com/TatsuyaM2667/FluxAudio-MusicApp",
    },
    {
      name: "tech-blog",
      tech: ["Next.js", "Tailwind", "MDX"],
      desc: "Technical blog about web development and architecture.",
      link: "https://github.com/tatsuya/tech-blog",
    },
  ],
  experiences: [
    {
      period: "2025",
      role: "CTO",
      company: "Hosei 2nd High School Physics Club",
      desc: "National Runner-up in the Space Koshien CanSat division.",
    },
    {
      period: "2026-Present",
      role: "PM",
      company: "SKYS",
      desc: "Web development and architecture development.",
    },
  ],
  contact: {
    github: "https://github.com/TatsuyaM2667",
    LinkedIn: "https://www.linkedin.com/in/tatsuya-miura-1bb48339a/",
    email: "tatsuyamiura2667@gmail.com",
  },
};

export const portfolioDataJp: PortfolioData = {
  name: "Tatsuya Miura",
  role: "フルスタックエンジニア",
  bio: "Reactを使用したアプリケーション構築とArduinoを使用したIoTシステムの構築。",
  skills: {
    languages: ["TypeScript", "JavaScript", "Rust", "Go", "Python"],
    frontend: ["React", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express", "MySQL"],
    Infrastructure: ["Git", "Docker", "AWS"],
  },
  projects: [
    {
      name: "Music App",
      tech: ["React", "TypeScript", "Vite"],
      desc: "ReactとCloudflare R2ストレージを使用した音楽アプリケーション",
      link: "https://github.com/TatsuyaM2667/FluxAudio-MusicApp",
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
