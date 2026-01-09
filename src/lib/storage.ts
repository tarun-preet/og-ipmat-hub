// LocalStorage utilities for persistent data

export interface User {
  name: string;
  email: string;
  createdAt: string;
}

export interface ProgressItem {
  id: string;
  label: string;
  completed: boolean;
  category: 'quants' | 'verbal';
}

export type ExamType = 'INDORE' | 'ROHTAK' | 'JIPMAT';

export interface ScoreBreakdown {
  sa?: number;   // Short Answer (Indore)
  mcq?: number;  // MCQ (Indore)
  qa?: number;   // Quants (Rohtak, JIPMAT)
  va: number;    // Verbal Ability (All)
  lr?: number;   // Logical Reasoning (Rohtak, JIPMAT)
}

export interface MockScore {
  id: string;
  mockName: string;
  examType: ExamType;
  date: string;
  breakdown: ScoreBreakdown;
  totalScore: number;
}

export interface DailyGoal {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface DailyLog {
  id: string;
  content: string;
  date: string;
  studyHours: number;
  studyMinutes: number;
}

export interface UserVocabItem {
  id: string;
  term: string;
  meaning: string;
  example?: string;
  origin?: string;
  category: 'idioms' | 'phrasal' | 'daily';
  createdAt: string;
}

// User management
export const getUser = (): User | null => {
  const user = localStorage.getItem('ipmat_user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: User): void => {
  localStorage.setItem('ipmat_user', JSON.stringify(user));
};

export const clearUser = (): void => {
  localStorage.removeItem('ipmat_user');
};

// Progress tracker
export const getProgress = (): ProgressItem[] => {
  const progress = localStorage.getItem('ipmat_progress');
  return progress ? JSON.parse(progress) : getDefaultProgress();
};

export const setProgress = (progress: ProgressItem[]): void => {
  localStorage.setItem('ipmat_progress', JSON.stringify(progress));
};

// Mock scores
export const getMockScores = (): MockScore[] => {
  const scores = localStorage.getItem('ipmat_mock_scores');
  return scores ? JSON.parse(scores) : [];
};

export const setMockScores = (scores: MockScore[]): void => {
  localStorage.setItem('ipmat_mock_scores', JSON.stringify(scores));
};

// Daily goals
export const getDailyGoals = (): DailyGoal[] => {
  const goals = localStorage.getItem('ipmat_daily_goals');
  return goals ? JSON.parse(goals) : [];
};

export const setDailyGoals = (goals: DailyGoal[]): void => {
  localStorage.setItem('ipmat_daily_goals', JSON.stringify(goals));
};

// Daily logs
export const getDailyLogs = (): DailyLog[] => {
  const logs = localStorage.getItem('ipmat_daily_logs');
  return logs ? JSON.parse(logs) : [];
};

export const setDailyLogs = (logs: DailyLog[]): void => {
  localStorage.setItem('ipmat_daily_logs', JSON.stringify(logs));
};

// Vocabulary items
export const getVocab = (): UserVocabItem[] => {
  const vocab = localStorage.getItem('ipmat_vocab');
  return vocab ? JSON.parse(vocab) : [];
};

export const setVocab = (vocab: UserVocabItem[]): void => {
  localStorage.setItem('ipmat_vocab', JSON.stringify(vocab));
};

// Default progress items
export const getDefaultProgress = (): ProgressItem[] => [
  // Quants
  { id: 'q1', label: 'Progression & Series', completed: false, category: 'quants' },
  { id: 'q2', label: 'Functions', completed: false, category: 'quants' },
  { id: 'q3', label: 'Modulus', completed: false, category: 'quants' },
  { id: 'q4', label: 'Inequalities', completed: false, category: 'quants' },
  { id: 'q5', label: 'Algebra - Quadratic & Higher Degrees', completed: false, category: 'quants' },
  { id: 'q6', label: 'Algebra - Linear Equations', completed: false, category: 'quants' },
  { id: 'q7', label: 'Indices', completed: false, category: 'quants' },
  { id: 'q8', label: 'Minima & Maxima', completed: false, category: 'quants' },
  { id: 'q9', label: 'Identities', completed: false, category: 'quants' },
  { id: 'q10', label: 'Arithmetic - Ratio, Proportion & Variation', completed: false, category: 'quants' },
  { id: 'q11', label: 'Arithmetic - Time, Speed & Distance', completed: false, category: 'quants' },
  { id: 'q12', label: 'Arithmetic - Mean, Median & Mode', completed: false, category: 'quants' },
  { id: 'q13', label: 'Arithmetic - Simple & Compound Interest', completed: false, category: 'quants' },
  { id: 'q14', label: 'Arithmetic - Profit & Loss', completed: false, category: 'quants' },
  { id: 'q15', label: 'Arithmetic - Averages', completed: false, category: 'quants' },
  { id: 'q16', label: 'Arithmetic - Mixtures & Alligation', completed: false, category: 'quants' },
  { id: 'q17', label: 'Arithmetic - Time & Work', completed: false, category: 'quants' },
  { id: 'q18', label: 'Trigonometry', completed: false, category: 'quants' },
  { id: 'q19', label: 'Geometry - Triangles', completed: false, category: 'quants' },
  { id: 'q20', label: 'Geometry - Circles', completed: false, category: 'quants' },
  { id: 'q21', label: 'Geometry - Straight Lines', completed: false, category: 'quants' },
  { id: 'q22', label: 'Geometry - Quadrilaterals', completed: false, category: 'quants' },
  { id: 'q23', label: 'Geometry - Solids', completed: false, category: 'quants' },
  { id: 'q24', label: 'Geometry - Polygons', completed: false, category: 'quants' },
  { id: 'q25', label: 'Conic Sections', completed: false, category: 'quants' },
  { id: 'q26', label: 'Modern Math - Permutation & Combination', completed: false, category: 'quants' },
  { id: 'q27', label: 'Modern Math - Set Theory', completed: false, category: 'quants' },
  { id: 'q28', label: 'Modern Math - Probability', completed: false, category: 'quants' },
  { id: 'q29', label: 'Modern Math - Matrices & Determinants', completed: false, category: 'quants' },
  { id: 'q30', label: 'Logarithm', completed: false, category: 'quants' },
  { id: 'q31', label: 'Binomial Theorem', completed: false, category: 'quants' },
  { id: 'q32', label: 'Number System - Divisibility Rules', completed: false, category: 'quants' },
  { id: 'q33', label: 'Number System - Remainder', completed: false, category: 'quants' },
  { id: 'q34', label: 'Number System - Factorials', completed: false, category: 'quants' },
  { id: 'q35', label: 'Number System - Integral Solutions', completed: false, category: 'quants' },
  { id: 'q36', label: 'Number System - Unit Digits', completed: false, category: 'quants' },
  { id: 'q37', label: 'Number System - HCF & LCM', completed: false, category: 'quants' },

  // Logical Reasoning & Data Interpretation (LRDI)
  { id: 'l1', label: 'LRDI - Allocations & Arrangement', completed: false, category: 'quants' },
  { id: 'l2', label: 'LRDI - Tournaments', completed: false, category: 'quants' },
  { id: 'l3', label: 'LRDI - Bar Graphs', completed: false, category: 'quants' },
  { id: 'l4', label: 'LRDI - Tabular Data', completed: false, category: 'quants' },
  { id: 'l5', label: 'LRDI - Weights', completed: false, category: 'quants' },

  // Verbal Ability
  { id: 'v1', label: 'Reading Comprehension', completed: false, category: 'verbal' },
  { id: 'v2', label: 'Fill-ups: Idioms, Phrases & Words', completed: false, category: 'verbal' },
  { id: 'v3', label: 'Fill-ups: Phrasal Verbs', completed: false, category: 'verbal' },
  { id: 'v4', label: 'Sentence Correction (Grammar)', completed: false, category: 'verbal' },
  { id: 'v5', label: 'Paracompletion', completed: false, category: 'verbal' },
  { id: 'v6', label: 'Vocabulary', completed: false, category: 'verbal' },
  { id: 'v7', label: 'Incorrect Word Usage', completed: false, category: 'verbal' },
  { id: 'v8', label: 'Parajumbles', completed: false, category: 'verbal' }
];

// Calculate days until IPMAT 2026
export const getDaysUntilIPMAT = (): number => {
  const ipmatDate = new Date('2026-05-04T14:00:00+05:30'); // IPMAT 2026 - May 4th, 2 PM IST
  const today = new Date();
  const diffTime = ipmatDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Full countdown interface
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

// Get full countdown to IPMAT (for live timer)
export const getCountdownToIPMAT = (): CountdownTime => {
  const ipmatDate = new Date('2026-05-04T14:00:00+05:30'); // IPMAT 2026 - May 4th, 2 PM IST
  const now = new Date();
  const diffMs = ipmatDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, totalMs: diffMs };
};
