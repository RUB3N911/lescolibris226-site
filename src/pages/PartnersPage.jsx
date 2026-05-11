import { motion } from "framer-motion"
import { Handshake, Building2, HeartHandshake } from "lucide-react"

const partners = [
  {
    icon: Handshake,
    title: "Partenariats culturels",
    text: "Collaborer avec Les Colibris 226 autour de projets culturels et événementiels.",
  },
  {
    icon: Building2,
    title: "Entreprises & sponsors",
    text: "Associer votre image à une association culturelle dynamique du Morne-Vert.",
  },
  {
    icon: HeartHandshake,
    title: "Soutien associatif",
    text: "Participer au développement des actions culturelles et sociales des Colibris.",
  },
]

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">

        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Partenaires
        </p>

        <h1 className="text-5xl font-black md:text-7xl">
          Construisons ensemble.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
          Les Colibris 226 développent des collaborations culturelles,
          associatives et événementielles afin de faire rayonner le patrimoine
          et l’énergie du Morne-Vert.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {partners.map((partner, index) => {
            const Icon = partner.icon

            return (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-black">
                  <Icon size={30} />
                </div>

                <h2 className="text-2xl font-black">
                  {partner.title}
                </h2>

                <p className="mt-4 leading-7 text-white/60">
                  {partner.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </main>
  )
}