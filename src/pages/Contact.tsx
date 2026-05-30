import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="page-contact">
      <p><span className="prompt">$</span> finger tatsuya</p>
      <div className="terminal-status-info">
        <p>Login: tatsuya          Name: {t.name}</p>
        <p>Role: {t.role}</p>
        <p>Location: Colchester, UK / Tokyo, JP</p>
        <p>--------------------------------------------------</p>
        
        <div className="status-links">
          <p>
            <span className="status-label">GITHUB:</span>
            <a href={t.contact.github} target="_blank" rel="noreferrer">{t.contact.github.replace('https://', '')}</a>
          </p>
          <p>
            <span className="status-label">LINKEDIN:</span>
            <a href={t.contact.LinkedIn} target="_blank" rel="noreferrer">linkedin.com/in/tatsuya-miura</a>
          </p>
          <p>
            <span className="status-label">EMAIL:</span>
            <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
          </p>
          {t.contact.orcid && (
            <p>
              <span className="status-label">ORCID:</span>
              <a href={t.contact.orcid} target="_blank" rel="noreferrer">{t.contact.orcid.replace('https://orcid.org/', '')}</a>
            </p>
          )}
        </div>
        
        <p>--------------------------------------------------</p>
        <p>Status: Available for interesting projects.</p>
        <p>Plan: Graduate from Essex with first-class honours.</p>
      </div>
    </div>
  );
};

export default Contact;
