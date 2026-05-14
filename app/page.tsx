'use client';

import { LenisProvider } from '@/components/lenis-provider';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { InstitutionalMission } from '@/components/institutional-mission';
import { ResearchVision } from '@/components/research-vision';
import { QuantitativeInfrastructure } from '@/components/quantitative-infrastructure';
import { Philosophy } from '@/components/philosophy';
import { Research } from '@/components/research';
import { ExperimentalTechnologies } from '@/components/experimental-technologies';
import { ResearchRoadmap } from '@/components/research-roadmap';
import { FounderPerspective } from '@/components/founder-perspective';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        <main className="relative">
          <Navbar />
          <Hero />
          <InstitutionalMission />
          <ResearchVision />
          <QuantitativeInfrastructure />
          <Research />
          <Philosophy />
          <ExperimentalTechnologies />
          <ResearchRoadmap />
          <FounderPerspective />
          <Contact />
          <Footer />
        </main>
      </div>
    </LenisProvider>
  );
}
