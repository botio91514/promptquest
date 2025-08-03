'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles, Star } from 'lucide-react';

interface AvatarSetupProps {
  onComplete: (data: { name: string; avatar: string }) => void;
}

export default function AvatarSetup({ onComplete }: AvatarSetupProps) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🧙‍♂️');

  const avatars = [
    '🧙‍♂️', '🧙‍♀️', '👨‍💻', '👩‍💻', '🦸‍♂️', '🦸‍♀️', 
    '👨‍🎨', '👩‍🎨', '🧑‍🚀', '👨‍🔬', '👩‍🔬', '🧑‍🎓'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name: name.trim(), avatar: selectedAvatar });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Create Your Avatar</h2>
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-blue-200 text-lg">Customize your PromptQuest character to begin your adventure!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Input */}
          <div>
            <label className="block text-white font-semibold mb-3">
              What should we call you, brave adventurer?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your heroic name..."
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-white font-semibold mb-4">
              Choose your heroic avatar:
            </label>
            <div className="grid grid-cols-6 gap-3">
              {avatars.map((avatar) => (
                <motion.button
                  key={avatar}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-4xl p-3 rounded-lg border-2 transition-all ${
                    selectedAvatar === avatar
                      ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/25'
                      : 'border-white/20 glass hover:border-white/40'
                  }`}
                >
                  {avatar}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <motion.div 
            className="text-center p-6 glass rounded-lg border border-white/10"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="text-6xl mb-3"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {selectedAvatar}
            </motion.div>
            <p className="text-white text-xl font-semibold">
              {name || 'Your Heroic Name'}
            </p>
            <p className="text-blue-200">Level 1 • Prompt Apprentice</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-gray-600" />
              ))}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!name.trim()}
            className="w-full btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🚀 Begin My Epic Quest!
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}