import { motion } from "framer-motion"
import { CalendarDays, MapPin, CalendarPlus, Download } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const calendarDate = (value) => new Date(value).toISOString().replace(/[-:]/g, "").replace(/\\.\\d{3}/, "")

const calendarDetails = (event) => {
  if (!event.start_date || !event.end_date) return null
  const start = new Date(event.start_date)
  const end = new Date(event.end_date)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return null
  const dates = `${calendarDate(start)}/${calendarDate(end)}`
  const description = event.description || ""
  const location = event.location || ""
  const google = new URL("https://calendar.google.com/calendar/render")
  google.searchParams.set("action", "TEMPLATE")
  google.searchParams.set("text", event.title)
  google.searchParams.set("dates", dates)
  google.searchParams.set("details", description)
  google.searchParams.set("location", location)
  const escapeIcs = (text) => String(text || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;")
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Les Colibris 226//Agenda//FR",
    "BEGIN:VEVENT", `UID:${event.id}@lescolibris226.com`,
    `DTSTAMP:${calendarDate(new Date())}`, `DTSTART:${calendarDate(start)}`, `DTEND:${calendarDate(end)}`,
    `SUMMARY:${escapeIcs(event.title)}`, `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(location)}`, "END:VEVENT", "END:VCALENDAR"
  ].join("\r\n")
  return { google: google.toString(), ics: "data:text/calendar;charset=utf-8," + encodeURIComponent(ics) }
}

const getEventStatus = (event) => {
  if (!event.start_date || !event.end_date) return "upcoming"

  const now = new Date()
  const start = new Date(event.start_date)
  const end = new Date(event.end_date)

  if (now < start) return "upcoming"
  if (now >= start && now <= end) return "ongoing"
  return "past"
}

const getStatusLabel = (status) => {
  if (status === "upcoming") return "À venir"
  if (status === "ongoing") return "En cours"
  return "Passé"
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
      .eq("is_visible", true)
      .order("start_date", { ascending: true })

    if (!error) {
      setEvents(data || [])
    }
  }

  const ongoingEvents = events.filter(
    (event) => getEventStatus(event) === "ongoing"
  )

  const upcomingEvents = events.filter(
    (event) => getEventStatus(event) === "upcoming"
  )

  const pastEvents = events.filter(
    (event) => getEventStatus(event) === "past"
  )

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

      <h2 className="text-4xl font-black md:text-5xl">{subtitle}</h2>

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
  const status = getEventStatus(event)
  const calendar = calendarDetails(event)

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
          {getStatusLabel(status)}
        </p>

        <h3 className="mt-3 text-3xl font-black">{event.title}</h3>

        {event.location && (
          <div className="mt-4 flex items-center gap-2 text-white/50">
            <MapPin size={18} />
            {event.location}
          </div>
        )}

        <p className="mt-6 leading-7 text-white/60">
          {event.description}
        </p>

        {status !== "past" && calendar && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={calendar.google} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-400">
              <CalendarPlus size={18} /> Je bloque la date !
            </a>
            <a href={calendar.ics} download={`colibris-${event.id}.ics`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white" aria-label="Télécharger cet événement pour Apple, Outlook ou un autre agenda">
              <Download size={17} /> Autre agenda
            </a>
          </div>
        )}
      </div>
    </motion.article>
  )
}
