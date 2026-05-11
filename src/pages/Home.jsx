import Hero from "../sections/Hero"
import Pillars from "../sections/Pillars"
import StorySection from "../components/StorySection"
import Gallery from "../sections/Gallery"
import Partners from "../sections/Partners"
import Events from "../sections/Events"
import Join from "../sections/Join"

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <StorySection />
      <Gallery />
      <Partners />
      <Events />
      <Join />
    </>
  )
}