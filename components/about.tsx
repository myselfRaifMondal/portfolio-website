'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function AboutSection() {
  const stats = [
    { value: '50+', label: 'Projects Built' },
    { value: '100+', label: 'Models Trained' },
    { value: '5+', label: 'Years Experience' },
    { value: '30+', label: 'Research Papers' },
  ]

  return (
    <section id="about" className="relative w-full py-24 px-6 bg-gradient-to-b from-black via-blue-950/10 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Text */}
          <motion.div variants={staggerItem}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="block gradient-text">Who I Am</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I&apos;m a passionate AI/ML engineer and quantitative researcher focused on building intelligent systems that solve real-world problems. With expertise spanning machine learning, quantitative finance, and full-stack development, I craft solutions at the intersection of innovation and practicality.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              My journey spans from building trading systems and ML models to founding startups and contributing to open-source research. I believe in clean code, rigorous testing, and shipping products that matter.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Currently exploring the intersection of AI and quantitative finance, always learning, always building.
            </p>
          </motion.div>

          {/* Right side - Stats */}
          <motion.div variants={staggerItem} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/50 transition-all"
                whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.5)' }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-blue-400 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
