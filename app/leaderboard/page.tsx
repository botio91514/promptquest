'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Leaderboard from '../components/Leaderboard';
import Aurora from '../components/Aurora';

export default function LeaderboardPage() {
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
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Back to Home */}
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 glass rounded-lg hover:border-white/40 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold hidden sm:inline">Back to Home</span>
                </motion.button>
              </Link>
              {/* Back to Quest Hub */}
              <Link href="/quests">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 glass rounded-lg hover:border-white/40 transition-colors flex items-center gap-2 ml-2"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold hidden sm:inline">Back to Quest Hub</span>
                </motion.button>
              </Link>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-white">Leaderboard</h1>
                <p className="text-blue-200 text-xs md:text-sm">See how you rank among other players</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 relative z-10">
        <Leaderboard />
      </div>
    </main>
  );
} 