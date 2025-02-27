// src/components/AnimatedBackground.tsx
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  // Generate animated particles consistently across the site
  const particles = [...Array(25)].map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated floating gradient blobs */}
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-500/10 dark:bg-blue-500/10 blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-purple-500/10 blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500 to-blue-500 dark:from-blue-500 dark:to-purple-500 opacity-20 dark:opacity-30"
          style={{
            width: particle.size,
            height: particle.size,
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
          }}
          animate={{
            x: [`${particle.x}vw`, `${(particle.x + 10) % 100}vw`],
            y: [`${particle.y}vh`, `${(particle.y + 15) % 100}vh`],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  );
}
