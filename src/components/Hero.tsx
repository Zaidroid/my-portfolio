import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: 'easeInOut' },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative overflow-hidden"
      id="hero"
    >
      {/* Background Gradient Blobs */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-indigo-600/30 to-teal-500/30 blur-[120px]"
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-teal-500/25 to-cyan-500/25 blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="max-w-4xl mx-auto text-center relative z-10"
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div
          className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-8"
          variants={imageVariants}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 opacity-20 blur-xl" />
          <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-gradient-to-r from-indigo-600/50 to-teal-500/50 dark:ring-cyan-400/50 shadow-lg">
            <img
              src="/profile.jpg"
              alt="Zaid's Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={0}
          variants={textVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400"
        >
          Zaid: Innovator & Developer
        </motion.h1>

        {/* Subheading */}
        <motion.p
          custom={1}
          variants={textVariants}
          className="text-xl sm:text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 mt-4 mb-6"
        >
          Building impactful digital and physical solutions
        </motion.p>

        {/* Description */}
        <motion.p
          custom={2}
          variants={textVariants}
          className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Based in Palestine, I specialize in 3D printing, software development, and creating practical innovations that solve real-world challenges.
        </motion.p>

        {/* Call-to-Action */}
        <motion.div
          custom={3}
          variants={textVariants}
          className="mt-8"
        >
          <motion.a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 text-white rounded-full font-medium shadow-lg relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(45, 212, 191, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <span className="relative z-10">Discover My Work</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 opacity-0 group-hover:opacity-100"
              initial={{ x: '100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
