import { motion } from "framer-motion"

export default function StorySection() {
  return (
    <section id="histoire" className="relative overflow-hidden bg-[#050505] px-6 py-32 text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-yellow-500">
            Tradition • Transmission • Culture
          </p>

          <h2 className="text-5xl font-black md:text-7xl">
            L’ÂME DES{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              COLIBRIS
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            Bien plus qu’un groupe.
            Une vibration.
            Une mémoire collective.
            Un battement culturel qui traverse les générations du Morne-Vert.
          </p>
        </motion.div>

        {/* BLOCK 1 */}
        <div className="grid items-center gap-16 md:grid-cols-2">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/images/story/story-1.jpg"
              alt="Les Colibris"
              className="rounded-3xl object-cover shadow-2xl"
            />

            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
              Héritage
            </p>

            <h3 className="text-4xl font-bold leading-tight md:text-5xl">
              La culture se transmet dans chaque rythme.
            </h3>

            <p className="mt-8 text-lg leading-relaxed text-white/70">
              Chaque percussion.
              Chaque costume.
              Chaque pas.
              Chaque souffle des cuivres raconte une histoire vivante du Morne-Vert.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Les Colibris 226 portent cette énergie populaire,
              festive et intergénérationnelle à travers les rues,
              les événements et les moments de partage.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}