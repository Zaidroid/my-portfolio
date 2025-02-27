// src/components/AnimatedBackground.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate animated particles on client-side to avoid hydration issues
    const generatedParticles = [...Array(20)].map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.05
    }));
    
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gradient blobs with improved colors and animations */}
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-500/10 dark:bg-blue-500/15 blur-3xl"
        animate={{ 
          x: [0, 60, -20, 0],
          y: [0, 40, 10, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-purple-500/15 blur-3xl"
        animate={{ 
          x: [0, -40, 20, 0],
          y: [0, 60, 30, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{ 
          duration: 28,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
      
      {/* Additional mid-sized gradient blob for visual interest */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-indigo-500/10 dark:bg-indigo-400/15 blur-3xl"
        animate={{ 
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
      
      {/* Particles with improved performance */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500 to-blue-500 dark:from-blue-400 dark:to-purple-400"
          style={{
            width: particle.size,
            height: particle.size,
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: particle.opacity,
            willChange: "transform" // Performance optimization
          }}
          animate={{
            x: [
              `${particle.x}vw`, 
              `${(particle.x + (Math.random() * 15 - 7.5)) % 100}vw`,
              `${particle.x}vw`
            ],
            y: [
              `${particle.y}vh`, 
              `${(particle.y + (Math.random() * 15 - 7.5)) % 100}vh`,
              `${particle.y}vh`
            ],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  );
}
