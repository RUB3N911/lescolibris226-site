import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Handshake, Trash2 } from "lucide-react"

const statusLabels = {
  new: "Nouveau",
  contacted: "Contacté",
  discussion: "En discussion",
  accepted: "Accepté",
  refused: "Refusé",
  archived: "Archivé",
}

export default function AdminPartnerRequests() {
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("partner_requests")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setRequests(data || [])
  }

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("partner_requests")
      .update({ status })
      .eq("id", id)

    if (error) {
      setMessage("Erreur lors du changement de statut.")
      return
    }

    fetchRequests()
  }

  const deleteRequest = async (id) => {
    if (!confirm("Supprimer cette demande ?")) return

    const { error } = await supabase
      .from("partner_requests")
      .delete()
      .eq("id", id)

    if (error) {
      setMessage("Erreur lors de la suppression.")
      return
    }

    setSelectedRequest(null)
    setMessage("Demande supprimée.")
    fetchRequests()
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-yellow-500">
          Administration
        </p>

        <h1 className="text-5xl font-black">Demandes partenaires</h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
          Consultez les propositions de partenariat envoyées depuis le site.
        </p>

        {message && <p className="mt-6 text-white/70">{message}</p>}

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="grid gap-5">
            {requests.length === 0 ? (
              <p className="text-white/50">
                Aucune demande de partenariat pour le moment.
              </p>
            ) : (
              requests.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedRequest(item)}
                  className={`cursor-pointer rounded-[2rem] border p-6 transition ${
                    selectedRequest?.id === item.id
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
                        {item.organization || "Structure non renseignée"}
                      </h2>

                      <p className="mt-2 text-white/60">
                        {item.contact_name || "Sans contact"} — {item.email}
                      </p>

                      <p className="mt-2 text-sm text-white/40">
                        {item.type || "Type non renseigné"} —{" "}
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
                      <option value="contacted">Contacté</option>
                      <option value="discussion">En discussion</option>
                      <option value="accepted">Accepté</option>
                      <option value="refused">Refusé</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>
                </article>
              ))
            )}
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            {!selectedRequest ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center text-white/50">
                <Handshake size={40} />
                <p className="mt-4">
                  Sélectionnez une demande pour la lire.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
                  {statusLabels[selectedRequest.status] ||
                    selectedRequest.status}
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  {selectedRequest.organization || "Sans structure"}
                </h2>

                <div className="mt-6 space-y-2 text-white/60">
                  <p>Contact : {selectedRequest.contact_name}</p>
                  <p>Email : {selectedRequest.email}</p>
                  <p>Téléphone : {selectedRequest.phone || "Non renseigné"}</p>
                  <p>Type : {selectedRequest.type || "Non renseigné"}</p>
                  <p>
                    Date :{" "}
                    {new Date(selectedRequest.created_at).toLocaleString(
                      "fr-FR"
                    )}
                  </p>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6 leading-8 text-white/75">
                  {selectedRequest.message}
                </div>

                <button
                  onClick={() => deleteRequest(selectedRequest.id)}
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