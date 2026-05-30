import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Skills: React.FC = () => {
  const { t } = useLanguage();
  
  const skillCategories = [
    { title: 'languages', items: t.skills.languages },
    { title: 'frontend', items: t.skills.frontend },
    { title: 'backend', items: t.skills.backend },
    { title: 'infrastructure', items: t.skills.Infrastructure },
  ];

  return (
    <div className="page-skills">
      <p><span className="prompt">$</span> tree /home/tatsuya/skills</p>
      <div className="tree-output">
        <p>skills/</p>
        {skillCategories.map((cat, i) => (
          <div key={i} className="tree-node">
            <p>├── {cat.title}/</p>
            {cat.items.map((skill, j) => (
              <p key={j}>
                │   {j === cat.items.length - 1 ? '└──' : '├──'} {skill}
              </p>
            ))}
            {i === skillCategories.length - 1 ? '' : <p>│</p>}
          </div>
        ))}
        <p>└── info.txt</p>
      </div>
      
      <div style={{ marginTop: '2rem', opacity: 0.6, fontSize: '0.8rem' }}>
        <p>4 directories, {skillCategories.reduce((acc, cat) => acc + cat.items.length, 0)} files</p>
      </div>
    </div>
  );
};

export default Skills;
