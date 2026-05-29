import { motion } from "framer-motion"
import { CalendarDays, MapPin, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const statusLabels = {
  featured: "À la une",
  ongoing: "En cours",
  upcoming: "À venir",
  past: "Passé",
  hidden: "Masqué",
}

export default function EventsPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .neq("status", "hidden")
      .order("created_at", { ascending: false })

    if (!error) {
      setEvents(data || [])
    }
  }

  const featuredEvents = events.filter((event) => event.status === "featured")
  const ongoingEvents = events.filter((event) => event.status === "ongoing")
  const upcomingEvents = events.filter((event) => event.status === "upcoming")
  const pastEvents = events.filter((event) => event.status === "past")

  const featuredEvent = featuredEvents.length > 0 ? featuredEvents[0] : null

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-32 text-white">
      <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Événements
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Les temps forts des Colibris.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Carnaval, transmission, cohésion et projets culturels : découvrez
            les événements qui font vibrer Les Colibris 226.
          </p>
        </motion.div>

        {featuredEvent && (
          <section className="mt-24">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
              À la une
            </p>

            <div className="grid gap-10 lg:grid-cols-2">
              {featuredEvent.image_url && (
                <motion.img
                  src={featuredEvent.image_url}
                  alt={featuredEvent.title}
                  initial={{ opacity: 0, x: -35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="h-full max-h-[620px] w-full rounded-[2rem] object-cover"
                />
              )}

              <motion.div
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
                  {featuredEvent.date || "Date à venir"}
                </p>

                <h2 className="mt-4 text-4xl font-black">
                  {featuredEvent.title}
                </h2>

                {featuredEvent.location && (
                  <div className="mt-5 flex items-center gap-3 text-white/50">
                    <MapPin size={18} />
                    {featuredEvent.location}
                  </div>
                )}

                <p className="mt-8 text-lg leading-8 text-white/65">
                  {featuredEvent.description}
                </p>

                <Link
                  to="/contact"
                  className="mt-10 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105"
                >
                  Participer à l’événement
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        <EventSection
          title="En cours"
          subtitle="Les événements actuellement actifs."
          emptyText="Aucun événement en cours pour le moment."
          events={ongoingEvents}
          columns="md:grid-cols-2"
        />

        <EventSection
          title="Prochains événements"
          subtitle="Ce qui arrive bientôt."
          emptyText="Aucun événement à venir publié pour le moment."
          events={upcomingEvents}
          columns="md:grid-cols-2"
        />

        <EventSection
          title="Moments passés"
          subtitle="Des souvenirs qui continuent de vibrer."
          emptyText="Aucun événement passé publié pour le moment."
          events={pastEvents}
          columns="md:grid-cols-3"
        />
      </div>
    </main>
  )
}

function EventSection({ title, subtitle, emptyText, events, columns }) {
  return (
    <section className="mt-28">
      <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
        {title}
      </p>

      <h2 className="text-4xl font-black md:text-5xl">
        {subtitle}
      </h2>

      {events.length === 0 ? (
        <p className="mt-8 text-white/60">{emptyText}</p>
      ) : (
        <div className={`mt-12 grid gap-6 ${columns}`}>
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      )}
    </section>
  )
}

function EventCard({ event, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
      }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
    >
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="h-72 w-full object-cover"
        />
      )}

      <div className="p-8">
        <div className="flex items-center gap-3 text-yellow-400">
          <CalendarDays size={18} />
          <p className="text-sm uppercase tracking-[0.2em]">
            {event.date || "Date à venir"}
          </p>
        </div>

        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-yellow-500/70">
          {statusLabels[event.status] || event.status}
        </p>

        <h3 className="mt-3 text-3xl font-black">
          {event.title}
        </h3>

        {event.location && (
          <div className="mt-4 flex items-center gap-2 text-white/50">
            <MapPin size={18} />
            {event.location}
          </div>
        )}

        <p className="mt-6 leading-7 text-white/60">
          {event.description}
        </p>
      </div>
    </motion.article>
  )
}