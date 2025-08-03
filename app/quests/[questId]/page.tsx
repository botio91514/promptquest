'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Lightbulb, Trophy } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import PromptInput from '../../components/PromptInput';
import FeedbackBox from '../../components/FeedbackBox';
import AIHintSystem from '../../components/AIHintSystem';
import AISettings from '../../components/AISettings';
import Aurora from '../../components/Aurora';
import {
  getInitialProgress,
  updateProgress,
  saveProgressToLocalStorage,
  loadProgressFromLocalStorage,
  UserProgress,
} from '../../../lib/userProgress';

interface QuestPageProps {
  params: {
    questId: string;
  };
}

const questData: Record<string, { title: string; description: string; challenge: string; icon: string; difficulty: string; xpReward: number }> = {
  '1': {
    title: 'Prompt Basics',
    description: 'Learn how to write a basic AI prompt.',
    challenge: 'Write a prompt to generate a paragraph about the solar system.',
    icon: '📚',
    difficulty: 'Beginner',
    xpReward: 50,
  },
  '2': {
    title: 'Creative Writing',
    description: 'Make AI write a short poem.',
    challenge: 'Write a prompt that makes AI generate a poem about rain and childhood memories.',
    icon: '✨',
    difficulty: 'Intermediate',
    xpReward: 75,
  },
  '3': {
    title: 'Image Prompting',
    description: 'Generate visuals with text.',
    challenge: 'Write a prompt that makes an AI image generator create a cyberpunk city at night.',
    icon: '🎨',
    difficulty: 'Advanced',
    xpReward: 100,
  },
  'math-mage': {
    title: 'Math Mage Challenge',
    description: 'Master mathematical prompts and solve complex equations with AI',
    challenge: 'Write a prompt asking AI to solve a quadratic equation step-by-step.',
    icon: '🧮',
    difficulty: 'Beginner',
    xpReward: 50,
  },
  'ai-dungeon': {
    title: 'AI Dungeon Explorer',
    description: 'Navigate through AI-generated adventures and storytelling',
    challenge: 'Write a prompt to start an epic fantasy adventure with a unique character.',
    icon: '🏰',
    difficulty: 'Intermediate',
    xpReward: 75,
  },
  'history-hacker': {
    title: 'History Hacker Quest',
    description: 'Uncover historical mysteries through strategic prompting',
    challenge: 'Create a prompt to analyze the causes of a major historical event.',
    icon: '📜',
    difficulty: 'Advanced',
    xpReward: 100,
  },
  'basic-prompting': {
    title: 'The Art of Clear Instructions',
    description: 'Learn to write clear, specific prompts that get better AI responses',
    challenge: 'Write a prompt asking for a chocolate chip cookie recipe. Make it specific and clear.',
    icon: '📝',
    difficulty: 'Beginner',
    xpReward: 50,
  },
  'context-setting': {
    title: 'Setting the Perfect Context',
    description: 'Master the art of providing context for better AI responses',
    challenge: 'Write a prompt for a professional email declining a meeting invitation.',
    icon: '🎯',
    difficulty: 'Beginner',
    xpReward: 60,
  },
  'code-generation': {
    title: 'Code Crafting Quest',
    description: 'Master prompts for generating and debugging code',
    challenge: 'Write a prompt asking AI to create a Python function that sorts a list of numbers and returns the result.',
    icon: '💻',
    difficulty: 'Intermediate',
    xpReward: 75,
  },
  'storytelling': {
    title: 'Crafting Compelling Stories',
    description: 'Learn to write prompts that generate engaging narratives',
    challenge: 'Write a prompt asking AI to create a short story about a time traveler who discovers they can only travel to the past.',
    icon: '📖',
    difficulty: 'Intermediate',
    xpReward: 75,
  },
  'character-dev': {
    title: 'Character Development Magic',
    description: 'Master the art of creating detailed character descriptions',
    challenge: 'Write a prompt asking AI to create a detailed character profile for a fantasy hero with unique abilities.',
    icon: '👤',
    difficulty: 'Intermediate',
    xpReward: 75,
  },
  'data-analysis': {
    title: 'Data Detective Challenge',
    description: 'Learn to write prompts for data analysis and visualization',
    challenge: 'Write a prompt asking AI to analyze a dataset and create a summary of key insights.',
    icon: '📊',
    difficulty: 'Advanced',
    xpReward: 100,
  },
  'chain-of-thought': {
    title: 'Chain of Thought Mastery',
    description: 'Master advanced reasoning prompts that show step-by-step thinking',
    challenge: 'Write a prompt asking AI to solve a complex logic puzzle by showing its reasoning process.',
    icon: '🧠',
    difficulty: 'Advanced',
    xpReward: 100,
  },
  'few-shot': {
    title: 'Few-Shot Learning Expert',
    description: 'Learn to write prompts with examples for better AI responses',
    challenge: 'Write a prompt with 2-3 examples showing how to format a business email, then ask AI to write a new one.',
    icon: '🎯',
    difficulty: 'Advanced',
    xpReward: 100,
  },
  'prompt-chaining': {
    title: 'Advanced Prompt Chaining',
    description: 'Master the technique of using multiple prompts to achieve complex goals',
    challenge: 'Write a series of 3 connected prompts: first to generate a story outline, then to expand one scene, then to add dialogue.',
    icon: '🔗',
    difficulty: 'Advanced',
    xpReward: 100,
  }
};

