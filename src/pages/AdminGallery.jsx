import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function AdminGallery() {
  const [images, setImages] = useState([])
  const [message, setMessage] = useState("")
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    category: "carnaval",
    image_url: "",
    status: "published",
  })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setImages(data || [])
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setUploading(true)
    setMessage("")

    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `gallery/${fileName}`

    const { error } = await supabase.storage
      .from("gallery")
      .upload(filePath, file)

    if (error) {
      setMessage("Erreur lors de l’upload de l’image.")
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from("gallery").getPublicUrl(filePath)

    setForm((prev) => ({
      ...prev,
      image_url: data.publicUrl,
    }))

    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    const { error } = await supabase.from("gallery_images").insert([form])

    if (error) {
      setMessage("Erreur lors de l’ajout de l’image.")
      return
    }

    setMessage("Image ajoutée avec succès.")
    setPreview(null)

    setForm({
      title: "",
      category: "carnaval",
      image_url: "",
      status: "published",
    })

    fetchImages()
  }

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("gallery_images")
      .update({ status })
      .eq("id", id)

    if (!error) fetchImages()
  }

  const deleteImage = async (id) => {
    const confirmDelete = window.confirm("Supprimer cette image ?")
    if (!confirmDelete) return

    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id)

    if (error) {
      setMessage("Erreur lors de la suppression.")
      return
    }

    setMessage("Image supprimée.")
    fetchImages()
  }

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black">Galerie</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-12 grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Titre de l’image"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          >
            <option value="premiers-battements">Les Premiers Battements</option>
            <option value="carnaval">Carnaval</option>
            <option value="visages">Les Visages</option>
            <option value="coulisses">Les Coulisses</option>
            <option value="transmission-culture">Transmission & Culture</option>
            <option value="partenaires-officiels">Partenaires & moments officiels</option>
          </select>

          <label className="rounded-2xl border border-dashed border-white/20 bg-black/40 p-6">
            <span className="block text-sm uppercase tracking-[0.25em] text-yellow-500">
              Image
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
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
                alt="Prévisualisation"
                className="mt-6 h-72 w-full rounded-2xl object-cover"
              />
            )}
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          >
            <option value="published">Publié</option>
            <option value="hidden">Masqué</option>
          </select>

          <button
            type="submit"
            disabled={uploading || !form.image_url}
            className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black disabled:opacity-50"
          >
            Ajouter l’image
          </button>

          {message && <p className="text-white/70">{message}</p>}
        </form>

        <section className="mt-16">
          <h2 className="text-3xl font-black">Images existantes</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
              >
                <img
                  src={image.image_url}
                  alt={image.title || "Image galerie"}
                  className="h-64 w-full object-cover"
                />

                <div className="p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                    {image.category}
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    {image.title || "Sans titre"}
                  </h3>

                  <select
                    value={image.status}
                    onChange={(e) => updateStatus(image.id, e.target.value)}
                    className="mt-5 w-full rounded-2xl border border-white/10 bg-black px-5 py-3 outline-none focus:border-yellow-500"
                  >
                    <option value="published">Publié</option>
                    <option value="hidden">Masqué</option>
                  </select>

                  <button
                    onClick={() => deleteImage(image.id)}
                    className="mt-4 w-full rounded-full border border-red-500/30 px-5 py-3 font-bold text-red-400"
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