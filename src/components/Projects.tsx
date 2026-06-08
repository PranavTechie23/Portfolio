import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Building2, HeartPulse, Briefcase, CreditCard, CheckSquare, Train, Car, Grid2X2, BarChart2, Stethoscope } from 'lucide-react';
import TiltCard from './motion/TiltCard';

const colorMap = [
  {
    accent: 'from-[#534AB7] to-[#7F77DD]',
    iconBg: 'bg-[#EEEDFE] text-[#534AB7] dark:bg-[#26215C] dark:text-[#CECBF6]',
    tagHover: 'group-hover:border-[#AFA9EC]/60 group-hover:text-[#534AB7] dark:group-hover:text-[#CECBF6]',
  },
  {
    accent: 'from-[#0F6E56] to-[#1D9E75]',
    iconBg: 'bg-[#E1F5EE] text-[#0F6E56] dark:bg-[#04342C] dark:text-[#9FE1CB]',
    tagHover: 'group-hover:border-[#5DCAA5]/60 group-hover:text-[#0F6E56] dark:group-hover:text-[#9FE1CB]',
  },
  {
    accent: 'from-[#993C1D] to-[#D85A30]',
    iconBg: 'bg-[#FAECE7] text-[#993C1D] dark:bg-[#4A1B0C] dark:text-[#F0997B]',
    tagHover: 'group-hover:border-[#F0997B]/60 group-hover:text-[#993C1D] dark:group-hover:text-[#F0997B]',
  },
  {
    accent: 'from-[#993556] to-[#D4537E]',
    iconBg: 'bg-[#FBEAF0] text-[#993556] dark:bg-[#4B1528] dark:text-[#ED93B1]',
    tagHover: 'group-hover:border-[#ED93B1]/60 group-hover:text-[#993556] dark:group-hover:text-[#ED93B1]',
  },
];

const projects = [
  {
    name: "Campus Career Platform",
    description: "Decision-support system for automated candidate-job matching based on CGPA, branch, and skill constraints. Designed scalable REST APIs.",
    stack: ["System Arch", "Backend", "REST APIs"],
    url: "#",
    icon: Building2,
    colorIdx: 0,
  },
  {
    name: "OncoAI Treatment Plan",
    description: "ML-based clinical decision support system for personalised cancer treatment using risk prediction models. Integrated SHAP explainability.",
    stack: ["ML", "SHAP", "Healthcare AI"],
    url: "https://github.com/PranavTechie23/OncoAI",
    icon: HeartPulse,
    colorIdx: 1,
  },
  {
    name: "Skills Connect Job Board",
    description: "Full-stack job matching platform with skill- and location-based candidate filtering. Designed backend services and relational data models.",
    stack: ["Full-Stack", "Database", "Web Dev"],
    url: "https://github.com/PranavTechie23/Skill_Connect",
    icon: Briefcase,
    colorIdx: 2,
  },
  {
    name: "CrediNova",
    description: "Adaptive Credit Intelligence Engine for unbanked populations using alternative financial signals, explainable AI, fairness monitoring, and audit trails.",
    stack: ["FinTech AI", "Explainability", "Fairness"],
    url: "https://github.com/PranavTechie23/CrediNova",
    icon: CreditCard,
    colorIdx: 3,
  },
  {
    name: "Voting Management System",
    description: "Comprehensive C++ data structures project with 6 progressive versions (Arrays, Linked Lists, BST, Heap, Graph, and complete system) for election workflows.",
    stack: ["C++", "Data Structures", "Algorithms"],
    url: "https://github.com/PranavTechie23/DS_Mini_Project",
    icon: CheckSquare,
    colorIdx: 0,
  },
  {
    name: "ThroughputAI",
    description: "AI-powered railway control centre with real-time operations dashboard, train delay prediction, scheduling optimisation, and secure full-stack architecture.",
    stack: ["React", "Node.js", "ML"],
    url: "https://github.com/PranavTechie23/ThroughputAI",
    icon: Train,
    colorIdx: 1,
  },
  {
    name: "Car Rental System",
    description: "Console-based C++ car rental workflow showcasing OOP principles with car inventory, booking and return management, billing, and persistent file handling.",
    stack: ["C++", "OOP", "File Handling"],
    url: "https://github.com/PranavTechie23/OOPC_Mini_Project",
    icon: Car,
    colorIdx: 2,
  },
  {
    name: "FrontEnd — Tic Tac Toe",
    description: "Frontend-focused Tic-Tac-Toe game built with core web technologies, featuring interactive gameplay logic and responsive UI styling.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/PranavTechie23/Tic-Tac-Toe",
    icon: Grid2X2,
    colorIdx: 3,
  },
  {
    name: "Loan Approval Intelligence",
    description: "Intelligent system for loan approval prediction using advanced machine learning models and data analytics to streamline financial decisions.",
    stack: ["Machine Learning", "Data Analytics", "Python"],
    url: "https://github.com/PranavTechie23/Loan-Approval-Intelligence",
    icon: BarChart2,
    colorIdx: 0,
  },
  {
    name: "Multi-Clinic Management System",
    description: "Comprehensive software solution for managing multiple clinics, streamlining patient records, scheduling, and medical workflows.",
    stack: ["Software Dev", "Management System", "Healthcare"],
    url: "https://github.com/PranavTechie23/multi-clinic-system",
    icon: Stethoscope,
    colorIdx: 1,
  },
];

