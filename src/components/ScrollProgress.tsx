import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [scrollDirection, setScrollDirection] = useState('down');
  const [prevScrollY, setPrevScrollY] = useState(0);
  
  // Use spring physics for smoother progress bar movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Generate gradient colors based on scroll progress, aligned with app palette
  const gradientColor1 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#4c51bf', '#2dd4bf', '#2b6cb0'] // Light theme: indigo-600 to teal-500 range
  );
  
  const gradientColor2 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#2b6cb0', '#06b6d4', '#4c51bf'] // Light theme: teal-500 to indigo-600 range
  );
  
  // Dark theme gradients
  const darkGradientColor1 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#22d3ee', '#0891b2', '#67e8f9'] // Dark theme: cyan-400 to teal-400 range
  );
  
  const darkGradientColor2 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#0891b2', '#14b8a6', '#22d3ee'] // Dark theme: teal-400 to cyan-400 range
  );
  
  // Track scroll direction for animation variants
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setPrevScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);
  
  const variants = {
    down: {
      height: '4px',
      boxShadow: '0 1px 8px rgba(59, 130, 246, 0.4)', // Adjusted to teal-500 rgba
    },
    up: {
      height: '5px',
      boxShadow: '0 2px 10px rgba(59, 130, 246, 0.5)', // Adjusted to teal-500 rgba
    }
  };

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Main progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50"
        variants={variants}
        animate={scrollDirection}
        transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ 
          scaleX, 
          transformOrigin: '0%',
          background: `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`,
        }}
      />
      
      {/* Secondary subtle glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-40 opacity-50 blur-[2px]"
        style={{
          scaleX,
          transformOrigin: '0%',
          background: `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`,
        }}
      />
      
      {/* Floating scroll indicator */}
      <motion.div
        className="fixed right-6 bottom-6 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium z-40 border border-gray-200/20 dark:border-gray-800/30 hidden md:flex items-center shadow-lg hover:bg-teal-500/20 dark:hover:bg-cyan-400/20 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.02 ? 1 : 0,
          y: scrollYProgress.get() > 0.02 ? 0 : 20
        }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 mr-2"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          style={{ color: gradientColor1 }}
          className="dark:text-white"
        >
          {Math.round(scrollYProgress.get() * 100)}%
        </motion.span>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed right-6 bottom-20 bg-white/10 dark:bg-gray-900/20 backdrop-blur-md p-3 rounded-full z-40 border border-gray-200/20 dark:border-gray-800/30 hidden md:flex items-center justify-center shadow-lg hover:bg-teal-500/20 dark:hover:bg-cyan-400/20 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.1 ? 1 : 0,
          y: scrollYProgress.get() > 0.1 ? 0 : 20
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        aria-label="Back to top"
      >
        <motion.div
          className="w-5 h-5 text-gray-700 dark:text-gray-200"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowUp className="w-full h-full" />
        </motion.div>
      </motion.button>
    </>
  );
}
