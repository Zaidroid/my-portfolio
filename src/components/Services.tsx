import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Printer, Code, Users, ArrowUpRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fadeInUp, fadeIn, fadeInRight, scaleUp, stagger } from '../utils/animationVariants';

// Enhanced services data with more details
const services = [
  {
    icon: <Box className="w-8 h-8" />,
    title: "3D Design",
    description: "Custom 3D modeling and design services for prototyping, product development, and creative projects.",
    detailedDescription: "Our 3D design services provide comprehensive solutions for product visualization, prototype development, and creative digital assets. We specialize in creating detailed, realistic models optimized for various applications including manufacturing, architectural visualization, and digital media. Our team works closely with clients to transform concepts into tangible 3D assets that meet specific project requirements.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2670&auto=format&fit=crop",
    tags: ["3D Modeling", "Prototyping", "Product Design"],
    price: "$50/hour",
    benefits: ["Rapid prototyping", "Photorealistic renders", "Manufacturing-ready files"],
    process: "We follow a structured design process starting with concept sketches, moving to basic 3D wireframes, and culminating in detailed models with textures and materials."
  },
  {
    icon: <Printer className="w-8 h-8" />,
    title: "3D Print On-Demand",
    description: "High-quality 3D printing services for rapid prototyping and production, tailored to your specifications.",
    detailedDescription: "Our 3D printing service offers end-to-end solutions for turning digital designs into physical objects. We utilize a range of materials and printing technologies to achieve optimal results for different applications. From PLA and ABS to more specialized materials like nylon, TPU, and resin, we can accommodate various project requirements. Our team handles post-processing tasks including sanding, painting, and assembly to deliver finished products ready for use.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2670&auto=format&fit=crop",
    tags: ["FDM", "SLA", "Multi-material"],
    price: "$60/hour",
    benefits: ["Quick turnaround", "Multiple material options", "Professional finishing"],
    process: "We analyze your design for printability, optimize it for the chosen printer and material, handle the printing process, and perform necessary post-processing."
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Full-Stack Development",
    description: "End-to-end web development solutions, from frontend to backend, ensuring seamless performance and scalability.",
    detailedDescription: "Our full-stack development services cover the entire web application lifecycle. We create responsive, user-friendly frontends using modern frameworks like React, Vue, and Angular, while building robust backends with Node.js, Python, or PHP. Our solutions emphasize clean code, performance optimization, and security best practices. We specialize in building scalable applications that can grow with your business needs, from simple websites to complex enterprise systems.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    tags: ["React", "Node.js", "API Development"],
    price: "$45/hour",
    benefits: ["Responsive design", "Performance optimization", "Scalable architecture"],
    process: "We follow agile development methodologies with iterative cycles of planning, development, testing, and deployment to ensure high-quality deliverables."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Trainings/Workshops",
    description: "Hands-on training and workshops on 3D printing, software development, and emerging technologies.",
    detailedDescription: "Our training programs are designed to equip participants with practical skills in 3D technologies and software development. Whether you're looking for corporate training or individual skill development, we offer customized workshops that blend theoretical knowledge with hands-on practice. Each session is led by industry experts with extensive experience in their respective fields. We provide comprehensive learning materials and follow-up resources to ensure participants can apply their new skills effectively.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop",
    tags: ["Hands-on", "Skill Development", "Expert-led"],
    price: "$80/hour",
    benefits: ["Practical exercises", "Ongoing support", "Custom curriculum"],
    process: "We assess your specific learning needs, develop a tailored curriculum, deliver engaging training sessions, and provide resources for continued learning."
  }
];

