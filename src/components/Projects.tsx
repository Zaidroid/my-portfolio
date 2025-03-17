import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Calendar, MapPin, Code, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fadeInUp, elasticPop, fadeIn, fadeInRight, scaleUp, stagger } from '../utils/animationVariants';

// Project data
const projects = [
  {
    title: "PalTraffic",
    description: "Real-time traffic monitoring and navigation system for Palestine regions with live updates and route optimization.",
    detailedDescription: "PalTraffic provides comprehensive real-time traffic data across Palestine, including route optimization, incident reporting, and alternative path suggestions. The system integrates with various data sources to offer the most accurate traffic conditions, helping users navigate efficiently while avoiding congestion and roadblocks. Users can contribute to traffic updates through a community-driven reporting system, making it a collaborative tool for better mobility.",
    image: "https://images.unsplash.com/photo-1612966808160-87a819e0af82?q=80&w=2487&auto=format&fit=crop",
    url: "https://traffic.zaidlab.xyz",
    tags: ["React", "Node.js", "Maps API"],
    date: "2024",
    location: "Palestine",
    githubUrl: "https://github.com/zaidlab/paltraffic"
  },
  {
    title: "TimeTravel",
    description: "Interactive historical timeline exploration platform showcasing Palestinian history with immersive storytelling and archival content.",
    detailedDescription: "TimeTravel is an immersive digital platform that chronicles Palestinian history through interactive timelines, archival footage, and personal narratives. The project incorporates WebGL-powered visualizations to create an engaging storytelling experience, allowing users to navigate through different historical periods and explore cultural, political, and social developments. Each timeline entry links to comprehensive resources including historical documents, photographs, and oral histories.",
    image: "https://images.unsplash.com/photo-1565343486806-9d939d24a993?w=500&auto=format&fit=crop",
    url: "https://timetravel.zaidlab.xyz",
    tags: ["Vue.js", "WebGL", "Animation"],
    date: "2023",
    location: "Digital Archive",
    githubUrl: "https://github.com/zaidlab/timetravel"
  },
  {
    title: "Health Tracker",
    description: "Personal health and wellness monitoring dashboard tailored for regional health metrics and community wellness initiatives.",
    detailedDescription: "Health Tracker combines personal health monitoring with community wellness initiatives specifically designed for regional health needs. Users can track their vital statistics, medication schedules, and fitness goals while contributing anonymized data to community health metrics. The dashboard provides visualizations of both personal progress and community health trends, helping to identify local health patterns and needs. The system also integrates with regional healthcare providers for streamlined communication and appointment scheduling.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2487&auto=format&fit=crop",
    url: "https://health.zaidlab.xyz",
    tags: ["React", "D3.js", "API"],
    date: "2023",
    location: "Public Health Initiative",
    githubUrl: "https://github.com/zaidlab/healthtracker"
  },
  {
    title: "Palestine Historical Data",
    description: "Interactive infographic showcasing historical data in numbers with comprehensive timelines, demographic changes, and cultural heritage mapping.",
    detailedDescription: "Palestine Historical Data is a comprehensive digital repository presenting historical information through interactive infographics, data visualizations, and geographical mapping. The project documents demographic changes, cultural heritage sites, and historical events using a combination of archival records, statistical data, and geographical information. Users can explore population trends, cultural landmarks, and territorial changes across different time periods through animated visualizations that make complex historical data accessible and engaging.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    tags: ["Data Visualization", "SVG", "Animation"],
    date: "2022",
    location: "Historical Archives",
    githubUrl: "https://github.com/zaidlab/palestine-data"
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

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const handleProjectClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedProject(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedProject(null);
    document.body.style.overflow = '';
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <section id="work" className="py-28 md:py-36 px-4 md:px-6 lg:px-8 relative">
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h2 className="section-heading text-3xl md:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400">
              Recent Projects
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my recent work showcasing interactive experiences and data-driven applications
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              custom={index}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl bg-white/5 dark:bg-black/5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-teal-500/20 dark:hover:shadow-cyan-400/30 transition-all duration-300 h-[420px] cursor-pointer"
              onClick={(e) => handleProjectClick(index, e)}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="h-full w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width="600"
                    height="400"
                    loading="lazy"
                  />
                </div>
                
                {/* Title overlay with glass effect */}
                <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                  <h3 className="text-xl font-medium text-white drop-shadow-lg">{project.title}</h3>
                </div>
                
                {/* Bottom section with tags */}
                <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm p-4 bg-gradient-to-t from-black/90 to-black/50">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Hover overlay with more info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <div className="flex justify-end mb-4">
                        {/* Action icons */}
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-teal-500/30 dark:hover:bg-cyan-400/30 transition-colors focus:ring-2 focus:ring-teal-500 focus:outline-none"
                              onClick={handleLinkClick}
                              aria-label="View source code"
                            >
                              <Code className="w-5 h-5 text-white" />
                            </a>
                          )}
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-teal-500/30 dark:hover:bg-cyan-400/30 transition-colors focus:ring-2 focus:ring-teal-500 focus:outline-none"
                              onClick={handleLinkClick}
                              aria-label="Visit project website"
                            >
                              <ArrowUpRight className="w-5 h-5 text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Project metadata */}
                      <div className="flex items-center text-white/80 space-x-4 mb-3">
                        {project.date && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{project.date}</span>
                          </div>
                        )}
                        {project.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{project.location}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-white/90 line-clamp-4">
                        {project.description}
                      </p>
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
      
      {/* Project Detail Overlay with Modal */}
      <AnimatePresence>
        {expandedProject !== null && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
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
                aria-label="Close project details"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
              </button>
              
              {/* Project content */}
              {expandedProject !== null && (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                      <motion.h2 
                        className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400"
                        variants={fadeInUp}
                        id="project-modal-title"
                      >
                        {projects[expandedProject].title}
                      </motion.h2>
                      
                      <motion.div 
                        className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 space-x-4 mb-6"
                        variants={fadeInUp}
                      >
                        {projects[expandedProject].date && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">{projects[expandedProject].date}</span>
                          </div>
                        )}
                        {projects[expandedProject].location && (
                          <div className="flex items-center space-x-1 ml-2 first:ml-0">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">{projects[expandedProject].location}</span>
                          </div>
                        )}
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-4 text-gray-700 dark:text-gray-200"
                        variants={fadeIn}
                      >
                        <p className="text-base md:text-lg font-medium">{projects[expandedProject].description}</p>
                        <p className="text-sm md:text-base">{projects[expandedProject].detailedDescription}</p>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-wrap gap-2 my-6"
                        variants={fadeInUp}
                      >
                        {projects[expandedProject].tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white/10 dark:bg-gray-800/20 rounded-full text-xs sm:text-sm text-gray-700 dark:text-gray-200 backdrop-blur-md hover:bg-teal-500/20 dark:hover:bg-cyan-400/20 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-wrap gap-4 mt-8"
                        variants={fadeInRight}
                      >
                        {projects[expandedProject].githubUrl && (
                          <a
                            href={projects[expandedProject].githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md hover:bg-teal-500/30 dark:hover:bg-cyan-400/30 rounded-lg text-gray-700 dark:text-white transition-colors focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            onClick={handleLinkClick}
                          >
                            <Code className="w-5 h-5" />
                            <span>View Code</span>
                          </a>
                        )}
                        {projects[expandedProject].url && (
                          <a
                            href={projects[expandedProject].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 dark:hover:from-teal-400 dark:hover:to-cyan-400 rounded-lg text-white transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:outline-none relative overflow-hidden group"
                            onClick={handleLinkClick}
                          >
                            <span className="relative z-10">Visit Project</span>
                            <motion.span
                              className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              initial={{ x: '100%' }}
                              whileHover={{ x: '0%' }}
                              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                            />
                            <ArrowUpRight className="w-5 h-5 relative z-10" />
                          </a>
                        )}
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="lg:w-1/2 rounded-xl overflow-hidden border border-teal-500/20 dark:border-cyan-400/20 shadow-md"
                      variants={scaleUp}
                      custom={1}
                      transition={{ ease: [0.215, 0.61, 0.355, 1] }}
                    >
                      <div className="w-full h-64 md:h-80 overflow-hidden group">
                        <img 
                          src={projects[expandedProject].image}
                          alt={projects[expandedProject].title}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          width="800"
                          height="600"
                        />
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
