import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
          className="space-y-8 text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-heading drop-shadow-md mb-12"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400">
              About Me
            </span>
          </motion.h2>
          
          <p className="text-lg text-[#555] dark:text-[#AAA] leading-relaxed">
            With a background in 3D printing, cybersecurity, and DevOps, I've worked on projects ranging from prosthetic design to AI-powered workflows. I focus on leveraging technology to create practical, scalable solutions that improve efficiency and accessibility. Whether it's optimizing digital infrastructure, enhancing security, or developing custom hardware, I enjoy tackling challenges that bridge the gap between innovation and real-world application.
          </p>
          <p className="text-lg text-[#555] dark:text-[#AAA] leading-relaxed">
            Beyond my work, I'm always experimenting with new software, exploring emerging tech, and sharing knowledge to help others push the boundaries of what's possible.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
