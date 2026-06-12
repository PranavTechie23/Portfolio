import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Building2, HeartPulse, Briefcase, CreditCard, CheckSquare, Train, Car, Grid2X2, BarChart2, Stethoscope } from 'lucide-react';
import TiltCard from './motion/TiltCard';
import { easeOutExpo } from '../utils/motion';

const colorMap = [
  {
    accent: 'from-[#534AB7] to-[#7F77DD]',
    iconBg: 'bg-[#EEEDFE] text-[#534AB7] dark:bg-[#26215C] dark:text-[#CECBF6]',
    textHover: 'group-hover:text-[#534AB7] dark:group-hover:text-[#CECBF6]',
    borderHover: 'hover:border-[#534AB7]/40 dark:hover:border-[#CECBF6]/30',
    tagHover: 'hover:border-[#534AB7]/30 dark:hover:border-[#CECBF6]/20 hover:text-[#534AB7] dark:hover:text-[#CECBF6]',
  },
  {
    accent: 'from-[#0F6E56] to-[#1D9E75]',
    iconBg: 'bg-[#E1F5EE] text-[#0F6E56] dark:bg-[#04342C] dark:text-[#9FE1CB]',
    textHover: 'group-hover:text-[#0F6E56] dark:group-hover:text-[#9FE1CB]',
    borderHover: 'hover:border-[#0F6E56]/40 dark:hover:border-[#9FE1CB]/30',
    tagHover: 'hover:border-[#0F6E56]/30 dark:hover:border-[#9FE1CB]/20 hover:text-[#0F6E56] dark:hover:text-[#9FE1CB]',
  },
  {
    accent: 'from-[#993C1D] to-[#D85A30]',
    iconBg: 'bg-[#FAECE7] text-[#993C1D] dark:bg-[#4A1B0C] dark:text-[#F0997B]',
    textHover: 'group-hover:text-[#993C1D] dark:group-hover:text-[#F0997B]',
    borderHover: 'hover:border-[#993C1D]/40 dark:hover:border-[#F0997B]/30',
    tagHover: 'hover:border-[#993C1D]/30 dark:hover:border-[#F0997B]/20 hover:text-[#993C1D] dark:hover:text-[#F0997B]',
  },
  {
    accent: 'from-[#993556] to-[#D4537E]',
    iconBg: 'bg-[#FBEAF0] text-[#993556] dark:bg-[#4B1528] dark:text-[#ED93B1]',
    textHover: 'group-hover:text-[#993556] dark:group-hover:text-[#ED93B1]',
    borderHover: 'hover:border-[#993556]/40 dark:hover:border-[#ED93B1]/30',
    tagHover: 'hover:border-[#993556]/30 dark:hover:border-[#ED93B1]/20 hover:text-[#993556] dark:hover:text-[#ED93B1]',
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
    name: "Loan Approval Prediction",
    description: "Intelligent system for loan approval prediction using advanced machine learning models and data analytics to streamline financial decisions.",
    stack: ["Machine Learning", "Data Analytics", "Python"],
    url: "https://github.com/PranavTechie23/Loan-Approval-Intelligence",
    icon: BarChart2,
    colorIdx: 0,
  },
  {
    name: "Multi-Clinic Management",
    description: "Comprehensive software solution for managing multiple clinics, streamlining patient records, scheduling, and medical workflows.",
    stack: ["Software Dev", "Management", "Healthcare"],
    url: "https://github.com/PranavTechie23/multi-clinic-system",
    icon: Stethoscope,
    colorIdx: 1,
  },
];

