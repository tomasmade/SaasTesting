
import { TestCampaign, TesterProfile, UserRole, TestAssignment } from './types';

export const MOCK_CURRENT_USER = {
  id: 'u1',
  name: 'Alice Product',
  role: UserRole.CREATOR,
  avatar: 'https://picsum.photos/200',
};

// Full profile for the logged-in tester scenario
export const MOCK_TESTER_FULL_PROFILE: TesterProfile = {
  id: 't1', 
  name: 'Jean Dev',
  role: UserRole.TESTER,
  avatar: 'https://picsum.photos/201',
  skills: ['React', 'SaaS', 'DevTools', 'API Testing'],
  devices: ['MacBook Pro', 'iPhone 14', 'iPad Air'],
  bio: 'Développeur senior passionné par l\'UX et la performance web.',
  rating: 4.8,
  jobTitle: 'Senior Frontend Engineer',
  industry: 'Tech / Software',
  yearsOfExperience: '5-10 ans'
};

export const MOCK_TESTER_USER = {
  id: 't1',
  name: 'Jean Dev',
  role: UserRole.TESTER,
  avatar: 'https://picsum.photos/201',
};

export const MOCK_TESTERS: TesterProfile[] = [
  MOCK_TESTER_FULL_PROFILE,
  {
    id: 't2',
    name: 'Sophie Marketing',
    role: UserRole.TESTER,
    avatar: 'https://picsum.photos/202',
    skills: ['E-commerce', 'Social Media', 'No-code'],
    devices: ['Windows Laptop', 'Android Tablet'],
    bio: 'Marketeuse freelance, aime les UX fluides.',
    rating: 4.5,
    jobTitle: 'Growth Marketer',
    industry: 'Marketing',
    yearsOfExperience: '2-5 ans'
  },
  {
    id: 't3',
    name: 'Lucas Gamer',
    role: UserRole.TESTER,
    avatar: 'https://picsum.photos/203',
    skills: ['Gaming', 'Consumer Apps', 'Video'],
    devices: ['Desktop PC', 'iPad Pro'],
    bio: 'Étudiant et early adopter de nouvelles apps.',
    rating: 4.9,
    jobTitle: 'Étudiant',
    industry: 'Consumer Tech',
    yearsOfExperience: '0-2 ans'
  },
  {
    id: 't4',
    name: 'Marc Finance',
    role: UserRole.TESTER,
    avatar: 'https://picsum.photos/204',
    skills: ['Excel', 'Fintech', 'Accounting', 'Data Analysis'],
    devices: ['Windows Desktop', 'iPhone 13'],
    bio: 'Comptable rigoureux, utilise beaucoup de logiciels complexes.',
    rating: 4.7,
    jobTitle: 'Comptable',
    industry: 'Finance',
    yearsOfExperience: '10+ ans'
  },
  {
    id: 't5',
    name: 'Sarah Designer',
    role: UserRole.TESTER,
    avatar: 'https://picsum.photos/205',
    skills: ['Figma', 'Adobe Suite', 'Accessibility', 'UI/UX'],
    devices: ['MacBook Air', 'iPad Pro', 'Pixel 7'],
    bio: 'Product Designer freelance, très sensible à l\'accessibilité.',
    rating: 5.0,
    jobTitle: 'Product Designer',
    industry: 'Design',
    yearsOfExperience: '5-10 ans'
  }
];

export const MOCK_CAMPAIGNS: TestCampaign[] = [
  {
    id: 'c1',
    title: 'Nouvel Onboarding Dashboard',
    description: 'Nous testons un nouveau flux de bienvenue pour les utilisateurs SaaS B2B.',
    targetAudience: 'Utilisateurs professionnels, habitués aux CRM.',
    status: 'ACTIVE',
    createdAt: '2023-10-25',
    reward: 25,
    maxTesters: 10,
    feedbacks: [
      {
        id: 'f1',
        testerId: 't1',
        testerName: 'Jean Dev',
        content: "Le flux est clair, mais l'étape de connexion API est un peu confuse. Le bouton 'Skip' est trop petit.",
        rating: 4,
        sentiment: 'neutral',
        date: '2023-10-26',
        type: 'IDEA',
        taskSuccess: true,
        deviceInfo: 'Chrome / MacOS'
      },
      {
        id: 'f2',
        testerId: 't2',
        testerName: 'Sophie Marketing',
        content: "J'adore les illustrations ! Par contre ça a planté quand j'ai uploadé mon logo.",
        rating: 3,
        sentiment: 'negative',
        date: '2023-10-27',
        type: 'BUG',
        taskSuccess: false,
        screenshotUrl: 'https://placehold.co/600x400/png?text=Error+Screenshot',
        deviceInfo: 'Safari / iPad'
      }
    ]
  },
  {
    id: 'c2',
    title: 'Feature Export PDF',
    description: 'Validation du rendu des factures en PDF.',
    targetAudience: 'Comptables, Freelances.',
    status: 'COMPLETED',
    createdAt: '2023-10-10',
    reward: 15,
    maxTesters: 5,
    feedbacks: []
  }
];

export const MOCK_ASSIGNMENTS: TestAssignment[] = [
  {
    id: 'a1',
    campaignId: 'c1', // Jean Dev is assigned to Onboarding Dashboard
    testerId: 't1',
    status: 'COMPLETED', // He already gave feedback f1
    invitedAt: '2023-10-25'
  },
  {
    id: 'a2',
    campaignId: 'c2', 
    testerId: 't1',
    status: 'INVITED', // Pending invite for Jean Dev
    invitedAt: '2023-10-10'
  }
];
