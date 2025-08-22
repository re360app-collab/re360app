import { BookOpen, Target, FileText, Users, TrendingUp } from 'lucide-react';

export const learningCategories = [
  { id: 'all', label: 'All Courses', icon: BookOpen },
  { id: 'fundamentals', label: 'Loan Fundamentals', icon: Target },
  { id: 'programs', label: 'Loan Programs', icon: FileText },
  { id: 'qualification', label: 'Buyer Qualification', icon: Users },
  { id: 'advanced', label: 'Advanced Topics', icon: TrendingUp }
];

export const coursesData = [
  {
    id: 1,
    title: "Mortgage Lending Fundamentals",
    description: "Essential concepts every loan officer needs to know",
    category: 'fundamentals',
    type: 'video',
    duration: '45 min',
    difficulty: 'Beginner',
    modules: 6,
    rating: 4.8,
    thumbnail: 'mortgage-fundamentals-course',
    featured: true
  },
  {
    id: 2,
    title: "FHA Loan Guidelines & Requirements",
    description: "Complete guide to FHA lending with NMB",
    category: 'programs',
    type: 'interactive',
    duration: '60 min',
    difficulty: 'Intermediate',
    modules: 8,
    rating: 4.9,
    thumbnail: 'fha-loan-course'
  },
  {
    id: 3,
    title: "VA Loan Mastery",
    description: "Everything you need to know about VA lending",
    category: 'programs',
    type: 'video',
    duration: '55 min',
    difficulty: 'Intermediate',
    modules: 7,
    rating: 4.7,
    thumbnail: 'va-loan-course'
  },
  {
    id: 4,
    title: "Conventional Loan Processing",
    description: "Master conventional loan guidelines and processing",
    category: 'programs',
    type: 'document',
    duration: '40 min',
    difficulty: 'Intermediate',
    modules: 5,
    rating: 4.6,
    thumbnail: 'conventional-loan-course'
  },
  {
    id: 5,
    title: "Buyer Qualification Strategies",
    description: "Effective techniques for qualifying potential buyers",
    category: 'qualification',
    type: 'interactive',
    duration: '35 min',
    difficulty: 'Beginner',
    modules: 4,
    rating: 4.8,
    thumbnail: 'buyer-qualification-course'
  },
  {
    id: 6,
    title: "DSCR Investment Loans",
    description: "Specialized training for investment property lending",
    category: 'advanced',
    type: 'video',
    duration: '50 min',
    difficulty: 'Advanced',
    modules: 6,
    rating: 4.5,
    thumbnail: 'dscr-investment-course'
  },
  {
    id: 7,
    title: "Credit Analysis & Repair",
    description: "Help clients improve their credit for loan approval",
    category: 'qualification',
    type: 'audio',
    duration: '30 min',
    difficulty: 'Intermediate',
    modules: 4,
    rating: 4.7,
    thumbnail: 'credit-analysis-course'
  },
  {
    id: 8,
    title: "Loan Officer Licensing Prep",
    description: "Complete preparation for your loan officer license exam",
    category: 'fundamentals',
    type: 'interactive',
    duration: '120 min',
    difficulty: 'Advanced',
    modules: 12,
    rating: 4.9,
    thumbnail: 'licensing-prep-course',
    featured: true
  },
  {
    id: 9,
    title: "Jumbo Loan Expertise",
    description: "Navigate high-value property financing",
    category: 'advanced',
    type: 'video',
    duration: '45 min',
    difficulty: 'Advanced',
    modules: 5,
    rating: 4.6,
    thumbnail: 'jumbo-loan-course'
  },
  {
    id: 10,
    title: "USDA Rural Development Loans",
    description: "Specialized rural property financing programs",
    category: 'programs',
    type: 'document',
    duration: '25 min',
    difficulty: 'Intermediate',
    modules: 3,
    rating: 4.4,
    thumbnail: 'usda-loan-course'
  },
  {
    id: 11,
    title: "Self-Employed Borrower Guidelines",
    description: "Qualifying self-employed clients for mortgages",
    category: 'qualification',
    type: 'interactive',
    duration: '40 min',
    difficulty: 'Advanced',
    modules: 5,
    rating: 4.8,
    thumbnail: 'self-employed-course'
  },
  {
    id: 12,
    title: "Loan Processing & Underwriting",
    description: "Behind-the-scenes look at loan processing",
    category: 'advanced',
    type: 'video',
    duration: '65 min',
    difficulty: 'Advanced',
    modules: 8,
    rating: 4.7,
    thumbnail: 'processing-underwriting-course'
  }
];