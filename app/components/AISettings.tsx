'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Brain, Zap, Key, ToggleLeft, ToggleRight } from 'lucide-react';

interface AISettingsProps {
  useRealAI: boolean;
  onToggleAI: (useReal: boolean) => void;
}

export default function AISettings({ useRealAI, onToggleAI }: AISettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleToggleAI = () => {
    if (!useRealAI && !apiKey) {
      // Prompt for API key if switching to real AI
      const key = prompt('Enter your OpenAI API key to enable real AI hints:');
      if (key) {
        setApiKey(key);
        onToggleAI(true);
      }
    } else {
      onToggleAI(!useRealAI);
    }
  };

  const handleSaveAPIKey = () => {
    if (apiKey) {
      // In a real app, you'd save this securely
      localStorage.setItem('openai_api_key', apiKey);
      alert('API key saved! (Note: In production, use environment variables)');
    }
  };

  return (
    <>
      {/* Settings Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 glass rounded-full p-4 shadow-2xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 group"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Settings className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
          </motion.div>
          <span className="text-white font-semibold hidden md:block">
            AI Settings
          </span>
        </div>
      </motion.button>

      {/* Settings Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-2xl font-bold text-white">AI Settings</h3>
                  <p className="text-blue-200 text-sm">Configure your AI hint system</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Settings className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* AI Mode Toggle */}
            <div className="glass-dark rounded-xl p-4 mb-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {useRealAI ? (
                    <Zap className="w-6 h-6 text-green-400" />
                  ) : (
                    <Brain className="w-6 h-6 text-yellow-400" />
                  )}
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {useRealAI ? 'Real AI (GPT)' : 'Scripted AI'}
                    </h4>
                    <p className="text-blue-200 text-sm">
                      {useRealAI 
                        ? 'Uses OpenAI GPT for dynamic hints'
                        : 'Uses intelligent scripted hints'
                      }
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleToggleAI}
                  className="flex items-center gap-2 p-3 rounded-xl glass-dark border border-white/20 hover:border-white/40 transition-colors"
                >
                  {useRealAI ? (
                    <ToggleRight className="w-5 h-5 text-green-400" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-yellow-400" />
                  )}
                  <span className="text-white font-semibold text-sm">
                    {useRealAI ? 'ON' : 'OFF'}
                  </span>
                </motion.button>
              </div>

              {/* Status */}
              <div className="text-sm text-blue-200">
                <p>
                  <span className="font-semibold">Status:</span> {
                    useRealAI 
                      ? '✅ Connected to GPT API'
                      : '💡 Using scripted hints (no API required)'
                  }
                </p>
                <p className="mt-1">
                  <span className="font-semibold">Cost:</span> {
                    useRealAI 
                      ? 'API calls may incur charges'
                      : 'Free - no external API calls'
                  }
                </p>
              </div>
            </div>

            {/* API Key Input (for real AI) */}
            {useRealAI && (
              <div className="glass-dark rounded-xl p-4 mb-6 border border-white/20">
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-lg font-semibold text-white">OpenAI API Key</h4>
                </div>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-yellow-400/60 focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveAPIKey}
                    className="w-full p-3 rounded-lg bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 font-semibold hover:bg-yellow-400/30 transition-colors"
                  >
                    Save API Key
                  </motion.button>
                </div>
                <p className="text-xs text-blue-200 mt-2">
                  ⚠️ For production, use environment variables instead of storing keys in localStorage
                </p>
              </div>
            )}

            {/* Features Comparison */}
            <div className="glass-dark rounded-xl p-4 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3">Features</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-blue-200">Scripted AI: Always available, no API costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-blue-200">Real AI: Dynamic, contextual responses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⚠</span>
                  <span className="text-blue-200">Real AI: Requires API key and may incur costs</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(false)}
              className="w-full mt-6 p-4 glass-dark rounded-xl border border-white/20 hover:border-white/40 transition-colors"
            >
              <span className="text-white font-semibold">Close</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
} 