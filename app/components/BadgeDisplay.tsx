'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Flame, Crown } from 'lucide-react';

interface Badge {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface Achievement {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface BadgeDisplayProps {
  badges: Badge[];
  achievements: Achievement[];
  showTitle?: boolean;
  maxDisplay?: number;
}

export default function BadgeDisplay({ 
  badges, 
  achievements, 
  showTitle = true,
  maxDisplay = 6 
}: BadgeDisplayProps) {
  const allItems = [...badges, ...achievements].sort((a, b) => 
    new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
  ).slice(0, maxDisplay);

  if (allItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 border border-white/20"
    >
      {showTitle && (
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Recent Achievements</h3>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {allItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/20 hover:border-white/30 transition-all"
          >
            <motion.div 
              className="text-2xl"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              {item.icon}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm truncate">
                {item.name}
              </div>
              <div className="text-blue-200 text-xs truncate">
                {item.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {badges.length + achievements.length > maxDisplay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4"
        >
          <span className="text-blue-200 text-sm">
            +{badges.length + achievements.length - maxDisplay} more achievements
          </span>
        </motion.div>
      )}
    </motion.div>
  );
} 