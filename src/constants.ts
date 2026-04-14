import { Recipe, BlogPost, CommunityPost } from './types';

export const RECIPES: Recipe[] = [
  // Chicken Mimics (8)
  {
    id: '1',
    title: 'Cauliflower Buffalo Wings',
    category: 'Chicken Mimics',
    mimics: 'Chicken wings',
    swap: 'Cauliflower instead of chicken',
    difficulty: 'Easy',
    time: '25 min',
    calories: 320,
    image: 'https://images.unsplash.com/photo-1614398751058-eb2e0bf63e53?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '2',
    title: 'Tofu Butter Masala',
    category: 'Chicken Mimics',
    mimics: 'Butter chicken',
    swap: 'Firm tofu instead of chicken',
    difficulty: 'Medium',
    time: '35 min',
    calories: 420,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '3',
    title: 'Soya Chaap Tikka',
    category: 'Chicken Mimics',
    mimics: 'Chicken tikka',
    swap: 'Soy chunks instead of chicken',
    difficulty: 'Medium',
    time: '40 min',
    calories: 310,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '4',
    title: 'Seitan Fried "Chicken"',
    category: 'Chicken Mimics',
    mimics: 'Fried chicken',
    swap: 'Seitan instead of chicken',
    difficulty: 'Hard',
    time: '45 min',
    calories: 550,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '5',
    title: 'Jackfruit "Chicken" Curry',
    category: 'Chicken Mimics',
    mimics: 'Chicken curry',
    swap: 'Raw jackfruit instead of chicken',
    difficulty: 'Medium',
    time: '40 min',
    calories: 290,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '6',
    title: 'Tofu Nuggets',
    category: 'Chicken Mimics',
    mimics: 'Chicken nuggets',
    swap: 'Pressed tofu instead of chicken',
    difficulty: 'Easy',
    time: '20 min',
    calories: 250,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '7',
    title: 'Mushroom "Chicken" Strips',
    category: 'Chicken Mimics',
    mimics: 'Chicken strips',
    swap: 'Oyster mushrooms instead of chicken',
    difficulty: 'Easy',
    time: '25 min',
    calories: 210,
    image: 'https://images.unsplash.com/photo-1594971475674-6a97f8fe8c2b?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '8',
    title: 'Banana Blossom "Chicken"',
    category: 'Chicken Mimics',
    mimics: 'Chicken pieces',
    swap: 'Banana blossom instead of chicken',
    difficulty: 'Medium',
    time: '30 min',
    calories: 180,
    image: 'https://images.unsplash.com/photo-1541014741259-df529411b96a?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },

  // Meat Mimics (7)
  {
    id: '9',
    title: 'Mushroom-Walnut Burger',
    category: 'Meat Mimics',
    mimics: 'Beef burger',
    swap: 'Mushrooms and walnuts instead of beef',
    difficulty: 'Easy',
    time: '30 min',
    calories: 380,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '10',
    title: 'Jackfruit Biryani',
    category: 'Meat Mimics',
    mimics: 'Mutton biryani',
    swap: 'Jackfruit instead of mutton',
    difficulty: 'Hard',
    time: '60 min',
    calories: 450,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '11',
    title: 'Lentil Keema',
    category: 'Meat Mimics',
    mimics: 'Minced meat',
    swap: 'Brown lentils instead of meat',
    difficulty: 'Medium',
    time: '35 min',
    calories: 280,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '12',
    title: 'Baingan Bharta',
    category: 'Meat Mimics',
    mimics: 'Smoky meat',
    swap: 'Roasted eggplant instead of meat',
    difficulty: 'Medium',
    time: '40 min',
    calories: 190,
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '13',
    title: 'Beetroot Burger',
    category: 'Meat Mimics',
    mimics: 'Beef patty',
    swap: 'Beetroot and beans instead of beef',
    difficulty: 'Easy',
    time: '25 min',
    calories: 320,
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '14',
    title: 'Walnut Taco Meat',
    category: 'Meat Mimics',
    mimics: 'Ground beef',
    swap: 'Crushed walnuts instead of beef',
    difficulty: 'Easy',
    time: '15 min',
    calories: 240,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '15',
    title: 'Tempeh Bacon',
    category: 'Meat Mimics',
    mimics: 'Bacon',
    swap: 'Sliced tempeh instead of bacon',
    difficulty: 'Easy',
    time: '15 min',
    calories: 180,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },

  // Egg Mimics (5)
  {
    id: '16',
    title: 'Chickpea Omelette',
    category: 'Egg Mimics',
    mimics: 'Egg omelette',
    swap: 'Chickpea flour instead of eggs',
    difficulty: 'Easy',
    time: '15 min',
    calories: 210,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '17',
    title: 'Tofu Scramble',
    category: 'Egg Mimics',
    mimics: 'Scrambled eggs',
    swap: 'Silken tofu instead of eggs',
    difficulty: 'Easy',
    time: '10 min',
    calories: 160,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '18',
    title: 'Paneer Bhurji',
    category: 'Egg Mimics',
    mimics: 'Egg bhurji',
    swap: 'Crumpled paneer instead of eggs',
    difficulty: 'Easy',
    time: '15 min',
    calories: 280,
    image: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '19',
    title: 'Vegan Egg Salad',
    category: 'Egg Mimics',
    mimics: 'Egg salad',
    swap: 'Tofu and black salt instead of eggs',
    difficulty: 'Easy',
    time: '10 min',
    calories: 190,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '20',
    title: 'Black Salt Tofu Egg',
    category: 'Egg Mimics',
    mimics: 'Boiled egg',
    swap: 'Tofu with kala namak instead of eggs',
    difficulty: 'Medium',
    time: '20 min',
    calories: 120,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },

  // Cheese Mimics (5)
  {
    id: '21',
    title: 'Cashew Alfredo Pasta',
    category: 'Cheese Mimics',
    mimics: 'Alfredo sauce',
    swap: 'Cashew cream instead of cheese',
    difficulty: 'Medium',
    time: '25 min',
    calories: 520,
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '22',
    title: 'Vegan Mac & Cheese',
    category: 'Cheese Mimics',
    mimics: 'Cheese sauce',
    swap: 'Potato and carrot sauce instead of cheese',
    difficulty: 'Medium',
    time: '30 min',
    calories: 480,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '23',
    title: 'Tofu Ricotta',
    category: 'Cheese Mimics',
    mimics: 'Ricotta cheese',
    swap: 'Crumbled tofu instead of ricotta',
    difficulty: 'Easy',
    time: '10 min',
    calories: 150,
    image: 'https://images.unsplash.com/photo-1559466273-d95e72debaf8?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '24',
    title: 'Nutritional Yeast Parmesan',
    category: 'Cheese Mimics',
    mimics: 'Parmesan cheese',
    swap: 'Nutritional yeast instead of parmesan',
    difficulty: 'Easy',
    time: '5 min',
    calories: 40,
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '25',
    title: 'Coconut Yogurt Cheese',
    category: 'Cheese Mimics',
    mimics: 'Cream cheese',
    swap: 'Strained coconut yogurt instead of cheese',
    difficulty: 'Medium',
    time: '12 hours',
    calories: 180,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },

  // Seafood Mimics (3)
  {
    id: '26',
    title: 'Banana Blossom Fish Fry',
    category: 'Seafood Mimics',
    mimics: 'Fried fish',
    swap: 'Banana blossom instead of fish',
    difficulty: 'Medium',
    time: '30 min',
    calories: 260,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '27',
    title: 'Eggplant Unagi',
    category: 'Seafood Mimics',
    mimics: 'Eel (Unagi)',
    swap: 'Steamed eggplant instead of eel',
    difficulty: 'Hard',
    time: '40 min',
    calories: 210,
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '28',
    title: 'Chickpea Tuna Sandwich',
    category: 'Seafood Mimics',
    mimics: 'Tuna salad',
    swap: 'Mashed chickpeas instead of tuna',
    difficulty: 'Easy',
    time: '15 min',
    calories: 340,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },

  // Desserts (2)
  {
    id: '29',
    title: 'Avocado Chocolate Mousse',
    category: 'Dessert',
    mimics: 'Chocolate mousse',
    swap: 'Avocado instead of cream',
    difficulty: 'Easy',
    time: '10 min',
    calories: 240,
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '30',
    title: 'Coconut Milk Ice Cream',
    category: 'Dessert',
    mimics: 'Dairy ice cream',
    swap: 'Coconut milk instead of cream',
    difficulty: 'Medium',
    time: '4 hours',
    calories: 310,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '31',
    title: 'Soy Granules Bolognese',
    category: 'Meat Mimics',
    mimics: 'Beef bolognese',
    swap: 'Soy granules instead of minced beef',
    difficulty: 'Easy',
    time: '25 min',
    calories: 340,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  },
  {
    id: '32',
    title: 'Cashew Mozzarella Sticks',
    category: 'Cheese Mimics',
    mimics: 'Mozzarella sticks',
    swap: 'Cashew cheese instead of mozzarella',
    difficulty: 'Medium',
    time: '30 min',
    calories: 280,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80',
    isVideo: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How I Replaced Chicken in Every Dish (And You Can Too)',
    category: 'Tips',
    readTime: '5 min',
    date: 'April 10, 2026',
    excerpt: 'From butter chicken to wings – here\'s my complete guide to making the switch without losing the flavor you love.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'The Science Behind Tofu: Why It Mimics Meat So Well',
    category: 'Science',
    readTime: '4 min',
    date: 'April 5, 2026',
    excerpt: 'Understanding the cellular structure of soy and how to manipulate it for the perfect "meaty" texture.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: '30-Day Plant-Based Challenge: My Results',
    category: 'Success Story',
    readTime: '6 min',
    date: 'March 28, 2026',
    excerpt: 'I went 100% plant-based for a month using Vegify. Here is what happened to my energy levels and health.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'Budget Plant-Based Shopping Guide (India Edition)',
    category: 'Tips',
    readTime: '7 min',
    date: 'March 20, 2026',
    excerpt: 'Eating plant-based doesn\'t have to be expensive. Learn how to shop smart at your local market.',
    image: 'https://images.unsplash.com/photo-1506617564039-2f3b650ad755?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'From Diabetes to Remission: How Plant-Based Saved Me',
    category: 'Health',
    readTime: '8 min',
    date: 'March 15, 2026',
    excerpt: 'A powerful story of recovery and the role of nutrition in managing chronic illness.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    title: 'Top 10 Pantry Staples for Plant-Based Cooking',
    category: 'Tips',
    readTime: '4 min',
    date: 'March 10, 2026',
    excerpt: 'Keep these 10 items in your kitchen and you\'ll never be more than 20 minutes away from a great meal.',
    image: 'https://images.unsplash.com/photo-1506617564039-2f3b650ad755?auto=format&fit=crop&w=800&q=80'
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: '1',
    user: 'Ramesh K.',
    username: 'ramesh_k',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    timeAgo: '2h ago',
    category: 'Success Story',
    content: 'Tried tofu butter masala for the first time. My family didn\'t even notice the difference! Never buying chicken again.',
    likes: 127,
    comments: 34,
    badge: 'Green Warrior'
  },
  {
    id: '2',
    user: 'Priya S.',
    username: 'priya_s',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    timeAgo: '5h ago',
    category: 'Question',
    content: 'Has anyone successfully mimicked fish curry? I\'m craving it but want a plant-based version.',
    likes: 45,
    comments: 23,
    badge: 'Plant-Based Newbie'
  },
  {
    id: '3',
    user: 'Ankit M.',
    username: 'ankit_m',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    timeAgo: '1d ago',
    category: 'Transformation of the Day',
    content: 'Before and after: My chicken curry vs tofu version. Same spices, same love!',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    likes: 289,
    comments: 67,
    badge: 'Plant Pro'
  },
  {
    id: '4',
    user: 'Neha V.',
    username: 'neha_v',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    timeAgo: '2d ago',
    category: 'Recipe Sharing',
    content: 'I made cauliflower wings for game night. Everyone thought they were real chicken wings!',
    likes: 94,
    comments: 18,
    badge: 'Green Warrior'
  }
];

export const INGREDIENTS = [
  { id: 'paneer', name: 'Paneer', mimics: ['Paneer Tikka', 'Paneer Butter Masala', 'Paneer Bhurji'], icon: '🧀' },
  { id: 'mushroom', name: 'Mushroom', mimics: ['Mushroom Burger', 'Mushroom Stroganoff', 'Mushroom Steak'], icon: '🍄' },
  { id: 'jackfruit', name: 'Jackfruit', mimics: ['Pulled "Pork"', 'Jackfruit Curry', 'Jackfruit Tacos'], icon: '🍈' },
  { id: 'tofu', name: 'Tofu', mimics: ['Tofu Scramble', 'Tofu Butter Masala', 'Tofu Nuggets'], icon: '🧊' },
  { id: 'cauliflower', name: 'Cauliflower', mimics: ['Cauliflower Wings', 'Cauliflower Steak', 'Cauliflower Rice'], icon: '🥦' },
  { id: 'seitan', name: 'Seitan', mimics: ['Seitan Fried Chicken', 'Seitan Strips', 'Seitan Roast'], icon: '🥩' },
  { id: 'banana-blossom', name: 'Banana Blossom', mimics: ['Fish Fry', '"Chicken" Curry'], icon: '🌺' },
  { id: 'chickpeas', name: 'Chickpeas', mimics: ['Tuna Salad', 'Omelette', 'Burger Patty'], icon: '🫘' },
  { id: 'walnuts', name: 'Walnuts', mimics: ['Taco Meat', 'Burger Patty'], icon: '🥜' },
  { id: 'lentils', name: 'Lentils', mimics: ['Keema', 'Meatballs'], icon: '🥣' },
  { id: 'eggplant', name: 'Eggplant', mimics: ['Unagi (eel)', 'Bacon'], icon: '🍆' },
  { id: 'cashews', name: 'Cashews', mimics: ['Cheese Sauce', 'Alfredo'], icon: '🥥' }
];
