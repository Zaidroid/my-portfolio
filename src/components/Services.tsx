import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Shell, Box } from 'lucide-react';

const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Web Development",
    description: "Building modern, responsive web applications with a focus on performance and user experience.",
    price: "$40/hour"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces that delight and engage users.",
    price: "$30/hour"
  },
  {
    icon: <Shell className="w-8 h-8" />,
    title: "AI Prompt Engineering",
    description: "Crafting effective prompts for AI models to achieve optimal results and outcomes.",
    price: "$20/hour"
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "3D Printing Training",
    description: "Comprehensive training in 3D printing technologies and techniques.",
    price: "$85/hour"
  }
];

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
          className="text-center mb-20"
        >
          <h2 className="section-heading mb-6">Services</h2>
          <p className="section-text max-w-2xl mx-auto">
            Specialized services tailored to help bring your digital ideas to life.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="text-[#4a576b] dark:text-blue-400 mb-6 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-normal mb-4 text-[#2d2d2d] dark:text-white">
                  {service.title}
                </h3>
                <p className="text-[#4a576b] dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <p className="text-lg font-normal text-[#2d2d2d] dark:text-blue-400 mb-6">
                  {service.price}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 bg-[#2d2d2d] dark:bg-blue-600 text-white rounded-xl hover:bg-[#4a576b] dark:hover:bg-blue-700 transition-colors duration-300"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
