import { motion } from "framer-motion"
import { CalendarDays, MapPin, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const upcomingEvents = [
  {
    date: "07 Juin 2026",
    title: "Flanm Lespwa",
    location: "Morne-Vert",
    text: "Projet culturel fédérateur réunissant plusieurs quartiers autour de la transmission et du carnaval.",
    image: "/images/events/flanm-lespwa.jpg",
  },
  {
    date: "À venir",
    title: "Carnaval 2026",
    location: "Martinique",
    text: "Préparation des prochains temps forts carnavalesques des Colibris 226.",
    image: "/images/events/carnaval-2026.jpg",
  },
]

const pastEvents = [
  {
    title: "Moments de cohésion",
    image: "/images/events/cohesion.jpg",
  },
  {
    title: "Défilés & ambiance",
    image: "/images/events/defile.jpg",
  },
  {
    title: "Transmission culturelle",
    image: "/images/events/transmission.jpg",
  },
]

export default function EventsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-32 text-white">
      {/* BACKGROUND */}
      <div className="absolute left-0 top-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HERO */}
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
            Carnaval, transmission, cohésion et projets culturels :
            découvrez les événements qui font vibrer Les Colibris 226.
          </p>
        </motion.div>

        {/* EVENT FEATURED */}
        <section className="mt-24">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            À la une
          </p>

          <div className="grid gap-10 lg:grid-cols-2">
            <motion.img
              src="/images/events/flanm-lespwa.jpg"
              alt="Flanm Lespwa"
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="h-full max-h-[620px] w-full rounded-[2rem] object-cover"
            />

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
                07 Juin 2026
              </p>

              <h2 className="mt-4 text-4xl font-black">
                Flanm Lespwa
              </h2>

              <div className="mt-5 flex items-center gap-3 text-white/50">
                <MapPin size={18} />
                Morne-Vert
              </div>

              <p className="mt-8 text-lg leading-8 text-white/65">
                Une journée culturelle et fédératrice rassemblant les quartiers,
                les habitants et les acteurs locaux autour du partage,
                de la culture et de l’énergie carnavalesque.
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

        {/* UPCOMING */}
        <section className="mt-28">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Prochains événements
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Ce qui arrive bientôt.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {upcomingEvents.map((event, index) => (
              <motion.article
                key={event.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                }}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-72 w-full object-cover"
                />

                <div className="p-8">
                  <div className="flex items-center gap-3 text-yellow-400">
                    <CalendarDays size={18} />
                    <p className="text-sm uppercase tracking-[0.2em]">
                      {event.date}
                    </p>
                  </div>

                  <h3 className="mt-4 text-3xl font-black">
                    {event.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-2 text-white/50">
                    <MapPin size={18} />
                    {event.location}
                  </div>

                  <p className="mt-6 leading-7 text-white/60">
                    {event.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* PAST EVENTS */}
        <section className="mt-28">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Moments passés
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Des souvenirs qui continuent de vibrer.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                }}
                className="group overflow-hidden rounded-[2rem]"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0" />

                <div className="mt-5">
                  <h3 className="text-2xl font-black">
                    {event.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
