import { useEffect, useState } from "react"
import { Eye, TrendingUp, FileText, Clock } from "lucide-react"
import { supabase } from "../lib/supabase"

const formatPageName = (page) => {
  const names = {
    "/": "Accueil",
    "/story": "Histoire",
    "/events": "Événements",
    "/gallery": "Galerie",
    "/partners": "Partenaires",
    "/organization": "Organisation",
    "/contact": "Contact",
    "/join": "Rejoindre",
    "/become-partner": "Devenir partenaire",
  }

  return names[page] || page
}

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalVisits: 0,
    monthVisits: 0,
    topPages: [],
    recentVisits: [],
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: totalVisits } = await supabase
      .from("site_visits")
      .select("*", { count: "exact", head: true })

    const { count: monthVisits } = await supabase
      .from("site_visits")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString())

    const { data: visits } = await supabase
      .from("site_visits")
      .select("page, created_at")
      .order("created_at", { ascending: false })
      .limit(200)

    const pageCounts = {}

    ;(visits || []).forEach((visit) => {
      const page = visit.page || "/"
      pageCounts[page] = (pageCounts[page] || 0) + 1
    })

    const topPages = Object.entries(pageCounts)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    setStats({
      totalVisits: totalVisits || 0,
      monthVisits: monthVisits || 0,
      topPages,
      recentVisits: visits?.slice(0, 12) || [],
    })
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black md:text-6xl">
          Analytics
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
          Suivez les visites du site et les pages les plus consultées.
        </p>

        <section className="mt-12 grid gap-5 md:grid-cols-2">
          <StatCard
            icon={Eye}
            label="Visites totales"
            value={stats.totalVisits}
            color="bg-purple-500"
          />

          <StatCard
            icon={TrendingUp}
            label="Visites ce mois"
            value={stats.monthVisits}
            color="bg-fuchsia-500"
          />
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 text-black">
                <FileText size={26} />
              </div>

              <div>
                <h2 className="text-3xl font-black">Top pages</h2>
                <p className="mt-1 text-white/50">
                  Pages les plus visitées récemment.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {stats.topPages.length === 0 ? (
                <p className="text-white/50">Aucune donnée pour le moment.</p>
              ) : (
                stats.topPages.map((item) => (
                  <div
                    key={item.page}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-4"
                  >
                    <span className="font-bold text-white/80">
                      {formatPageName(item.page)}
                    </span>

                    <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-black text-black">
                      {item.count}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-black">
                <Clock size={26} />
              </div>

              <div>
                <h2 className="text-3xl font-black">Visites récentes</h2>
                <p className="mt-1 text-white/50">
                  Derniers passages enregistrés.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {stats.recentVisits.length === 0 ? (
                <p className="text-white/50">Aucune visite récente.</p>
              ) : (
                stats.recentVisits.map((visit, index) => (
                  <div
                    key={`${visit.page}-${visit.created_at}-${index}`}
                    className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4"
                  >
                    <p className="font-bold text-white/80">
                      {formatPageName(visit.page || "/")}
                    </p>

                    <p className="mt-1 text-sm text-white/40">
                      {new Date(visit.created_at).toLocaleString("fr-FR")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color} text-black`}
        >
          <Icon size={30} />
        </div>

        <span className="text-5xl font-black">{value}</span>
      </div>

      <h2 className="mt-8 text-2xl font-black">{label}</h2>
    </div>
  )
}
