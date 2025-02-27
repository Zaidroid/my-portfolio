// src/utils/animationVariants.ts

// Stagger animation for groups of elements
export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Fade in and move up animation
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Fade in and move from right animation
export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 20 
  },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Fade in animation with no movement
export const fadeIn = {
  hidden: { 
    opacity: 0
  },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.5
    }
  })
};

// Scale animation
export const scaleUp = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: [0.6, 0.05, -0.01, 0.9]
    }
  })
};
