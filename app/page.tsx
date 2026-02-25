import ScrollController from '@/components/ui/ScrollController'
import GrainOverlay from '@/components/ui/GrainOverlay'
import Nav from '@/components/layout/Nav'
import HeroSection from '@/components/sections/HeroSection'
import FineXMeSection from '@/components/sections/FineXMeSection'
import SineNoctisSection from '@/components/sections/SineNoctisSection'
import MythosSection from '@/components/sections/MythosSection'
import LinksSection from '@/components/sections/LinksSection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <ScrollController>
      <GrainOverlay />
      <Nav />
      <main>
        <HeroSection />
        <FineXMeSection />
        <SineNoctisSection />
        <MythosSection />
        <LinksSection />
      </main>
      <Footer />
    </ScrollController>
  )
}
