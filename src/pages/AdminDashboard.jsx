import { Link } from "react-router-dom"
import { Image, CalendarDays, LogOut, Handshake } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function AdminDashboard() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
              Administration
            </p>

            <h1 className="text-5xl font-black">Espace admin</h1>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-3 text-white/70 transition hover:text-yellow-400"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Link
            to="/admin/gallery"
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:border-yellow-500/40"
          >
            <Image className="text-yellow-500" size={36} />

            <h2 className="mt-6 text-3xl font-black">Galerie</h2>

            <p className="mt-4 text-white/60">
              Ajouter et gérer les images du site.
            </p>
          </Link>

          <Link
            to="/admin/events"
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:border-yellow-500/40"
          >
            <CalendarDays className="text-yellow-500" size={36} />

            <h2 className="mt-6 text-3xl font-black">Événements</h2>

            <p className="mt-4 text-white/60">
              Ajouter, modifier et changer le statut des événements.
            </p>
          </Link>

          <Link
            to="/admin/partners"
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition hover:border-yellow-500/40"
          >
            <Handshake className="text-yellow-500" size={36} />

            <h2 className="mt-6 text-3xl font-black">Partenaires</h2>

            <p className="mt-4 text-white/60">
              Ajouter et modifier les partenaires.
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}
