import Navbar from "./sections/Navbar"
import Hero from "./sections/Hero"
import StorySection from "./components/StorySection"
import Pillars from "./sections/Pillars"

export default function App() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <StorySection />
      <Pillars />
    </main>
  )
}