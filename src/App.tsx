import { useState, useEffect, useRef } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [theme, setTheme] = useState("tokyo");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const { language, setLanguage, t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    setCommandHistory((prev) => [...prev, `$ ${inputValue}`]);

    if (cmd === "help") {
      setCommandHistory((prev) => [
        ...prev,
        "Available commands: help, cd [page], ls, theme [name], clear, secret, date",
      ]);
    } else if (cmd.startsWith("cd ")) {
      const page = cmd.split(" ")[1] as Page;
      if (["home", "projects", "experience"].includes(page)) {
        setCurrentPage(page);
        setCommandHistory((prev) => [
          ...prev,
          `Changed directory to ~/${page}`,
        ]);
      } else {
        setCommandHistory((prev) => [...prev, `Directory not found: ${page}`]);
      }
    } else if (cmd === "ls") {
      setCommandHistory((prev) => [
        ...prev,
        "home  projects  experience  bio.txt  skills.json",
      ]);
    } else if (cmd.startsWith("theme ")) {
      const newTheme = cmd.split(" ")[1];
      if (["tokyo", "matrix", "dracula"].includes(newTheme)) {
        setTheme(newTheme);
        setCommandHistory((prev) => [...prev, `Theme changed to ${newTheme}`]);
      } else {
        setCommandHistory((prev) => [
          ...prev,
          "Available themes: tokyo, matrix, dracula",
        ]);
      }
    } else if (cmd === "clear") {
      setCommandHistory([]);
    } else if (cmd === "date") {
      setCommandHistory((prev) => [...prev, new Date().toString()]);
    } else if (cmd === "secret") {
      setCommandHistory((prev) => [
        ...prev,
        "🔓 Achievement Unlocked: Terminal Master! 🚀",
        "Try 'sudo rm -rf /' if you dare... (joking)",
      ]);
    } else if (cmd === "sudo rm -rf /") {
      setCommandHistory((prev) => [
        ...prev,
        "⚠️ Nice try! I've already backed up the mainframe. 😎",
      ]);
    } else if (cmd !== "") {
      setCommandHistory((prev) => [
        ...prev,
        `Command not found: ${cmd}. Type 'help' for assistance.`,
      ]);
    }

    setInputValue("");
    // Keep focus on input after command
    setTimeout(() => inputRef.current?.focus(), 10);
  };

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
      <div className="app-container" onClick={() => inputRef.current?.focus()}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <nav className="terminal-nav" style={{ marginBottom: 0 }}>
            {["home", "projects", "experience"].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p as Page)}
                className={currentPage === p ? "active" : ""}
              >
                ~/{p}
              </button>
            ))}
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

          <div className="command-history" style={{ marginTop: "2rem" }}>
            {commandHistory.map((line, i) => (
              <p
                key={i}
                style={{
                  color: line.startsWith("$") ? "var(--prompt)" : "var(--text)",
                  margin: "4px 0",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <form
            onSubmit={handleCommand}
            style={{ display: "flex", marginTop: "1rem", alignItems: "center" }}
          >
            <span className="prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text)",
                fontFamily: "var(--mono)",
                fontSize: "1rem",
                outline: "none",
                width: "100%",
                marginLeft: "0.5rem",
              }}
              autoFocus
            />
          </form>
        </TerminalWindow>

        <footer className="terminal-footer">
          <p>
            © 2026 Tatsuya-PortfolioOS v2.0.0 -{" "}
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
