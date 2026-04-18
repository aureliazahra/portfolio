const preview1 = '/previews/1.jpg'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl: string
  previewColor: string
  accentColor: string

  // ✅ ubah ini
  previewImage?: any

  year: string
  status: 'completed' | 'in-progress'
  featured: boolean
}

const projects: Project[] = [
  {
    id: 'Gojek FE',
    title: 'Gojek Front End Clone',
    description:
      'This is a clone of Gojek’s frontend built with Flutter. The project is open-source and available on GitHub.',
    tags: ['Flutter Frontend'],
    githubUrl: 'https://github.com/aureliazahra/gojek-fe',
    previewColor: 'from-violet-900/40 to-indigo-900/40',
    accentColor: '##00880c',
    previewImage: '/previews/proyek1.png',
    year: '2025',
    status: 'completed',
    featured: true,
  },
  {
    id: 'Florist',
    title: 'Florist Frontend',
    description:
      'This is a frontend for a florist e-commerce app built with Flutter. It features a clean design, smooth animations, and a user-friendly interface.',
    tags: ['Flutter Frontend'],
    githubUrl: 'https://github.com/aureliazahra/uuk-sems3-flutternav',
    previewColor: 'from-violet-900/40 to-indigo-900/40',
    accentColor: '#8b5cf6',
    previewImage: '/previews/proyek2.png',
    year: '2025',
    status: 'completed',
    featured: true,
  },

  {
    id: 'Jelajah Nusantara',
    title: 'Jelajah Nusantara Frontend',
    description:
      'This is a frontend for Jelajah Nusantara app.',
    tags: ['Flutter Frontend', 'Rest API'],
    githubUrl: 'https://github.com',
    previewColor: 'from-violet-900/40 to-indigo-900/40',
    accentColor: '##d1a929',
    previewImage: '/previews/proyek3.png',
    year: '2025',
    status: 'completed',
    featured: true,
  },

  {
    id: 'Aura',
    title: 'Aura (Automation Face Recognition',
    description:
      'This is an AI face recognition project built with React Vite. It uses machine learning algorithms (Python) to recognize faces and provide real-time feedback.',
    tags: ['Python', 'React', 'Vite'],
    githubUrl: 'https://github.com/aureliazahra/bismillahsukses',
    previewColor: 'from-violet-900/40 to-indigo-900/40',
    accentColor: '##190580',
    previewImage: '/previews/proyek4.png',
    year: '2024',
    status: 'completed',
    featured: true,
  },
  
  {
    id: 'Wondertrail',
    title: 'Wondertrail Frontend',
    description:
      'This is an app for travel information',
    tags: ['Flutter frontend'],
    githubUrl: 'https://github.com/aureliazahra/wondertall',
    previewColor: 'from-violet-900/40 to-indigo-900/40',
    accentColor: '#8b5cf6',
    previewImage: '/previews/proyek5.png',
    year: '2026',
    status: 'completed',
    featured: true,
  },
  {
    id: 'Ruang Sehat',
    title: 'Ruang Sehat App',
    description:
      'Health article Ruang Sehat',
    tags: ['Flutter', 'RestAPI'],
    githubUrl: 'https://github.com',
    previewColor: 'from-violet-900/40 to-indigo-900/40',
    accentColor: '#8b5cf6',
    previewImage: '/previews/proyek6.png',
    year: '2026',
    status: 'in-progress',
    featured: true,
  },

]

export default projects