import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      {/* BACKGROUND */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />

      {/* LOGO BG */}
      <img
        src="/images/logo.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.04]"
      />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Erreur 404
        </p>

        <h1 className="text-6xl font-black md:text-8xl">
          Page introuvable
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/65">
          Cette page semble avoir quitté le convoi...
          mais l’énergie des Colibris 226 continue plus loin.
        </p>

        <Link
          to="/"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
        >
          <ArrowLeft size={20} />
          Retour à l’accueil
        </Link>
      </motion.div>
    </main>
  )
}
