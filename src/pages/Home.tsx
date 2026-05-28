import React from 'react';
import Typewriter from '../components/Typewriter';
import { useLanguage } from '../hooks/useLanguage';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="page-home" key={language}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <img 
          src="/favicon.png" 
          alt="Avatar" 
          style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid var(--accent)' }} 
        />
        <div>
          <p><span className="prompt">$</span>whoami</p>
          <h1 style={{ margin: 0 }}>
            <Typewriter text={t.name} speed={100} />
          </h1>
          <p style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>
            <Typewriter text={t.role} delay={1000} />
          </p>
        </div>
      </div>
      
      <section>
        <p><span className="prompt">$</span>cat bio.txt</p>
        <p style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
          <Typewriter text={t.bio} delay={2500} speed={20} />
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <p><span className="prompt">$</span>neofetch</p>
        <pre className="ascii-art" style={{ fontSize: '0.8rem', lineHeight: '1.2', color: 'var(--success)' }}>
{`   _     _
  ( \---/ )
   ) . . (
  (  (Y)  )
   )     (
  /       \\
 (         )
  \`-mm-mm-'`}
        </pre>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>OS</strong>: PortfolioOS v2.0.0</p>
          <p><strong>Host</strong>: {t.name}-Workstation</p>
          <p><strong>Kernel</strong>: React 19.2.6</p>
          <p><strong>Uptime</strong>: Infinite</p>
          <p><strong>Shell</strong>: zsh 5.8</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
