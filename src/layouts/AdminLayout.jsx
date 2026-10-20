import { useEffect, useState } from "react"
import { NavLink, Outlet, Link } from "react-router-dom"
import {
  LayoutDashboard, Image, CalendarDays, Handshake, BookOpen, Users,
  LogOut, Menu, Mail, FileText, Settings, BarChart3, X, ExternalLink
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
  { label: "Demandes partenaires", to: "/admin/partner-requests", icon: FileText },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Paramètres", to: "/admin/settings", icon: Settings },
  { label: "Pages juridiques", to: "/admin/pages-juridiques", icon: FileText },
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  useEffect(() => {
    let active = true
    supabase.auth.getUser().then(({data}) => { if (active) setUserEmail(data?.user?.email || "") })
    return () => { active = false }
  }, [])
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }
  const navigation = (onClick) => (
    <nav aria-label="Navigation administration" className="flex flex-col gap-1.5">
      {links.map(link => {
        const Icon = link.icon
        return <NavLink key={link.to} to={link.to} end={link.to === "/admin"} onClick={onClick}
          className={({isActive}) => `flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-yellow-500 text-black" : "text-white/65 hover:bg-white/10 hover:text-white"}`}>
          <Icon size={19} className="shrink-0"/><span>{link.label}</span>
        </NavLink>
      })}
    </nav>
  )
  const account = () => (
    <div className="space-y-3 border-t border-white/10 pt-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-500 font-bold text-black">{userEmail ? userEmail[0].toUpperCase() : "A"}</span>
        <div className="min-w-0"><p className="text-xs font-bold text-white">Connecté·e</p><p className="truncate text-xs text-white/50" title={userEmail}>{userEmail || "Administrateur"}</p></div>
      </div>
      <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/65 hover:text-yellow-400"><ExternalLink size={16}/> Voir le site public</a>
      <button type="button" onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/65 hover:text-red-300"><LogOut size={16}/> Se déconnecter</button>
    </div>
  )
  return <main className="min-h-screen bg-black text-white">
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/95 px-6 py-4 lg:hidden">
      <Link to="/admin" className="text-xl font-black">COLIBRIS <span className="text-yellow-400">ADMIN</span></Link>
      <button type="button" aria-label="Ouvrir le menu" onClick={() => setOpen(true)}><Menu size={28}/></button>
    </header>
    {open && <div className="fixed inset-0 z-[100] flex flex-col bg-black px-5 py-5 lg:hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-5"><span className="text-xl font-black">COLIBRIS <span className="text-yellow-400">ADMIN</span></span><button aria-label="Fermer le menu" onClick={() => setOpen(false)}><X size={28}/></button></div>
      <div className="min-h-0 flex-1 overflow-y-auto py-5">{navigation(() => setOpen(false))}</div>
      <div className="shrink-0 bg-black pb-2">{account()}</div>
    </div>}
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-white/10 bg-[#090909] px-5 py-6 lg:flex">
      <Link to="/admin" className="shrink-0 border-b border-white/10 pb-6 text-xl font-black">COLIBRIS <span className="text-yellow-400">ADMIN</span></Link>
      <div className="min-h-0 flex-1 overflow-y-auto py-5">{navigation()}</div>
      <div className="shrink-0 bg-[#090909] pt-2">{account()}</div>
    </aside>
    <section className="min-w-0 pt-20 lg:ml-72 lg:pt-0"><Outlet/></section>
  </main>
}