// Modal overlay animation variants
const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.215, 0.61, 0.355, 1], // Consistent easing
    }
  }
};

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isVisible, setIsVisible] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const handleServiceClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedService(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedService(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="services" className="py-32 px-6 relative">
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            custom={1}
            className="section-heading text-3xl md:text-4xl font-bold drop-shadow-md mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400">
              Services
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="section-text max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
          >
            Specialized services tailored to help bring your digital ideas to life.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              custom={index}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl bg-white/5 dark:bg-black/5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-teal-500/20 dark:hover:shadow-cyan-400/30 transition-all duration-300 h-[420px] cursor-pointer"
              onClick={(e) => handleServiceClick(index, e)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-indigo-50 to-teal-50 dark:from-indigo-900/20 dark:to-teal-900/20">
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
                      width="600"
                      height="400"
                      loading="lazy"
                    />
                  )}
                </div>
                
                {/* Title overlay with glass effect */}
                <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="text-white bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 p-2 rounded-full">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-medium text-white drop-shadow-lg">{service.title}</h3>
                  </div>
                </div>
                
                {/* Bottom section with price */}
                <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm p-4 bg-gradient-to-t from-black/90 to-black/50">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-white font-semibold">{service.price}</span>
                  </div>
                </div>
                
                {/* Hover overlay with more info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <div className="flex justify-end mb-4">
                        <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-teal-500/30 dark:hover:bg-cyan-400/30 transition-colors">
                          <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      <p className="text-white/90 line-clamp-4 mb-4">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{service.price}</span>
                        <span className="text-white/70 text-sm">Click for details</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Highlight border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 border-teal-500/50 dark:border-cyan-400/50"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Service Detail Overlay with Modal */}
      <AnimatePresence>
        {expandedService !== null && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            {/* Backdrop with blur effect and gradient */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-teal-900/80 dark:from-cyan-900/80 dark:to-teal-900/80 backdrop-blur-md"
              onClick={handleCloseClick}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-teal-500/20 dark:from-cyan-400/20 dark:to-teal-400/20 blur-[100px]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            
            {/* Content container with glassmorphism */}
            <motion.div 
              className="relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-500/20 dark:border-cyan-400/20"
              variants={scaleUp}
              custom={0}
              transition={{ ease: [0.215, 0.61, 0.355, 1] }}
            >
              {/* Close button - top right with glass effect */}
              <button
                onClick={handleCloseClick}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md hover:bg-teal-500/30 dark:hover:bg-cyan-400/30 transition-colors z-20 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="Close service details"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
              </button>
              
              {/* Service content */}
              {expandedService !== null && (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                      <motion.div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400">
                          {services[expandedService].icon}
                        </div>
                        <motion.h2 
                          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400"
                          variants={fadeInUp}
                          id="service-modal-title"
                        >
                          {services[expandedService].title}
                        </motion.h2>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center mb-6"
                        variants={fadeInUp}
                      >
                        <span className="text-lg font-semibold text-indigo-600 dark:text-cyan-400">
                          {services[expandedService].price}
                        </span>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-4 text-gray-700 dark:text-gray-200"
                        variants={fadeIn}
                      >
                        <p className="text-base md:text-lg font-medium">{services[expandedService].description}</p>
                        <p className="text-sm md:text-base">{services[expandedService].detailedDescription}</p>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-wrap gap-2 my-6"
                        variants={fadeInUp}
                      >
                        {services[expandedService].tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 dark:bg-gray-800/20 rounded-full text-xs sm:text-sm text-gray-700 dark:text-gray-200 backdrop-blur-md hover:bg-teal-500/20 dark:hover:bg-cyan-400/20 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                      
                      {/* Benefits section */}
                      <motion.div 
                        className="mt-8"
                        variants={fadeInUp}
                      >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Key Benefits</h3>
                        <ul className="space-y-2">
                          {services[expandedService].benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-teal-500 dark:text-cyan-400 mr-2">•</span>
                              <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      {/* Process section */}
                      <motion.div 
                        className="mt-8"
                        variants={fadeInUp}
                      >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Our Process</h3>
                        <p className="text-gray-700 dark:text-gray-300">{services[expandedService].process}</p>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-wrap gap-4 mt-8"
                        variants={fadeInRight}
                      >
                        <a
                          href="#contact"
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 dark:hover:from-teal-400 dark:hover:to-cyan-400 rounded-lg text-white transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:outline-none relative overflow-hidden group"
                        >
                          <span className="relative z-10">Get Started</span>
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={{ x: '100%' }}
                            whileHover={{ x: '0%' }}
                            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                          />
                          <ArrowUpRight className="w-5 h-5 relative z-10" />
                        </a>
                        
                        <a
                          href="#contact"
                          className="flex items-center space-x-2 px-4 py-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md hover:bg-teal-500/30 dark:hover:bg-cyan-400/30 rounded-lg text-gray-700 dark:text-white transition-colors focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        >
                          <span>Request Quote</span>
                        </a>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="lg:w-1/2 rounded-xl overflow-hidden border border-teal-500/20 dark:border-cyan-400/20 shadow-md"
                      variants={scaleUp}
                      custom={1}
                      transition={{ ease: [0.215, 0.61, 0.355, 1] }}
                    >
                      <div className="w-full h-64 md:h-80 overflow-hidden group">
                        {services[expandedService].image ? (
                          <img 
                            src={services[expandedService].image}
                            alt={services[expandedService].title}
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            width="800"
                            height="600"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-100 dark:from-indigo-900/30 dark:to-teal-900/30">
                            <div className="text-6xl text-indigo-600 dark:text-cyan-400">
                              {services[expandedService].icon}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Service stats or additional info */}
                      <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Service Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Starting at</p>
                            <p className="text-lg font-semibold text-indigo-600 dark:text-cyan-400">{services[expandedService].price}</p>
                          </div>
                          <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Expertise Level</p>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">Expert</p>
                          </div>
                          <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Turnaround</p>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">1-3 Days</p>
                          </div>
                          <div className="bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Satisfaction</p>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">100% Guaranteed</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
