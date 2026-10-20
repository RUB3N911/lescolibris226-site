import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function LegalContentPage({ slug }) {
  const [page, setPage] = useState(null)
  const [settings, setSettings] = useState(null)
  const [error, setError] = useState(false)
  useEffect(() => {
    let active = true
    setPage(null)
    setError(false)
    Promise.all([
      supabase.from("legal_pages").select("*").eq("slug",slug).single(),
      supabase.from("site_settings").select("association_name,email,phone,address").eq("id",1).single()
    ]).then(([legal,site]) => {
      if (!active) return
      if (legal.error) setError(true)
      else setPage(legal.data)
      if (!site.error) setSettings(site.data)
    })
    return () => { active = false }
  },[slug])
  const substitute = (value) => (value || "").replace(/\{(association_name|email|phone|address)\}/g, (_,key) => settings?.[key] || "[À compléter]")
  const sections = Array.isArray(page?.sections) ? page.sections : []
  return (
    <main className="min-h-screen bg-[#f6f5f2] px-6 pb-24 pt-32 text-[#151515]">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 rounded-[2rem] bg-[#101010] px-8 py-12 text-white md:px-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">{page?.eyebrow || "Informations du site"}</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">{page?.title || (slug === "legal" ? "Mentions légales" : "Politique de confidentialité")}</h1>
          {page?.intro && <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{substitute(page.intro)}</p>}
        </header>
        {error && <p className="text-red-700">Ce document est momentanément indisponible.</p>}
        {!page && !error && <p>Chargement...</p>}
        {page && <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-yellow-700">Sur cette page</p>
            <nav className="space-y-2">
              {sections.map((section,i)=><a key={i} href={"#section-"+i} className="flex gap-5 rounded-lg px-2 py-3 text-sm font-semibold text-[#555] hover:bg-white hover:text-black"><span className="text-yellow-700">{String(i+1).padStart(2,"0")}</span>{section.title}</a>)}
            </nav>
            <div className="mt-10 rounded-2xl bg-[#101010] p-6 text-white">
              <h3 className="font-bold text-yellow-400">UNE QUESTION ?</h3>
              <p className="mt-3 text-sm text-white/70">Écrivez-nous, nous vous répondrons simplement.</p>
              <Link to="/contact" className="mt-5 inline-block text-sm font-bold text-white hover:text-yellow-400">NOUS CONTACTER ↗</Link>
            </div>
          </aside>
          <div className="space-y-6">
            {sections.map((section,i)=>(
              <section key={i} id={"section-"+i} className="scroll-mt-28 rounded-[2rem] bg-white px-7 py-10 shadow-sm md:px-12 md:py-12">
                <div className="mb-7 flex items-center gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-sm font-bold text-yellow-700">{String(i+1).padStart(2,"0")}</span>
                  <h2 className="text-2xl font-bold md:text-3xl">{section.title}</h2>
                </div>
                <div className="whitespace-pre-line text-base leading-8 text-[#4c4c4c]">{substitute(section.body)}</div>
                {section.note && <div className="mt-6 whitespace-pre-line rounded-r-xl border-l-4 border-yellow-500 bg-yellow-50 px-5 py-4 text-sm leading-7 text-[#555]">{substitute(section.note)}</div>}
              </section>
            ))}
          </div>
        </div>}
      </div>
    </main>
  )
}
