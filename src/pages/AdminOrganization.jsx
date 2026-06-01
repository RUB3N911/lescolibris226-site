import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function AdminOrganization() {
  const [members, setMembers] = useState([])
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState("")

  const emptyForm = {
    name: "",
    role: "",
    bio: "",
    photo_url: "",
    display_order: 0,
    status: "published",
  }

  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("organization_members")
      .select("*")
      .order("display_order", { ascending: true })

    if (!error) setMembers(data || [])
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const uploadPhoto = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setPreview(URL.createObjectURL(file))

    const ext = file.name.split(".").pop()
    const fileName = `${Date.now()}.${ext}`

    const { error } = await supabase.storage
      .from("organization")
      .upload(fileName, file)

    if (error) {
      setMessage("Erreur upload photo.")
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from("organization")
      .getPublicUrl(fileName)

    setForm((prev) => ({
      ...prev,
      photo_url: data.publicUrl,
    }))

    setUploading(false)
  }

  const saveMember = async (e) => {
    e.preventDefault()
    setMessage("")

    if (editingId) {
      const { error } = await supabase
        .from("organization_members")
        .update(form)
        .eq("id", editingId)

      if (error) {
        setMessage("Erreur lors de la modification.")
        return
      }

      setMessage("Membre modifié.")
    } else {
      const { error } = await supabase
        .from("organization_members")
        .insert([form])

      if (error) {
        setMessage("Erreur lors de l’ajout.")
        return
      }

      setMessage("Membre ajouté.")
    }

    reset()
    fetchMembers()
  }

  const editMember = (member) => {
    setEditingId(member.id)
    setForm({
      name: member.name || "",
      role: member.role || "",
      bio: member.bio || "",
      photo_url: member.photo_url || "",
      display_order: member.display_order || 0,
      status: member.status || "published",
    })
    setPreview(member.photo_url || null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const deleteMember = async (id) => {
    if (!confirm("Supprimer ce membre ?")) return

    const { error } = await supabase
      .from("organization_members")
      .delete()
      .eq("id", id)

    if (error) {
      setMessage("Erreur lors de la suppression.")
      return
    }

    setMessage("Membre supprimé.")
    fetchMembers()
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
          {editingId ? "Modifier un membre" : "Ajouter un membre"}
        </h1>

        <form
          onSubmit={saveMember}
          className="mt-12 grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
        >
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Nom"
            className="rounded-2xl bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <input
            name="role"
            required
            value={form.role}
            onChange={handleChange}
            placeholder="Rôle"
            className="rounded-2xl bg-black/40 px-5 py-4 outline-none focus:border-yellow-500"
          />

          <textarea
            name="bio"
            rows="5"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio / description"
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
              Photo
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              className="mt-4 block"
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
          <h2 className="text-3xl font-black">Membres existants</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
              >
                {member.photo_url && (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="h-72 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                    {member.role} — {member.status}
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-white/50">
                    Ordre : {member.display_order}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => editMember(member)}
                      className="rounded-full border border-yellow-500/30 px-5 py-3 font-bold text-yellow-400"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => deleteMember(member.id)}
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
