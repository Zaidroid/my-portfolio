// src/components/Projects.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Calendar, MapPin, Code, Maximize2, Minimize2 } from 'lucide-react';
import { useEffect, useState } from 'react';

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

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Use state to track if projects should be visible
  const [isVisible, setIsVisible] = useState(false);
  
  // Track which project is expanded
  const [expandedProject, setExpandedProject] = useState(null);
  
  useEffect(() => {
    // Once in view, keep visible
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Handle expand/collapse functionality
  const toggleExpand = (index, e) => {
    e.stopPropagation();
    if (expandedProject === index) {
      setExpandedProject(null);
    } else {
      setExpandedProject(index);
    }
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
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1
              }}
              className={`group relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 shadow-md hover:shadow-xl transition-all duration-500 ${expandedProject === index ? 'md:col-span-2 h-auto' : 'h-[420px]'}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className={`h-full w-full transition-transform duration-700 ${expandedProject === index ? 'opacity-60' : 'group-hover:scale-105'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Simple title overlay - Always visible, no box or icon */}
                <div className={`absolute top-0 left-0 p-6 ${expandedProject === index ? 'pointer-events-none' : ''}`}>
                  <h3 className="text-xl font-medium text-white drop-shadow-lg">{project.title}</h3>
                </div>
                
                {/* Expand button - always visible */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={(e) => toggleExpand(index, e)}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    {expandedProject === index ? (
                      <Minimize2 className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
                
                {/* Bottom section with tags - always visible when not expanded */}
                {expandedProject !== index && (
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
                )}
                
                {/* Hover overlay with more info - visible on hover when not expanded */}
                {expandedProject !== index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex justify-end mb-3">
                          {/* Only show action icons here, no title duplication */}
                          <div className="flex space-x-2">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors z-20"
                                onClick={(e) => e.stopPropagation()}
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
                                onClick={(e) => e.stopPropagation()}
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
                )}
              </div>
              
              {/* Expanded view */}
              {expandedProject === index && (
                <div className="relative z-10 p-8 bg-gradient-to-b from-black/80 to-black/95 min-h-[420px]">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
                      
                      <div className="flex items-center text-white/80 space-x-4 mb-6">
                        {project.date && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-5 h-5" />
                            <span>{project.date}</span>
                          </div>
                        )}
                        {project.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-5 h-5" />
                            <span>{project.location}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-white/90 mb-6 space-y-4">
                        <p>{project.description}</p>
                        <p>{project.detailedDescription}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 hover:bg-purple-500/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-lg text-white"
                          >
                            <Code className="w-5 h-5" />
                            <span>View Code</span>
                          </a>
                        )}
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-purple-600/80 hover:bg-purple-600 backdrop-blur-sm transition-colors rounded-lg text-white"
                          >
                            <ArrowUpRight className="w-5 h-5" />
                            <span>Visit Project</span>
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 rounded-xl overflow-hidden">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => toggleExpand(index, e)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    <Minimize2 className="w-6 h-6 text-white" />
                  </button>
                </div>
              )}
              
              {/* Highlight border on hover - only when not expanded */}
              {expandedProject !== index && (
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-purple-500/50"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
