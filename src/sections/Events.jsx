import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CalendarDays, MapPin, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchHomeEvents()
  }, [])

  const fetchHomeEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      const now = new Date().toISOString()

const { data, error } = await supabase
  .from("events")
  .select("*")
  .eq("is_visible", true)
  .gte("end_date", now)
  .order("start_date", { ascending: true })
  .limit(3)

    if (!error) {
      setEvents(data || [])
    }
  }

  return (
    <section
      id="evenements"
      className="relative overflow-hidden bg-black px-6 py-32 text-white"
    >
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Événements
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Les prochains battements.
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/65">
            Défilés, projets culturels, temps forts associatifs : suivez les
            moments qui font vivre l’énergie des Colibris.
          </p>
        </motion.div>

        {events.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {events.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-500/50"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500 text-black">
                  <CalendarDays size={26} />
                </div>

                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                  {event.date || "Date à venir"}
                </p>

                <h3 className="mt-4 text-2xl font-black">
                  {event.title}
                </h3>

                {event.location && (
                  <div className="mt-4 flex items-center gap-2 text-white/50">
                    <MapPin size={18} />
                    <span>{event.location}</span>
                  </div>
                )}

                <p className="mt-6 leading-7 text-white/60">
                  {event.description}
                </p>

                <Link
                  to="/events"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-yellow-400"
                >
                  En savoir plus
                  <ArrowRight size={18} />
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
