import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import Typewriter from '../components/Typewriter';

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="page-projects" key={language}>
      <p>
        <span className="prompt">$</span>
        <Typewriter text="ls -la ~/projects" speed={50} />
      </p>
      <div style={{ paddingLeft: '1rem', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Permissions</th>
              <th style={{ padding: '0.5rem' }}>Name</th>
              <th style={{ padding: '0.5rem' }}>Tech</th>
            </tr>
          </thead>
          <tbody>
            {t.projects.map((project, idx) => (
              <tr key={project.name} style={{ borderBottom: '1px dotted var(--border)' }}>
                <td style={{ padding: '0.5rem', fontFamily: 'monospace', color: 'var(--success)' }}>
                  <Typewriter text="drwxr-xr-x" delay={800 + idx * 200} speed={10} />
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <a href={project.link} target="_blank" rel="noreferrer" style={{ fontWeight: 'bold' }}>
                    <Typewriter text={project.name} delay={1200 + idx * 200} speed={30} />
                  </a>
                </td>
                <td style={{ padding: '0.5rem', color: 'var(--accent)', fontSize: '0.8rem' }}>
                  <Typewriter text={project.tech.join(', ')} delay={1600 + idx * 200} speed={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {t.projects.map((project, idx) => (
          <div key={`${project.name}-desc`} style={{ marginTop: '2rem' }}>
            <p>
              <span className="prompt">$</span>
              <Typewriter text={`cat ~/projects/${project.name}/README.md`} speed={50} delay={2500 + idx * 1000} />
            </p>
            <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', marginTop: '0.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <p>
                <Typewriter text={project.desc} delay={3200 + idx * 1000} speed={20} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
