import { useEffect, useState } from "react"
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
      supabase.from("legal_pages").select("title, content, updated_at").eq("slug", slug).single(),
      supabase.from("site_settings").select("association_name, email, phone, address").eq("id", 1).single()
    ]).then(([legal, site]) => {
      if (!active) return
      if (legal.error) setError(true)
      else setPage(legal.data)
      if (!site.error) setSettings(site.data)
    })
    return () => { active = false }
  }, [slug])

  const renderText = (value) => (value || "").replace(/\{(association_name|email|phone|address)\}/g, (_, key) => settings?.[key] || "[À compléter]")
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <article className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-500">Informations juridiques</p>
        <h1 className="mb-12 text-4xl font-black md:text-6xl">{page?.title || (slug === "legal" ? "Mentions légales" : "Politique de confidentialité")}</h1>
        {error && <p className="text-red-300">Ce document est momentanément indisponible.</p>}
        {!page && !error && <p className="text-white/60">Chargement...</p>}
        {page && <div className="space-y-5 text-white/75 leading-8">
          {renderText(page.content).split(/\n\s*\n/).map((block, index) =>
            block.startsWith("## ") ?
              <h2 key={index} className="pt-5 text-2xl font-bold text-white">{block.slice(3)}</h2> :
              <p key={index} className="whitespace-pre-line">{block}</p>
          )}
        </div>}
      </article>
    </main>
  )
}
