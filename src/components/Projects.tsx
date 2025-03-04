// src/components/Projects.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Calendar, MapPin, Code, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fadeInUp, scaleUp } from '../components/animationVariants';

// Enhanced project data
const projects = [
  {
    title: "PalTraffic",
    description: "Real-time traffic monitoring and navigation system for Palestine regions with live updates and route optimization.",
    detailedDescription: "PalTraffic provides comprehensive real-time traffic data across Palestine, including route optimization, incident reporting, and alternative path suggestions. The system integrates with various data sources to offer the most accurate traffic conditions, helping users navigate efficiently while avoiding congestion and roadblocks. Users can contribute to traffic updates through a community-driven reporting system, making it a collaborative tool for better mobility.",
    image: "https://images.unsplash.com/photo-1612966808160-87a819e0af82?q=80&w=2487&auto=format&fit=crop",
    url: "https://roads.zaidlab.xyz",
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

// Safe animation variants
const safeScaleUp = {
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
      ease: "easeOut"
    }
  })
};

// Overlay animation variants
const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Use state to track if projects should be visible
  const [isVisible, setIsVisible] = useState(false);
  
  // Track which project is expanded
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  
  useEffect(() => {
    // Once in view, keep visible
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Handle project card click
  const handleProjectClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedProject(index);
    // Prevent scrolling when overlay is open
    document.body.style.overflow = 'hidden';
  };

  // Handle close button click
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedProject(null);
    // Re-enable scrolling when overlay is closed
    document.body.style.overflow = '';
  };

  // Handle external link clicks
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <section id="work" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading drop-shadow-md inline-block text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400">
              Recent Projects
            </span>
          </h2>
        </div>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          ref={ref}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={index}
              className="group relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 shadow-md hover:shadow-xl transition-all duration-300 h-[420px]"
              onClick={(e) => handleProjectClick(index, e)}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="h-full w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Simple title overlay - Always visible */}
                <motion.div 
                  className="absolute top-0 left-0 p-6"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-medium text-white drop-shadow-lg">{project.title}</h3>
                </motion.div>
                
                {/* Bottom section with tags - always visible */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 bg-black/70 backdrop-blur-sm p-4 rounded-t-lg">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Hover overlay with more info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex justify-end mb-3">
                        {/* Action icons with stopPropagation */}
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors z-20"
                              onClick={handleLinkClick}
                            >
                              <Code className="w-5 h-5 text-white" />
                            </a>
                          )}
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors z-20"
                              onClick={handleLinkClick}
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
                      
                      <p className="text-white/90 mb-5">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Highlight border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-purple-500/50"></div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Project Detail Overlay */}
      <AnimatePresence>
        {expandedProject !== null && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
          >
            {/* Backdrop with blur effect */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={handleCloseClick}
            ></div>
            
            {/* Content container */}
            <motion.div 
              className="relative z-10 bg-gradient-to-b from-black/80 to-black/95 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
              variants={contentVariants}
            >
              {/* Close button - top right */}
              <button
                onClick={handleCloseClick}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors z-20"
                aria-label="Close project details"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              
              {/* Project content */}
              {expandedProject !== null && (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <motion.h2 
                        className="text-3xl font-bold text-white mb-4"
                        variants={fadeInUp}
                      >
                        {projects[expandedProject].title}
                      </motion.h2>
                      
                      <motion.div 
                        className="flex flex-wrap items-center text-white/80 space-x-2 mb-6"
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
                        className="text-white/90 mb-6 space-y-4"
                        variants={fadeInUp}
                      >
                        <p>{projects[expandedProject].description}</p>
                        <p className="text-sm sm:text-base">{projects[expandedProject].detailedDescription}</p>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-wrap gap-2 mb-8"
                        variants={fadeInUp}
                      >
                        {projects[expandedProject].tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white/90 hover:bg-purple-500/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-wrap gap-4"
                        variants={fadeInUp}
                      >
                        {projects[expandedProject].githubUrl && (
                          <a
                            href={projects[expandedProject].githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-lg text-white"
                            onClick={handleLinkClick}
                          >
                            <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">View Code</span>
                          </a>
                        )}
                        {projects[expandedProject].url && (
                          <a
                            href={projects[expandedProject].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-600/80 hover:bg-purple-600 backdrop-blur-sm transition-colors rounded-lg text-white"
                            onClick={handleLinkClick}
                          >
                            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">Visit Project</span>
                          </a>
                        )}
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="md:w-1/2 rounded-xl overflow-hidden"
                      variants={safeScaleUp}
                    >
                      {/* Fixed height image container with aspect ratio preservation */}
                      <div className="w-full h-64 md:h-80">
                        <img 
                          src={projects[expandedProject].image}
                          alt={projects[expandedProject].title}
                          className="w-full h-full object-cover object-center"
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
