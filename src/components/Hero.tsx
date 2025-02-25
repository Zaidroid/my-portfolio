import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-32 h-32 mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50 animate-pulse" />
            <img
              src="https://picsum.photos/200/200"
              alt="Profile"
              className="relative w-full h-full rounded-full object-cover border-4 border-[rgb(var(--background))] shadow-xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-heading text-balance"
          >
            Hi, I'm Zaid—a maker, developer, and problem-solver, crafting innovative digital and physical experiences.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="section-subheading mx-auto"
          >
            {/* This section seems to be a continuation of the hero, so I'll include the first paragraph here */}
            I'm a multidisciplinary creator based in Palestine, specializing in 3D printing, automation, and digital technology. Whether designing custom products, optimizing smart home systems, or building scalable digital solutions, I focus on blending functionality with creativity.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