const PROJECTS_PER_PAGE = 4;

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isInView = useInView(ref, { once: true, margin: isMobile ? '-4%' : '-10%' });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: isMobile ? '-8%' : '-12%' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const prefersReducedMotion = useReducedMotion();

  const yEvenTransform = useTransform(scrollYProgress, (v) => {
    if (prefersReducedMotion) return 0;
    const range = isMobile ? 28 : 50;
    return (v - 0.5) * 2 * range;
  });

  const yOddTransform = useTransform(scrollYProgress, (v) => {
    if (prefersReducedMotion) return 0;
    const range = isMobile ? 28 : 50;
    return (0.5 - v) * 2 * range;
  });

  const yEven = useSpring(yEvenTransform, { damping: 22, stiffness: 100 });
  const yOdd  = useSpring(yOddTransform,  { damping: 22, stiffness: 100 });

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

  const dur = isMobile ? 0.6 : 0.6;

  return (
    <div ref={ref} className="relative w-full">
      {/* Header */}
      <motion.div
        className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
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
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: isMobile ? 0.1 : 0.12,
              }
            }
          }}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          exit="hidden"
        >
          {currentProjects.map((item, idx) => {
            const color = colorMap[item.colorIdx];
            const Icon = item.icon;
            const yDrift = idx % 2 === 0 ? yEven : yOdd;

            return (
              <motion.div
                key={item.name}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1, 
                    transition: { 
                      duration: 0.4,
                      staggerChildren: 0.05
                    } 
                  }
                }}
                style={{ y: yDrift, willChange: 'transform' }}
                className="h-full w-full"
              >
              <motion.div
                  variants={{
                    hidden: isMobile
                      ? { opacity: 0, y: 36, scale: 0.91, filter: 'blur(8px)' }
                      : { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                      transition: { duration: isMobile ? 0.7 : 0.6, ease: easeOutExpo },
                    }
                  }}
                  className="h-full w-full"
                >
                  <TiltCard
                    key={item.name}
                    as="a"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View project: ${item.name}`}
                    className={`group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-150 dark:border-slate-800/80 rounded-3xl overflow-hidden flex flex-col min-h-[280px] h-full w-full transition-all duration-500 hover:shadow-2xl ${color.borderHover}`}
                    intensity={6}
                  >
                    {/* Glowing outer backdrop border glow on hover */}
                    <div className={`absolute -inset-px bg-gradient-to-r ${color.accent} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none -z-10`} />

                    {/* Mechanical dot mesh grid overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

                    {/* Colored accent top bar */}
                    <div className={`h-[4px] w-full bg-gradient-to-r ${color.accent} flex-shrink-0`} />

                    <div className="flex flex-col flex-grow p-7 sm:p-8 relative z-10">
                      {/* Icon & Index Row */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color.iconBg} border border-black/5 dark:border-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                          <Icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-slate-800/80 text-gray-400 dark:text-slate-500 border border-gray-100 dark:border-slate-800 uppercase tracking-widest transition-colors duration-300">
                          Project #{String(idx + 1 + currentPage * PROJECTS_PER_PAGE).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Title & External Link Icon */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className={`text-lg sm:text-xl font-black font-heading text-gray-950 dark:text-slate-100 tracking-tight leading-snug ${color.textHover} transition-colors duration-300`}>
                          {item.name}
                        </h3>
                        <ExternalLink
                          className="w-4.5 h-4.5 text-gray-400 dark:text-slate-500 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 mt-1 flex-shrink-0"
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                      </p>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 bg-gray-50 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800 rounded-lg text-[9px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider transition-all duration-300 ${color.tagHover}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Explore Action Button */}
                      <div className="pt-5 mt-auto flex items-center justify-between border-t border-gray-100 dark:border-slate-800/60">
                        <span className={`text-[10px] font-mono font-black uppercase tracking-[0.25em] text-gray-400 dark:text-slate-500 ${color.textHover} transition-colors duration-300`}>
                          Explore Project
                        </span>
                        <div className={`w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-500 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-8">
          <div className="bg-gray-50/60 dark:bg-slate-900/40 backdrop-blur-md border border-gray-150 dark:border-slate-800/60 px-4 py-2 rounded-full flex items-center gap-4 shadow-sm">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              aria-label="Previous projects"
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ${
                currentPage === 0
                  ? 'border-transparent text-gray-300 dark:text-slate-700 cursor-not-allowed'
                  : 'border-gray-200/60 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary hover:border-primary/30 shadow-sm'
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
                      ? 'bg-primary w-5 h-2.5 shadow-[0_0_8px_rgba(33,150,243,0.5)]'
                      : 'bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 w-2.5 h-2.5'
                  }`}
                />
              ))}
            </div>

            <span className="text-[10px] font-mono font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest min-w-[36px] text-center">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              aria-label="Next projects"
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ${
                currentPage === totalPages - 1
                  ? 'border-transparent text-gray-300 dark:text-slate-700 cursor-not-allowed'
                  : 'border-gray-200/60 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-primary hover:border-primary/30 shadow-sm'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;