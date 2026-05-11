import { motion } from "framer-motion"

const partners = [
  "Ville du Morne-Vert",
  "Collectivité Territoriale",
  "Sponsors",
  "Partenaires Culturels",
]

export default function Partners() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-28 text-white">

      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Partenaires
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Ensemble pour faire vivre la culture.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Les Colibris 226 avancent grâce au soutien des acteurs culturels,
            institutionnels et privés engagés pour le rayonnement du Morne-Vert.
          </p>
        </motion.div>

        {/* LOGOS */}
        <div className="mt-20 grid gap-6 md:grid-cols-4">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="flex h-36 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] text-center text-lg font-semibold text-white/70 backdrop-blur-xl transition hover:border-yellow-500/40 hover:text-white"
            >
              {partner}
            </motion.div>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-24 grid gap-8 text-center md:grid-cols-3">

          <div>
            <h3 className="text-5xl font-black text-yellow-400">+100</h3>
            <p className="mt-3 text-white/60">
              Participants mobilisés
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-cyan-400">+10</h3>
            <p className="mt-3 text-white/60">
              Événements culturels
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-pink-400">2026</h3>
            <p className="mt-3 text-white/60">
              Une nouvelle dynamique
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}