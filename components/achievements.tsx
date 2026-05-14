'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useEffect, useState } from 'react'

export default function AchievementsSection() {
  const achievements = [
    { icon: '🏆', title: 'Hackathon Winner', subtitle: 'Multiple AI/ML competitions', count: '5+' },
    { icon: '📚', title: 'Research Published', subtitle: 'Peer-reviewed journals', count: '30+' },
    { icon: '🚀', title: 'Startups Founded', subtitle: 'Building innovative products', count: '3' },
    { icon: '💼', title: 'Years of Experience', subtitle: 'Industry & research background', count: '5+' },
  ]

  const [counts, setCounts] = useState(achievements.map(() => 0))

  useEffect(() => {
    const intervals = achievements.map((achievement, index) => {
      const target = parseInt(achievement.count.replace('+', ''))
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev]
          if (newCounts[index] < target) {
            newCounts[index] = Math.min(newCounts[index] + 1, target)
          }
          return newCounts
        })
      }, 50)
    })

    return () => intervals.forEach((interval) => clearInterval(interval))
  }, [])

  return (
    <section className="relative w-full py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="block gradient-text">Achievements & Recognition</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/50 transition-all text-center"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{achievement.icon}</div>
              <motion.div className="text-4xl font-bold text-cyan-400 mb-2">
                {counts[index]}{achievement.count.includes('+') ? '+' : ''}
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
              <p className="text-gray-400 text-sm">{achievement.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
