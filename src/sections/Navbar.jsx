import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* LOGO */}
          <div>
            <p className="text-xl font-black text-yellow-500">
              LES COLIBRIS
            </p>

            <p className="text-xs tracking-[0.3em] text-white/50">
              226
            </p>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wider text-white/80 md:flex">
            <a href="#" className="transition hover:text-yellow-500">
              Accueil
            </a>

            <a href="#" className="transition hover:text-yellow-500">
              Histoire
            </a>

            <a href="#" className="transition hover:text-yellow-500">
              Événements
            </a>

            <a href="#" className="transition hover:text-yellow-500">
              Galerie
            </a>

            <a href="#" className="transition hover:text-yellow-500">
              Rejoindre
            </a>

            <a href="#" className="transition hover:text-yellow-500">
              Contact
            </a>
          </div>

          {/* CTA */}
          <button className="hidden rounded-full bg-yellow-500 px-5 py-2 text-sm font-bold text-black transition hover:scale-105 md:block">
            Rejoindre
          </button>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden"
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black"
          >
            <div className="flex flex-col items-center gap-8 text-2xl font-bold uppercase text-white">
              <a href="#">Accueil</a>
              <a href="#">Histoire</a>
              <a href="#">Événements</a>
              <a href="#">Galerie</a>
              <a href="#">Rejoindre</a>
              <a href="#">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}