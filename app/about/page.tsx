'use client';

import Aurora from '../components/Aurora';
import SplitText from '../components/SplitText';

export default function AboutPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="glass rounded-2xl max-w-2xl w-full p-8 border border-white/20 shadow-lg">
        <SplitText
          text="🎮 PromptQuest"
          className="text-3xl font-bold text-yellow-300 mb-4 text-center"
          delay={100}
          duration={0.7}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-50px"
          textAlign="center"
          onLetterAnimationComplete={() => {}}
        />
        <p className="text-blue-200 text-lg mb-6 text-center">
          A gamified prompt-solving tool to boost imagination, AI literacy, and creative writing through XP quests.
        </p>
        <ul className="list-disc list-inside text-blue-100 space-y-2 mb-8">
          <li>⚔️ <span className="text-yellow-200">Quest system</span> with XP and progress tracking</li>
          <li>🔁 <span className="text-yellow-200">Daily AI challenge</span> system</li>
          <li>🎉 <span className="text-yellow-200">Confetti & animations</span> using Framer Motion</li>
          <li>💡 <span className="text-yellow-200">Built on Bolt + Tailwind</span></li>
          <li>🚀 <span className="text-yellow-200">Future:</span> AI-powered prompt feedback using GPT</li>
        </ul>
        <div className="flex justify-center mt-8">
          <a href="/" className="bg-yellow-400 text-purple-900 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
} 