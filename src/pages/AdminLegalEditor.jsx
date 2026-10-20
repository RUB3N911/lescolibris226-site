import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { supabase } from "../lib/supabase"

const config = {
  "mentions-legales": { db: "legal", label: "Mentions légales", url: "/mentions-legales" },
  "politique-confidentialite": { db: "privacy", label: "Politique de confidentialité", url: "/politique-confidentialite" },
}
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
      setPage(error ? null : data)
      setMessage(error ? "Impossible de charger le document." : "")
      setLoading(false)
    })
  }, [slug])
  if (!item) return <main className="p-12 text-white">Document inconnu.</main>
  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")
    const {error} = await supabase.from("legal_pages").update({
      title: page.title, content: page.content, updated_at: new Date().toISOString()
    }).eq("slug", item.db)
    setSaving(false)
    setMessage(error ? "Erreur : " + error.message : "Modifications enregistrées.")
  }
  return (
    <main className="min-h-screen bg-[#090909] px-6 py-24 text-white lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Link to="/admin/pages-juridiques" className="text-sm text-yellow-400">← Retour aux pages juridiques</Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">Édition du contenu</p>
        <h1 className="mt-3 text-4xl font-black">{item.label}</h1>
        <p className="mt-4 text-white/60">Les variables {"{association_name}"}, {"{email}"}, {"{phone}"} et {"{address}"} sont remplacées automatiquement par les informations officielles enregistrées dans les paramètres du site.</p>
        {loading && <p className="mt-8 text-white/60">Chargement...</p>}
        {!loading && !page && <p className="mt-8 text-red-300">{message}</p>}
        {page && <form onSubmit={save} className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-[#161616] p-6 md:p-8">
          <label className="block text-sm font-semibold">Titre de la page
            <input required value={page.title || ""} onChange={e=>setPage({...page,title:e.target.value})} className="mt-3 w-full rounded-xl border border-white/15 bg-black px-5 py-4 text-white outline-none focus:border-yellow-500"/>
          </label>
          <label className="block text-sm font-semibold">Contenu du document
            <textarea required rows={23} value={page.content || ""} onChange={e=>setPage({...page,content:e.target.value})} className="mt-3 w-full rounded-xl border border-white/15 bg-black px-5 py-4 font-mono text-sm leading-7 text-white outline-none focus:border-yellow-500"/>
          </label>
          <p className="text-sm text-white/50">Utilise ## pour les titres de section et une ligne vide pour séparer les paragraphes.</p>
          <div className="flex flex-wrap items-center gap-4">
            <button disabled={saving} className="rounded-xl bg-yellow-500 px-7 py-3 font-bold text-black disabled:opacity-50">{saving ? "Enregistrement..." : "Enregistrer les modifications"}</button>
            <Link to={item.url} target="_blank" className="text-sm font-semibold text-yellow-400">Voir la page ↗</Link>
          </div>
          {message && <p role="status" className="text-sm text-white/75">{message}</p>}
        </form>}
      </div>
    </main>
  )
}
