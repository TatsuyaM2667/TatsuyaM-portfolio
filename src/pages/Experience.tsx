import React from 'react';
import { portfolioData } from '../data/portfolioData';

const Experience: React.FC = () => {
  return (
    <div className="page-experience">
      <p><span className="prompt">$</span>journalctl -u career.service</p>
      <div style={{ paddingLeft: '1rem', marginTop: '1rem' }}>
        {portfolioData.experiences.map((exp, index) => (
          <div key={index} style={{ marginBottom: '2rem', borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
            <p style={{ color: 'var(--success)', fontWeight: 'bold' }}>
              [{exp.period}] INFO: {exp.role}
            </p>
            <p style={{ color: 'var(--text-h)' }}>Company: {exp.company}</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
              {exp.desc}
            </p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '3rem' }}><span className="prompt">$</span>cat skills.json</p>
      <pre style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
        {JSON.stringify(portfolioData.skills, null, 2)}
      </pre>
    </div>
  );
};

export default Experience;
