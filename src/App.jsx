import { lazy, Suspense } from "react"
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

import Home from "./pages/Home"
const Contact = lazy(() => import("./pages/Contact"))
const GalleryPage = lazy(() => import("./pages/GalleryPage"))
const EventsPage = lazy(() => import("./pages/EventsPage"))
const JoinPage = lazy(() => import("./pages/JoinPage"))
const StoryPage = lazy(() => import("./pages/StoryPage"))
const PartnersPage = lazy(() => import("./pages/PartnersPage"))
const BecomePartnerPage = lazy(() => import("./pages/BecomePartnerPage"))
const OrganizationPage = lazy(() => import("./pages/OrganizationPage"))
const NotFound = lazy(() => import("./pages/NotFound"))

const AdminLogin = lazy(() => import("./pages/AdminLogin"))
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"))
const ProtectedAdminRoute = lazy(() => import("./components/ProtectedAdminRoute"))
const AdminGallery = lazy(() => import("./pages/AdminGallery"))
const AdminEvents = lazy(() => import("./pages/AdminEvents"))
const AdminPartners = lazy(() => import("./pages/AdminPartners"))
const AdminStory = lazy(() => import("./pages/AdminStory"))
const AdminOrganization = lazy(() => import("./pages/AdminOrganization"))
const AdminLayout = lazy(() => import("./layouts/AdminLayout"))
const AdminMessages = lazy(() => import("./pages/AdminMessages"))
const AdminPartnerRequests = lazy(() => import("./pages/AdminPartnerRequests"))
const AdminSettings = lazy(() => import("./pages/AdminSettings"))
const AdminLegalPages = lazy(() => import("./pages/AdminLegalPages"))
const AdminLegalEditor = lazy(() => import("./pages/AdminLegalEditor"))
const LegalContentPage = lazy(() => import("./pages/LegalContentPage"))

import SeoManager from "./components/SeoManager"
import AnalyticsTracker from "./components/AnalyticsTracker"
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics"))

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
          <Route path="/legal" element={<LegalContentPage slug="legal" />} />
          <Route path="/mentions-legales" element={<LegalContentPage slug="legal" />} />
          <Route path="/privacy" element={<LegalContentPage slug="privacy" />} />
          <Route path="/politique-confidentialite" element={<LegalContentPage slug="privacy" />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/become-partner" element={<BecomePartnerPage />} />
          <Route path="/organization" element={<OrganizationPage />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="story" element={<AdminStory />} />
            <Route path="organization" element={<AdminOrganization />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="partner-requests" element={<AdminPartnerRequests />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="legal" element={<AdminLegalPages />} />
            <Route path="pages-juridiques" element={<AdminLegalPages />} />
            <Route path="pages-juridiques/:slug" element={<AdminLegalEditor />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith("/admin")
  return (
    <main className="bg-black text-white">

      {!isAdminPage && <Navbar />}
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-black" aria-label="Chargement de la page" />}><AnimatedRoutes /></Suspense>
      {!isAdminPage && <Footer />}
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SeoManager />
      <AnalyticsTracker />
      <AppContent />
    </BrowserRouter>
  )
}
