import { useEffect, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"

import { AnimatePresence, motion } from "framer-motion"

import Navbar from "./components/Navbar"
import Footer from "./sections/Footer"
import ScrollToTop from "./components/ScrollToTop"
import Loader from "./components/Loader"

import Home from "./pages/Home"
import Contact from "./pages/Contact"
import GalleryPage from "./pages/GalleryPage"
import EventsPage from "./pages/EventsPage"
import JoinPage from "./pages/JoinPage"
import StoryPage from "./pages/StoryPage"
import PartnersPage from "./pages/PartnersPage"
import BecomePartnerPage from "./pages/BecomePartnerPage"
import OrganizationPage from "./pages/OrganizationPage"
import NotFound from "./pages/NotFound"

import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"
import AdminGallery from "./pages/AdminGallery"
import AdminEvents from "./pages/AdminEvents"
import AdminPartners from "./pages/AdminPartners"
import AdminStory from "./pages/AdminStory"
import AdminOrganization from "./pages/AdminOrganization"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/become-partner" element={<BecomePartnerPage />} />
          <Route path="/organization" element={<OrganizationPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>}/>
          <Route
  path="/admin/gallery"
  element={
    <ProtectedAdminRoute>
      <AdminGallery />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/events"
  element={
    <ProtectedAdminRoute>
      <AdminEvents />
    </ProtectedAdminRoute>
  }
/>

          <Route
  path="/admin/partners"
  element={
    <ProtectedAdminRoute>
      <AdminPartners />
    </ProtectedAdminRoute>
  }
/>
          <Route
  path="/admin/story"
  element={
    <ProtectedAdminRoute>
      <AdminStory />
    </ProtectedAdminRoute>
  }
/>

          <Route
  path="/admin/organization"
  element={
    <ProtectedAdminRoute>
      <AdminOrganization />
    </ProtectedAdminRoute>
  }
/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <main className="bg-black text-white">
        <Loader loading={loading} />
        <Navbar />
        <ScrollToTop />
        <AnimatedRoutes />
        <Footer />
      </main>
    </BrowserRouter>
  )
}
