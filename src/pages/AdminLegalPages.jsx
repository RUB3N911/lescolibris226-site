import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const slugs = [{ slug: "legal", label: "Mentions légales" }, { slug: "privacy", label: "Politique de confidentialité" }]
export default function AdminLegalPages() {
  const [pages, setPages] = useState({})
  const [active, setActive] = useState("legal")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
    supabase.from("legal_pages").select("slug, title, content").then(({data,error}) => {
      if (error) setMessage("Impossible de charger les textes : " + error.message)
      else setPages(Object.fromEntries((data || []).map(p => [p.slug, p])))
    })
  }, [])
  const page = pages[active]
  const change = (field, value) => setPages(prev => ({ ...prev, [active]: { ...prev[active], [field]: value } }))
  const save = async (event) => {
    event.preventDefault()
    if (!page) return
    setSaving(true)
    setMessage("")
    const { error } = await supabase.from("legal_pages").update({
      title: page.title, content: page.content, updated_at: new Date().toISOString()
    }).eq("slug", active)
    setSaving(false)
    setMessage(error ? "Échec de l'enregistrement : " + error.message : "Modifications enregistrées et visibles sur le site.")
  }
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-500">Administration</p>
        <h1 className="text-4xl font-black md:text-5xl">Pages juridiques</h1>
        <p className="mt-5 text-white/60">Modifiez les textes sans toucher au code. Les titres de section commencent par ##. Les repères {"{association_name}"}, {"{email}"}, {"{phone}"} et {"{address}"} reprennent automatiquement les paramètres du site.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {slugs.map(p => <button key={p.slug} type="button" onClick={() => {setActive(p.slug);setMessage("")}} className={`rounded-full px-5 py-3 font-semibold ${active === p.slug ? "bg-yellow-500 text-black" : "border border-white/20 text-white"}`}>{p.label}</button>)}
        </div>
        {page ? <form onSubmit={save} className="mt-8 space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <label className="block">Titre
            <input required value={page.title || ""} onChange={e => change("title",e.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-black p-4 text-white" />
          </label>
          <label className="block">Contenu
            <textarea required rows={24} value={page.content || ""} onChange={e => change("content",e.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-black p-4 font-mono text-sm leading-7 text-white" />
          </label>
          <div className="flex flex-wrap items-center gap-5">
            <button disabled={saving} className="rounded-full bg-yellow-500 px-7 py-3 font-bold text-black disabled:opacity-50">{saving ? "Enregistrement..." : "Enregistrer"}</button>
            <a href={active === "legal" ? "/legal" : "/privacy"} target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline">Voir la page publique</a>
          </div>
          {message && <p role="status" className="text-white/75">{message}</p>}
        </form> : <p className="mt-8 text-white/60">{message || "Chargement..."}</p>}
        <p className="mt-8 text-sm text-yellow-300/80">Important : les modèles initiaux contiennent des mentions « À COMPLÉTER ». Vérifiez notamment RNA, responsable de publication, durées de conservation, cookies et prestataires avant validation définitive.</p>
      </div>
    </main>
  )
}
