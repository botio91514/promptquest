# PromptQuest - AI-Powered Learning Platform 🎮✨

An advanced gamified learning platform that helps users master AI prompt engineering through interactive quests, real-time AI feedback, and comprehensive progress tracking.

## 🚀 Features

### Core Learning System
- **AI-Powered Scoring**: Get detailed feedback with scores from 1-10 using Google Gemini Pro
- **XP & Leveling**: Earn XP based on your score (score × 10) and level up
- **Streak Tracking**: Maintain daily streaks with LocalStorage persistence
- **Badge System**: Unlock badges for XP milestones, streaks, and perfect scores
- **Achievement System**: Earn achievements for level milestones and quest completion

### Enhanced Gamification
- **Daily Quests**: New creative challenges every day
- **Quest Categories**: Fundamentals, Creative Writing, Technical, Advanced
- **Progress Tracking**: Visual progress bars with streak indicators
- **Confetti Celebrations**: Animated celebrations for high scores and achievements
- **Detailed Feedback**: Breakdown of clarity, specificity, creativity, and effectiveness

### Technical Features
- **Real-time AI Feedback**: Instant scoring and detailed suggestions using Gemini Pro
- **LocalStorage Persistence**: Save progress locally
- **Supabase Integration**: Ready for database storage (optional)
- **Responsive Design**: Beautiful UI with Framer Motion animations
- **TypeScript**: Full type safety throughout the application

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Supabase Configuration (for future database features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Get Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 How It Works

### Scoring System
- **1-3**: Basic attempt, needs significant improvement
- **4-6**: Good effort, some clear areas for improvement  
- **7-8**: Strong prompt with minor refinements needed
- **9-10**: Exceptional prompt, demonstrates mastery

### XP Calculation
- XP earned = Score × 10
- Level up every 100 XP
- Streak bonus for consecutive days

### Badge System
- **First Steps**: Earn 100 XP
- **Prompt Apprentice**: Earn 500 XP
- **Prompt Master**: Earn 1000 XP
- **Consistent Learner**: 3-day streak
- **Week Warrior**: 7-day streak
- **Perfect Prompt**: Score 9+ on any quest

### Achievement System
- **Rising Star**: Reach Level 5
- **Expert Prompter**: Reach Level 10
- **Quest Explorer**: Complete 5 quests
- **Quest Master**: Complete 10 quests

## 📁 Project Structure

```
project/
├── app/
│   ├── api/feedback/route.ts    # Gemini Pro API integration
│   ├── components/              # React components
│   ├── daily/page.tsx          # Daily quest page
│   ├── quests/                 # Quest pages
│   └── page.tsx                # Main landing page
├── lib/
│   ├── supabase.ts             # Supabase configuration
│   └── userProgress.ts         # Progress tracking logic
└── utils/
    └── getDailyPrompt.ts       # Daily prompt generation
```

## 🔧 Customization

### Adding New Badges
Edit `lib/userProgress.ts` and add new badge conditions in `checkForNewBadges()`:

```typescript
if (newXP >= 2000 && !currentProgress.badges.find(b => b.type === 'xp_2000')) {
  newBadges.push({
    id: `badge_${Date.now()}_7`,
    type: 'xp_2000',
    name: 'Grand Master',
    description: 'Earned 2000 XP',
    icon: '👑',
    earnedAt: now,
  });
}
```

### Adding New Quests
Create new quest files in `app/quests/` and update the quest categories in `app/quests/page.tsx`.

### Customizing AI Feedback
Modify the system prompt in `app/api/feedback/route.ts` to adjust scoring criteria and feedback style.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the environment variables are set correctly
2. Ensure your Gemini API key is valid
3. Check the browser console for errors
4. Verify all dependencies are installed

## 🎉 What's Next?

Potential enhancements:
- **User Authentication**: Login/signup system
- **Leaderboards**: Compare with other users
- **Custom Quests**: User-generated content
- **Advanced Analytics**: Detailed progress insights
- **Mobile App**: React Native version
- **Real-time Multiplayer**: Collaborative learning
- **AI Tutor Mode**: Interactive AI conversations
- **Export Progress**: Share achievements on social media

---

**Happy Prompting! 🎮✨**
