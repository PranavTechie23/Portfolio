import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    name: "Campus Career Platform",
    description: "Decision-support system for automated candidate-job matching based on CGPA, branch, and skill constraints. Designed scalable REST APIs.",
    stack: ["System Arch", "Backend", "REST APIs"],
    url: "#"
  },
  {
    name: "OncoAI Treatment Plan",
    description: "ML-based clinical decision support system for personalized cancer treatment using risk prediction models. Integrated SHAP explainability.",
    stack: ["ML", "SHAP", "Healthcare AI"],
    url: "https://github.com/PranavTechie23/OncoAI"
  },
  {
    name: "Skills Connect Job Board",
    description: "Full-stack job matching platform with skill- and location-based candidate filtering. Designed backend services and relational data models.",
    stack: ["Full-Stack", "Database", "Web Dev"],
    url: "https://github.com/PranavTechie23/Skill_Connect"
  },
  {
    name: "CrediNova",
    description: "Adaptive Credit Intelligence Engine for unbanked populations using alternative financial signals, explainable AI, fairness monitoring, and audit trails.",
    stack: ["FinTech AI", "Explainability", "Fairness"],
    url: "https://github.com/PranavTechie23/CrediNova"
  },
  {
    name: "Voting Management System",
    description: "Comprehensive C++ data structures project with 6 progressive versions (Arrays, Linked Lists, BST, Heap, Graph, and complete system) for election workflows.",
    stack: ["C++", "Data Structures", "Algorithms"],
    url: "https://github.com/PranavTechie23/DS_Mini_Project"
  },
  {
    name: "ThroughputAI",
    description: "AI-powered railway control center with real-time operations dashboard, train delay prediction, scheduling optimization, and secure full-stack architecture.",
    stack: ["React", "Node.js", "ML"],
    url: "https://github.com/PranavTechie23/ThroughputAI"
  },
  {
    name: "Car Rental System",
    description: "Console-based C++ car rental workflow showcasing OOP principles with car inventory, booking and return management, billing, and persistent file handling.",
    stack: ["C++", "OOP", "File Handling"],
    url: "https://github.com/PranavTechie23/OOPC_Mini_Project"
  },
  {
    name: "FrontEnd - Tic Tac Toe",
    description: "Frontend-focused Tic-Tac-Toe game built with core web technologies, featuring interactive gameplay logic and responsive UI styling.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/PranavTechie23/Tic-Tac-Toe"
  },
  {
    name: "Loan Approval Intelligence",
    description: "Intelligent system for loan approval prediction using advanced machine learning models and data analytics to streamline financial decisions.",
    stack: ["Machine Learning", "Data Analytics", "Python"],
    url: "https://github.com/PranavTechie23/Loan-Approval-Intelligence"
  },
  {
    name: "Multi-Clinic Management System",
    description: "Comprehensive software solution for managing multiple clinics, streamlining patient records, scheduling, and medical workflows.",
    stack: ["Software Dev", "Management System", "Healthcare"],
    url: "https://github.com/PranavTechie23/multi-clinic-system"
  }
];

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [currentPage, setCurrentPage] = useState(0);

  const projectsPerPage = 4;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
    <div ref={ref} className="w-full">
      <motion.div 
        className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4">
           <div className="flex items-center gap-4">
              <div className="h-[2px] w-8 bg-primary" />
              <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 uppercase">Works</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase italic leading-none">
              Selected <span className="text-primary italic">Projects</span>
           </h2>
        </div>
        
        <a 
          href="https://github.com/PranavTechie23" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="View my GitHub profile"
          className="group flex items-center gap-3 text-sm font-black font-heading uppercase tracking-widest text-gray-500 dark:text-slate-400 hover:text-primary transition-all duration-300"
        >
          View GitHub 
          <span className="w-10 h-[1px] bg-gray-200 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {currentProjects.map((item, index) => (
          <motion.a
             key={item.name}
             href={item.url}
             target="_blank"
             rel="noopener noreferrer"
             aria-label={`View project details for ${item.name}`}
            className="group relative p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] hover:border-primary/20 transition-all duration-500 hover:shadow-2xl flex flex-col items-start overflow-hidden"
             initial={{ opacity: 0, y: 40 }}
             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
             transition={{ duration: 0.8, delay: index * 0.15 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
              <svg className="w-6 h-6 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>

            <h3 className="text-2xl md:text-3xl font-black font-heading text-gray-950 dark:text-slate-100 uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
              {item.name}
            </h3>

            <p className="text-lg text-gray-500 dark:text-slate-400 leading-relaxed font-medium mb-10 line-clamp-3">
              {item.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {item.stack.map((tech, tIdx) => (
                <span key={tIdx} className="px-3 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-full text-[10px] font-mono font-black text-gray-400 dark:text-slate-400 uppercase tracking-widest italic group-hover:border-primary/20 group-hover:text-primary transition-all">
                  {tech}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-12">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`w-14 h-14 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${currentPage === 0 ? 'border-gray-100 text-gray-300 dark:border-slate-800 dark:text-slate-600 cursor-not-allowed' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 dark:border-slate-700 dark:text-slate-400 dark:hover:border-primary/50 dark:hover:text-primary'}`}
            aria-label="Previous projects"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex gap-3">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`h-2.5 rounded-full transition-all duration-500 ${currentPage === idx ? 'bg-primary w-10' : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-500 w-2.5'}`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`w-14 h-14 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${currentPage === totalPages - 1 ? 'border-gray-100 text-gray-300 dark:border-slate-800 dark:text-slate-600 cursor-not-allowed' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 dark:border-slate-700 dark:text-slate-400 dark:hover:border-primary/50 dark:hover:text-primary'}`}
            aria-label="Next projects"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
