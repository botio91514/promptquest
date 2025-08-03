'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDailyPrompt } from "@/utils/getDailyPrompt";
import PromptInput from '../components/PromptInput';
import FeedbackBox from '../components/FeedbackBox';
import Aurora from '../components/Aurora';
import { 
  getInitialProgress, 
  updateProgress, 
  saveProgressToLocalStorage, 
  loadProgressFromLocalStorage,
  UserProgress 
} from '../../lib/userProgress';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DailyPage() {
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress());
  const [newBadges, setNewBadges] = useState<any[]>([]);
  const [newAchievements, setNewAchievements] = useState<any[]>([]);
  const prompt = getDailyPrompt();

  // Load user progress on component mount
  useEffect(() => {
    const savedProgress = loadProgressFromLocalStorage();
    if (savedProgress) {
      setUserProgress(savedProgress);
    }
  }, []);

  const handlePromptSubmit = async (prompt: string) => {
    setUserPrompt(prompt);
    setIsLoading(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: prompt,
          questTitle: 'Daily Quest',
          questDescription: 'Creative prompt challenge',
          userId: userProgress.id || 'anonymous'
        }),
      });

      const aiFeedback = await response.json();
      setFeedback(aiFeedback);

      // Update user progress with new XP and check for badges/achievements
      const updatedProgress = updateProgress(
        userProgress,
        'daily-quest',
        aiFeedback.earnedXP,
        aiFeedback.score
      );

      // Check for new badges and achievements
      const currentBadgeCount = userProgress.badges.length;
      const currentAchievementCount = userProgress.achievements.length;
      const newBadgesFound = updatedProgress.badges.slice(currentBadgeCount);
      const newAchievementsFound = updatedProgress.achievements.slice(currentAchievementCount);

      setNewBadges(newBadgesFound);
      setNewAchievements(newAchievementsFound);
      setUserProgress(updatedProgress);
      saveProgressToLocalStorage(updatedProgress);

    } catch (error) {
      console.error('Error getting AI feedback:', error);
      // Fallback feedback
      const fallbackFeedback = {
        score: 6,
        scoreBreakdown: {
          clarity: 6,
          specificity: 5,
          creativity: 7,
          effectiveness: 6
        },
        strengths: ['Creative thinking', 'Good effort'],
        improvements: ['Could be more specific', 'Add more context'],
        suggestions: ['Try using examples', 'Be more descriptive'],
        overall: '🌟 Great work! Keep practicing your creative skills.',
        nextSteps: 'Focus on being more specific and adding relevant context',
        earnedXP: 60,
        questTitle: 'Daily Quest',
        submittedAt: new Date().toISOString()
      };
      setFeedback(fallbackFeedback);

      // Update progress with fallback
      const updatedProgress = updateProgress(
        userProgress,
        'daily-quest',
        fallbackFeedback.earnedXP,
        fallbackFeedback.score
      );
      setUserProgress(updatedProgress);
      saveProgressToLocalStorage(updatedProgress);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuest = () => {
    window.location.href = '/';
  };

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
      {/* Back to Quest Hub Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/quests">
          <button className="p-2 glass rounded-lg hover:border-white/40 transition-colors flex items-center gap-2">
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-white font-semibold hidden sm:inline">Back to Quest Hub</span>
          </button>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold text-white mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              🌄 Daily Quest
            </motion.h1>
            <p className="text-blue-200 text-lg">Today's creative challenge awaits!</p>
            
            {/* User Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 flex justify-center gap-6 text-sm"
            >
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <span className="text-yellow-400 font-semibold">XP: {userProgress.xp}</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <span className="text-purple-400 font-semibold">Level: {userProgress.level}</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <span className="text-orange-400 font-semibold">🔥 Streak: {userProgress.streak}</span>
              </div>
            </motion.div>
          </div>

          {/* Challenge Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                ✨
              </motion.div>
              <h3 className="text-2xl font-bold text-white">Today's Challenge</h3>
            </div>
            <motion.p 
              className="text-blue-200 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {prompt}
            </motion.p>
          </motion.div>

          {/* Prompt Input */}
          {!feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PromptInput
                onSubmit={handlePromptSubmit}
                placeholder="Share your creative response to today's challenge..."
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {/* AI Feedback */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FeedbackBox
                feedback={feedback}
                onNextChallenge={handleNextQuest}
                newBadges={newBadges}
                newAchievements={newAchievements}
              />
              {/* Go to Quest Hub Button */}
              <div className="flex justify-center mt-6">
                <Link href="/quests">
                  <button className="bg-yellow-400 text-purple-900 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-colors flex items-center gap-2">
                    <span>Go to Quest Hub</span>
                  </button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-xl p-6 border border-white/10"
          >
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              🤖 AI-Powered Feedback
            </h4>
            <ul className="text-blue-200 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                Get instant, personalized feedback on your prompts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                Learn specific techniques to improve your AI communication
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                Build consistency with daily creative practice
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                Earn XP and unlock badges for your achievements
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}