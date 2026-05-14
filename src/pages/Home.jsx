import Hero from "../sections/Hero"
import Pillars from "../sections/Pillars"
import StorySection from "../components/StorySection"
import Gallery from "../sections/Gallery"
import Partners from "../sections/Partners"
import Events from "../sections/Events"
import Join from "../sections/Join"
import Heritage from "../sections/Heritage"
import Energy from "../sections/Energy"
import InstagramSection from "../sections/Instagram"

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <Heritage />
      <Energy />
      <StorySection />
      <Gallery />
      <Partners />
      <Events />
      <InstagramSection />
      <Join />
    </>
  )
}