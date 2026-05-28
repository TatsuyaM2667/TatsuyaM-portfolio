import { useState } from 'react';
import TerminalWindow from './components/TerminalWindow';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import './App.css';

type Page = 'home' | 'projects' | 'experience';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'projects': return <Projects />;
      case 'experience': return <Experience />;
      default: return <Home />;
    }
  };

  return (
    <div className="app-container">
      <nav className="terminal-nav">
        <button 
          onClick={() => setCurrentPage('home')} 
          className={currentPage === 'home' ? 'active' : ''}
        >
          ~/home
        </button>
        <button 
          onClick={() => setCurrentPage('projects')} 
          className={currentPage === 'projects' ? 'active' : ''}
        >
          ~/projects
        </button>
        <button 
          onClick={() => setCurrentPage('experience')} 
          className={currentPage === 'experience' ? 'active' : ''}
        >
          ~/experience
        </button>
      </nav>

      <TerminalWindow title={`tatsuya@dev: ~/${currentPage}`}>
        {renderPage()}
        
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <p><span className="prompt">$</span>ssh contact@tatsuya</p>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <a href="https://github.com/tatsuya" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://x.com/tatsuya" target="_blank" rel="noreferrer">X.com</a>
            <a href="mailto:hello@tatsuya.dev">Email</a>
          </div>
        </div>

        <section style={{ marginTop: '2rem' }}>
          <p><span className="prompt">$</span><span className="typing-cursor"></span></p>
        </section>
      </TerminalWindow>

      <footer className="terminal-footer">
        <p>© 2026 Tatsuya PortfolioOS v2.0.0 - Built with React & Vite</p>
      </footer>
    </div>
  );
}

export default App;
