export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl: string
  previewColor: string
  accentColor: string
  year: string
  status: 'completed' | 'ongoing'
  emoji: string
  featured: boolean
}
export const projects: Project[] = [
  {
    id: 'flutter-ecommerce',
    title: 'ShopFlow',
    description: 'Full-featured e-commerce app with real-time cart, Firebase Auth, Firestore database, and Stripe payment integration. Smooth animations throughout.',
    tags: ['Flutter', 'Firebase', 'Stripe', 'Riverpod'],
    githubUrl: 'https://github.com',
    previewColor: 'from-violet-900/40 to-indigo-900/40',
    accentColor: '#8b5cf6',
    year: '2024',
    status: 'completed',
    emoji: '🛍️',
    featured: true,
  },
  {
    id: 'flutter-fitness',
    title: 'PulseTrack',
    description: 'Fitness tracking app with animated progress charts, workout plans, health metrics dashboard, and wearable device sync via Bluetooth.',
    tags: ['Flutter', 'Dart', 'BLoC', 'SQLite'],
    githubUrl: 'https://github.com',
    previewColor: 'from-emerald-900/40 to-teal-900/40',
    accentColor: '#10b981',
    year: '2024',
    status: 'completed',
    emoji: '💪',
    featured: true,
  },
  {
    id: 'flutter-social',
    title: 'Commune',
    description: 'Community-driven social app with real-time chat, story feature, media sharing, and a custom feed algorithm built on Firebase.',
    tags: ['Flutter', 'Firebase', 'GetX', 'WebRTC'],
    githubUrl: 'https://github.com',
    previewColor: 'from-rose-900/40 to-pink-900/40',
    accentColor: '#f43f5e',
    year: '2025',
    status: 'ongoing',
    emoji: '🌐',
    featured: true,
  },
  {
    id: 'flutter-finance',
    title: 'Ledger',
    description: 'Personal finance manager with expense tracking, budget goals, beautiful charts, CSV export, and multi-currency support.',
    tags: ['Flutter', 'Hive', 'FL Chart', 'Provider'],
    githubUrl: 'https://github.com',
    previewColor: 'from-amber-900/40 to-orange-900/40',
    accentColor: '#f59e0b',
    year: '2024',
    status: 'completed',
    emoji: '💰',
    featured: false,
  },
  {
    id: 'flutter-weather',
    title: 'Stratos',
    description: 'Weather app with immersive animated backgrounds that change based on weather conditions, hourly forecast, and location-based alerts.',
    tags: ['Flutter', 'OpenWeather API', 'Lottie', 'Dio'],
    githubUrl: 'https://github.com',
    previewColor: 'from-sky-900/40 to-blue-900/40',
    accentColor: '#0ea5e9',
    year: '2023',
    status: 'completed',
    emoji: '🌤️',
    featured: false,
  },
  {
    id: 'flutter-recipe',
    title: 'Mise en Place',
    description: 'Recipe discovery app with AI-powered ingredient recognition, meal planning, and nutritional analysis. Features offline-first architecture.',
    tags: ['Flutter', 'TensorFlow Lite', 'Supabase', 'GraphQL'],
    githubUrl: 'https://github.com',
    previewColor: 'from-lime-900/40 to-green-900/40',
    accentColor: '#84cc16',
    year: '2025',
    status: 'ongoing',
    emoji: '🍳',
    featured: false,
  },
]