import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function Heritage() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-28 text-white">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Depuis 2001
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            25 ans de culture, de transmission et de carnaval.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
        >
          <p className="text-lg leading-8 text-white/65">
            Née au Morne-Vert, l’association Les Colibris 226 porte depuis plus
            de deux décennies une énergie culturelle vivante, mêlant carnaval,
            cohésion, jeunesse et mémoire collective.
          </p>

          <Link
            to="/story"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Découvrir notre histoire
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}