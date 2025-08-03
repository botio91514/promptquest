'use client';

import { motion } from 'framer-motion';
import { Trophy, Flame, Star } from 'lucide-react';

interface ProgressBarProps {
  level: number;
  currentXp: number;
  maxXp: number;
  streak?: number;
  showStreak?: boolean;
}

export default function ProgressBar({ 
  level, 
  currentXp, 
  maxXp, 
  streak = 0,
  showStreak = true 
}: ProgressBarProps) {
  const progressPercentage = (currentXp % 100) / 100;
  const xpForNextLevel = 100 - (currentXp % 100);

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {/* Level Display */}
      <div className="text-center">
        <div className="flex items-center gap-1 md:gap-2">
          <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
          <span className="text-white font-bold text-sm md:text-lg">Level {level}</span>
        </div>
        <div className="text-blue-200 text-xs md:text-sm">
          {currentXp} / {level * 100} XP
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 min-w-0">
        <div className="relative">
          <div className="w-full bg-white/20 rounded-full h-2 md:h-3">
          <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 md:h-3 rounded-full"
            initial={{ width: 0 }}
              animate={{ width: `${progressPercentage * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
          <div className="text-center mt-1">
            <span className="text-blue-200 text-xs">
              {xpForNextLevel} XP to next level
            </span>
          </div>
        </div>
      </div>

      {/* Streak Display */}
      {showStreak && streak > 0 && (
        <motion.div 
          className="flex items-center gap-1 md:gap-2 bg-orange-500/20 px-2 md:px-3 py-1 rounded-full border border-orange-400/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Flame className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
          <span className="text-orange-400 font-semibold text-xs md:text-sm">
            {streak} day{streak !== 1 ? 's' : ''}
          </span>
        </motion.div>
      )}

      {/* Level Up Animation */}
      {level > 1 && (
        <motion.div
          className="flex items-center gap-1"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 5
          }}
        >
          <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
        </motion.div>
      )}
    </div>
  );
}