import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { supabase } from "../lib/supabase"

const config = {
  "mentions-legales": { db: "legal", label: "Mentions légales", url: "/mentions-legales" },
  "politique-confidentialite": { db: "privacy", label: "Politique de confidentialité", url: "/politique-confidentialite" },
}
const input = "mt-2 w-full rounded-xl border border-white/15 bg-black px-5 py-4 text-white outline-none focus:border-yellow-500"
export default function AdminLegalEditor() {
  const { slug } = useParams()
  const item = config[slug]
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
    if (!item) return
    setLoading(true)
    supabase.from("legal_pages").select("*").eq("slug",item.db).single().then(({data,error}) => {
      setPage(error ? null : { ...data, sections: Array.isArray(data.sections) ? data.sections : [] })
      setMessage(error ? "Impossible de charger le document." : "")
      setLoading(false)
    })
  }, [slug])
  if (!item) return <main className="p-12 text-white">Document inconnu.</main>
  const setField = (field, value) => setPage(prev => ({ ...prev, [field]: value }))
  const setSection = (index, field, value) => setPage(prev => ({
    ...prev, sections: prev.sections.map((section, i) => i === index ? {...section, [field]: value} : section)
  }))
  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")
    const {error} = await supabase.from("legal_pages").update({
      title: page.title, eyebrow: page.eyebrow, intro: page.intro,
      sections: page.sections, updated_at: new Date().toISOString()
    }).eq("slug", item.db)
    setSaving(false)
    setMessage(error ? "Erreur : " + error.message : "Modifications enregistrées et publiées.")
  }
  return (
    <main className="min-h-screen bg-[#090909] px-6 py-24 text-white lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Link to="/admin/pages-juridiques" className="text-sm text-yellow-400">← Retour aux pages juridiques</Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">Modifier la page</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">{item.label}</h1>
        <p className="mt-4 text-white/60">L'enregistrement publie immédiatement les nouveaux textes sur le site.</p>
        {loading && <p className="mt-8 text-white/60">Chargement...</p>}
        {!loading && !page && <p className="mt-8 text-red-300">{message}</p>}
        {page && <form onSubmit={save} className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-[#161616] p-6 md:p-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <span className="rounded-xl bg-yellow-500/10 px-4 py-3 text-sm font-bold text-yellow-400">01</span>
              <div><h2 className="text-xl font-bold">En-tête de la page</h2><p className="mt-1 text-sm text-white/50">Ces textes apparaissent dans le bandeau de présentation.</p></div>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="text-sm font-semibold">Petit titre *
                <input required value={page.eyebrow || ""} onChange={e => setField("eyebrow",e.target.value)} className={input}/>
              </label>
              <label className="text-sm font-semibold">Grand titre *
                <input required value={page.title || ""} onChange={e => setField("title",e.target.value)} className={input}/>
              </label>
            </div>
            <label className="mt-6 block text-sm font-semibold">Texte d'introduction *
              <textarea required rows={3} value={page.intro || ""} onChange={e => setField("intro",e.target.value)} className={input}/>
            </label>
          </section>
          <aside className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
            <h2 className="font-bold text-yellow-300">Informations automatiques</h2>
            <p className="mt-2 text-sm text-white/70">Les valeurs entre accolades sont automatiquement remplacées par les paramètres de l'association. Complétez les informations officielles dans Admin → Paramètres. Ne saisissez pas de données fictives.</p>
            <Link to="/admin/settings" className="mt-3 inline-block text-sm font-semibold text-yellow-400 underline">Compléter les informations dans les paramètres →</Link>
            <p className="mt-3 break-words font-mono text-xs leading-6 text-yellow-200">{"{nom_site} · {association} · {adresse_association} · {rna} · {direction_publication} · {contact} · {hebergeur} · {adresse_hebergeur} · {site_hebergeur} · {duree_conservation} · {analytics_provider} · {cookie_policy}"}</p>
          </aside>
          {page.sections.map((section,index) => (
            <section key={index} className="rounded-3xl border border-white/10 bg-[#161616] p-6 md:p-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <span className="rounded-xl bg-yellow-500/10 px-4 py-3 text-sm font-bold text-yellow-400">{String(index+2).padStart(2,"0")}</span>
                <div><h2 className="text-xl font-bold">Section {index+1}</h2><p className="mt-1 text-sm text-white/50">Le titre alimente aussi le sommaire de la page.</p></div>
              </div>
              <label className="mt-7 block text-sm font-semibold">Titre de la section *
                <input required value={section.title || ""} onChange={e=>setSection(index,"title",e.target.value)} className={input}/>
              </label>
              <label className="mt-5 block text-sm font-semibold">Contenu *
                <textarea required rows={6} value={section.body || ""} onChange={e=>setSection(index,"body",e.target.value)} className={input}/>
              </label>
              <label className="mt-5 block text-sm font-semibold">Encadré complémentaire — facultatif
                <textarea rows={3} value={section.note || ""} onChange={e=>setSection(index,"note",e.target.value)} className={input}/>
              </label>
              <button type="button" onClick={()=>setPage(prev=>({...prev,sections:prev.sections.filter((_,i)=>i!==index)}))} className="mt-5 text-sm text-red-300 hover:underline">Supprimer cette section</button>
            </section>
          ))}
          <button type="button" onClick={()=>setPage(prev=>({...prev,sections:[...prev.sections,{title:"Nouvelle section",body:"",note:""}]}))} className="rounded-xl border border-yellow-500/40 px-6 py-3 font-semibold text-yellow-400">+ Ajouter une section</button>
          <div className="sticky bottom-4 flex flex-wrap items-center gap-4 rounded-2xl border border-white/15 bg-[#161616]/95 p-4 shadow-xl backdrop-blur">
            <button disabled={saving} className="rounded-xl bg-yellow-500 px-7 py-3 font-bold text-black disabled:opacity-50">{saving ? "Enregistrement..." : "Enregistrer les modifications"}</button>
            <Link to={item.url} target="_blank" className="text-sm font-semibold text-yellow-400">Voir la page ↗</Link>
            {message && <p role="status" className="text-sm text-white/75">{message}</p>}
          </div>
        </form>}
      </div>
    </main>
  )
}
