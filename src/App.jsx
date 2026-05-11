import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"

import { AnimatePresence, motion } from "framer-motion"

import Navbar from "./components/Navbar"
import Footer from "./sections/Footer"

import Home from "./pages/Home"
import Contact from "./pages/Contact"
import GalleryPage from "./pages/GalleryPage"
import EventsPage from "./pages/EventsPage"
import JoinPage from "./pages/JoinPage"
import StoryPage from "./pages/StoryPage"
import NotFound from "./pages/NotFound"
import PartnersPage from "./pages/PartnersPage"
import ScrollToTop from "./components/ScrollToTop"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <main className="bg-black text-white">
        <Navbar />
        <ScrollToTop />
        <AnimatedRoutes />
        <Footer />
      </main>
    </BrowserRouter>
  )
}