import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import {
  LayoutDashboard,
  Image,
  CalendarDays,
  Handshake,
  BookOpen,
  Users,
  LogOut,
  Menu,
  Mail,
  FileText,
  Settings,
  BarChart3,
  X,
} from "lucide-react"
import { supabase } from "../lib/supabase"

const links = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Galerie", to: "/admin/gallery", icon: Image },
  { label: "Événements", to: "/admin/events", icon: CalendarDays },
  { label: "Partenaires", to: "/admin/partners", icon: Handshake },
  { label: "Histoire", to: "/admin/story", icon: BookOpen },
  { label: "Organisation", to: "/admin/organization", icon: Users },
  { label: "Messages", to: "/admin/messages", icon: Mail },
  {label: "Demandes partenaires", to: "/admin/partner-requests", icon: FileText,},
  {
  label: "Analytics",
  to: "/admin/analytics",
  icon: BarChart3,
},
  {label: "Paramètres", to: "/admin/settings", icon: Settings,},
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  const NavItems = ({ onClick }) => (
    <nav className="mt-10 flex flex-col gap-3">
      {links.map((link) => {
        const Icon = link.icon

        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/admin"}
            onClick={onClick}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-5 py-4 font-bold transition ${
                isActive
                  ? "bg-yellow-500 text-black"
                  : "text-white/60 hover:bg-white/5 hover:text-yellow-400"
              }`
            }
          >
            <Icon size={20} />
            {link.label}
          </NavLink>
        )
      })}
    </nav>
  )

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/80 px-6 py-4 backdrop-blur-xl lg:hidden">
        <h1 className="text-xl font-black">
          COLIBRIS <span className="text-yellow-400">ADMIN</span>
        </h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={30} />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-[999] bg-black px-6 py-6 lg:hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black">
              COLIBRIS <span className="text-yellow-400">ADMIN</span>
            </h1>

            <button onClick={() => setOpen(false)}>
              <X size={32} />
            </button>
          </div>

          <NavItems onClick={() => setOpen(false)} />

          <button
            onClick={handleLogout}
            className="mt-10 flex w-full items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 font-bold text-white/60 transition hover:text-red-400"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      )}

      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 border-r border-white/10 bg-black/80 p-6 backdrop-blur-xl lg:block">
        <h1 className="text-2xl font-black">
          COLIBRIS <span className="text-yellow-400">ADMIN</span>
        </h1>

        <NavItems />

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 font-bold text-white/60 transition hover:text-red-400"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
      </aside>

      <section className="pt-20 lg:ml-72 lg:pt-0">
        <Outlet />
      </section>
    </main>
  )
}
