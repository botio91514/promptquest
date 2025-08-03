'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Map, Trophy, Play, Star, Gamepad2, Calendar } from 'lucide-react';
import AvatarSetup from './components/AvatarSetup';
import QuestCard from './components/QuestCard';
import ProgressBar from './components/ProgressBar';
import Aurora from './components/Aurora';
import SplitText from './components/SplitText';
import TextType from './components/TextType';
import Link from 'next/link';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerData, setPlayerData] = useState({
    name: '',
    avatar: '🧙‍♂️',
    level: 1,
    xp: 0,
    maxXp: 100,
    streak: 0,
    lastActivity: new Date().toISOString(),
    completedQuests: [],
    badges: [],
    achievements: []
  });

  const featuredQuests = [
    {
      id: 'math-mage',
      title: 'Math Mage Challenge',
      description: 'Master mathematical prompts and solve complex equations with AI',
      difficulty: 'Beginner',
      xpReward: 50,
      icon: '🧮',
      category: 'Mathematics'
    },
    {
      id: 'ai-dungeon',
      title: 'AI Dungeon Explorer',
      description: 'Navigate through AI-generated adventures and storytelling',
      difficulty: 'Intermediate',
      xpReward: 75,
      icon: '🏰',
      category: 'Adventure'
    },
    {
      id: 'history-hacker',
      title: 'History Hacker Quest',
      description: 'Uncover historical mysteries through strategic prompting',
      difficulty: 'Advanced',
      xpReward: 100,
      icon: '📜',
      category: 'History'
    }
  ];



  if (!gameStarted) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        {/* Aurora Background */}
        <div className="fixed inset-0 z-0">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        
        {/* Top Right Links */}
        <div className="fixed top-4 right-4 z-50 flex flex-wrap gap-2 sm:gap-2 sm:flex-row flex-col items-end sm:items-center w-max max-w-full">
          <Link href="/about">
            <span className="bg-white/80 text-purple-900 font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-200 transition-colors cursor-pointer whitespace-nowrap">About</span>
          </Link>
          <Link href="/daily">
            <span className="bg-white/80 text-purple-900 font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-200 transition-colors cursor-pointer whitespace-nowrap">🌅 Daily Quest</span>
          </Link>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-28 sm:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto w-full px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 md:mb-8"
            >
              <motion.div 
                className="text-6xl md:text-8xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🎮
              </motion.div>
              <SplitText
                text="PromptQuest"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight"
                delay={150}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
                textAlign="center"
                onLetterAnimationComplete={() => {}}
              />
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-blue-200 mb-6 md:mb-8 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TextType 
                  as="span"
                  text="Master the art of ai prompting through the epic adventure"
                  typingSpeed={60}
                  showCursor={true}
                  className="inline-block"
                  variableSpeed={undefined}
                  onSentenceComplete={() => {}}
                />
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
            >
              {[
                { icon: Target, title: 'Quest Challenges', desc: 'Solve real prompt writing puzzles', color: 'text-yellow-400' },
                { icon: Zap, title: 'AI Feedback', desc: 'Get instant feedback on your prompts', color: 'text-green-400' },
                { icon: Trophy, title: 'Level Up', desc: 'Track your prompt mastery progress', color: 'text-purple-400' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-xl p-4 md:p-6 hover:border-white/40 transition-all duration-300"
                >
                  <feature.icon className={`w-8 h-8 md:w-12 md:h-12 ${feature.color} mx-auto mb-3 md:mb-4`} />
                  <h3 className="text-white font-semibold mb-2 text-sm md:text-base">{feature.title}</h3>
                  <p className="text-blue-200 text-xs md:text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameStarted(true)}
              className="btn-primary text-lg md:text-xl flex items-center gap-2 md:gap-3 mx-auto px-6 md:px-8 py-3 md:py-4 rounded-full shadow-2xl w-full max-w-sm"
            >
              <Play className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden sm:inline">Start Your PromptQuest</span>
              <span className="sm:hidden">Start Quest</span>
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 md:mt-8 flex items-center justify-center gap-2 md:gap-4 text-blue-300 text-xs md:text-sm"
            >
              <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" />
              <span>Free to play • No downloads required</span>
            </motion.div>
          </motion.div>
        </div>
      </main>
    );
  }

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

      {/* Header */}
      <div className="glass-dark border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <motion.div 
              className="text-2xl md:text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎮
            </motion.div>
            <div>
              <SplitText
                text="PromptQuest"
                className="text-lg md:text-2xl font-bold text-white"
                delay={50}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
                textAlign="left"
                onLetterAnimationComplete={() => {}}
              />
              <p className="text-blue-200 text-xs md:text-sm">Welcome back, {playerData.name || 'Adventurer'}!</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <motion.div 
              className="text-3xl md:text-4xl"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              {playerData.avatar}
            </motion.div>
            <ProgressBar 
              level={playerData.level}
              currentXp={playerData.xp}
              maxXp={playerData.maxXp}
              streak={playerData.streak}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 relative z-10">
        {!playerData.name ? (
          <AvatarSetup 
            onComplete={(data) => setPlayerData(prev => ({ ...prev, ...data }))}
          />
        ) : (
          <div className="space-y-6 md:space-y-8">
            {/* Quest Hub */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 md:mb-12"
            >
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Map className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                <h2 className="text-2xl md:text-4xl font-bold text-white">Quest Hub</h2>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
              </div>
              <p className="text-blue-200 text-base md:text-lg px-4">Choose your next adventure and level up your prompting skills!</p>
              
              {/* Daily Quest Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <Link href="/daily" legacyBehavior>
                  <motion.a
                    className="btn-secondary flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-purple-400/50 hover:border-purple-400 text-sm md:text-base"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">📅 Today's Daily Quest</span>
                    <span className="sm:hidden">📅 Daily Quest</span>
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.a>
                </Link>
                
                <Link href="/leaderboard" legacyBehavior>
                  <motion.a
                    className="btn-secondary flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-yellow-400/50 hover:border-yellow-400 text-sm md:text-base"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trophy className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">🏆 Leaderboard</span>
                    <span className="sm:hidden">🏆 Rankings</span>
                  </motion.a>
                </Link>
              </motion.div>
            </motion.section>

            {/* Featured Quests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredQuests.map((quest, index) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <QuestCard 
                    quest={quest}
                    onStart={() => {
                      window.location.href = `/quests/${quest.id}`;
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Power-ups Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Power-ups & Tips</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: '🎯', title: 'Be Specific', tip: 'Clear instructions yield better results' },
                  { icon: '🔄', title: 'Iterate', tip: 'Refine your prompts based on output' },
                  { icon: '📝', title: 'Context Matters', tip: 'Provide relevant background information' },
                  { icon: '🎨', title: 'Creative Constraints', tip: 'Limitations can spark creativity' }
                ].map((powerup, index) => (
                  <motion.div 
                    key={index} 
                    className="glass rounded-lg p-4 text-center hover:border-white/30 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <motion.div 
                      className="text-3xl mb-2"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2 + index, repeat: Infinity }}
                    >
                      {powerup.icon}
                    </motion.div>
                    <h4 className="text-white font-semibold mb-1">{powerup.title}</h4>
                    <p className="text-blue-200 text-sm">{powerup.tip}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        )}
      </div>
    </main>
  );
}