import Navbar from "./sections/Navbar"
import Hero from "./sections/Hero"
import StorySection from "./components/StorySection"
import Pillars from "./sections/Pillars"
import Gallery from "./sections/Gallery"

export default function App() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Pillars />
      <StorySection />
      <Gallery />
    </main>
  )
}
