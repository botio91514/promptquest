'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, Star, Lock, CheckCircle, Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Aurora from '../components/Aurora';
import { getInitialProgress, UserProgress } from '../../lib/userProgress';

export default function QuestsHub() {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress());

  // Load progress from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('promptQuestUser');
    if (stored) {
      setProgress(JSON.parse(stored));
    }
  }, []);

  const questCategories = [
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      description: 'Master the basics of prompt engineering',
      icon: '📚',
      color: 'from-blue-500 to-cyan-500',
      quests: [
        { id: 'math-mage', title: 'Math Mage Challenge' },
        { id: 'basic-prompting', title: 'The Art of Clear Instructions' },
        { id: 'context-setting', title: 'Setting the Perfect Context' }
      ]
    },
    {
      id: 'creative',
      title: 'Creative Writing',
      description: 'Unleash creativity through AI collaboration',
      icon: '✨',
      color: 'from-purple-500 to-pink-500',
      quests: [
        { id: 'ai-dungeon', title: 'AI Dungeon Explorer' },
        { id: 'storytelling', title: 'Crafting Compelling Stories' },
        { id: 'character-dev', title: 'Character Development Magic' }
      ]
    },
    {
      id: 'technical',
      title: 'Technical & Analysis',
      description: 'Master prompts for data and technical tasks',
      icon: '🔬',
      color: 'from-green-500 to-emerald-500',
      quests: [
        { id: 'history-hacker', title: 'History Hacker Quest' },
        { id: 'code-generation', title: 'Code Crafting Quest' },
        { id: 'data-analysis', title: 'Data Detective Challenge' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Techniques',
      description: 'Master advanced prompting strategies',
      icon: '🎯',
      color: 'from-orange-500 to-red-500',
      quests: [
        { id: 'chain-of-thought', title: 'Chain of Thought Mastery' },
        { id: 'few-shot', title: 'Few-Shot Learning Expert' },
        { id: 'prompt-chaining', title: 'Advanced Prompt Chaining' }
      ]
    }
  ];

  return (
    <main className="min-h-screen relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <button className="p-2 glass rounded-lg hover:border-white/40 transition-colors flex items-center gap-2">
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-white font-semibold hidden sm:inline">Back to Home</span>
          </button>
        </Link>
      </div>
      {/* Header */}
      <div className="glass-dark border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <div className="text-yellow-300 font-semibold text-lg">
            🎯 Total XP: {progress.xp} | 🧬 Level: {progress.level} | ✅ Quests Completed: {progress.completedQuests.length}
          </div>
        </div>
      </div>

      {/* Quest Map Header */}
      <div className="glass-dark border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Map className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">Quest Map</h1>
                <p className="text-blue-200 text-lg">Choose your path to prompt mastery</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/leaderboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-full border-2 border-yellow-400/50 hover:border-yellow-400"
                >
                  <Trophy className="w-4 h-4" />
                  <span className="hidden sm:inline">Leaderboard</span>
                  <span className="sm:hidden">🏆</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {questCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: categoryIndex * 0.15,
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className={`text-4xl p-3 rounded-xl bg-gradient-to-r ${category.color} bg-opacity-20 border border-white/10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {category.icon}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  <p className="text-blue-200 text-lg">{category.description}</p>
                </div>
              </div>

              {/* Quests List */}
              <div className="space-y-3">
                {category.quests.map((quest, questIndex) => {
                  const isCompleted = progress.completedQuests.includes(quest.id);
                  const isLocked = questIndex > 0 && !progress.completedQuests.includes(category.quests[questIndex - 1].id);
                  
                  return (
                    <motion.div
                      key={quest.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (questIndex * 0.05) }}
                    >
                      {isLocked ? (
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 opacity-60">
                          <div className="flex items-center gap-3">
                            <motion.div
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Lock className="w-5 h-5 text-gray-400" />
                            </motion.div>
                            <span className="text-gray-400">{quest.title}</span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-500/20 px-3 py-1 rounded-full font-semibold">
                            Locked
                          </span>
                        </div>
                      ) : (
                        <Link href={`/quests/${quest.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <Star className="w-5 h-5 text-yellow-400" />
                              )}
                              <span className="text-white group-hover:text-yellow-400 transition-colors">
                                {quest.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {isCompleted && (
                                <span className="text-xs text-green-400 bg-green-400/20 px-3 py-1 rounded-full font-semibold border border-green-400/30">
                                  Complete
                                </span>
                              )}
                              <motion.span 
                                className="text-white"
                                whileHover={{ x: 5 }}
                              >
                                →
                              </motion.span>
                            </div>
                          </motion.div>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}