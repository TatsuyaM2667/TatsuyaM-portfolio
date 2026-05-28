import './App.css'

function App() {
  const projects = [
    {
      name: 'portfolio-v2',
      tech: ['React', 'TypeScript', 'Vite'],
      desc: 'A terminal-inspired portfolio website.',
      link: 'https://github.com/tatsuya/portfolio-v2'
    },
    {
      name: 'tech-blog',
      tech: ['Next.js', 'Tailwind', 'MDX'],
      desc: 'Technical blog with deep dives into web dev.',
      link: 'https://github.com/tatsuya/tech-blog'
    }
  ];

  const skills = {
    languages: ['TypeScript', 'JavaScript', 'Go', 'Python'],
    frontend: ['React', 'Next.js', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'PostgreSQL'],
    tools: ['Git', 'Docker', 'AWS']
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
        <div className="terminal-title">tatsuya@dev: ~</div>
      </div>
      <div className="terminal-content">
        <section>
          <p><span className="prompt">$</span>whoami</p>
          <h1>Tatsuya</h1>
          <p>Full Stack Developer | Tech Enthusiast</p>
          <p>Building scalable web applications and exploring new technologies.</p>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <p><span className="prompt">$</span>cat skills.json</p>
          <pre>
            {JSON.stringify(skills, null, 2)}
          </pre>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <p><span className="prompt">$</span>ls -la ~/projects</p>
          <div style={{ paddingLeft: '1rem' }}>
            {projects.map((project) => (
              <div key={project.name} style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: '0.5rem 0' }}>
                  <a href={project.link} target="_blank" rel="noreferrer">
                    {project.name}
                  </a>
                </h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{project.desc}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>
                  [{project.tech.join(', ')}]
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <p><span className="prompt">$</span>cat experience.log</p>
          <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--border)', marginLeft: '0.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: 'var(--accent)' }}>2023 - Present</p>
              <p><strong>Senior Software Engineer</strong> @ TechCorp</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Leading frontend development for a cloud-native platform.</p>
            </div>
            <div>
              <p style={{ color: 'var(--accent)' }}>2021 - 2023</p>
              <p><strong>Full Stack Developer</strong> @ StartupX</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Built and scaled a real-time messaging application.</p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <p><span className="prompt">$</span>cat contact.txt</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>GitHub: <a href="https://github.com/tatsuya" target="_blank" rel="noreferrer">@tatsuya</a></li>
            <li>X: <a href="https://x.com/tatsuya" target="_blank" rel="noreferrer">@tatsuya</a></li>
            <li>Email: <a href="mailto:hello@tatsuya.dev">hello@tatsuya.dev</a></li>
          </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <p><span className="prompt">$</span><span className="typing-cursor"></span></p>
        </section>
      </div>
    </div>
  )
}

export default App
