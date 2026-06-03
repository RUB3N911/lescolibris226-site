import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const inputClass =
  "rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"

const getAutoStatus = (event) => {
  if (!event.start_date || !event.end_date) {
    return {
      label: "Dates à compléter",
      className: "text-white/40",
    }
  }

  const now = new Date()
  const start = new Date(event.start_date)
  const end = new Date(event.end_date)

  if (now < start) {
    return {
      label: "À venir",
      className: "text-cyan-400",
    }
  }

  if (now >= start && now <= end) {
    return {
      label: "En cours",
      className: "text-green-400",
    }
  }

  return {
    label: "Passé",
    className: "text-white/40",
  }
}

export default function AdminEvents() {
  const [events, setEvents] = useState([])
  const [message, setMessage] = useState("")
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const emptyForm = {
    title: "",
    date: "",
    start_date: "",
    end_date: "",
    location: "",
    description: "",
    image_url: "",
    is_visible: true,
  }

  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: false })

    if (!error) setEvents(data || [])
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
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

    const { data } = supabase.storage.from("events").getPublicUrl(filePath)

    setForm((prev) => ({
      ...prev,
      image_url: data.publicUrl,
    }))

    setUploading(false)
  }

  const resetForm = () => {
    setForm(emptyForm)
    setPreview(null)
    setEditingId(null)
    setMessage("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    if (editingId) {
      const { error } = await supabase
        .from("events")
        .update(form)
        .eq("id", editingId)

      if (error) {
        setMessage("Erreur lors de la modification de l’événement.")
        return
      }

      setMessage("Événement modifié avec succès.")
    } else {
      const { error } = await supabase.from("events").insert([form])

      if (error) {
        setMessage("Erreur lors de l’ajout de l’événement.")
        return
      }

      setMessage("Événement ajouté avec succès.")
    }

    resetForm()
    fetchEvents()
  }

  const startEdit = (event) => {
    setEditingId(event.id)
    setForm({
      title: event.title || "",
      date: event.date || "",
      start_date: event.start_date
        ? event.start_date.slice(0, 16)
        : "",
      end_date: event.end_date
        ? event.end_date.slice(0, 16)
        : "",
      location: event.location || "",
      description: event.description || "",
      image_url: event.image_url || "",
      is_visible:
        typeof event.is_visible === "boolean" ? event.is_visible : true,
    })
    setPreview(event.image_url || null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm("Supprimer cet événement ?")
    if (!confirmDelete) return

    const { error } = await supabase.from("events").delete().eq("id", id)

    if (error) {
      setMessage("Erreur lors de la suppression.")
      return
    }

    setMessage("Événement supprimé.")
    fetchEvents()
  }

  const toggleVisibility = async (id, isVisible) => {
    const { error } = await supabase
      .from("events")
      .update({ is_visible: isVisible })
      .eq("id", id)

    if (error) {
      setMessage("Erreur lors du changement de visibilité.")
      return
    }

    fetchEvents()
  }

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black">
          {editingId ? "Modifier un événement" : "Ajouter un événement"}
        </h1>

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
            className={inputClass}
          />

          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            placeholder="Date affichée, exemple : 07 Juin 2026"
            className={inputClass}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/40">
                Début
              </label>

              <input
                type="datetime-local"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/40">
                Fin
              </label>

              <input
                type="datetime-local"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Lieu"
            className={inputClass}
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

          <label className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
            <input
              type="checkbox"
              name="is_visible"
              checked={form.is_visible}
              onChange={handleChange}
              className="h-5 w-5 accent-yellow-500"
            />

            <span className="font-bold text-white/80">
              Publier sur le site
            </span>
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="6"
            placeholder="Description"
            className={inputClass}
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={uploading}
              className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black disabled:opacity-50"
            >
              {editingId ? "Mettre à jour" : "Ajouter l’événement"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-white/10 px-8 py-4 font-bold text-white/70"
              >
                Annuler
              </button>
            )}
          </div>

          {message && <p className="text-white/70">{message}</p>}
        </form>

        <section className="mt-16">
          <h2 className="text-3xl font-black">Événements existants</h2>

          <div className="mt-8 grid gap-5">
            {events.map((event) => {
              const autoStatus = getAutoStatus(event)

              return (
                <div
                  key={event.id}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-5 sm:flex-row">
                      {event.image_url && (
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="h-28 w-40 rounded-xl object-cover"
                        />
                      )}

                      <div>
                        <p
                          className={`text-sm uppercase tracking-[0.25em] ${autoStatus.className}`}
                        >
                          {autoStatus.label}
                        </p>

                        {!event.is_visible && (
                          <span className="mt-2 inline-block rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400">
                            Masqué
                          </span>
                        )}

                        <h3 className="mt-2 text-2xl font-black">
                          {event.title}
                        </h3>

                        <p className="mt-2 text-white/50">
                          {event.date} — {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black px-5 py-3">
                        <input
                          type="checkbox"
                          checked={!!event.is_visible}
                          onChange={(e) =>
                            toggleVisibility(event.id, e.target.checked)
                          }
                          className="h-5 w-5 accent-yellow-500"
                        />

                        <span className="font-bold text-white/70">
                          Visible
                        </span>
                      </label>

                      <button
                        onClick={() => startEdit(event)}
                        className="rounded-full border border-yellow-500/30 px-5 py-3 font-bold text-yellow-400"
                      >
                        Modifier
                      </button>

                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="rounded-full border border-red-500/30 px-5 py-3 font-bold text-red-400"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
