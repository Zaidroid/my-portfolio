import { Variants } from 'framer-motion';

// Fade in and move up animation with custom physics
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: custom * 0.1,
      duration: 0.7,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  }),
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Elastic pop animation
export const elasticPop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: [0.6, 1.1, 0.9, 1.03, 0.97, 1],
    transition: {
      delay: custom * 0.1,
      duration: 0.8,
      times: [0, 0.4, 0.6, 0.8, 0.9, 1],
    },
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 400,
    },
  },
};

// Text reveal animation
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
    clipPath: 'inset(0 0 100% 0)',
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(0 0 0 0)',
    transition: {
      delay: custom * 0.1,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

// Enhanced fade in animation with subtle transform
export const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  hover: {
    opacity: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

// Fade in and move from right animation with elastic effect
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: 'blur(5px)' },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      delay: custom * 0.1,
      duration: 0.8,
      type: 'spring',
      damping: 27,
      stiffness: 450,
    },
  }),
  hover: {
    x: 5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Scale animation with bounce effect
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(8px)' },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: custom * 0.1,
      duration: 0.7,
      type: 'spring',
      damping: 15,
      stiffness: 400,
    },
  }),
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 500,
    },
  },
};

// Stagger animation for groups of elements
export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      staggerDirection: 1,
    },
  },
};
