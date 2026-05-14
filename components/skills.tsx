'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'AI/ML',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'BERT', 'LLMs', 'Computer Vision'],
    },
    {
      title: 'Quantitative',
      skills: ['Algorithmic Trading', 'Risk Analysis', 'Portfolio Optimization', 'Statistical Modeling', 'Backtesting'],
    },
    {
      title: 'Backend',
      skills: ['Python', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    },
    {
      title: 'Frontend',
      skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'D3.js'],
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    },
    {
      title: 'Research',
      skills: ['Academic Research', 'Paper Writing', 'Data Analysis', 'Statistical Testing', 'Visualization'],
    },
  ]

  return (
    <section id="skills" className="relative w-full py-24 px-6 bg-gradient-to-b from-black via-violet-950/10 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="block gradient-text">Technical Stack</span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Expertise across AI, quantitative finance, and full-stack development</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all"
              whileHover={{ y: -5, borderColor: 'rgba(139, 92, 246, 0.5)' }}
            >
              <h3 className="text-xl font-bold text-white mb-4 text-center">{category.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-violet-500/20 text-violet-300 text-sm border border-violet-400/30 hover:border-violet-400/60 transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
