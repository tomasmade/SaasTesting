export enum UserRole {
  CREATOR = 'CREATOR',
  TESTER = 'TESTER'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface TesterProfile extends User {
  skills: string[];
  devices: string[];
  bio: string;
  rating: number;
}

export interface Feedback {
  id: string;
  testerId: string;
  testerName: string;
  content: string;
  rating: number; // 1-5
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string;
}

export interface TestCampaign {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
  createdAt: string;
  feedbacks: Feedback[];
  reward: number; // Amount in $
}

export interface AIMatchResult {
  testerId: string;
  matchScore: number;
  reason: string;
}
