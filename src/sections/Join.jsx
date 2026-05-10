import { motion } from "framer-motion"
import { Music, Heart, Handshake, ArrowRight } from "lucide-react"

const options = [
  {
    icon: Music,
    title: "Musicien",
    text: "Tu veux faire vivre le rythme, les cuivres ou les percussions avec nous.",
  },
  {
    icon: Heart,
    title: "Bénévole",
    text: "Tu veux participer à l’organisation, accompagner les projets et soutenir le groupe.",
  },
  {
    icon: Handshake,
    title: "Partenaire",
    text: "Tu veux soutenir une association culturelle engagée pour le Morne-Vert.",
  },
]

export default function Join() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-32 text-white">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Rejoindre l’aventure
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Fais battre la culture avec nous.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Que tu sois musicien, bénévole, partenaire ou simplement attaché à
            la culture martiniquaise, il y a une place pour toi dans
            l’aventure des Colibris 226.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {options.map((option, index) => {
            const Icon = option.icon

            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-500/50"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-black transition group-hover:scale-110">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-black">{option.title}</h3>

                <p className="mt-4 leading-7 text-white/60">
                  {option.text}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Nous contacter
            <ArrowRight className="transition group-hover:translate-x-1" size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}