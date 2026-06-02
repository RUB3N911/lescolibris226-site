import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const inputClass =
  "rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"

export default function AdminPartners() {
  const [partners, setPartners] = useState([])
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState("")

  const emptyForm = {
    name: "",
    type: "",
    description: "",
    logo_url: "",
    link: "",
    display_order: 0,
    status: "published",
    show_on_home: false,
  }

  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("display_order", { ascending: true })

    if (!error) setPartners(data || [])
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const uploadLogo = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setPreview(URL.createObjectURL(file))
    setMessage("")

    const ext = file.name.split(".").pop()
    const fileName = `${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from("partners")
      .upload(fileName, file)

    if (error) {
      setMessage("Erreur lors de l’upload du logo.")
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from("partners")
      .getPublicUrl(fileName)

    setForm((prev) => ({
      ...prev,
      logo_url: data.publicUrl,
    }))

    setUploading(false)
  }

  const savePartner = async (e) => {
    e.preventDefault()
    setMessage("")

    if (editingId) {
      const { error } = await supabase
        .from("partners")
        .update(form)
        .eq("id", editingId)

      if (error) {
        setMessage("Erreur lors de la modification.")
        return
      }

      setMessage("Partenaire modifié.")
    } else {
      const { error } = await supabase.from("partners").insert([form])

      if (error) {
        setMessage("Erreur lors de l’ajout.")
        return
      }

      setMessage("Partenaire ajouté.")
    }

    reset()
    fetchPartners()
  }

  const editPartner = (partner) => {
    setEditingId(partner.id)
    setForm({
      name: partner.name || "",
      type: partner.type || "",
      description: partner.description || "",
      logo_url: partner.logo_url || "",
      link: partner.link || "",
      display_order: partner.display_order || 0,
      show_on_home: partner.show_on_home || false,
      status: partner.status || "published",
    })
    setPreview(partner.logo_url || null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const deletePartner = async (id) => {
    if (!confirm("Supprimer ce partenaire ?")) return

    const { error } = await supabase.from("partners").delete().eq("id", id)

    if (error) {
      setMessage("Erreur lors de la suppression.")
      return
    }

    setMessage("Partenaire supprimé.")
    fetchPartners()
  }

  const reset = () => {
    setEditingId(null)
    setPreview(null)
    setForm(emptyForm)
  }

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black">
          {editingId ? "Modifier un partenaire" : "Ajouter un partenaire"}
        </h1>

        <form
          onSubmit={savePartner}
          className="mt-12 grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
        >
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Nom du partenaire"
            className={inputClass}
          />

          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type : Institution, sponsor, association..."
            className={inputClass}
          />

          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Lien site internet ou réseau social"
            className={inputClass}
          />

          <textarea
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            placeholder="Description du partenaire"
            className={inputClass}
          />

          <div>
            <input
              type="number"
              name="display_order"
              value={form.display_order}
              onChange={handleChange}
              placeholder="Ordre d’affichage"
              className={inputClass}
            />

            <p className="mt-2 text-sm text-white/40">
              Ordre d’affichage : 0 = premier.
            </p>
          </div>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="published">Publié</option>
            <option value="hidden">Masqué</option>
          </select>

          <label className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
            <input
              type="checkbox"
              name="show_on_home"
              checked={form.show_on_home}
              onChange={handleChange}
              className="h-5 w-5 accent-yellow-500"
            />

            <span className="font-bold text-white/80">
              Afficher sur la page d’accueil
            </span>
          </label>

          <label className="rounded-2xl border border-dashed border-white/20 bg-black/40 p-6">
            <span className="block text-sm uppercase tracking-[0.25em] text-yellow-500">
              Logo partenaire
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={uploadLogo}
              className="mt-4 block w-full text-sm text-white/70"
            />

            {uploading && (
              <p className="mt-4 text-sm text-yellow-400">
                Upload en cours...
              </p>
            )}

            {preview && (
              <img
                src={preview}
                alt="Prévisualisation logo"
                className="mt-6 h-48 w-full rounded-2xl bg-white p-4 object-contain"
              />
            )}
          </label>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={uploading}
              className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black disabled:opacity-50"
            >
              {editingId ? "Mettre à jour" : "Ajouter le partenaire"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-white/10 px-8 py-4 font-bold text-white/70"
              >
                Annuler
              </button>
            )}
          </div>

          {message && <p className="text-white/70">{message}</p>}
        </form>

        <section className="mt-16">
          <h2 className="text-3xl font-black">Partenaires existants</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
              >
                {partner.logo_url && (
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="h-32 w-full rounded-2xl bg-white p-4 object-contain"
                  />
                )}

                <p className="mt-6 text-sm uppercase tracking-[0.25em] text-yellow-400">
                  {partner.type || "Partenaire"} — {partner.status}
                </p>

                <h3 className="mt-2 text-2xl font-black">{partner.name}</h3>

                <p className="mt-2 text-white/50">
                  Ordre : {partner.display_order}
                </p>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => editPartner(partner)}
                    className="rounded-full border border-yellow-500/30 px-5 py-3 font-bold text-yellow-400"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => deletePartner(partner.id)}
                    className="rounded-full border border-red-500/30 px-5 py-3 font-bold text-red-400"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}