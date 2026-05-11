import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { label: "Accueil", to: "/" },
    { label: "Histoire", to: "/#histoire" },
    { label: "Événements", to: "/#evenements" },
    { label: "Galerie", to: "/gallery" },
    { label: "Rejoindre", to: "/#rejoindre" },
    { label: "Contact", to: "/contact" },
  ]

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <Link to="/" className="block">
            <h1 className="text-xl font-black tracking-widest text-white">
              LES COLIBRIS <span className="text-yellow-400">226</span>
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-10 md:flex">
            {links.map((link) =>
              !link.to.includes("#") ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm uppercase tracking-[0.2em] text-white/70 transition hover:text-yellow-400"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.to}
                  className="text-sm uppercase tracking-[0.2em] text-white/70 transition hover:text-yellow-400"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="/#rejoindre"
              className="inline-block rounded-full bg-yellow-500 px-6 py-3 text-sm font-bold text-black transition hover:scale-105"
            >
              Rejoindre
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="text-white md:hidden"
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-black"
          >
            {links.map((link) =>
              !link.to.includes("#") ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-bold text-white"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-bold text-white"
                >
                  {link.label}
                </a>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}