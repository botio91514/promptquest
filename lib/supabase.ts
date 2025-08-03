import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email?: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  last_activity: string;
  created_at: string;
  updated_at: string;
}

export interface QuestSubmission {
  id: string;
  user_id: string;
  quest_id: string;
  user_prompt: string;
  ai_score: number;
  ai_feedback: any;
  earned_xp: number;
  submitted_at: string;
}

export interface Badge {
  id: string;
  user_id: string;
  badge_type: string;
  badge_name: string;
  badge_description: string;
  earned_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  achievement_name: string;
  achievement_description: string;
  earned_at: string;
} 