"use client"
import CustomCursor from '@/components/ui/CustomCurson'
import PageLoader from '@/components/ui/PageLoader'
import Hero from '@/components/sections/Hero'
import Navbar from '@/components/layout/Navbar'
import WorkSection from '@/components/sections/WorkSection'
import DesignSection from '@/components/sections/DesignSection'
import AboutSection from '@/components/sections/AboutSection'
import MarqueeSection from '@/components/sections/MarqueeSection'

import projects from '@/lib/projects'
import { designs } from '@/lib/design'
import { useLenis } from '@/hooks/useLenis'

export default function Page() {
  useLenis()

  return (
    <div
      style={{
        background: '#080808',
        minHeight: '100vh',
        color: '#f0ece4',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <CustomCursor />
      <Navbar />

      <main>
        <PageLoader />
        <Hero />
        <WorkSection projects= { projects } />
        <MarqueeSection />
        <DesignSection designs={designs} />
        <AboutSection />
      </main>
    </div>
  )
}