import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
          className="space-y-8"
        >
          <p className="text-lg text-[#555] leading-relaxed">
            With years of hands-on experience in 3D printing, cybersecurity, and DevOps, I've worked on everything from prosthetic design to home automation and AI-powered workflows. My approach is deeply practical—leveraging technology to solve real-world problems while ensuring accessibility and efficiency.
          </p>
          <p className="text-lg text-[#555] leading-relaxed">
            Beyond my work, I’m always exploring new software, experimenting with emerging tech, and sharing knowledge to help others innovate.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
