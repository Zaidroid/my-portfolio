// src/components/Header.tsx (updated)
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 bg-[rgb(var(--background))]/90 backdrop-blur-lg shadow-md' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <a href="#" className="text-xl font-medium">Zaid<span className="text-purple-600 dark:text-blue-500">Lab</span></a>
            </motion.div>
            
            <motion.button 
              className="md:hidden p-2 rounded-full hover:bg-[rgb(var(--foreground))]/5"
              onClick={() => setIsMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
            
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-8">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="nav-link text-base"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.1 + index * 0.1,
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <motion.button
                className="p-2 rounded-full bg-[rgb(var(--foreground))]/5 hover:bg-[rgb(var(--foreground))]/10 transition-colors duration-300"
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isDarkMode ? 
                  <Sun className="w-5 h-5 text-yellow-400" /> : 
                  <Moon className="w-5 h-5 text-purple-600" />
                }
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - with improved animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 bg-[rgb(var(--background))]/95 backdrop-blur-lg z-50 flex flex-col justify-center items-center"
          >
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full bg-[rgb(var(--foreground))]/5"
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.nav
              className="flex flex-col items-center space-y-10"
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
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-3xl nav-link relative"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                className="mt-10 p-3 rounded-full bg-[rgb(var(--foreground))]/5"
                onClick={() => {
                  toggleDarkMode();
                  setIsMobileMenuOpen(false);
                }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
                }}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? 
                  <Sun className="w-6 h-6 text-yellow-400" /> : 
                  <Moon className="w-6 h-6 text-purple-600" />
                }
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
