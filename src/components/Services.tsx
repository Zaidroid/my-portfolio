import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Printer, Code, Users, ArrowUpRight, X, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fadeInUp, fadeIn, fadeInRight, scaleUp, stagger } from '../utils/animationVariants';

// Enhanced services data with more details
const services = [
  {
    icon: <Box className="w-8 h-8" />,
    title: "3D Design",
    description: "Custom 3D modeling and design for prototyping, product development, and creative projects.",
    detailedDescription: "We create detailed, realistic models for product visualization, prototyping & digital assets—optimized for manufacturing, architecture & digital media.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2670&auto=format&fit=crop",
    tags: ["3D Modeling", "Prototyping", "Product Design"],
    price: "$50/hour",
    benefits: ["Rapid prototyping", "Photorealistic renders", "Manufacturing-ready files"],
    process: "We follow a structured design process starting with concept sketches, moving to basic 3D wireframes, and culminating in detailed models with textures and materials."
  },
  {
    icon: <Printer className="w-8 h-8" />,
    title: "3D Print On-Demand",
    description: "High-quality 3D printing for prototyping and production, customized to your needs.",
    detailedDescription: "Our 3D printing service transforms digital designs into physical objects. Upload your STL file for an instant time and cost estimate. We use various materials and printing technologies for optimal results.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2670&auto=format&fit=crop",
    tags: ["FDM", "SLA", "Multi-material"],
    price: "$60/hour",
    benefits: ["Quick turnaround", "Multiple material options", "Professional finishing"],
    process: "Upload your STL, we analyze it for printability, optimize it for the chosen printer and material, then handle printing and post-processing."
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Full-Stack Development",
    description: "End-to-end web development solutions, ensuring seamless performance and scalability.",
    detailedDescription: "Our full-stack development services cover the entire web application lifecycle. We create responsive, user-friendly frontends using modern frameworks like React, Vue, and Angular, while building robust backends with Node.js, Python, or PHP.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    tags: ["React", "Node.js", "API Development"],
    price: "$45/hour",
    benefits: ["Responsive design", "Performance optimization", "Scalable architecture"],
    process: "We follow agile development methodologies with iterative cycles of planning, development, testing, and deployment."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Trainings/Workshops",
    description: "Hands-on workshops in 3D printing, software development, and emerging technologies.",
    detailedDescription: "We provide practical training tailored for individuals and teams, combining theory with hands-on experience in 3D tech and software development.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop",
    tags: ["Hands-on", "Skill Development", "Expert-led"],
    price: "$80/hour",
    benefits: ["Practical exercises", "Ongoing support", "Custom curriculum"],
    process: "We assess your learning needs, develop a tailored curriculum, deliver engaging sessions, and provide resources for continued learning."
  }
];

// Modal overlay animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: [0.215, 0.61, 0.355, 1] } }
};

