# TatsuyaM Portfolio

![Portfolio-FrameShot](public/ScreenShot.png)

A modern, interactive portfolio website built with **React 19**, **TypeScript**, and **Three.js**, featuring stunning 3D animations and multi-language support.

## ✨ Features

- **🎨 Modern Design**: Clean and professional portfolio interface with responsive layout
- **🌐 Multi-language Support**: English and Japanese with automatic language detection
- **🎭 3D Graphics**: Interactive 3D elements powered by Three.js
- **✨ Smooth Animations**: Beautiful transitions using Anime.js
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ React 19 Compiler**: Built with latest React features for optimized performance
- **🚀 Vite**: Lightning-fast development and production builds
- **🔍 Type-Safe**: Full TypeScript support for robust code

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript (86.8%)
- **Styling**: CSS (11.9%)
- **Build Tool**: Vite
- **3D Graphics**: Three.js
- **Animations**: Anime.js
- **Internationalization**: i18next + react-i18next
- **Linting**: ESLint

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "three": "^0.184.0",
  "animejs": "^4.4.1",
  "i18next": "^26.3.1",
  "react-i18next": "^17.0.8"
}
```

### Dev Tools
```json
{
  "vite": "^8.0.12",
  "typescript": "~6.0.2",
  "eslint": "^10.3.0"
}
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/TatsuyaM2667/TatsuyaM-portfolio.git
cd TatsuyaM-portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start dev server (http://localhost:5173)
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## 📊 Project Overview

| Metric | Value |
|--------|-------|
| **Language** | TypeScript (86.8%) |
| **Styling** | CSS (11.9%) |
| **Other** | 1.3% |
| **Build Tool** | Vite |
| **React Version** | 19.2.6 |
| **Node.js** | v16+ |

## 📁 Project Structure

```
TatsuyaM-portfolio/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page-level components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── styles/         # Global & component styles
│   ├── assets/         # Images & media files
│   ├── locales/        # i18n translation files
│   └── App.tsx         # Main application
├── public/             # Static assets
│   └── ScreenShot.png  # Portfolio screenshot
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite configuration
├── eslint.config.js    # ESLint rules
└── README.md          # This file
```

## 🌍 Language Support

The portfolio automatically detects your browser language:
- 🇬🇧 **English** - Default fallback language
- 🇯🇵 **日本語** - Japanese support
- 🇫🇷 **Français** - French support
- 🇩🇪 **Deutsch** - Germany support
- 🇨🇳 **简体中文** - Chinese support
- 🇰🇷 **한국어** - Korian support
- 🇮🇹 **Italiano** - Itarian support

Language detection powered by `i18next-browser-languagedetector`.

## 🎯 Key Features Explained

### React 19 Compiler
Leverages React 19's new compiler features for:
- Automatic component optimization
- Reduced re-renders
- Better performance

### 3D Visualizations
Three.js integration provides:
- Interactive 3D elements
- Smooth camera animations
- Custom shaders

### Anime.js Animations
Creates fluid, professional animations for:
- Page transitions
- Element reveals
- Interactive feedback

## 📝 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Check code quality with ESLint
```

## 🎨 Customization Guide

### Update Portfolio Content
Edit content files in `src/locales/` for multi-language updates.

### Styling
Modify CSS files in `src/styles/` to customize colors, fonts, and layout.

### Add Projects
Add portfolio projects in the projects component located in `src/components/`.

### Adjust Animations
Fine-tune Anime.js animations in animation configuration files.

### Modify 3D Elements
Update Three.js scene setup in the appropriate component files.

## 🔗 Links

- **GitHub Repository**: [TatsuyaM-portfolio](https://github.com/TatsuyaM2667/TatsuyaM-portfolio)
- **Author**: [@TatsuyaM2667](https://github.com/TatsuyaM2667)

## 📄 License

This project is open source. See the LICENSE file for details.

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/YourFeature`)
3. **Commit** changes (`git commit -m 'Add YourFeature'`)
4. **Push** to the branch (`git push origin feature/YourFeature`)
5. **Open** a Pull Request



## 📈 Performance

This portfolio is optimized for:
- Fast load times with Vite
- Smooth 60fps animations
- Efficient 3D rendering with Three.js
- Small bundle size through tree-shaking

---

**Last Updated**: June 2026  
**Built with ❤️ by Tatsuya M**
