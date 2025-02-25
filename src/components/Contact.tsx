import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, Linkedin, Mail } from 'lucide-react';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
          className="space-y-12"
        >
          <h2 className="section-heading mb-6">Let's work together</h2>
          <p className="section-subheading mx-auto mb-12">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          
          <div className="flex justify-center space-x-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a1a1a] hover:text-[#555] transition-colors duration-300"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a1a1a] hover:text-[#555] transition-colors duration-300"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="text-[#1a1a1a] hover:text-[#555] transition-colors duration-300"
            >
              <span className="sr-only">Email</span>
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
