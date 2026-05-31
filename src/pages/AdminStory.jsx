import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function AdminStory() {
  const [items, setItems] = useState([])
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState("")

  const emptyForm = {
    year: "",
    title: "",
    description: "",
    image_url: "",
    display_order: 0,
    status: "published",
  }

  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("story_items")
      .select("*")
      .order("display_order", { ascending: true })

    if (!error) setItems(data || [])
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setPreview(URL.createObjectURL(file))

    const ext = file.name.split(".").pop()
    const fileName = `${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from("story")
      .upload(fileName, file)

    if (error) {
      setMessage("Erreur lors de l’upload.")
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from("story").getPublicUrl(fileName)

    setForm((prev) => ({
      ...prev,
      image_url: data.publicUrl,
    }))

    setUploading(false)
  }

  const saveItem = async (e) => {
    e.preventDefault()
    setMessage("")

    if (editingId) {
      const { error } = await supabase
        .from("story_items")
        .update(form)
        .eq("id", editingId)

      if (error) {
        setMessage("Erreur lors de la modification.")
        return
      }

      setMessage("Élément modifié.")
    } else {
      const { error } = await supabase.from("story_items").insert([form])

      if (error) {
        setMessage("Erreur lors de l’ajout.")
        return
      }

      setMessage("Élément ajouté.")
    }

    reset()
    fetchItems()
  }

  const editItem = (item) => {
    setEditingId(item.id)
    setForm({
      year: item.year || "",
      title: item.title || "",
      description: item.description || "",
      image_url: item.image_url || "",
      display_order: item.display_order || 0,
      status: item.status || "published",
    })
    setPreview(item.image_url || null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const deleteItem = async (id) => {
    if (!confirm("Supprimer cet élément de l’histoire ?")) return

    const { error } = await supabase.from("story_items").delete().eq("id", id)

    if (error) {
      setMessage("Erreur lors de la suppression.")
      return
    }

    setMessage("Élément supprimé.")
    fetchItems()
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
          {editingId ? "Modifier l’histoire" : "Ajouter à l’histoire"}
        </h1>

        <form
          onSubmit={saveItem}
          className="mt-12 grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
        >
          <input
            name="year"
            required
            value={form.year}
            onChange={handleChange}
            placeholder="Année ou période"
            className="rounded-2xl bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="Titre"
            className="rounded-2xl bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <textarea
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="rounded-2xl bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <input
            type="number"
            name="display_order"
            value={form.display_order}
            onChange={handleChange}
            placeholder="Ordre d’affichage"
            className="rounded-2xl bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-2xl bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          >
            <option value="published">Publié</option>
            <option value="hidden">Masqué</option>
          </select>

          <label className="rounded-2xl border border-dashed border-white/20 p-6">
            <span className="block text-sm uppercase tracking-[0.25em] text-yellow-500">
              Image
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="mt-4 block"
            />

            {uploading && (
              <p className="mt-4 text-sm text-yellow-400">Upload en cours...</p>
            )}

            {preview && (
              <img
                src={preview}
                alt="Prévisualisation"
                className="mt-5 h-72 w-full rounded-2xl object-cover"
              />
            )}
          </label>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              disabled={uploading}
              className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black disabled:opacity-50"
            >
              {editingId ? "Mettre à jour" : "Ajouter"}
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
          <h2 className="text-3xl font-black">Éléments existants</h2>

          <div className="mt-8 grid gap-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-5 sm:flex-row">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="h-28 w-40 rounded-xl object-cover"
                      />
                    )}

                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                        {item.year} — {item.status}
                      </p>

                      <h3 className="mt-2 text-2xl font-black">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-white/50">
                        Ordre : {item.display_order}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => editItem(item)}
                      className="rounded-full border border-yellow-500/30 px-5 py-3 font-bold text-yellow-400"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="rounded-full border border-red-500/30 px-5 py-3 font-bold text-red-400"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
      }
