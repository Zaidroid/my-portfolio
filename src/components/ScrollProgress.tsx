// src/components/ScrollProgress.tsx
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-500 dark:to-purple-500 z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
    />
  );
}
