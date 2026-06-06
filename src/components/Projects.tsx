import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TiltCard from './motion/TiltCard';

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
  const isInView = useInView(ref, { once: false, margin: '-10%' });
  const [currentPage, setCurrentPage] = useState(0);

  const projectsPerPage = 4;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  // Delay scroll by 50ms so React re-renders the new page first.
  // This is critical for the last page (2 cards) — without delay the
  // section is taller than after render, causing scroll to undershoot.
  const scrollToTop = () => {
    setTimeout(() => {
      const section = document.getElementById('projects');
      if (section) {
        const top = section.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      scrollToTop();
    }
  };

  const goToPage = (idx: number) => {
    setCurrentPage(idx);
    scrollToTop();
  };

  return (
    <div ref={ref} className="w-full">
      {/* Header */}
      <motion.div
        className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 dark:text-slate-400 uppercase">Works</span>
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
          <span className="w-10 h-[1px] bg-gray-200 dark:bg-slate-700 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
        </a>
      </motion.div>

      {/* Grid — cards have min-height for consistency, grid sizes naturally */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
        {currentProjects.map((item, index) => (
          <TiltCard
            key={item.name}
            as="a"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View project: ${item.name}`}
            className="group relative p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-500 hover:shadow-2xl flex flex-col items-start overflow-hidden min-h-[280px]"
            intensity={8}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

            {/* Icon */}
            <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
              <svg
                className="w-5 h-5 text-gray-400 dark:text-slate-500 group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>

            <h3 className="text-2xl md:text-3xl font-black font-heading text-gray-950 dark:text-slate-100 uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
              {item.name}
            </h3>

            <p className="text-base text-gray-500 dark:text-slate-400 leading-relaxed font-medium mb-8 line-clamp-3 flex-grow">
              {item.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {item.stack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-full text-[10px] font-mono font-black text-gray-400 dark:text-slate-400 uppercase tracking-widest group-hover:border-primary/20 group-hover:text-primary dark:group-hover:text-primary transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">
          {/* Prev */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            aria-label="Previous projects"
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
              currentPage === 0
                ? 'border-gray-100 dark:border-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed'
                : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 dark:hover:border-primary/50 dark:hover:text-primary'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentPage === idx
                    ? 'bg-primary w-8'
                    : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-500 w-2'
                }`}
              />
            ))}
          </div>

          {/* Page counter */}
          <span className="text-[11px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest min-w-[40px] text-center">
            {currentPage + 1} / {totalPages}
          </span>

          {/* Next */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            aria-label="Next projects"
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
              currentPage === totalPages - 1
                ? 'border-gray-100 dark:border-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed'
                : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 dark:hover:border-primary/50 dark:hover:text-primary'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
