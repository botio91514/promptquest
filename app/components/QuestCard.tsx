'use client';

import { motion } from 'framer-motion';
import { Star, Clock, Trophy, ArrowRight } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  xpReward: number;
  icon: string;
  category: string;
}

interface QuestCardProps {
  quest: Quest;
  onStart: () => void;
}

export default function QuestCard({ quest, onStart }: QuestCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="quest-card rounded-xl p-4 md:p-6 cursor-pointer group relative overflow-hidden"
      onClick={onStart}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
      {/* Quest Icon & Category */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <motion.div 
          className="text-3xl md:text-4xl"
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          {quest.icon}
        </motion.div>
        <span className="text-xs px-2 md:px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
          {quest.category}
        </span>
      </div>

      {/* Quest Title */}
      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
        {quest.title}
      </h3>

      {/* Quest Description */}
      <p className="text-blue-200 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
        {quest.description}
      </p>

      {/* Quest Stats */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 md:gap-4">
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
          >
            <Trophy className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-xs md:text-sm">{quest.xpReward} XP</span>
          </motion.div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
            <span className="text-blue-200 text-xs md:text-sm">15-30 min</span>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(quest.difficulty)}`}>
          {quest.difficulty}
        </span>
      </div>

      {/* Difficulty Stars */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              whileHover={{ scale: 1.2 }}
            >
              <Star
                className={`w-3 h-3 md:w-4 md:h-4 ${
                star <= (quest.difficulty === 'Beginner' ? 2 : quest.difficulty === 'Intermediate' ? 3 : 5)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-600'
                }`}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Start Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-1 text-yellow-400 group-hover:text-yellow-300 transition-colors"
        >
          <span className="text-xs md:text-sm font-semibold">Start</span>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </div>
      </div>
    </motion.div>
  );
}