import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Helper functions
function getDistance(particleX, particleY, mouseX, mouseY) {
  const dx = particleX - mouseX;
  const dy = particleY - mouseY;
  return Math.sqrt(dx * dx + dy * dy);
}

function getAttractionStrength(distance) {
  const maxDistance = 25; // Attraction range in %
  return distance > maxDistance ? 0 : (1 - distance / maxDistance) * 0.8;
}

// Particle component
function Particle({
  initialPosition,
  size,
  color,
  vx,
  vy,
  frequency,
  amplitude,
  mousePosition,
}) {
  // Use springs for smooth position transitions
  const springX = useSpring(initialPosition.x, { stiffness: 100, damping: 20 });
  const springY = useSpring(initialPosition.y, { stiffness: 100, damping: 20 });

  // Transform spring values to percentage strings for CSS
  const left = useTransform(springX, (value) => `${value}%`);
  const top = useTransform(springY, (value) => `${value}%`);

  const mousePosRef = useRef(mousePosition);

  // Update mouse position reference
  useEffect(() => {
    mousePosRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    let totalTime = 0;
    let lastTime = performance.now();
    let animationFrameId;

    const updatePosition = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 1000; // Time in seconds
      lastTime = currentTime;
      totalTime += deltaTime;

      // Calculate base position (natural drift and wave)
      let baseX = initialPosition.x + vx * totalTime;
      let baseY = initialPosition.y + vy * totalTime;
      const waveY = Math.sin((baseX / 100) * Math.PI * 2 * frequency) * amplitude;
      baseY += waveY;

      // Wrap positions to 0-100%
      baseX = (baseX % 100 + 100) % 100;
      baseY = (baseY % 100 + 100) % 100;

      // Calculate cursor attraction
      const mousePos = mousePosRef.current;
      const distance = getDistance(baseX, baseY, mousePos.x, mousePos.y);
      const attractionStrength = getAttractionStrength(distance);

      // Define target position (base + attraction offset)
      let targetX = baseX;
      let targetY = baseY;
      if (attractionStrength > 0) {
        targetX += (mousePos.x - baseX) * attractionStrength;
        targetY += (mousePos.y - baseY) * attractionStrength;
      }

      // Update spring targets
      springX.set(targetX);
      springY.set(targetY);

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [springX, springY, vx, vy, frequency, amplitude, initialPosition.x, initialPosition.y]);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left,
        top,
        backgroundColor: color,
        filter: 'blur(1px)',
      }}
    />
  );
}

// AnimatedBackground component
export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    setParticles(generateParticles(25));
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let clientX, clientY;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (clientX !== undefined && clientY !== undefined) {
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  const generateParticles = (count) => {
    const colors = [
      'rgba(79, 70, 229, 0.3)',  // indigo-600
      'rgba(45, 212, 191, 0.3)', // teal-500
      'rgba(37, 99, 235, 0.3)',  // blue-600
      'rgba(6, 182, 212, 0.3)',  // cyan-500
      'rgba(59, 130, 246, 0.3)', // blue-400
      'rgba(20, 184, 166, 0.3)', // teal-400
      'rgba(99, 102, 241, 0.3)', // indigo-400
      'rgba(34, 211, 238, 0.3)', // cyan-400
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      initialPosition: { x: Math.random() * 100, y: Math.random() * 100 },
      size: 5 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: 0.2 + Math.random() * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      frequency: 1 + Math.random() * 2,
      amplitude: 5 + Math.random() * 10,
    }));
  };

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[80rem] h-[80rem] rounded-full bg-gradient-to-r from-indigo-600/20 via-cyan-500/20 to-teal-500/20 blur-[150px]"
        animate={{
          x: '-50%',
          y: '-50%',
          translateX: `${(mousePosition.x - 50) * 0.05}%`,
          translateY: `${(mousePosition.y - 50) * 0.05}%`,
          rotate: [0, 360],
        }}
        transition={{
          translateX: { duration: 2, ease: 'easeOut' },
          translateY: { duration: 2, ease: 'easeOut' },
          rotate: { duration: 120, ease: 'linear', repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] rounded-full bg-gradient-to-r from-teal-500/15 via-blue-500/15 to-indigo-600/15 blur-[120px]"
        animate={{
          x: '-50%',
          y: '-50%',
          translateX: `${(mousePosition.x - 50) * -0.03}%`,
          translateY: `${(mousePosition.y - 50) * -0.03}%`,
          rotate: [0, -360],
        }}
        transition={{
          translateX: { duration: 3, ease: 'easeOut' },
          translateY: { duration: 3, ease: 'easeOut' },
          rotate: { duration: 180, ease: 'linear', repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute w-[20rem] h-[20rem] rounded-full bg-cyan-300/10 blur-[80px]"
        animate={{
          left: `calc(${mousePosition.x}% - 10rem)`,
          top: `calc(${mousePosition.y}% - 10rem)`,
          scale: [1, 1.05, 1],
        }}
        transition={{
          left: { duration: 0.5, ease: 'easeOut' },
          top: { duration: 0.5, ease: 'easeOut' },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          initialPosition={particle.initialPosition}
          size={particle.size}
          color={particle.color}
          vx={particle.vx}
          vy={particle.vy}
          frequency={particle.frequency}
          amplitude={particle.amplitude}
          mousePosition={mousePosition}
        />
      ))}
    </div>
  );
}
