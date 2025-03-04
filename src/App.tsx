import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Initialize to true

  useEffect(() => {
    // Apply dark mode on initial load
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [isDarkMode]); // Add isDarkMode as a dependency

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} relative`}>
      {/* Global animated background */}
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
