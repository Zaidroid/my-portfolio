// 1. Updated Hero.tsx with more dynamic animations and 3D effect
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-6 pt-32 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent dark:from-blue-600/10 animate-pulse-slow" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-purple-500/20 dark:bg-blue-500/20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            transition={{ 
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative mx-auto w-40 h-40 mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50 animate-pulse" />
            <img
              src="/profile.jpg" // Replace with your actual photo path
              alt="Profile"
              className="relative w-full h-full rounded-full object-cover border-4 border-[rgb(var(--background))] shadow-xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-heading text-balance bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400"
          >
            Hi, I'm Zaid—a maker, developer, and problem-solver, crafting innovative digital and physical experiences.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="section-subheading mx-auto"
          >
            I'm a multidisciplinary creator based in Palestine, specializing in 3D printing, automation, and digital technology. Whether designing custom products, optimizing smart home systems, or building scalable digital solutions, I focus on blending functionality with creativity.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a 
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View My Work
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          repeatType: "loop" 
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-[rgb(var(--foreground))]/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--foreground))]/50" />
        </div>
      </motion.div>
    </section>
  );
}
