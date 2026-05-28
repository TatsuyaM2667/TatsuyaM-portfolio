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
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSlRunning, setIsSlRunning] = useState(false);
  const [bgType, setBgType] = useState("grid");
  const { language, setLanguage, t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCmd = inputValue.trim();
    if (!fullCmd) return;

    // Handle both standard and Japanese full-width spaces
    const normalizedCmd = fullCmd.replace(/　/g, " ");
    const cmd = normalizedCmd.toLowerCase();
    const args = cmd.split(/\s+/);
    const baseCmd = args[0];

    setCommandHistory((prev) => [...prev, `$ ${fullCmd}`]);
    setHistory((prev) => [fullCmd, ...prev]);
    setHistoryIndex(-1);

    switch (baseCmd) {
      case "help":
        setCommandHistory((prev) => [
          ...prev,
          "Available commands: help, cd [page], ls, pwd, echo [text], uname [-a], whoami, firstfetch, cat [file], ssh, theme [name], bg [type], clear, date, sl, sudo pacman, exit, secret",
        ]);
        break;
      case "bg":
        const type = args[1];
        if (["grid", "stars", "cubes", "none"].includes(type)) {
          setBgType(type);
          setCommandHistory((prev) => [...prev, `Background set to ${type}`]);
        } else {
          setCommandHistory((prev) => [...prev, "Usage: bg [grid|stars|cubes|none]"]);
        }
        break;
      case "uname":
        if (args[1] === "-a") {
          setCommandHistory((prev) => [
            ...prev,
            "Linux tatsuya-dev 6.18.33-1-lts #1 SMP PREEMPT_DYNAMIC Thu, 22 May 2026 12:00:00 +0000 x86_64 GNU/Linux",
          ]);
        } else {
          setCommandHistory((prev) => [...prev, "Linux"]);
        }
        break;
      case "exit":
        setCommandHistory((prev) => [
          ...prev,
          "Session ended. Refresh to restart.",
        ]);
        break;
      case "whoami":
        setCommandHistory((prev) => [...prev, `${t.name} - ${t.role}`]);
        break;
      case "ls":
        setCommandHistory((prev) => [
          ...prev,
          "home/  projects/  experience/  bio.txt  skills.json  education.md  awards.md  publications.md",
        ]);
        break;
      case "cd": {
        let path = args[1] || "";
        // Clean up path: remove trailing slash, handle ~/ or /
        path = path.replace(/\/$/, "").replace(/^~\//, "").replace(/^\//, "");

        if (path === "" || path === "~" || path === "home") {
          setCurrentPage("home");
          setCommandHistory((prev) => [...prev, "Changed directory to ~/home"]);
        } else if (path === "projects") {
          setCurrentPage("projects");
          setCommandHistory((prev) => [
            ...prev,
            "Changed directory to ~/projects",
          ]);
        } else if (path === "experience") {
          setCurrentPage("experience");
          setCommandHistory((prev) => [
            ...prev,
            "Changed directory to ~/experience",
          ]);
        } else {
          setCommandHistory((prev) => [
            ...prev,
            `cd: no such directory: ${args[1]}`,
          ]);
        }
        break;
      }
      case "cat": {
        const file = args[1];
        if (file === "bio.txt") {
          setCommandHistory((prev) => [...prev, t.bio]);
        } else if (file === "skills.json") {
          setCommandHistory((prev) => [
            ...prev,
            JSON.stringify(t.skills, null, 2),
          ]);
        } else if (file === "education.md") {
          const eduStr =
            t.education
              ?.map((e) => `- ${e.degree} @ ${e.institution} (${e.period})`)
              .join("\n") || "No education records.";
          setCommandHistory((prev) => [...prev, eduStr]);
        } else if (file === "awards.md") {
          const awardStr =
            t.awards
              ?.map((a) => `- ${a.title} (${a.date}): ${a.desc}`)
              .join("\n") || "No award records.";
          setCommandHistory((prev) => [...prev, awardStr]);
        } else if (file === "publications.md") {
          const pubStr =
            t.publications?.map((p) => `- ${p.title} (${p.year})`).join("\n") ||
            "No publication records.";
          setCommandHistory((prev) => [...prev, pubStr]);
        } else if (!file) {
          setCommandHistory((prev) => [...prev, "cat: missing operand"]);
        } else {
          setCommandHistory((prev) => [
            ...prev,
            `cat: ${file}: No such file or directory`,
          ]);
        }
        break;
      }
      case "firstfetch":
        setCommandHistory((prev) => [
          ...prev,
          "OS: Arch Linux",
          `Host: ${t.name}-IdeaPad Slim 3`,
          "Kernel: Linux 6.18.33-1-lts",
          "Shell: ghostty 1.3.1-arch2",
          "WM: Sway",
          "Theme: Tokyo Night",
        ]);
        break;
      case "ssh":
        if (args[1] === "contact@tatsuya") {
          setCommandHistory((prev) =>
            [
              ...prev,
              `GitHub: ${t.contact.github}`,
              `LinkedIn: ${t.contact.LinkedIn}`,
              `Email: ${t.contact.email}`,
              t.contact.orcid ? `ORCID: ${t.contact.orcid}` : "",
            ].filter(Boolean),
          );
        } else {
          setCommandHistory((prev) => [...prev, "ssh: connection refused"]);
        }
        break;
      case "theme": {
        const newTheme = args[1];
        if (["tokyo", "matrix", "dracula"].includes(newTheme)) {
          setTheme(newTheme);
          setCommandHistory((prev) => [
            ...prev,
            `Theme changed to ${newTheme}`,
          ]);
        } else {
          setCommandHistory((prev) => [
            ...prev,
            "Available themes: tokyo, matrix, dracula",
          ]);
        }
        break;
      }
      case "clear":
        setCommandHistory([]);
        break;
      case "date":
        setCommandHistory((prev) => [...prev, new Date().toString()]);
        break;
      case "secret":
        setCommandHistory((prev) => [
          ...prev,
          "🔓 Achievement Unlocked: Terminal Master! 🚀",
        ]);
        break;
      case "pwd":
        setCommandHistory((prev) => [...prev, `/home/tatsuya/${currentPage}`]);
        break;
      case "echo":
        setCommandHistory((prev) => [...prev, args.slice(1).join(" ")]);
        break;
      case "sl":
        setIsSlRunning(true);
        setTimeout(() => setIsSlRunning(false), 4000);
        break;
      case "sudo":
        if (cmd === "sudo rm -rf /") {
          setCommandHistory((prev) => [
            ...prev,
            "⚠️ Nice try! I've already backed up the mainframe. 😎",
          ]);
        } else if (cmd.includes("pacman")) {
          if (cmd.includes("-syu")) {
            setCommandHistory((prev) => [
              ...prev,
              ":: Synchronizing package databases...",
              " core                 160.2 KiB   435 KiB/s 00:00 [######################] 100%",
              " extra               1012.4 KiB  2.50 MiB/s 00:00 [######################] 100%",
              ":: Starting full system upgrade...",
              " resolving dependencies...",
              " looking for conflicting packages...",
              " there is nothing to do",
              "☕ Everything is up to date. Arch is life.",
            ]);
          } else if (cmd.includes("-s ")) {
            const pkg = args[args.length - 1];
            setCommandHistory((prev) => [
              ...prev,
              `resolving dependencies...`,
              `looking for conflicting packages...`,
              `Packages (1) ${pkg}-1.0.0-1`,
              `Total Installed Size:  0.05 MiB`,
              `:: Proceed with installation? [Y/n] y`,
              `(1/1) installing ${pkg}                             [######################] 100%`,
              `:: Running post-transaction hooks...`,
              `(1/1) Arming ConditionNeedsUpdate...`,
            ]);
          } else {
            setCommandHistory((prev) => [
              ...prev,
              "error: no operation specified (use -h for help)",
            ]);
          }
        } else {
          setCommandHistory((prev) => [...prev, "sudo: permission denied"]);
        }
        break;
      default:
        setCommandHistory((prev) => [...prev, `command not found: ${baseCmd}`]);
    }

    setInputValue("");
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue("");
      }
    }
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
      <Background type={bgType} />
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
              <Typewriter text="ssh contact@tatsuya" speed={30} delay={6000} />
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
              {t.contact.orcid && (
                <a href={t.contact.orcid} target="_blank" rel="noreferrer">
                  ORCID
                </a>
              )}
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
              onKeyDown={handleKeyDown}
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="none"
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

        {isSlRunning && (
          <div className="sl-overlay">
            <pre className="sl-train">
              {`
      ====        ________                ___________
  _D _|  |_ ______|_  ____|_  _________  |_  _______|_
 |   |____| |      |_|    |_| |      |_| |_|       |_|
 |___________|______|______|______|______|___________|
  oo          oo          oo          oo          oo
              `}
            </pre>
          </div>
        )}

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
