import ScrollController from '@/components/ui/ScrollController'
import GrainOverlay from '@/components/ui/GrainOverlay'
import HeroSection from '@/components/sections/HeroSection'
import FineXMeSection from '@/components/sections/FineXMeSection'
import PilgrimSection from '@/components/sections/PilgrimSection'
import SineNoctisSection from '@/components/sections/SineNoctisSection'
import MythosSection from '@/components/sections/MythosSection'
import OtherMediaSection from '@/components/sections/OtherMediaSection'
import LinksSection from '@/components/sections/LinksSection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <ScrollController>
      <GrainOverlay />
      <main>
        <HeroSection />
        <FineXMeSection />
        <PilgrimSection />
        <SineNoctisSection />
        <MythosSection />
        <OtherMediaSection />
        <LinksSection />
      </main>
      <Footer />
    </ScrollController>
  )
}
