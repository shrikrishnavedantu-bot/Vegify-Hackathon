export type UserSession = {
  name: string;
  email: string;
  isGuest: boolean;
  bmr?: number;
  maintenanceCalories?: number;
};

export type Meal = {
  id: string;
  name: string;
  calories: number;
  time: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
};

export type Recipe = {
  id: string;
  title: string;
  category: string;
  mimics: string;
  swap: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time: string;
  calories: number;
  image: string;
  isVideo: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
};

export type CommunityPost = {
  id: string;
  user: string;
  username: string;
  avatar: string;
  timeAgo: string;
  category: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  badge?: string;
};
