import { motion } from "framer-motion"
import { Music, Heart, Handshake, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const options = [
  {
    icon: Music,
    title: "Musicien",
    text: "Rejoins l’énergie musicale des Colibris et fais vivre les rythmes du Morne-Vert.",
  },
  {
    icon: Heart,
    title: "Bénévole",
    text: "Participe à l’organisation, aux événements et à la vie associative du groupe.",
  },
  {
    icon: Handshake,
    title: "Partenaire / Sponsor",
    text: "Soutiens un projet culturel fédérateur et engagé pour le territoire.",
  },
]

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Rejoindre
        </p>

        <h1 className="text-5xl font-black md:text-7xl">
          Fais battre la culture avec nous.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
          Que tu sois musicien, bénévole, partenaire ou sponsor, il y a une
          place pour toi dans l’aventure des Colibris 226.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {options.map((option, index) => {
            const Icon = option.icon

            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-black">
                  <Icon size={30} />
                </div>

                <h2 className="text-2xl font-black">{option.title}</h2>

                <p className="mt-4 leading-7 text-white/60">
                  {option.text}
                </p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Nous contacter
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </main>
  )
}