// 2. Updated Projects.tsx with staggered card animations and hover effects
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="work" className="py-32 px-6 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[rgb(var(--foreground))]/5 dark:bg-[rgb(var(--foreground))]/10 skew-y-3 -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
          className="space-y-20"
        >
          <h2 className="section-heading text-center mb-16 drop-shadow-md">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400">
              Recent Projects
            </span>
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="project-card group cursor-pointer overflow-hidden rounded-2xl bg-[rgb(var(--foreground))]/5 shadow-md hover:shadow-xl transition-all duration-500"
                onClick={() => project.url && window.open(project.url, '_blank')}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div className="relative h-[300px] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="project-card-content backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-normal text-white">{project.title}</h3>
                      {project.url && (
                        <motion.div
                          whileHover={{ rotate: 45 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ExternalLink className="w-5 h-5 text-white opacity-60 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-white/80 mb-4">{project.description}</p>
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
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}