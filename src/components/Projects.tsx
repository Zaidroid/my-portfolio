// src/components/Projects.tsx
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ArrowUpRight, Calendar, MapPin, Code } from 'lucide-react';
import { useEffect } from 'react';

// Import the reusable animation variants
import { stagger, fadeInUp, fadeInRight } from '../utils/animationVariants';

// Enhanced project data with more details
const projects = [
  {
    title: "PalTraffic",
    description: "Real-time traffic monitoring and navigation system for Palestine regions with live updates and route optimization.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    url: "https://roads.zaidlab.xyz",
    tags: ["React", "Node.js", "Maps API"],
    date: "2024",
    location: "Palestine",
    githubUrl: "https://github.com/zaidlab/paltraffic"
  },
  {
    title: "TimeTravel",
    description: "Interactive historical timeline exploration platform showcasing Palestinian history with immersive storytelling and archival content.",
    image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=800&h=600&fit=crop",
    url: "https://timetravel.zaidlab.xyz",
    tags: ["Vue.js", "WebGL", "Animation"],
    date: "2023",
    location: "Digital Archive",
    githubUrl: "https://github.com/zaidlab/timetravel"
  },
  {
    title: "Health Tracker",
    description: "Personal health and wellness monitoring dashboard tailored for regional health metrics and community wellness initiatives.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    url: "https://health.zaidlab.xyz",
    tags: ["React", "D3.js", "API"],
    date: "2023",
    location: "Public Health Initiative",
    githubUrl: "https://github.com/zaidlab/healthtracker"
  },
  {
    title: "Palestine Historical Data",
    description: "Interactive infographic showcasing historical data in numbers with comprehensive timelines, demographic changes, and cultural heritage mapping.",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop",
    tags: ["Data Visualization", "SVG", "Animation"],
    date: "2022",
    location: "Historical Archives",
    githubUrl: "https://github.com/zaidlab/palestine-data"
  }
];

// New animation variants
const projectCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.6, 0.05, -0.01, 0.9]
    }
  })
};

const hoverInfoVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export default function Projects() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section id="work" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInRight} // Changed from fadeInUp for variety
          custom={0}
          className="text-center mb-16"
        >
          <motion.h2 
            className="section-heading drop-shadow-md inline-block text-4xl font-bold"
            variants={fadeInUp}
            custom={1}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400">
              Recent Projects
            </span>
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10" // Increased gap for better spacing
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2 // More pronounced stagger
              }
            }
          }}
          ref={ref}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-[rgb(var(--foreground))]/5 shadow-md hover:shadow-xl transition-all duration-700 h-[420px]" // Slightly taller to accommodate more info
              variants={projectCardVariants}
              custom={index}
              whileHover={{ 
                y: -8, // More pronounced lift
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.08 }} // More pronounced zoom
                  transition={{ duration: 0.7 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </motion.div>
                
                {/* Always visible title and tags overlay with improved styling */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top section with title - always visible */}
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 self-start">
                    <h3 className="text-xl font-medium text-white">{project.title}</h3>
                  </div>
                  
                  {/* Bottom section with tags - always visible */}
                  <div className="flex flex-wrap gap-2 bg-black/70 backdrop-blur-sm p-4 rounded-lg">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced hover overlay with more info */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <motion.div
                      variants={hoverInfoVariants}
                      initial="hidden"
                      whileHover="visible"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                              whileHover={{ 
                                scale: 1.2, 
                                backgroundColor: "rgba(255, 255, 255, 0.3)" 
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Code className="w-5 h-5 text-white" />
                            </motion.a>
                          )}
                          {project.url && (
                            <motion.a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                              whileHover={{ 
                                scale: 1.2, 
                                backgroundColor: "rgba(255, 255, 255, 0.3)" 
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ArrowUpRight className="w-5 h-5 text-white" />
                            </motion.a>
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
                      
                      {/* Enhanced description */}
                      <p className="text-white/90 mb-5 line-clamp-3 hover:line-clamp-none transition-all duration-300">
                        {project.description}
                      </p>
                      
                      {/* Tags with enhanced hover effects */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <motion.span 
                            key={i} 
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90"
                            whileHover={{ 
                              backgroundColor: "rgba(124, 58, 237, 0.3)",
                              scale: 1.05,
                              y: -2
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced highlight border on hover with gradient */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 1,
                  borderImage: "linear-gradient(45deg, rgba(124, 58, 237, 0.7), rgba(59, 130, 246, 0.7)) 1"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
