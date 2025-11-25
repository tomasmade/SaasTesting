
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
  jobTitle?: string;
  industry?: string;
  yearsOfExperience?: string;
}

export type FeedbackType = 'BUG' | 'IDEA' | 'GENERAL';

export interface Feedback {
  id: string;
  testerId: string;
  testerName: string;
  content: string;
  rating: number; // 1-5
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string;
  // New qualitative fields
  type: FeedbackType;
  taskSuccess?: boolean; // Did user complete their goal?
  screenshotUrl?: string; // URL of the screenshot
  deviceInfo?: string;
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
  maxTesters: number; // Limit of testers allowed
}

export interface AIMatchResult {
  testerId: string;
  matchScore: number;
  reason: string;
}

export type AssignmentStatus = 'INVITED' | 'IN_PROGRESS' | 'COMPLETED';

export interface TestAssignment {
  id: string;
  campaignId: string;
  testerId: string;
  status: AssignmentStatus;
  invitedAt: string;
}
