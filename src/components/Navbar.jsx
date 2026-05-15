import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { label: "Accueil", to: "/" },
    { label: "Histoire", to: "/story" },
    { label: "Organisation", to: "/organization" },
    { label: "Événements", to: "/events" },
    { label: "Galerie", to: "/gallery" },
    { label: "Partenaires", to: "/partners" },
    { label: "Contact", to: "/contact" },
  ]

  const getLinkClass = (path) =>
    `text-sm uppercase tracking-[0.2em] transition ${
      location.pathname === path
        ? "text-yellow-400"
        : "text-white/70 hover:text-yellow-400"
    }`

  const getMobileLinkClass = (path) =>
    `relative z-10 text-3xl font-bold transition ${
      location.pathname === path ? "text-yellow-400" : "text-white"
    }`

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/60 py-3 shadow-2xl backdrop-blur-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500">
          <Link to="/" className="block">
            <h1 className="whitespace-nowrap text-xl font-black tracking-widest text-white">
              LES COLIBRIS <span className="text-yellow-400">226</span>
            </h1>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={getLinkClass(link.to)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/join"
              className="inline-block rounded-full bg-yellow-500 px-6 py-3 text-sm font-bold text-black transition hover:scale-105"
            >
              Rejoindre
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="text-white md:hidden"
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-hidden bg-black"
          >
            <img
              src="/images/logo.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.06]"
            />

            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className={getMobileLinkClass(link.to
