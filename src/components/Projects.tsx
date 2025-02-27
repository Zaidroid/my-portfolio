// src/components/Projects.tsx
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';

// Import the reusable animation variants
import { stagger, fadeInUp } from '../utils/animationVariants';

const projects = [
  {
    title: "PalTraffic",
    description: "Real-time traffic monitoring and navigation system",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    url: "https://roads.zaidlab.xyz",
    tags: ["React", "Node.js", "Maps API"]
  },
  {
    title: "TimeTravel",
    description: "Interactive historical timeline exploration platform",
    image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=800&h=600&fit=crop",
    url: "https://timetravel.zaidlab.xyz",
    tags: ["Vue.js", "WebGL", "Animation"]
  },
  {
    title: "Health Tracker",
    description: "Personal health and wellness monitoring dashboard",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    url: "https://health.zaidlab.xyz",
    tags: ["React", "D3.js", "API"]
  },
  {
    title: "Palestine Historical Data",
    description: "Interactive infographic showcasing historical data in numbers",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop",
    tags: ["Data Visualization", "SVG", "Animation"]
  }
];

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
          variants={fadeInUp}
          custom={0}
          className="text-center mb-16"
        >
          <motion.h2 
            className="section-heading drop-shadow-md inline-block"
            variants={fadeInUp}
            custom={1}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400">
              Recent Projects
            </span>
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate={controls}
          variants={stagger}
          ref={ref}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-[rgb(var(--foreground))]/5 shadow-md hover:shadow-xl transition-all duration-500 h-[400px]"
              variants={fadeInUp}
              custom={index + 2}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </motion.div>
                
                {/* Always visible title and tags overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top section with title - always visible */}
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 self-start">
                    <h3 className="text-xl font-medium text-white">{project.title}</h3>
                  </div>
                  
                  {/* Bottom section with tags - always visible */}
                  <div className="flex flex-wrap gap-2 bg-black/60 backdrop-blur-sm p-3 rounded-lg">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Description and link on hover - keep original hover behavior */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-medium text-white">{project.title}</h3>
                        {project.url && (
                          <motion.a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                            whileHover={{ 
                              scale: 1.2, 
                              rotate: 15,
                              backgroundColor: "rgba(255, 255, 255, 0.3)" 
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </motion.a>
                        )}
                      </div>
                      <p className="text-white/90 mb-5">{project.description}</p>
                      
                      {/* Tags are duplicated in the hover state to maintain the original design */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <motion.span 
                            key={i} 
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90"
                            whileHover={{ 
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                              scale: 1.05 
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
              
              {/* Highlight border on hover */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 1,
                  borderColor: "rgba(124, 58, 237, 0.5)"
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
