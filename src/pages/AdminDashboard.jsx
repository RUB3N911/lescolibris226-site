import { Link } from "react-router-dom"
import {
  Image,
  CalendarDays,
  Handshake,
  BookOpen,
  Users,
  ArrowRight,
  Mail,
} from "lucide-react"

const cards = [
  {
    title: "Galerie",
    text: "Ajouter, masquer ou supprimer les images du site.",
    to: "/admin/gallery",
    icon: Image,
  },
  {
    title: "Événements",
    text: "Créer, modifier et gérer les statuts des événements.",
    to: "/admin/events",
    icon: CalendarDays,
  },
  {
    title: "Partenaires",
    text: "Ajouter les sponsors, institutions et partenaires culturels.",
    to: "/admin/partners",
    icon: Handshake,
  },
  {
    title: "Histoire",
    text: "Mettre à jour la timeline et les moments clés.",
    to: "/admin/story",
    icon: BookOpen,
  },
  {
    title: "Organisation",
    text: "Gérer les membres du bureau et l’équipe associative.",
    to: "/admin/organization",
    icon: Users,
  },
  {
    title: "Messages",  
    text: "Consulter les demandes reçues depuis le site.",
    to: "/admin/messages",
    icon: Mail,
  },
]

export default function AdminDashboard() {
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

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <Link
                key={card.to}
                to={card.to}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-1 hover:border-yellow-500/40"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-black transition group-hover:scale-110">
                  <Icon size={30} />
                </div>

                <h2 className="mt-8 text-3xl font-black">
                  {card.title}
                </h2>

                <p className="mt-4 leading-7 text-white/60">
                  {card.text}
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
      </div>
    </main>
  )
}