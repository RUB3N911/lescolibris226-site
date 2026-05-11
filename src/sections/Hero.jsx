import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/gallery/gallery-1.jpg"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-70"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-yellow-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Association culturelle du Morne-Vert
          </p>

          <h1 className="text-6xl font-black leading-none text-white md:text-8xl">
            LES COLIBRIS{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
              226
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-2xl italic text-white/80 md:text-4xl">
            Le battement culturel du Morne-Vert
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              Rejoindre l’aventure
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/story"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Découvrir notre histoire
              <Play size={18} />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
        <div className="h-12 w-7 rounded-full border border-white/30 p-1">
          <div className="h-3 w-3 animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </section>
  )
}