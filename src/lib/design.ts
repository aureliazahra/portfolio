export type DesignPost = {
  id: string
  title: string
  type: 'behance' | 'unpublished' | 'instagram Post'
  category: 'ui-ux' | 'social-media' | 'branding' 
  behanceUrl?: string
  instagramUrl?: string
  coverGradient: string
  accentColor: string
  description: string
  year: string
  tools: string[]
  tags: string[]

  // ✅ TAMBAH INI
  coverImage?: string
}

export const designs: DesignPost[] = [
  {
    id: 'pamflet',
    title: 'Tri-fold Pamphlet Design',
    type: 'behance',
    category: 'branding',
    behanceUrl: 'https://www.behance.net/gallery/240429047/Komiklin-Tri-Fold-Pamphlet-Design',
    coverGradient: 'from-violet-600 via-purple-800 to-black',
    accentColor: '#01062E',
    description: 'Trifold Pamphlet for Komiklin',
    year: '2025',
    tools: ['Canva'],
    tags: ['Branding', 'Pamphlet'],
    coverImage: '/previews/design2.png',
  },

  {
    id: 'sosmed',
    title: 'A Fun Day at Selecta || Social Media Design',
    type: 'behance',
    category: 'branding',
    behanceUrl: 'https://www.behance.net/gallery/241674169/A-Fun-Day-at-Selecta-Social-Media-Design',
    coverGradient: 'from-amber-500 via-orange-700 to-black',
    accentColor: '#C73052',
    description: 'Social Media Post for replycode_ on Insta',
    year: '2025',
    tools: ['Canva'],
    tags: ['Branding', 'Insta-post'],
    coverImage: '/previews/design5.png',
  },

  {
    id: 'promotional',
    title: 'Promotional Visual Identity for KOMIKLIN App',
    type: 'behance',
    category: 'branding',
    behanceUrl: 'https://www.behance.net/gallery/245094439/Promotional-Visual-Identity-for-KOMIKLIN-App',
    coverGradient: 'from-cyan-500 via-teal-700 to-black',
    accentColor: '#17A8DD',
    description: 'Promotional visual identity for KOMIKLIN App',
    year: '2025',
    tools: ['Canva'],
    tags: ['Branding', 'Social-media'],
    coverImage: '/previews/design6.png',
  },

  {
    id: 'sosmedd',
    title: 'Inauguration of the Chief of Journalism - Social Media Design',
    type: 'behance',
    category: 'social-media',
    instagramUrl: 'https://www.instagram.com/p/DW_jx16kl8E/?img_index=1',
    coverGradient: 'from-cyan-500 via-teal-700 to-black',
    accentColor: '#A51B16',
    description: 'Social media design for the inauguration of the chief of journalism at my school',
    year: '2025',
    tools: ['Figma', 'Framer'],
    tags: ['Dashboard', 'Data Viz', 'Dark Mode'],
    coverImage: '/previews/design8.png',
  },

  {
    id: 'design-app',
    title: 'Ventura -Pasport UI/UX Design',
    type: 'unpublished',
    category: 'ui-ux',
    instagramUrl: 'https://www.figma.com/design/B77f9ECpb5Lm6aJ81hjJA0/VENTURA?node-id=0-1&t=plaOqMXMGMFWTLjN-1',
    coverGradient: 'from-emerald-400 via-green-700 to-black',
    accentColor: '#253D62',
    description: 'Pasport app design for a competition project. Focused on clean UI, intuitive UX, and a vibrant color palette.',
    year: '2025',
    tools: ['Figma', 'Lottie'],
    tags: ['Mobile UI', 'Organic', 'Illustration'],
    coverImage: '/previews/design12.png',
  },

  {
    id: 'banner-design',
    title: 'LKS Winner 2025 - Banner Design',
    type: 'unpublished',
    category: 'branding',
    instagramUrl: 'https://canva.link/amf4jdlbzhqnhfg',
    coverGradient: 'from-emerald-400 via-green-700 to-black',
    accentColor: '#38B6FF',
    description: 'This is a comission for winner of  2025 LKS competition. It features a dynamic composition, bold typography, and a vibrant color scheme to create an eye-catching visual identity for the event.',
    year: '2025',
    tools: ['Figma', 'Lottie'],
    tags: ['Mobile UI', 'Organic', 'Illustration'],
    coverImage: '/previews/design11.png',
  },
  {
    id: 'poster3',
    title: 'Poster Design',
    type: 'instagram Post',
    category: 'social-media',
    instagramUrl: 'https://www.instagram.com/p/DGt1nHaTUPZ/',
    coverGradient: 'from-cyan-500 via-teal-700 to-black',
    accentColor: '#362342',
    description: '',
    year: '2025',
    tools: ['Ibis Paint X'],
    tags: ['Poster', 'Social-media', 'Graphic Design'],
    coverImage: '/previews/design15.png',
  },

  {
    id: 'poster2',
    title: 'Poster Design',
    type: 'instagram Post',
    category: 'social-media',
    instagramUrl: 'https://www.instagram.com/p/DIxdUWzvkal/',
    coverGradient: 'from-cyan-500 via-teal-700 to-black',
    accentColor: '#402A2B',
    description: '',
    year: '2025',
    tools: ['Ibis Paint X'],
    tags: ['Poster', 'Social-media', 'Graphic Design'],
    coverImage: '/previews/design14.png',
  },

  {
    id: 'poster1',
    title: 'Poster Design',
    type: 'instagram Post',
    category: 'social-media',
    instagramUrl: 'https://www.instagram.com/p/DF5RkSCvASP/',
    coverGradient: 'from-cyan-500 via-teal-700 to-black',
    accentColor: '#660C1D',
    description: '',
    year: '2025',
    tools: ['Ibis Paint X'],
    tags: ['Poster', 'Social-media', 'Graphic Design'],
    coverImage: '/previews/design13.png',
  },
]