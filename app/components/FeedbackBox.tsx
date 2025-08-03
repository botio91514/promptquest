'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, Target, Zap, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import React from 'react';

interface FeedbackBoxProps {
  feedback: {
  score: number;
    scoreBreakdown?: {
      clarity: number;
      specificity: number;
      creativity: number;
      effectiveness: number;
    };
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  overall: string;
    nextSteps?: string;
    earnedXP: number;
    questTitle: string;
    submittedAt: string;
  };
  onNextChallenge: () => void;
  newBadges?: any[];
  newAchievements?: any[];
}

export default function FeedbackBox({ 
  feedback, 
  onNextChallenge, 
  newBadges = [], 
  newAchievements = [] 
}: FeedbackBoxProps) {
  const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
      origin: { y: 0.6 }
      });
  };

  // Trigger confetti for high scores or new badges/achievements
  React.useEffect(() => {
    if (feedback.score >= 8 || newBadges.length > 0 || newAchievements.length > 0) {
      triggerConfetti();
    }
  }, [feedback.score, newBadges.length, newAchievements.length]);

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-400';
    if (score >= 7) return 'text-yellow-400';
    if (score >= 5) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 9) return '💎';
    if (score >= 7) return '🌟';
    if (score >= 5) return '🎯';
    return '📝';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Score Display */}
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-xl p-4 md:p-6 border border-white/20 text-center"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
        <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl md:text-4xl"
          >
            {getScoreEmoji(feedback.score)}
              </motion.div>
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-white">Your Score</h3>
            <div className={`text-4xl md:text-5xl font-bold ${getScoreColor(feedback.score)}`}>
              {feedback.score}/10
          </div>
      </div>
      </div>

        {/* XP Reward */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-3 md:p-4 mb-3 md:mb-4"
>
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
            <span className="text-white font-bold text-lg md:text-xl">
              +{feedback.earnedXP} XP Earned!
            </span>
          </div>
        </motion.div>

        {/* Score Breakdown */}
        {feedback.scoreBreakdown && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {Object.entries(feedback.scoreBreakdown).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-blue-200 text-xs md:text-sm capitalize mb-1">{key}</div>
                <div className={`text-lg md:text-xl font-bold ${getScoreColor(value)}`}>
                  {value}/10
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Strengths */}
      {(feedback.strengths || []).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-4 md:p-6 border border-green-500/20"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
            <h4 className="text-white font-semibold text-lg md:text-xl">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {(feedback.strengths || []).map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-blue-200 text-sm md:text-base">
                <span className="text-green-400 mt-1">✓</span>
                {strength}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Improvements */}
      {(feedback.improvements || []).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-4 md:p-6 border border-orange-500/20"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
            <h4 className="text-white font-semibold text-lg md:text-xl">Areas for Improvement</h4>
          </div>
          <ul className="space-y-2">
            {(feedback.improvements || []).map((improvement, index) => (
              <li key={index} className="flex items-start gap-2 text-blue-200 text-sm md:text-base">
                <span className="text-orange-400 mt-1">•</span>
                {improvement}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Suggestions */}
      {(feedback.suggestions || []).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-xl p-4 md:p-6 border border-blue-500/20"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            <h4 className="text-white font-semibold text-lg md:text-xl">Suggestions</h4>
          </div>
          <ul className="space-y-2">
            {(feedback.suggestions || []).map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2 text-blue-200 text-sm md:text-base">
                <span className="text-blue-400 mt-1">💡</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Overall Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass rounded-xl p-4 md:p-6 border border-yellow-500/20"
      >
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
          <h4 className="text-white font-semibold text-lg md:text-xl">Overall Feedback</h4>
        </div>
        <p className="text-blue-200 text-sm md:text-base leading-relaxed">
          {feedback.overall}
        </p>
      </motion.div>

      {/* Next Steps */}
      {feedback.nextSteps && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-xl p-4 md:p-6 border border-purple-500/20"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
            <h4 className="text-white font-semibold text-lg md:text-xl">Next Steps</h4>
          </div>
          <p className="text-blue-200 text-sm md:text-base leading-relaxed">
            {feedback.nextSteps}
          </p>
        </motion.div>
      )}

      {/* New Badges */}
      {newBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="glass rounded-xl p-4 md:p-6 border border-yellow-500/20"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
            <h4 className="text-white font-semibold text-lg md:text-xl">New Badges Unlocked! 🎉</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {newBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-yellow-500/10 rounded-lg">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <div className="text-white font-semibold text-sm">{badge.name}</div>
                  <div className="text-blue-200 text-xs">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* New Achievements */}
      {newAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="glass rounded-xl p-4 md:p-6 border border-purple-500/20"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Star className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
            <h4 className="text-white font-semibold text-lg md:text-xl">New Achievements! ⭐</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {newAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-purple-500/10 rounded-lg">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <div className="text-white font-semibold text-sm">{achievement.name}</div>
                  <div className="text-blue-200 text-xs">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Next Challenge Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextChallenge}
          className="btn-primary text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-full"
        >
          Continue Your Quest
        </motion.button>
      </motion.div>
    </div>
  );
}