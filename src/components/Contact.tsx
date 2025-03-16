import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Instagram, Linkedin, Mail, ArrowRight, ChevronDown, Send } from 'lucide-react';
import { fadeInUp, fadeIn, stagger } from '../utils/animationVariants';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [formOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen(prev => !prev);
  };

  const formVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      y: -20,
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      y: 0,
      transition: {
        height: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        },
        opacity: { duration: 0.4 },
        y: {
          type: 'spring',
          stiffness: 500,
          damping: 25,
        },
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(3px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25,
      }
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      {/* Subtle gradient blobs for cohesion */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-600/20 to-teal-500/20 blur-[120px]" />
        <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full bg-gradient-to-r from-teal-500/15 to-cyan-500/15 blur-[120px]" />
      </motion.div>

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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400">
              Let's work together
            </span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="section-subheading mx-auto mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={3}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Send me an email</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                />
                <motion.div
                  className="relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.a>

              <motion.button
                onClick={toggleForm}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Contact form</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: formOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>

            <AnimatePresence>
              {formOpen && (
                <motion.div
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full max-w-lg rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl overflow-hidden mt-6 border border-teal-500/20 dark:border-cyan-400/20"
                >
                  <div className="p-6">
                    <motion.h3 
                      variants={inputVariants} 
                      className="text-xl font-semibold mb-4 text-left text-gray-800 dark:text-gray-200"
                    >
                      Send me a message
                    </motion.h3>
                    <form className="space-y-4 text-left">
                      <motion.div variants={inputVariants}>
                        <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          placeholder="Your name"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 dark:focus:ring-cyan-400 focus:border-transparent bg-white dark:bg-gray-800 backdrop-blur-sm"
                        />
                      </motion.div>

                      <motion.div variants={inputVariants}>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 dark:focus:ring-cyan-400 focus:border-transparent bg-white dark:bg-gray-800 backdrop-blur-sm"
                        />
                      </motion.div>

                      <motion.div variants={inputVariants}>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Subject</label>
                        <input 
                          type="text" 
                          id="subject" 
                          placeholder="What's this regarding?"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 dark:focus:ring-cyan-400 focus:border-transparent bg-white dark:bg-gray-800 backdrop-blur-sm"
                        />
                      </motion.div>

                      <motion.div variants={inputVariants}>
                        <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Message</label>
                        <textarea 
                          id="message" 
                          rows={4}
                          placeholder="Tell me about your project or inquiry..."
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 dark:focus:ring-cyan-400 focus:border-transparent bg-white dark:bg-gray-800 backdrop-blur-sm resize-none"
                        />
                      </motion.div>

                      <motion.button
                        variants={inputVariants}
                        whileHover={{
                          scale: 1.03,
                          transition: { duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }
                        }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                      >
                        <span>Submit</span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={{ x: '100%' }}
                          whileHover={{ x: '0%' }}
                          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                        />
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              className="flex justify-center gap-6 mt-8"
              variants={stagger}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {[
                { href: "https://instagram.com", icon: <Instagram className="w-6 h-6" />, label: "Instagram" },
                { href: "https://linkedin.com", icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn" },
                { href: "mailto:hello@example.com", icon: <Mail className="w-6 h-6" />, label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-white/10 dark:bg-gray-800/10 hover:bg-teal-500/20 dark:hover:bg-cyan-400/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 15 : -15 }}
                  whileTap={{ scale: 0.9 }}
                  variants={fadeInUp}
                >
                  <span className="sr-only">{social.label}</span>
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
