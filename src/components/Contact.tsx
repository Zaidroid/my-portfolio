import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { fadeInUp } from '../utils/animationVariants';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Animated background elements similar to Projects component */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-purple-500/10 dark:bg-blue-500/10 blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -top-40 -left-20 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-purple-500/10 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
          className="space-y-12"
        >
          <motion.h2 
            variants={fadeInUp}
            custom={1}
            className="section-heading drop-shadow-md"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400">
              Let's work together
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="section-subheading mx-auto mb-12 max-w-2xl"
          >
            I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={3}
            className="flex flex-col items-center gap-8"
          >
            <motion.a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Send me an email</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-purple-500 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.div
                className="relative z-10"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.a>

            <motion.div 
              className="flex justify-center gap-6 mt-8"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-[rgb(var(--foreground))]/5 hover:bg-[rgb(var(--foreground))]/10 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                variants={fadeInUp}
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-[rgb(var(--foreground))]/5 hover:bg-[rgb(var(--foreground))]/10 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
                variants={fadeInUp}
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="mailto:hello@example.com"
                className="p-4 rounded-full bg-[rgb(var(--foreground))]/5 hover:bg-[rgb(var(--foreground))]/10 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                variants={fadeInUp}
              >
                <span className="sr-only">Email</span>
                <Mail className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}