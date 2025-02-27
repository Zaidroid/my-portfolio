import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <div className="space-y-12">
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
            className="group relative mx-auto w-40 h-40 mb-8"
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
            className="section-heading text-balance bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400"
          >
            Hi, I'm Zaid—a maker, developer, and problem-solver, crafting innovative digital and physical experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="section-subheading mx-auto"
          >
            I'm a multidisciplinary creator based in Palestine, specializing in 3D printing, automation, and digital technology. Whether designing custom products, optimizing smart home systems, or building scalable digital solutions, I focus on blending functionality with creativity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#work"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
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
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
