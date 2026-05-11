import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import Pillars from "./sections/Pillars"
import Story from "./components/StorySection"
import Gallery from "./sections/Gallery"
import Events from "./sections/Events"
import Join from "./sections/Join"
import Footer from "./sections/Footer"

export default function App() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Pillars />
      <Story />
      <Gallery />
      <Events />
      <Join />
      <Footer />
    </main>
  )
}