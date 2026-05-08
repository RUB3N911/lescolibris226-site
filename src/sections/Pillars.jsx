import { motion } from "framer-motion"
import { Flame, HeartHandshake, Drum } from "lucide-react"

const pillars = [
  {
    icon: Flame,
    title: "Énergie",
    text: "Une présence vivante, puissante et festive qui fait vibrer chaque défilé.",
  },
  {
    icon: HeartHandshake,
    title: "Transmission",
    text: "Un engagement pour transmettre la culture, les valeurs et l’esprit du carnaval.",
  },
  {
    icon: Drum,
    title: "Culture",
    text: "Une identité enracinée dans le Morne-Vert et dans la richesse martiniquaise.",
  },
]

export default function Pillars() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-28 text-white">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Notre ADN
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Plus qu’un groupe, une vibration culturelle.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Les Colibris 226 portent une énergie collective, une volonté de
            transmission et une identité culturelle forte au service du
            Morne-Vert.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-500/50 hover:bg-white/[0.06]"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-black transition group-hover:scale-110">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-black text-white">
                  {pillar.title}
                </h3>

                <p className="mt-4 leading-7 text-white/60">
                  {pillar.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}