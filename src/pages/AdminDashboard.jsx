import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Image,
  CalendarDays,
  Handshake,
  BookOpen,
  Users,
  Mail,
  ArrowRight,
  FileText,
} from "lucide-react"
import { supabase } from "../lib/supabase"

const modules = [
  {
    title: "Galerie",
    text: "Ajouter, masquer ou supprimer les images du site.",
    to: "/admin/gallery",
    icon: Image,
    color: "bg-blue-500",
    border: "hover:border-blue-500/40",
  },
  {
    title: "Événements",
    text: "Créer, modifier et gérer les événements.",
    to: "/admin/events",
    icon: CalendarDays,
    color: "bg-violet-500",
    border: "hover:border-violet-500/40",
  },
  {
    title: "Partenaires",
    text: "Ajouter les sponsors, institutions et partenaires culturels.",
    to: "/admin/partners",
    icon: Handshake,
    color: "bg-green-500",
    border: "hover:border-green-500/40",
  },
  {
    title: "Histoire",
    text: "Mettre à jour la timeline et les moments clés.",
    to: "/admin/story",
    icon: BookOpen,
    color: "bg-pink-500",
    border: "hover:border-pink-500/40",
  },
  {
    title: "Organisation",
    text: "Gérer les membres du bureau et l’équipe associative.",
    to: "/admin/organization",
    icon: Users,
    color: "bg-indigo-500",
    border: "hover:border-indigo-500/40",
  },
  {
    title: "Messages",
    text: "Consulter les demandes reçues depuis le site.",
    to: "/admin/messages",
    icon: Mail,
    color: "bg-orange-500",
    border: "hover:border-orange-500/40",
  },
  {
    title: "Demandes partenaires",
    text: "Consulter les propositions de partenariat reçues.",
    to: "/admin/partner-requests",
    icon: FileText,
    color: "bg-cyan-500",
    border: "hover:border-cyan-500/40",
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    gallery: 0,
    events: 0,
    partners: 0,
    story: 0,
    organization: 0,
    messages: 0,
    newMessages: 0,
    partnerRequests: 0,
    newPartnerRequests: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const getCount = async (table, filter = null) => {
    let query = supabase
      .from(table)
      .select("*", { count: "exact", head: true })

    if (filter) {
      query = query.eq(filter.column, filter.value)
    }

    const { count, error } = await query

    if (error) return 0

    return count || 0
  }

  const fetchStats = async () => {
    const [
      gallery,
      events,
      partners,
      story,
      organization,
      messages,
      newMessages,
      partnerRequests,
      newPartnerRequests,
    ] = await Promise.all([
      getCount("gallery_images"),
      getCount("events"),
      getCount("partners"),
      getCount("story_items"),
      getCount("organization_members"),
      getCount("contact_messages"),
      getCount("contact_messages", { column: "status", value: "new" }),
      getCount("partner_requests"),
      getCount("partner_requests", { column: "status", value: "new" }),
    ])

    setStats({
      gallery,
      events,
      partners,
      story,
      organization,
      messages,
      newMessages,
      partnerRequests,
      newPartnerRequests,
    })
  }

  const statCards = [
    {
      label: "Photos",
      value: stats.gallery,
      icon: Image,
      to: "/admin/gallery",
      color: "bg-blue-500",
      border: "hover:border-blue-500/40",
    },
    {
      label: "Événements",
      value: stats.events,
      icon: CalendarDays,
      to: "/admin/events",
      color: "bg-violet-500",
      border: "hover:border-violet-500/40",
    },
    {
      label: "Partenaires",
      value: stats.partners,
      icon: Handshake,
      to: "/admin/partners",
      color: "bg-green-500",
      border: "hover:border-green-500/40",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: Mail,
      to: "/admin/messages",
      color: "bg-orange-500",
      border: "hover:border-orange-500/40",
      highlight: stats.newMessages > 0,
      helper:
        stats.newMessages > 0
          ? `${stats.newMessages} nouveau(x)`
          : "Aucun nouveau",
    },
    {
      label: "Demandes partenaires",
      value: stats.partnerRequests,
      icon: FileText,
      to: "/admin/partner-requests",
      color: "bg-cyan-500",
      border: "hover:border-cyan-500/40",
      highlight: stats.newPartnerRequests > 0,
      helper:
        stats.newPartnerRequests > 0
          ? `${stats.newPartnerRequests} nouvelle(s)`
          : "Aucune nouvelle",
    },
  ]

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black md:text-6xl">
          Tableau de bord
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
          Gérez les contenus principaux du site Les Colibris 226 depuis cet
          espace sécurisé.
        </p>

        <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {statCards.map((card) => {
            const Icon = card.icon

            return (
              <Link
                key={card.label}
                to={card.to}
                className={`rounded-[2rem] border p-6 transition hover:-translate-y-1 ${
                  card.highlight
                    ? `${card.border.replace("hover:", "")} bg-white/[0.06]`
                    : `border-white/10 bg-white/[0.03] ${card.border}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color} text-black`}
                  >
                    <Icon size={26} />
                  </div>

                  <span className="text-4xl font-black">{card.value}</span>
                </div>

                <h2 className="mt-6 text-xl font-black">{card.label}</h2>

                {card.helper && (
                  <p
                    className={`mt-2 text-sm ${
                      card.highlight ? "text-yellow-400" : "text-white/40"
                    }`}
                  >
                    {card.helper}
                  </p>
                )}
              </Link>
            )
          })}
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black">Modules</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon

              return (
                <Link
                  key={module.to}
                  to={module.to}
                  className={`group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-1 ${module.border}`}
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${module.color} text-black transition group-hover:scale-110`}
                  >
                    <Icon size={30} />
                  </div>

                  <h2 className="mt-8 text-3xl font-black">
                    {module.title}
                  </h2>

                  <p className="mt-4 leading-7 text-white/60">
                    {module.text}
                  </p>

                  <div className="mt-8 inline-flex items-center gap-3 font-bold text-yellow-400">
                    Ouvrir
                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}