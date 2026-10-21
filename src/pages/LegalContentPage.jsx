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
      supabase.from("site_settings").select("association_name,email,phone,address,legal_association_name,rna,registered_address,publication_director,host_name,host_address,host_website,retention_period,privacy_contact,analytics_provider,cookie_policy").eq("id",1).single()
    ]).then(([legal,site]) => {
      if (!active) return
      if (legal.error) setError(true)
      else setPage(legal.data)
      if (!site.error) setSettings(site.data)
    })
    return () => { active = false }
  },[slug])
  const substitute = (value) => (value || "").replace(/\{(association_name|email|phone|address|nom_site|association|adresse_association|ville|rna|contact|direction_publication|hebergeur|adresse_hebergeur|site_hebergeur|duree_conservation|page_contact|politique_confidentialite|politique_vercel|privacy_contact|analytics_provider|cookie_policy)\}/g, (_,key) => {
    const values = {
      ...settings,
      nom_site: "Les Colibris 226",
      association: settings?.legal_association_name || settings?.association_name,
      adresse_association: settings?.registered_address || settings?.address,
      ville: "Morne-Vert, Martinique",
      contact: settings?.privacy_contact || settings?.email,
      direction_publication: settings?.publication_director,
      hebergeur: settings?.host_name,
      adresse_hebergeur: settings?.host_address,
      site_hebergeur: settings?.host_website,
      duree_conservation: settings?.retention_period,
      page_contact: "https://lescolibris226.com/contact",
      politique_confidentialite: "https://lescolibris226.com/politique-confidentialite",
      politique_vercel: "https://vercel.com/legal/privacy-policy"
    }
    return values[key] || "[À compléter]"
  })
  const sections = Array.isArray(page?.sections) ? page.sections : []
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 rounded-[2rem] border border-white/10 bg-[#111111] px-8 py-12 text-white md:px-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">{page?.eyebrow || "Informations du site"}</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">{page?.title || (slug === "legal" ? "Mentions légales" : "Politique de confidentialité")}</h1>
          {page?.intro && <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{substitute(page.intro)}</p>}
        </header>
        {error && <p className="text-red-700">Ce document est momentanément indisponible.</p>}
        {!page && !error && <p>Chargement...</p>}
        {page && <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">Sur cette page</p>
            <nav className="space-y-2">
              {sections.map((section,i)=><a key={i} href={"#section-"+i} className="flex gap-5 rounded-lg px-2 py-3 text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white"><span className="text-yellow-700">{String(i+1).padStart(2,"0")}</span>{section.title}</a>)}
            </nav>
        {page && slug === "privacy" && (
          <section className="mt-8 grid gap-6 rounded-[2rem] border border-white/10 bg-[#111b38] p-8 text-white md:p-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">À retenir</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-3xl">{page.summary_title || "L’essentiel, en mots simples"}</h2>
            </div>
            <ul className="space-y-5 text-sm leading-6">
              {(Array.isArray(page.summary_points) ? page.summary_points : []).map((item,i) => <li key={i} className="flex items-start gap-4"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">✓</span><span>{item}</span></li>)}
            </ul>
          </section>
        )}

            <div className="mt-10 rounded-2xl bg-[#101010] p-6 text-white">
              <h3 className="font-bold text-yellow-400">UNE QUESTION ?</h3>
              <p className="mt-3 text-sm text-white/70">Écrivez-nous, nous vous répondrons simplement.</p>
              <Link to="/contact" className="mt-5 inline-block text-sm font-bold text-white hover:text-yellow-400">NOUS CONTACTER ↗</Link>
            </div>
          </aside>
          <div className="space-y-6">
            {sections.map((section,i)=>(
              <section key={i} id={"section-"+i} className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-[#161616] px-7 py-10 shadow-sm md:px-12 md:py-12">
                <div className="mb-7 flex items-center gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-sm font-bold text-yellow-700">{String(i+1).padStart(2,"0")}</span>
                  <h2 className="text-2xl font-bold md:text-3xl">{section.title}</h2>
                </div>
                <div className="whitespace-pre-line text-base leading-8 text-white/70">{substitute(section.body)}</div>
                {section.note && <div className="mt-6 whitespace-pre-line rounded-r-xl border-l-4 border-yellow-500 bg-yellow-500/10 px-5 py-4 text-sm leading-7 text-white/75">{substitute(section.note)}</div>}
              </section>
            ))}
          </div>
        </div>}

        {page && slug === "privacy" && (
          <section className="mt-10 flex flex-col justify-between gap-6 rounded-[2rem] border border-white/10 bg-[#171717] p-8 md:flex-row md:items-center md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">À consulter aussi</p>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">Nos mentions légales</h2>
            </div>
            <Link to="/mentions-legales" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-yellow-500 px-7 py-4 text-sm font-bold text-black transition hover:bg-yellow-400">Consulter <span aria-hidden="true">↗</span></Link>
          </section>
        )}
        {page && slug === "legal" && (
          <section className="mt-10 flex flex-col justify-between gap-6 rounded-[2rem] border border-white/10 bg-[#171717] p-8 md:flex-row md:items-center md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">À consulter aussi</p>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">Notre politique de confidentialité</h2>
            </div>
            <Link to="/politique-confidentialite" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-yellow-500 px-7 py-4 text-sm font-bold text-black transition hover:bg-yellow-400">Consulter <span aria-hidden="true">↗</span></Link>
          </section>
        )}
      </div>
    </main>
  )
}
