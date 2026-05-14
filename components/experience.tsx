'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { ArrowUpRight } from 'lucide-react'

export default function ExperienceSection() {
  const projects = [
    {
      title: 'Quantum Trading System',
      description: 'Advanced algorithmic trading system leveraging quantum computing principles for portfolio optimization.',
      tech: ['Python', 'TensorFlow', 'Quantum ML', 'PostgreSQL'],
      status: 'Active',
    },
    {
      title: 'Neural Research Platform',
      description: 'Comprehensive ML research platform for training and evaluating deep learning models at scale.',
      tech: ['PyTorch', 'CUDA', 'React', 'AWS'],
      status: 'Live',
    },
    {
      title: 'AI Finance Dashboard',
      description: 'Real-time financial analytics dashboard powered by advanced ML models and market data.',
      tech: ['Next.js', 'TensorFlow', 'Redis', 'WebSocket'],
      status: 'Live',
    },
    {
      title: 'Computer Vision Engine',
      description: 'Production-grade computer vision system for real-time image analysis and processing.',
      tech: ['OpenCV', 'YOLOv8', 'FastAPI', 'Docker'],
      status: 'Completed',
    },
    {
      title: 'Research Publication Bot',
      description: 'Automated research paper analyzer that extracts insights from academic publications.',
      tech: ['NLP', 'BERT', 'Web Scraping', 'Python'],
      status: 'Live',
    },
    {
      title: 'Startup SaaS Platform',
      description: 'Full-stack SaaS application for AI-powered business analytics and insights.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      status: 'Live',
    },
  ]

  return (
    <section id="experience" className="relative w-full py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="block gradient-text">Featured Projects</span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Building intelligent systems and innovative solutions</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group relative p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              whileHover={{
                borderColor: 'rgba(59, 130, 246, 0.5)',
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-lg bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-300 -z-10"></div>

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="inline-block px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-400/30">
                {project.status}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
