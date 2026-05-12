import { motion } from "framer-motion"

export default function Energy() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 text-white">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-[2rem]"
        >
          <img
            src="/images/gallery/gallery-1.jpg"
            alt="Les Colibris 226"
            className="h-[620px] w-full object-cover"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Une énergie vivante
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Plus qu’un groupe.
            <br />
            Une vibration culturelle.
          </h2>

          <p className="mt-8 text-lg leading-8 text-white/65">
            Depuis plus de 25 ans, Les Colibris 226 font vibrer le
            Morne-Vert au rythme du carnaval, du partage et de la transmission.
          </p>

          <blockquote className="mt-10 border-l-4 border-yellow-500 pl-6 text-2xl italic text-white/85">
            “Le carnaval n’est pas seulement une fête.
            C’est une mémoire qui marche.”
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}