// Modal content animation variants
const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4, 
      ease: [0.215, 0.61, 0.355, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { 
      duration: 0.25, 
      ease: [0.215, 0.61, 0.355, 1] 
    } 
  }
};

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isVisible, setIsVisible] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [stlFile, setStlFile] = useState<File | null>(null);
  const [printEstimate, setPrintEstimate] = useState<{ time: string; cost: number } | null>(null);

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  const handleServiceClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedService(index);
    setStlFile(null); // Reset file and estimate on new modal open
    setPrintEstimate(null);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedService(null);
    document.body.style.overflow = '';
  };

  // Basic STL analysis function (simplified for demo purposes)
  const analyzeSTL = (file: File) => {
    // This is a mock analysis - in a real app, you'd parse the STL file
    // For simplicity, we'll estimate based on file size
    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
    const printTimeHours = Math.max(1, Math.round(fileSizeMB * 2)); // 2 hours per MB, min 1 hour
    const cost = Math.round(fileSizeMB * 20 + 10); // $20 per MB + $10 base

    setPrintEstimate({
      time: `${printTimeHours} hour${printTimeHours > 1 ? 's' : ''}`,
      cost,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.stl')) {
      setStlFile(file);
      analyzeSTL(file);
    } else {
      alert('Please upload a valid .stl file');
    }
  };

  return (
    <section id="services" className="py-32 px-6 relative">
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
                
                <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="text-white bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 p-2 rounded-full">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-medium text-white drop-shadow-lg">{service.title}</h3>
                  </div>
                </div>
                
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
              
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 border-teal-500/50 dark:border-cyan-400/50"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {expandedService !== null && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={handleCloseClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-teal-900/80 dark:from-cyan-900/80 dark:to-teal-900/80 backdrop-blur-md">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-teal-500/20 dark:from-cyan-400/20 dark:to-teal-400/20 blur-[100px]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            
            <motion.div 
              className="relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-teal-500/20 dark:border-cyan-400/20"
              variants={modalContentVariants}
              onClick={e => e.stopPropagation()}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ height: 'auto', maxHeight: '85vh' }}
            >
              <button
                onClick={handleCloseClick}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md hover:bg-teal-500/30 dark:hover:bg-cyan-400/30 transition-colors z-20 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                aria-label="Close service details"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
              </button>
              
              {expandedService !== null && (
                <div className="flex flex-col h-full">
                  <div className="p-6 md:p-8 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 2rem)' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                      {/* Left column - Service info */}
                      <div className="lg:col-span-6 flex flex-col">
                        <motion.div className="flex items-center gap-4 mb-4" variants={fadeInUp}>
                          <div className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400">
                            {services[expandedService].icon}
                          </div>
                          <h2 
                            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400"
                            id="service-modal-title"
                          >
                            {services[expandedService].title}
                          </h2>
                        </motion.div>
                        
                        <motion.div variants={fadeIn} className="mb-4">
                          <span className="text-lg font-semibold text-indigo-600 dark:text-cyan-400">
                            {services[expandedService].price}
                          </span>
                        </motion.div>
                        
                        <motion.div variants={fadeIn} className="prose dark:prose-invert prose-sm md:prose-base max-w-none mb-6">
                          <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-200">{services[expandedService].description}</p>
                          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{services[expandedService].detailedDescription}</p>
                        </motion.div>
                        
                        {/* STL Upload Section for 3D Print On-Demand */}
                        {services[expandedService].title === "3D Print On-Demand" && (
                          <motion.div variants={fadeInUp} className="mb-6 p-4 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Quick Estimate</h3>
                            <div className="space-y-3">
                              <label 
                                htmlFor="stl-upload"
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 dark:hover:from-teal-400 dark:hover:to-cyan-400 rounded-lg text-white transition-all duration-300 cursor-pointer relative overflow-hidden group"
                              >
                                <span className="relative z-10">Upload STL File</span>
                                <Upload className="w-5 h-5 relative z-10" />
                                <motion.span
                                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  initial={{ x: '100%' }}
                                  whileHover={{ x: '0%' }}
                                  transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                                />
                              </label>
                              <input
                                id="stl-upload"
                                type="file"
                                accept=".stl"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                              {stlFile && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Uploaded: <span className="font-medium">{stlFile.name}</span>
                                </p>
                              )}
                              {printEstimate && (
                                <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm p-3 rounded-lg">
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Estimated Print Time: <span className="font-semibold">{printEstimate.time}</span>
                                  </p>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Estimated Cost: <span className="font-semibold">${printEstimate.cost}</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                        
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6">
                          {services[expandedService].tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 dark:bg-gray-800/20 rounded-full text-xs sm:text-sm text-gray-700 dark:text-gray-200 backdrop-blur-md hover:bg-teal-500/20 dark:hover:bg-cyan-400/20 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>
                        
                        <motion.div variants={fadeInUp} className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Key Benefits</h3>
                          <ul className="space-y-1">
                            {services[expandedService].benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-teal-500 dark:text-cyan-400 mr-2">•</span>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                        
                        <motion.div variants={fadeInUp} className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Our Process</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{services[expandedService].process}</p>
                        </motion.div>
                        
                        <motion.div variants={fadeInRight} className="flex flex-wrap gap-4 mt-auto">
                          <a
                            href="#contact"
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 dark:hover:from-teal-400 dark:hover:to-cyan-400 rounded-lg text-white transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:outline-none relative overflow-hidden group"
                          >
                            <span className="relative z-10">Get Started</span>
                            <ArrowUpRight className="w-5 h-5 relative z-10" />
                            <motion.span
                              className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={{ x: '100%' }}
                              whileHover={{ x: '0%' }}
                              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                            />
                          </a>
                          
                          <a
                            href="#contact"
                            className="flex items-center space-x-2 px-4 py-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md hover:bg-teal-500/30 dark:hover:bg-cyan-400/30 rounded-lg text-gray-700 dark:text-white transition-colors focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          >
                            <span>Request Quote</span>
                          </a>
                        </motion.div>
                      </div>
                      
                      {/* Right column - Image and service details */}
                      <div className="lg:col-span-6">
                        <motion.div 
                          variants={scaleUp}
                          className="overflow-hidden rounded-xl border border-teal-500/20 dark:border-cyan-400/20 shadow-md h-full flex flex-col"
                        >
                          <div className="aspect-w-16 aspect-h-9 overflow-hidden group">
                            {services[expandedService].image ? (
                              <img 
                                src={services[expandedService].image}
                                alt={services[expandedService].title}
                                className="w-full h-48 md:h-64 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-48 md:h-64 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-100 dark:from-indigo-900/30 dark:to-teal-900/30">
                                <div className="text-5xl text-indigo-600 dark:text-cyan-400">
                                  {services[expandedService].icon}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex-grow">
                            <h4 className="text-base font-medium text-gray-800 dark:text-white mb-3">Service Details</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white/30 dark:bg-gray-700/30 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Starting at</p>
                                <p className="text-sm font-semibold text-indigo-600 dark:text-cyan-400">{services[expandedService].price}</p>
                              </div>
                              <div className="bg-white/30 dark:bg-gray-700/30 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Expertise Level</p>
                                <p className="text-sm font-semibold text-gray-800 dark:text-white">Expert</p>
                              </div>
                              <div className="bg-white/30 dark:bg-gray-700/30 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Turnaround</p>
                                <p className="text-sm font-semibold text-gray-800 dark:text-white">1-3 Days</p>
                              </div>
                              <div className="bg-white/30 dark:bg-gray-700/30 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Satisfaction</p>
                                <p className="text-sm font-semibold text-gray-800 dark:text-white">100% Guaranteed</p>
                              </div>
                            </div>
                            
                            <div className="mt-4 bg-white/30 dark:bg-gray-700/30 p-3 rounded-lg">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Perfect For</p>
                              <p className="text-sm text-gray-800 dark:text-white">
                                {services[expandedService].title === "3D Design" && "Businesses and individuals needing product visualization, architectural models, or digital assets"}
                                {services[expandedService].title === "3D Print On-Demand" && "Prototyping, small-scale production, custom parts, or creative projects"}
                                {services[expandedService].title === "Full-Stack Development" && "Startups, businesses, and organizations requiring custom web applications"}
                                {services[expandedService].title === "Trainings/Workshops" && "Teams and individuals looking to upskill in 3D technologies and software development"}
                              </p>
                            </div>
                            
                          </div>
                        </motion.div>
                      </div>
                    </div>
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
