import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Mail, Trash2 } from "lucide-react"

const statusLabels = {
  new: "Nouveau",
  progress: "En cours",
  done: "Traité",
  archived: "Archivé",
}

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setMessages(data || [])
  }

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id)

    if (error) {
      setMessage("Erreur lors du changement de statut.")
      return
    }

    fetchMessages()
  }

  const deleteMessage = async (id) => {
    if (!confirm("Supprimer ce message ?")) return

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id)

    if (error) {
      setMessage("Erreur lors de la suppression.")
      return
    }

    setSelectedMessage(null)
    setMessage("Message supprimé.")
    fetchMessages()
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black">Messages</h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
          Consultez les demandes envoyées depuis le formulaire de contact.
        </p>

        {message && <p className="mt-6 text-white/70">{message}</p>}

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="grid gap-5">
            {messages.length === 0 ? (
              <p className="text-white/50">Aucun message reçu pour le moment.</p>
            ) : (
              messages.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedMessage(item)}
                  className={`cursor-pointer rounded-[2rem] border p-6 transition ${
                    selectedMessage?.id === item.id
                      ? "border-yellow-500/50 bg-yellow-500/10"
                      : "border-white/10 bg-white/[0.03] hover:border-yellow-500/30"
                  }`}
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                        {statusLabels[item.status] || item.status}
                      </p>

                      <h2 className="mt-2 text-2xl font-black">
                        {item.subject || "Sans sujet"}
                      </h2>

                      <p className="mt-2 text-white/60">
                        {item.firstname || "Sans nom"} — {item.email}
                      </p>

                      <p className="mt-2 text-sm text-white/40">
                        {new Date(item.created_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>

                    <select
                      value={item.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="rounded-2xl border border-white/10 bg-black px-5 py-3 outline-none focus:border-yellow-500"
                    >
                      <option value="new">Nouveau</option>
                      <option value="progress">En cours</option>
                      <option value="done">Traité</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>
                </article>
              ))
            )}
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            {!selectedMessage ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center text-white/50">
                <Mail size={40} />
                <p className="mt-4">Sélectionnez un message pour le lire.</p>
              </div>
            ) : (
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                  {statusLabels[selectedMessage.status] ||
                    selectedMessage.status}
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  {selectedMessage.subject || "Sans sujet"}
                </h2>

                <div className="mt-6 space-y-2 text-white/60">
                  <p>Nom : {selectedMessage.firstname || "Non renseigné"}</p>
                  <p>Email : {selectedMessage.email}</p>
                  <p>Téléphone : {selectedMessage.phone || "Non renseigné"}</p>
                  <p>
                    Date :{" "}
                    {new Date(selectedMessage.created_at).toLocaleString(
                      "fr-FR"
                    )}
                  </p>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6 leading-8 text-white/75">
                  {selectedMessage.message}
                </div>

                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-red-500/30 px-6 py-3 font-bold text-red-400"
                >
                  <Trash2 size={18} />
                  Supprimer
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}