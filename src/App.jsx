import Navbar from "./sections/Navbar"
import Hero from "./sections/Hero"
import Pillars from "./sections/Pillars"

export default function App() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <Pillars />
    </main>
  )
}