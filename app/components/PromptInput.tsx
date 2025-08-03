'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Lightbulb, RefreshCw } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export default function PromptInput({ 
  onSubmit, 
  placeholder = "Write your prompt here...",
  isLoading = false 
}: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  const handleClear = () => {
    setPrompt('');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prompt Input Area */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full px-3 md:px-4 py-3 glass rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all text-sm md:text-base"
            disabled={isLoading}
          />
          
          {/* Character Count */}
          <div className="absolute bottom-2 right-2 text-xs text-blue-300 bg-black/20 px-2 py-1 rounded">
            {prompt.length} characters
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="btn-secondary text-sm py-2 md:py-3"
              disabled={isLoading || !prompt}
            >
              <RefreshCw className="w-4 h-4" />
              Clear
            </motion.button>
            
            <div className="flex items-center gap-1 text-blue-300 text-xs md:text-sm px-3 py-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">💡 Tip: Be specific and clear</span>
              <span className="sm:hidden">💡 Be specific</span>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!prompt.trim() || isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.div>
                <span className="loading-dots">Analyzing</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Submit Prompt</span>
                <span className="sm:hidden">Submit</span>
              </>
            )}
          </motion.button>
        </div>
      </form>

      {/* Quick Tips */}
      <div className="glass rounded-lg p-3 md:p-4 border border-white/10">
        <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          🎯 Quick Tips for Better Prompts:
        </h4>
        <ul className="text-blue-200 text-xs md:text-sm space-y-1">
          <li>✨ Be specific about what you want</li>
          <li>📝 Provide context and examples when helpful</li>
          <li>🎯 Use clear, direct language</li>
          <li>📋 Specify the format you want for the output</li>
        </ul>
      </div>
    </div>
  );
}