import type { PortfolioData } from "../types/portfolio";

export const portfolioDataEn: PortfolioData = {
  name: "Tatsuya Miura",
  role: "Full-Stack Engineer",
  bio: "Architecting applications with React and IoT systems with Arduino. Keen on memory-safe systems and distributed architectures.",
  skills: {
    languages: ["C++", "TypeScript", "JavaScript", "Rust", "Go", "Python"],
    frontend: ["React", "Tailwind CSS", "Expo"],
    backend: ["Node.js", "Vite", "MySQL"],
    Infrastructure: [
      "Cloudflare",
      "Firebase",
      "Git",
      "Docker",
      "Tailscale",
      "GCP",
      "AWS",
    ],
  },
  projects: [
    {
      name: "Music App",
      tech: ["React", "TypeScript", "Vite"],
      desc: "Music application utilising React and Cloudflare R2 storage.",
      link: "https://github.com/TatsuyaM2667/FluxAudio-MusicApp",
    },
    {
      name: "Rust_OS",
      tech: ["Rust"],
      desc: "An operating system kernel written in Rust.",
      link: "https://github.com/TatsuyaM2667/Rust_os",
    },
  ],
  experiences: [
    {
      period: "2026-Present",
      role: "Project Manager",
      company: "SKYS",
      desc: "Lead web development and architectural design for scalable systems.",
    },
  ],
  research: [
    {
      title: "Distributed Systems & Edge Computing",
      desc: "Investigating efficient synchronisation algorithms for distributed edge nodes.",
    },
    {
      title: "Rust-based OS Kernels",
      desc: "A deep dive into memory safety and concurrency models in operating system design.",
    },
  ],
  education: [
    {
      period: "2023 - 2026",
      degree: "High School Diploma",
      institution: "Hosei University Second High School",
    },
    {
      period: "2026 - Present",
      degree: "BSc Computer Science",
      institution: "University of Essex",
    },
  ],
  awards: [
    {
      date: "2025",
      title: "National Runner-up in Space Koshien CanSat division",
      desc: "Awarded whilst serving as CTO of the Physics Club.",
    },
  ],
  hobbies: ["Walking", "Reading", "Travelling", "Mountain Climbing"],

  contact: {
    github: "https://github.com/TatsuyaM2667",
    LinkedIn: "https://www.linkedin.com/in/tatsuya-miura-1bb48339a/",
    email: "tatsuyamiura2667@gmail.com",
    orcid: "https://orcid.org/0000-0000-0000-0000",
  },
};

export const portfolioDataJp: PortfolioData = {
  name: "Tatsuya Miura",
  role: "Full Stack Engineer",
  bio: "Reactを使用したアプリケーション構築とArduinoを使用したIoTシステムの構築。",
  skills: {
    languages: ["C++", "TypeScript", "JavaScript", "Rust", "Go", "Python"],
    frontend: ["React", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Vite", "MySQL"],
    Infrastructure: [
      "Cloudflare",
      "Firebase",
      "Git",
      "Docker",
      "Tailscale",
      "GCP",
      "AWS",
    ],
  },
  projects: [
    {
      name: "Music App",
      tech: ["React", "TypeScript", "Vite"],
      desc: "ReactとCloudflare R2ストレージを使用した音楽アプリケーション",
      link: "https://github.com/TatsuyaM2667/FluxAudio-MusicApp",
    },
    {
      name: "Rust_OS",
      tech: ["Rust"],
      desc: "Rust製のOS",
      link: "https://github.com/TatsuyaM2667/Rust_os",
    },
  ],
  experiences: [
    {
      period: "2026-現在",
      role: "PM",
      company: "SKYS",
      desc: "Web開発とアーキテクチャ開発",
    },
  ],
  research: [
    {
      title: "Next-Generation Green AI Inference Server Research Plan ",
      desc: "低遅延かつ省電力な次世代AI推論サーバーの構築を目指す研究開発計画",
    },
    {
      title: "RustベースのOSカーネル",
      desc: "オペレーティングシステム設計におけるメモリ安全性と並行性モデルの深掘り",
    },
  ],
  education: [
    {
      period: "2023 - 2026",
      degree: "高校（普通科）卒業",
      institution: "法政大学第二高等学校",
    },
    {
      period: "2026 -",
      degree: "SAK Computer Science",
      institution: "University of Essex",
    },
  ],
  awards: [
    {
      date: "2025",
      title: "宇宙甲子園カンサット部門 全国準優勝",
      desc: "法政二高物理部として受賞",
    },
  ],
  hobbies: ["散歩", "読書", "旅行", "登山"],

  contact: {
    github: "https://github.com/TatsuyaM2667",
    LinkedIn: "https://www.linkedin.com/in/tatsuya-miura-1bb48339a/",
    email: "tatsuyamiura2667@gmail.com",
    orcid: "https://orcid.org/0009-0007-5480-2657",
  },
};
