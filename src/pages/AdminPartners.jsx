import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

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
  }

  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("display_order")

    if (!error) setPartners(data || [])
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const uploadLogo = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setPreview(URL.createObjectURL(file))

    const ext = file.name.split(".").pop()
    const fileName = `${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from("partners")
      .upload(fileName, file)

    if (error) {
      setMessage("Erreur upload logo")
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

    if (editingId) {
      await supabase
        .from("partners")
        .update(form)
        .eq("id", editingId)

      setMessage("Partenaire modifié")
    } else {
      await supabase
        .from("partners")
        .insert([form])

      setMessage("Partenaire ajouté")
    }

    reset()
    fetchPartners()
  }

  const editPartner = (partner) => {
    setEditingId(partner.id)
    setForm(partner)
    setPreview(partner.logo_url)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const deletePartner = async (id) => {
    if (!confirm("Supprimer ce partenaire ?")) return

    await supabase
      .from("partners")
      .delete()
      .eq("id", id)

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
          Partenaires
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
            placeholder="Nom partenaire"
            className="rounded-2xl bg-black/40 px-5 py-4"
          />

          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type (Institution, Sponsor...)"
            className="rounded-2xl bg-black/40 px-5 py-4"
          />

          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Lien site internet"
            className="rounded-2xl bg-black/40 px-5 py-4"
          />

          <textarea
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="rounded-2xl bg-black/40 px-5 py-4"
          />


          <input
            type="number"
            name="display_order"
            value={form.display_order}
            onChange={handleChange}
            placeholder="Ordre affichage"
            className="rounded-2xl bg-black/40 px-5 py-4"
          />


          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-2xl bg-black/40 px-5 py-4"
          >
            <option value="published">
              Publié
            </option>

            <option value="hidden">
              Masqué
            </option>
          </select>


          <label className="rounded-2xl border border-dashed border-white/20 p-6">

            Logo partenaire

            <input
              type="file"
              accept="image/*"
              onChange={uploadLogo}
              className="mt-4 block"
            />

            {preview && (
              <img
                src={preview}
                className="mt-5 h-32 object-contain"
              />
            )}

          </label>


          <button
            disabled={uploading}
            className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black"
          >
            {editingId
              ? "Modifier"
              : "Ajouter"}
          </button>

          {message && (
            <p>{message}</p>
          )}

        </form>


        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {partners.map((partner) => (

            <div
              key={partner.id}
              className="rounded-[2rem] border border-white/10 p-6"
            >

              {partner.logo_url && (
                <img
                  src={partner.logo_url}
                  className="h-28 object-contain"
                />
              )}

              <h3 className="mt-5 text-2xl font-black">
                {partner.name}
              </h3>

              <p className="text-yellow-400">
                {partner.status}
              </p>


              <button
                onClick={() => editPartner(partner)}
                className="mt-5 mr-3 text-yellow-400"
              >
                Modifier
              </button>


              <button
                onClick={() => deletePartner(partner.id)}
                className="text-red-400"
              >
                Supprimer
              </button>

            </div>

          ))}

        </div>

      </div>
    </main>
  )
            }
