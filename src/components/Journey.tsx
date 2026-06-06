import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';


const journeyItems = [
  {
    title: 'Machine Learning Specialization',
    status: 'DeepLearning.AI',
    description: 'Explored advanced machine learning techniques, fundamentals, and model architectures.'
  },
  {
    title: 'Full Stack Web Development',
    status: 'Completed',
    description: 'Built scalable and responsive web applications with modern frontend and backend technologies.'
  },
  {
    title: 'Java Programming',
    status: 'Completed',
    description: 'Mastered Object-Oriented Programming and advanced data structures using Java.'
  }
];

const Journey: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  return (
    <div ref={ref} className="w-full">
      <motion.div 
        className="mb-20 space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-8 bg-primary" />
          <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 uppercase">Momentum</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase italic leading-none">
          Continuous <span className="text-primary italic">Growth</span>
        </h2>
      </motion.div>

      <div className="max-w-4xl space-y-16 relative">
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-100 dark:bg-slate-800 origin-top"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {journeyItems.map((item, idx) => (
          <motion.div 
            key={idx} 
            className="relative pl-12 group"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, delay: 0.2 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ x: 8 }}
          >
            <motion.div
              className="absolute left-[-5px] top-4 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(33,150,243,0.3)]"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.3 + idx * 0.15 }}
              whileHover={{ scale: 1.6, boxShadow: '0 0 20px rgba(33,150,243,0.6)' }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
              <h4 className="text-3xl font-black font-heading text-gray-950 dark:text-slate-100 uppercase tracking-tighter">
                {item.title}
              </h4>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-widest italic border ${
                item.status === 'Learning' ? 'bg-primary/5 border-primary/20 text-primary' :
                item.status === 'Exploring' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600' :
                'bg-orange-500/5 border-orange-500/20 text-orange-600'
              }`}>
                {item.status}
              </span>
            </div>
            
            <p className="text-xl text-gray-500 dark:text-slate-400 leading-relaxed font-medium max-w-2xl italic">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
