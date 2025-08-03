"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutContent() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass rounded-2xl max-w-2xl w-full p-8 border border-white/20 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-yellow-300 mb-4 text-center">About PromptQuest</h1>
        <p className="text-blue-200 text-lg mb-6 text-center">
          <span className="font-semibold text-yellow-200">PromptQuest</span> is a gamified adventure to master the art of AI prompting! Complete creative quests, earn XP, and level up your skills while having fun. Designed for hackathon judges and AI enthusiasts alike.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-2">🚀 Features</h2>
          <ul className="list-disc list-inside text-blue-100 space-y-1">
            <li>🎯 <span className="text-yellow-200">Quest Map:</span> Tackle themed quests to learn prompt engineering step-by-step</li>
            <li>🔁 <span className="text-yellow-200">Daily Quest:</span> Fresh creative challenge every day for bonus XP</li>
            <li>🎉 <span className="text-yellow-200">Confetti & Animations:</span> Celebrate your wins with delightful visuals</li>
            <li>💡 <span className="text-yellow-200">AI Feedback:</span> Get instant tips on your responses (WOW-factor!)</li>
            <li>📈 <span className="text-yellow-200">Progression:</span> Earn XP, level up, and track your journey</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-2">📝 How to Use</h2>
          <ol className="list-decimal list-inside text-blue-100 space-y-1">
            <li>Pick a quest from the Quest Map or try the Daily Quest</li>
            <li>Read the challenge and submit your best AI prompt</li>
            <li>Get instant feedback and earn XP for your creativity</li>
            <li>Level up and unlock new challenges!</li>
          </ol>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-2">👩‍💻 Submission Info</h2>
          <ul className="text-blue-100 space-y-1">
            <li><span className="text-yellow-200">Team:</span> [Your Team Name]</li>
            <li><span className="text-yellow-200">Tech Stack:</span> Next.js, React, TypeScript, Framer Motion, Tailwind CSS, OpenAI API</li>
            <li><span className="text-yellow-200">Contact:</span> [Your Email or Discord]</li>
            <li><span className="text-yellow-200">GitHub:</span> <a href="[Your GitHub Repo]" className="underline text-yellow-300" target="_blank" rel="noopener noreferrer">[Your GitHub Repo]</a></li>
          </ul>
        </motion.div>
        <div className="flex justify-center mt-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-yellow-400 text-purple-900 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
            >
              ← Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
} 