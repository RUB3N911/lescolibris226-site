import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function AdminEvents() {
  const [events, setEvents] = useState([])
  const [message, setMessage] = useState("")
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image_url: "",
    status: "upcoming",
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setEvents(data || [])
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
    const filePath = `events/${fileName}`

    const { error } = await supabase.storage
      .from("events")
      .upload(filePath, file)

    if (error) {
      setMessage("Erreur lors de l’upload de l’image.")
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from("events")
      .getPublicUrl(filePath)

    setForm((prev) => ({
      ...prev,
      image_url: data.publicUrl,
    }))

    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    const { error } = await supabase.from("events").insert([form])

    if (error) {
      setMessage("Erreur lors de l’ajout de l’événement.")
      return
    }

    setMessage("Événement ajouté avec succès.")
    setPreview(null)

    setForm({
      title: "",
      date: "",
      location: "",
      description: "",
      image_url: "",
      status: "upcoming",
    })

    fetchEvents()
  }

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("events")
      .update({ status })
      .eq("id", id)

    if (!error) fetchEvents()
  }

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black">Événements</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-12 grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Titre de l’événement"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            placeholder="Date"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Lieu"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <label className="rounded-2xl border border-dashed border-white/20 bg-black/40 p-6">
            <span className="block text-sm uppercase tracking-[0.25em] text-yellow-500">
              Image de l’événement
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
            <option value="featured">À la une</option>
            <option value="upcoming">À venir</option>
            <option value="ongoing">En cours</option>
            <option value="past">Passé</option>
            <option value="hidden">Masqué</option>
          </select>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="6"
            placeholder="Description"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <button
            type="submit"
            disabled={uploading}
            className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black disabled:opacity-50"
          >
            Ajouter l’événement
          </button>

          {message && <p className="text-white/70">{message}</p>}
        </form>

        <section className="mt-16">
          <h2 className="text-3xl font-black">Événements existants</h2>

          <div className="mt-8 grid gap-5">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-5">
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="h-24 w-32 rounded-xl object-cover"
                      />
                    )}

                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                        {event.status}
                      </p>

                      <h3 className="mt-2 text-2xl font-black">
                        {event.title}
                      </h3>

                      <p className="mt-2 text-white/50">
                        {event.date} — {event.location}
                      </p>
                    </div>
                  </div>

                  <select
                    value={event.status}
                    onChange={(e) => updateStatus(event.id, e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black px-5 py-3 outline-none focus:border-yellow-500"
                  >
                    <option value="featured">À la une</option>
                    <option value="upcoming">À venir</option>
                    <option value="ongoing">En cours</option>
                    <option value="past">Passé</option>
                    <option value="hidden">Masqué</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
