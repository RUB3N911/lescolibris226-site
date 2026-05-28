import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function AdminEvents() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image_url: "",
    status: "upcoming",
  })

  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
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
    setForm({
      title: "",
      date: "",
      location: "",
      description: "",
      image_url: "",
      status: "upcoming",
    })
  }

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black">Ajouter un événement</h1>

        <form onSubmit={handleSubmit} className="mt-12 grid gap-5">
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

          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="URL de l’image"
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          >
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
            className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black"
          >
            Ajouter l’événement
          </button>

          {message && <p className="text-white/70">{message}</p>}
        </form>
      </div>
    </main>
  )
}
