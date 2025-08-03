'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Brain, Zap, X, RefreshCw } from 'lucide-react';

interface AIHintSystemProps {
  questTitle: string;
  questChallenge: string;
  questDifficulty: string;
  useRealAI?: boolean; // Toggle between fake and real AI
}

interface Hint {
  id: string;
  type: 'general' | 'specific' | 'example' | 'strategy';
  content: string;
  confidence: number;
  cost: number; // XP cost for using hint
}

// Scripted fake AI hints that look intelligent
const fakeAIHints: Record<string, Hint[]> = {
  'Prompt Basics': [
    {
      id: '1',
      type: 'strategy',
      content: "Start with a clear subject and ask for specific details. Try: 'Write a paragraph about the solar system, focusing on the planets and their unique characteristics.'",
      confidence: 0.92,
      cost: 5
    },
    {
      id: '2',
      type: 'example',
      content: "Example structure: [Topic] + [Specific request] + [Desired output format]. Like: 'Explain the solar system in a paragraph suitable for middle school students.'",
      confidence: 0.88,
      cost: 3
    },
    {
      id: '3',
      type: 'general',
      content: "Be specific about what you want. Instead of 'tell me about space', try 'describe the solar system's planets in order from the sun.'",
      confidence: 0.85,
      cost: 2
    }
  ],
  'Creative Writing': [
    {
      id: '1',
      type: 'strategy',
      content: "Set the mood and emotion first. Try: 'Write a nostalgic poem about childhood memories of playing in the rain, using vivid sensory details.'",
      confidence: 0.94,
      cost: 5
    },
    {
      id: '2',
      type: 'example',
      content: "Include emotional triggers: 'Create a poem that captures the innocence of childhood and the magic of rain, with imagery of puddles and laughter.'",
      confidence: 0.89,
      cost: 3
    },
    {
      id: '3',
      type: 'general',
      content: "Mention the desired tone and style. Specify if you want it rhyming, free verse, or a particular length.",
      confidence: 0.87,
      cost: 2
    }
  ],
  'Image Prompting': [
    {
      id: '1',
      type: 'strategy',
      content: "Include visual elements: lighting, style, mood, and composition. Try: 'A neon-lit cyberpunk cityscape at night with flying cars, rain-slicked streets, and towering skyscrapers.'",
      confidence: 0.96,
      cost: 5
    },
    {
      id: '2',
      type: 'example',
      content: "Add artistic style: 'Cyberpunk city at night, neon lights reflecting in puddles, cinematic lighting, detailed architecture, 4K quality.'",
      confidence: 0.91,
      cost: 3
    },
    {
      id: '3',
      type: 'general',
      content: "Specify the art style, lighting, and mood. Include details about colors, atmosphere, and perspective.",
      confidence: 0.88,
      cost: 2
    }
  ],
  'Math Mage Challenge': [
    {
      id: '1',
      type: 'strategy',
      content: "Ask for step-by-step explanation: 'Solve this quadratic equation step by step, showing your work and explaining each step clearly.'",
      confidence: 0.93,
      cost: 5
    },
    {
      id: '2',
      type: 'example',
      content: "Include the equation: 'Solve x² + 5x + 6 = 0 step by step, showing the factoring process and explaining why each step works.'",
      confidence: 0.90,
      cost: 3
    },
    {
      id: '3',
      type: 'general',
      content: "Request detailed explanations and ask for the reasoning behind each mathematical step.",
      confidence: 0.86,
      cost: 2
    }
  ],
  'AI Dungeon Explorer': [
    {
      id: '1',
      type: 'strategy',
      content: "Set the scene and character: 'Start an epic fantasy adventure where I play as a time-traveling knight with a magical sword that glows in the presence of danger.'",
      confidence: 0.95,
      cost: 5
    },
    {
      id: '2',
      type: 'example',
      content: "Include setting details: 'Begin a fantasy adventure in a mystical forest where ancient ruins hold secrets, and I'm a hero with unique abilities.'",
      confidence: 0.92,
      cost: 3
    },
    {
      id: '3',
      type: 'general',
      content: "Describe your character's abilities, the setting, and what kind of adventure you want to experience.",
      confidence: 0.89,
      cost: 2
    }
  ]
};

// Generic hints for any quest
const genericHints: Hint[] = [
  {
    id: 'generic1',
    type: 'strategy',
    content: "Be specific about what you want. Include details about format, length, style, and target audience.",
    confidence: 0.85,
    cost: 3
  },
  {
    id: 'generic2',
    type: 'example',
    content: "Use this structure: [What you want] + [How you want it] + [For whom/why]. Example: 'Write a [description] in [format] for [audience].'",
    confidence: 0.82,
    cost: 2
  },
  {
    id: 'generic3',
    type: 'general',
    content: "Start with the main request, then add context and specifications. Be clear about your expectations.",
    confidence: 0.80,
    cost: 1
  }
];

