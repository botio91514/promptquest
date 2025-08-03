'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Star, TrendingUp, Users, Award } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  badges: number;
  achievements: number;
  rank: number;
}

interface LeaderboardProps {
  currentUserId?: string;
}

export default function Leaderboard({ currentUserId }: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');

  // Mock leaderboard data (in real app, this would come from Supabase)
  useEffect(() => {
    const mockData: LeaderboardEntry[] = [
      {
        id: 'user1',
        name: 'Alex Chen',
        avatar: '🧙‍♂️',
        xp: 2840,
        level: 28,
        streak: 15,
        badges: 8,
        achievements: 12,
        rank: 1
      },
      {
        id: 'user2',
        name: 'Sarah Kim',
        avatar: '🧙‍♀️',
        xp: 2150,
        level: 21,
        streak: 12,
        badges: 6,
        achievements: 9,
        rank: 2
      },
      {
        id: 'user3',
        name: 'Mike Rodriguez',
        avatar: '👨‍💻',
        xp: 1890,
        level: 18,
        streak: 8,
        badges: 5,
        achievements: 7,
        rank: 3
      },
      {
        id: 'user4',
        name: 'Emma Wilson',
        avatar: '👩‍💻',
        xp: 1650,
        level: 16,
        streak: 6,
        badges: 4,
        achievements: 6,
        rank: 4
      },
      {
        id: 'user5',
        name: 'David Park',
        avatar: '🦸‍♂️',
        xp: 1420,
        level: 14,
        streak: 5,
        badges: 3,
        achievements: 5,
        rank: 5
      },
      {
        id: 'user6',
        name: 'Lisa Thompson',
        avatar: '🦸‍♀️',
        xp: 1180,
        level: 11,
        streak: 4,
        badges: 2,
        achievements: 4,
        rank: 6
      },
      {
        id: 'user7',
        name: 'James Lee',
        avatar: '👨‍🎨',
        xp: 950,
        level: 9,
        streak: 3,
        badges: 2,
        achievements: 3,
        rank: 7
      },
      {
        id: 'user8',
        name: 'Anna Garcia',
        avatar: '👩‍🎨',
        xp: 720,
        level: 7,
        streak: 2,
        badges: 1,
        achievements: 2,
        rank: 8
      }
    ];

    // Add current user if they have data
    const currentUser = localStorage.getItem('promptQuestUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      const currentUserEntry: LeaderboardEntry = {
        id: userData.id || 'current-user',
        name: userData.name || 'You',
        avatar: userData.avatar || '🎮',
        xp: userData.xp || 0,
        level: userData.level || 1,
        streak: userData.streak || 0,
        badges: userData.badges?.length || 0,
        achievements: userData.achievements?.length || 0,
        rank: 0 // Will be calculated
      };
      
      // Insert current user into appropriate position
      const allUsers = [...mockData, currentUserEntry];
      allUsers.sort((a, b) => b.xp - a.xp);
      
      // Update ranks
      allUsers.forEach((user, index) => {
        user.rank = index + 1;
      });
      
      setLeaderboardData(allUsers);
    } else {
      setLeaderboardData(mockData);
    }
    
    setIsLoading(false);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Medal className="w-5 h-5 text-orange-400" />;
      default: return <Trophy className="w-4 h-4 text-blue-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3: return 'bg-gradient-to-r from-orange-400 to-red-500';
      default: return 'bg-gradient-to-r from-blue-500 to-purple-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-8 h-8 text-yellow-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">Leaderboard</h2>
          <Users className="w-8 h-8 text-purple-400" />
        </div>
        <p className="text-blue-200 text-lg">Top PromptQuest Champions</p>
      </motion.div>

      {/* Time Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-2"
      >
        {[
          { key: 'all', label: 'All Time' },
          { key: 'week', label: 'This Week' },
          { key: 'month', label: 'This Month' }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setTimeFilter(filter.key as any)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              timeFilter === filter.key
                ? 'bg-yellow-400 text-purple-900'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        {leaderboardData.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className={`glass rounded-xl p-4 md:p-6 border-2 transition-all ${
              user.id === currentUserId
                ? 'border-yellow-400/50 bg-yellow-400/10'
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Rank and Avatar */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${getRankColor(user.rank)}`}>
                    {getRankIcon(user.rank)}
                  </div>
                  <span className="text-white font-bold text-lg md:text-xl">#{user.rank}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-3xl md:text-4xl">{user.avatar}</div>
                  <div>
                    <h3 className="text-white font-semibold text-base md:text-lg">
                      {user.name}
                      {user.id === currentUserId && (
                        <span className="ml-2 text-yellow-400 text-sm">(You)</span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm">
                      <span>Level {user.level}</span>
                      <span>•</span>
                      <span>{user.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg md:text-xl">
                    {user.xp.toLocaleString()} XP
                  </div>
                  <div className="text-blue-200 text-xs">Total XP</div>
                </div>
                
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-green-400 font-semibold text-sm">
                      {user.badges} badges
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-semibold text-sm">
                      {user.achievements} achievements
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="md:hidden mt-3 flex items-center justify-between text-xs text-blue-200">
              <span>{user.badges} badges</span>
              <span>{user.achievements} achievements</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
      >
        <div className="glass rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-white font-semibold">Total Players</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{leaderboardData.length}</div>
        </div>
        
        <div className="glass rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold">Total XP</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {leaderboardData.reduce((sum, user) => sum + user.xp, 0).toLocaleString()}
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold">Avg Level</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            {Math.round(leaderboardData.reduce((sum, user) => sum + user.level, 0) / leaderboardData.length)}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 