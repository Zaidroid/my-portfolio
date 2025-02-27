import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Adjust scroll-based animations to be less aggressive on mobile
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -150]);
  const opacity = useTransform(scrollYProgress, [0, isMobile ? 0.8 : 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, isMobile ? 0.8 : 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 pt-16 pb-12 relative"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <div className="space-y-8 md:space-y-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.05 }}
            className="group relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-8"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl dark:blur-2xl opacity-40 dark:opacity-50"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <img
              src="https://i.imgur.com/NE54VcT.jpeg"
              alt="Profile"
              className="relative w-full h-full rounded-full object-cover border-4 border-[rgb(var(--background))] shadow-2xl transition-all duration-500 group-hover:shadow-purple-500/20 dark:group-hover:shadow-blue-500/30"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold section-heading text-balance bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400"
          >
            Hi, I'm Zaid. A maker, developer, and problem-solver, crafting innovative digital and physical experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg section-subheading mx-auto"
          >
            I'm a multidisciplinary creator based in Palestine with a passion for 3D printing, digital technology, and problem-solving. From designing custom products to developing practical digital solutions, I enjoy blending creativity with functionality to build things that make a difference.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="sticky bottom-4 md:static" // Make button sticky on mobile
          >
            <motion.a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-500 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.div
                className="relative z-10"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
