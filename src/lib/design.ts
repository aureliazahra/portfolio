export type DesignPost = {
  id: string
  title: string
  type: 'behance' | 'unpublished'
  category: 'ui-ux' | 'social-media' | 'branding' | 'illustration'
  behanceUrl?: string
  coverGradient: string
  accentColor: string
  description: string
  year: string
  tools: string[]

  tags: string[]
}
export const designs: DesignPost[] = [
  {
    id: 'design-fintech',
    title: 'NovaPay — Fintech UI Kit',
    type: 'behance',
    category: 'ui-ux',
    behanceUrl: 'https://behance.net',
    coverGradient: 'from-violet-600 via-purple-800 to-black',
    accentColor: '#a78bfa',
    description: 'Complete UI system for a modern payment app. 120+ screens, design tokens, and interactive prototype built entirely in Figma.',
    year: '2024',
    tools: ['Figma', 'Protopie'],
    tags: ['UI Kit', 'Fintech', 'Design System'],
  },
  {
    id: 'design-brand',
    title: 'Arcadia — Brand Identity',
    type: 'behance',
    category: 'branding',
    behanceUrl: 'https://behance.net',
    coverGradient: 'from-amber-500 via-orange-700 to-black',
    accentColor: '#f59e0b',
    description: 'Full brand identity system for a premium lifestyle brand. Logo, typography, color system, stationery, and brand guidelines.',
    year: '2024',
    tools: ['Illustrator', 'Photoshop', 'InDesign'],

    tags: ['Branding', 'Logo', 'Identity'],
  },
  {
    id: 'design-social',
    title: 'Lunar — Social Campaign',
    type: 'unpublished',
    category: 'social-media',
    coverGradient: 'from-pink-500 via-rose-700 to-black',
    accentColor: '#f43f5e',
    description: 'Series of 30 social media posts for a fashion brand launch. Consistent visual language, animated stories, and carousel layouts.',
    year: '2025',
    tools: ['Figma', 'After Effects'],

    tags: ['Social Media', 'Motion', 'Fashion'],
  },
  {
    id: 'design-dashboard',
    title: 'Axiom — Analytics Dashboard',
    type: 'behance',
    category: 'ui-ux',
    behanceUrl: 'https://behance.net',
    coverGradient: 'from-cyan-500 via-teal-700 to-black',
    accentColor: '#06b6d4',
    description: 'Dark-mode analytics dashboard with complex data visualization, real-time charts, and a modular component system.',
    year: '2025',
    tools: ['Figma', 'Framer'],

    tags: ['Dashboard', 'Data Viz', 'Dark Mode'],
  },
  {
    id: 'design-illustration',
    title: 'Depths — Digital Illustration',
    type: 'unpublished',
    category: 'illustration',
    coverGradient: 'from-blue-500 via-indigo-800 to-black',
    accentColor: '#6366f1',
    description: 'Series of deep-sea creature illustrations combining digital art with editorial typography for a conceptual magazine spread.',
    year: '2024',
    tools: ['Procreate', 'Photoshop'],

    tags: ['Illustration', 'Editorial', 'Digital Art'],
  },
  {
    id: 'design-app',
    title: 'Grove — Plant Care App',
    type: 'unpublished',
    category: 'ui-ux',
    coverGradient: 'from-emerald-400 via-green-700 to-black',
    accentColor: '#10b981',
    description: 'Mobile UI design for a plant care companion app. Gentle, organic visual system with custom illustrations and micro-interactions.',
    year: '2025',
    tools: ['Figma', 'Lottie'],

    tags: ['Mobile UI', 'Organic', 'Illustration'],
  },
]
