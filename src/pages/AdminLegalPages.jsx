import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

const entries = [
  { slug: "mentions-legales", db: "legal", title: "Mentions légales", description: "Informations sur l'association éditrice, l'hébergement et les droits liés au site.", url: "/mentions-legales" },
  { slug: "politique-confidentialite", db: "privacy", title: "Politique de confidentialité", description: "Informations sur les données personnelles, les formulaires, les cookies et vos droits.", url: "/politique-confidentialite" },
]
export default function AdminLegalPages() {
  const [pages, setPages] = useState({})
  useEffect(() => {
    supabase.from("legal_pages").select("slug, updated_at").then(({data}) => {
      setPages(Object.fromEntries((data || []).map(p => [p.slug,p])))
    })
  }, [])
  return (
    <main className="min-h-screen bg-[#090909] px-6 py-24 text-white lg:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-500">Contenus du site</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Pages juridiques</h1>
        <p className="mt-4 text-white/60">Modifiez les textes tout en conservant les coordonnées officielles synchronisées automatiquement.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {entries.map(entry => (
            <article key={entry.db} className="flex min-h-[275px] flex-col rounded-3xl border border-white/10 bg-[#161616] p-7 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-500">Page publique</p>
              <h2 className="mt-3 text-2xl font-bold">{entry.title}</h2>
              <p className="mt-4 text-sm leading-6 text-white/60">{entry.description}</p>
              <p className="mt-5 text-xs text-white/45">Dernière mise à jour : {pages[entry.db]?.updated_at ? new Date(pages[entry.db].updated_at).toLocaleDateString("fr-FR") : "—"}</p>
              <div className="mt-auto flex items-center justify-end gap-5 pt-8">
                <Link to={entry.url} target="_blank" className="text-sm font-semibold text-yellow-400 hover:underline">Voir ↗</Link>
                <Link to={"/admin/pages-juridiques/" + entry.slug} className="rounded-xl bg-yellow-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-400">Modifier</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
