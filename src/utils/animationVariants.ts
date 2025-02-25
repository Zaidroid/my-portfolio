// src/utils/animationVariants.ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.15,
      ease: [0.215, 0.61, 0.355, 1] // Cubic bezier for smooth feel
    }
  })
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scale = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: (custom: number = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.15,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.15,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.15,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};
