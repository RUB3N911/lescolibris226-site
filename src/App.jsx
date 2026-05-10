import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import Pillars from "./sections/Pillars"
import StorySection from "./components/StorySection"
import Gallery from "./sections/Gallery"
import Join from "./sections/Join"
import Events from "./sections/Events"

export default function App() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Pillars />
      <StorySection />
      <Gallery />
      <Events />
      <Join />
    </main>
  )
}