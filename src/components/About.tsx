import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp } from '../utils/animationVariants';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-32 px-6 relative">
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-600/20 to-teal-500/20 blur-[120px]" />
        <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full bg-gradient-to-r from-teal-500/15 to-cyan-500/15 blur-[120px]" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
          className="space-y-8 text-center"
        >
          <motion.h2 
            variants={fadeInUp}
            custom={1}
            className="section-heading text-3xl md:text-4xl font-bold drop-shadow-md mb-12"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400">
              About Me
            </span>
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            custom={2}
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            With a background in 3D printing, cybersecurity, and DevOps, I've worked on projects ranging from prosthetic design to AI-powered workflows. I focus on leveraging technology to create practical, scalable solutions that improve efficiency and accessibility. Whether it's optimizing digital infrastructure, enhancing security, or developing custom hardware, I enjoy tackling challenges that bridge the gap between innovation and real-world application.
          </motion.p>
          <motion.p 
            variants={fadeInUp}
            custom={3}
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            Beyond my work, I'm always experimenting with new software, exploring emerging tech, and sharing knowledge to help others push the boundaries of what's possible.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
