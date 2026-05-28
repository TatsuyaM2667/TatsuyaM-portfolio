import React from 'react';
import { portfolioData } from '../data/portfolioData';

const Projects: React.FC = () => {
  return (
    <div className="page-projects">
      <p><span className="prompt">$</span>ls -la ~/projects</p>
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
            {portfolioData.projects.map((project) => (
              <tr key={project.name} style={{ borderBottom: '1px dotted var(--border)' }}>
                <td style={{ padding: '0.5rem', fontFamily: 'monospace', color: 'var(--success)' }}>drwxr-xr-x</td>
                <td style={{ padding: '0.5rem' }}>
                  <a href={project.link} target="_blank" rel="noreferrer" style={{ fontWeight: 'bold' }}>
                    {project.name}
                  </a>
                </td>
                <td style={{ padding: '0.5rem', color: 'var(--accent)', fontSize: '0.8rem' }}>
                  {project.tech.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {portfolioData.projects.map((project) => (
          <div key={`${project.name}-desc`} style={{ marginTop: '2rem' }}>
            <p><span className="prompt">$</span>cat ~/projects/{project.name}/README.md</p>
            <div style={{ padding: '1rem', background: 'var(--code-bg)', borderRadius: '4px', marginTop: '0.5rem' }}>
              <p>{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
