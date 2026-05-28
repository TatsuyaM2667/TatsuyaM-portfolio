import { useState } from "react";
import TerminalWindow from "./components/TerminalWindow";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Background from "./components/Background";
import Typewriter from "./components/Typewriter";
import { useLanguage, LanguageProvider } from "./hooks/useLanguage";
import "./App.css";

type Page = "home" | "projects" | "experience";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const { language, setLanguage, t } = useLanguage();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "projects":
        return <Projects />;
      case "experience":
        return <Experience />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Background />
      <div className="app-container">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <nav className="terminal-nav" style={{ marginBottom: 0 }}>
            <button
              onClick={() => setCurrentPage("home")}
              className={currentPage === "home" ? "active" : ""}
            >
              ~/home
            </button>
            <button
              onClick={() => setCurrentPage("projects")}
              className={currentPage === "projects" ? "active" : ""}
            >
              ~/projects
            </button>
            <button
              onClick={() => setCurrentPage("experience")}
              className={currentPage === "experience" ? "active" : ""}
            >
              ~/experience
            </button>
          </nav>

          <div className="lang-switcher">
            <button
              onClick={() => setLanguage("en")}
              className={language === "en" ? "active" : ""}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("jp")}
              className={language === "jp" ? "active" : ""}
            >
              JP
            </button>
          </div>
        </header>

        <TerminalWindow title={`tatsuya@dev: ~/${currentPage}`}>
          {renderPage()}

          <div
            style={{
              marginTop: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "1rem",
            }}
          >
            <p>
              <span className="prompt">$</span>
              <Typewriter text="ssh contact@tatsuya" speed={50} delay={6500} />
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                marginTop: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <a href={t.contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={t.contact.LinkedIn} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${t.contact.email}`}>Email</a>
            </div>
          </div>

          <section style={{ marginTop: "2rem" }}>
            <p>
              <span className="prompt">$</span>
              <span className="typing-cursor"></span>
            </p>
          </section>
        </TerminalWindow>

        <footer className="terminal-footer">
          <p>
            © 2026 Tatsuya PortfolioOS v2.0.0 -{" "}
            {language === "en"
              ? "Built with React & Vite"
              : "React & Viteで構築"}
          </p>
        </footer>
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