export default function QuestPage({ params }: QuestPageProps) {
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress());
  const [newBadges, setNewBadges] = useState<any[]>([]);
  const [newAchievements, setNewAchievements] = useState<any[]>([]);
  const [useRealAI, setUseRealAI] = useState(false);

  const quest = questData[params.questId as string];

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = loadProgressFromLocalStorage();
    if (savedProgress) {
      setProgress(savedProgress);
    }
  }, []);

  if (!quest) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        {/* Aurora Background */}
        <div className="fixed inset-0 z-0">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">Quest Not Found</h1>
          <Link href="/quests" className="text-yellow-400 hover:underline">
            Return to Quest Hub
          </Link>
        </div>
      </div>
    );
  }

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
          questTitle: quest.title,
          questDescription: quest.description,
          userId: progress.id || 'anonymous'
        }),
      });

      const aiFeedback = await response.json();
      setFeedback(aiFeedback);

      // Update user progress with new XP and check for badges/achievements
      const updatedProgress = updateProgress(
        progress,
        params.questId as string,
        aiFeedback.earnedXP,
        aiFeedback.score
      );

      // Check for new badges and achievements
      const currentBadgeCount = progress.badges.length;
      const currentAchievementCount = progress.achievements.length;
      const newBadgesFound = updatedProgress.badges.slice(currentBadgeCount);
      const newAchievementsFound = updatedProgress.achievements.slice(currentAchievementCount);

      setNewBadges(newBadgesFound);
      setNewAchievements(newAchievementsFound);
      setProgress(updatedProgress);
      saveProgressToLocalStorage(updatedProgress);

      // Launch confetti on quest completion or high scores
      if (!progress.completedQuests.includes(params.questId as string) || aiFeedback.score >= 8) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
        });
      }

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
        questTitle: quest.title,
        submittedAt: new Date().toISOString()
      };
      setFeedback(fallbackFeedback);

      // Update progress with fallback
      const updatedProgress = updateProgress(
        progress,
        params.questId as string,
        fallbackFeedback.earnedXP,
        fallbackFeedback.score
      );
      setProgress(updatedProgress);
      saveProgressToLocalStorage(updatedProgress);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuest = () => {
    // Navigate back to quests hub
    window.location.href = '/quests';
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
      {/* Header */}
      <div className="glass-dark border-b border-white/10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Back to Quest Hub */}
              <Link href="/quests">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 glass rounded-lg hover:border-white/40 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold hidden sm:inline">Back to Quest Hub</span>
                </motion.button>
              </Link>
              {/* Back to Home */}
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 glass rounded-lg hover:border-white/40 transition-colors ml-2 flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold hidden sm:inline">Back to Home</span>
                </motion.button>
              </Link>
              <div className="text-3xl">{quest.icon}</div>
              <div>
                <h1 className="text-2xl font-bold text-white">{quest.title}</h1>
                <p className="text-blue-200 text-lg">{quest.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.span 
                className="text-yellow-400 font-bold text-lg"
                whileHover={{ scale: 1.1 }}
              >
                +{quest.xpReward} XP
              </motion.span>
              <div className="bg-yellow-400/20 px-3 py-1 rounded-full border border-yellow-400/30 font-semibold">
                <span className="text-yellow-400 text-sm">{quest.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Challenge Header */}
          <div className="glass rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Target className="w-6 h-6 text-yellow-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">⚔️ Challenge</h3>
            </div>
            <p className="text-blue-200 text-lg leading-relaxed">{quest.challenge}</p>
          </div>

          {/* Progress Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-yellow-300 font-semibold">🎯 XP: {progress.xp} | 🧬 Level: {progress.level} | ✅ Completed: {progress.completedQuests.length}</div>
          </motion.div>

          {/* Prompt Input */}
          {!feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PromptInput
                onSubmit={handlePromptSubmit}
                placeholder={`Write your prompt for: ${quest.title}`}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {/* Feedback */}
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
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* AI Hint System */}
      {!feedback && (
        <AIHintSystem
          questTitle={quest.title}
          questChallenge={quest.challenge}
          questDifficulty={quest.difficulty}
          useRealAI={useRealAI}
        />
      )}

      {/* AI Settings */}
      {!feedback && (
        <AISettings
          useRealAI={useRealAI}
          onToggleAI={setUseRealAI}
        />
      )}
    </main>
  );
}