const PROJECTS_PER_PAGE = 4;

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const currentProjects = projects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE
  );

  const scrollToSection = () => {
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
      setCurrentPage(p => p + 1);
      scrollToSection();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(p => p - 1);
      scrollToSection();
    }
  };

  const goToPage = (idx: number) => {
    setCurrentPage(idx);
    scrollToSection();
  };

  const dur = isMobile ? 0.35 : 0.6;

  return (
    <div ref={ref} className="w-full">
      {/* Header */}
      <motion.div
        className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: dur }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 dark:text-slate-400 uppercase">
              Works
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase italic leading-none">
            Selected <span className="text-primary italic">Projects</span>
          </h2>
        </div>

        <motion.a
          href="https://github.com/PranavTechie23"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View my GitHub profile"
          className="group flex items-center gap-3 text-sm font-black font-heading uppercase tracking-widest text-gray-500 dark:text-slate-400 hover:text-primary transition-all duration-300"
        >
          View GitHub
          <span className="w-10 h-[1px] bg-gray-200 dark:bg-slate-700 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
        </motion.a>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {currentProjects.map((item) => {
            const color = colorMap[item.colorIdx];
            const Icon = item.icon;

            return (
              <TiltCard
                key={item.name}
                as="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View project: ${item.name}`}
                className="group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col min-h-[240px] sm:min-h-[260px] h-full hover:border-gray-200 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1"
                intensity={6}
              >
                {/* Colored accent bar */}
                <div className={`h-[3px] w-full bg-gradient-to-r ${color.accent} flex-shrink-0`} />

                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  {/* Icon row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <ExternalLink
                      className="w-4 h-4 text-gray-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black font-heading text-gray-950 dark:text-slate-100 tracking-tight mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-6 flex-1 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Stack tags */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-full text-[10px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-all duration-200 ${color.tagHover}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            aria-label="Previous projects"
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${
              currentPage === 0
                ? 'border-gray-100 dark:border-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed'
                : 'border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  currentPage === idx
                    ? 'bg-primary w-5 h-2'
                    : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-500 w-2 h-2'
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest min-w-[36px] text-center">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            aria-label="Next projects"
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${
              currentPage === totalPages - 1
                ? 'border-gray-100 dark:border-slate-800 text-gray-300 dark:text-slate-600 cursor-not-allowed'
                : 'border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;