export default function AIHintSystem({ 
  questTitle, 
  questChallenge, 
  questDifficulty, 
  useRealAI = false 
}: AIHintSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHint, setCurrentHint] = useState<Hint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hintHistory, setHintHistory] = useState<Hint[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  const getHintsForQuest = (): Hint[] => {
    return fakeAIHints[questTitle] || genericHints;
  };

  const generateFakeAIHint = async (): Promise<Hint> => {
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const hints = getHintsForQuest();
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    
    // Add some randomness to make it feel more AI-like
    const variations = [
      "Based on my analysis of your quest, I'd suggest...",
      "Looking at the challenge requirements, here's what I recommend...",
      "From my understanding of prompt engineering, try this approach...",
      "Considering the difficulty level, I think you should...",
      "My analysis suggests this strategy would work well..."
    ];
    
    return {
      ...randomHint,
      content: `${variations[Math.floor(Math.random() * variations.length)]} ${randomHint.content}`,
      confidence: randomHint.confidence + (Math.random() * 0.1 - 0.05) // Add some variance
    };
  };

  const generateRealAIHint = async (): Promise<Hint> => {
    try {
      const response = await fetch('/api/ai-hint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questTitle,
          questChallenge,
          questDifficulty,
          hintHistory: hintHistory.map(h => h.content)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI hint');
      }

      const data = await response.json();
      return {
        id: Date.now().toString(),
        type: 'strategy',
        content: data.hint,
        confidence: data.confidence || 0.85,
        cost: 5
      };
    } catch (error) {
      console.error('Error getting real AI hint:', error);
      // Fallback to fake AI
      return generateFakeAIHint();
    }
  };

  const handleGetHint = async () => {
    setIsLoading(true);
    
    try {
      const hint = useRealAI ? await generateRealAIHint() : await generateFakeAIHint();
      
      setCurrentHint(hint);
      setHintHistory(prev => [...prev, hint]);
      setTotalCost(prev => prev + hint.cost);
      
      // Add to localStorage for persistence
      const existingHints = JSON.parse(localStorage.getItem('hintHistory') || '[]');
      localStorage.setItem('hintHistory', JSON.stringify([...existingHints, hint]));
      
    } catch (error) {
      console.error('Error generating hint:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentHint(null);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.8) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.9) return 'Very Confident';
    if (confidence >= 0.8) return 'Confident';
    return 'Somewhat Confident';
  };

  return (
    <>
      {/* Hint Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 glass rounded-full p-4 shadow-2xl border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 group"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300" />
          </motion.div>
          <span className="text-white font-semibold hidden md:block">
            {useRealAI ? '🤖 AI Hint' : '💡 Need a Hint?'}
          </span>
        </div>
      </motion.button>

      {/* Hint Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Brain className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {useRealAI ? '🤖 AI Assistant' : '💡 Smart Hint System'}
                    </h3>
                    <p className="text-blue-200 text-sm">
                      {useRealAI ? 'Powered by GPT' : 'Intelligent guidance'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Quest Info */}
              <div className="glass-dark rounded-xl p-4 mb-6 border border-white/20">
                <h4 className="text-lg font-semibold text-white mb-2">{questTitle}</h4>
                <p className="text-blue-200 text-sm mb-3">{questChallenge}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {questDifficulty}
                  </span>
                  <span className="text-xs text-yellow-400">
                    Total Cost: {totalCost} XP
                  </span>
                </div>
              </div>

              {/* Current Hint */}
              {currentHint && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-dark rounded-xl p-6 mb-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">Latest Hint</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(currentHint.confidence)} bg-opacity-20`}>
                      {getConfidenceText(currentHint.confidence)} ({Math.round(currentHint.confidence * 100)}%)
                    </span>
                  </div>
                  <p className="text-white leading-relaxed mb-4">{currentHint.content}</p>
                  <div className="flex items-center justify-between text-sm text-blue-200">
                    <span>Cost: {currentHint.cost} XP</span>
                    <span>Type: {currentHint.type}</span>
                  </div>
                </motion.div>
              )}

              {/* Hint History */}
              {hintHistory.length > 1 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Previous Hints</h4>
                  <div className="space-y-3">
                    {hintHistory.slice(0, -1).map((hint, index) => (
                      <motion.div
                        key={hint.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-dark rounded-lg p-3 border border-white/10"
                      >
                        <p className="text-blue-200 text-sm">{hint.content}</p>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                          <span>Cost: {hint.cost} XP</span>
                          <span>{Math.round(hint.confidence * 100)}% confidence</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGetHint}
                  disabled={isLoading}
                  className="flex-1 glass-dark rounded-xl p-4 border border-yellow-400/30 hover:border-yellow-400/60 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 text-yellow-400 animate-spin" />
                    ) : (
                      <Zap className="w-5 h-5 text-yellow-400" />
                    )}
                    <span className="text-white font-semibold">
                      {isLoading ? 'Thinking...' : 'Get New Hint'}
                    </span>
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="px-6 py-4 glass-dark rounded-xl border border-white/20 hover:border-white/40 transition-colors"
                >
                  <span className="text-white font-semibold">Close</span>
                </motion.button>
              </div>

              {/* AI Status */}
              <div className="mt-4 text-center">
                <p className="text-xs text-blue-200">
                  {useRealAI 
                    ? '🤖 Connected to GPT API for real AI assistance'
                    : '💡 Using intelligent scripted hints (no API required)'
                  }
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 