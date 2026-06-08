import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TiltCard from './motion/TiltCard';

const platforms = [
  {
    name: "GitHub",
    description: "Where I build and ship technical projects, full-stack tools, and ML models.",
    icon: () => (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    link: "https://github.com/PranavTechie23"
  },
  {
    name: "LinkedIn",
    description: "Professional profile, educational milestones, and updates on my engineering journey.",
    icon: () => (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    link: "https://www.linkedin.com/in/pranavoswal23"
  },
  {
    name: "LeetCode",
    description: "Algorithmic problem solving and technical preparation.",
    icon: () => (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 94 111">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path d="M67.5068339,83.0664138 C70.0005384,80.5763786 74.0371402,80.5828822 76.5228362,83.0809398 C79.0085322,85.5789975 79.00204,89.6226456 76.5083355,92.1126808 L65.4351451,103.169577 C55.2192332,113.370744 38.5604663,113.518673 28.1722578,103.513204 C28.112217,103.455678 23.486583,98.9201326 8.22702585,83.9570195 C-1.92478479,74.0028895 -2.93614945,58.0748736 6.61697549,47.8463644 L24.4286944,28.7745461 C33.9100043,18.6218594 51.3874487,17.5122246 62.2279907,26.2789232 L78.4052912,39.3620235 C81.1448956,41.5776292 81.5728103,45.5984975 79.3610655,48.3428842 C77.1493207,51.0872709 73.1354592,51.5159327 70.3958548,49.300327 L54.2186634,36.2173149 C48.5492813,31.6325105 38.631911,32.2621597 33.7398535,37.5006265 L15.9279056,56.5726899 C11.2772073,61.552182 11.7865613,69.5740156 17.1461283,74.8292186 C28.3515339,85.8169393 36.9874071,94.2846214 36.9973988,94.294225 C42.3981571,99.4959838 51.130862,99.418438 56.43358,94.1233737 L67.5068339,83.0664138 Z" fill="currentColor" fillRule="nonzero" />
          <path d="M40.6069914,72.0014117 C37.086019,72.0014117 34.2317068,69.142117 34.2317068,65.6149982 C34.2317068,62.0878794 37.086019,59.2285847 40.6069914,59.2285847 L87.6247154,59.2285847 C91.1456879,59.2285847 94,62.0878794 94,65.6149982 C94,69.142117 91.1456879,72.0014117 87.6247154,72.0014117 L40.6069914,72.0014117 Z" fill="currentColor" />
          <path d="M49.4124315,2.02335002 C51.8178981,-0.552320454 55.852269,-0.686893945 58.4234511,1.72277172 C60.9946333,4.13243738 61.1289722,8.17385083 58.7235056,10.7495213 L15.9282277,56.5728697 C11.2773659,61.551984 11.7867168,69.5737689 17.1459309,74.8291832 L36.9094236,94.2091099 C39.4255514,96.6764051 39.4686234,100.719828 37.0056277,103.240348 C34.5426319,105.760868 30.5062548,105.804016 27.990127,103.33672 L8.22654289,83.9567041 C-1.92467414,74.0021005 -2.93603527,58.0741402 6.61751533,47.846311 L49.4124315,2.02335002 Z" fill="currentColor" />
        </g>
      </svg>
    ),
    link: "https://leetcode.com/u/pranavoswal23/"
  },
  {
    name: "GeeksForGeeks",
    description: "Computer science fundamentals and coding practice.",
    icon: () => (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.35 6.35 0 0 0-2.405.457 6.007 6.007 0 0 0-1.963 1.276 6.142 6.142 0 0 0-1.325 1.94 5.862 5.862 0 0 0-.466 1.864h-.063a5.857 5.857 0 0 0-.467-1.865 6.13 6.13 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0-4.949.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z" />
      </svg>
    ),
    link: "https://www.geeksforgeeks.org/user/pranavoswal23/"
  }
];

const Platforms: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div ref={ref} className="w-full flex flex-col space-y-8 bg-gray-50/50 dark:bg-slate-900/60 p-6 sm:p-8 md:p-16 border border-gray-100 dark:border-slate-800 rounded-[2rem]">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: isMobile ? 0.35 : 0.6, ease: "easeOut" }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 dark:text-slate-400 uppercase">Digital Presence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase italic leading-none">
            Where to <span className="text-primary italic">Find Me</span>
          </h2>
        </div>

        <a
          href="#contact"
          className="group flex items-center gap-3 text-sm font-black font-heading uppercase tracking-widest text-gray-500 dark:text-slate-400 hover:text-primary transition-all duration-300"
        >
          Let's Talk
          <span className="w-10 h-[1px] bg-gray-200 dark:bg-slate-700 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {platforms.map((platform, idx) => {
          const Icon = platform.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: isMobile ? 0.35 : 0.6, delay: (isMobile ? 0.1 : 0.2) + idx * (isMobile ? 0.05 : 0.1), ease: "easeOut" }}
              className="h-full"
            >
            <TiltCard
              as="a"
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-6 sm:p-8 md:p-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-2xl min-h-[200px] sm:min-h-[230px] md:min-h-[250px] h-full"
              intensity={7}
            >
              {/* Highlight background */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-50 dark:bg-slate-800 group-hover:h-full group-hover:bg-primary/5 transition-all duration-500" />

              <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="p-3.5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 w-fit rounded-2xl group-hover:bg-primary group-hover:border-primary text-gray-950 dark:text-slate-100 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  <Icon />
                </div>

                <div className="space-y-1.5 flex-grow">
                  <h3 className="text-xl sm:text-2xl font-black font-heading text-gray-950 dark:text-slate-100 group-hover:text-primary transition-colors uppercase tracking-tight italic">{platform.name}</h3>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-slate-400 leading-relaxed italic">{platform.description}</p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-slate-800 mt-auto">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 dark:text-slate-400 font-mono font-black group-hover:text-primary transition-colors">Connect</span>
                  <div className="w-8 h-8 rounded-full border border-gray-100 dark:border-slate-700 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Platforms;
