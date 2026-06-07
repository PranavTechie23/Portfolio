import React from 'react';

const tags = [
  'React', 'TypeScript', 'Python', 'C++', 'Machine Learning',
  'Node.js', 'REST APIs', 'DSA', 'Full-Stack', 'scikit-learn',
  'LangChain', 'Git', 'System Design', 'OOP', 'SQL',
  'Framer Motion', 'Vite', 'Healthcare AI', 'FinTech', 'Open Source',
];

const TechMarquee: React.FC = () => {
  const row = [...tags, ...tags];

  return (
    <div className="relative w-full overflow-hidden border-y border-gray-100 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm py-4">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="marquee-track flex gap-4 w-max">
        {row.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="flex-shrink-0 px-5 py-2 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-[11px] font-mono font-bold uppercase tracking-widest text-gray-500 dark:text-slate-400 hover:border-primary/40 hover:text-primary transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
