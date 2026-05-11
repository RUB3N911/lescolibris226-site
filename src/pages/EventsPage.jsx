import { motion } from "framer-motion"
import { CalendarDays, MapPin } from "lucide-react"

const events = [
  {
    date: "07 Juin 2026",
    title: "Journée de cohésion",
    place: "Morne-Vert",
    text: "Un temps fort associatif autour du partage, de la culture et de l’esprit Colibris.",
  },
  {
    date: "Projet",
    title: "Flanm Lespwa",
    place: "Quartiers du Morne-Vert",
    text: "Un projet culturel fédérateur pour faire rayonner les quartiers du Morne-Vert.",
  },
  {
    date: "À venir",
    title: "Carnaval 2026",
    place: "Martinique",
    text: "Préparation des prochains temps forts carnavalesques.",
  },
]

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Événements
        </p>

        <h1 className="text-5xl font-black md:text-7xl">
          Les temps forts des Colibris.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
          Retrouvez les projets, rencontres, défilés et moments culturels qui
          font vivre l’énergie des Colibris 226.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {events.map((event, index) => (
            <motion.article
              key={event.title}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500 text-black">
                <CalendarDays size={26} />
              </div>

              <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                {event.date}
              </p>

              <h2 className="mt-4 text-2xl font-black">
                {event.title}
              </h2>

              <div className="mt-4 flex items-center gap-2 text-white/50">
                <MapPin size={18} />
                <span>{event.place}</span>
              </div>

              <p className="mt-6 leading-7 text-white/60">
                {event.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  )
}