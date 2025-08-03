// lib/userProgress.ts

export type UserProgress = {
  id?: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lastActivity: string;
  completedQuests: string[];
  badges: Badge[];
  achievements: Achievement[];
};

export interface Badge {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Achievement {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export const getInitialProgress = (): UserProgress => ({
  name: '',
  avatar: '🧙‍♂️',
  xp: 0,
  level: 1,
  streak: 0,
  lastActivity: new Date().toISOString(),
  completedQuests: [],
  badges: [],
  achievements: [],
});

export const calculateLevel = (xp: number) => {
  return Math.floor(xp / 100) + 1;
};

export const calculateXPForLevel = (level: number) => {
  return (level - 1) * 100;
};

export const updateProgress = (
  progress: UserProgress,
  questId: string,
  earnedXP: number,
  score: number
): UserProgress => {
  const now = new Date();
  const lastActivity = new Date(progress.lastActivity);
  const daysSinceLastActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
  
  // Update streak
  let newStreak = progress.streak;
  if (daysSinceLastActivity <= 1) {
    newStreak += 1;
  } else {
    newStreak = 1; // Reset streak if more than 1 day gap
  }

  const alreadyCompleted = progress.completedQuests.includes(questId);
  const newXP = progress.xp + (alreadyCompleted ? 0 : earnedXP);
  const newLevel = calculateLevel(newXP);

  // Check for new badges and achievements
  const newBadges = checkForNewBadges(progress, newXP, newStreak, score);
  const newAchievements = checkForNewAchievements(progress, newXP, newStreak);

  return {
    ...progress,
    xp: newXP,
    level: newLevel,
    streak: newStreak,
    lastActivity: now.toISOString(),
    completedQuests: alreadyCompleted
      ? progress.completedQuests
      : [...progress.completedQuests, questId],
    badges: [...progress.badges, ...newBadges],
    achievements: [...progress.achievements, ...newAchievements],
  };
};

export const checkForNewBadges = (
  currentProgress: UserProgress,
  newXP: number,
  newStreak: number,
  score: number
): Badge[] => {
  const newBadges: Badge[] = [];
  const now = new Date().toISOString();

  // XP-based badges
  if (newXP >= 100 && !currentProgress.badges.find(b => b.type === 'xp_100')) {
    newBadges.push({
      id: `badge_${Date.now()}_1`,
      type: 'xp_100',
      name: 'First Steps',
      description: 'Earned 100 XP',
      icon: '🌟',
      earnedAt: now,
    });
  }

  if (newXP >= 500 && !currentProgress.badges.find(b => b.type === 'xp_500')) {
    newBadges.push({
      id: `badge_${Date.now()}_2`,
      type: 'xp_500',
      name: 'Prompt Apprentice',
      description: 'Earned 500 XP',
      icon: '🎯',
      earnedAt: now,
    });
  }

  if (newXP >= 1000 && !currentProgress.badges.find(b => b.type === 'xp_1000')) {
    newBadges.push({
      id: `badge_${Date.now()}_3`,
      type: 'xp_1000',
      name: 'Prompt Master',
      description: 'Earned 1000 XP',
      icon: '👑',
      earnedAt: now,
    });
  }

  // Streak-based badges
  if (newStreak >= 3 && !currentProgress.badges.find(b => b.type === 'streak_3')) {
    newBadges.push({
      id: `badge_${Date.now()}_4`,
      type: 'streak_3',
      name: 'Consistent Learner',
      description: '3-day streak',
      icon: '🔥',
      earnedAt: now,
    });
  }

  if (newStreak >= 7 && !currentProgress.badges.find(b => b.type === 'streak_7')) {
    newBadges.push({
      id: `badge_${Date.now()}_5`,
      type: 'streak_7',
      name: 'Week Warrior',
      description: '7-day streak',
      icon: '⚡',
      earnedAt: now,
    });
  }

  // Score-based badges
  if (score >= 9 && !currentProgress.badges.find(b => b.type === 'perfect_score')) {
    newBadges.push({
      id: `badge_${Date.now()}_6`,
      type: 'perfect_score',
      name: 'Perfect Prompt',
      description: 'Scored 9+ on a quest',
      icon: '💎',
      earnedAt: now,
    });
  }

  return newBadges;
};

export const checkForNewAchievements = (
  currentProgress: UserProgress,
  newXP: number,
  newStreak: number
): Achievement[] => {
  const newAchievements: Achievement[] = [];
  const now = new Date().toISOString();

  // Level-based achievements
  const newLevel = calculateLevel(newXP);
  if (newLevel >= 5 && !currentProgress.achievements.find(a => a.type === 'level_5')) {
    newAchievements.push({
      id: `achievement_${Date.now()}_1`,
      type: 'level_5',
      name: 'Rising Star',
      description: 'Reached Level 5',
      icon: '⭐',
      earnedAt: now,
    });
  }

  if (newLevel >= 10 && !currentProgress.achievements.find(a => a.type === 'level_10')) {
    newAchievements.push({
      id: `achievement_${Date.now()}_2`,
      type: 'level_10',
      name: 'Expert Prompter',
      description: 'Reached Level 10',
      icon: '🏆',
      earnedAt: now,
    });
  }

  // Quest completion achievements
  const completedCount = currentProgress.completedQuests.length + 1;
  if (completedCount >= 5 && !currentProgress.achievements.find(a => a.type === 'quests_5')) {
    newAchievements.push({
      id: `achievement_${Date.now()}_3`,
      type: 'quests_5',
      name: 'Quest Explorer',
      description: 'Completed 5 quests',
      icon: '🗺️',
      earnedAt: now,
    });
  }

  if (completedCount >= 10 && !currentProgress.achievements.find(a => a.type === 'quests_10')) {
    newAchievements.push({
      id: `achievement_${Date.now()}_4`,
      type: 'quests_10',
      name: 'Quest Master',
      description: 'Completed 10 quests',
      icon: '🎖️',
      earnedAt: now,
    });
  }

  return newAchievements;
};

export const saveProgressToLocalStorage = (progress: UserProgress) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('promptQuestUser', JSON.stringify(progress));
  }
};

export const loadProgressFromLocalStorage = (): UserProgress | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('promptQuestUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure all required fields exist for backward compatibility
      return {
        name: parsed.name || '',
        avatar: parsed.avatar || '🧙‍♂️',
        xp: parsed.xp || 0,
        level: parsed.level || 1,
        streak: parsed.streak || 0,
        lastActivity: parsed.lastActivity || new Date().toISOString(),
        completedQuests: parsed.completedQuests || [],
        badges: Array.isArray(parsed.badges) ? parsed.badges : [],
        achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
      };
    }
    return null;
  }
  return null;
};