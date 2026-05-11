import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./sections/Footer"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import GalleryPage from "./pages/GalleryPage"
import EventsPage from "./pages/EventsPage"

export default function App() {
  return (
    <BrowserRouter>
      <main className="bg-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  )
}