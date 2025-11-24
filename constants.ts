import { TestCampaign, TesterProfile, UserRole } from './types';

export const MOCK_CURRENT_USER = {
  id: 'u1',
  name: 'Alice Product',
  role: UserRole.CREATOR,
  avatar: 'https://picsum.photos/200',
};

export const MOCK_TESTERS: TesterProfile[] = [
  {
    id: 't1',
    name: 'Jean Dev',
    role: UserRole.TESTER,
    avatar: 'https://picsum.photos/201',
    skills: ['React', 'SaaS', 'DevTools'],
    devices: ['MacBook Pro', 'iPhone 14'],
    bio: 'Développeur senior, habitué aux outils techniques.',
    rating: 4.8
  },
  {
    id: 't2',
    name: 'Sophie Marketing',
    role: UserRole.TESTER,
    avatar: 'https://picsum.photos/202',
    skills: ['E-commerce', 'Social Media', 'No-code'],
    devices: ['Windows Laptop', 'Android Tablet'],
    bio: 'Marketeuse freelance, aime les UX fluides.',
    rating: 4.5
  },
  {
    id: 't3',
    name: 'Lucas Gamer',
    role: UserRole.TESTER,
    avatar: 'https://picsum.photos/203',
    skills: ['Gaming', 'Consumer Apps', 'Video'],
    devices: ['Desktop PC', 'iPad Pro'],
    bio: 'Étudiant et early adopter de nouvelles apps.',
    rating: 4.9
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
    feedbacks: [
      {
        id: 'f1',
        testerId: 't1',
        testerName: 'Jean Dev',
        content: "Le flux est clair, mais l'étape de connexion API est un peu confuse. Le bouton 'Skip' est trop petit.",
        rating: 4,
        sentiment: 'neutral',
        date: '2023-10-26'
      },
      {
        id: 'f2',
        testerId: 't2',
        testerName: 'Sophie Marketing',
        content: "J'adore les illustrations ! C'est très accueillant. Tout a fonctionné parfaitement pour moi.",
        rating: 5,
        sentiment: 'positive',
        date: '2023-10-27'
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
    feedbacks: []
  }
];
